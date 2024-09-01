<?php
    if(isset($_POST))
    {
        $data = file_get_contents("php://input");
        $user = json_decode($data, true);

        $firstname = $user['firstname'];
        $lastname = $user['lastname'];
        $username = $user['username'];
        $email = $user['email'];
        $phonenumber = $user['phonenumber'];
        $usertype = $user['usertypeselected'];
        $gendertype = $user['gendertypeselect'];
        $password = $user['password'];
        $confirmpassword = $user['confirmpassword'];

        // echo "First Name: " . $firstname . "\n";
        // echo "Last Name: " . $lastname . "\n";
        // echo "Username: " . $username . "\n";
        // echo "Email: " . $email . "\n";
        // echo "Phone number: " . $phonenumber . "\n";
        // echo "User Type: " . $usertype . "\n";
        // echo "Gender: " . $gendertype . "\n";
        // echo "Password: " . $password . "\n";
        // echo "Confirm Password: " . $confirmpassword . "\n";

        $conn = mysqli_connect('localhost', 'root', '', 'healhub' );
        $usernamequery = "SELECT username FROM `userdetails` WHERE username = '$username'";
        $usernameresult = mysqli_query($conn, $usernamequery);

        if(mysqli_num_rows($usernameresult) > 0){
            $counter = 1;
            echo "$counter";
        }
        else{
            $usernamecheck = $username;
            $emailquery = "SELECT email FROM `userdetails` WHERE email = '$email' ";
            $emailresult = mysqli_query($conn, $emailquery);
            if(mysqli_num_rows($emailresult) > 0){
                $counter = 2;
                echo "$counter";
            }
            else{
                $emailcheck = $email;
                $phonenumberquery = "SELECT phonenumber FROM `userdetails` WHERE phonenumber = '$phonenumber' ";
                $phonenumberresult = mysqli_query($conn, $phonenumberquery);
                if(mysqli_num_rows($phonenumberresult) > 0){
                    $counter = 3;
                    echo "$counter";
                }
                else{
                    $phonenumbercheck = $phonenumber;
                    $counter = 4;
                    echo "$counter";
                }   
            }   
        }      
   }
?>