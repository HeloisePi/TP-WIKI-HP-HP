const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let main = document.querySelector("main");


async function loadChara() {
  try {
    const reponse = await fetch("https://hp-api.onrender.com/api/character/" + id);

    if (!reponse.ok) {
      throw new Error("Erreur HTTP : " + reponse.status);
    }

    const data = await reponse.json();
    console.log("data", data);
    showChara(data[0]);
  } catch (erreur) {
    console.error("Problème avec l'API :", erreur);
  }
}

function showChara(chara) {
    let section = document.createElement("section")

    section.innerHTML= `
    <section>
      <h3>${chara.name}</h3>
      <div class="perso">
        <figure class="perso__left">
          <img src="${chara.image}" alt="${chara.name}" class="${chara.alive ? "" : "dead"}" />
          <figcaption>${chara.actor}</figcaption>
        </figure>
        <div class="perso__right">
          <div>
            <p>Gender</p>
            <p class="bold">${chara.gender || "Unknown"}</p>
          </div>
          <div>
            <p>Eye</p>
            <p class="bold">${chara.eyeColour || "Unknown"}</p>
          </div>
          <div>
            <p>Hair</p>
            <p class="bold">${chara.hairColour || "Unknown"}</p>
          </div>
          <div>
            <p>Date of birth</p>
            <p class="bold">${chara.dateOfBirth || "Unknown"}</p>
          </div>
          <div>
            <p>Patronus</p>
            <p class="bold">${chara.patronus || "Unknown"}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="house__perso">
      <img src="./asset/house/${chara.house}.png" alt="${chara.house}" />
    </section>`


      main.appendChild(section)
}

if (id) {
  loadChara();
} else {
  console.error("Aucun id dans l'URL");
}