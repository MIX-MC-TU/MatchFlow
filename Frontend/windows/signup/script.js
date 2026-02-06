import { fetchPost } from '../../modules/fetch.js'

// REGISTER
const signupBtn = document.querySelector('.signup-btn');
signupBtn.addEventListener('click', () => {
    const username = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const position_id = document.getElementById('position_id');
    const availability_id = document.getElementById('availability_id');
    const contact = document.getElementById('contact');
    const linkedin = document.getElementById('linkedin');

    if (
        username.value.trim() === '' ||
        email.value.trim() === '' ||
        password.value.trim() === '' ||
        position_id.value.trim() === '' ||
        availability_id.value.trim() === '' ||
        contact.value.trim() === '' ||
        linkedin.value.trim() === ''
    ) {
        Swal.fire({
            icon: "error",
            title: "HAY CAMPOS VACÍOS",
            showConfirmButton: false,
            timer: 2500
        });
    } else {
        const originalText = signupBtn.innerHTML;
        signupBtn.disabled = true;
        signupBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Registrando...';

        const resetButton = () => {
            signupBtn.disabled = false;
            signupBtn.innerHTML = originalText;
        };

        fetchPost('users', {
                name: username.value,
                email: email.value,
                password: password.value,
                rol: 'User',
                img: 'https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg?semt=ais_hybrid&w=740&q=80',
                profile: '¡¡¡¡Completa me!!!!!',
                position_id: position_id.value,
                availability_id: availability_id.value,
                contact: contact.value,
                linkedin: linkedin.value
            })
            .then(result => {
                if (result[1]) {
                    window.location = '../../index.html';
                } else {
                    resetButton();
                }
            })
            .catch(e => {
                resetButton();
                Swal.fire({
                    icon: "error",
                    title: "Error al registrar",
                    text: "No se pudo completar el registro. Intenta nuevamente.",
                    showConfirmButton: true
                });
                console.log(e);
            });
    }
})