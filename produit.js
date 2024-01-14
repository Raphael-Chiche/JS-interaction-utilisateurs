// print moi du localstorage le produit avec l'id qui est associé id-pokemon

const idPokemon = localStorage.getItem("id-pokemon");
const contentPokemon = document.querySelector(".content-pokemon");
const tabType = [
  ["normal", "#A8A77A"],
  ["fire", "#EE8130"],
  ["water", "#6390F0"],
  ["electric", "#F7D02C"],
  ["grass", "#7AC74C"],
  ["ice", "#96D9D6"],
  ["fighting", "#C22E28"],
  ["poison", "#A33EA1"],
  ["ground", "#E2BF65"],
  ["flying", "#A98FF3"],
  ["psychic", "#F95587"],
  ["bug", "#A6B91A"],
  ["rock", "#B6A136"],
  ["ghost", "#735797"],
  ["dragon", "#6F35FC"],
  ["dark", "#705746"],
  ["steel", "#B7B7CE"],
  ["fairy", "#D685AD"],
];
fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
  .then((response) => response.json())
  .catch((error) => {
    console.log(error);
  })
  .then((data) => {
    const pokemon = document.createElement("div");
    pokemon.classList.add("content-pokemon");
    const name = data.name;
    const id = data.id.toString().padStart(3, "0");
    const img = data.sprites.other.dream_world.front_default
      ? data.sprites.other.dream_world.front_default
      : data.sprites.front_default;
    const types = data.types.map((type) => type.type.name);
    const taille = data.height;
    const talent = data.abilities.map((ability) => ability.ability.name);
    const poids = data.weight;
    const poidsVirgule =
      poids.toString().slice(0, -1) + "," + poids.toString().slice(-1);

    const typeNumber1 = data.types[0].type.name;
    let bgColor = "";
    for (var i = 0; i < tabType.length; i++) {
      if (typeNumber1 == tabType[i][0]) {
        bgColor = tabType[i][1]; // Store the background color
      }
    }

    let shinyFront = data.sprites.other.showdown.front_shiny
      ? `<img src="${data.sprites.other.showdown.front_shiny}" alt="">`
      : "";
    let shinyBack = data.sprites.other.showdown.back_shiny
      ? `<img src="${data.sprites.other.showdown.back_shiny}" alt="">`
      : "";
    let frontDefault = data.sprites.other.showdown.front_default
      ? `<img src="${data.sprites.other.showdown.front_default}" alt="">`
      : "";
    let backDefault = data.sprites.other.showdown.back_default
      ? `<img src="${data.sprites.other.showdown.back_default}" alt="">`
      : "";
    const pokemonInnerHTML = `
        <div class="title-container">
        <h1 class="title">Fiche du Pokémon</h1>
        <h2 class="name">${name}</h2>
        </div>
        <div class="poke-container">
          <div class="pokeInfoImg" style="background-color:${bgColor};">
            <div class="pokeImg">
              <img src="${img}" alt="" />
            </div>
            <div class="pokeInfo">
              <div class="pokeInfoMain"> 
                <p class="pokeInfoName">Nom : ${name}</p>
                <p class="pokeInfoId" data-pokemonselect="${data.id}">Id du Pokémon : ${id}</p>
                <p class="pokeInfoHeight">Taille : ${taille}0cm</p>
                <p class="pokeInfoweight">Poids : ${poids} dg ou ${poidsVirgule}Kg</p>
                <p class="pokeInfoTalent">Talent : ${talent}</p>
                <p class="pokeInfoType">Type : ${types}</p>
              </div>
              <button class="pokeInfoButton">Ajouter au panier</button>
              <button class="pokePanier"><a href="panier.html">Voir le panier</a></button>
              <button class="pokeIndex"><a href="index.html">Retour à l'accueil</a></button>
            </div>
          </div>
          <div class="pokeInfoSprite">
            <div class="sprite">
              ${frontDefault}
              ${backDefault}
              ${shinyFront}
              ${shinyBack}
            </div>
            <div class="infoStats">
              <p class="pokeInfoStatsTitle">Statistiques :</p>
              <p class="pokeInfoStats">PV : ${data.stats[0].base_stat}</p>
              <p class="pokeInfoStats">Attaque : ${data.stats[1].base_stat}</p>
              <p class="pokeInfoStats">Défense : ${data.stats[2].base_stat}</p>
              <p class="pokeInfoStats">Attaque Spé : ${data.stats[3].base_stat}</p>
              <p class="pokeInfoStats">Défense Spé : ${data.stats[4].base_stat}</p>
              <p class="pokeInfoStats">Vitesse : ${data.stats[5].base_stat}</p>
            </div>
          </div>
          <div class="description">
          </div>
        </div>
      `;
    pokemon.innerHTML = pokemonInnerHTML;
    contentPokemon.appendChild(pokemon);
  });


window.addEventListener("load", () => {
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${idPokemon}`)
  .then((response) => response.json())
  .catch((error) => {
    console.log(error);
  })
  .then((data) => {
    let description = "";
    for (let i = 0; i < data.flavor_text_entries.length; i++) {
      if (data.flavor_text_entries[i].language.name === "fr") {
        description = data.flavor_text_entries[i].flavor_text;
        break;
      }
    }
    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("pokeInfoDescription");
    descriptionElement.innerHTML = `Description : <br> ${description}`;
    document.querySelector(".description").appendChild(descriptionElement);
  });

  let pokemonArray = JSON.parse(localStorage.getItem("pokemon")) || [];

  document.querySelector(".pokeInfoButton").addEventListener("click", () => {
    const pokemonId = document
      .querySelector(".pokeInfoId")
      .getAttribute("data-pokemonselect");
    const pokemonData = {
      id: pokemonId,
    };
    pokemonArray.push(pokemonData);
    localStorage.setItem("pokemon", JSON.stringify(pokemonArray));
  });

  const buttonPanier = document.querySelector(".pokeInfoButton");

  buttonPanier.addEventListener("click", () => {
    buttonPanier.classList.add("tada");
    buttonPanier.addEventListener("animationend", () => {
      buttonPanier.classList.remove("tada");
    });
  });

  
});
