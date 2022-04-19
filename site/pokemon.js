const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
const main = document.querySelector("main")

fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => response.json())
    .then(pokemon => {
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
        const abilitiesRequests = pokemon.abilities
            .map(response => response.ability.url)
            .map(url => {
                return fetch(url).then(response => response.json())
            })
        return Promise.all(abilitiesRequests)
    }).then(listOfAbilities => {
        const ul = document.createElement("ul")
        ul.classList = "abilities"
        main.append(ul)
        listOfAbilities.map(ability => {
            const li = document.createElement("li")
            li.innerHTML = `
                <span class="ability-name">${ability.name[0].toUpperCase()}${ability.name.slice(1)}</span>
                <span class="ability-short-description">${ability.effect_entries[1].short_effect}</span>
            `
            return li;
        }).forEach(li => {
            ul.append(li)
        })
        const spinner = document.querySelector(".spinner")
        spinner.classList.add("hidden")
    })
