// Fetch
//
// POST

const BASE_URL = `https://pokeapi.co/api/v2/pokemon`;


// Fetch no async
/*
fetch(BASE_URL + 'pokemon/ditto')
    .then(res => res.json())
    .then(data => console.log(data));
*/
// fetch async


const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}

// Obtener pokemon

document.getElementById('get-btn')
    .addEventListener('click', async () => {
        const text = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemon(text);
        localStorage.setItem('currentPokeId', pokemon.id);
        console.log(pokemon.name);
    })

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    console.log(pokemon.name);
})

// obtener el anterior
let currentPokeId = 1;

const search = () => {
    const nameInput = document.querySelector("#pokemon-name");

    loadPokemon(nameInput.value);
}

const loadPrevious = () => {
    if (currentPokeId < 1) {
        currentPokeId = 1000
    }

    loadPokemon(--currentPokeId);
};
//
//
// obtener el siguiente
const loadNext = () => {
    if (currentPokeId >= 1000) {
        currentPokeId = 1
    }


    loadPokemon(++currentPokeId);
};

const loadPokemon = (name = "") => {
    let url = BASE_URL;

    if (name.length > 0) {
        url = `${url}/${name}`
    } else {
        url = `${url}/${currentPokeId}`
    }

    fetch(url)
        .then(res => res.json())
        .then(json => {
            currentPokeId = json.id;
            document.querySelector("#pfp").src = json.sprites.front_default;
            document.querySelector("#poke-name").textContent = json.name;
        });
}

document.getElementById('previous-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = Math.max(1, currentPokeId - 1);
        const pokemon = await fetchPokemon(newId);
        console.log(pokemon.name);
    })

document.getElementById('next-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = currentPokeId + 1;
        const pokemon = await fetchPokemon(newId);
        console.log(pokemon);
    })


// function createPoke(poke) {

//     document.getElementById('poke-name').textContent = poke.name;
// }

// createPoke(poke);

// const CARD_SECTION = document.getElementById('poke-name');

// const createCard = () => {
//     const card = document.createElement('div');
//     card.classList.add('pfp', 'poke-name');
//     return card;
// }

// const createDescription = () => {
//     const pokeElements = {
//         poke_name: document.createElement('h2'),

//     }
//     return pokeElements;
// }

// const populateElements = (poke, pokeElements) => {
//     pokeElements.poke_name.textContent = poke.poke_name;

// }

// const renderElements = (card, elements) => {
//     card.append(elements.poke_name,
//         elements.pfp,
//         )
// }
////////////////// POST
//

// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: JSON.stringify({
//         title: 'title1',
//         body: 'Lorem ipsum dolor sit amet',
//         userId: 1,
//     }),
//     headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//     }
// }).then(res => res.json())
//     .then(json => console.log(json))


/////////////////// EJERCICIOS
//- Arreglar el pokemon en localStorage
// - Manipular el DOM y agregar una tarjeta del pokemon.
// - El tamaño e info de la tarjeta es a consideración personal.
// - La tarjeta debe mantenerse en la pantalla.
// - La info -> LocalStorage -> Fetch
