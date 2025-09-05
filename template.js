function getPokeHTML(index, name, sprite, type, stats, size, type1, type2) {
    if (type.length == 2) {
        return  `
                
                    
                    <div id="card_${index}" class="inner_card" onclick="toggleOverlay(this)">
                        <div class="h2_card">    
                            <h2> #${index +1} - ${name} </h2>
                        </div>                           
                        <div class="poke_background">
                        
                            <div class="type_background">
                                <div class="type_${type[0].type.name}"> </div>
                                <div class="type_${type[1].type.name}"> </div>
                            </div>
                        </div>
                        <div class="poke_type_bar">
                            <div class="bar_${type[0].type.name}">${type1}</div>
                            <div class="bar_${type[1].type.name}">${type2}</div>
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
                
                `
    }
    else {
        return `
                    <div id="card_${index}" class="inner_card" onclick="toggleOverlay(this)">
                        <div class="h2_card">    
                            <h2> #${index +1} - ${name} </h2>
                        </div>                
                        <div class="poke_background">
                            <div class="type_background">
                                <div class="type_${type[0].type.name}"> </div>
                                <div class="type_${type[0].type.name}"> </div>
                            </div>
                        </div>
                        <div class="poke_type_bar">
                            <div class="bar_${type[0].type.name}">${type1}</div>
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
                `    
    }   
}

function getOverlayWindowHTML(indexNumber, name, sprite, type, stats, flavor) {
    return  `
                <div class="bg_overlay_${type}">
                    <div class="upper_overlay">
                        <h2>#${indexNumber +1} -${name}</h2>
                        <img class="poke_sprite_overlay" src="${sprite}" alt="Bild von ${name}">
                    </div>
                    <div class="detailed_info">
                        <div class="arrow_div">
                            <div id="arrow_left">
                                <img src="./assets/icons/arrow_back_ios_new_32dp_F7F7F7_FILL0_wght400_GRAD0_opsz40.png " alt="Icon Pfeil nach links" onclick="renderOverlayWindow(${indexNumber -1})">
                            </div>
                            <div id="arrow_right"> 
                                <img src="./assets/icons/arrow_forward_ios_32dp_F7F7F7_FILL0_wght400_GRAD0_opsz40.png" alt="Icon Pfeil nach rechts" onclick="renderOverlayWindow(${indexNumber +1})">
                            </div>
                        </div>
                        <div class="overlay_buttons">                        
                        <button id="btn_1">Allgemeine Info</button><button id="btn_3" onclick="playCry(${indexNumber})">Ruf abspielen</button><audio id="cry_${indexNumber}" src="${cards[indexNumber][7]}"></audio>
                        
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