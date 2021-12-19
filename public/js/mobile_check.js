document.getElementById("phoneNumber")
    .addEventListener('keyup', function (e) {
        // var lengthh = (document.getElementById("phoneNumber").value.length + 1);
        // if (10 > length > 0) {
        //     document.getElementById("phone").innerHTML = lengthh;
        //     console.log(lengthh);
        // // console.log(e);
        // }
        var lengthOfNumber = e.currentTarget.value.length
        console.log(lengthOfNumber);
        // if (lengthOfNumber == 0){
        //     document.getElementById("phone").innerHTML = "";
        //     document.getElementById("submit").removeAttribute("disabled");
        // }
        // length of roll number
        var rollNumber = document.getElementById('rollNumber').value;

        var year = document.getElementById("year").innerHTML;

        // 7304

        // var check = document.getElementById("phoneNumber").value;

        if (lengthOfNumber != 10 || rollNumber.length != 8 || year == "Incorrect Roll Number") {
            if (lengthOfNumber != 10) {
                document.getElementById("phone").innerHTML = "Phone Number must be 10 digits";
                // document.getElementById("submit").disabled = true;
            }else{
                document.getElementById("phone").innerHTML = "";
            }

            // if (lengthOfNumber == 10 && rollNumber.length != 8) {
            //     // document.getElementById("phone").innerHTML = "Roll Number must be 8 digits";
            //     document.getElementById("submit").disabled = true;
            //     // document.getElementById("submit").removeAttribute("disabled");
            // }
            document.getElementById("submit").disabled = true;
        }

        if (lengthOfNumber == 10 || rollNumber.length != 8 || year == "Incorrect Roll Number"){
            document.getElementById("submit").disabled = true;
        }

        console.log(year);

        if (lengthOfNumber == 10 && rollNumber.length == 8 && year != "Incorrect Roll Number") {
            document.getElementById("phone").innerHTML = "";
            document.getElementById('rollNumber').innerHTML = "";
            document.getElementById("submit").disabled = false;
            // document.getElementById("submit").removeAttribute("disabled");
        }
        // console.log(lengthOfNumber);
    });
// if (document.getElementById("phone").innerHTML == "") {
//     document.getElementById("submit").removeAttribute("disabled");
// }
