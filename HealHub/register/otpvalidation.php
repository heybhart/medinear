<?php
session_start();

if(isset($_POST))
{
    $data = file_get_contents("php://input");
    $otp = json_decode($data, true);

    $input_otp = $otp['firstbox_value'] . $otp['secondbox_value'] . $otp['thirdbox_value'] . $otp['fourthbox_value'];

    if(isset($_SESSION['otp_value']))
    {
        $otp_varible = $_SESSION['otp_value'];

        if($input_otp == $otp_varible) {
            echo "1"; // Success
        } else {
            echo "REGISTRATION DENIED";
        }
    }
    else
    {
        echo "NO OTP value from PHP page";
    }
}
