//jshint esversion:6
require('dotenv').config()
const express = require("express");
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require('path');
const cookieParser = require('cookie-parser');

// Google Auth
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = "737454483332-k1c2e50egunf68t314dfkvfnc8obl503.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


// spreadsheets
const anjanabaID = process.env.ANJANABA;
const chiragID = process.env.CHIRAG;
const hanikID = process.env.HANIK;
const vkjitheshID = process.env.VKJITHESH;
const mrugeshID = process.env.MRUGESH;
const payalID = process.env.PAYAL;
const sanjayID = process.env.SANJAY;
const vijayID = process.env.VIJAY;
const timirID = process.env.TIMIR;
const othersID = process.env.OTHERS;
const mainSheet = process.env.MAIN_SHEET;

app.get("/", function (req, res) {
    res.render("login");
})

app.post("/grade-report", async function (req, res) {
    const { userName, rollNumber, phoneNumber, programme, discipline, semester, message, emailID } = req.body;
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

    // ADDING DATA IN MAIN SHEET
    const getDataRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1",
    });

    var d = new Date();
    var year = d.getFullYear();
    var totalDataRows = getDataRows.data.values.length;

    var totalGradeRequests = 0;

    for (var i = 0; i < totalDataRows; i++) {
        if (getDataRows.data.values[i][7] == "Grade Report") {
            totalGradeRequests += 1;
        }
    }

    // console.log(totalGradeRequests);

    // console.log(totalGradeRequests);

    // var newLineNumber = (getRows.data.values.length);
    // console.log(getRows.data.values);
    // var lastRow = 0;
    // for (var i = 0; i <= totalDataRows; i++) {
    // //   console.log(getDataRows.data.values[i]);
    // //   if (getRows.data.values[i][7] == "Grade Report") {
    //     lastRow += 1;
    //   }
    //   else if (getRows.data.values[i].length == 0) {
    // break
    //   }
    // }
    // var lastRow = totalRows;
    // console.log("last row" ,lastRow);

    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    var token = `${year}-GR-${totalGradeRequests + 1}`;
    // console.log(token);

    var reciever;
    var spreadsheetId;
    //   console.log(batch);
    //   console.log(programme);

    if ((((batch == "2014") || (batch == "2017") || (batch == "2021")) ) && (programme == "B.Tech.")) {
        // anjanaba
        console.log("anjanaba");
        spreadsheetId = anjanabaID;
        // GET Rows
        // const getRows = await googleSheets.spreadsheets.values.get({
        //   auth,
        //   spreadsheetId,
        //   range: "Sheet1",
        // });

        reciever = "nature.prakriti123@gmail.com";
    }

    else if (((programme == "B.Sc. in Engineering") && (batch == "2018")) || ((programme == "B.Tech.") && (batch == "2018")) || ((programme == "Ph.D.") && (batch == "2015"))) {
        // chirag
        console.log("chirag");
        spreadsheetId = chiragID;
        reciever = "prakriti.saroj@iitgn.ac.in";
    }

    else if (((programme == "B.Tech.") && (batch == "2016")) || ((programme == "M.Tech.") && (batch == "2018")) || ((programme == "M.Tech.") && (batch == "2019")) || ((programme == "M.Tech.") && (batch == "2021")) || ((programme == "PGDIIT") && (batch == "2021")) || ((programme == "Ph.D.") && (batch == "2019"))) {
        // hanik
        console.log("hanik");
        spreadsheetId = hanikID;
        reciever = "ksheer.agrawal@iitgn.ac.in";
    }
    else if (((programme == "M.Sc.") && (batch == "2021")) || ((programme == "Ph.D.") && (batch == "2016"))) {
        // vkjithesh
        console.log("vkjithesh");
        spreadsheetId = vkjitheshID;
        reciever = "ksheeragrawal@gmail.com"
    }
    else if (((programme == "B.Tech. - M.Sc. Dual Degree")) || ((programme == "Double Master’s Degree program")) || ((programme == "B.Tech. - M.Tech. Dual Degree") && (batch == "2017")) || ((programme == "Ph.D.") && (batch == "2018")) || ((programme == "Ph.D.") && (batch == "2020"))) {
        // mrugesh
        console.log("mrugesh");
        spreadsheetId = mrugeshID;
        reciever = "nature.amit@gmail.com";
    }
    else if (((programme == "M.A.") && (batch == "2019")) || ((programme == "M.A.") && (batch == "2021")) || ((programme == "Ph.D.") && (batch == "2017")) || ((programme == "Ph.D.") && (batch == "2021"))) {
        // payal
        console.log("payal");
        spreadsheetId = payalID;
        reciever = "nature.amit19@gmail.com";
    }
    else if (((programme == "M.Sc.") && (batch == "2019")) || ((programme == "M.Sc.") && (batch == "2020")) || ((programme == "M.Tech.") && (batch == "2020"))) {
        // sanjay
        console.log("sanjay");
        spreadsheetId = sanjayID;
        reciever = "mukul.raj@iitgn.ac.in";
    }
    else if (((programme == "B.Tech.") && (batch == "2020")) || ((programme == "Ph.D.") && (batch == "2013")) || ((programme == "Ph.D.") && (batch == "2014"))) {
        // timir
        console.log("timir");
        spreadsheetId = timirID;
        reciever = "mukulraj9661@gmail.com";
    }
    else if (((programme == "B.Tech.") && (batch == "2019")) || ((programme == "M.A.") && (batch == "2018")) || ((programme == "M.A.") && (batch == "2020"))) {
        // vijay
        console.log("vijay");
        spreadsheetId = vijayID;
        reciever = "thelionkingamit@gmail.com";
    }
    else {
        console.log("others");
        reciever = "prakriti.saroj@iitgn.ac.in";
        spreadsheetId = othersID;
    }

    // GET Rows
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    });

    // var totalRows = getRows.data.values.length;
    // var lastRow = totalRows;
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    // var token = `${year}-GR-${lastRow}`;

    var today = new Date();
    var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, semester, batch, emailID, phoneNumber, programme, discipline, "Grade Report", rollNumber, , , , , , , , , message, token, "Pending", currentDate + " | " + time,]],
        },
    });

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, semester, batch, emailID, phoneNumber, programme, discipline, "Grade Report", rollNumber, , , , , , , , , message, token, "Pending", currentDate + " | " + time,]],
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

        // console.log(token);

        // var mailOptions = {
        //   from: "Prakriti<nature.prakriti123@gmail.com>",
        //   to: process.env.EMAIL_ID_2,
        //   cc: process.env.EMAIL_ID_1,
        //   bcc: process.env.EMAIL_ID_1,
        //   subject: `(${token}) New Grade Request`,
        //   text: `Student details \n\nName: ${userName} \nSemester: ${semester} \nEmail ID: ${emailID} \nPhone Number: ${phoneNumber} \nProgramme: ${programme} \nDiscipline: ${discipline} \nRoll Number: ${rollNumber} \nMessage: ${message}`,
        //   html: `<p style="color: black;"><p><u><b>Grade Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Semester : </b> ${semester} <br><b>Email ID : </b> ${emailID} <br><b>Phone Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br></p>`
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });

        var mailOptions2 = {
            from: "Academic Office<nature.prakriti123@gmail.com>",
            to: reciever,
            subject: `(${token}) Submitted Grade Request`,
            bcc: [process.env.EMAIL_ID_1, process.env.EMAIL_ID_2],
            text: `Dear ${userName},\n\nThank you for Grade Request. The number assigned to your request is ${token}. We will shortly attend to your request. Following is your Grade Request Details:\n\nGrade Request Details\n\nName : ${userName} \nSemester : ${semester} \nEmail ID : ${emailID} \nMobile Number : ${phoneNumber} \nProgramme : ${programme} \nDiscipline : ${discipline} \nRoll Number : ${rollNumber} \nMessage : ${message} \n\nRegards\nAcademic Office\nIIT Gandhinagar`,
            html: `<p style="color: black;">Dear <b>${userName}</b>,<br><br><p>Thank you for your Grade Request. The number assigned to your request is <b>${token}</b>. We will shortly attend to your request. Following is your Grade Request Details:<br><br><u><b>Grade Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Semester : </b> ${semester} <br><b>Email ID : </b> ${emailID} <br><b>Mobile Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br>Please note that this is an auto-generated email and please do not reply to this email.<br><br>Sincerely,<br>Academic Office</p>`,
        };

        transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
                console.log(error);
                res.render("error");
            } else {
                console.log('Email sent: ' + info.response);
                res.render("success", { token: token, requestType: "Grade Report" });
            }
        });
    } else {
        res.render("incorrect_email")
    }
});

//Transcript
app.post('/login', (req, res) => {
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success')
        })
        .catch(console.error);

});

app.post("/transcript-request", async function (req, res) {
    const { userName, emailID, phoneNumber, programme, discipline, rollNumber, message } = req.body;

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

    // ADDING DATA IN MAIN SHEET
    const getDataRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1",
    });

    var d = new Date();
    var year = d.getFullYear();
    var totalDataRows = getDataRows.data.values.length;

    var totalTranscriptRequests = 0;

    for (var i = 0; i < totalDataRows; i++) {
        if (getDataRows.data.values[i][7] == "Transcript Request") {
            totalTranscriptRequests += 1;
        }
    }
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    var token = `${year}-TR-${totalTranscriptRequests + 1}`;
    // console.log(token);
    // var d = new Date();
    // var year = d.getFullYear();
    // var totalRows = getRows.data.values.length;
    // console.log("total rows are", totalRows);

    // var newLineNumber = (getRows.data.values.length);
    // console.log(getRows.data.values);
    // var lastRow = 0;
    // for (var i = 0; i <= totalRows; i++) {
    //   // console.log(getRows.data.values[i]);
    //   if (getRows.data.values[i][7] == "Transcript Request") {
    //     lastRow += 1;
    //   }
    //   else if (getRows.data.values[i].length == 0) {
    //     break
    //   }
    // }
    // lastRow = totalRows;
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    // var token = `${year}-TR-${lastRow}`;
    // console.log(token);
    var reciever;
    var spreadsheetId;
    if ((((batch == "2014") || (batch == "2017") || (batch == "2021"))) && (programme == "B.Tech.")) {
        // anjanaba 
        spreadsheetId = anjanabaID;
        reciever = "nature.prakriti123@gmail.com"
    }
    else if (((programme == "B.Sc. in Engineering") && (batch == "2018")) || ((programme == "B.Tech.") && (batch == "2018")) || ((programme == "Ph.D.") && (batch == "2015"))) {
        // chirag
        spreadsheetId = chiragID;
        reciever = "prakriti.saroj@iitgn.ac.in"
    }
    else if (((programme == "B.Tech.") && (batch == "2016")) || ((programme == "M.Tech.") && (batch == "2018")) || ((programme == "M.Tech.") && (batch == "2019")) || ((programme == "M.Tech.") && (batch == "2021")) || ((programme == "PGDIIT") && (batch == "2021")) || ((programme == "Ph.D.") && (batch == "2019"))) {
        // hanik
        spreadsheetId = hanikID;
        reciever = "ksheer.agrawal@iitgn.ac.in";
    }
    else if (((programme == "M.Sc.") && (batch == "2021")) || ((programme == "Ph.D.") && (batch == "2016"))) {
        // vkjithesh
        spreadsheetId = vkjitheshID;
        reciever = "ksheeragrawal@gmail.com";
    }
    else if ((programme == "B.Tech. - M.Sc. Dual Degree") || (programme == "Double Master’s Degree program") || (programme == "B.Tech. - M.Tech. Dual Degree" && batch == "2017") || (programme == "Ph.D." && batch == "2018") || (programme == "Ph.D." && batch == "2020")) {
        // mrugesh
        spreadsheetId = mrugeshID;
        reciever = "nature.amit@gmail.com";
    }
    else if (((programme == "M.A.") && (batch == "2019")) || ((programme == "M.A.") && (batch == "2021")) || ((programme == "Ph.D.") && (batch == "2017")) || ((programme == "Ph.D.") && (batch == "2021"))) {
        // payal
        spreadsheetId = payalID;
        reciever = "nature.amit19@gmail.com";
    }
    else if (((programme == "M.Sc.") && (batch == "2019")) || ((programme == "M.Sc.") && (batch == "2020")) || ((programme == "M.Tech.") && (batch == "2020"))) {
        // sanjay
        spreadsheetId = sanjayID;
        reciever = "mukul.raj@iitgn.ac.in";
    }
    else if (((programme == "B.Tech.") && (batch == "2020")) || ((programme == "Ph.D.") && (batch == "2013")) || ((programme == "Ph.D.") && (batch == "2014"))) {
        // timir
        spreadsheetId = timirID;
        reciever = "mukulraj9661@gmail.com";
    }
    else if (((programme == "B.Tech.") && (batch == "2019")) || ((programme == "M.A.") && (batch == "2018")) || ((programme == "M.A.") && (batch == "2020"))) {
        // vijay
        spreadsheetId = vijayID;
        reciever = "thelionkingamit@gmail.com";
    }
    else {
        // others 
        spreadsheetId = othersID;
        reciever = "prakriti.saroj@iitgn.ac.in";
    }

    // GET Rows
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    })

    // var totalRows = getRows.data.values.length;
    // lastRow = totalRows;
    // var token = `${year}-TR-${lastRow}`;

    var today = new Date();
    var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "Transcript Request", rollNumber, , , , , , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
        },
    });

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "Transcript Request", rollNumber, , , , , , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
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

        // console.log(token);

        // var mailOptions = {
        //   from: "Academic Office<nature.prakriti123@gmail.com>",
        //   to: process.env.EMAIL_ID_2,
        //   cc: process.env.EMAIL_ID_1,
        //   bcc: process.env.EMAIL_ID_1,
        //   subject: `(${token}) New Transcript Request`,
        //   text: `Student details \n\nName: ${userName} \nSemester: ${semester} \nEmail ID: ${emailID} \nPhone Number: ${phoneNumber} \nProgramme: ${programme} \nDiscipline: ${discipline} \nRoll Number: ${rollNumber} \nMessage: ${message}`,
        //   html: `<p style="color: black;"><p><u><b>Transcript Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Semester : </b> ${semester} <br><b>Email ID : </b> ${emailID} <br><b>Phone Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br></p>`
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });

        var mailOptions2 = {
            from: "Academic Office<nature.prakriti123@gmail.com>",
            to: emailID,
            bcc: reciever,
            subject: `(${token}) Submitted Transcript Request`,
            text: `Dear ${userName},\n\nThank you for your Transcript Request. The number assigned to your request is ${token}. We will shortly attend to your request. Following is your Transcript Request Details:\n\nTranscript Request Details\n\nName : ${userName} \nEmail ID : ${emailID} \nMobile Number : ${phoneNumber} \nProgramme : ${programme} \nDiscipline : ${discipline} \nRoll Number : ${rollNumber} \nMessage : ${message} \n\nRegards\nAcademic Office\nIIT Gandhinagar`,
            html: `<p style="color: black;">Dear <b>${userName}</b>,<br><br><p>Thank you for your Transcript Request. The number assigned to your request is <b>${token}</b>. We will shortly attend to your request. Following is your Transcript Request Details:<br><br><u><b>Transcript Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Email ID : </b> ${emailID} <br><b>Mobile Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br>Please note that this is an auto-generated email and please do not reply to this email.<br><br>Sincerely,<br>Academic Office</p>`,
        };

        transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
                console.log(error);
                res.render("error");
            } else {
                console.log('Email sent: ' + info.response);
                res.render("success", { token: token, requestType: "Transcript" });
            }
        });
    } else {
        res.render("incorrect_email")
    }
});

