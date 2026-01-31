import { fetchGet, fetchGetById } from '../../modules/fetch.js'

// ================= VALIDACIÓN =================
async function validation() {
    if (sessionStorage.getItem('rol') === 'Admin') {
        window.location.assign('../admin/index.html');
    }
    if (!sessionStorage.getItem('rol')) {
        window.location.assign('../../index.html');
    }
}

// ================= LOGOUT =================
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = '../../index.html';
});

// ================= CARGAR USUARIO EN MODAL =================
window.loadUserInModal = async function () {
    const id = sessionStorage.getItem('id');
    if (!id) return console.error('No user id in sessionStorage');

    try {
        const user = await fetchGetById(id, 'users');

        document.getElementById("name").value = user.name || '';
        document.getElementById("email").value = user.email || '';
        document.getElementById("description").value = user.profile || '';
        document.getElementById("contact").value = user.contact || '';
        document.getElementById("linkedin").value = user.linkedin || '';
        document.getElementById("jobType").value = user.position_id || '';
        document.getElementById("password").value = '';
    } catch (err) {
        console.error('Error loading user:', err);
    }
}

// ================= GUARDAR CAMBIOS =================
document.getElementById("saveProfile").addEventListener("click", async (e) => {
    e.preventDefault();

    const id = sessionStorage.getItem('id');
    if (!id) return console.error('No user id in sessionStorage');

    const password = document.getElementById("password").value;

    const updatedUser = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        profile: document.getElementById("description").value,
        contact: document.getElementById("contact").value,
        linkedin: document.getElementById("linkedin").value,
        position_id: Number(document.getElementById("jobType").value)
    };

    if (password) updatedUser.password = password;

    try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser)
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Failed PATCH: ${response.status} ${text}`);
        }

        console.log('User updated successfully in json-server');

        // cerrar modal
        const modal = bootstrap.Modal.getInstance(
            document.getElementById("ideaModal")
        );
        modal.hide();

        renderUserCard();
    } catch (err) {
        console.error('Error updating user:', err);
        alert('No se pudo actualizar el usuario. Revisa consola.');
    }
});

// ================= CATEGORÍAS =================
function categories(id) {
    const cate = {
        "1": "pending",
        "2": "contacted",
        "3": "interview",
        "4": "hired",
        "5": "discarded"
    }
    return cate[id];
}

// ================= RENDER USER =================
async function renderUserCard() {
    validation();

    const id = sessionStorage.getItem('id');
    const card_user = document.querySelector('.user-card');

    try {
        const result = await fetchGetById(id, 'users');

        card_user.innerHTML = `        
        <div class="sidebar sticky-top" style="top: 2rem;">
          <div class="sidebar-action mb-4 d-flex flex-column">
            <div class="card-img d-flex justify-content-center">
              <img class="w-25 rounded-circle" src="${result.img}" alt="">
            </div>
            <div class="card-body d-flex flex-column align-items-center gap-1">
              <div><h5 class="fw-bold">${result.name}</h5></div>
              <div><h5 class="text-secondary">${result.email}</h5></div>
              <div><h5 class="text-secondary position">${result.position_id}</h5></div>
              <div><h5 class="text-secondary availability">${result.availability_id}</h5></div>
              <div><p class="text-center">${result.profile}</p></div>
              <div><h5 class="text-secondary">${result.contact}</h5></div>
              <div><h5 class="text-secondary">${result.linkedin}</h5></div>
            </div>
          </div>
        </div>
        `;

        const positions = await fetchGet('positions');
        positions.forEach(el => {
            if (result.position_id == el.id) document.querySelector('.position').textContent = el.name;
        });

        const availabilities = await fetchGet('availability');
        availabilities.forEach(el => {
            if (result.availability_id == el.id) document.querySelector('.availability').textContent = el.name;
        });

    } catch (err) {
        console.error('Error rendering user card:', err);
    }

    // RENDER MATCHES
    const match = document.querySelector('.match');
    try {
        const jobs = await fetchGet('user_job_match');
        match.innerHTML = ''; // limpiar previos

        jobs.forEach(async p => {
            if (id == p.user_id) {
                const userData = await fetchGetById(p.user_id, 'users');
                const jobData = await fetchGetById(p.job_id, 'jobs');

                match.innerHTML += `
                  <div class="card border-0 shadow-sm bg-light d-flex flex-column align-items-center h-25">
                    <span>${p.id}</span>
                    <span class="user_id">${userData.name}</span>
                    <span class="job_id">${jobData.factory}</span>
                    <span class="job_position">${jobData.name}</span>
                    <span>${categories(p.job_match_categories_id)}</span>
                  </div>
                `;
            }
        });
    } catch (err) {
        console.error('Error rendering matches:', err);
    }
}

renderUserCard();

