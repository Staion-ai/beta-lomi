<?php
// Permitir solicitudes desde el frontend
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Leer el JSON enviado
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["businessName"], $data["businessType"], $data["userName"], $data["whatsapp"])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Faltan campos obligatorios"]);
    exit;
}

// Incluir PHPMailer
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Extraer datos
$businessName = $data["businessName"];
$businessType = $data["businessType"];
$userName = $data["userName"];
$whatsapp = $data["whatsapp"];
$privacyPolicy = $data["privacyPolicy"] ? '✅ Aceptada' : '❌ No aceptada';
$marketingConsent = $data["marketingConsent"] ? '✅ Autorizado' : '❌ No autorizado';

$mail = new PHPMailer(true);

try {
    // Configuración SMTP (usa tus credenciales reales de Mailtrap aquí)
    $mail->isSMTP();
    $mail->Host = 'sandbox.smtp.mailtrap.io';
    $mail->SMTPAuth = true;
    $mail->Username = 'TU_USERNAME';
    $mail->Password = 'TU_PASSWORD';
    $mail->Port = 2525;

    // Correo
    $mail->setFrom('no-reply@lomi.com', 'Lomi');
    $mail->addAddress('danielgrajales1234@gmail.com');
    $mail->Subject = "Nuevo registro de negocio - $businessName";
    $mail->isHTML(false);
    $mail->Body = "
Nuevo registro de negocio en Lomi:

🏢 Nombre del negocio: $businessName
🏷️ Tipo de negocio: $businessType
👤 Nombre del contacto: $userName
📱 WhatsApp: $whatsapp

📋 Consentimientos:
$privacyPolicy
$marketingConsent

---
Enviado desde el formulario de registro de Lomi
    ";

    $mail->send();
    echo json_encode(["success" => true]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Mailer Error: " . $mail->ErrorInfo]);
}