//Thesis Submission
app.post('/login', (req, res) => {
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success')
        })
        .catch(console.error);

});

app.post("/thesis_sub-request", async function (req, res) {
    const { userName, emailID, phoneNumber, programme, discipline, joining_date, thesis_date, rollNumber, message } = req.body;

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

    // const spreadsheetId = "1cALhZnVzsgFqGwDtDUBt8fyp7Ju0jhmXdysMAdyRohw";
    const spreadsheetId = hanikID;
    // GET Rows
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    })

    // ADDING DATA IN MAIN SHEET
    const getDataRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1",
    });

    var d = new Date();
    var year = d.getFullYear();
    var totalDataRows = getDataRows.data.values.length;

    var totalThesisRequests = 0;

    for (var i = 0; i < totalDataRows; i++) {
        if (getDataRows.data.values[i][7] == "Thesis Certificate Request") {
            totalThesisRequests += 1;
        }
    }
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    var token = `${year}-TCR-${totalThesisRequests + 1}`;

    // var d = new Date();
    // var year = d.getFullYear();
    // var totalRows = getRows.data.values.length;
    // console.log("total rows are", totalRows);

    // var newLineNumber = (getRows.data.values.length);
    // console.log(getRows.data.values);
    // var lastRow = totalRows;
    // for (var i = 0; i <= totalRows; i++) {
    //   // console.log(getRows.data.values[i]);
    //   if (getRows.data.values[i][7] == "Thesis Certificate Request") {
    //     lastRow += 1;
    //   }
    //   else if (getRows.data.values[i].length == 0) {
    //     break
    //   }
    // }
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    // var token = `${year}-TCR-${lastRow + 1}`;
    // console.log(token);
    var reciever = "ksheer.agrawal@iitgn.ac.in";
    // if ((batch == "2014" || "2017" || "2021") && (programme == "B.Tech.")) {
    //   reciever = "nature.prakriti123@gmail.com"
    // }
    // else if ((programme == "B.Sc. in Engineering" && batch == "2018") || (programme == "B.Tech." && batch == "2018") || (programme == "Ph.D." && batch == "2015")) {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2016") || (programme == "M.Tech." && batch == "2018") || (programme == "M.Tech." && batch == "2019") || (programme == "M.Tech." && batch == "2021") || (programme == "PGDIIT" && batch == "2021") || (programme == "Ph.D." && batch == "2019")) {
    //   reciever = "ksheer.agrawal@iitgn.ac.in"
    // }
    // else if ((programme == "M.Sc." && batch == "2021") || (programme == "Ph.D." && batch == "2016")) {
    //   reciever = "ksheeragrawal@gmail.com"
    // }
    // else if ((programme == "B.Tech. - M.Sc. Dual Degree") || (programme == "Double Master’s Degree program") || (programme == "B.Tech. - M.Tech. Dual Degree" && batch == "2017") || (programme == "Ph.D." && batch == "2018") || (programme == "Ph.D." && batch == "2020")) {
    //   reciever = "nature.amit@gmail.com"
    // }
    // else if ((programme == "M.A." && batch == "2019") || (programme == "M.A." && batch == "2021") || (programme == "Ph.D." && batch == "2017") || (programme == "Ph.D." && batch == "2021")) {
    //   reciever = "nature.amit19@gmail.com"
    // }
    // else if ((programme == "M.Sc." && batch == "2019") || (programme == "M.Sc." && batch == "2020") || (programme == "M.Tech." && batch == "2020")) {
    //   reciever = "mukul.raj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2020") || (programme == "Ph.D." && batch == "2013") || (programme == "Ph.D." && batch == "2014")) {
    //   reciever = "mukulraj9661@gmail.com"
    // }
    // else if ((programme == "B.Tech." && batch == "2019") || (programme == "M.A." && batch == "2018") || (programme == "M.A." && batch == "2020")) {
    //   reciever = "thelionkingamit@gmail.com"
    // }
    // else {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }

    var today = new Date();
    var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "Thesis Certificate Request", rollNumber, , thesis_date, joining_date, , , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
        },
    });

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "Thesis Certificate Request", rollNumber, , thesis_date, joining_date, , , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
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

        // console.log(token);

        // var mailOptions = {
        //   from: "Academic Office<nature.prakriti123@gmail.com>",
        //   to: process.env.EMAIL_ID_2,
        //   cc: process.env.EMAIL_ID_1,
        //   bcc: process.env.EMAIL_ID_1,
        //   subject: `(${token}) New Transcript Request`,
        //   text: `Student details \n\nName: ${userName} \nSemester: ${semester} \nEmail ID: ${emailID} \nPhone Number: ${phoneNumber} \nProgramme: ${programme} \nDiscipline: ${discipline} \nRoll Number: ${rollNumber} \nMessage: ${message}`,
        //   html: `<p style="color: black;"><p><u><b>Transcript Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Semester : </b> ${semester} <br><b>Email ID : </b> ${emailID} <br><b>Phone Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br></p>`
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });

        var mailOptions2 = {
            from: "Academic Office<nature.prakriti123@gmail.com>",
            to: emailID,
            bcc: reciever,
            subject: `(${token}) Submitted Thesis Certificate Request`,
            text: `Dear ${userName},\n\nThank you for your Thesis Certificate Request. The number assigned to your request is ${token}. We will shortly attend to your request. Following is your Thesis Certificate Request Details:\n\nThesis Certificate Request Details\n\nName : ${userName} \nEmail ID : ${emailID} \nMobile Number : ${phoneNumber} \nProgramme : ${programme} \nDiscipline : ${discipline} \nRoll Number : ${rollNumber} \nThesis Submission Date : ${thesis_date} \nJoining Date : ${joining_date} \nMessage : ${message} \n\nRegards\nAcademic Office\nIIT Gandhinagar`,
            html: `<p style="color: black;">Dear <b>${userName}</b>,<br><br><p>Thank you for your Thesis Certificate Request. The number assigned to your request is <b>${token}</b>. We will shortly attend to your request. Following is your Thesis Certificate Request Details:<br><br><u><b>Thesis Certificate Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Email ID : </b> ${emailID} <br><b>Mobile Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Thesis Submission Date : </b> ${thesis_date} <br><b>Joining Date : </b> ${joining_date}<br><b>Message : </b> ${message}<br><br>Please note that this is an auto-generated email and please do not reply to this email.<br><br>Sincerely,<br>Academic Office</p>`,
        };

        transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
                console.log(error);
                res.render("error");
            } else {
                console.log('Email sent: ' + info.response);
                res.render("success", { token: token, requestType: "Thesis Certificate" });
            }
        });
    } else {
        res.render("incorrect_email")
    }
});

//Internship
app.post('/login', (req, res) => {
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success')
        })
        .catch(console.error);

});

