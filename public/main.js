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
        <div>
               <h5 >${data.data[0].title}</h5>
               <img 
                 src="${data.data[0].images.jpg.image_url}"
                 alt=""
               />
               <br>
               <button id="bookmark"/>Bookmark</button>
             </div>
               `;
      }
      img = data.data[0].images.jpg.image_url;
      title = data.data[0].title;
      document.querySelector("#bookmark").addEventListener("click", bookmark);
    });
}

function bookmark() {
  console.log(title);
  console.log(img);

  fetch("addAnime", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: title,
      img: img,
    }),
  }).then(window.location.reload(true));
}

let btn = document.querySelectorAll("#delete");

Array.from(btn).forEach((element) => {
  element.addEventListener("click", () => {
    console.log(element.dataset.name);
    console.log(element.dataset.img);

    fetch("deleteAnime", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: element.dataset.name,
        img: element.dataset.img,
      }),
    }).then(window.location.reload(true));
  });
});
