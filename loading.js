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
}