app.post("/internship-request", async function (req, res) {
    const { userName, emailID, phoneNumber, programme, discipline, interndetails, internship_duration, from_date, to_date, rollNumber, message } = req.body;

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

    // const spreadsheetId = "1cALhZnVzsgFqGwDtDUBt8fyp7Ju0jhmXdysMAdyRohw";
    const spreadsheetId = hanikID;

    // GET Rows
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    })

    // var d = new Date();
    // var year = d.getFullYear();
    // var totalRows = getRows.data.values.length;
    // console.log("total rows are", totalRows);

    // var newLineNumber = (getRows.data.values.length);
    // console.log(getRows.data.values);
    // var lastRow = totalRows;
    // for (var i = 0; i <= totalRows; i++) {
    //   // console.log(getRows.data.values[i]);
    //   if (getRows.data.values[i][7] == "NOC for Internship") {
    //     lastRow += 1;
    //   }
    //   else if (getRows.data.values[i].length == 0) {
    //     break
    //   }
    // }
    // / ADDING DATA IN MAIN SHEET
    const getDataRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1",
    });

    var d = new Date();
    var year = d.getFullYear();
    var totalDataRows = getDataRows.data.values.length;

    var totalInternshipRequests = 0;

    for (var i = 0; i < totalDataRows; i++) {
        if (getDataRows.data.values[i][7] == "NOC for Internship") {
            totalInternshipRequests += 1;
        }
    }
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    var token = `${year}-NIR-${totalInternshipRequests + 1}`;
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    // var token = `${year}-NIR-${lastRow + 1}`;
    // console.log(token);
    var reciever = "ksheer.agrawal@iitgn.ac.in";
    // if ((batch == "2014" || "2017" || "2021") && (programme == "B.Tech.")) {
    //   reciever = "nature.prakriti123@gmail.com"
    // }
    // else if ((programme == "B.Sc. in Engineering" && batch == "2018") || (programme == "B.Tech." && batch == "2018") || (programme == "Ph.D." && batch == "2015")) {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2016") || (programme == "M.Tech." && batch == "2018") || (programme == "M.Tech." && batch == "2019") || (programme == "M.Tech." && batch == "2021") || (programme == "PGDIIT" && batch == "2021") || (programme == "Ph.D." && batch == "2019")) {
    //   reciever = "ksheer.agrawal@iitgn.ac.in"
    // }
    // else if ((programme == "M.Sc." && batch == "2021") || (programme == "Ph.D." && batch == "2016")) {
    //   reciever = "ksheeragrawal@gmail.com"
    // }
    // else if ((programme == "B.Tech. - M.Sc. Dual Degree") || (programme == "Double Master’s Degree program") || (programme == "B.Tech. - M.Tech. Dual Degree" && batch == "2017") || (programme == "Ph.D." && batch == "2018") || (programme == "Ph.D." && batch == "2020")) {
    //   reciever = "nature.amit@gmail.com"
    // }
    // else if ((programme == "M.A." && batch == "2019") || (programme == "M.A." && batch == "2021") || (programme == "Ph.D." && batch == "2017") || (programme == "Ph.D." && batch == "2021")) {
    //   reciever = "nature.amit19@gmail.com"
    // }
    // else if ((programme == "M.Sc." && batch == "2019") || (programme == "M.Sc." && batch == "2020") || (programme == "M.Tech." && batch == "2020")) {
    //   reciever = "mukul.raj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2020") || (programme == "Ph.D." && batch == "2013") || (programme == "Ph.D." && batch == "2014")) {
    //   reciever = "mukulraj9661@gmail.com"
    // }
    // else if ((programme == "B.Tech." && batch == "2019") || (programme == "M.A." && batch == "2018") || (programme == "M.A." && batch == "2020")) {
    //   reciever = "thelionkingamit@gmail.com"
    // }
    // else {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }

    var today = new Date();
    var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "NOC for Internship", rollNumber, , , , , interndetails, from_date, to_date, internship_duration, message, token, "Pending", currentDate + " | " + time, , reciever]],
        },
    });

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "NOC for Internship", rollNumber, , , , , interndetails, from_date, to_date, internship_duration, message, token, "Pending", currentDate + " | " + time, , reciever]],
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

        // console.log(token);

        // var mailOptions = {
        //   from: "Academic Office<nature.prakriti123@gmail.com>",
        //   to: process.env.EMAIL_ID_2,
        //   cc: process.env.EMAIL_ID_1,
        //   bcc: process.env.EMAIL_ID_1,
        //   subject: `(${token}) New Transcript Request`,
        //   text: `Student details \n\nName: ${userName} \nSemester: ${semester} \nEmail ID: ${emailID} \nPhone Number: ${phoneNumber} \nProgramme: ${programme} \nDiscipline: ${discipline} \nRoll Number: ${rollNumber} \nMessage: ${message}`,
        //   html: `<p style="color: black;"><p><u><b>Transcript Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Semester : </b> ${semester} <br><b>Email ID : </b> ${emailID} <br><b>Phone Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br></p>`
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });

        var mailOptions2 = {
            from: "Academic Office<nature.prakriti123@gmail.com>",
            to: emailID,
            bcc: reciever,
            subject: `(${token}) Submitted NOC for Internship Request`,
            text: `Dear ${userName},\n\nThank you for your NOC for Internship Request. The number assigned to your request is ${token}. We will shortly attend to your request. Following is your NOC for Internship Request Details:\n\nNOC for Internship Request Details\n\nName : ${userName} \nEmail ID : ${emailID} \nMobile Number : ${phoneNumber} \nProgramme : ${programme} \nDiscipline : ${discipline} \nRoll Number : ${rollNumber} \nInternship Details : ${interndetails} \nFrom : ${from_date} \nTo : ${to_date} \nInternship Duration: ${internship_duration} \nMessage : ${message} \n\nRegards\nAcademic Office\nIIT Gandhinagar`,
            html: `<p style="color: black;">Dear <b>${userName}</b>,<br><br><p>Thank you for your NOC for Internship Request. The number assigned to your request is <b>${token}</b>. We will shortly attend to your request. Following is your NOC for Internship Request Details:<br><br><u><b>NOC for Internship Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Email ID : </b> ${emailID} <br><b>Mobile Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Internship Details : </b> ${interndetails} <br><b>From : </b> ${from_date} <br><b>To : </b> ${to_date} <br><b>Internship Duration : </b> ${internship_duration}<br><b>Message : </b> ${message}<br><br>Please note that this is an auto-generated email and please do not reply to this email.<br><br>Sincerely,<br>Academic Office</p>`,
        };

        transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
                console.log(error);
                res.render("error");
            } else {
                console.log('Email sent: ' + info.response);
                res.render("success", { token: token, requestType: "NOC for Internship" });
            }
        });
    } else {
        res.render("incorrect_email")
    }
});


//Thesis Defense
app.post('/login', (req, res) => {
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success')
        })
        .catch(console.error);

});

app.post("/thesis_def-request", async function (req, res) {
    const { userName, emailID, phoneNumber, programme, discipline, defense_date, joining_date, thesis_date, rollNumber, message } = req.body;

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

    // const spreadsheetId = "1cALhZnVzsgFqGwDtDUBt8fyp7Ju0jhmXdysMAdyRohw";
    const spreadsheetId = hanikID;

    // GET Rows
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    });

    // ADDING DATA IN MAIN SHEET
    const getDataRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1",
    });

    var d = new Date();
    var year = d.getFullYear();
    var totalDataRows = getDataRows.data.values.length;

    var totalDefenceRequests = 0;

    for (var i = 0; i < totalDataRows; i++) {
        if (getDataRows.data.values[i][7] == "Thesis Defense Certificate Request") {
            totalDefenceRequests += 1;
        }
    }
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    var token = `${year}-TDR-${totalDefenceRequests + 1}`;
    // console.log(token);

    var d = new Date();
    var year = d.getFullYear();
    // var totalRows = getRows.data.values.length;
    // console.log("total rows are", totalRows);

    // var newLineNumber = (getRows.data.values.length);
    // console.log(getRows.data.values);
    // var lastRow = totalRows;
    // for (var i = 0; i <= totalRows; i++) {
    //   // console.log(getRows.data.values[i]);
    //   if (getRows.data.values[i][7] == "Thesis Defense Certificate Request") {
    //     lastRow += 1;
    //   }
    //   else if (getRows.data.values[i].length == 0) {
    //     break
    //   }
    // }
    var batch = "20" + rollNumber.substring(0, 2);
    console.log(batch);
    // var token = `${year}-TDR-${lastRow + 1}`;
    // console.log(token);
    var reciever = "ksheer.agrawal@iitgn.ac.in";
    // if ((batch == "2014" || "2017" || "2021") && (programme == "B.Tech.")) {
    //   reciever = "nature.prakriti123@gmail.com"
    // }
    // else if ((programme == "B.Sc. in Engineering" && batch == "2018") || (programme == "B.Tech." && batch == "2018") || (programme == "Ph.D." && batch == "2015")) {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2016") || (programme == "M.Tech." && batch == "2018") || (programme == "M.Tech." && batch == "2019") || (programme == "M.Tech." && batch == "2021") || (programme == "PGDIIT" && batch == "2021") || (programme == "Ph.D." && batch == "2019")) {
    //   reciever = "ksheer.agrawal@iitgn.ac.in"
    // }
    // else if ((programme == "M.Sc." && batch == "2021") || (programme == "Ph.D." && batch == "2016")) {
    //   reciever = "ksheeragrawal@gmail.com"
    // }
    // else if ((programme == "B.Tech. - M.Sc. Dual Degree") || (programme == "Double Master’s Degree program") || (programme == "B.Tech. - M.Tech. Dual Degree" && batch == "2017") || (programme == "Ph.D." && batch == "2018") || (programme == "Ph.D." && batch == "2020")) {
    //   reciever = "nature.amit@gmail.com"
    // }
    // else if ((programme == "M.A." && batch == "2019") || (programme == "M.A." && batch == "2021") || (programme == "Ph.D." && batch == "2017") || (programme == "Ph.D." && batch == "2021")) {
    //   reciever = "nature.amit19@gmail.com"
    // }
    // else if ((programme == "M.Sc." && batch == "2019") || (programme == "M.Sc." && batch == "2020") || (programme == "M.Tech." && batch == "2020")) {
    //   reciever = "mukul.raj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2020") || (programme == "Ph.D." && batch == "2013") || (programme == "Ph.D." && batch == "2014")) {
    //   reciever = "mukulraj9661@gmail.com"
    // }
    // else if ((programme == "B.Tech." && batch == "2019") || (programme == "M.A." && batch == "2018") || (programme == "M.A." && batch == "2020")) {
    //   reciever = "thelionkingamit@gmail.com"
    // }
    // else {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }

    var today = new Date();
    var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "Thesis Defense Certificate Request", rollNumber, defense_date, thesis_date, joining_date, , , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
        },
    });

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "Thesis Defense Certificate Request", rollNumber, defense_date, thesis_date, joining_date, , , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
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

        // console.log(token);

        // var mailOptions = {
        //   from: "Academic Office<nature.prakriti123@gmail.com>",
        //   to: process.env.EMAIL_ID_2,
        //   cc: process.env.EMAIL_ID_1,
        //   bcc: process.env.EMAIL_ID_1,
        //   subject: `(${token}) New Transcript Request`,
        //   text: `Student details \n\nName: ${userName} \nSemester: ${semester} \nEmail ID: ${emailID} \nPhone Number: ${phoneNumber} \nProgramme: ${programme} \nDiscipline: ${discipline} \nRoll Number: ${rollNumber} \nMessage: ${message}`,
        //   html: `<p style="color: black;"><p><u><b>Transcript Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Semester : </b> ${semester} <br><b>Email ID : </b> ${emailID} <br><b>Phone Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br></p>`
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });

        var mailOptions2 = {
            from: "Academic Office<nature.prakriti123@gmail.com>",
            to: emailID,
            bcc: reciever,
            subject: `(${token}) Submitted Thesis Defense Certificate Request`,
            text: `Dear ${userName},\n\nThank you for your Thesis Defense Certificate Request. The number assigned to your request is ${token}. We will shortly attend to your request. Following is your Thesis Defense Certificate Request Details:\n\nThesis Defense Certificate Request Details\n\nName : ${userName} \nEmail ID : ${emailID} \nMobile Number : ${phoneNumber} \nProgramme : ${programme} \nDiscipline : ${discipline} \nRoll Number : ${rollNumber} \nThesis Defense Date : ${defense_date} \nThesis Submission Date : ${thesis_date} \nJoining Date : ${joining_date} \nMessage : ${message} \n\nRegards\nAcademic Office\nIIT Gandhinagar`,
            html: `<p style="color: black;">Dear <b>${userName}</b>,<br><br><p>Thank you for your Thesis Defense Certificate Request. The number assigned to your request is <b>${token}</b>. We will shortly attend to your request. Following is your Thesis Defense Certificate Request Details:<br><br><u><b>Thesis Defense Certificate Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Email ID : </b> ${emailID} <br><b>Mobile Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Thesis Defense Date : </b> ${defense_date} <br><b>Thesis Submission Date : </b> ${thesis_date} <br><b>Joining Date : </b> ${joining_date}<br><b>Message : </b> ${message}<br><br>Please note that this is an auto-generated email and please do not reply to this email.<br><br>Sincerely,<br>Academic Office</p>`,
        };

        transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
                console.log(error);
                res.render("error");
            } else {
                console.log('Email sent: ' + info.response);
                res.render("success", { token: token, requestType: "Thesis Defense Certificate" });
            }
        });
    } else {
        res.render("incorrect_email")
    }
});




//Bonafide
app.post('/login', (req, res) => {
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success')
        })
        .catch(console.error);

});

