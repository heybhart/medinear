function usernamevalidate(usrname) {
   var alphabet = /[a-z]/; 
   // var specialcharacter = /[$%&!@)(}{:\/]/; 
   var number = /[0-9]/; 
   var noSpace = " ";
   if(alphabet.test(usrname) && number.test(usrname) && usrname != noSpace) {
       return true;
   } else {
       return false;
   }
}


function passwordvalidate(pass) {
   var alphabet = /[a-z]/; 
   var number = /[0-9]/; 
   var noSpace = " ";
   if(alphabet.test(pass) && number.test(pass) && pass != noSpace) {
       return true;
   } else {
       return false;
   }
}


function showpasswordfunction() {
   var passwordInput = document.querySelector('#password');
   var showPasswordCheckbox = document.querySelector('#showpasswordcheckbox');

   if (showPasswordCheckbox.checked) {
       passwordInput.type = 'text';
   } else {
       passwordInput.type = 'password';
   }
}

function phonenumbervalidate(phoneno)
{
    if(phoneno.length == 10)
    {
        return phoneno;
    }
    else{
        alert('Phone number must be exactly 10 digits.');
    }
}

function sendOTP(emailid) {
    fetch('registerotpcheck.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ email: emailid }) 
    })
    .then(function (response) {
        return response.text();
    }).then(function (data) {
        console.log(data);

        if(data == 1) {
            alert("Registration Successful OTP");
        } else {
            alert("Registration Denied");
        }
    });
}

function verifyOTP()
{
    var firstbox_value = document.querySelector('#first-box').value;
    var secondbox_value = document.querySelector('#second-box').value;
    var thirdbox_value = document.querySelector('#third-box').value;
    var fourthbox_value = document.querySelector('#fourth-box').value;

    console.log("OTP :",firstbox_value,secondbox_value,thirdbox_value,fourthbox_value);
    
    data = {firstbox_value,secondbox_value,thirdbox_value,fourthbox_value}
    fetch('otpvalidation.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data) 
    })
    .then(function (response) {
        return response.text();
    }).then(function (data) {
        console.log(data);

        if(data == 1) {
            alert("Registration Fully Successful ");
            window.location.href = '../index.html';
        } else {
            alert("Registration Denied OTP");
        }
    });
}

function startTimer(duration, display, resendBtnContainer) {
    var timer = duration, minutes, seconds;
    var interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(interval);
            display.textContent = "";
            resendBtnContainer.classList.remove('disappear');
        }
    }, 1000);

    return interval;
}

function resendOTP(emailidresend) {
    var resendBtnContainer = document.querySelector('.resendotp');
    var timerDisplay = document.querySelector('#timerDisplay');

    resendBtnContainer.classList.add('disappear');
    var duration = 2 * 60 + 30; 
    startTimer(duration, timerDisplay, resendBtnContainer);

    fetch('resendOTP.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ email: emailidresend }) 
    })
    .then(function (response) {
        return response.text();
    }).then(function (data) {
        console.log(data);

        if(data == 1) {
            alert("Resend OTP");
        } else {
            alert("Failed to send the OTP");
        }
    });
}

function backbutton()
{
    var innerForm = document.querySelector('.innerform');
    var otpContainer = document.querySelector('.OTP-container');                            
    innerForm.classList.remove('slide-out');
    setTimeout(function() {
        otpContainer.classList.remove('show');
    }, 500);
}

