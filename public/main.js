document.querySelector("#btn").addEventListener("click", getAnime);
let img, title;

function getAnime() {
  let searchTerm = document.querySelector("#animeName").value;
  fetch(`https://api.jikan.moe/v4/anime?q=${searchTerm}&sf`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.data.length === 0) {
        alert("SORRY we couldnt find that anime");
      } else {
        document.querySelector(".searchResult").innerHTML = `         
<div class="col">
              <div class="card">
                <img src="${data.data[0].images.jpg.image_url}" class="img-fluid" alt="Image description">
                <div class="card-body1">


                  <h5 class="card-title">${data.data[0].title}</h5>
      
                  <button id="bookmark" class="btn btn-secondary"/>Bookmark</button>
                  </div>
                </div>
              </div>

              `;
      }
      img = data.data[0].images.jpg.image_url;
      title = data.data[0].title;
      document.querySelector("#bookmark").addEventListener("click", bookmark);
    });
}

function bookmark() {
  fetch("addAnime", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: title,
      img: img,
    }),
  }).then(function (response) {
    window.location.reload();
  });
}

let btn = document.querySelectorAll("#delete");

Array.from(btn).forEach((element) => {
  element.addEventListener("click", () => {
    fetch("deleteAnime", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: element.dataset.id,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
let update = document.querySelectorAll("#update");

Array.from(update).forEach((element) => {
  element.addEventListener("click", () => {
    console.log(document.getElementById(`${element.dataset.id}`).value);
    fetch("update", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: element.dataset.id,
        episode: document.getElementById(`${element.dataset.id}`).value,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