app.post("/bonafide-request", async function (req, res) {
    const { userName, emailID, phoneNumber, programme, discipline, rollNumber, graduation_year, message } = req.body;

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

    // const spreadsheetId = "1cALhZnVzsgFqGwDtDUBt8fyp7Ju0jhmXdysMAdyRohw";
    const spreadsheetId = hanikID;

    // GET Rows
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    })

    // ADDING DATA IN MAIN SHEET
    const getDataRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1",
    });

    var d = new Date();
    var year = d.getFullYear();
    var totalDataRows = getDataRows.data.values.length;

    var totalBonafideRequests = 0;

    for (var i = 0; i < totalDataRows; i++) {
        if (getDataRows.data.values[i][7] == "Bonafide Request") {
            totalBonafideRequests += 1;
        }
    }
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    var token = `${year}-BR-${totalBonafideRequests + 1}`;
    // console.log(token);

    var d = new Date();
    var year = d.getFullYear();
    // var totalRows = getRows.data.values.length;
    // console.log("total rows are", totalRows);

    // var newLineNumber = (getRows.data.values.length);
    // console.log(getRows.data.values);
    // var lastRow = totalRows;
    // for (var i = 0; i <= totalRows; i++) {
    //   // console.log(getRows.data.values[i]);
    //   if (getRows.data.values[i][7] == "Bonafide Request") {
    //     lastRow += 1;
    //   }
    //   else if (getRows.data.values[i].length == 0) {
    //     break
    //   }
    // }
    var batch = "20" + rollNumber.substring(0, 2);
    console.log(batch);
    // var token = `${year}-BR-${lastRow + 1}`;
    // console.log(token);
    var reciever = "ksheer.agrawal@iitgn.ac.in";
    // if ((batch == "2014" || "2017" || "2021") && (programme == "B.Tech.")) {
    //   reciever = "nature.prakriti123@gmail.com"
    // }
    // else if ((programme == "B.Sc. in Engineering" && batch == "2018") || (programme == "B.Tech." && batch == "2018") || (programme == "Ph.D." && batch == "2015")) {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2016") || (programme == "M.Tech." && batch == "2018") || (programme == "M.Tech." && batch == "2019") || (programme == "M.Tech." && batch == "2021") || (programme == "PGDIIT" && batch == "2021") || (programme == "Ph.D." && batch == "2019")) {
    //   reciever = "ksheer.agrawal@iitgn.ac.in"
    // }
    // else if ((programme == "M.Sc." && batch == "2021") || (programme == "Ph.D." && batch == "2016")) {
    //   reciever = "ksheeragrawal@gmail.com"
    // }
    // else if ((programme == "B.Tech. - M.Sc. Dual Degree") || (programme == "Double Master’s Degree program") || (programme == "B.Tech. - M.Tech. Dual Degree" && batch == "2017") || (programme == "Ph.D." && batch == "2018") || (programme == "Ph.D." && batch == "2020")) {
    //   reciever = "nature.amit@gmail.com"
    // }
    // else if ((programme == "M.A." && batch == "2019") || (programme == "M.A." && batch == "2021") || (programme == "Ph.D." && batch == "2017") || (programme == "Ph.D." && batch == "2021")) {
    //   reciever = "nature.amit19@gmail.com"
    // }
    // else if ((programme == "M.Sc." && batch == "2019") || (programme == "M.Sc." && batch == "2020") || (programme == "M.Tech." && batch == "2020")) {
    //   reciever = "mukul.raj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2020") || (programme == "Ph.D." && batch == "2013") || (programme == "Ph.D." && batch == "2014")) {
    //   reciever = "mukulraj9661@gmail.com"
    // }
    // else if ((programme == "B.Tech." && batch == "2019") || (programme == "M.A." && batch == "2018") || (programme == "M.A." && batch == "2020")) {
    //   reciever = "thelionkingamit@gmail.com"
    // }
    // else {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }

    var today = new Date();
    var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "Bonafide Request", rollNumber, , , ,graduation_year , , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
        },
    });

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "Bonafide Request", rollNumber, , , ,graduation_year , , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
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

        // console.log(token);

        // var mailOptions = {
        //   from: "Academic Office<nature.prakriti123@gmail.com>",
        //   to: process.env.EMAIL_ID_2,
        //   cc: process.env.EMAIL_ID_1,
        //   bcc: process.env.EMAIL_ID_1,
        //   subject: `(${token}) New Transcript Request`,
        //   text: `Student details \n\nName: ${userName} \nSemester: ${semester} \nEmail ID: ${emailID} \nPhone Number: ${phoneNumber} \nProgramme: ${programme} \nDiscipline: ${discipline} \nRoll Number: ${rollNumber} \nMessage: ${message}`,
        //   html: `<p style="color: black;"><p><u><b>Transcript Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Semester : </b> ${semester} <br><b>Email ID : </b> ${emailID} <br><b>Phone Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br></p>`
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });

        var mailOptions2 = {
            from: "Academic Office<nature.prakriti123@gmail.com>",
            to: emailID,
            bcc: reciever,
            subject: `(${token}) Submitted Bonafide Request`,
            text: `Dear ${userName},\n\nThank you for your Bonafide Request. The number assigned to your request is ${token}. We will shortly attend to your request. Following is your Bonafide Request Details:\n\nBonafide Request Details\n\nName : ${userName} \nEmail ID : ${emailID} \nMobile Number : ${phoneNumber} \nProgramme : ${programme} \nDiscipline : ${discipline} \nRoll Number : ${rollNumber} \nGraduation Year : ${graduation_year} \nMessage : ${message} \n\nRegards\nAcademic Office\nIIT Gandhinagar`,
            html: `<p style="color: black;">Dear <b>${userName}</b>,<br><br><p>Thank you for your Bonafide Request. The number assigned to your request is <b>${token}</b>. We will shortly attend to your request. Following is your Bonafide Request Details:<br><br><u><b>Bonafide Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Email ID : </b> ${emailID} <br><b>Mobile Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Graduation Year : </b> ${graduation_year} <br><b>Message : </b> ${message}<br><br>Please note that this is an auto-generated email and please do not reply to this email.<br><br>Sincerely,<br>Academic Office</p>`,
        };

        transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
                console.log(error);
                res.render("error");
            } else {
                console.log('Email sent: ' + info.response);
                res.render("success", { token: token, requestType: "Bonafide" });
            }
        });
    } else {
        res.render("incorrect_email")
    }
});

//Pass/Fail Grade Certificate Request
app.post('/login', (req, res) => {
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success')
        })
        .catch(console.error);

});

app.post("/pf_grade-request", async function (req, res) {
    const { userName, emailID, phoneNumber, programme, discipline, rollNumber, joining_year, graduation_year, message } = req.body;

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

    // const spreadsheetId = "1cALhZnVzsgFqGwDtDUBt8fyp7Ju0jhmXdysMAdyRohw";
    const spreadsheetId = hanikID;

    // GET Rows
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    })

    // ADDING DATA IN MAIN SHEET
    const getDataRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1",
    });

    var d = new Date();
    var year = d.getFullYear();
    var totalDataRows = getDataRows.data.values.length;

    var totalPfGradeRequests = 0;

    for (var i = 0; i < totalDataRows; i++) {
        if (getDataRows.data.values[i][7] == "Pass/Fail Certificate Request") {
            totalPfGradeRequests += 1;
        }
    }
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    var token = `${year}-PFCR-${totalPfGradeRequests + 1}`;
    // console.log(token);

    var d = new Date();
    var year = d.getFullYear();
    // var totalRows = getRows.data.values.length;
    // console.log("total rows are", totalRows);

    // var newLineNumber = (getRows.data.values.length);
    // console.log(getRows.data.values);
    // var lastRow = totalRows;
    // for (var i = 0; i <= totalRows; i++) {
    //   // console.log(getRows.data.values[i]);
    //   if (getRows.data.values[i][7] == "Pass/Fail Certificate Request") {
    //     lastRow += 1;
    //   }
    //   else if (getRows.data.values[i].length == 0) {
    //     break
    //   }
    // }
    var batch = "20" + rollNumber.substring(0, 2);
    console.log(batch);
    // var token = `${year}-PFCR-${lastRow + 1}`;
    // console.log(token);
    var reciever = "ksheer.agrawal@iitgn.ac.in";
    // if ((batch == "2014" || "2017" || "2021") && (programme == "B.Tech.")) {
    //   reciever = "nature.prakriti123@gmail.com"
    // }
    // else if ((programme == "B.Sc. in Engineering" && batch == "2018") || (programme == "B.Tech." && batch == "2018") || (programme == "Ph.D." && batch == "2015")) {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2016") || (programme == "M.Tech." && batch == "2018") || (programme == "M.Tech." && batch == "2019") || (programme == "M.Tech." && batch == "2021") || (programme == "PGDIIT" && batch == "2021") || (programme == "Ph.D." && batch == "2019")) {
    //   reciever = "ksheer.agrawal@iitgn.ac.in"
    // }
    // else if ((programme == "M.Sc." && batch == "2021") || (programme == "Ph.D." && batch == "2016")) {
    //   reciever = "ksheeragrawal@gmail.com"
    // }
    // else if ((programme == "B.Tech. - M.Sc. Dual Degree") || (programme == "Double Master’s Degree program") || (programme == "B.Tech. - M.Tech. Dual Degree" && batch == "2017") || (programme == "Ph.D." && batch == "2018") || (programme == "Ph.D." && batch == "2020")) {
    //   reciever = "nature.amit@gmail.com"
    // }
    // else if ((programme == "M.A." && batch == "2019") || (programme == "M.A." && batch == "2021") || (programme == "Ph.D." && batch == "2017") || (programme == "Ph.D." && batch == "2021")) {
    //   reciever = "nature.amit19@gmail.com"
    // }
    // else if ((programme == "M.Sc." && batch == "2019") || (programme == "M.Sc." && batch == "2020") || (programme == "M.Tech." && batch == "2020")) {
    //   reciever = "mukul.raj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2020") || (programme == "Ph.D." && batch == "2013") || (programme == "Ph.D." && batch == "2014")) {
    //   reciever = "mukulraj9661@gmail.com"
    // }
    // else if ((programme == "B.Tech." && batch == "2019") || (programme == "M.A." && batch == "2018") || (programme == "M.A." && batch == "2020")) {
    //   reciever = "thelionkingamit@gmail.com"
    // }
    // else {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }

    var today = new Date();
    var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "Pass/Fail Certificate Request", rollNumber, , , joining_year, graduation_year, , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
        },
    });

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "Pass/Fail Certificate Request", rollNumber, , , , , joining_year, graduation_year, , , message, token, "Pending", currentDate + " | " + time, , reciever]],
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

        // console.log(token);

        // var mailOptions = {
        //   from: "Academic Office<nature.prakriti123@gmail.com>",
        //   to: process.env.EMAIL_ID_2,
        //   cc: process.env.EMAIL_ID_1,
        //   bcc: process.env.EMAIL_ID_1,
        //   subject: `(${token}) New Transcript Request`,
        //   text: `Student details \n\nName: ${userName} \nSemester: ${semester} \nEmail ID: ${emailID} \nPhone Number: ${phoneNumber} \nProgramme: ${programme} \nDiscipline: ${discipline} \nRoll Number: ${rollNumber} \nMessage: ${message}`,
        //   html: `<p style="color: black;"><p><u><b>Transcript Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Semester : </b> ${semester} <br><b>Email ID : </b> ${emailID} <br><b>Phone Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br></p>`
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });

        var mailOptions2 = {
            from: "Academic Office<nature.prakriti123@gmail.com>",
            to: emailID,
            bcc: reciever,
            subject: `(${token}) Submitted Pass/Fail Grade Certificate Request`,
            text: `Dear ${userName},\n\nThank you for your Pass/Fail Grade Certificate Request. The number assigned to your request is ${token}. We will shortly attend to your request. Following is your Pass/Fail Grade Certificate Request Details:\n\nPass/Fail Grade Certificate Request Details\n\nName : ${userName} \nEmail ID : ${emailID} \nMobile Number : ${phoneNumber} \nProgramme : ${programme} \nDiscipline : ${discipline} \nRoll Number : ${rollNumber} \nJoining Year : ${joining_year} \nGraduation Year : ${graduation_year} \nMessage : ${message} \n\nRegards\nAcademic Office\nIIT Gandhinagar`,
            html: `<p style="color: black;">Dear <b>${userName}</b>,<br><br><p>Thank you for your Pass/Fail Grade Certificate Request. The number assigned to your request is <b>${token}</b>. We will shortly attend to your request. Following is your Pass/Fail Grade Certificate Request Details:<br><br><u><b>Pass/Fail Grade Certificate Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Email ID : </b> ${emailID} <br><b>Mobile Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Joining Year : </b> ${joining_year} <br><b>Roll Number : </b> ${rollNumber} <br><b>Graduation Year : </b> ${graduation_year} <br><b>Message : </b> ${message}<br><br>Please note that this is an auto-generated email and please do not reply to this email.<br><br>Sincerely,<br>Academic Office</p>`,
        };

        transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
                console.log(error);
                res.render("error");
            } else {
                console.log('Email sent: ' + info.response);
                res.render("success", { token: token, requestType: "Pass/Fail Grade Certificate" });
            }
        });
    } else {
        res.render("incorrect_email")
    }
});



//Noc For Higher Studies
app.post('/login', (req, res) => {
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success')
        })
        .catch(console.error);

});

