const searchContainer = document.querySelector('.search-container');
const gallery = document.querySelector('.gallery');
let employees = [];
let modalIndex = 0;
const url = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob&noinfo &nat=US'


// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url){
  return fetch(url)
         .then(checkStatus)
         .then(res => res.json())
         .catch(error => console.log("Looks like there was a problem", error))
}

fetchData(url)

.then(data => {
   employees = data.results
   filteredList = data.results
   generatProfile(data.results);
});

function checkStatus(response){
  if(response.ok){
    return Promise.resolve(response);
  } else{
    return Promise.reject(new Error(response.statusText));
  }
}

// // ------------------------------------------
// //  USERS FUNCTION
// // ------------------------------------------


function generatProfile(data, index){
    gallery.innerHTML = "";
    let html = ""
    data.forEach((user,index) => {
    html = `
              <div class="card" data-index=${index}>
                    <div class="card-img-container">
                        <img class="card-img" src= ${user.picture.large} alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="card-text">${user.email}</p>
                        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                    </div>
                </div>
`
    gallery.insertAdjacentHTML('beforeend', html)

});

};

// ------------------------------------------
//  MODAL FUNCTIONS
// ------------------------------------------

const modalContainer = document.querySelector(".modal-container");

function generateModal(index){
    const user = filteredList[index]
    console.log(filteredList[index])
    const newFormatPhone = user.phone.replace(/-/, " ");
    let date = new Date(user.dob.date);
    let htmlModal = ""
    htmlModal = `
    <div id="modal" class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${user.picture.large} alt="profile picture">
                        <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="modal-text">${user.email}</p>
                        <p class="modal-text cap">${user.location.city}</p>
                        <hr>
                        <p class="modal-text">${newFormatPhone}</p>
                        <p class="modal-text">${user.location.street.number}, ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.postcode}</p>
                        <p class="modal-text">${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
                    </div>
                </div>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
`
  document.body.insertAdjacentHTML("beforeend", htmlModal);

    document.querySelector(".modal-close-btn").addEventListener("click", (e) => {
    document.querySelector("#modal").remove();

    })
  const modalPrev = document.getElementById("modal-prev")
  const modalNext = document.getElementById("modal-next")

  modalPrev.addEventListener("click", (e) => {
       document.querySelector("#modal").remove();
       moveModalPrev()
    })

    modalNext.addEventListener("click", (e) => {
       document.querySelector("#modal").remove();
       moveModalNext()
  });


};


// // ------------------------------------------
// //  EVENT LISTENERS AND FUNCTIONS
// // ------------------------------------------


gallery.addEventListener("click", (e) => {
  const clickedCard = e.target.closest(".card");
  const index = clickedCard.getAttribute("data-index");
  modalIndex = index;
  generateModal(index);
});


function moveModalPrev() {
  if (modalIndex > 0) {
    modalIndex--;
    generateModal(modalIndex);
  } else {
    modalIndex = filteredList.length -1;
    generateModal(modalIndex);
  }
}

function moveModalNext() {
  if (modalIndex < filteredList.length - 1) {
    modalIndex++;
    generateModal(modalIndex);
  } else {
    modalIndex = 0;
    generateModal(modalIndex);
  }
}

// // ------------------------------------------
// //  SEARCH BAR
// // ------------------------------------------

searchContainer.addEventListener("input", (e) => {
   let searchText = e.target.value;
   searchText = searchText.toUpperCase();
   filteredList = employees.filter((user) => {
     return (
       user.name.first.toUpperCase().includes(searchText) ||
       user.name.last.toUpperCase().includes(searchText)
     );
   });
   if (filteredList.length > 0) {
    generatProfile(filteredList);
    } else {
     gallery.innerHTML = `Sorry no results for "${searchText}" please try a different name.`;
   }

 });
