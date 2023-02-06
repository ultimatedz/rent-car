

fetch("http://127.0.0.1:5000/cars").then(res => res.json().then(res => {
}))

function addCar() {
  const inputMarcaElement = document.querySelector('#selectMarca');
  const inputModeloElement = document.querySelector('#inputModelo');
  const inputAnoElement=document.querySelector("#inputAno");
  const inputObsElement = document.querySelector("#inputObs");
  const inputDiariaElement = document.querySelector("#inputPrice");
  const inputStatusElement=document.querySelector("#inputStatus");
  const inputCategoriaElement=document.querySelector("#inputCategoria");

  fetch("http://127.0.0.1:5000/cars", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        'marca': inputMarcaElement.value,
        'modelo': inputModeloElement.value,
        'ano': inputAnoElement.value,
        'obs': inputObsElement.value,
        'price': inputDiariaElement.value,
        'status': inputStatusElement.value,
        'categoria':inputCategoriaElement.value
      }
    )
  })
  }
    



function updateList(res){

  if(document.querySelector("#cars_container")== null){
    return
  }
  document.querySelector("#cars_container").innerHTML = ''
  res.forEach(element =>{
    document.querySelector("#cars_container").innerHTML +=`
    <div class="car-content">
                <div class="category_title">
                <span >Categoria: ${element.categoria}</span>
                </div>
                    <div class="img-car-container">
                        <img class="img-car-content" src="./img/${element.categoria}.png">
                    </div>
                    <div class="info-car">
                        <h3>${element.marca} ${element.modelo}</h3>
                        <span class="span_placeholder">Veiculo similar a: ${element.marca} ${element.modelo}, dentre outros</span>
                        <br>
                        <span>Ano: ${element.ano}</span>
                        <br>
                        <span>Estado: ${element.obs}</span>
                        <br>

                        <span>Diaria: R$${element.price}</span>
                    </div>
                    <div class="icon-div">
                    <a href="edit-car.html">
                      <button onclick="saveLocalStorageId(${element.id})" class="button-icons">
                        <img src="./icon/edit-icon.png">
                      </button>    
                    </a>
                            
                      <button onclick="deleteCar(${element.id})" class="button-icons">
                        <img src="./icon/trash-icon.png">
                       </button>       
                            
                    </div>
      `
  })

}


function deleteCar(id) {
  fetch(`http://127.0.0.1:5000/cars/${id}`, {
    method: 'DELETE'
  }).then(res => res.json().then(res => {
    updateList(res)
  }))
}



function updateCar(id) {
  const inputEditMarcaElement = document.querySelector('#selectEditMarca');
  const inputEditModeloElement = document.querySelector('#inputEditModelo');
  const inputEditAnoElement=document.querySelector("#inputEditAno");
  const inputEditObsElement = document.querySelector("#inputEditObs");
  const inputEditDiariaElement = document.querySelector("#inputEditPrice");
  const inputEditStatusElement=document.querySelector("#inputEditStatus");





  fetch(`http://127.0.0.1:5000/cars/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        'marca': inputEditMarcaElement.value,
        'modelo': inputEditModeloElement.value,
        'ano': inputEditAnoElement.value,
        'obs': inputEditObsElement.value,
        'price': inputEditDiariaElement.value,
        'status': inputEditStatusElement.value,
        'categoria': inputEditCategoria.value
      
      
      }
    )
  }).then(res => res.json().then(res => {
    updateList(res)
  }))
}

function callUpdateCar(){
  let id = localStorage.getItem("idEdit")
  updateCar(id)
}

function saveLocalStorageId(id){
  localStorage.setItem("idEdit", id);
}




fetch("http://127.0.0.1:5000/cars").then(res => res.json().then(res => {
  updateList(res)
}))