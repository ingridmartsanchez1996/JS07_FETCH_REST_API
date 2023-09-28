/////////////////// EJERCICIOS
// - Arreglar el pokemon en localStorage
// - Manipular el DOM y agregar una tarjeta del pokemon.
// - El tamaño e info de la tarjeta es a consideración personal.
// - La tarjeta debe mantenerse en la pantalla.
// - La info -> LocalStorage -> Fetch

const BASE_URL = 'https://pokeapi.co/api/v2/';


const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}

const upsertPokemonCard = (pokeData) => {
    // Get a reference to the div element
    let pokeCardElement = document.getElementById("poke-card");
    pokeCardElement.classList.remove('container','poke-card');
    pokeCardElement.classList.add('container','poke-card');

    let cardPokeNameElement = document.getElementById('card-poke-name');
    let cardPokeIDElement = document.getElementById('card-poke-id');
    let cardPokeWeightElement = document.getElementById('card-poke-weight');
    cardPokeNameElement.textContent = `Name: ${pokeData.name}`
    cardPokeIDElement.textContent = `Id: ${pokeData.id}` 
    cardPokeWeightElement.textContent = `Weight: ${pokeData.weight}` 
}

// Obtener pokemon
document.getElementById('get-btn')
    .addEventListener('click', async () => {
        let pokeIdOrName = document.getElementById('poke-name').value.toLowerCase();
        pokeIdOrName = pokeIdOrName !== "" ? pokeIdOrName : 1;
        const pokemon = await fetchPokemon(pokeIdOrName);
        localStorage.setItem('currentPokeId', pokemon.id);
        upsertPokemonCard(pokemon);
    })

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');
    if(storedId){
        const initialId = storedId;
        const pokemon = await fetchPokemon(initialId);
        upsertPokemonCard(pokemon);
    }
})

// Obtener el anterior

document.getElementById('previous-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = Math.max(1, currentPokeId -1);
        const pokemon = await fetchPokemon(newId);
        localStorage.setItem('currentPokeId', newId);
        upsertPokemonCard(pokemon);
    })

// Obtener el siguiente

document.getElementById('next-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = currentPokeId + 1;
        const pokemon = await fetchPokemon(newId);
        localStorage.setItem('currentPokeId', newId);
        upsertPokemonCard(pokemon);
    })
