const menu = document.querySelector("#category");
const btnBack = document.querySelector("#Back");
const btnSiguiente = document.querySelector("#siguiente");

let offset = 0; // Inicializamos el offset en 0
const limit = 10;
let pokemones = [];
let pokemonesInfo = [];
var number = offset + 1;


const urlPoke = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10";

async function fetchData() {
  try {
    const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then(response => response.json());

    const pokeInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
      .then(response => response.json());

    console.log("Pokemon:", pokeData);
    pokemones = pokeData.results;

    console.log("PokemonInfo:", pokeInfo);
    pokemonesInfo = pokeInfo.results;

    const contenedor = document.getElementById("pokemones-contenedor");
    contenedor.innerHTML = "";

    for (const pok of pokemones) {
      const pokBloq = crearBloquePokemones(pok, number);
      contenedor.appendChild(pokBloq);
      number++;
    }
  } catch (error) {
    console.log("Error al obtener los datos:", error);
  }
}

function ShowMore() {

  fetchData();
  
}


function crearBloquePokemones(pokem, number) {
  const prodContenedor = document.createElement("article");
  const pokeImg = document.createElement("img");
  const pokeName = document.createElement("header");
  const numPoke = document.createElement("p");
  const btnMore = document.createElement("button");
  btnMore.className = "btnShop";

  prodContenedor.className = "producto-item";
  pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
  pokeName.textContent = pokem.name;
  btnMore.textContent = "Ver más"
  numPoke.innerHTML = `Nro ${number}`;
  btnSiguiente.onclick = () => { ShowMore() };
  // btnBack.onclick = () => { ShowLess() };

  prodContenedor.appendChild(pokeImg);
  prodContenedor.appendChild(numPoke);
  prodContenedor.appendChild(pokeName);
  prodContenedor.appendChild(btnMore);

  return prodContenedor;
}


function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

fetchData();