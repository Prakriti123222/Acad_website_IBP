const form = document.getElementById("form1");

form.addEventListener('submit', (e) => {
    let userName = document.getElementById('userName');
let emailID = document.getElementById('emailID');
let phoneNumber = document.getElementById('phoneNumber');
let programme = document.getElementById('programme');
let discipline = document.getElementById('discipline');
let requestType = document.getElementById('requestType');
let rollNumber = document.getElementById('rollNumber');
let message = document.getElementById('message');
    // e.preventDefault();
    // console.log("clicked");
    let formData = {
        userName : userName.value, 
        emailID : emailID.value, 
        phoneNumber : phoneNumber.value, 
        programme : programme.value, 
        discipline : discipline.value, 
        requestType : requestType.value, 
        rollNumber : rollNumber.value, 
        message : message.value
    }

    console.log(formData);
})