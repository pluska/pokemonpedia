import Battle from "./BattleProcess.mjs";
import Pokemon from "./Pokemon.mjs";
import { loadHeader } from "./utils.mjs";

loadHeader();

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const pokemonContainer = document.getElementById("pokemon-battle");

searchForm.addEventListener("submit", async (event) => {
  event.stopPropagation();
  event.preventDefault();
  const name = searchInput.value.trim();
  if (name) {
    const pokemon = new Pokemon(name);
    const battle = new Battle(pokemon);
    await battle.init();
    if (await pokemon.init()) {
      battle.renderBattle(pokemonContainer);
      const fightButton = document.getElementById("fight-button");
      fightButton.addEventListener("click", () => {
        battle.fight();
      });
    } else {
      pokemon.renderError(pokemonContainer);
    }
  }
})

