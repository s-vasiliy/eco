<?php
 
$to = "s.vasiliy@gmail.com";
$from = $_REQUEST['email'];
$name = $_REQUEST['name'];
$headers = "From: $from";
$subject = "You have a message sent from your site.";
 
$name_field = $_POST['name'];
$email_field = $_POST['email'];
$phone_field = $_POST['phone'];
$message = $_POST['message'];
 
$body = "You have a new message:\n\nFrom: $name_field\nEmail: $email_field\nPhone: $phone_field\nMessage: $message\n";
 
$send = mail($to, $subject, $body, $headers);
 
?>
