<?php // /services/mail/index.php

require_once('./PHPMailer/src/PHPMailer.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if (empty($_POST)) exit;

$file = false;
$file_path = '';
$data = [
  'name' => $_POST['name'],
  'email' => $_POST['email'],
  'mailto' => $_POST['mailto'],
  'folder' => $_POST['sitename'],
  'subject' => $_POST['subject'],
  'message' => $_POST['message']
];

if ($_FILES['attachment']) {
  if (!file_exists("./attachments/{$data['folder']}")) {
    mkdir("./attachments/{$data['folder']}");
  }

  $file_path = "./attachments/{$data['folder']}/{$_FILES['attachment']['name']}";
  $file = move_uploaded_file($_FILES['attachment']['tmp_name'], $file_path);
}

$body = "Vous avec recu un nouveau courriel de : {$data['name']}\n".
  "Courriel : {$data['email']}\n".
  "Message : {$data['message']}";

$email = new PHPMailer();
$email->From     = $data['email'];
$email->FromName = $data['name'];
$email->Subject  = $data['subject'];
$email->Body     = $body;
$email->AddAddress($data['mailto']);

if ($file) {
  $email->AddAttachment($file_path, $data['name'].$_FILES['attachment']['extendsion']);
}

return $email->Send();
