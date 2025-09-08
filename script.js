async function init() {
    loadingScreen();
    await pokeData(0, 40)
    renderPokemon(0)
    removeLoadingScreen()
}

let pokeListJson = ""
let pokeList = ""
let cards = []
let detailedInfoJson = ""
let flavorTextJson =""
let currentNameSearch = ""
let filter = []

function loadingScreen() {
    let contentRef = document.getElementById("loading_screen");
    contentRef.innerHTML =  ` <img id="loading_ball" src="./assets/icons/favicon_pokedex.png" alt="Drehender Pokeball">   `
}

function removeLoadingScreen() {
    document.getElementById("body").classList.remove("loading")
    document.getElementById("loading_screen").style.display = "none";
}

async function pokeData(offset, limit) {
    let pokeList = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    pokeListJson = await pokeList.json();
    await fetchPokemon(pokeListJson);
}

async function fetchPokemon(pokeListJson) {
    for (let i = 0; i < pokeListJson.results.length; i++) {
        let detailedInfoJson = await fetchPokeDetailsFromUrl(pokeListJson.results[i].url);
        let germanName = await fetchDeepestInfoJson();
        
        let sprite = detailedInfoJson.sprites.other["official-artwork"].front_default;
        let name = germanName.names["5"].name;
        let type = detailedInfoJson.types;
        let pokeCry = detailedInfoJson.cries.latest;
        let stats = detailedInfoJson.stats;
        let size = detailedInfoJson.height;
        let flavor = getGerFlavorText(germanName);
        let germanTypeOne = getGermanType(type[0].type.name);

        if (type.length === 2) {
            let germanTypeTwo = getGermanType(type[1].type.name);
            cards.push([cards.length, name, sprite, type, stats, size, flavor, pokeCry, germanTypeOne, germanTypeTwo]);
        } else {
            cards.push([cards.length, name, sprite, type, stats, size, flavor, pokeCry, germanTypeOne]);
        }
    }
}

function getGermanType(type) {
    if (type == "normal" || type == "fairy") {
        return "Normal"
    }
    else if (type == "fire") {
        return "Feuer"
    }
    else if (type == "water") {
        return "Wasser"
    }
    else if (type == "grass") {
        return "Pflanze"
    }
    else if (type == "electric") {
        return "Elektro"
    }
    else if (type == "ice") {
        return "Eis"
    }
    else if (type == "fighting") {
        return "Kampf"
    }
    else if (type == "poison") {
        return "Gift"
    }
    else if (type == "ground") {
        return "Boden"
    }
    else if (type == "flying") {
        return "Flug"
    }
    else if (type == "psychic") {
        return "Psycho"
    }
    else if (type == "bug") {
        return "Käfer"
    }
    else if (type == "rock") {
        return "Gestein"
    }
    else if (type == "ghost") {
        return "Geist"
    }
    else if (type == "dragon") {
        return "Drache"
    }
    else if (type == "steel") {
        return "Elektro"
    }

}

async function fetchPokeDetailsFromUrl(url) {
    let detailedInfo = await fetch(url);
    detailedInfoJson = await detailedInfo.json();
    return detailedInfoJson;
}

async function fetchDeepestInfoJson() {
    let deepestInfo = await fetch(detailedInfoJson.species.url);
    let germanName = await deepestInfo.json()
    return germanName
}

function renderPokemon(start) {
    let contentRef = document.getElementById("card_content")
    for (let i = start; i< cards.length; i++) {
        let index = cards[i][0]
        let name = cards[i][1]
        if (name.toLowerCase().includes(currentNameSearch.toLowerCase()) || currentNameSearch == "") {
            let sprite = cards[i][2]
            let pokeCry = cards[i][7]
            let type = cards[i][3]
            if (!filter || filter.length === 0 || filter.includes(type[0].type.name) || filter.includes(type[1]?.type.name)) {
                let stats = cards[i][4]
                let type1 = cards[i][8]
                if (cards[i].length == 7) {
                    let size = cards[i][5]
                    size = determinSpriteSize(size)
                    contentRef.innerHTML += getPokeHTML(index, name, sprite, type, stats, size, type1,)
                }
                else {
                    let type2 = cards[i][9]
                    let size = cards[i][5]
                    size = determinSpriteSize(size)
                    contentRef.innerHTML += getPokeHTML(index, name, sprite, type, stats, size, type1, type2)
                }
            }
            else {
                continue
            }
        }
        else {
            continue
        }
    }
}

function nameFilter() {
    if (document.documentElement.clientWidth > 1275) {
        currentNameSearch = document.getElementById("name_filter").value
    }
    else {
        currentNameSearch = document.getElementById("name_filter_responsive").value
    }
    document.getElementById("card_content").innerHTML = ""
    renderPokemon(0, filter)
}

function determinSpriteSize(size) {
    if (size <= 5) {
        return size = "sprite_size_small";
    }
    else if (size > 5 && size <= 13) {
        return size = "sprite_size_medium";
    }
    else {
        return size = "sprite_size_big"
    }
}

function toggleFilter(type) {

    if (document.documentElement.clientWidth > 1275) {
        status_filter = document.getElementById(`checkbox_${type}`).checked;
    }
    else {
        status_filter = document.getElementById(`checkbox_${type}_responsive`).checked;
    }
    
    if (!status_filter) {
        let index = filter.indexOf(type);
        filter.splice(index, 1)
        document.getElementById("card_content").innerHTML = ""
        renderPokemon(0)
    }
    else {
        filter.push(type)
        document.getElementById("card_content").innerHTML = ""
        renderPokemon(0, filter)
    }
}

function toggleOverlay(element) {
    contentRef = document.getElementById("overlay")
    contentRef.classList.toggle("d_none")
    document.getElementById("body").classList.toggle("loading")
    if (!contentRef.classList.contains("d_none")) {        
        index = element.id.slice(5);
        renderOverlayWindow(index)
    }
}

function renderOverlayWindow(index) {
    if (index == -1) {
        index = cards.length -1
    }
    if (index > cards.length-1) {
        index = 0
    }
    contentRef = document.getElementById("overlay_window")
    contentRef.innerHTML = ""
        let indexNumber = cards[index][0]
        let name = cards[index][1]
        let sprite = cards[index][2]
        let type = cards[index][3][0].type.name
        let stats = cards[index][4]
        let flavor = cards[index][6]
    contentRef.innerHTML += getOverlayWindowHTML(indexNumber, name, sprite, type, stats, flavor)
}

function getGerFlavorText(germanName) {
    for (i = 0; i < germanName.flavor_text_entries.length; i++) {
        if (germanName.flavor_text_entries[i].language.name == "de") {
            return germanName.flavor_text_entries[i].flavor_text
        }
    }
}

function toggleFilterMenu() {
    document.getElementById("responsive_filter_div").classList.toggle("d_none")
}

function playCry(indexNumber) {
    let audio = document.getElementById(`cry_${indexNumber}`);
    audio.currentTime = 0;
    audio.play();
}

async function loadMore() {
    let start = cards.length;
    let amount = 20;
    await pokeData(start, amount);
    renderPokemon(start);
}