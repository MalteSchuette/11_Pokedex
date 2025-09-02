
async function init() {
    loadingScreen();
    await pokeData(0, 40)
    removeLoadingScreen()
    await pokeData(40, 151)
}

let pokeListJson = ""
let pokeList = ""
let cards = []

function loadingScreen() {
    let contentRef = document.getElementById("loading_screen");
    contentRef.innerHTML = 
    `
        <img src="./assets/icons/favicon_pokedex.png" alt="">
    `
}

function removeLoadingScreen() {
    document.getElementById("body").classList.remove("loading")
    document.getElementById("loading_screen").style.display = "none";
}

async function pokeData(start, end) {
    let pokeList = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${end}`)
    pokeListJson = await pokeList.json();
    fetchPokemon(pokeListJson, start)
}

async function fetchPokemon(pokeListJson, start) {
    let contentRef = document.getElementById("card_content")
    for (let index = start; index < pokeListJson.results.length; index++) {
        let detailedInfoJson = await fetchPokeDetails(index)
        let deepestInfoJson = await getDeepestInfoJson()
        let sprite = detailedInfoJson.sprites.other["official-artwork"].front_default
        let name = deepestInfoJson.names["5"].name
        let type = detailedInfoJson.types
        
        cards.push([index,name, sprite, type])
        cards.sort()
        // contentRef.innerHTML += renderPokeCards(index, name, sprite, type);
    }
}

async function fetchPokeDetails(index) {
    let detailedInfo = await fetch(pokeListJson.results[index].url);
    detailedInfoJson = await detailedInfo.json();
    return detailedInfoJson
}

async function getDeepestInfoJson() {
    let deepestInfo = await fetch(detailedInfoJson.species.url);
    let deepestInfoJson = await deepestInfo.json()
    return deepestInfoJson
}

function renderPokeCards(index, name, sprite, type) {
    if (type.length == 2) {
        return  `
                <div id="card_${index}" class="poke_card">
                    <h2> #${index +1} - ${name} </h2>
                    <div class="poke_background">
                        <div class="type_background">
                            <div class="type_${type[0].type.name}"> </div>
                            <div class="type_${type[1].type.name}"> </div>
                        </div>
                    </div>
                    <div class="poke_sprite_div">
                        <img class="poke_sprite" src="${sprite}" alt="Bild von ${name}">
                    </div>
                </div>
                `
    }
    else {
        return `
                <div id="card_${index}" class="poke_card">
                    <h2> #${index +1} - ${name} </h2>
                    <div class="poke_background">
                        <div class="type_background">
                            <div class="type_${type[0].type.name}"> </div>
                            <div class="type_${type[0].type.name}"> </div>
                        </div>
                    </div>
                    <div class="poke_sprite_div">
                        <img class="poke_sprite" src="${sprite}" alt="Bild von ${name}">
                    </div>
                </div>
                `    
    }   
}

