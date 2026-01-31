import { fetchGet, fetchGetById } from '../../modules/fetch.js'


// validacion de autenticacion USER
async function validation() {
    if (sessionStorage.getItem('rol') === 'User') {
        // console.log("Admin")
        window.location.assign('../user/index.html');
    }
    if (sessionStorage.getItem('rol') === null || sessionStorage.getItem('rol') === '') {
        // console.log("login")
        window.location.assign('../../index.html');
    }
}


async function renderUserCard() {
    validation();

    const id = sessionStorage.getItem('id');
    const card_user = document.querySelector('.user-card');

    fetchGetById(id, 'users')
        .then(result => {
            card_user.innerHTML = `        
        <div class="sidebar sticky-top" style="top: 2rem;">
          <div class="sidebar-action mb-4 d-flex flex-column">
            <div class="card-img d-flex justify-content-center">
              <img class="w-25 rounded-circle" src="${result.img}" alt="">
            </div>
            <div class="card-body d-flex flex-column align-items-center gap-1">
              <div class="">
                <h5 class="fw-bold">${result.name}</h5>
              </div>
              <div>
                <h5 class="text-secondary">${result.email}</h5>
              </div>
              <div>
                <h5 class="text-secondary position">${result.position_id}</h5>
              </div>
              <div>
                <p class="text-center">${result.profile}</p>
              </div>
              <div>
                <h5 class="text-secondary">${result.contact}</h5>
              </div>
              <div>
                <h5 class="text-secondary">${result.linkedin}</h5>
              </div>
            </div>
          </div>

        </div>
        `;

            fetchGet('positions')
                .then(posi => {
                    const position = document.querySelector('.position');
                    posi.forEach(element => {
                        if (result.position_id[0] === element.id) {
                            position.textContent = element.name;
                        }
                    });

                }

                )
                .catch(e => console.log(e));

            fetchGet('availability')
                .then(avi => {
                    const availability = document.querySelector('.availability');
                    avi.forEach(element => {
                        if (result.availability_id === element.id) {
                            availability.textContent = element.name;
                        }
                    });

                }

                )
                .catch(e => console.log(e));

        })
        .catch(e => console.log(e))

    const match = document.querySelector('.match');
    fetchGet('user_job_match')
        .then(job => {

            job.forEach(p => {
                if (id === p.user_id) {
                    match.innerHTML += `

          <div class="card border-0 shadow-sm bg-light d-flex flex-column align-items-center h-25">
            <div>
              <span>${p.id}</span>
            </div>
            <div>
              <span class="user_id">${p.user_id}</span>
            </div>
            <div>
              <span class="job_id">${p.job_id}</span>
            </div>
            <div>
              <span class="job_position">${p.job_id}</span>
            </div>
            <div>
              <span class="match_job"></span>
            </div>
            <div>
              <span class"state">${categories(p.job_match_categories_id)}</span>
            </div>
          </div>
                `;


                    // Cambio de estados
                    fetchGetById(p.user_id,'users')
                        .then(u => {
                            const user_id = document.querySelector('.user_id');
                            user_id.textContent = u.name

                        }

                        )
                        .catch(e => console.log(e));

                    fetchGetById(p.job_id,'jobs')
                        .then(j => {
                            const job_id = document.querySelector('.job_id');
                            const job_position = document.querySelector('.job_position');

                            job_id.textContent = j.factory
                            job_position.textContent = j.name

                        }

                        )
                        .catch(e => console.log(e));

                    // fetchGetById(p.job_match_categories_id,'job_match_categories')
                    //     .then(j => {

                            // const m_state = document.querySelector('.state');

                            // console.log(j.category)
                            // m_state.textContent = j.category;
                            // m_state.textContent = JSON.stringify(j.name)

                        // }

                        // )
                        // .catch(e => console.log(e));
                }

            });


        })
        .catch(e => console.log(e))

}

// ================= LOGOUT =================
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = '../../index.html';
});
renderUserCard();

