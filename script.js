/**
 * Inmedi-k - Contact Form Logic
 * Asynchronous form submission via Fetch API with validation.
 */

// 1. Configuración de Validación (Requerimiento del usuario)
const formValidationConfig = {
    nombre:   { required: true },
    telefono: { required: true },
    correo:   { required: true },
    asunto:   { required: false }
};

document.addEventListener('DOMContentLoaded', () => {

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    const form = document.getElementById('contactForm');
    const alertContainer = document.getElementById('form-alert-container');
    const btnSubmit = document.getElementById('btnSubmit');
    const btnSpinner = document.getElementById('btnSpinner');
    const btnText = document.getElementById('btnText');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevenir el envío por defecto

            // Limpiar alertas previas
            alertContainer.innerHTML = '';
            
            // Recolectar datos
            const formData = new FormData(form);
            const dataObj = Object.fromEntries(formData.entries());
            let isValid = true;
            let errors = [];

            // 2. Lógica de Validación basada en Configuración
            if (formValidationConfig.nombre.required && !dataObj.nombre.trim()) {
                isValid = false;
                errors.push('El nombre completo es obligatorio.');
            }
            if (formValidationConfig.telefono.required && !dataObj.telefono.trim()) {
                isValid = false;
                errors.push('El teléfono es obligatorio.');
            }
            if (formValidationConfig.correo.required) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!dataObj.correo.trim() || !emailRegex.test(dataObj.correo)) {
                    isValid = false;
                    errors.push('Ingresa un correo electrónico válido.');
                }
            }

            // Si hay errores, mostrar alerta y detener
            if (!isValid) {
                const errorHtml = `
                    <div class="alert alert-danger" role="alert">
                        <strong>Error:</strong><br>
                        ${errors.join('<br>')}
                    </div>
                `;
                alertContainer.innerHTML = errorHtml;
                return;
            }

            // 3. API Fetch para enviar (Processing State)
            btnSubmit.disabled = true;
            btnSpinner.classList.remove('d-none');
            btnText.textContent = 'Enviando...';

            try {
                const response = await fetch('process_form.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    // Redirección exitosa (Requerimiento del usuario)
                    window.location.href = 'gracias.html';
                } else {
                    throw new Error(result.message || 'Ocurrió un error al procesar tu solicitud.');
                }

            } catch (error) {
                // Mostrar alerta de error
                alertContainer.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        <strong>Error de conexión:</strong> ${error.message}
                    </div>
                `;
                btnSubmit.disabled = false;
                btnSpinner.classList.add('d-none');
                btnText.textContent = 'Enviar Solicitud';
            }
        });
    }
});
