const createJob = document.getElementById("btn-create-job");
const ofertJob = document.getElementById("ofertJob");
const manageJob = document.getElementById("btn-manage")



createJob.addEventListener("click", function () {
  ofertJob.innerHTML = `    <input placeholder="Nombre de la oferta a crear"> <br> <br>
            <select  id="">
              <option value="backend">desarrollador backend</option>
              <option value="backend">desarrollador frond</option>
            </select>`
});

manageJob.addEventListener("click", function () {
    
});