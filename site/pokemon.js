const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
const main = document.querySelector("main")

fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => response.json())
    .then(pokemon => {
        console.log(pokemon)
        const name = `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`;
        const pokemonDetails = document.createElement("div")
        pokemonDetails.classList = "pokemon-details"
        pokemonDetails.innerHTML = `
        <figure>
        <img src="${pokemon.sprites.front_shiny}" alt="${name}" />
        <figcaption>${name}</figcaption>
        </figure>
    
      <h2>Abilities</h2>
        `
        main.append(pokemonDetails)
    })


/* const main = document.querySelector("main");
const spinner = document.querySelector(".spinner")

function addPokemonImage(pokemon) {
    const div = document.createElement("div")
    div.innerHTML = `
        <a href="pokemon.html?pokemon=${pokemon.name}">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"/>
        </a>
    `
    main.append(div)
}

const url = "https://pokeapi.co/api/v2/pokemon/"
fetch(url)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        const urls = parsedResponse.results.map(result => result.url)
        const fetches = urls.map(url => fetch(url).then(response => response.json()))
        return Promise.all(fetches)
    }).then(responses => {
        spinner.classList.add("hidden")
        responses.forEach(response => {
            addPokemonImage(response)
        })
    })

    document.querySelector("h1").textConent = "Pokemon!" */