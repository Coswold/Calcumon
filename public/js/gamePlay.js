// gamePlay.js
// code originally in gamePlay.handlebars

let username = document.getElementById('username').textContent // name from database

let currProblem = ''
let currSolution = ''
let playerHealth = 100
let opponentHealth = 100
let level = document.getElementById('level').textContent // add level from database
let problemCount = 0 // how many problems has the player seen
let room = ''
let opponentName = ''

let playerInput = document.getElementById('answer')
let problemDisplay = document.getElementById('problem')
let submitButton = document.getElementById('submit-solution')
let playerHealthDisplay = document.getElementById('player-health')
let opponentHealthDisplay = document.getElementById('opponent-health')

let socket = io()
let foundOpponent = false; // tracks if opponent joined

// create / join game button events
document.getElementById('createGame').onclick = () => {
  console.log("*******YOYO******")
  createGame()
}
//addEventListener("onclick", createGame)
document.getElementById('joinGame').onclick = () => {
  console.log("JOIN GAME BUTTON PRESSED")
  findOpponent()
}

////////////// ****** SOCKETS ************ ////////
// when joined, send username to socket
function createGame() {
  console.log("create button pressed")
  socket.emit('createGame', { username: username })
}

function findOpponent() {
  console.log("find button pressed")
  socket.emit('joinGame', { username: username })
  socket.on(username, function(msg) {
    console.log(msg)
    if (msg.success == true) {
      room = msg.room
      opponentName = msg.name
    } else {
      console.log("Could not find a room to join.", msg.message)
    }
    console.log(room, opponentName)
  })
}

// sol = bool value of whether or not solution was correct
// send player name as well
// [true/false, username, player's health, opp's health, room#]
function sendToSocket(sol) {
  socket.emit('solution submitted', [sol, username, playerHealth, opponentHealth, room])
  // send that value to socket with player name [sol, playername]
}

// returns list of int values of new healths [sol, username, username-health, other-Health, room#]
function getFromSocket() {
  socket.on('health update', function(msg) {
      if (msg != null) {
          return msg
      }
  })

  socket.on('newGame', function(data) {
    room = data.room
    console.log("YOOOO: ", data.room)
    if (data.found == false){
      findOpponent()

    }

  })
}

////////////// ****** GAME ************ ////////

// handle player input
function handleInput() {
  let inp = playerInput.value // the submitted player's answer
  let sol = verifySolution(inp) // verify this answer with currSolution
  sendToSocket(sol) // send that to socket
  newProblem() // update problem
  console.log("HI")
}

// get new problem
async function newProblem() {

    let result = getProblem(level, problemCount, true)
    console.log('*******************'+result)

    // update currProblem
    currProblem = makeProblemReadable(result[0])
    // set problemDisplay.value = currProblem
    problemDisplay.innerText = currProblem
    // update currSolution with new solution
    currSolution = await solve(result[0])

    // !!! ****** WHY IS THIS LOGGING UNDEFINED??? IT WORKS IN PLAYER FILE!!! ***** !!!
    console.log(currSolution)

    // increment problem count
    problemCount += 1
}

// Check player's submission for correctness
function verifySolution(inp) {
  return inp == currSolution
}

// handle updating health for given player [username, health]
function updateHealth(msg) {
  // console.log(msg)
  if (msg && room.length == 5 && room == msg[4]) {
      if (username == msg[0]) {
          playerHealth = health[2]
          opponentHealth = health[3]
          // TODO: player was attacked --> animate


      }

      else {
          opponentHealth = health[2]
          playerHealth = health[3]
          // TODO: opponent was attacked --> animate


      }

      // update player health bar interface
      let perc = playerHealth+"%"
      playerHealthDisplay.style.height= perc
      console.log(playerHealthDisplay.style.height)

      // update opponent heath bar interface
      perc = opponentHealth+"%"
      opponentHealthDisplay.style.height= perc
      console.log(opponentHealthDisplay.style.height)
  }
}

// handles player lost redirect
function lose() {
  let newUrl = "/gameOverLose"
  document.location.href = newUrl
}

// handles player win redirect
function win() {
  let newUrl = "/gameOverWin"
  document.location.href = newUrl
}

// checks for game state
function checkGameState() {
  // console.log("CHECKING GAME STATE")
  // console.log(playerHealth, opponentHealth)
  if (playerHealth == 0) {
    lose()
  }
  else if (opponentHealth == 0){
    win()
  }
}

// updates
function update() {
    console.log('should ping')
  socket.emit('ping', { room: room })
  // check if game is over
  checkGameState()

  // Add a problem to the div
  if (currProblem == '') {
      // generate new curr problem
      newProblem()
  }

  // check if player submitted a solution by clicking submit button
  submitButton.onclick = function() {
      handleInput()
  }

  // check if player submitted a solution by pressing enter key
  playerInput.onkeypress = function(e) {
      if (!e) e = window.event;
      var keyCode = e.keyCode || e.which;
      if (keyCode == '13'){
        // Enter pressed
        handleInput()
    }
}

  // updated health for player and opponent
  let msg = getFromSocket()
  updateHealth(msg)
}

console.log("PLEASE WORK!!!!")
update()
// will execute update every 10 milliseconds
setInterval(update, 1000);

// lets try this
