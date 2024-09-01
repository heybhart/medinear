<?php
session_start(); // Start the session at the top

require './source/PHPMailer.php';
require './source/SMTP.php';
require './source/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'mdbharatchoudhary@gmail.com';
$mail->Password = 'eugnaijgfsfdqhez';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
$mail->setFrom('mdbharatchoudhary@gmail.com', 'HEAL HUB');

if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);

    if (isset($user['email']))
    {
        $client_email = $user['email'];
        $otp = rand(1000, 9999);
        try 
        {
            $mail->addAddress($client_email, 'Recipient Name');

            $mail->isHTML(true);
            $mail->Subject = "OTP Validation";
            $mail->Body    = "Your OTP is '$otp'. This OTP is valid for 5 minutes only.";

            $mail->send();

            $_SESSION['otp_value'] = $otp; // Store OTP in session
            echo "1"; // Return success code
        } 
        catch (Exception $e) 
        {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
    else 
    {
        echo "Invalid email data.";
    }
}
