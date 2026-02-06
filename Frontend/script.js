import { fetchGet, fetchGetById } from './modules/fetch.js'

// validation
document.addEventListener('DOMContentLoaded', () => {
    const localsesion = sessionStorage.getItem('id') || null;
    const localsesion_loggedin = sessionStorage.getItem('loggedin') || null;
    
    
    if (localsesion !== null && localsesion_loggedin === 'true') {
        fetchGetById(localsesion, 'users')
        .then(result => {

            if (result.rol === 'Admin') {
                window.location = 'windows/admin/index.html'
            } else {
                window.location = 'windows/user/index.html'
            }
        })

    }
})

//login button
const loginBtn = document.querySelector('.login-btn');
loginBtn.addEventListener('click', () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    // Activar estado de carga en el botÃ³n
    const originalText = loginBtn.innerHTML;
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Cargando...';

    const resetButton = () => {
        loginBtn.disabled = false;
        loginBtn.innerHTML = originalText;
    };

    fetchGet('users')
        .then(result => {
            let userFound = false;
            result.forEach(user => {
                if (email.value === user.email && password.value === user.password) {
                    userFound = true;
                    if (user.rol === 'Admin') {
                        sessionStorage.setItem('id', user.id);
                        sessionStorage.setItem('loggedin', 'true');
                        window.location = 'windows/admin/index.html';
                    } else {
                        sessionStorage.setItem('id', user.id);
                        sessionStorage.setItem('loggedin', 'true');
                        window.location = 'windows/user/index.html';
                    }
                }
            });
            if (!userFound) {
                resetButton();
                Swal.fire({
                    icon: "error",
                    title: "USUARIO NO REGISTRADO O DATOS INCORRECTOS",
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        })
        .catch(e => {
            resetButton();
            console.log(e);
        });
})