app.post("/noc_higherstudies-request", async function (req, res) {
    const { userName, emailID, phoneNumber, programme, discipline, rollNumber, joining_year, graduation_year, message } = req.body;

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

    // const spreadsheetId = "1cALhZnVzsgFqGwDtDUBt8fyp7Ju0jhmXdysMAdyRohw";
    const spreadsheetId = hanikID;

    // GET Rows
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    })

    // ADDING DATA IN MAIN SHEET
    const getDataRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1",
    });

    var d = new Date();
    var year = d.getFullYear();
    var totalDataRows = getDataRows.data.values.length;

    var totalNocHigherRequests = 0;

    for (var i = 0; i < totalDataRows; i++) {
        if (getDataRows.data.values[i][7] == "NOC Higher Studies Request") {
            totalNocHigherRequests += 1;
        }
    }
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    var token = `${year}-NHSR-${totalNocHigherRequests + 1}`;
    // console.log(token);

    var d = new Date();
    var year = d.getFullYear();
    // var totalRows = getRows.data.values.length;
    // console.log("total rows are", totalRows);

    // var newLineNumber = (getRows.data.values.length);
    // console.log(getRows.data.values);
    // var lastRow = totalRows;
    // for (var i = 0; i <= totalRows; i++) {
    //   // console.log(getRows.data.values[i]);
    //   if (getRows.data.values[i][7] == "NOC Higher Studies Request") {
    //     lastRow += 1;
    //   }
    //   else if (getRows.data.values[i].length == 0) {
    //     break
    //   }
    // }
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    // var token = `${year}-NHSR-${lastRow + 1}`;
    // console.log(token);
    var reciever = "ksheer.agrawal@iitgn.ac.in";
    // if ((batch == "2014" || "2017" || "2021") && (programme == "B.Tech.")) {
    //   reciever = "nature.prakriti123@gmail.com"
    // }
    // else if ((programme == "B.Sc. in Engineering" && batch == "2018") || (programme == "B.Tech." && batch == "2018") || (programme == "Ph.D." && batch == "2015")) {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2016") || (programme == "M.Tech." && batch == "2018") || (programme == "M.Tech." && batch == "2019") || (programme == "M.Tech." && batch == "2021") || (programme == "PGDIIT" && batch == "2021") || (programme == "Ph.D." && batch == "2019")) {
    //   reciever = "ksheer.agrawal@iitgn.ac.in"
    // }
    // else if ((programme == "M.Sc." && batch == "2021") || (programme == "Ph.D." && batch == "2016")) {
    //   reciever = "ksheeragrawal@gmail.com"
    // }
    // else if ((programme == "B.Tech. - M.Sc. Dual Degree") || (programme == "Double Master’s Degree program") || (programme == "B.Tech. - M.Tech. Dual Degree" && batch == "2017") || (programme == "Ph.D." && batch == "2018") || (programme == "Ph.D." && batch == "2020")) {
    //   reciever = "nature.amit@gmail.com"
    // }
    // else if ((programme == "M.A." && batch == "2019") || (programme == "M.A." && batch == "2021") || (programme == "Ph.D." && batch == "2017") || (programme == "Ph.D." && batch == "2021")) {
    //   reciever = "nature.amit19@gmail.com"
    // }
    // else if ((programme == "M.Sc." && batch == "2019") || (programme == "M.Sc." && batch == "2020") || (programme == "M.Tech." && batch == "2020")) {
    //   reciever = "mukul.raj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2020") || (programme == "Ph.D." && batch == "2013") || (programme == "Ph.D." && batch == "2014")) {
    //   reciever = "mukulraj9661@gmail.com"
    // }
    // else if ((programme == "B.Tech." && batch == "2019") || (programme == "M.A." && batch == "2018") || (programme == "M.A." && batch == "2020")) {
    //   reciever = "thelionkingamit@gmail.com"
    // }
    // else {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }

    var today = new Date();
    var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "NOC Higher Studies Request", rollNumber, , , joining_year, graduation_year, , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
        },
    });

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "NOC Higher Studies Request", rollNumber, , , joining_year, graduation_year, , , , ,message, token, "Pending", currentDate + " | " + time, , reciever]],
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

        // console.log(token);

        // var mailOptions = {
        //   from: "Academic Office<nature.prakriti123@gmail.com>",
        //   to: process.env.EMAIL_ID_2,
        //   cc: process.env.EMAIL_ID_1,
        //   bcc: process.env.EMAIL_ID_1,
        //   subject: `(${token}) New Transcript Request`,
        //   text: `Student details \n\nName: ${userName} \nSemester: ${semester} \nEmail ID: ${emailID} \nPhone Number: ${phoneNumber} \nProgramme: ${programme} \nDiscipline: ${discipline} \nRoll Number: ${rollNumber} \nMessage: ${message}`,
        //   html: `<p style="color: black;"><p><u><b>Transcript Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Semester : </b> ${semester} <br><b>Email ID : </b> ${emailID} <br><b>Phone Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br></p>`
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });

        var mailOptions2 = {
            from: "Academic Office<nature.prakriti123@gmail.com>",
            to: emailID,
            bcc: reciever,
            subject: `(${token}) Submitted NOC For Higher Studies Request`,
            text: `Dear ${userName},\n\nThank you for your NOC for Higher Studies Request. The number assigned to your request is ${token}. We will shortly attend to your request. Following is your NOC for Higher Studies Request Details:\n\nNOC for Higher Studies Request Details\n\nName : ${userName} \nEmail ID : ${emailID} \nMobile Number : ${phoneNumber} \nProgramme : ${programme} \nDiscipline : ${discipline} \nRoll Number : ${rollNumber} \nJoining Year : ${joining_year} \nGraduation Year : ${graduation_year} \nMessage : ${message} \n\nRegards\nAcademic Office\nIIT Gandhinagar`,
            html: `<p style="color: black;">Dear <b>${userName}</b>,<br><br><p>Thank you for your NOC for Higher Studies Request. The number assigned to your request is <b>${token}</b>. We will shortly attend to your request. Following is your NOC for Higher Studies Request Details:<br><br><u><b>NOC for Higher Studies Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Email ID : </b> ${emailID} <br><b>Mobile Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Joining Year : </b> ${joining_year} <br><b>Roll Number : </b> ${rollNumber} <br><b>Graduation Year : </b> ${graduation_year} <br><b>Message : </b> ${message}<br><br>Please note that this is an auto-generated email and please do not reply to this email.<br><br>Sincerely,<br>Academic Office</p>`,
        };

        transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
                console.log(error);
                res.render("error");
            } else {
                console.log('Email sent: ' + info.response);
                res.render("success", { token: token, requestType: "NOC(Higher Studies)" });
            }
        });
    } else {
        res.render("incorrect_email")
    }
});


//course completion

app.post('/login', (req, res) => {
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success')
        })
        .catch(console.error);

});

app.post("/course_completion-report", async function (req, res) {
    const { userName, emailID, phoneNumber, programme, discipline, rollNumber, message } = req.body;

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

    // const spreadsheetId = "1cALhZnVzsgFqGwDtDUBt8fyp7Ju0jhmXdysMAdyRohw";
    const spreadsheetId = hanikID;

    // GET Rows
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    })

    // ADDING DATA IN MAIN SHEET
    const getDataRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1",
    });

    var d = new Date();
    var year = d.getFullYear();
    var totalDataRows = getDataRows.data.values.length;

    var totalCourseCompletionRequests = 0;

    for (var i = 0; i < totalDataRows; i++) {
        if (getDataRows.data.values[i][7] == "Course Completion Report") {
            totalCourseCompletionRequests += 1;
        }
    }
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    var token = `${year}-CCR-${totalCourseCompletionRequests + 1}`;
    // console.log(token);

    var d = new Date();
    var year = d.getFullYear();
    // var totalRows = getRows.data.values.length;
    // console.log("total rows are", totalRows);

    // var newLineNumber = (getRows.data.values.length);
    // console.log(getRows.data.values);
    // var lastRow = totalRows;
    // for (var i = 0; i <= totalRows; i++) {
    //   // console.log(getRows.data.values[i]);
    //   if (getRows.data.values[i][7] == "Course Completion Report") {
    //     lastRow += 1;
    //   }
    //   else if (getRows.data.values[i].length == 0) {
    //     break
    //   }
    // }
    var batch = "20" + rollNumber.substring(0, 2);
    console.log(batch);
    // var token = `${year}-CCR-${lastRow + 1}`;
    // console.log(token);
    var reciever = "ksheer.agrawal@iitgn.ac.in";
    // if ((batch == "2014" || "2017" || "2021") && (programme == "B.Tech.")) {
    //   reciever = "nature.prakriti123@gmail.com"
    // }
    // else if ((programme == "B.Sc. in Engineering" && batch == "2018") || (programme == "B.Tech." && batch == "2018") || (programme == "Ph.D." && batch == "2015")) {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2016") || (programme == "M.Tech." && batch == "2018") || (programme == "M.Tech." && batch == "2019") || (programme == "M.Tech." && batch == "2021") || (programme == "PGDIIT" && batch == "2021") || (programme == "Ph.D." && batch == "2019")) {
    //   reciever = "ksheer.agrawal@iitgn.ac.in"
    // }
    // else if ((programme == "M.Sc." && batch == "2021") || (programme == "Ph.D." && batch == "2016")) {
    //   reciever = "ksheeragrawal@gmail.com"
    // }
    // else if ((programme == "B.Tech. - M.Sc. Dual Degree") || (programme == "Double Master’s Degree program") || (programme == "B.Tech. - M.Tech. Dual Degree" && batch == "2017") || (programme == "Ph.D." && batch == "2018") || (programme == "Ph.D." && batch == "2020")) {
    //   reciever = "nature.amit@gmail.com"
    // }
    // else if ((programme == "M.A." && batch == "2019") || (programme == "M.A." && batch == "2021") || (programme == "Ph.D." && batch == "2017") || (programme == "Ph.D." && batch == "2021")) {
    //   reciever = "nature.amit19@gmail.com"
    // }
    // else if ((programme == "M.Sc." && batch == "2019") || (programme == "M.Sc." && batch == "2020") || (programme == "M.Tech." && batch == "2020")) {
    //   reciever = "mukul.raj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2020") || (programme == "Ph.D." && batch == "2013") || (programme == "Ph.D." && batch == "2014")) {
    //   reciever = "mukulraj9661@gmail.com"
    // }
    // else if ((programme == "B.Tech." && batch == "2019") || (programme == "M.A." && batch == "2018") || (programme == "M.A." && batch == "2020")) {
    //   reciever = "thelionkingamit@gmail.com"
    // }
    // else {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }

    var today = new Date();
    var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "Course Completion Report", rollNumber, , , , , , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
        },
    });

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "Course Completion Report", rollNumber, , , , , , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
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

        // console.log(token);

        // var mailOptions = {
        //   from: "Academic Office<nature.prakriti123@gmail.com>",
        //   to: process.env.EMAIL_ID_2,
        //   cc: process.env.EMAIL_ID_1,
        //   bcc: process.env.EMAIL_ID_1,
        //   subject: `(${token}) New Transcript Request`,
        //   text: `Student details \n\nName: ${userName} \nSemester: ${semester} \nEmail ID: ${emailID} \nPhone Number: ${phoneNumber} \nProgramme: ${programme} \nDiscipline: ${discipline} \nRoll Number: ${rollNumber} \nMessage: ${message}`,
        //   html: `<p style="color: black;"><p><u><b>Transcript Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Semester : </b> ${semester} <br><b>Email ID : </b> ${emailID} <br><b>Phone Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br></p>`
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });

        var mailOptions2 = {
            from: "Academic Office<nature.prakriti123@gmail.com>",
            to: emailID,
            bcc: reciever,
            subject: `(${token}) Submitted Course Completion Certificate Request`,
            text: `Dear ${userName},\n\nThank you for your Course Completion Certificate Request. The number assigned to your request is ${token}. We will shortly attend to your request. Following is your Course Completion Certificate Request Details:\n\nCourse Completion Certificate Request Details\n\nName : ${userName} \nEmail ID : ${emailID} \nMobile Number : ${phoneNumber} \nProgramme : ${programme} \nDiscipline : ${discipline} \nRoll Number : ${rollNumber} \nMessage : ${message} \n\nRegards\nAcademic Office\nIIT Gandhinagar`,
            html: `<p style="color: black;">Dear <b>${userName}</b>,<br><br><p>Thank you for your Teaching Assistant Certificate Request. The number assigned to your request is <b>${token}</b>. We will shortly attend to your request. Following is your Course Completion Certificate Request Details:<br><br><u><b>Course Completion Certificate Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Email ID : </b> ${emailID} <br><b>Mobile Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br>Please note that this is an auto-generated email and please do not reply to this email.<br><br>Sincerely,<br>Academic Office</p>`,
        };

        transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
                console.log(error);
                res.render("error");
            } else {
                console.log('Email sent: ' + info.response);
                res.render("success", { token: token, requestType: "Course Completion Report" });
            }
        });
    } else {
        res.render("incorrect_email")
    }
});

//fees receipt
app.post('/login', (req, res) => {
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success')
        })
        .catch(console.error);

});

