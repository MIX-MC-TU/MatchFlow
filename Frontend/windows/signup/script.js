import { fetchGet, fetchPost } from '../../modules/fetch.js'

// REGISTER
document.querySelector('.signup-btn')
    .addEventListener('click', () => {
        let username = document.getElementById('name');
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        let position_id = document.getElementById('position_id');
        let availability_id = document.getElementById('availability_id');
        let contact = document.getElementById('contact');
        let linkedin = document.getElementById('linkedin');

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
                        window.location = '../../index.html'
                    }
                })
                .catch(e => console.log(e))
        }


    })