function registerdetails() 
{
   var firstname = document.querySelector('#firstname').value.trim();
   var lastname = document.querySelector('#lastname').value.trim();
   var username = document.querySelector('#username').value.trim();
   var email = document.querySelector('#clientemail').value.trim();
   var phonenumber = document.querySelector('#clientmobileno').value;
   var doctorSelected = document.querySelector('#usrtype-doctor').checked;
   var patientSelected = document.querySelector('#usrtype-patient').checked;
   var maleselcted = document.querySelector('#gender-male').checked;
   var femaleselcted = document.querySelector('#gender-female').checked;
   var othersselcted = document.querySelector('#gender-others').checked;
   var password = document.querySelector('#password').value.trim();
   var confirmpassword = document.querySelector('#cnfpassword').value.trim();
   var termscondition = document.querySelector('#termscondition').checked;

   var usernameInput = document.querySelector('#username');
   usernameInput.classList.remove('error'); 

   var clientemailInput = document.querySelector('#clientemail');
   clientemailInput.classList.remove('error'); 

   var clientphoneInput = document.querySelector('#clientmobileno');
   clientphoneInput.classList.remove('error'); 

   if(firstname !== " "){
        if(lastname != " "){
            if(usernamevalidate(username)){
                if(email.includes('@') && email.includes('.com')){
                    if(phonenumbervalidate(phonenumber)){
                        if(doctorSelected || patientSelected){
                            if(maleselcted || femaleselcted || othersselcted){
                                if(passwordvalidate(password)){
                                    if(confirmpassword == password){
                                        if(confirmpassword == password){
                                            if(termscondition){
                                                var counter = 1;
                                                // alert("REGISTRATION SUCCESSFULL")
                                            }else{
                                                alert('Please accept terms and condition')
                                             }            
                                        }else{
                                            alert("Confirm Passowrd does'nt match with Password ")
                                        }
                                    }else{
                                        alert("Confirm Passowrd does'nt match with Password ")
                                    }
                                }else{
                                    alert('Invalid Password. It must contain at least one letter and one number. ');
                                }
                            }else{
                                alert('Please select Gender ');
                            }
                        }else{
                            alert("Please select either Doctor or Patient.");
                        }
                    }else{
                        alert('Phone number must be exactly 10 digits.');
                    }
                }else{
                    alert("Invalid email. It requires '@' and '.com'.");
                }
            }else{
                alert("Invalid username. It must contain at least one letter and one number.");
            }
        }else{
            alert("Last name is required.");
        }
   }else{
    alert("First name is required.");
   }
   if(counter == 1)
   {
        var usertypeselected;
        if(doctorSelected){
            usertypeselected = "doctor";
        }else{                                      //sending the usertype  = doctor or patient to the php           
            usertypeselected = "patient";
        }

        var gendertypeselect;
        if(maleselcted){
            gendertypeselect = "male";
        }else if(femaleselcted){
            gendertypeselect = "female";       //sending the gendertype  = male or female to the php 
        }else{
            gendertypeselect = "others";
        }
            

        const data ={ firstname,lastname,username,email,phonenumber,usertypeselected,gendertypeselect,password,confirmpassword };
        fetch('registercheck.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
        })
        .then(function (response) {
            return response.text();
        }).then(function (data) {
            console.log(data);

            if(data == 1){
                alert("username is already registerd");
                usernameInput.classList.add('error');

            }else if(data == 2){
                alert(" Email is already registerd");
                clientemailInput.classList.add('error'); 
            }else if(data == 3){
                alert(" Mobile Number is already registerd"); 
                clientphoneInput.classList.add('error');
            }
            else if(data == 4){
                var innerForm = document.querySelector('.innerform');
                var otpContainer = document.querySelector('.OTP-container');                            
                innerForm.classList.add('slide-out');
                setTimeout(function() {
                    otpContainer.classList.add('show');
                }, 500);
                sendOTP(email);
                
            }
                        
        })
   }
    document.querySelector('#resendotp').addEventListener('click', function() {
    resendOTP(email);
    });
}

var email = document.querySelector('#clientemail').value.trim();
var phonenumber = document.querySelector('#clientmobileno').value;
var username = document.querySelector('#username').value.trim();



document.querySelector('#registerbtn').addEventListener('click', registerdetails);
document.querySelector('#showpasswordcheckbox').addEventListener('change',showpasswordfunction);

translateinnerform = document.querySelector('.innerform');
translateinnerform.classList.add('inneractive');

document.querySelector('#otp-verify').addEventListener('click', verifyOTP);

document.querySelector('#back-button').addEventListener('click', backbutton);