const main = document.querySelector("main");
const spinner = document.querySelector(".spinner")

function addPokemonImage(pokemon) {
    const name = `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`;
    const div = document.createElement("div")
    div.innerHTML = `
    <figure>
        <img src="${pokemon.sprites.front_default}" alt="${name}"/>
        <figcaption><a href="pokemon.html?pokemon=${pokemon.id}">${name}</a></figcaption>
    </figure>`
    main.append(div)
}

const url = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=128"
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

document.querySelector("h1").textConent = "Pokemon!"
