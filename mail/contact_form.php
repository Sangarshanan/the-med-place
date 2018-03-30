<?php
require_once 'phpmailer/PHPMailerAutoload.php';

if (isset($_POST['fullname']) && isset($_POST['emailAddress']) && isset($_POST['subject']) && isset($_POST['messages'])) {

    //check if any of the inputs are empty
    if (empty($_POST['fullname']) || empty($_POST['emailAddress']) || empty($_POST['subject']) || empty($_POST['messages'])) {
        $data = array('success' => false, 'message' => 'Please fill out the form completely.');
        echo json_encode($data);
        exit;
    }

    //create an instance of PHPMailer
    $mail = new PHPMailer();

    $mail->From = $_POST['emailAddress'];
    $mail->FromName = $_POST['fullname'];
    $mail->AddAddress('sangarshanan1998@gmail.com'); //Change this Email Recipient
    $mail->Subject = $_POST['subject'];
    $mail->Body = "Name: " . $_POST['fullname'] . "\r\n\r\nMessage: " . stripslashes($_POST['messages']);

    if (isset($_POST['ref'])) {
        $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    }

    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'Thanks! We have received your message.');
    echo json_encode($data);

} else {

    $data = array('success' => false, 'message' => 'Please fill out the form completely.');
    echo json_encode($data);

}
