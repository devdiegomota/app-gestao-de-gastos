<<<<<<< HEAD
function ShowLoading() {
   const div = document.createElement("div");
   div.classList.add("loading", "centralize")

    const label = document.createElement("label");
    label.innerText = "Carregando...";

    div.appendChild(label);

   document.body.appendChild(div);

   setTimeout(() => hideLoading(), 1000);
}

function hideLoading() {
    const loadings = document.getElementsByClassName("loading");
    if (loadings.length) {
        loadings[0].remove();
    }
=======
function ShowLoading() {
   const div = document.createElement("div");
   div.classList.add("loading", "centralize")

    const label = document.createElement("label");
    label.innerText = "Carregando...";

    div.appendChild(label);

   document.body.appendChild(div);

   setTimeout(() => hideLoading(), 1000);
}

function hideLoading() {
    const loadings = document.getElementsByClassName("loading");
    if (loadings.length) {
        loadings[0].remove();
    }
>>>>>>> 5705f5084c6d10ffe4789fcb08da13ba4700951d
}