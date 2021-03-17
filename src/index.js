let addToy = false;
const allToys = 'http://localhost:3000/toys'
const toyCollection = document.querySelector(('#toy-collection'))

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function getToys() {
  return fetch(allToys)
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(function(toy) {
      renderToys(toy)
    });
  });
};

function renderToys() {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')
  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`
  let btn = document.createElement('btn')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "<3"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })
  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  toyCollection.append(divCard)
}

function postToy(toy_data) {
  fetch(allToys, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0
    })
  })
  .then(resp => resp.json())
  .then(toyObject => renderToys(toyObject))
}

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`${allToys}/${e.target.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "likes": more
    })
  })
  .then(resp => resp.json())
  .then((likedObject => {
    e.target.previousElementSibling.innerText = `${more} likes`;
  }))
}

getToys()
