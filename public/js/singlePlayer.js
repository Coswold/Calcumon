// IN PROGRESS: Currently multiplayer game code works fine for single player as well.
// TODO: Separate multi player and single player more neatly

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


////////////// ****** GAME ************ ////////

// handle player input
function handleInput() {
  console.log("HANDING INPUT")
  let inp = playerInput.value // the submitted player's answer
  let sol = verifySolution(inp) // verify this answer with currSolution
  console.log(sol)
  updateHealth(sol) // health updates
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
function updateHealth(sol) {
  if (sol == true) {
        console.log("****HAHA I GOT THIS*** ")
        opponentHealth -= 10
        // TODO: opponent was attacked --> animate
        attackPlayer() // player attacks opponent

    }

    else if (sol == false) {
        playerHealth -= 10
        // TODO: player was attacked --> animate
        attackOpponent() // opponent attacks player
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
}

console.log("PLEASE WORK!!!!")
update()
// will execute update every 10 milliseconds
setInterval(update, 1000);

// lets try this