app.post("/fees_receipt-report", async function (req, res) {
    const { userName, rollNumber, phoneNumber, programme, discipline, semester, message, emailID } = req.body;

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

    // const spreadsheetId = "1cALhZnVzsgFqGwDtDUBt8fyp7Ju0jhmXdysMAdyRohw";
    const spreadsheetId = hanikID;

    // GET Rows
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    })

    // ADDING DATA IN MAIN SHEET
    const getDataRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1",
    });

    var d = new Date();
    var year = d.getFullYear();
    var totalDataRows = getDataRows.data.values.length;

    var totalFeeReceiptRequests = 0;

    for (var i = 0; i < totalDataRows; i++) {
        if (getDataRows.data.values[i][7] == "Fees Receipt Report") {
            totalFeeReceiptRequests += 1;
        }
    }
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    var token = `${year}-FRR-${totalFeeReceiptRequests + 1}`;
    // console.log(token);

    var d = new Date();
    var year = d.getFullYear();
    // var totalRows = getRows.data.values.length;
    // console.log("total rows are", totalRows);

    // var newLineNumber = (getRows.data.values.length);
    // console.log(getRows.data.values);
    // var lastRow = totalRows;
    // for (var i = 0; i <= totalRows; i++) {
    //   // console.log(getRows.data.values[i]);
    //   if (getRows.data.values[i][7] == "Fees Receipt Report") {
    //     lastRow += 1;
    //   }
    //   else if (getRows.data.values[i].length == 0) {
    //     break
    //   }
    // }
    var batch = "20" + rollNumber.substring(0, 2);
    console.log(batch);
    // var token = `${year}-FRR-${lastRow + 1}`;
    // console.log(token);
    var reciever = "ksheer.agrawal@iitgn.ac.in";
    // if ((batch == "2014" || "2017" || "2021") && (programme == "B.Tech.")) {
    //   reciever = "nature.prakriti123@gmail.com"
    // }
    // else if ((programme == "B.Sc. in Engineering" && batch == "2018") || (programme == "B.Tech." && batch == "2018") || (programme == "Ph.D." && batch == "2015")) {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2016") || (programme == "M.Tech." && batch == "2018") || (programme == "M.Tech." && batch == "2019") || (programme == "M.Tech." && batch == "2021") || (programme == "PGDIIT" && batch == "2021") || (programme == "Ph.D." && batch == "2019")) {
    //   reciever = "ksheer.agrawal@iitgn.ac.in"
    // }
    // else if ((programme == "M.Sc." && batch == "2021") || (programme == "Ph.D." && batch == "2016")) {
    //   reciever = "ksheeragrawal@gmail.com"
    // }
    // else if ((programme == "B.Tech. - M.Sc. Dual Degree") || (programme == "Double Master’s Degree program") || (programme == "B.Tech. - M.Tech. Dual Degree" && batch == "2017") || (programme == "Ph.D." && batch == "2018") || (programme == "Ph.D." && batch == "2020")) {
    //   reciever = "nature.amit@gmail.com"
    // }
    // else if ((programme == "M.A." && batch == "2019") || (programme == "M.A." && batch == "2021") || (programme == "Ph.D." && batch == "2017") || (programme == "Ph.D." && batch == "2021")) {
    //   reciever = "nature.amit19@gmail.com"
    // }
    // else if ((programme == "M.Sc." && batch == "2019") || (programme == "M.Sc." && batch == "2020") || (programme == "M.Tech." && batch == "2020")) {
    //   reciever = "mukul.raj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2020") || (programme == "Ph.D." && batch == "2013") || (programme == "Ph.D." && batch == "2014")) {
    //   reciever = "mukulraj9661@gmail.com"
    // }
    // else if ((programme == "B.Tech." && batch == "2019") || (programme == "M.A." && batch == "2018") || (programme == "M.A." && batch == "2020")) {
    //   reciever = "thelionkingamit@gmail.com"
    // }
    // else {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }

    var today = new Date();
    var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, semester, batch, emailID, phoneNumber, programme, discipline, "Fees Receipt Report", rollNumber, , , , , , , , , message, token, "Pending", currentDate + " | " + time,]],
        },
    });

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, semester, batch, emailID, phoneNumber, programme, discipline, "Fees Receipt Report", rollNumber, , , , , , , , , message, token, "Pending", currentDate + " | " + time,]],
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

        // console.log(token);

        // var mailOptions = {
        //   from: "Academic Office<nature.prakriti123@gmail.com>",
        //   to: process.env.EMAIL_ID_2,
        //   cc: process.env.EMAIL_ID_1,
        //   bcc: process.env.EMAIL_ID_1,
        //   subject: `(${token}) New Transcript Request`,
        //   text: `Student details \n\nName: ${userName} \nSemester: ${semester} \nEmail ID: ${emailID} \nPhone Number: ${phoneNumber} \nProgramme: ${programme} \nDiscipline: ${discipline} \nRoll Number: ${rollNumber} \nMessage: ${message}`,
        //   html: `<p style="color: black;"><p><u><b>Transcript Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Semester : </b> ${semester} <br><b>Email ID : </b> ${emailID} <br><b>Phone Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br></p>`
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });

        var mailOptions2 = {
            from: "Academic Office<nature.prakriti123@gmail.com>",
            to: emailID,
            bcc: reciever,
            subject: `(${token}) Submitted Fees Receipt Request`,
            text: `Dear ${userName},\n\nThank you for Fees Receipt Request. The number assigned to your request is ${token}. We will shortly attend to your request. Following is your Fees Receipt Request Details:\n\nFees Receipt Request Details\n\nName : ${userName} \nSemester : ${semester} \nEmail ID : ${emailID} \nMobile Number : ${phoneNumber} \nProgramme : ${programme} \nDiscipline : ${discipline} \nRoll Number : ${rollNumber} \nMessage : ${message} \n\nRegards\nAcademic Office\nIIT Gandhinagar`,
            html: `<p style="color: black;">Dear <b>${userName}</b>,<br><br><p>Thank you for your Fees Receipt Request. The number assigned to your request is <b>${token}</b>. We will shortly attend to your request. Following is your Fees Receipt Request Details:<br><br><u><b>Fees Receipt Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Semester : </b> ${semester} <br><b>Email ID : </b> ${emailID} <br><b>Mobile Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br>Please note that this is an auto-generated email and please do not reply to this email.<br><br>Sincerely,<br>Academic Office</p>`,
        };

        transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
                console.log(error);
                res.render("error");
            } else {
                console.log('Email sent: ' + info.response);
                res.render("success", { token: token, requestType: "Fees Receipt Report" });
            }
        });
    } else {
        res.render("incorrect_email")
    }
});


// teaching assistant
app.post('/login', (req, res) => {
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success')
        })
        .catch(console.error);

});

app.post("/teaching_assistant-report", async function (req, res) {
    const { userName, emailID, phoneNumber, programme, discipline, rollNumber, message } = req.body;

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

    // const spreadsheetId = "1cALhZnVzsgFqGwDtDUBt8fyp7Ju0jhmXdysMAdyRohw";
    const spreadsheetId = hanikID;

    // GET Rows
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    })

    // ADDING DATA IN MAIN SHEET
    const getDataRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1",
    });

    var d = new Date();
    var year = d.getFullYear();
    var totalDataRows = getDataRows.data.values.length;

    var totalTARequests = 0;

    for (var i = 0; i < totalDataRows; i++) {
        if (getDataRows.data.values[i][7] == "Teaching Assistant Report") {
            totalTARequests += 1;
        }
    }
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    var token = `${year}-TAR-${totalTARequests + 1}`;
    // console.log(token);

    var d = new Date();
    var year = d.getFullYear();
    // var totalRows = getRows.data.values.length;
    // console.log("total rows are", totalRows);

    // var newLineNumber = (getRows.data.values.length);
    // console.log(getRows.data.values);
    // var lastRow = totalRows;
    // for (var i = 0; i <= totalRows; i++) {
    //   // console.log(getRows.data.values[i]);
    //   if (getRows.data.values[i][7] == "Teaching Assistant Report") {
    //     lastRow += 1;
    //   }
    //   else if (getRows.data.values[i].length == 0) {
    //     break
    //   }
    // }
    var batch = "20" + rollNumber.substring(0, 2);
    console.log(batch);
    // var token = `${year}-TAR-${lastRow + 1}`;
    // console.log(token);
    var reciever = "ksheer.agrawal@iitgn.ac.in";
    // if ((batch == "2014" || "2017" || "2021") && (programme == "B.Tech.")) {
    //   reciever = "nature.prakriti123@gmail.com"
    // }
    // else if ((programme == "B.Sc. in Engineering" && batch == "2018") || (programme == "B.Tech." && batch == "2018") || (programme == "Ph.D." && batch == "2015")) {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2016") || (programme == "M.Tech." && batch == "2018") || (programme == "M.Tech." && batch == "2019") || (programme == "M.Tech." && batch == "2021") || (programme == "PGDIIT" && batch == "2021") || (programme == "Ph.D." && batch == "2019")) {
    //   reciever = "ksheer.agrawal@iitgn.ac.in"
    // }
    // else if ((programme == "M.Sc." && batch == "2021") || (programme == "Ph.D." && batch == "2016")) {
    //   reciever = "ksheeragrawal@gmail.com"
    // }
    // else if ((programme == "B.Tech. - M.Sc. Dual Degree") || (programme == "Double Master’s Degree program") || (programme == "B.Tech. - M.Tech. Dual Degree" && batch == "2017") || (programme == "Ph.D." && batch == "2018") || (programme == "Ph.D." && batch == "2020")) {
    //   reciever = "nature.amit@gmail.com"
    // }
    // else if ((programme == "M.A." && batch == "2019") || (programme == "M.A." && batch == "2021") || (programme == "Ph.D." && batch == "2017") || (programme == "Ph.D." && batch == "2021")) {
    //   reciever = "nature.amit19@gmail.com"
    // }
    // else if ((programme == "M.Sc." && batch == "2019") || (programme == "M.Sc." && batch == "2020") || (programme == "M.Tech." && batch == "2020")) {
    //   reciever = "mukul.raj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2020") || (programme == "Ph.D." && batch == "2013") || (programme == "Ph.D." && batch == "2014")) {
    //   reciever = "mukulraj9661@gmail.com"
    // }
    // else if ((programme == "B.Tech." && batch == "2019") || (programme == "M.A." && batch == "2018") || (programme == "M.A." && batch == "2020")) {
    //   reciever = "thelionkingamit@gmail.com"
    // }
    // else {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }

    var today = new Date();
    var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "Teaching Assistant Report", rollNumber, , , , , , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
        },
    });

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "Teaching Assistant Report", rollNumber, , , , , , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
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

        // console.log(token);

        // var mailOptions = {
        //   from: "Academic Office<nature.prakriti123@gmail.com>",
        //   to: process.env.EMAIL_ID_2,
        //   cc: process.env.EMAIL_ID_1,
        //   bcc: process.env.EMAIL_ID_1,
        //   subject: `(${token}) New Transcript Request`,
        //   text: `Student details \n\nName: ${userName} \nSemester: ${semester} \nEmail ID: ${emailID} \nPhone Number: ${phoneNumber} \nProgramme: ${programme} \nDiscipline: ${discipline} \nRoll Number: ${rollNumber} \nMessage: ${message}`,
        //   html: `<p style="color: black;"><p><u><b>Transcript Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Semester : </b> ${semester} <br><b>Email ID : </b> ${emailID} <br><b>Phone Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br></p>`
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });

        var mailOptions2 = {
            from: "Academic Office<nature.prakriti123@gmail.com>",
            to: emailID,
            bcc: reciever,
            subject: `(${token}) Submitted Teaching Assistant Certificate Request`,
            text: `Dear ${userName},\n\nThank you for your Teaching Assistant Certificate Request. The number assigned to your request is ${token}. We will shortly attend to your request. Following is your Teaching Assistant Certificate Request Details:\n\nTeaching Assistant Certificate Request Details\n\nName : ${userName} \nEmail ID : ${emailID} \nMobile Number : ${phoneNumber} \nProgramme : ${programme} \nDiscipline : ${discipline} \nRoll Number : ${rollNumber} \nMessage : ${message} \n\nRegards\nAcademic Office\nIIT Gandhinagar`,
            html: `<p style="color: black;">Dear <b>${userName}</b>,<br><br><p>Thank you for your Teaching Assistant Certificate Request. The number assigned to your request is <b>${token}</b>. We will shortly attend to your request. Following is your Teaching Assistant Certificate Request Details:<br><br><u><b>Teaching Assistant Certificate Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Email ID : </b> ${emailID} <br><b>Mobile Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br>Please note that this is an auto-generated email and please do not reply to this email.<br><br>Sincerely,<br>Academic Office</p>`,
        };

        transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
                console.log(error);
                res.render("error");
            } else {
                console.log('Email sent: ' + info.response);
                res.render("success", { token: token, requestType: "Teaching Assistant Report" });
            }
        });
    } else {
        res.render("incorrect_email")
    }
});


//provisional PhD
app.post('/login', (req, res) => {
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success')
        })
        .catch(console.error);

});

