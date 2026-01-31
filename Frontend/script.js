import {fetchGet,fetchPost} from './modules/fetch.js'
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const views = document.querySelectorAll('.auth-view');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const view = tab.dataset.view;

      tabs.forEach((t) => t.classList.remove('active'));
      views.forEach((v) => v.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(`${view}-form`).classList.add('active');
    });
  });
});
const btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click',() =>{
    const takeEmail = document.getElementById('email').value
    const takePassword = document.getElementById('password').value
    console.log(takeEmail);
    console.log(takePassword);
    login(takeEmail,takePassword);

})
const btnSign = document.getElementById('btnSingUp');
btnSign.addEventListener('click',() =>{
    const takeName = document.getElementById('nameSignUp').value
    const takeEmail = document.getElementById('email-sign').value
    const takePassword = document.getElementById('password-sign').value
    const takeRol = "User"
    const takeImg = document.getElementById('img-sing').value
    const takeRolPosition = document.getElementById('rol-sign').value
    const takeOpen = document.getElementById('openWork').value
    const profile = "default profile"
    const contact = "+57-25252525"
    const linkedin = "https://co.linkedin.com/"


    const data = {
        name: takeName,
        email: takeEmail,
        password:takePassword,
        rol: takeRol,
        img:takeImg,
        position_id:takeRolPosition,
        availability_id:takeOpen,
        profile:profile,
        contact:contact,
        linkefin:linkedin

        
    }
    fetchPost('users',data)


})

async function login(email,pass) {

    fetchGet('users')
    .then(result => {
        result.forEach(element => {
            if(element.email === email && element.password === pass ){
                if(element.rol === "Admin"){

                    sessionStorage.setItem('id',element.id);
                    sessionStorage.setItem('rol',element.rol);
                    window.location.assign('windows/admin/index.html');
                    
                }else if(element.rol === "User"){
                    sessionStorage.setItem('id',element.id);
                    sessionStorage.setItem('rol',element.rol);  
                    window.location.assign('windows/user/index.html');

                }
            }
            
        });
    })
    .catch(error => console.log(error));
    
}

