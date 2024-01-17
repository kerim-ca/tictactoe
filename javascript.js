



const Players = (marker) => {
    return {marker}
  }
  
  
  
  
  const player1 = Players("X");
  const player2 = Players("O");
  
  const playerTurn = document.getElementById("player-turn");
  
  
  
  const gameBoard = (() => {

    let isGameOver = false;

    let board = ["-", "-", "-",
                 "-", "-", "-",
                 "-", "-", "-"];

 
    
    
    //makes move
    const makeMove = function(index, marker, boxNumber){
        if(board[index] !== "-"){
        }
        else{
        board[index] = marker;
        boxNumber.textContent = marker;
        boxNumber.style.pointerEvents = "none";
        }
    }
    //checks horizontal win
    const checkHorizontal = function(marker){
        for(let i = 0; i <= 6; i+=3){
            if(board[i] === marker && board[i+1] === marker && board[i+2] === marker){
              return true;
            }
          }
          return false;
        
    }
   
    
    //checks vertical win
    const checkVertical = function(marker){
        for(let i = 0; i<=2; i++){
            if(board[i] === marker && board[i+3] === marker && board[i+6] === marker){
                return true;
            }
        }
        return false 
    }

    
    //checks diagonal win
    const checkDiagonal = function(marker){
      if((board[0] === marker && board[4] === marker && board[8] === marker) 
      || (board[2] === marker && board[4] === marker && board[6] ===  marker)){
      return true;
    }

    }
    //checks tie 
    const checkTie = function(){
        if(board.indexOf("-") === -1){
            document.getElementById("player-turn").textContent = "its a tie"
            
            isGameOver = true;
            return true;
        }
        return false;
    }
    //checks win
    const checkWin = function(currentPlayer){
        if(checkHorizontal(currentPlayer) || checkVertical(currentPlayer) || checkDiagonal(currentPlayer)){
            document.getElementById("player-turn").textContent = `the winner is ${currentPlayer}`
           
            isGameOver = true;
            return true;
            
        }
        return false;
    }
    //switches player
    const switchPlayer = function(currentPlayer){
      if (currentPlayer === player1.marker) {
        playerTurn.textContent = "O's turn";
        return player2.marker;
    } 
    else {
        playerTurn.textContent = "X's turn";
        return player1.marker;
    }
  }

  //sets up game for makeMove and stops game if win or tie
  const makePosition = function(){
    for(let i = 1; i <= 9; i++) { // Use a loop to assign event listeners to each box
        const box = document.getElementById('box' + i);
        box.addEventListener('click', () => {
            makeMove((i-1), currentPlayer, box) // Pass function to event listener
            
            if(checkWin(currentPlayer) || checkTie()){
                var boxes = document.getElementsByClassName("box");
                for(var n = 0; n < boxes.length; n++) {
                    boxes[n].style.pointerEvents = "none";
                    }
            } else {
                currentPlayer = switchPlayer(currentPlayer) // Switch player if game not over
            }
        
        });
        }
    }

   

  

    
    
    return {makeMove, checkHorizontal, checkVertical, checkDiagonal, checkTie, checkWin, switchPlayer, makePosition}
    
    
  })();
  //--------------------------------------------------------------------------------------------------------------

  //the game controller
  const gameController = (() => {
    const startGame = () => {
        currentPlayer = player1.marker;
        gameBoard.makePosition();
        playerTurn.textContent = "X's turn";
  }

  

  return {startGame}
})();

//-----------------------------------------------------------------------------------------------------




const containerContainer = document.getElementById("container-container");
const container = document.getElementById("container");
const startButton = document.createElement("button");
startButton.setAttribute("id", "start-button");
startButton.textContent = "Start Game";
containerContainer.replaceChild(startButton,container);


//replaces button with board and shows turn and win message
startButton.addEventListener("click", ()=>{
    containerContainer.replaceChild(container,startButton);
    playerTurn.style.visibility = "visible";
})

//starts game
startButton.addEventListener("click", gameController.startGame);