app.post("/provisional_phd-request", async function (req, res) {
    const { userName, emailID, phoneNumber, programme, discipline, rollNumber, defense_date, message } = req.body;

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

    // const spreadsheetId = "1cALhZnVzsgFqGwDtDUBt8fyp7Ju0jhmXdysMAdyRohw";
    const spreadsheetId = hanikID;

    // GET Rows
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    })

    // ADDING DATA IN MAIN SHEET
    const getDataRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1",
    });

    var d = new Date();
    var year = d.getFullYear();
    var totalDataRows = getDataRows.data.values.length;

    var totalProvisionalRequests = 0;

    for (var i = 0; i < totalDataRows; i++) {
        if (getDataRows.data.values[i][7] == "Provisional PhD Request") {
            totalProvisionalRequests += 1;
        }
    }
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    var token = `${year}-PPR-${totalProvisionalRequests + 1}`;
    // console.log(token);

    var d = new Date();
    var year = d.getFullYear();
    // var totalRows = getRows.data.values.length;
    // console.log("total rows are", totalRows);

    // var newLineNumber = (getRows.data.values.length);
    // console.log(getRows.data.values);
    // var lastRow = totalRows;
    // for (var i = 0; i <= totalRows; i++) {
    //   // console.log(getRows.data.values[i]);
    //   if (getRows.data.values[i][7] == "Provisional PhD Request") {
    //     lastRow += 1;
    //   }
    //   else if (getRows.data.values[i].length == 0) {
    //     break
    //   }
    // }
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    // var token = `${year}-PPR-${lastRow + 1}`;
    // console.log(token);
    var reciever = "ksheer.agrawal@iitgn.ac.in";
    // if ((batch == "2014" || "2017" || "2021") && (programme == "B.Tech.")) {
    //   reciever = "nature.prakriti123@gmail.com"
    // }
    // else if ((programme == "B.Sc. in Engineering" && batch == "2018") || (programme == "B.Tech." && batch == "2018") || (programme == "Ph.D." && batch == "2015")) {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2016") || (programme == "M.Tech." && batch == "2018") || (programme == "M.Tech." && batch == "2019") || (programme == "M.Tech." && batch == "2021") || (programme == "PGDIIT" && batch == "2021") || (programme == "Ph.D." && batch == "2019")) {
    //   reciever = "ksheer.agrawal@iitgn.ac.in"
    // }
    // else if ((programme == "M.Sc." && batch == "2021") || (programme == "Ph.D." && batch == "2016")) {
    //   reciever = "ksheeragrawal@gmail.com"
    // }
    // else if ((programme == "B.Tech. - M.Sc. Dual Degree") || (programme == "Double Master’s Degree program") || (programme == "B.Tech. - M.Tech. Dual Degree" && batch == "2017") || (programme == "Ph.D." && batch == "2018") || (programme == "Ph.D." && batch == "2020")) {
    //   reciever = "nature.amit@gmail.com"
    // }
    // else if ((programme == "M.A." && batch == "2019") || (programme == "M.A." && batch == "2021") || (programme == "Ph.D." && batch == "2017") || (programme == "Ph.D." && batch == "2021")) {
    //   reciever = "nature.amit19@gmail.com"
    // }
    // else if ((programme == "M.Sc." && batch == "2019") || (programme == "M.Sc." && batch == "2020") || (programme == "M.Tech." && batch == "2020")) {
    //   reciever = "mukul.raj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2020") || (programme == "Ph.D." && batch == "2013") || (programme == "Ph.D." && batch == "2014")) {
    //   reciever = "mukulraj9661@gmail.com"
    // }
    // else if ((programme == "B.Tech." && batch == "2019") || (programme == "M.A." && batch == "2018") || (programme == "M.A." && batch == "2020")) {
    //   reciever = "thelionkingamit@gmail.com"
    // }
    // else {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }

    var today = new Date();
    var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "Provisional PhD Request", rollNumber, defense_date, , , , , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
        },
    });

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "Provisional PhD Request", rollNumber, defense_date, , , , , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
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

        // console.log(token);

        // var mailOptions = {
        //   from: "Academic Office<nature.prakriti123@gmail.com>",
        //   to: process.env.EMAIL_ID_2,
        //   cc: process.env.EMAIL_ID_1,
        //   bcc: process.env.EMAIL_ID_1,
        //   subject: `(${token}) New Transcript Request`,
        //   text: `Student details \n\nName: ${userName} \nSemester: ${semester} \nEmail ID: ${emailID} \nPhone Number: ${phoneNumber} \nProgramme: ${programme} \nDiscipline: ${discipline} \nRoll Number: ${rollNumber} \nMessage: ${message}`,
        //   html: `<p style="color: black;"><p><u><b>Transcript Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Semester : </b> ${semester} <br><b>Email ID : </b> ${emailID} <br><b>Phone Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br></p>`
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });

        var mailOptions2 = {
            from: "Academic Office<nature.prakriti123@gmail.com>",
            to: emailID,
            bcc: reciever,
            subject: `(${token}) Submitted Provisional Certificate (Ph.D.)`,
            text: `Dear ${userName},\n\nThank you for your Provisional Certificate (Ph.D.). The number assigned to your request is ${token}. We will shortly attend to your request. Following is your Provisional Certificate (Ph.D.) Details:\n\nProvisional Certificate (Ph.D.) Details\n\nName : ${userName} \nEmail ID : ${emailID} \nMobile Number : ${phoneNumber} \nProgramme : ${programme} \nDiscipline : ${discipline} \nRoll Number : ${rollNumber} \nThesis Defense Date : ${defense_date} \nMessage : ${message} \n\nRegards\nAcademic Office\nIIT Gandhinagar`,
            html: `<p style="color: black;">Dear <b>${userName}</b>,<br><br><p>Thank you for your Provisional Certificate (Ph.D.). The number assigned to your request is <b>${token}</b>. We will shortly attend to your request. Following is your Provisional Certificate (Ph.D.) Request Details:<br><br><u><b>Provisional Certificate (Ph.D.) Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Email ID : </b> ${emailID} <br><b>Mobile Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Thesis Defense Date : </b> ${defense_date} <br><b>Message : </b> ${message}<br><br>Please note that this is an auto-generated email and please do not reply to this email.<br><br>Sincerely,<br>Academic Office</p>`,
        };

        transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
                console.log(error);
                res.render("error");
            } else {
                console.log('Email sent: ' + info.response);
                res.render("success", { token: token, requestType: "Provisional Certificate (Ph.D.)" });
            }
        });
    } else {
        res.render("incorrect_email")
    }
});

//provisional non- PhD

app.post('/login', (req, res) => {
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success')
        })
        .catch(console.error);

});

app.post("/provisional_nphd-request", async function (req, res) {
    const { userName, emailID, phoneNumber, programme, discipline, rollNumber, defense_date, message } = req.body;

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

    // const spreadsheetId = "1cALhZnVzsgFqGwDtDUBt8fyp7Ju0jhmXdysMAdyRohw";
    const spreadsheetId = hanikID;

    // GET Rows
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    })

    // ADDING DATA IN MAIN SHEET
    const getDataRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1",
    });

    var d = new Date();
    var year = d.getFullYear();
    var totalDataRows = getDataRows.data.values.length;

    var totalNPHDRequests = 0;

    for (var i = 0; i < totalDataRows; i++) {
        if (getDataRows.data.values[i][7] == "Provisional Non-PhD Request") {
            totalNPHDRequests += 1;
        }
    }
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    var token = `${year}-PNR-${totalNPHDRequests + 1}`;
    // console.log(token);

    var d = new Date();
    var year = d.getFullYear();
    // var totalRows = getRows.data.values.length;
    // console.log("total rows are", totalRows);

    // var newLineNumber = (getRows.data.values.length);
    // console.log(getRows.data.values);
    // var lastRow = totalRows;
    // for (var i = 0; i <= totalRows; i++) {
    //   // console.log(getRows.data.values[i]);
    //   if (getRows.data.values[i][7] == "Provisional Non-PhD Request") {
    //     lastRow += 1;
    //   }
    //   else if (getRows.data.values[i].length == 0) {
    //     break
    //   }
    // }
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    // var token = `${year}-PNR-${lastRow + 1}`;
    // console.log(token);
    var reciever = "ksheer.agrawal@iitgn.ac.in";
    // if ((batch == "2014" || "2017" || "2021") && (programme == "B.Tech.")) {
    //   reciever = "nature.prakriti123@gmail.com"
    // }
    // else if ((programme == "B.Sc. in Engineering" && batch == "2018") || (programme == "B.Tech." && batch == "2018") || (programme == "Ph.D." && batch == "2015")) {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2016") || (programme == "M.Tech." && batch == "2018") || (programme == "M.Tech." && batch == "2019") || (programme == "M.Tech." && batch == "2021") || (programme == "PGDIIT" && batch == "2021") || (programme == "Ph.D." && batch == "2019")) {
    //   reciever = "ksheer.agrawal@iitgn.ac.in"
    // }
    // else if ((programme == "M.Sc." && batch == "2021") || (programme == "Ph.D." && batch == "2016")) {
    //   reciever = "ksheeragrawal@gmail.com"
    // }
    // else if ((programme == "B.Tech. - M.Sc. Dual Degree") || (programme == "Double Master’s Degree program") || (programme == "B.Tech. - M.Tech. Dual Degree" && batch == "2017") || (programme == "Ph.D." && batch == "2018") || (programme == "Ph.D." && batch == "2020")) {
    //   reciever = "nature.amit@gmail.com"
    // }
    // else if ((programme == "M.A." && batch == "2019") || (programme == "M.A." && batch == "2021") || (programme == "Ph.D." && batch == "2017") || (programme == "Ph.D." && batch == "2021")) {
    //   reciever = "nature.amit19@gmail.com"
    // }
    // else if ((programme == "M.Sc." && batch == "2019") || (programme == "M.Sc." && batch == "2020") || (programme == "M.Tech." && batch == "2020")) {
    //   reciever = "mukul.raj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2020") || (programme == "Ph.D." && batch == "2013") || (programme == "Ph.D." && batch == "2014")) {
    //   reciever = "mukulraj9661@gmail.com"
    // }
    // else if ((programme == "B.Tech." && batch == "2019") || (programme == "M.A." && batch == "2018") || (programme == "M.A." && batch == "2020")) {
    //   reciever = "thelionkingamit@gmail.com"
    // }
    // else {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }

    var today = new Date();
    var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "Provisional Non-PhD Request", rollNumber, defense_date, , , , , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
        },
    });

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "Provisional Non-PhD Request", rollNumber, defense_date, , , , , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
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

        // console.log(token);

        // var mailOptions = {
        //   from: "Academic Office<nature.prakriti123@gmail.com>",
        //   to: process.env.EMAIL_ID_2,
        //   cc: process.env.EMAIL_ID_1,
        //   bcc: process.env.EMAIL_ID_1,
        //   subject: `(${token}) New Transcript Request`,
        //   text: `Student details \n\nName: ${userName} \nSemester: ${semester} \nEmail ID: ${emailID} \nPhone Number: ${phoneNumber} \nProgramme: ${programme} \nDiscipline: ${discipline} \nRoll Number: ${rollNumber} \nMessage: ${message}`,
        //   html: `<p style="color: black;"><p><u><b>Transcript Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Semester : </b> ${semester} <br><b>Email ID : </b> ${emailID} <br><b>Phone Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br></p>`
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });

        var mailOptions2 = {
            from: "Academic Office<nature.prakriti123@gmail.com>",
            to: emailID,
            bcc: reciever,
            subject: `(${token}) Submitted Provisional Certificate (Non - Ph.D.)`,
            text: `Dear ${userName},\n\nThank you for your Provisional Certificate (Non - Ph.D.). The number assigned to your request is ${token}. We will shortly attend to your request. Following is your Provisional Certificate (Non - Ph.D.) Details:\n\nProvisional Certificate (Non - Ph.D.) Details\n\nName : ${userName} \nEmail ID : ${emailID} \nMobile Number : ${phoneNumber} \nProgramme : ${programme} \nDiscipline : ${discipline} \nRoll Number : ${rollNumber} \nThesis Defense Date : ${defense_date} \nMessage : ${message} \n\nRegards\nAcademic Office\nIIT Gandhinagar`,
            html: `<p style="color: black;">Dear <b>${userName}</b>,<br><br><p>Thank you for your Provisional Certificate (Non - Ph.D.). The number assigned to your request is <b>${token}</b>. We will shortly attend to your request. Following is your Provisional Certificate (Non - Ph.D.) Request Details:<br><br><u><b>Provisional Certificate (Non - Ph.D.) Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Email ID : </b> ${emailID} <br><b>Mobile Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Thesis Defense Date : </b> ${defense_date} <br><b>Message : </b> ${message}<br><br>Please note that this is an auto-generated email and please do not reply to this email.<br><br>Sincerely,<br>Academic Office</p>`,
        };

        transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
                console.log(error);
                res.render("error");
            } else {
                console.log('Email sent: ' + info.response);
                res.render("success", { token: token, requestType: "Provisional Certificate(Non-Ph.D.)" });
            }
        });
    } else {
        res.render("incorrect_email")
    }
});

