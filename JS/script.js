"use strict";

// XML

// const mainWraper = document.getElementById("postWraper");
// const overlay = document.getElementById("overlay");
// const closeIcon = document.getElementById("close");
// const content = document.getElementById("content");

// function ajax(url, fnc) {
//   const requist = new XMLHttpRequest();
//   requist.open("GET", url);
//   requist.addEventListener("load", function () {
//     const responseJsData = JSON.parse(this.responseText);

//     fnc(responseJsData);
//   });

//   requist.send();
// }

// ajax("https://jsonplaceholder.typicode.com/posts", function (data) {
//   data.forEach((element) => {
//     createPost(element);
//   });
// });

// function createPost(item) {
//   const divWraper = document.createElement("div");
//   divWraper.classList.add("container");
//   divWraper.setAttribute("data-id", item.id);

//   const titleh2 = document.createElement("h2");
//   titleh2.innerText = item.id;

//   const titleh3 = document.createElement("h3");
//   titleh3.innerText = item.title;

//   const deleteBtn = document.createElement("button");
//   deleteBtn.textContent = "Delete This Post";
//   deleteBtn.setAttribute("data-delete-id", item.id);

//   divWraper.appendChild(titleh2);
//   divWraper.appendChild(titleh3);
//   divWraper.appendChild(deleteBtn);

//   deleteBtn.addEventListener("click", function (e) {
//     e.stopPropagation();
//     const deleteId = e.target.getAttribute("data-delete-id");
//     console.log(deleteId);

//     const newDeleteUrl = `https://jsonplaceholder.typicode.com/posts/${deleteId}`;
//     console.log(newDeleteUrl);

//     fetch(newDeleteUrl, {
//       method: "DELETE",
//     }).then(() => divWraper.remove());
//   });

//   divWraper.addEventListener("click", function () {
//     // console.log(this); //dacherili divi
//     const divId = this.getAttribute("data-id");
//     // console.log(divId); //dacherili divis data-id mnishneloba

//     overlay.classList.add("activeOverlay");
//     const newUrl = `https://jsonplaceholder.typicode.com/posts/${divId}`;
//     // console.log(newUrl); //axali linki

//     ajax(newUrl, function (newData) {
//       // console.log(newData); //erti mosuli obiekti axali linkidan
//       const pDescr = document.createElement("p");
//       pDescr.textContent = newData.body;

//       content.appendChild(pDescr);
//     });
//   });

//   mainWraper.appendChild(divWraper);
// }

// closeIcon.addEventListener("click", function () {
//   overlay.classList.remove("activeOverlay");
//   content.innerHTML = "";
// });

// Fetch

const mainWraper = document.getElementById("postWraper");
const overlay = document.getElementById("overlay");
const closeIcon = document.getElementById("close");
const content = document.getElementById("content");

function fetchData(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

fetchData("https://jsonplaceholder.typicode.com/posts")
  .then((data) => {
    data.forEach((element) => {
      createPost(element);
    });
  })
  .catch((error) => console.error("Fetch error:", error));

function createPost(item) {
  const divWraper = document.createElement("div");
  divWraper.classList.add("container");
  divWraper.setAttribute("data-id", item.id);

  const titleh2 = document.createElement("h2");
  titleh2.innerText = item.id;

  const titleh3 = document.createElement("h3");
  titleh3.innerText = item.title;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete This Post";
  deleteBtn.setAttribute("data-delete-id", item.id);

  divWraper.appendChild(titleh2);
  divWraper.appendChild(titleh3);
  divWraper.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    const deleteId = e.target.getAttribute("data-delete-id");
    console.log(deleteId);

    const newDeleteUrl = `https://jsonplaceholder.typicode.com/posts/${deleteId}`;
    console.log(newDeleteUrl);

    fetch(newDeleteUrl, {
      method: "DELETE",
    }).then(() => divWraper.remove());
  });

  divWraper.addEventListener("click", function () {
    const divId = this.getAttribute("data-id");
    overlay.classList.add("activeOverlay");
    const newUrl = `https://jsonplaceholder.typicode.com/posts/${divId}`;

    fetchData(newUrl)
      .then((newData) => {
        const pDescr = document.createElement("p");
        pDescr.textContent = newData.body;
        content.appendChild(pDescr);
      })
      .catch((error) => console.error("Fetch error:", error));
  });

  mainWraper.appendChild(divWraper);
}

closeIcon.addEventListener("click", function () {
  overlay.classList.remove("activeOverlay");
  content.innerHTML = "";
});
