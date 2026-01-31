//const { createElement } = require("react");

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



//DATOS QUEMADOS SOLO PARA PRUEBAS
const company = {
  id: 1,
  name: "Tecnology Company"
}

const jobs = [
  { id: 100, title: "frondted", idCompany: 1 },
  { id: 101, title: "backend", idCompany: 1 }
]

const candidatos = [
  {
    id: 100312,
    name: "Pepito Perez",
    openToWork: true,
    contact: "320231023",
    reservado: false
  },
  {
    id: 123213, name: "Juancho",
    openToWork: false,
    contact: "320231221",
    reservado: true
  }]
//matches
const partido = []
//Match

function reserveVacancy() {
   const btnVacancy = document.createElement("div");
   btnVacancy.innerHTML= `Hola `

}






const btnSearch = document.getElementById("btn-search")
const searchs = document.getElementById("searchs")
const advertencia = document.getElementById("advertencia")

  reserveVacancy()

const clickSearch = btnSearch.addEventListener("click", function (e) {
  e.preventDefault()

  if (searchs.value == "") {
    console.log("Ingrese un nombre")
    advertencia.innerHTML = `
            <p class = "text-danger">No se encontro empleado con ese nombre, o ingresa un nombre valido</p>
            
    `
    setTimeout(() => {
      advertencia.style.display = "none"
    }, 1500);

  } else {
    const found = candidatos.find(x => x.name == searchs.value)
    if (found) {
      if (found.openToWork != true) {
        ofertJob.innerHTML = `
              <p>El usuario  ${found.name} no esta disponible porque no tiene el openWork activo</p>

        `
        console.log("El usuario " + found.name + " no esta disponible porque no tiene el openWork activo")

      } else {
        ofertJob.innerHTML = `
         <div class=" bg-dark text-primary p-5 z-3">
          El usuario ${found.name} esta disponible <button>X</button>
          </div>
         `
        console.log("Los usuarios " + found.name + " estan disponible")
      }
    }
  }
})




