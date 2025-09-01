
async function init() {
    loadingScreen();
    await firstPokeData()
}

let pokeList = ""
let detailedInfoJson = ""
let deepestInfoJson = ""

function loadingScreen() {
    let contentRef = document.getElementById("card_content");
    contentRef.innerHTML = 
    `
        <div id="loading_screen">
            <img src="./assets/icons/favicon_pokedex.png" alt="">
        </div>
    `
}

async function firstPokeData() {
    let firstFourty = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=40")
    pokeList = await firstFourty.json();
    let contentRef = document.getElementById("card_content")
    contentRef.innerHTML = "";
    for (let index = 0; index < pokeList.results.length; index++) {
        let detailedInfoJson = await fetchPokeDetails(index)
        let deepestInfoJson = await getDeepestInfoJson()
        let sprite = detailedInfoJson.sprites.other["official-artwork"].front_default
        let name = deepestInfoJson.names["5"].name
        let type = detailedInfoJson.types
        contentRef.innerHTML += renderPokeCards(index, name, sprite, type);
    }
}

async function fetchPokeDetails(index) {
    let detailedInfo = await fetch(pokeList.results[index].url);
    detailedInfoJson = await detailedInfo.json();
    return detailedInfoJson
}

async function getDeepestInfoJson() {
    let deepestInfo = await fetch(detailedInfoJson.species.url);
    deepestInfoJson = await deepestInfo.json()
    return deepestInfoJson
}

function renderPokeCards(index, name, sprite, type) {
    if (type.length == 2) {
        return  `
                <div id="card_${index}" class="poke_card">
                    <h2> ${name} </h2>
                    <div class="poke_background">
                        <div class="type_background">
                            <div class="type_${detailedInfoJson.types[0].type.name}"> </div>
                            <div class="type_${detailedInfoJson.types[1].type.name}"> </div>
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
                    <h2> ${name} </h2>
                    <div class="poke_background">
                        <div class="type_background">
                            <div class="type_${detailedInfoJson.types[0].type.name}"> </div>
                            <div class="type_${detailedInfoJson.types[0].type.name}"> </div>
                        </div>
                    </div>
                    <div class="poke_sprite_div">
                        <img class="poke_sprite" src="${sprite}" alt="Bild von ${name}">
                    </div>
                </div>
                `    
    }   
}

