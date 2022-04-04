const app = document.querySelector("main");
const ul = document.createElement("ul");
app.append(ul);

fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
    .then((response) => response.json())
    .then((response) => {
        const pokemonList = response.results;
        const httpRequests = pokemonList
            .map(pokemon => pokemon.url)
            .map(url => {
                return fetch(url).then(response => response.json())
            })

        return Promise.all(httpRequests)
    }).then(responses => {
        responses.map(response => {
            const li = document.createElement("li")
            const img = document.createElement("img")
            img.src = response.sprites.front_default
            li.append(img)
            return li
        }).forEach(li => {
            ul.append(li)
        })
    })