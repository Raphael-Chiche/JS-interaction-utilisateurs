// Fait un boucle de 1 à 1025 qui ajoute 1 a chaque fois a une variable compteur
// 1025
var compteur = 1;
const content = document.querySelector(".content");
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
// Get the Pokemon array from localStorage
let pokemonArray = JSON.parse(localStorage.getItem('pokemon')) || [];
const panier = document.querySelector(".panier-content");
// Loop through the Pokemon array
pokemonArray.forEach((pokemonData, index) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonData.id}`)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error);
        })
        .then((data) => {
            const pokemon = document.createElement("div");
            pokemon.classList.add("card");
            const name = data.name;
            const id = data.id.toString().padStart(3, "0");
            const img = data.sprites.front_default;
            const typeNumber1 = data.types[0].type.name;
            let bgColor = '';
            for (var i = 0; i < tabType.length; i++) {
                if (typeNumber1 == tabType[i][0]) {
                    bgColor = tabType[i][1]; // Store the background color
                }
            }

            const pokemonInnerHTML = `
                                <div class="img-container">
                                        <img src="${img}" alt="${name}" />
                                </div>
                                <div class="info" style="background-color:${bgColor}">
                                        <h3 class="name">${name}</h3>
                                        <span class="number" data-idPokemon=${data.id}>Numéro :#${id}</span>
                                        <button class="delete">Supprimer du panier</button>
                                </div>
                        `;
            pokemon.innerHTML = pokemonInnerHTML;
            panier.appendChild(pokemon);

            pokemon.querySelector(".delete").addEventListener("click", () => {
                pokemonArray.splice(index, 1);
                localStorage.setItem("pokemon", JSON.stringify(pokemonArray));
                panier.removeChild(pokemon);
            });

            
        });
});
