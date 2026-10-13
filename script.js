let section = document.querySelector(".sectionChara")
let divChara = document.querySelectorAll(".characters div")
let characters = document.querySelector(".characters")

let selectGryffindor = document.querySelector(".selectGryffindor")
let selectHufflepuff = document.querySelector(".selectHufflepuff")
let selectRavenclaw = document.querySelector(".selectRavenclaw")
let selectSlytherin = document.querySelector(".selectSlytherin")

selectGryffindor.addEventListener("click", () => loadData("Gryffindor"));
selectHufflepuff.addEventListener("click", () => loadData("Hufflepuff"));
selectRavenclaw.addEventListener("click", () => loadData("Ravenclaw"));
selectSlytherin.addEventListener("click", () => loadData("Slytherin"));


async function loadData(house) {

  let url = "https://hp-api.onrender.com/api/characters";
    if (house) {
      url += "/house/" + house;
    }

  try {
        const reponse = await fetch(url);
    if (!reponse.ok) {
      throw new Error("Erreur HTTP : " + reponse.status);
    }
  
    

    let allChara = await reponse.json();
    console.log("allChara", allChara)
    showChara(allChara)


  } catch (erreur) {
    console.error("Problème avec l'API :", erreur);
  }
}



function showChara(allChara) {
  document.querySelectorAll(".characters div").forEach((div) => 
     div.remove());
   
  allChara.forEach((chara) => {
    if (chara.image == "") return;
  createCardChara(chara);
});
}


function createCardChara(chara) {
  let divChara = document.createElement("div");
  divChara.innerHTML = `
    <div class="${chara.house}">
        <a href="details.html?id=${chara.id}">
            <img src="${chara.image}" alt="${chara.name}">
            <p>${chara.name}</p>
          </a>
    </div>`; 
  characters.appendChild(divChara);
}

loadData("")