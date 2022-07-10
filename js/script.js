let employees = [];
const url = 'https://randomuser.me/api/?results=12';
const searchContainerDiv = document.getElementsByClassName('.search-container')[0];
const galleryDiv = document.getElementById('gallery');
const body = document.querySelector('body');
let modalIndex = 0;

//
// Fetch FUNCTIONS
//

function fetchData(url){
  return fetch(url)
         .then(checkStatus)
         .then(response => response.json())
         .catch(error => console.log("There was a problem", error))
}

fetchData(url)
  .then(response => {
     employees = response.results
     modalList = response.results
     loadEmployees(response.results);
  });


  function checkStatus(response){
    if(response.ok){
      return Promise.resolve(response);
    } else{
      return Promise.reject(new Error(response.statusText));
    }
  }

  function loadEmployees(employee) {
    console.log(employee);
    html = '';

    employee.forEach((employee, index) => {

    html +=
    `<div class="card" data-index=${index}>
        <div class="card-img-container">
            <img class="card-img" src="${employee.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
        </div>
    </div>`
  });
  galleryDiv.innerHTML = html;
};

//
//Modal FUNCTIONS
//

function generateModal(index) {
    console.log(modalList[index]);
  let employee = modalList[index];
  let modalHTML = '';
  modalHTML =

`<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p class="modal-text">${employee.cell}</p>
            <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city},
             ${employee.location.state} ${employee.location.postcode}</p>
            <p class="modal-text">Birthday: ${employee.dob.date.substring(5,7)}/${employee.dob.date.substring(8,10)}
            /${employee.dob.date.substring(0,4)}</p>

        </div>
    </div>

    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
</div>`

document.body.insertAdjacentHTML("beforeend", modalHTML);
const modalClose = document.getElementById('modal-close-btn');
modalClose.addEventListener('click', (e) => {
document.getElementsByClassName('modal-container')[0].remove()
});

const modalPrev = document.getElementById("modal-prev")
const modalNext = document.getElementById("modal-next")

modalPrev.addEventListener("click", (e) => {
   document.getElementsByClassName('modal-container')[0].remove();
   modalBack()
  })

modalNext.addEventListener("click", (e) => {
   document.getElementsByClassName('modal-container')[0].remove();
   modalForward()
});
}


gallery.addEventListener("click", (e) => {
  const selectedCard = e.target.closest(".card");
  const index = selectedCard.getAttribute("data-index");
  modalIndex = index;
  generateModal(modalIndex);
});

function modalBack() {
  if (modalIndex > 0) {
    modalIndex--;
    generateModal(modalIndex);
  } else {
    modalIndex = modalList.length -1;
    generateModal(modalIndex);
  }
}

function modalForward() {
  if (modalIndex < modalList.length - 1) {
    modalIndex++;
    generateModal(modalIndex);
  } else {
    modalIndex = 0;
    generateModal(modalIndex);
  }
}

console.log(modalList);
