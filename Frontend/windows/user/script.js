import { fetchGetById } from '../../modules/fetch.js'



async function fetchUserOrders() {
    const user_id = JSON.parse(sessionStorage.getItem("id")) || '';
    if (user_id === '') {
        // window.location.assign('../../index.html');
    } else {
        fetchGetById(user_id,'users')
        .then(result =>{
            document.getElementById("greeting").innerText = `Hello, ${result.name}`;
        })
        .catch(e => console.log(e)) 
    }

};

fetchUserOrders()




// function renderUserOrders(orders) {
//     const container = document.getElementById("user-orders-container");
//     container.innerHTML = "";

//     if (orders.length === 0) {
//         container.innerHTML = `
//             <div class="card border-0 shadow-sm rounded-4 p-5 text-center">
//                 <i class="bi bi-bag-x fs-1 text-muted"></i>
//                 <p class="mt-3 text-muted">${id}</p>
//                 <p class="mt-3 text-muted">${name}</p>
//                 <p class="mt-3 text-muted">${availability[1]}</p>
//             </div>`;
//         return;
//     }};



