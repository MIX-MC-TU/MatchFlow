import { fetchGet, fetchGetById, fetchPost } from '../../modules/fetch.js'

// validation
document.addEventListener('DOMContentLoaded', () => {
    const localsesion = sessionStorage.getItem('id') || null;
    const localsesion_loggedin = sessionStorage.getItem('loggedin') || null;

    if (localsesion !== null && localsesion_loggedin === 'true') {
        fetchGetById(localsesion, 'users')
            .then(result => {

                if (result.rol === 'User') {
                    sessionStorage.setItem('loggedin', false);
                    window.location = '../user/index.html'
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

// show a specific user by id
export async function showSpecificUser(id) {
    sessionStorage.setItem('userChosen', id);
    fetchGetById(id, 'users')
        .then(user => {

            document.querySelector('.user_profile').innerHTML = `
                        <div class="card-img d-flex justify-content-center">
                            <img class="img-fluid rounded-circle w-50" src="${user.img}" alt="">
                        </div>
                        <div class="card-text">
                            <span class="fw-bold">${user.name}</span>
                        </div>
                        <div class="card-text">
                            <span class="fw-light availability_id">${user.availability_id}</span>
                        </div>
                        <div class="card-text">
                            <span class="fw-light">${user.email}</span>
                        </div>
                        <div class="card-text">
                            <span class="fw-light">${user.rol}</span>
                        </div>
                        <div class="card-text">
                            <span class="fw-light position_id">${user.position_id}</span>
                        </div>
                        <div class="card-text">
                            <span class="fw-light">${user.profile}</span>
                        </div>
                        <div class="card-text">
                            <span class="fw-light">${user.contact}</span>
                        </div>
                        <div class="card-text">
                            <span class="fw-light">${user.linkedin}</span>
                        </div>
                    `;


            fetchGetById(user.availability_id, 'availability')
                .then(availa => {
                    document.querySelector('.availability_id').textContent = availa.name
                })
                .catch(e => console.log(e))

            fetchGetById(user.position_id, 'positions')
                .then(pos => {
                    document.querySelector('.position_id').textContent = pos.name
                })
                .catch(e => console.log(e))


            showAllJobsApplies(user.position_id)
        })
        .catch(e => console.log(e))

}
async function companyName(id) {
    try {
        const company = await fetchGetById(id, 'comapanies');
        return company.name;
    } catch (error) {
        console.error(error);
        return '';
    }
}

export async function showAllJobsApplies(position_id) {
    try {
        document.querySelector('.jobs-zone').innerHTML = ''
        const jobs = await fetchGet('jobs');
        const position = await fetchGetById(position_id, 'positions');

        const filteredJobs = jobs.filter(job => job.position_id === position_id);

        const jobsHTML = await Promise.all(
            filteredJobs.map(async job => {
                const company = await companyName(job.company_id);

                return `
                    <div class="col col-lg-12 h-25 mb-2">
                    <div class="card d-flex flex-row justify-content-center align-items-center">
                        <div class="card-body d-flex justify-content-around align-items-center">
                        <span>${job.id}</span>
                        <span>${company}</span>
                        <span>${position.name}</span>

                        <button 
                            class="btn btn-sm btn-outline-primary open-job-match"
                            data-job-id="${job.id}">
                            Change status
                        </button>
                        </div>
                    </div>
                    </div>`;
            })
        );

        document.querySelector('.jobs-zone').innerHTML += jobsHTML.join('');

    } catch (error) {
        console.error(error);
    }
}

//modal status
document.addEventListener('click', async (e) => {
    if (!e.target.classList.contains('open-job-match')) return;

    const jobId = e.target.dataset.jobId;
    sessionStorage.setItem('jobChosen', jobId);

    const select = document.getElementById('jobMatchSelect');
    select.innerHTML = '<option value="">Select status</option>';

    const categories = await fetchGet('job_match_categories');

    categories.forEach(cat => {
        select.innerHTML += `
            <option value="${cat.id}">${cat.name}</option>
        `;
    });

    new bootstrap.Modal(
        document.getElementById('jobMatchModal')
    ).show();
});

//guardar satus
document.getElementById('saveJobMatch')
  .addEventListener('click', async () => {

    const categoryId = document.getElementById('jobMatchSelect').value;
    const userId = sessionStorage.getItem('userChosen');
    const jobId = sessionStorage.getItem('jobChosen');

    if (!categoryId || !userId || !jobId) return;

    const newMatch = {
        user_id: userId,
        job_id: jobId,
        job_match_categories_id: categoryId
    };

    fetchPost('user_job_match',newMatch)
    .then(result =>{
        bootstrap.Modal.getInstance(
            document.getElementById('jobMatchModal')
        ).hide();
    })
    .catch(e => console.log(e));

});



// <!--users fillter-->
document.querySelector('#user_section_form')
    .addEventListener('change', (event) => { showSpecificUser(event.target.value) })

export async function showListUsers() {
    try {
        const users = await fetchGet('users');
        const userSectionForm = document.getElementById('user_section_form');

        userSectionForm.innerHTML += users
            .filter(user => user.availability_id === '1' && user.rol !== 'Admin')
            .map(user => `<option data-id=${user.id} value="${user.id}">${user.name}</option>`)
            .join('');

        const userChosen = sessionStorage.getItem('userChosen') || null;
        // console.log(userChosen);

        if (userChosen !== null) {
            showSpecificUser(userChosen);
        }


    } catch (error) {
        console.error(error);
    }
}

showListUsers();
