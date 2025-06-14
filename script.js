function extrairMusicas(doc) {
  const songs = doc.querySelectorAll(
    "#recent-tracks-section > table > tbody > .chartlist-row"
  );

  const songsUL = document.body.querySelector(".songs-list");

  songs.forEach((el) => {
    // Pegando os elementos do last.fm
    const songTitle = el.querySelector(".chartlist-name > a").innerText;
    const songArtist = el.querySelector(".chartlist-artist > a").innerText;
    const songImage = el.querySelector(".chartlist-image > a > img")
      ? el.querySelector(".chartlist-image > a > img").src
      : el.querySelector(".chartlist-image > span > img").src;
    const timestamp = el.querySelector(".chartlist-timestamp > span > a")
      ? el.querySelector(".chartlist-timestamp > span > a").innerText.trim()
      : el.querySelector(".chartlist-timestamp > span").innerText.trim();
    // Criando elementos para a página
    const li = document.createElement("li");
    const songInfo = document.createElement("div");

    const titleArtist = document.createElement("div");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");

    const img = document.createElement("img");
    const span = document.createElement("span");
    const span2 = document.createElement("span");

    songInfo.className = "song-info";
    titleArtist.className = "title-artist";

    // Colocando as infos das músicas nos elementos

    h2.innerText = songTitle;
    p.innerText = songArtist;
    img.src = songImage;
    console.log(timestamp);
    span.innerText =
      timestamp === "Em scrobble no momento" ? "Escutando agora..." : timestamp;
    span2.innerText =
      timestamp === "Em scrobble no momento" ? "Escutando agora..." : timestamp;

    // Append em cada elemento
    songsUL.appendChild(li);
    li.appendChild(songInfo);
    songInfo.appendChild(img);
    songInfo.appendChild(titleArtist);
    titleArtist.appendChild(h2);
    titleArtist.appendChild(p);
    titleArtist.appendChild(span);
    li.append(span2);

    if (timestamp === "Em scrobble no momento") {
      li.style.backgroundColor = "rgb(174, 39, 255, 0.07)";
      span.style.color = "#c662ff";
      span.style.fontWeight = "600";
      span2.style.color = "#c662ff";
      span2.style.fontWeight = "600";
    }
  });
  const loadingP = document.querySelector("#loading");
  loadingP.style.display = "none";

  const btnMostrar = document.querySelector("#mostrar-btn");
  btnMostrar.style.display = "block";
}

async function fetchWebsite() {
  const btnMostrar = document.querySelector("#mostrar-btn");
  btnMostrar.style.display = "none";

  const songsUL = document.querySelector(".songs-list");
  const loadingP = document.querySelector("#loading");
  songsUL.innerHTML = "";
  loadingP.style.display = "block";
  loadingP.innerHTML = "Carregando...";
  fetch("https://corsproxy.io/?url=https://www.last.fm/pt/user/scryptrg")
    .then((res) => {
      if (res.status != 200) throw new Error("Problemas no servidor");
      return res.text();
    })
    .then((text) => {
      let d = new DOMParser();
      let doc = d.parseFromString(text, "text/html");
      extrairMusicas(doc);
    })
    .catch((err) => {
      songsUL.innerHTML = "Ocorreu algum erro.";
    });
}

function main() {
  const btnMostrar = document.querySelector("#mostrar-btn");

  btnMostrar.addEventListener("click", fetchWebsite);
}

window.onload = main;
