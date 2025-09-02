async function init() {
    loadingScreen();
    await pokeData(0, 40)
    renderPokemon(0)
    await fetchAttackList()
    removeLoadingScreen()
    await pokeData(40, 151)
    renderPokemon(40)
}

let pokeListJson = ""
let pokeList = ""
let cards = []
let detailedInfoJson = ""
let attackList = []

let filter = []

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
    await fetchPokemon(pokeListJson, start)
}

async function fetchPokemon(pokeListJson, start) {
    for (let index = start; index < pokeListJson.results.length; index++) {
        let detailedInfoJson = await fetchPokeDetails(index)
        let deepestInfoJson = await fetchDeepestInfoJson()
        let sprite = detailedInfoJson.sprites.other["official-artwork"].front_default
        let name = deepestInfoJson.names["5"].name
        let type = detailedInfoJson.types
        let stats = detailedInfoJson.stats
        cards.push([index, name, sprite, type, stats])
    }
}

async function fetchPokeDetails(index) {
    let detailedInfo = await fetch(pokeListJson.results[index].url);
    detailedInfoJson = await detailedInfo.json();
    return detailedInfoJson
}

async function fetchDeepestInfoJson() {
    let deepestInfo = await fetch(detailedInfoJson.species.url);
    let deepestInfoJson = await deepestInfo.json()
    return deepestInfoJson
}

function renderPokemon(start, filter) {
    let contentRef = document.getElementById("card_content")
    for (i = start; i< cards.length; i++) {
        let index = cards[i][0]
        let name = cards[i][1]
        let sprite = cards[i][2]
        let type = cards[i][3]
        let stats = cards[i][4]

        if (!filter || filter.includes(type[0].type.name) || filter.includes(type[1]?.type.name)) {
            contentRef.innerHTML += getPokeHTML(index, name, sprite, type, stats)
        }
        else {
            continue
        }

    }
}

function getPokeHTML(index, name, sprite, type, stats) {
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
                    <div class="poke_type_bar">
                        <div class="bar_${type[0].type.name}">${type[0].type.name}</div>
                        <div class="bar_${type[1].type.name}">${type[1].type.name}</div>
                    </div>
                    <div class="poke_sprite_div">
                        <img class="poke_sprite" src="${sprite}" alt="Bild von ${name}">
                    </div>
                    <div class="poke_stats_window">
                        <table>
                            <tr>
                                <td class="tr1">HP</td>
                                <td class="tr2"><div class="hp_bar" style="width:${stats[0].base_stat / 2.5}px"></div></td>
                                <td class="tr3">${stats[0].base_stat}</td>
                            </tr>
                            <tr>
                                <td class="tr1">Atk</td>
                                <td class="tr2"><div class="atk_bar" style="width:${stats[1].base_stat / 2.5}px"></div></td>
                                <td class="tr3">${stats[1].base_stat}</td>
                            </tr>
                            <tr>
                                <td class="tr1">Def</td>
                                <td class="tr2"><div class="def_bar" style="width:${stats[2].base_stat / 2.5}px"></div></td>
                                <td class="tr3">${stats[2].base_stat}</td>
                            </tr>
                            <tr>
                                <td class="tr1">S-Atk</td>
                                <td class="tr2"><div class="sp_atk_bar" style="width:${stats[3].base_stat / 2.5}px"></div></td>
                                <td class="tr3">${stats[3].base_stat}</td>
                            </tr>
                            <tr>
                                <td class="tr1">S-Def</td>
                                <td class="tr2"><div class="sp_def_bar" style="width:${stats[4].base_stat / 2.5}px"></div></td>
                                <td class="tr3">${stats[4].base_stat}</td>
                            </tr>
                            <tr>
                                <td class="tr1">Init</td>
                                <td class="tr2"><div class="init_bar" style="width:${stats[5].base_stat / 2.5}px"></div></td>
                                <td class="tr3">${stats[5].base_stat}</td>
                            </tr>
                        </table>
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
                    <div class="poke_type_bar">
                        <div class="bar_${type[0].type.name}">${type[0].type.name}</div>
                    </div>
                    <div class="poke_sprite_div">
                        <img class="poke_sprite" src="${sprite}" alt="Bild von ${name}">
                    </div>
                    <div class="poke_stats_window">
                        <table>
                            <tr>
                                <td class="tr1">HP</td>
                                <td class="tr2"><div class="hp_bar" style="width:${stats[0].base_stat / 2.5}px"></div></td>
                                <td class="tr3">${stats[0].base_stat}</td>
                            </tr>
                            <tr>
                                <td class="tr1">Atk</td>
                                <td class="tr2"><div class="atk_bar" style="width:${stats[1].base_stat / 2.5}px"></div></td>
                                <td class="tr3">${stats[1].base_stat}</td>
                            </tr>
                            <tr>
                                <td class="tr1">Def</td>
                                <td class="tr2"><div class="def_bar" style="width:${stats[2].base_stat / 2.5}px"></div></td>
                                <td class="tr3">${stats[2].base_stat}</td>
                            </tr>
                            <tr>
                                <td class="tr1">S-Atk</td>
                                <td class="tr2"><div class="sp_atk_bar" style="width:${stats[3].base_stat / 2.5}px"></div></td>
                                <td class="tr3">${stats[3].base_stat}</td>
                            </tr>
                            <tr>
                                <td class="tr1">S-Def</td>
                                <td class="tr2"><div class="sp_def_bar" style="width:${stats[4].base_stat / 2.5}px"></div></td>
                                <td class="tr3">${stats[4].base_stat}</td>
                            </tr>
                            <tr>
                                <td class="tr1">Init</td>
                                <td class="tr2"><div class="init_bar" style="width:${stats[5].base_stat / 2.5}px"></div></td>
                                <td class="tr3">${stats[5].base_stat}</td>
                            </tr>
                        </table>
                    </div>   
                </div>
                `    
    }   
}

function toggleFilter(type) {
    status_filter = document.getElementById(`checkbox_${type}`).checked;
    
    
    if (!status_filter) {
        let index = filter.indexOf(type[1].name);
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

async function fetchAttackList() {
    let fetchedAttackList = await fetch(`https://pokeapi.co/api/v2/generation/1`)
    let attackListJson = await fetchedAttackList.json();
    for (let index = 0; index < attackListJson.moves.length; index++) {
        let moveURL = await fetch(attackListJson.moves[index].url)
        let moveURLJson = await moveURL.json()
        let moveName = moveURLJson.names[4].name
        attackList.push(moveName)    
    }
    renderAttackList()
}

function renderAttackList() {
    contentRef = document.getElementById("show_attacks")
    for (let index = 0; index < attackList.length; index++) {
        let currentAttack = attackList[index];
        contentRef.innerHTML += `<p>${currentAttack}</p>`
    }
}
