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
    login(takeEmail,takePassword)

})


