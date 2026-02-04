import { fetchGet, fetchGetById, fetchPut } from '../../modules/fetch.js'

document.addEventListener('DOMContentLoaded', () => {
    const localsesion = sessionStorage.getItem('id') || null;
    const localsesion_loggedin = sessionStorage.getItem('loggedin') || null;

    if (localsesion !== null && localsesion_loggedin === 'true') {
        fetchGetById(localsesion, 'users')
            .then(result => {

                if (result.rol === 'Admin') {
                    sessionStorage.setItem('loggedin', false);
                    window.location = '../admin/index.html'
                }
            })

    } else {
        window.location = '../../index.html'
    }
})

//logout button
document.querySelector('.logout-btn')
    .addEventListener('click', () => {
        sessionStorage.clear()
        window.location.reload(true);
    })

async function showUserJobApplies() {
    try {
        const userId = sessionStorage.getItem('id');
        if (!userId) return; // si no hay usuario logueado, no hacemos nada

        const jobsZone = document.querySelector('.jobs-zone');
        jobsZone.innerHTML = '';

        // obtener datos del db.json
        const [userJobMatches, jobs, categories] = await Promise.all([
            fetchGet('user_job_match'),
            fetchGet('jobs'),
            fetchGet('job_match_categories')
        ]);

        // filtrar solo las aplicaciones del usuario logueado
        const myMatches = userJobMatches.filter(
            match => match.user_id === userId || match.user_id === Number(userId)
        );

        for (const match of myMatches) {
            const job = jobs.find(j => j.id === match.job_id || j.id === Number(match.job_id));
            if (!job) continue;

            const [company, position] = await Promise.all([
                fetchGetById(job.company_id, 'comapanies'),
                fetchGetById(job.position_id, 'positions')
            ]);

            const category = categories.find(c => c.id === match.job_match_categories_id || c.id === Number(match.job_match_categories_id));

            jobsZone.innerHTML += `
                <div class="col col-lg-12 h-25 mb-2">
                    <div class="card d-flex flex-row justify-content-center align-items-center">
                        <div class="card-body d-flex flex-row justify-content-around align-items-center">
                            <div>
                                <span>Job ID <span>${job.id}</span></span>
                            </div>
                            <div>
                                <span>${company?.name || ''}</span>
                            </div>
                            <div>
                                <span>Rol <span>${position?.name || ''}</span></span>
                            </div>
                            <div>
                                <span class="badge ${statusColor(category?.name)}">
                                    ${category?.name || ''}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // mostrar info del usuario en su perfil
        showSpecificUser();

    } catch (error) {
        console.error(error);
    }
}


function statusColor(status) {
    switch (status) {
        case 'pending':
            return 'bg-warning';
        case 'contacted':
            return 'bg-info';
        case 'interview':
            return 'bg-primary';
        case 'hires':
            return 'bg-success';
        case 'discarded':
            return 'bg-danger';
        default:
            return 'bg-secondary';
    }
}

export async function showSpecificUser() {
    try {
        const userId = sessionStorage.getItem('id');
        if (!userId) return;

        const user = await fetchGetById(userId, 'users');

        // Mostrar datos en la card del perfil
        document.querySelector('.user_profile').innerHTML = `
            <div class="card-img d-flex justify-content-center">
                <img class="img-fluid rounded-circle w-50" src="${user.img}" alt="">
            </div>
            <div class="card-text fw-bold">${user.name}</div>
            <div class="card-text availability_id">${user.availability_id}</div>
            <div class="card-text">${user.email}</div>
            <div class="card-text">${user.rol}</div>
            <div class="card-text position_id">${user.position_id}</div>
            <div class="card-text d-flex justify-content-center">${user.profile}</div>
            <div class="card-text">${user.contact}</div>
            <div class="card-text">${user.linkedin}</div>
            <div class="d-flex justify-content-center my-2">
                <button class="btn btn-primary btn-sm form-control update-profile">Update Profile <i class="bi bi-arrow-right"></i></button>
            </div>
        `;

        // Reemplazar ids por nombres
        const [availability, position] = await Promise.all([
            fetchGetById(user.availability_id, 'availability'),
            fetchGetById(user.position_id, 'positions')
        ]);
        document.querySelector('.availability_id').textContent = availability.name;
        document.querySelector('.position_id').textContent = position.name;

        // Configurar botón para abrir modal
        const updateBtn = document.querySelector('.update-profile');
        updateBtn.addEventListener('click', () => {
            const modal = new bootstrap.Modal(document.getElementById('updateProfileModal'));

            // Rellenar campos del modal con todos los datos del usuario
            document.getElementById('profileName').value = user.name;
            document.getElementById('profileEmail').value = user.email;
            document.getElementById('profileRol').value = user.rol;
            document.getElementById('profileImg').value = user.img;
            document.getElementById('profileDesc').value = user.profile;
            document.getElementById('profileContact').value = user.contact;
            document.getElementById('profileLinkedin').value = user.linkedin;

            // Llenar selects
            fetchGet('positions').then(positions => {
                const select = document.getElementById('profilePosition');
                select.innerHTML = positions.map(pos => `
                    <option value="${pos.id}" ${pos.id === user.position_id ? 'selected' : ''}>${pos.name}</option>
                `).join('');
            });
            fetchGet('availability').then(avails => {
                const select = document.getElementById('profileAvailability');
                select.innerHTML = avails.map(a => `
                    <option value="${a.id}" ${a.id === user.availability_id ? 'selected' : ''}>${a.name}</option>
                `).join('');
            });

            modal.show();
        });

    } catch (e) {
        console.error(e);
    }
}
// Función para guardar los cambios del perfil
document.getElementById('saveProfileBtn').addEventListener('click', async () => {
    try {
        const userId = sessionStorage.getItem('id');
        if (!userId) return;

        // Obtener valores del modal
        const updatedUser = {
            name: document.getElementById('profileName').value,
            email: document.getElementById('profileEmail').value,
            rol: document.getElementById('profileRol').value, // normalmente no editable
            img: document.getElementById('profileImg').value,
            position_id: document.getElementById('profilePosition').value,
            availability_id: document.getElementById('profileAvailability').value,
            profile: document.getElementById('profileDesc').value,
            contact: document.getElementById('profileContact').value,
            linkedin: document.getElementById('profileLinkedin').value
        };

        // Actualizar en db.json usando fetchPut (asumiendo que lo tienes)
        fetchPut(userId, 'users', updatedUser)
        .then(result =>{
            // Cerrar modal
            const modalEl = document.getElementById('updateProfileModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();

            window.location.reload(true);
        })
        .catch(e => console.log(e))
    } catch (error) {
        console.error(error);
    }
});




showUserJobApplies()
