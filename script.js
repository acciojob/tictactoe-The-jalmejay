//your JS code here. If required.
let player1Input=document.getElementById("player1");
let player2Input=document.getElementById("player2");
let submitBtn=document.getElementById("submit");
let board=document.querySelector(".board");
let message=document.querySelector(".message");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [ 
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

submitBtn.addEventListener("click",function(){
	player1 = player1Input.value.trim() || "Player 1";
    player2 = player2Input.value.trim() || "Player 2";

	currentPlayer=player1;
	message.textContent =`${currentPlayer}, you're up`;

	document.querySelector(".form").style.display = "none";
	board.style.display = "grid";

	board.innerHTML=""
	for(let i=0;i<9;i++){
		let ceil=document.createElement("div");
		ceil.classList.add("cell");
		ceil.id=i;
		board.appendChild(ceil);
	}
	
});

board.addEventListener("click",function(e){
	const cell=e.target;
	const cellIndex=cell.id;

	if (!cell.classList.contains("cell") || !gameActive) return;
      if (boardState[cellIndex] !== "") return; // already filled

      // Mark X for player1 and O for player2
      const mark = (currentPlayer === player1) ? "x" : "o";
      boardState[cellIndex] = mark;
      cell.textContent = mark;
	  cell.style.backgroundColor = "purple";

      // Check Winner
      if (checkWin()) {
        message.textContent = `${currentPlayer} congratulations you won!`;
        gameActive = false;
        return;
      }

      // Check Draw
      if (!boardState.includes("")) {
        message.textContent = "It's a draw!";
        gameActive = false;
        return;
      }

      // Switch Turn
      currentPlayer = (currentPlayer === player1) ? player2 : player1;
      message.textContent = `${currentPlayer}, you're up`;
});
function checkWin() {
      return winningConditions.some(condition => {
        return condition.every(index => 
          boardState[index] === (currentPlayer === player1 ? "X" : "O")
        );
      });
    }