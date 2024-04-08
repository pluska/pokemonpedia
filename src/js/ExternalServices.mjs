export const fetchPokemon = async(name) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return "Pokemon not found";
  }
}

export const fetchPokemonById = async (id) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return "Pokemon not found";
  }
}