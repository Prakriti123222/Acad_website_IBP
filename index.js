//jshint esversion:6
require('dotenv').config()
const express = require("express");
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("home");
})

app.post("/", async function (req, res) {
  const { userName, emailID, phoneNumber, programme, discipline, requestType, rollNumber, message } = req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // client instance for authentication
  const client = await auth.getClient();

  // instance of google sheets api
  const googleSheets = google.sheets({
    version: "v4", auth: client
  });

  const spreadsheetId = "1cALhZnVzsgFqGwDtDUBt8fyp7Ju0jhmXdysMAdyRohw";

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:G",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[userName, emailID, phoneNumber, programme, discipline, requestType, rollNumber, message]],
    },
  });

  if (emailID.includes("@iitgn.ac.in")) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASSWORD
      }
    });
    var mailOptions = {
      from: "Prakriti<nature.prakriti123@gmail.com>",
      to: process.env.EMAIL_ID,
      cc: process.env.EMAIL_ID_2,
      subject: `New ${requestType}`,
      text: `Student details \n\nName: ${userName} \nEmail ID: ${emailID} \nPhone Number: ${phoneNumber} \nProgramme: ${programme} \nDiscipline: ${discipline} \nRoll Number: ${rollNumber} \nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    var mailOptions2 = {
      from: "Prakriti<nature.prakriti123@gmail.com>",
      to: emailID,
      subject: `Submitted ${requestType}`,
      text: `Dear ${userName},\n\nYour request has been successfully submitted. \n\nRegards\nAcademic Office\nIIT Gandhinagar`
    };

    transporter.sendMail(mailOptions2, function (error, info) {
      if (error) {
        console.log(error);
        res.render("error");
      } else {
        console.log('Email sent: ' + info.response);
        res.render("success");
      }
    });
  } else {
    res.render("incorrect_email")
  }
});


app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
