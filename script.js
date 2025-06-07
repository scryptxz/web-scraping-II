function extractSongs(doc) {
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
      timestamp === "Em scrobble no momento"
        ? "Escutando agora..."
        : timestamp
    span2.innerText =
      timestamp === "Em scrobble no momento"
        ? "Escutando agora..."
        : timestamp

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
      li.style.backgroundColor = "rgb(174, 39, 255, 0.07)"
      span.style.color = "#c662ff"
      span.style.fontWeight = "600"
      span2.style.color = "#c662ff"
      span2.style.fontWeight = "600"
    }
  });
  const loadingP = document.querySelector("#loading");
  loadingP.style.display = "none"
  songsUL.style.display = "flex"
}

async function fetchWebsite() {
  const songsUL = document.querySelector(".songs-list");
  const loadingP = document.querySelector("#loading");
  songsUL.style.display = "none"
  loadingP.style.display = "block"
  loadingP.innerHTML = "Carregando...";
  const dom = new DOMParser();
  try {
    const lastFmFetch = await fetch(
      "https://corsproxy.io/?url=https://www.last.fm/pt/user/scryptrg"
    );
    const lastFmText = await lastFmFetch.text();
    const lastFmDOM = dom.parseFromString(lastFmText, "text/html");
    extractSongs(lastFmDOM);
  } catch (error) {
    songsUL.innerHTML = "Ocorreu algum erro.";
    console.error(error);
  }
}

function main() {
  const btnMostrar = document.querySelector("#mostrar-btn");

  btnMostrar.addEventListener("click", fetchWebsite);
}

window.onload = main;
