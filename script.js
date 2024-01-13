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
for (var i = 1; i <= 1025; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${compteur}`)
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
                                </div>
                        `;
            pokemon.innerHTML = pokemonInnerHTML;
            content.appendChild(pokemon);
            
            pokemon.addEventListener("click", () => {
                console.log(pokemon.querySelector(".number").getAttribute("data-idPokemon"));
                localStorage.setItem("id-pokemon", pokemon.querySelector(".number").getAttribute("data-idPokemon"));
                window.location.href = "produit.html";
            });
        });
        

    compteur++;
}

// window.addEventListener("load", () => {
//     const cards = document.querySelectorAll(".card");
//     cards.forEach((card) => {
//         card.addEventListener("click", () => {
//             console.log(card.querySelector(".number").getAttribute("data-idPokemon"));
//             localStorage.setItem("id-pokemon", card.querySelector(".number").getAttribute("data-idPokemon"));
//             window.location.href = "produit.html";
//         });
//     });
// });