// gamePlay.js
// code originally in gamePlay.handlebars

let username = document.getElementById('username').textContent // name from database

let currProblem = ''
let currSolution = ''
let playerHealth = 100
let opponentHealth = 100
let level = document.getElementById('level').textContent // add level from database
let problemCount = 0 // how many problems has the player seen

let playerInput = document.getElementById('answer')
let problemDisplay = document.getElementById('problem')
let submitButton = document.getElementById('submit-solution')
let playerHealthDisplay = document.getElementById('player-health')
let opponentHealthDisplay = document.getElementById('opponent-health')

let socket = io()

// when joined, send username to socket
function setUsername() {
  socket.emit('add user', username)
}
setUsername()

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

    // update currProblem
    currProblem = makeProblemReadable(result[0])
    // set problemDisplay.value = currProblem
    problemDisplay.innerText = currProblem
    // update currSolution with new solution
    currSolution = await solve(result[0])

    // !!! ****** WHY IS THIS LOGGING UNDEFINED??? IT WORKS IN PLAYER FILE!!! ***** !!!
    console.log(this.currSolution)

    // increment problem count
    problemCount += 1
}

// Check player's submission for correctness
function verifySolution(inp) {
  return inp == currSolution
}

// TODO: socket server access
// sol = bool value of whether or not solution was correct
// send player name as well
function sendToSocket(sol) {
  socket.emit('solution submitted', [sol, username])
  // send that value to socket with player name [sol, playername]
}

// returns list of int values of new healths [username, health]
function getFromSocket() {
  socket.on('health update', function(msg) {
      if (msg != null) {
          return msg
      }
  })
}

// handle updating health for given player [username, health]
function updateHealth(msg) {
  if (msg !== null) {
      if (username == msg[0]) {
          playerHealth = health[1]
          // TODO: player was attacked --> animate
          
          // update health bar interface
          let perc = playerHealth+"%"
          playerHealthDisplay.style.height= perc
          console.log(playerHealthDisplay.style.height)
      }
      
      else {
          opponentHealth = health[1]
          // TODO: opponent was attacked --> animate

          // update heath bar interface
          let perc = opponentHealth+"%"
          opponentHealthDisplay.style.height= perc
          console.log(opponentHealthDisplay.style.height)
      }
  }
}


// updates
function update() {
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

// will execute update every 10 milliseconds
setInterval(update, 1000);