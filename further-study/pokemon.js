async function getPokemon () {
  let id = Math.floor(Math.random() * numPoke);
  let mainResult;


  while (!mainResult) {
    try {
      mainResult = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    } catch (e) {
      id = Math.floor(Math.random() * numPoke);
    }
  }
  
  
  let image = mainResult.data.sprites.front_default;
  let name = mainResult.data.name;
  let speciesResult;

  try {
    speciesResult = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}/`);
  } catch (e) {
    speciesResult = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${mainResult.data.species.name}/`);
  }
  
  let description;

  for (let result of speciesResult.data.flavor_text_entries) {
    if (result.language.name === "en") {
      description = result.flavor_text;
      break;
    }
  }
  
  pokemon[name] = {image, name, description};

  displayPokemon(name);
}

function displayPokemon(name) {
  $("#poke-gallery").append($(`<div class="poke-card">
                                <p><b>${pokemon[name].name}</b></p>
                                <img src="${pokemon[name].image}">
                                <p>${pokemon[name].description}</p>
                              </div>`));
}

let numPoke;
let pokemon = {};

$(async function start() {
  numPoke = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=2000");
  numPoke = numPoke.data.results.length;
});

$("#get-poke").on("click", getPokemon);