const User = require("../models/user");
const jwt = require("jsonwebtoken");
const request = require('request');
const resp = require("../helpers/apiResponse");
//const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");

//const jwt = require("jsonwebtoken");
const key = "verysecretkey";
const bcrypt = require("bcrypt");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.studentSingup = async (req, res) => {
  const { name, adminimg, email, mobile, password, cnfmPassword } =
    req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newAdmin = new Admin({
    name: name,
    password: hashPassword,
    cnfmPassword: hashPassword,
    email: email,
    mobile: mobile,
    adminimg: adminimg,
  });

  //   const findexist = await Admin.findOne({
  //     $or: [{ email: email }, { mobile: mobile }],
  //   });
  //   if (findexist) {
  //     resp.alreadyr(res);
  //   } else {
  //     if (req.files) {
  //       if (req.files.adminimg[0].path) {
  //         alluploads = [];
  //         for (let i = 0; i < req.files.adminimg.length; i++) {
  //           const resp = await cloudinary.uploader.upload(
  //             req.files.adminimg[i].path,
  //             { use_filename: true, unique_filename: false }
  //           );
  //           fs.unlinkSync(req.files.adminimg[i].path);
  //           alluploads.push(resp.secure_url);
  //         }
  //         newAdmin.adminimg = alluploads;
  //       }
  //     }
  newAdmin.save()


    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.studentlogin = async (req, res) => {
  const { mobile, email, password } = req.body;
  const admin = await Admin.findOne({
    $or: [{ mobile: mobile }, { email: email }],
  });
  if (admin) {
    const validPass = await bcrypt.compare(password, admin.password);
    if (validPass) {
      const token = jwt.sign(
        {
          adminId: admin._id,
        },
        key,
        {
          expiresIn: "365d",
        }
      );
      res.header("ad-token", token).status(200).send({
        status: true,
        token: token,
        msg: "success",
        data: admin,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "Incorrect Password",
        error: "error",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "admin Doesnot Exist",
      error: "error",
    });
  }
};

exports.viewonestudent = async (req, res) => {
  await Admin.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.editprofile = async (req, res) => {
  const { name, adminimg, email, mobile, password, cnfmPassword } = req.body

  data = {}
  if (name) {
    data.name = name
  }
  if (adminimg) {
    data.adminimg = adminimg
  }
  if (email) {
    data.email = email
  }
  if (mobile) {
    data.mobile = mobile
  }
  if (password) {
    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    data.password = hashPassword;
  }
  if (cnfmPassword) {
    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    data.cnfmPassword = hashPassword;
  }

  if (req.files) {
    if (req.files.adminimg) {
      alluploads = [];
      for (let i = 0; i < req.files.adminimg.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(req.files.adminimg[i].path, {
          use_filename: true,
          unique_filename: false,
        });
        fs.unlinkSync(req.files.adminimg[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.adminimg = alluploads;
    }
  }
  await Admin.findOneAndUpdate(
    { _id: req.params.id },
    { $set: data },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
// exports.birth_details = async (req, res) => {


// // Define the URL
// const url = 'https://api.bmicos.com/bmiecommerce/sandbox/api/v1/ecommerce/Token';

// // Define the payload data
// const payload = {
//   authUser: '0YzB6cJLUd',
//   authKey: 'baOVWKpiha40hvawVXvHY3B6EOTpmeBi'
// };

// // Set the request options
// const options = {
//   url: url,
//   method: 'POST',
//   json: true, // Automatically parse the response as JSON
//   body: payload // Set the request body to the payload object
// };

// // Make the POST request
// request(options, (error, response, body) => {
//   if (error) {
//     // Handle the error
//     console.error('Error:', error);
//   } else {
//     // Handle the response data here
//     console.log('Response:', body);
//   }
// })
// }
const axios = require('axios');
// exports.authentication = async (req, res) => {
//   // Define the URL
//   const url = 'https://api.bmicos.com/bmiecommerce/sandbox/api/v1/ecommerce/Token';

//   // Make sure to set the environment in Postman with 'authUser' and 'authKey' variables.

//   // Use the environment variables
//   const payload = {
//     authUser: req.body.authUser,
//     authKey: req.body.authKey
//   };

//   // Make a POST request to the URL with the payload
//   axios.post(url, payload)
//     .then((response) => {
//       // Handle the response data here
//       //  console.log('Response:', response.data);
//       res.status(200).json({ message: response.data })
//     })
//     .catch((error) => {
//       // Handle any errors that occurred during the request
//       console.error('Error:', error);
//     });
// }

// exports.quote = async (req, res) => {
//   // Define the URL
//   try{
//   const url = 'https://api.bmicos.com/bmiecommerce/sandbox/api/v1/ecommerce/Quote'

//   // Make sure to set the environment in Postman with 'authUser' and 'authKey' variables.

//   // Use the environment variables
//   const payload = {
//     referenceId: req.body.referenceId,
//     fromDate:req.body.fromDate,
//     toDate:req.body.toDate,
//     toDate:req.body.toDate,
//     travelerId:req.body.travelerId,
//     dateOfBirth:req.body.dateOfBirth


//   };

//   // Make a POST request to the URL with the payload
//   const response = axios.post(url, payload)

//       // Handle the response data here
//     //  console.log('Response:', response.data);
//       res.status(200).json({message:response.data})

//   }catch(error){
//     console.error('Error:', error);
//     res.status(500).json({ message: 'An error occurred during the request' });
//   }
//   }



// exports.quote = async (req, res) => {
//   try {
//     const url = 'https://api.bmicos.com/bmiecommerce/sandbox/api/v1/ecommerce/quotes';

//     const payload = {
//       referenceId: req.body.referenceId,
//       fromDate: req.body.fromDate,
//       toDate: req.body.toDate,
//       travelerId: req.body.travelerId,
//       dateOfBirth: req.body.dateOfBirth
//     };

//     // Set up the request headers with authUser and authKey
//     const headers = {
//       'authUser': process.env.authUser, // Replace with the actual variable name you defined in Postman
//       'authKey': process.env.authKey // Replace with the actual variable name you defined in Postman
//     };

//     // Make a POST request to the URL with the payload and headers
//     const response = await axios.post(url, payload, { headers });

//     // Handle the response data here
//     res.status(200).json({ message: response.data });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'An error occurred during the request' });
//   }
// };



// Assuming you have an in-memory storage to store the token temporarily.
let authToken = null;

exports.authentication = async (req, res) => {
  const url = 'https://api.bmicos.com/bmiecommerce/sandbox/api/v1/ecommerce/Token';

  const payload = {
    authUser: req.body.authUser,
    authKey: req.body.authKey
  };

  try {
    const response = await axios.post(url, payload);


    // Store the generated token
    authToken = response.data.token; // Adjust this based on the actual token structure you receive.

    res.status(200).json({ message: response.data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error });
  }
};



exports.quote = async (req, res) => {
  try {
    const url = 'https://api.bmicos.com/bmiecommerce/sandbox/api/v1/ecommerce/Quote';
    var authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJibWlfYyI6IjEwMTUiLCJibWlfdSI6IjBZekI2Y0pMVWQiLCJyb2xlIjoiRWNvbW1lcmNlUm9sZSIsIm5iZiI6MTY5NDQzNTA4MywiZXhwIjoxNjk0NDM1NjgzLCJpYXQiOjE2OTQ0MzUwODMsImlzcyI6ImJtaWNvcy5jb20iLCJhdWQiOiJibWljb3MuY29tIn0.TuEXUD-TCSiSZ0ia1kUSQiwRA3WgkGYmk2y5UStbFf0';
    // Define the request headers with the Bearer token and content type
    const headers = {
      //   'accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJibWlfYyI6IjEwMTUiLCJibWlfdSI6IjBZekI2Y0pMVWQiLCJyb2xlIjoiRWNvbW1lcmNlUm9sZSIsIm5iZiI6MTY5NDQzNTA4MywiZXhwIjoxNjk0NDM1NjgzLCJpYXQiOjE2OTQ0MzUwODMsImlzcyI6ImJtaWNvcy5jb20iLCJhdWQiOiJibWljb3MuY29tIn0.TuEXUD-TCSiSZ0ia1kUSQiwRA3WgkGYmk2y5UStbFf0', // Replace with your actual Bearer token
      'Content-Type': 'application/json',

      'accept': 'application/json',
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json',
    }

    console.log("jgfkgjfig", `${authToken}`)
    // Define the request payload
    const payload = {
      referenceId: '1',
      fromDate: '2023-08-24T06:48:06.066Z',
      toDate: '2023-09-26T06:48:06.066Z',
      travelers: [
        {
          travelerId: 1,
          genderId: 1,
          dateOfBirth: '2010-08-26T06:48:06.066Z',
          email: 'pratimadevelopersveltosest@gmail.com',
        },
      ],
    };

    // Make a POST request to the URL with the payload and headers
    const response = await axios.post(url, payload, { headers });
    const createaDate = await User.create(payload);
    // Handle the response data here
    res.status(200).json({ message: response.data,email:req.body.email,maximum:req.body.maximum,area:req.body.area });
  } catch (error) {
    // Handle errors
    //  console.error('Error:', error);
    res.status(500).json({ message: error });
  }
};


exports.quoteAll = async (req, res) => {
  try {
    const url = 'https://api.bmicos.com/bmiecommerce/sandbox/api/v1/ecommerce/QuoteAll';
    var authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJibWlfYyI6IjEwMTUiLCJibWlfdSI6IjBZekI2Y0pMVWQiLCJyb2xlIjoiRWNvbW1lcmNlUm9sZSIsIm5iZiI6MTY5NDQyNDExNCwiZXhwIjoxNjk0NDI0NzE0LCJpYXQiOjE2OTQ0MjQxMTQsImlzcyI6ImJtaWNvcy5jb20iLCJhdWQiOiJibWljb3MuY29tIn0.cec4FJQQ2GD0HHJQHbOVZK0YV2K_33q6ZW4AcSl2rWY';
    // Define the request headers with the Bearer token and content type
    const headers = {
      //   'accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJibWlfYyI6IjEwMTUiLCJibWlfdSI6IjBZekI2Y0pMVWQiLCJyb2xlIjoiRWNvbW1lcmNlUm9sZSIsIm5iZiI6MTY5NDQyNDExNCwiZXhwIjoxNjk0NDI0NzE0LCJpYXQiOjE2OTQ0MjQxMTQsImlzcyI6ImJtaWNvcy5jb20iLCJhdWQiOiJibWljb3MuY29tIn0.cec4FJQQ2GD0HHJQHbOVZK0YV2K_33q6ZW4AcSl2rWY', // Replace with your actual Bearer token
      'Content-Type': 'application/json',

      'accept': 'application/json',
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json',
    }

    console.log("jgfkgjfig", `${authToken}`)
    // Define the request payload
    const payload = {
      referenceId: '1',
      fromDate: '2023-08-24T06:48:06.066Z',
      toDate: '2023-09-26T06:48:06.066Z',
      travelers: [
        {
          travelerId: 1,
          genderId: 1,
          dateOfBirth: '2010-08-26T06:48:06.066Z',
          email: 'pratimadevelopersveltosest@gmail.com',
        },
      ],
    };

    // Make a POST request to the URL with the payload and headers
    const response = await axios.post(url, payload, { headers });

    // Handle the response data here
    res.status(200).json({ message: response.data });
  } catch (error) {
    // Handle errors
    //  console.error('Error:', error);
    res.status(500).json({ message: error });
  }
};

// Define the URL
exports.auth = async (req, res) => {
  const url = 'https://stagingglobalunderwriters.azurewebsites.net/v1/sbox.infplans.com/API/authenticate';
  // https://stagingglobalunderwriters.azurewebsites.net/v1
  // Define the request body
  const requestBody = {
    username: '0YzB6cJLUd',
    password: 'baOVWKpiha40hvawVXvHY3B6EOTpmeBi',
  };

  // Make a POST request to the URL with the request body
  axios
    .post(url, requestBody)
    .then((response) => {
      // Handle the response data here
      console.log('Response:', response.data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    });
}



exports.planPurchase = async (req, res) => {
   try{
       
    const { email,fromDate,toDate,area,maximum ,dob,referenceId,trip_startdate,trip_enddate,departure,destination,additional_avg_cov,visitor_first_name,visitor_last_name,visitor_dob,gender,passport_no,contactNo,emergency_contact_name,emergency_contact_phone,emergency_contact_email,reference,plan ,payment_method,card_holder_name,paymentAddress,payment_email,card_number,card_expiry_date,card_cvv,city,state,postal_code,order_total} = req.body;

    const folderObj = new User({
      email, 
      fromDate,
      toDate,
      area,
      maximum,
      referenceId,
      dob ,
      trip_startdate,
      trip_enddate,
      departure,
      destination,
      additional_avg_cov,
      visitor_first_name,
      visitor_last_name,
      visitor_dob,
      gender,
      passport_no,
      contactNo,
      emergency_contact_name,
      emergency_contact_phone,
      emergency_contact_email,
      paymentAddress,
      city,
      state,
      postal_code,
      order_total,
      reference,
      plan,
      payment_method,
      card_holder_name,
      payment_email,
      card_number,
      card_expiry_date,
      card_cvv

    })
    await folderObj.save()
    res.status(201).json({
      msg: "created successfully",
      success: true,
  });
   }
catch(error){
  res.status(500).json({
    msg: "Something went wrong",
    error: error.message,
    success: false,
});
}
}

exports.memberList = async (req, res) => {
  await User.find()
      .then((result) => {
          res.json(result);
      })
      .catch((err) => {
          res.send(err);
      });
}
