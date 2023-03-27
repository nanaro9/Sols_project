const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

const shuffle = array => {
    const clonedArray = [...array]

    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const original = clonedArray[i]

        clonedArray[i] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let i = 0; i < items; i++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
        
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}

const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension')  

    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.")
    }

    const emojis = ['A', 'Ā', 'E', 'Ē', 'S', 'Š', 'Z', 'Ž', 'N', 'Ņ','J','H','I','Ī','B','C','Č','G','Ģ','L','Ļ','K','Ķ',"O",'T','U','Ū','V','M','F','D','R','P']
    const picks1 = pickRandom(emojis, (dimensions * dimensions) / 2) 
    const items = shuffle([...picks1, ...picks1])
    // console.log(shuffle([...['a','b','c','d'],...['a1','b1','c1','d1']]))
    console.log(items)
    let i = 0
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back",id="${i++}">${item}</div>
                </div>
            `).join('')}
       </div>
    `

    console.log(cards)
    
    const parser = new DOMParser().parseFromString(cards, 'text/html')

    selectors.board.replaceWith(parser.querySelector('.board'))
}

const startGame = () => {
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `${state.totalFlips} soļu`
        selectors.timer.innerText = `Laiks: ${state.totalTime} sekundes`
    }, 1000)
}

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

const flipCard = card => {
    state.flippedCards++
    state.totalFlips++

    if (!state.gameStarted) {
        startGame()
    }

    if (state.flippedCards <= 2) {
        console.log(card.classList)
        card.classList.add('flipped')
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')
        console.log(flippedCards, flippedCards.length)

        if (flippedCards[0].className.includes('board')){
            console.log('board found')
            flippedCards[0].classList.remove('flipped')
            console.log(flippedCards, flippedCards[0].classList)
        }

        if (flippedCards[0].innerText == flippedCards[1].innerText) {
            console.log('matched Text')
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
        }

        setTimeout(() => {
            flipBackCards()
        }, 1000)
    }
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped')
            selectors.win.innerHTML = `
                <span class="win-text">
                    Tu Uzvarēji!<br />
                    ar <span class="highlight">${state.totalFlips}</span> soļiem<br />
                    <span class="highlight">${state.totalTime}</span> sekundēs
                </span>
            `

            clearInterval(state.loop)
        }, 1000)
    }
}

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        if (!eventTarget.className.includes('board')){

            if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
                console.log(eventTarget.innerHTML)
                flipCard(eventParent)
            }
        }

        if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            startGame()
        }
    })
}

generateGame()
attachEventListeners()