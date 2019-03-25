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
let skipButton = document.getElementById('skip-problem')
let playerHealthDisplay = document.getElementById('player-health')
let opponentHealthDisplay = document.getElementById('opponent-health')

var socket = io()
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

function ping() {
  console.log("Pinging server to keep room alive")
  console.log('should ping ' + room)
  socket.emit('keepalive', { room: room })
}

function test() {
  console.log("test button pressed")
  socket.emit('test', { username: username })
}

// sol = bool value of whether or not solution was correct
// send player name as well
// [true/false, username, player's health, opp's health, room#]
function sendToSocket(sol) {
  console.log("PLEASE PRINT ME")
  socket.emit('solutionSubmitted', [sol, username, playerHealth, opponentHealth, room])
  // send that value to socket with player name [sol, playername]
}

// returns list of int values of new healths [sol, username, username-health, other-Health, room#]
function getFromSocket() {
  socket.on('answer submission', function(data) {
      console.log(data)
      playerHealth = data[2]
      opponentHealth = data[3]
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
  console.log("HANDING INPUT")
  let inp = playerInput.value // the submitted player's answer
  let sol = verifySolution(inp) // verify this answer with currSolution
  console.log(sol)
  sendToSocket(sol) // send that to socket
  console.log("CALLED SEND TO SOCKET??")
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

// handle updating health for given
function updateHealth(msg) {
  console.log("MESSAGE FROM SOCKET", msg)
  console.log("UPDATING HEALTH", msg)
  // if (msg && room.length == 2 && room == msg[4]) {
      if (username == msg[1]) {
          playerHealth = msg[2]
          opponentHealth = msg[3]
          console.log(playerHealth, opponentHealth)
          // TODO: player was attacked --> animate

          if (msg[0] == true) {
            attackPlayer() // player attacks opponent
          } else {
            attackOpponent() // opponent attacks player
          }

      }

      else {
          opponentHealth = msg[2]
          playerHealth = msg[3]
          console.log(playerHealth, opponentHealth)
          // TODO: opponent was attacked --> animate
          if (msg[0] == false) {
            attackPlayer() // player attacks opponent
          } else {
            attackOpponent() // opponent attacks player
          }
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
// }

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
  if (playerHealth <= 0) {
    console.log("LOST")
    let newUrl = "/gameOverLose"
    document.location.href = newUrl
  }
  else if (opponentHealth <= 0){
    console.log("WON")
    let newUrl = "/gameOverWin"
    document.location.href = newUrl
  }
}

// updates
function update() {
    if (room != '') {
      ping()
    }
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

  // skip a problem
  skipButton.onclick = function() {
      newProblem()
      problemCount -= 1
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

  socket.on('answer submission', function(data) {
     updateHealth(data)
     console.log(data)
  })

}

console.log("PLEASE WORK!!!!")
update()
// will execute update every 10 milliseconds
setInterval(update, 1000);

// lets try this
