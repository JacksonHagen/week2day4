const heros = {
    batman: {
        damage: 5,
        health: 100,
        image: 'https://m.media-amazon.com/images/I/41AuNl6Yw9L._AC_.jpg',
        dead: false
    },
    catwoman: {
        damage: 5,
        health: 100,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRcpVJe2RX3Psmn5UJYCnXKrimIPyiTPMYr2Axcv0zZ9Qbm9OnhBHAwF1sr2B0AOUBPtc&usqp=CAU',
        dead: false
    },
    mario: {
        damage: 5,
        health: 100,
        image: 'https://www.lego.com/kids/static/find-the-pairs/super-mario/FindThePairs_Characters_Tablet_super-mario.png',
        dead: false
    },
    jedi: {
        damage: 5,
        health: 100,
        image: 'https://img.brickowl.com/files/image_cache/larger/lego-jedi-hunter-frontier-set-75051-15-7.jpg',
        dead: false
    }
}


const bosses = {
    joker: {
        health: 100,
        image: 'https://www.lego.com/cdn/cs/set/assets/blt7674afc11e82cb72/70900_alt7.jpg'
    }
}

let attackInterval = setInterval(bossAttack, 500);

function startGame() {
    drawBoss()
    drawHero()

}

function drawHero() {
    let template = ''
    for(let name in heros) {
        let hero = heros[name]
        if (hero.health > 0){

        template += /*html*/ `
        <div class="col-6 d-flex flex-column align-items-center">
        <img class="img-fit py-2 rounded" src="${hero.image}" alt="">
        <div class="progress w-75">
        <div class="progress-bar" role="progressbar" id="${name}-health-bar" style="width: ${hero.health}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <button class="btn btn-danger w-75 mt-2 shadow action" onclick='attack()' id="attack-button">ATTACK</button>
        </div>
        `
    }}
    document.getElementById('hero').innerHTML = template
}

function attack() {
    bosses.joker.health -= 5
    console.log(bosses.joker.health)
    updateBossBar()
}

function megaAttack(){
    // calculate total damdge using hero alive function x25
}

function updateBossBar() {
    document.getElementById('boss-health-bar').style.width = bosses.joker.health + "%"
}

function updateHeroBar() {
    for(let name in heros) {
        let hero = heros[name]
        if(hero.health>0){
            console.log(`${name}-health-bar`)
            document.getElementById(`${name}-health-bar`).style.width = hero.health + "%"
        }
    }
}

function drawBoss() {
    let template = ''
    for(let name in bosses) {
        let boss = bosses[name]

        template += /*html*/ `
        <img class="img-boss py-2 rounded" src="${boss.image}" alt="">
        <div class="progress w-75">
            <div class="progress-bar" id="boss-health-bar" role="progressbar" style="width: 100%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        `
    }
    document.getElementById('boss').innerHTML = template
}

function selectHero(){
    let selected = false
    let flagNum = 0
    for(let name in heros) {
        let hero = heros[name]
        if(hero.health === 0){
            flagNum++
        }
    }
    if(flagNum === 4) {
        clearInterval(attackInterval)
    }
    do{
        let randomIndex = Math.floor(Math.random() * Object.keys(heros).length)
        const keys = Object.values(heros)
        
        if(keys[randomIndex].health>0) {
            selected = true
            return keys[randomIndex]
        }
    
    }while(!selected && flagNum < 4)

        // decrease the health of one hero utnil DEATH!!!
}

function bossAttack(){
    const victim = selectHero()

    if(victim !== 'undefined' && victim.health>0){  
        victim.health -= 25
        updateHeroBar()
        console.log(victim)
    }
    drawHero()
}  

startGame()

