<?php
/**
 * Inmedi-k - Backend Form Processor
 * Recibe datos asíncronos POST, sanitiza y retorna JSON.
 */

// Headers para asegurar que la respuesta sea tratada como JSON
header('Content-Type: application/json; charset=utf-8');

// Configuración opcional: Habilitar CORS si es necesario (asumimos mismo dominio aquí)
// header('Access-Control-Allow-Origin: *');

// Inicializar respuesta array
$response = [
    'success' => false,
    'message' => 'Método no permitido o error desconocido.'
];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. Sanitización de Inputs contra inyecciones y XSS
    $nombre = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING) ?? '';
    $telefono = filter_input(INPUT_POST, 'telefono', FILTER_SANITIZE_STRING) ?? '';
    $correo = filter_input(INPUT_POST, 'correo', FILTER_SANITIZE_EMAIL) ?? '';
    $asunto = filter_input(INPUT_POST, 'asunto', FILTER_SANITIZE_STRING) ?? '';

    // 2. Validación Básica del Lado del Servidor (Capa extra de seguridad)
    if (empty($nombre) || empty($telefono) || empty($correo)) {
        $response['message'] = 'Faltan campos obligatorios por llenar.';
        echo json_encode($response);
        exit;
    }

    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'El formato del correo electrónico es inválido.';
        echo json_encode($response);
        exit;
    }

    // 3. (Lógica de Negocio)
    // Aquí normalmente insertarías el lead en base de datos o lo enviarías por correo electrónico vía mail() o SMTP.
    // Ejemplo de envío de correo simulado:
    
    /*
    $to = "contacto@inmedi-k.com";
    $subject = "Nuevo Lead desde Landing Page: " . $nombre;
    $body = "Nombre: $nombre\nTeléfono: $telefono\nCorreo: $correo\nAsunto: $asunto";
    $headers = "From: webmaster@inmedi-k.com" . "\r\n" . "Reply-To: $correo";
    
    // mail($to, $subject, $body, $headers);
    */
    
    // Para propósitos del requerimiento, simulamos procesamiento exitoso siempre que los datos sanos lleguen:
    
    $response['success'] = true;
    $response['message'] = 'Los datos han sido recibidos satisfactoriamente.';
    
    // En un escenario real con base de datos, rodearías la inserción en un try-catch
    // y si falla la db: $response['success'] = false; $response['message'] = 'Fallo BD';
}

// 4. Retorno del JSON Final Parseable
echo json_encode($response);
exit;
?>
