import { fetchPokemon, fetchPokemonById } from "./ExternalServices.mjs";

const cardTemplate = (pokemon) => {
  const template = `
  <div class="card">
  <div class="card-header">
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.image}" alt="${pokemon.name}">
  </div>
  <div class="card-body">
    <p>Height: ${pokemon.height}</p>
    <p>Weight: ${pokemon.weight}</p>
    <p class="type">Type: ${pokemon.type}</p>
    <p class="abilities">Abilities: ${pokemon.abilities.map((ability) => ability.ability.name).join(", ")}</p>
    <div class="stats">
      <h3>Stats:</h3>
      <ul>
      ${pokemon.stats.map((stat) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join("")}
      </ul>
    </div>
  </div>
</div>
  `;
  return template;
}



export default class Pokemon {
  constructor(name = "Pikachu") {
    this.name = name;
    this.stats = [];
    this.type = "";
    this.abilities = [];
    this.image = "";
    this.height = "";
    this.weight = "";
    this.description = "";
  }

  async init() {
    const data = await fetchPokemon(this.name);
    if (data === "Pokemon not found") {
      return false;
    }
    this.image = data.sprites.other.dream_world.front_default;
    this.height = data.height;
    this.weight = data.weight;
    this.type = data.types[0].type.name;
    this.abilities = data.abilities;
    this.stats = data.stats;
    return true;
  }

  renderTemplate(parentElement) {
    parentElement.insertAdjacentHTML("afterbegin", cardTemplate(this));
  }

  renderError(parentElement) {
    parentElement.innerHTML = "<h2>Sorry, we couldn't find that pokemon</h2>";
  }

  async searchPokemonById(id) {
    const data = await fetchPokemonById(id);
    if (data === "Pokemon not found") {
      this.searchPokemonById(Math.floor(Math.random() * 248) + 1);
    }
    return data;
  }

}