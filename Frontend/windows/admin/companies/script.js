import { fetchDelete, fetchGet, fetchGetById, fetchPost, fetchPut } from '../../../modules/fetch.js'

document.addEventListener('DOMContentLoaded', () => {
    const localsesion = sessionStorage.getItem('id') || null;
    const localsesion_loggedin = sessionStorage.getItem('loggedin') || null;

    if (localsesion !== null && localsesion_loggedin === 'true') {
        fetchGetById(localsesion, 'users')
            .then(result => {

                if (result.rol === 'User') {
                    sessionStorage.setItem('loggedin', false);
                    window.location = '../../user/index.html'
                }
            })

    } else {
        window.location = '../../../index.html'
    }
})

//logout button
document.querySelector('.logout-btn')
    .addEventListener('click', () => {
        sessionStorage.clear()
        window.location.reload(true);
    })


// Show add jobs
document.querySelector('.showJobFormulary')
    .addEventListener('click', () => {

        fetchGet('positions')
            .then(result => {

                // 1. Filtrar (excluir id 4)
                const jobsFiltered = result.filter(job => job.id !== "4");

                // 2. Renderizar formulario
                document.querySelector('.add-jobs').innerHTML = `
          <form class="form p-3 add-job-form">
            <div class="mt-4">
              <label class="form-label">Position <span class="text-danger">*</span></label>
              <select class="form-select" id="position_id" required>
                <option value="">---</option>
                ${jobsFiltered.map(job => `
                  <option value="${job.id}">${job.name}</option>
                `).join('')}
              </select>
            </div>

            <div class="mt-4">
              <label class="form-label">Descripción del rol <span class="text-danger">*</span></label>
              <input
                class="form-control"
                type="text"
                id="description"
                placeholder="Descripción"
                required
              >
            </div>

            <div class="d-flex flex-row justify-content-center gap-3">
              <button type="button" class="btn btn-primary mt-3 save-job">Guardar</button>
              <button type="button" class="btn btn-secondary mt-3 cancelar">Cancelar</button>
            </div>
          </form>
        `;

                // 3. Cancelar
                document.querySelector('.cancelar')
                    .addEventListener('click', () => {
                        document.querySelector('.add-jobs').innerHTML = '';
                    });

                // 4. POST del formulario
                document.querySelector('.save-job')
                    .addEventListener('click', () => {
                        let position_id = document.querySelector('#position_id');
                        let descrip = document.querySelector('#description');
                        let company_id = sessionStorage.getItem('companyChosen')


                        fetchPost('jobs', {
                            company_id: company_id,
                            position_id: position_id.value,
                            description: descrip.value
                        })
                            .then(response => {
                                // console.log('Guardado:', response);
                                document.querySelector('.add-jobs').innerHTML = '';
                                window.location.reload(true);
                            })
                            .catch(err => console.error(err));
                    });
            });
    });

