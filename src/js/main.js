import Pokemon from "./Pokemon.mjs";
import { loadHeader } from "./utils.mjs";

loadHeader();

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const pokemonContainer = document.getElementById("pokemon");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = searchInput.value.trim();
  if (name) {
    const pokemon = new Pokemon(name);
    if (await pokemon.init()) {
      pokemon.renderTemplate(pokemonContainer);
    } else {
      pokemon.renderError(pokemonContainer);
    }
  }
});
