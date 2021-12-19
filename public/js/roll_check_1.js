document.getElementById("rollNumber")
    .addEventListener('keyup', function (e) {
        // var lengthh = (document.getElementById("rollNumber").value.length + 1);
        // if (8 > length > 0) {
        //     document.getElementById("roll").innerHTML = lengthh;
        //     console.log(lengthh);
        // // console.log(e);
        // }
        var lengthOfNumber = e.currentTarget.value.length
        // if (lengthOfNumber == 0){
        //     document.getElementById("roll").innerHTML = "";
        //     document.getElementById("submit").removeAttribute("disabled");
        // }
        // var check = document.getElementById("roll").innerHTML;
        // console.log(check);
        // var rollValue = document.getElementById('rollNumber').value;

        if (lengthOfNumber != 8) {
            document.getElementById("roll").innerHTML = "Must be 8 digits";
            document.getElementById("submit").disabled = true;
        }

        if (lengthOfNumber == 8) {
            document.getElementById("roll").innerHTML = "";
            document.getElementById("submit").disabled = false;
        }
        
    //     if ((lengthOfNumber != 8) || (rollValue.startsWith("21") == false)) {
    //         // document.getElementById("year").innerHTML = "incorrect roll number";
    //         // document.getElementById("roll").innerHTML = "Must be 8 digits";
    //         if (rollValue.startsWith("21") == false) {
    //             document.getElementById("year").innerHTML = "incorrect roll number"
    //         }
    //         if (lengthOfNumber != 8) {
    //             document.getElementById("roll").innerHTML = "Must be 8 digits";
    //         }
    //         document.getElementById("submit").disabled = true;
    //     }
    //     if ((lengthOfNumber == 8) || (rollValue.startsWith("21") == true)) {
    //         // document.getElementById("roll").innerHTML = "";
    //         if (rollValue.startsWith("21") == true) {
    //             document.getElementById("year").innerHTML = ""
    //         }
    //         if (lengthOfNumber == 8) {
    //             document.getElementById("roll").innerHTML = "";
    //         }
    //         if ((lengthOfNumber == 8) && (rollValue.startsWith("21") == true)) {
    //             document.getElementById("submit").disabled = false;
    //         }
    //         // document.getElementById("submit").removeAttribute("disabled");
    //     }
    //     // console.log(lengthOfNumber);
    });
// if (document.getElementById("roll").innerHTML == "") {
//     document.getElementById("submit").removeAttribute("disabled");
// }