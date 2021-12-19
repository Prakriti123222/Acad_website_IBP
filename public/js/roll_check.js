document.getElementById("rollNumber")
    .addEventListener('keyup', function (e) {
        // var lengthh = (document.getElementById("rollNumber").value.length + 1);
        // if (8 > length > 0) {
        //     document.getElementById("roll").innerHTML = lengthh;
        //     console.log(lengthh);
        // // console.log(e);
        // }
        ///////////////////////////////////////////////////////////////////////////////

        // var phoneNumberLength = "";
        // document.getElementById("phoneNumber").addEventListener("keyup", function (f) {
        //     phoneNumberLength = f.currentTarget.value.length;
        // })

        ///////////////////////////////////////////////////////////////////////////////
        var lengthOfNumber = e.currentTarget.value.length;
        // if (lengthOfNumber == 0){
        //     document.getElementById("roll").innerHTML = "";
        //     document.getElementById("submit").removeAttribute("disabled");
        // }
        // var check = document.getElementById("roll").innerHTML;
        // console.log(check);
        var rollNumber = document.getElementById('rollNumber').value;
        // console.log(typeof (rollNumber));
        var rollValue = String(rollNumber);
        // console.log(typeof (rollNumber));

        var phoneNumber = document.getElementById("phoneNumber").value;

        // console.log(typeof(rollValue));
        // rollValue = String(rollValue);
        // console.log(typeof(rollValue));
        // if (rollValue.startsWith("21") == false){
        //     document.getElementById("year").innerHTML = "incorrect roll number"
        //     document.getElementById("submit").disabled = true;
        // }

        // if (!rollValue.startsWith("21")){
        //     document.getElementById("year").innerHTML = "";
        //     document.getElementById("submit").disabled = false;
        // }

        if ((lengthOfNumber != 8) || (rollValue.startsWith("21") == false) || (rollValue.startsWith("20") == false) || (rollValue.startsWith("19") == false) || (rollValue.startsWith("18") == false) || (rollValue.startsWith("17") == false) || (rollValue.startsWith("16") == false) || (rollValue.startsWith("15") == false) || (rollValue.startsWith("14") == false) || (rollValue.startsWith("13") == false)) {
            // document.getElementById("year").innerHTML = "incorrect roll number";
            // document.getElementById("roll").innerHTML = "Must be 8 digits";
            if ((rollValue.startsWith("21") == false) || (rollValue.startsWith("20") == false) || (rollValue.startsWith("19") == false) || (rollValue.startsWith("18") == false) || (rollValue.startsWith("17") == false) || (rollValue.startsWith("16") == false) || (rollValue.startsWith("15") == false) || (rollValue.startsWith("14") == false) || (rollValue.startsWith("13") == false)) {
                document.getElementById("year").innerHTML = "Incorrect Roll Number";
            }
            if (lengthOfNumber != 8) {
                document.getElementById("roll").innerHTML = "Roll Number must be 8 digits";
            }
            document.getElementById("submit").disabled = true;
        }
        // console.log(lengthOfNumber);

        else if ((lengthOfNumber == 8) || (rollValue.startsWith("21") == true) || (rollValue.startsWith("20") == true) || (rollValue.startsWith("19") == true) || (rollValue.startsWith("18") == true) || (rollValue.startsWith("17") == true) || (rollValue.startsWith("16") == true) || (rollValue.startsWith("15") == true) || (rollValue.startsWith("14") == true) || (rollValue.startsWith("13") == true) || (phoneNumber.length != 10)) {
            // document.getElementById("roll").innerHTML = "";
            if ((rollValue.startsWith("21") == true) || (rollValue.startsWith("20") == true) || (rollValue.startsWith("19") == true) || (rollValue.startsWith("18") == true) || (rollValue.startsWith("17") == true) || (rollValue.startsWith("16") == true) || (rollValue.startsWith("15") == true) || (rollValue.startsWith("14") == true) || (rollValue.startsWith("13") == true)) {
                document.getElementById("year").innerHTML = "";
            }
            if (lengthOfNumber == 8) {
                document.getElementById("roll").innerHTML = "";
            }
            // if ((lengthOfNumber == 8) && ((rollValue.startsWith("21") == true) || (rollValue.startsWith("20") == true) || (rollValue.startsWith("19") == true) || (rollValue.startsWith("18") == true) || (rollValue.startsWith("17") == true) || (rollValue.startsWith("16") == true) || (rollValue.startsWith("15") == true) || (rollValue.startsWith("14") == true) || (rollValue.startsWith("13") == true))) {
            // document.getElementById("submit").disabled = true;
            // }
            document.getElementById("submit").disabled = true;
            // document.getElementById("submit").removeAttribute("disabled");
        }

        if ((lengthOfNumber == 8) || (rollValue.startsWith("21") == true) || (rollValue.startsWith("20") == true) || (rollValue.startsWith("19") == true) || (rollValue.startsWith("18") == true) || (rollValue.startsWith("17") == true) || (rollValue.startsWith("16") == true) || (rollValue.startsWith("15") == true) || (rollValue.startsWith("14") == true) || (rollValue.startsWith("13") == true) && (phoneNumber.length == 10)) {
            // document.getElementById("roll").innerHTML = "";
            if ((rollValue.startsWith("21") == true) || (rollValue.startsWith("20") == true) || (rollValue.startsWith("19") == true) || (rollValue.startsWith("18") == true) || (rollValue.startsWith("17") == true) || (rollValue.startsWith("16") == true) || (rollValue.startsWith("15") == true) || (rollValue.startsWith("14") == true) || (rollValue.startsWith("13") == true)) {
                document.getElementById("year").innerHTML = ""
            }
            if (lengthOfNumber == 8) {
                document.getElementById("roll").innerHTML = "";
            }
            if ((lengthOfNumber == 8) && (phoneNumber.length == 10) && ((rollValue.startsWith("21") == true) || (rollValue.startsWith("20") == true) || (rollValue.startsWith("19") == true) || (rollValue.startsWith("18") == true) || (rollValue.startsWith("17") == true) || (rollValue.startsWith("16") == true) || (rollValue.startsWith("15") == true) || (rollValue.startsWith("14") == true) || (rollValue.startsWith("13") == true))) {
                document.getElementById("submit").disabled = false;
            }
            // document.getElementById("submit").removeAttribute("disabled");
        }
        // console.log(lengthOfNumber);
    });
// if (document.getElementById("roll").innerHTML == "") {
//     document.getElementById("submit").removeAttribute("disabled");
// }