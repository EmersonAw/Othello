
            let board;
let turncolor = 1;
            
            function createboard(){
                
                board = Array.from({ length: 8 }, () => Array(8).fill(null));
                board[0][0] = 0;
                board[0][1] = 0;
                board[0][2] = 0;
                board[0][3] = 0;
                board[0][4] = 0;    
                board[0][5] = 0;
                board[0][6] = 0;
                board[0][7] = 0;
                board[1][0] = 0;
                board[1][1] = 0;
                board[1][2] = 0;
                board[1][3] = 0;
                board[1][4] = 0;
                board[1][5] = 0;
                board[1][6] = 0;
                board[1][7] = 0;
                board[2][0] = 0;
                board[2][1] = 0;
                board[2][2] = 0;
                board[2][3] = 0;
                board[2][4] = 0;
                board[2][5] = 0;
                board[2][6] = 0;
                board[2][7] = 0;
                board[3][0] = 0;
                board[3][1] = 0;
                board[3][2] = 0;
                board[3][3] = 1;
                board[3][4] = 2;
                board[3][5] = 0;
                board[3][6] = 0;  
                board[3][7] = 0;
                board[4][0] = 0;
                board[4][1] = 0;
                board[4][2] = 0;
                board[4][3] = 2;
                board[4][4] = 1;
                board[4][5] = 0;
                board[4][6] = 0;
                board[4][7] = 0;
                board[5][0] = 0;
                board[5][1] = 0;
                board[5][2] = 0;
                board[5][3] = 0;
                board[5][4] = 0;
                board[5][5] = 0;
                board[5][6] = 0;
                board[5][7] = 0;
                board[6][0] = 0;
                board[6][1] = 0;
                board[6][2] = 0;
                board[6][3] = 0;
                board[6][4] = 0;
                board[6][5] = 0;
                board[6][6] = 0;
                board[6][7] = 0;
                board[7][0] = 0;
                board[7][1] = 0;
                board[7][2] = 0;
                board[7][3] = 0;
                board[7][4] = 0;
                board[7][5] = 0;
                board[7][6] = 0;
                board[7][7] = 0;
                return board;

            }
            
            function handleCellClick(row, col) {  

              // Check if the cell is already occupied  
              if (board[row][col] !== 0) {
                console.log(`Cell (${row}, ${col}) is already occupied!`);
                return;
              }

             
              
            // Directions to check for flipping pieces
               const directions = [
                [-1, 0], // Up
                [1, 0],  // Down
                [0, -1], // Left
                [0, 1],  // Right
                [-1, -1], // Up-Left
                [-1, 1],  // Up-Right
                [1, -1],  // Down-Left
                [1, 1]    // Down-Right
              ];
               
               // Check if valid move
              

               // Flip pieces in all valid directions
              let validMove = false;
              for (let [dx, dy] of directions) {

                    let x = row + dx;
                    let y = col + dy;
                    let hasOpponentPiece = false;

                    while (x >= 0 && x < 8 && y >= 0 && y < 8) {
                        if (board[x][y] === 0) {
                            break; // Empty cell, stop searching in this direction
                        } else if (board[x][y] === turncolor) {
                            if (hasOpponentPiece) {
                                // Valid move found, flip pieces in this direction
                                let flipX = row + dx;
                                let flipY = col + dy;
                                validMove = true;
                                while (flipX !== x || flipY !== y) {
                                    board[flipX][flipY] = turncolor; // Flip piece
                                    flipX += dx;
                                    flipY += dy;
                                }
                            }
                            
                            break; // Stop searching in this direction
                        } else {
                            hasOpponentPiece = true; // Found opponent's piece
                        }
                        x += dx;
                        y += dy;
                    }

              }


              
              if (validMove) {
                board[row][col] = turncolor;
                renderBoard();
                countPieces();
                console.log(`Clicked on cell: (${row}, ${col})`);
              } else {
                console.log(`Invalid move at cell: (${row}, ${col})`);
                return;
              }

              /// Switch turns
              if (turncolor == 1) {
                turncolor = 2;
              } else if (turncolor == 2) {
                turncolor = 1;
              }
              document.getElementById('turn-indicator').textContent = `Current Turn: ${turncolor === 1 ? 'Black' : 'White'}`;
              console.log(`Current turn: ${turncolor}`);
            }   

            resetTurns = () => {
              turncolor = 1;
              document.getElementById('turn-indicator').textContent = `Current Turn: Black`;
              countPieces();
            }
            
           

            function renderBoard() {
                const gameBoard = document.getElementById('game-board');
                for (let row = 0; row < 8; row++) {
                    for (let col = 0; col < 8; col++) {
                    const cell = gameBoard.children[row * 8 + col];
                    if (board[row][col] === 1) {
                        cell.innerHTML = '<img src="Assets/Black Tile.svg" alt="Black Piece" width="70" height="70">';
                    } else if (board[row][col] === 2) {
                        cell.innerHTML = '<img src="Assets/White Tile.svg" alt="White Piece" width="70" height="70">';
                    } else {
                        cell.innerHTML = '';
                    }
                    }
                }
            }

            function countPieces() {
              blackCount = 0;
              whiteCount = 0;

              for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                  if (board[row][col] === 1) {
                    blackCount++;
                  } else if (board[row][col] === 2) {
                    whiteCount++;
                  }
                }
              }

              blackwinpercentage = (blackCount / (blackCount + whiteCount)) * 100;
              whitewinpercentage = (whiteCount / (blackCount + whiteCount)) * 100;
              document.getElementById('black-score').textContent = `Black: ${blackCount}`;
              document.getElementById('white-score').textContent = `White: ${whiteCount}`;
              document.getElementById('black-win-percentage').style.backgroundImage = `linear-gradient(to right, #333333 0%, #333333 ${blackwinpercentage}%, #dddddd ${blackwinpercentage}%, #dddddd 100%)`;
              

              console.log(`Black pieces: ${blackCount}, White pieces: ${whiteCount}`);

            }
            

            createboard();
            renderBoard();
            countPieces();


                      
            
            
               
            