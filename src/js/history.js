import { loadHeader } from "./utils.mjs";

loadHeader();

const historyContainer = document.getElementById("pokemon-history");

const history = localStorage.getItem("history");

if (history) {
  const historyArray = JSON.parse(history);
  let historyCard = document.createElement("div");
  historyCard.classList.add("card");
  historyCard.innerHTML = `
    <div class="card-header">
      <h3>History</h3>
    </div>
    <div class="card-body">
      ${historyArray
        .map((historyItem) => `<p>${historyItem}</p>`)
        .join("")}
    </div>
  `;
  historyContainer.appendChild(historyCard);
} else {
  historyContainer.innerHTML = "<p>You haven't played any games yet. Go to the battle page and play a game! <a href='/battle/index.html'>Battle</a></p>";
}