// English Proficiency
app.post('/login', (req, res) => {
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success')
        })
        .catch(console.error);

});

app.post("/english_proficiency-request", async function (req, res) {
    const { userName, emailID, phoneNumber, programme, discipline, rollNumber, message } = req.body;

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

    // const spreadsheetId = "1cALhZnVzsgFqGwDtDUBt8fyp7Ju0jhmXdysMAdyRohw";
    const spreadsheetId = hanikID;

    // GET Rows
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    })

    // ADDING DATA IN MAIN SHEET
    const getDataRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1",
    });

    var d = new Date();
    var year = d.getFullYear();
    var totalDataRows = getDataRows.data.values.length;

    var totalEnglishRequests = 0;

    for (var i = 0; i < totalDataRows; i++) {
        if (getDataRows.data.values[i][7] == "English Proficiency Request") {
            totalEnglishRequests += 1;
        }
    }
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    var token = `${year}-EPR-${totalEnglishRequests + 1}`;
    // console.log(token);

    var d = new Date();
    var year = d.getFullYear();
    // var totalRows = getRows.data.values.length;
    // console.log("total rows are", totalRows);

    // var newLineNumber = (getRows.data.values.length);
    // console.log(getRows.data.values);
    // var lastRow = totalRows;
    // for (var i = 0; i <= totalRows; i++) {
    //   // console.log(getRows.data.values[i]);
    //   if (getRows.data.values[i][7] == "English Proficiency Request") {
    //     lastRow += 1;
    //   }
    //   else if (getRows.data.values[i].length == 0) {
    //     break
    //   }
    // }
    var batch = "20" + rollNumber.substring(0, 2);
    // console.log(batch);
    // var token = `${year}-EPR-${lastRow + 1}`;
    // console.log(token);
    var reciever = "ksheer.agrawal@iitgn.ac.in";
    // if ((batch == "2014" || "2017" || "2021") && (programme == "B.Tech.")) {
    //   reciever = "nature.prakriti123@gmail.com"
    // }
    // else if ((programme == "B.Sc. in Engineering" && batch == "2018") || (programme == "B.Tech." && batch == "2018") || (programme == "Ph.D." && batch == "2015")) {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2016") || (programme == "M.Tech." && batch == "2018") || (programme == "M.Tech." && batch == "2019") || (programme == "M.Tech." && batch == "2021") || (programme == "PGDIIT" && batch == "2021") || (programme == "Ph.D." && batch == "2019")) {
    //   reciever = "ksheer.agrawal@iitgn.ac.in"
    // }
    // else if ((programme == "M.Sc." && batch == "2021") || (programme == "Ph.D." && batch == "2016")) {
    //   reciever = "ksheeragrawal@gmail.com"
    // }
    // else if ((programme == "B.Tech. - M.Sc. Dual Degree") || (programme == "Double Master’s Degree program") || (programme == "B.Tech. - M.Tech. Dual Degree" && batch == "2017") || (programme == "Ph.D." && batch == "2018") || (programme == "Ph.D." && batch == "2020")) {
    //   reciever = "nature.amit@gmail.com"
    // }
    // else if ((programme == "M.A." && batch == "2019") || (programme == "M.A." && batch == "2021") || (programme == "Ph.D." && batch == "2017") || (programme == "Ph.D." && batch == "2021")) {
    //   reciever = "nature.amit19@gmail.com"
    // }
    // else if ((programme == "M.Sc." && batch == "2019") || (programme == "M.Sc." && batch == "2020") || (programme == "M.Tech." && batch == "2020")) {
    //   reciever = "mukul.raj@iitgn.ac.in"
    // }
    // else if ((programme == "B.Tech." && batch == "2020") || (programme == "Ph.D." && batch == "2013") || (programme == "Ph.D." && batch == "2014")) {
    //   reciever = "mukulraj9661@gmail.com"
    // }
    // else if ((programme == "B.Tech." && batch == "2019") || (programme == "M.A." && batch == "2018") || (programme == "M.A." && batch == "2020")) {
    //   reciever = "thelionkingamit@gmail.com"
    // }
    // else {
    //   reciever = "prakriti.saroj@iitgn.ac.in"
    // }

    var today = new Date();
    var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "English Proficiency Request", rollNumber, , , , , , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
        },
    });

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: mainSheet,
        range: "Sheet1!A:L",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userName, , batch, emailID, phoneNumber, programme, discipline, "English Proficiency Request", rollNumber, , , , , , , , , message, token, "Pending", currentDate + " | " + time, , reciever]],
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

        // console.log(token);

        // var mailOptions = {
        //   from: "Academic Office<nature.prakriti123@gmail.com>",
        //   to: process.env.EMAIL_ID_2,
        //   cc: process.env.EMAIL_ID_1,
        //   bcc: process.env.EMAIL_ID_1,
        //   subject: `(${token}) New Transcript Request`,
        //   text: `Student details \n\nName: ${userName} \nSemester: ${semester} \nEmail ID: ${emailID} \nPhone Number: ${phoneNumber} \nProgramme: ${programme} \nDiscipline: ${discipline} \nRoll Number: ${rollNumber} \nMessage: ${message}`,
        //   html: `<p style="color: black;"><p><u><b>Transcript Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Semester : </b> ${semester} <br><b>Email ID : </b> ${emailID} <br><b>Phone Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br></p>`
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });

        var mailOptions2 = {
            from: "Academic Office<nature.prakriti123@gmail.com>",
            to: emailID,
            bcc: reciever,
            subject: `(${token}) Submitted English Proficiency Request`,
            text: `Dear ${userName},\n\nThank you for your English Proficiency Request. The number assigned to your request is ${token}. We will shortly attend to your request. Following is your English Proficiency Request Details:\n\nEnglish Proficiency Request Details\n\nName : ${userName} \nEmail ID : ${emailID} \nMobile Number : ${phoneNumber} \nProgramme : ${programme} \nDiscipline : ${discipline} \nRoll Number : ${rollNumber} \nMessage : ${message} \n\nRegards\nAcademic Office\nIIT Gandhinagar`,
            html: `<p style="color: black;">Dear <b>${userName}</b>,<br><br><p>Thank you for your English Proficiency Request. The number assigned to your request is <b>${token}</b>. We will shortly attend to your request. Following is your English Proficiency Request Details:<br><br><u><b>English Proficiency Request Details</b></u><br><br><b>Name : </b> ${userName} <br><b>Email ID : </b> ${emailID} <br><b>Mobile Number : </b> ${phoneNumber} <br><b>Programme : </b> ${programme} <br><b>Discipline : </b> ${discipline} <br><b>Roll Number : </b> ${rollNumber} <br><b>Message : </b> ${message}<br><br>Please note that this is an auto-generated email and please do not reply to this email.<br><br>Sincerely,<br>Academic Office</p>`,
        };

        transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
                console.log(error);
                res.render("error");
            } else {
                console.log('Email sent: ' + info.response);
                res.render("success", { token: token, requestType: "English Proficiency Certificate" });
            }
        });
    } else {
        res.render("incorrect_email")
    }
});


// get request
app.get('/request', checkAuthenticated, (req, res) => {
    let user = req.user;
    //console.log(user);
    if (user.email == "nature.prakriti123@gmail.com" || user.email == "ksheeragrawal@gmail.com" || user.email == "acadoffice5@gmail.com") {
        res.render("dashboard", { user: user });
    }
    else if (user.email.includes("@iitgn.ac.in")) {
        res.render("request_types", { user: user });
    }
    else {
        res.render("incorrect_email");
    }
});

app.get('/teaching_assistant-report', checkAuthenticated, (req, res) => {
    let user = req.user;
    // console.log(user);
    if (user.email.includes("@iitgn.ac.in")) {
        res.render("teaching_assistant", { user: user, error: "" });
    }
    else {
        res.render("incorrect_email");
    }
});

app.get('/english_proficiency-request', checkAuthenticated, (req, res) => {
    let user = req.user;
    // console.log(user);
    if (user.email.includes("@iitgn.ac.in")) {
        res.render("english_proficiency", { user: user, error: "" });
    }
    else {
        res.render("incorrect_email");
    }
});

app.get('/course_completion-report', checkAuthenticated, (req, res) => {
    let user = req.user;
    // console.log(user);
    if (user.email.includes("@iitgn.ac.in")) {
        res.render("course_completion", { user: user, error: "" });
    }
    else {
        res.render("incorrect_email");
    }
});

app.get('/fees_receipt-report', checkAuthenticated, (req, res) => {
    let user = req.user;
    // console.log(user);
    if (user.email.includes("@iitgn.ac.in")) {
        res.render("fees_receipt", { user: user, error: "" });
    }
    else {
        res.render("incorrect_email");
    }
});

app.get('/transcript-request', checkAuthenticated, (req, res) => {
    let user = req.user;
    // console.log(user);
    if (user.email.includes("@iitgn.ac.in")) {
        res.render("transcript", { user: user, error: "" });
    }
    else {
        res.render("incorrect_email");
    }
});

app.get('/internship-request', checkAuthenticated, (req, res) => {
    let user = req.user;
    // console.log(user);
    if (user.email.includes("@iitgn.ac.in")) {
        res.render("internship", { user: user, error: "" });
    }
    else {
        res.render("incorrect_email");
    }
});

app.get('/bonafide-request', checkAuthenticated, (req, res) => {
    let user = req.user;
    // console.log(user);
    if (user.email.includes("@iitgn.ac.in")) {
        res.render("bonafide", { user: user, error: "" });
    }
    else {
        res.render("incorrect_email");
    }
});

app.get('/noc_higherstudies-request', checkAuthenticated, (req, res) => {
    let user = req.user;
    // console.log(user);
    if (user.email.includes("@iitgn.ac.in")) {
        res.render("noc_higherstudies", { user: user, error: "" });
    }
    else {
        res.render("incorrect_email");
    }
});

app.get('/pf_grade-request', checkAuthenticated, (req, res) => {
    let user = req.user;
    // console.log(user);
    if (user.email.includes("@iitgn.ac.in")) {
        res.render("pf_grade", { user: user, error: "" });
    }
    else {
        res.render("incorrect_email");
    }
});

app.get('/provisional_nphd-request', checkAuthenticated, (req, res) => {
    let user = req.user;
    // console.log(user);
    if (user.email.includes("@iitgn.ac.in")) {
        res.render("provisional_nphd", { user: user, error: "" });
    }
    else {
        res.render("incorrect_email");
    }
});

app.get('/provisional_phd-request', checkAuthenticated, (req, res) => {
    let user = req.user;
    // console.log(user);
    if (user.email.includes("@iitgn.ac.in")) {
        res.render("provisional_phd", { user: user, error: "" });
    }
    else {
        res.render("incorrect_email");
    }
});

app.get('/thesis_def-request', checkAuthenticated, (req, res) => {
    let user = req.user;
    // console.log(user);
    if (user.email.includes("@iitgn.ac.in")) {
        res.render("thesis_def", { user: user, error: "" });
    }
    else {
        res.render("incorrect_email");
    }
});

app.get('/thesis_sub-request', checkAuthenticated, (req, res) => {
    let user = req.user;
    // console.log(user);
    if (user.email.includes("@iitgn.ac.in")) {
        res.render("thesis_sub", { user: user, error: "" });
    }
    else {
        res.render("incorrect_email");
    }
});

app.get('/grade-report', checkAuthenticated, (req, res) => {
    let user = req.user;
    // console.log(user);
    if (user.email.includes("@iitgn.ac.in")) {
        res.render("grade", { user: user });
    }
    else {
        res.render("incorrect_email");
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('session-token');
    res.redirect('/')

})

function checkAuthenticated(req, res, next) {

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
    }
    verify()
        .then(() => {
            req.user = user;
            next();
        })
        .catch(err => {
            res.redirect('/')
        })

}
function validate() {
    var mobiletxt = document.getElementById("phoneNumber").value;
    var mobilexp = /^\d{10}$/;
    if (mobiletxt.match(mobileexp)) { return true; }
    else {
        alert("Invalid Mobile Number");
        return false;
    }
}

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000");
});