// show a specific company by id
export async function showSpecificCompany(id) {
    sessionStorage.setItem('companyChosen', id);
    fetchGetById(id, 'comapanies')
        .then(comp => {

            document.querySelector('.company_profile').innerHTML = `
                        <div class="card-img d-flex justify-content-center">
                            <img class="img-fluid rounded-circle w-50" src="${comp.img}" alt="">
                        </div>
                        <div class="card-text">
                            <span class="fw-bold">${comp.name}</span>
                        </div>
                        <div class="card-text">
                            <span class="fw-light availability_id">${comp.slogan}</span>
                        </div>
                        <div class="card-text">
                            <span class="fw-light">${comp.contact}</span>
                        </div>
                        <div class="card-text">
                            <span class="fw-light">${comp.web}</span>
                        </div>
                    `;
            showAllJobs()
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

export async function showAllJobs() {
    try {
        const jobsZone = document.querySelector('.jobs-zone');
        jobsZone.innerHTML = '';

        const jobs = await fetchGet('jobs');
        const companyChosen = sessionStorage.getItem('companyChosen');

        const filteredJobs = jobs.filter(
            job => job.company_id === companyChosen
        );

        const jobsHTML = await Promise.all(
            filteredJobs.map(buildJobCard)
        );

        jobsZone.innerHTML = jobsHTML.join('');

        // Delegación de eventos (mejor que querySelector para múltiples botones)
        jobsZone.addEventListener('click', handleJobActions);

    } catch (error) {
        console.error(error);
    }
}

/* ===================== HELPERS ===================== */

async function buildJobCard(job) {
    const company = await companyName(job.company_id);
    const position = await fetchGetById(job.position_id, 'positions');

    return `
        <div class="col col-lg-12 h-25 mb-2">
            <div class="card d-flex flex-row justify-content-center align-items-center">
                <div class="card-body d-flex flex-row flex-wrap justify-content-around align-items-center">
                    <div><span>${job.id}</span></div>
                    <div><span>${company}</span></div>
                    <div><span>${position.name}</span></div>
                    <div><span>${job.description}</span></div>
                    <div class="d-flex gap-2">
                        <button class="btn btn-sm btn-warning edit-job" data-id="${job.id}">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger delete-job" data-id="${job.id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function handleJobActions(event) {
    const button = event.target.closest('button');
    if (!button) return;

    const jobId = button.dataset.id;

    if (button.classList.contains('edit-job')) {
        // console.log('Editar job:', jobId);
        editJob(jobId)
    }

    if (button.classList.contains('delete-job')) {
        // console.log('Eliminar job:', jobId);
        deleteJob(jobId)
    }
}
/* =========================
   EDIT JOB
========================= */
function editJob(jobId) {
  fetchGetById(jobId, 'jobs')
    .then(job => {

      fetchGet('positions').then(positions => {

        document.querySelector('.add-jobs').innerHTML = `
          <form class="form p-3">
            <select class="form-select mb-3" id="position_id">
              ${positions.map(p => `
                <option value="${p.id}" ${p.id == job.position_id ? 'selected' : ''}>
                  ${p.name}
                </option>
              `).join('')}
            </select>

            <input class="form-control mb-3" id="description" value="${job.description}">

            <div class="d-flex gap-3 justify-content-center">
              <button type="button" class="btn btn-primary save-edit" data-id="${job.id}">Guardar</button>
              <button type="button" class="btn btn-secondary cancelar">Cancelar</button>
            </div>
          </form>
        `;

        document.querySelector('.cancelar').onclick = () =>
          document.querySelector('.add-jobs').innerHTML = '';

        document.querySelector('.save-edit').onclick = () => {
          fetchPut(jobId,`jobs`, {
            company_id: sessionStorage.getItem('companyChosen'),
            position_id: document.querySelector('#position_id').value,
            description: document.querySelector('#description').value
          }).then(() => {
            document.querySelector('.add-jobs').innerHTML = '';
            showAllJobs();
          });
        };
      });
    });
}

/* =========================
   DELETE JOB
========================= */
function deleteJob(jobId) {
  if (!confirm('¿Eliminar esta oferta?')) return;

  fetchDelete(jobId,`jobs`)
    .then(() => showAllJobs());
}






// <!--users fillter-->
document.querySelector('#company_form')
    .addEventListener('change', (event) => { showSpecificCompany(event.target.value) })

export async function showListCompany() {
    try {
        const companies = await fetchGet('comapanies');
        const userSectionForm = document.getElementById('company_form');

        userSectionForm.innerHTML += companies
            .map(company => `<option data-id=${company.id} value="${company.id}">${company.name}</option>`)
            .join('');

        const companyChosen = sessionStorage.getItem('companyChosen') || null;
        // console.log(userChosen);

        if (companyChosen !== null) {
            showSpecificCompany(companyChosen);
        }


    } catch (error) {
        console.error(error);
    }
}

let companyModal = new bootstrap.Modal(
  document.getElementById('editCompanyModal')
);

//modal
document.querySelector('.confirm-order')
  .addEventListener('click', () => {
    const companyId = sessionStorage.getItem('companyChosen');
    if (!companyId) return alert('Selecciona una compañía');
    editCompany(companyId);
  });

/* =========================
   EDIT COMPANY
========================= */
function editCompany(companyId) {
  fetchGetById(companyId, 'comapanies')
    .then(company => {

      document.querySelector('#company_name').value = company.name;
      document.querySelector('#company_slogan').value = company.slogan;
      document.querySelector('#company_contact').value = company.contact;
      document.querySelector('#company_web').value = company.web;
      document.querySelector('#company_img').value = company.img;

      document.querySelector('#saveCompanyEdit').onclick = () => {
        fetchPut(companyId, 'comapanies', {
          name: document.querySelector('#company_name').value,
          slogan: document.querySelector('#company_slogan').value,
          contact: document.querySelector('#company_contact').value,
          web: document.querySelector('#company_web').value,
          img: document.querySelector('#company_img').value
        }).then(() => {
          companyModal.hide();
          showSpecificCompany(companyId);
        });
      };

      companyModal.show();
    });
}

showListCompany();