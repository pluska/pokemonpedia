import Pokemon from "./Pokemon.mjs";
import { renderWithTemplate } from "./utils.mjs";

const winnerAnnouncement = (player) => `
<h2>${player.name} is the winner!</h2>
<img src="${player.image}" alt="${player.name}">
<p>Search for another pokemon to battle</p>
`

const battleTemplate = (player, enemy) => `
<div class="card">
  <div class="card-header">
  <h2>${player.name}</h2>
  <img src="${player.image}" alt="${player.name}">
  </div>
  <div class="card-body">
    <p>HP: ${player.stats[0].base_stat}</p>
    <p>Attack: ${player.stats[1].base_stat}</p>
    <p>Defense: ${player.stats[2].base_stat}</p>
    <p>Speed: ${player.stats[5].base_stat}</p>
  </div>
</div>
<div>
  <h2>VS</h2>
  <button id="fight-button">Fight</button>
</div>
<div class="card">
  <div class="card-header">
  <h2>${enemy.name}</h2>
  <img src="${enemy.image}" alt="${enemy.name}">
  </div>
  <div class="card-body">
    <p>HP: ${enemy.stats[0].base_stat}</p>
    <p>Attack: ${enemy.stats[1].base_stat}</p>
    <p>Defense: ${enemy.stats[2].base_stat}</p>
    <p>Speed: ${enemy.stats[5].base_stat}</p>
  </div>
</div>
`

const opponent = new Pokemon();

export default class Battle {
  constructor(pokemon) {
    this.player = pokemon;
    this.opponent = new Pokemon();
  }

  async init() {
    const data = await opponent.searchPokemonById(Math.floor(Math.random() * 248) + 1);
    if (data === "Pokemon not found") {
      this.init();
    }
    this.opponent = new Pokemon(data.name);
    this.opponent.image = data.sprites.other.dream_world.front_default;
    this.opponent.height = data.height;
    this.opponent.weight = data.weight;
    this.opponent.type = data.types[0].type.name;
    this.opponent.abilities = data.abilities;
    this.opponent.stats = data.stats;
  }

  renderBattle(parentElement) {
    renderWithTemplate(battleTemplate(this.player, this.opponent), parentElement)
  }

  fight() {
    while (this.player.health > 0 && this.opponent.health > 0) {
      this.player.attack(this.opponent);
      if (this.opponent.health > 0) {
        this.opponent.attack(this.player);
      }
    }
    if (this.player.health > 0) {
      renderWithTemplate(winnerAnnouncement(this.player), document.getElementById("banner"))
    } else {
      renderWithTemplate(winnerAnnouncement(this.opponent), document.getElementById("banner"))
    }
  }
}


