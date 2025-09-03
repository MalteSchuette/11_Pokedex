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
let flavorTextJson =""
let attackList = []
let attackListPoke = []

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
    let pokeList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${end}`)
    pokeListJson = await pokeList.json();
    await fetchPokemon(pokeListJson, start)
}

async function fetchPokemon(pokeListJson, start) {
    for (let index = start; index < pokeListJson.results.length; index++) {
        let detailedInfoJson = await fetchPokeDetails(index)
        let germanName = await fetchDeepestInfoJson(index)
        let flavorText = await fetchFlavortext(index)
        let moves = await fetchMoves()
        let sprite = detailedInfoJson.sprites.other["official-artwork"].front_default
        let name = germanName.names["5"].name
        let type = detailedInfoJson.types
        let stats = detailedInfoJson.stats
        let size = detailedInfoJson.height
        let flavor = flavorTextJson.flavor_text_entries[33].flavor_text
        cards.push([index, name, sprite, type, stats, size, flavor,])
    }
}

async function fetchPokeDetails(index) {
    let detailedInfo = await fetch(pokeListJson.results[index].url);
    detailedInfoJson = await detailedInfo.json();
    return detailedInfoJson
}

async function fetchMoves() {
    for (i = 0; i < detailedInfoJson.moves.length; i++){
    let move = detailedInfoJson.moves[i];
    if (move.version_group_details[0].level_learned_at > 0) {
        let moveFetch = await fetch(move.move.url)
        let moveDetailsJson = await moveFetch.json()
        let moveName = moveDetailsJson.names[4].name
        let moveText = ""
        if (moveDetailsJson.flavor_text_entries[14].flavor_text) {
            moveText = moveDetailsJson.flavor_text_entries[14].flavor_text
        }
        attackListPoke.push({"name": moveName, "flavorText": moveText})
    }
        
}
} 

async function fetchFlavortext() {
    let flavorText = await fetch(detailedInfoJson.species.url);
    flavorTextJson = await flavorText.json();
}

async function fetchDeepestInfoJson() {
    let deepestInfo = await fetch(detailedInfoJson.species.url);
    let germanName = await deepestInfo.json()
    return germanName
}

function renderPokemon(start, filter) {
    let contentRef = document.getElementById("card_content")
    for (i = start; i< cards.length; i++) {
        let index = cards[i][0]
        let name = cards[i][1]
        let sprite = cards[i][2]
        let type = cards[i][3]
        let stats = cards[i][4]
        let size = cards[i][5]
        size = determinSpriteSize(size)
        if (!filter || filter.includes(type[0].type.name) || filter.includes(type[1]?.type.name)) {
            contentRef.innerHTML += getPokeHTML(index, name, sprite, type, stats, size)
        }
        else {
            continue
        }
    }
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

function getPokeHTML(index, name, sprite, type, stats, size) {
    if (type.length == 2) {
        return  `
                <div class="poke_card">
                    <h2> #${index +1} - ${name} </h2>
                    <div id="card_${index}" class="inner_card" onclick="toggleOverlay(this)">                        
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
                            <img class="poke_sprite ${size}" src="${sprite}" alt="Bild von ${name}">
                        </div>
                        <div class="poke_stats_window">
                            <table>
                                <tr>
                                    <td class="tr1">KP</td>
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
                </div>
                `
    }
    else {
        return `
                <div class="poke_card">
                    <h2> #${index +1} - ${name} </h2>
                    <div id="card_${index}" class="inner_card" onclick="toggleOverlay(this)">                        
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
                            <img class="poke_sprite ${size}" src="${sprite}" alt="Bild von ${name}">
                        </div>
                        <div class="poke_stats_window">
                            <table>
                                <tr>
                                    <td class="tr1">KP</td>
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

function toggleOverlay(element) {
    contentRef = document.getElementById("overlay")
    contentRef.classList.toggle("d_none")
    document.getElementById("body").classList.toggle("loading")
    if (!contentRef.classList.contains("d_none")) {
        console.log(element.id);
        
        index = element.id.slice(5);
        renderOverlayWindow(index)
        
    }
}

function renderOverlayWindow(index) {
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

function getOverlayWindowHTML(indexNumber, name, sprite, type, stats, flavor) {
    return  `
                <div class="bg_overlay_${type}">
                    <div class="upper_overlay">
                        <h2>#${indexNumber +1} -${name}</h2>
                        <img class="poke_sprite_overlay" src="${sprite}" alt="Bild von ${name}">
                    </div>
                    <div class="detailed_info">
                        <div class="overlay_buttons">                        
                        <button id="btn_1">Allgemeine Info</button><button id="btn_2"></button><button id="btn_3">Attacken</button>
                        </div>
                        <div class="info_window">
                            <div class="flavor_text_div"><p>${flavor}</p></div>
                            <div class="ability_overlay">
                                <table id="table_overlay">
                                <tr>
                                    <td class="tr1_overlay">KP</td>
                                    <td class="tr2_overlay"><div class="hp_bar" style="width:${stats[0].base_stat / 2.5}px"></div></td>
                                    <td class="tr3_overlay">${stats[0].base_stat}</td>
                                </tr>
                                <tr>
                                    <td class="tr1_overlay">Atk</td>
                                    <td class="tr2_overlay"><div class="atk_bar" style="width:${stats[1].base_stat / 2.5}px"></div></td>
                                    <td class="tr3_overlay">${stats[1].base_stat}</td>
                                </tr>
                                <tr>
                                    <td class="tr1_overlay">Def</td>
                                    <td class="tr2_overlay"><div class="def_bar" style="width:${stats[2].base_stat / 2.5}px"></div></td>
                                    <td class="tr3_overlay">${stats[2].base_stat}</td>
                                </tr>
                                <tr>
                                    <td class="tr1_overlay">S-Atk</td>
                                    <td class="tr2_overlay"><div class="sp_atk_bar" style="width:${stats[3].base_stat / 2.5}px"></div></td>
                                    <td class="tr3_overlay">${stats[3].base_stat}</td>
                                </tr>
                                <tr>
                                    <td class="tr1_overlay">S-Def</td>
                                    <td class="tr2_overlay"><div class="sp_def_bar" style="width:${stats[4].base_stat / 2.5}px"></div></td>
                                    <td class="tr3_overlay">${stats[4].base_stat}</td>
                                </tr>
                                <tr>
                                    <td class="tr1_overlay">Init</td>
                                    <td class="tr2_overlay"><div class="init_bar" style="width:${stats[5].base_stat / 2.5}px"></div></td>
                                    <td class="tr3_overlay">${stats[5].base_stat}</td>
                                </tr>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            `
}