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
document.querySelector('.login-btn')
    .addEventListener('click', () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        fetchGet('users')
            .then(result => {
                result.forEach(user => {
                    if (email.value === user.email && password.value === user.password) {
                        if (user.rol === 'Admin') {
                            sessionStorage.setItem('id',user.id)
                            sessionStorage.setItem('loggedin','true')
                            window.location = 'windows/admin/index.html'
                        } else {
                            sessionStorage.setItem('id', user.id)
                            sessionStorage.setItem('loggedin','true')
                            window.location = 'windows/user/index.html'
                        }
                    }else{
                        Swal.fire({
                            icon: "error",
                            title: "USUARIO NO REGISTRADO O DATOS INCORRECTOS",
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }

                });
            })
            .catch(e => console.log(e));


    })

