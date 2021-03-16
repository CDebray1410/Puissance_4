$(document).ready(function () {
    let playerOneWins = 0;
    let playerTwoWins = 0;
    let draw = 0;    
    class Game {
        constructor(container, player_one_color = "red", player_two_color = "yellow", lengthX = 7, lengthY = 6, playerOne = "Player 1" , playerTwo = "Player 2") {
            this.container = container;
            this.board = Array(this.lengthY); // transforme en array pour que l'on puisse récuperer l'index et la colonne après
            if (player_one_color == player_two_color) {
                this.player_one_color = "red",
                this.player_two_color = "yellow";
            } else {
                this.player_one_color = player_one_color,
                this.player_two_color = player_two_color;
            }
            this.lengthX = lengthX,
            this.lengthY = lengthY,

            this.playerOne = playerOne,
            this.playerTwo = playerTwo,

            this.turn = 1;
            this.playerTurn = 1;
            this.winner = null; // Si none , la partie n'est pas fini, 0 = match null, 1 = player 1 gagne, 2 = player 2 gagne

            document.getElementById(this.container.replace("#", '')).addEventListener('click', (event) => this.insertClick(event)); // ECMA 6 , Utilisation des Arrow function
            
            this.grid(); // Lance directement l'affichage à l'initialisation de la classe
        }


        grid() {
            let game_container = $("<table></table>"); // ECMA 6 , Utilisation de let
            game_container.addClass("board");
            $('#victoryCounter').html(`<li>Victoire de ${this.playerOne} (couleur : ${this.player_one_color}) : ${playerOneWins}</li> <li>Victoire de ${this.playerTwo} (couleur : ${this.player_two_color}) : ${playerTwoWins}</li> <li>Matchs nuls : ${draw}</li>`);

            for (let i = this.lengthY - 1; i >= 0; i--) { 
                let tr = $('<tr></tr>')  
                tr.addClass('row');
                tr.attr({"data-row": i});
                for (let j = 0; j < this.lengthX; j++) { // Rajoute les td en guise de colonne, sert à remplir la ligne
                    let td = $('<td></td>');
                    td.addClass('circle');
                    td.attr({"data-col": j});
                    td.attr({"data-col-row": i});
                    td.attr({"data-col-status": "empty"});
                    tr.append(td);
                }
                game_container.append(tr);
                $('#restart').hide()
            }
            $(this.container).innerHTML = '';

            let turnCounter = $('<tr></tr>').addClass('turnCounter');
            turnCounter.append($('<td></td>').text(`Tour : ${this.turn}`).attr("id", "turnCounter"));
            let playerTurnCounter = $('#playerTurnCounter');
            playerTurnCounter.css("background-color", `${this.player_one_color}`)
            $('#counterPlayer').append(playerTurnCounter);

            game_container.append(turnCounter)
            $(this.container).html(game_container);
        }
        
        insertClick(event) {
            let currentCol = event.target.dataset.col;
            if (currentCol == undefined || currentCol == null || currentCol == "") {
                console.log("Vide !")
            } else {

                for (let p = 0; p < this.lengthY; p++) {
                    let currentRow, currentCol ,currentTarget; 
                    currentRow = p;
                    currentCol = event.target.getAttribute("data-col");
                    currentTarget = document.querySelector(`[data-col='${currentCol}'][data-col-row='${currentRow}']`); // Récupère la col et la col-row actuelle, pour remplir précisément le truc

                    if (currentTarget.getAttribute("data-col-status") == "empty") {
                        if (this.turn == 1 || this.turn % 2 != 0) {
                            currentTarget.setAttribute("data-col-status", "1");
                            currentTarget.style.backgroundColor = this.player_one_color;
                            this.playerTurn = 1;
                            $('#playerTurnCounter').css("background-color", `${this.player_two_color}`) // ECMA 6 , Utilisation des template string ``
                            currentTarget.classList.add("yoink");

                        } else {
                            currentTarget.setAttribute("data-col-status", "2");
                            currentTarget.style.backgroundColor = this.player_two_color;
                            this.playerTurn = 2;
                            $('#playerTurnCounter').css("background-color", `${this.player_one_color}`)
                            currentTarget.classList.add("yoink");

                        }
                        this.turn++
                        $('#turnCounter').text(`Tour : ${this.turn}`);

                        break; // Si l'endroit est empty, on le rempli puis on annule la boucle.
                    }
                }


                if (this.win(this.playerTurn) == true) { // Si l'un des joueur gagne (si cela return true)
                    this.winner = this.playerTurn;
                    $('#restart').show()
                } else if (this.turn >= (this.lengthY * this.lengthX + 1)) { // Match null
                    this.winner = 0;
                    $('#restart').show()
                }

                let buttonRefresh = $('<button></button>')
                buttonRefresh.text('Restart')

                if (this.winner == 0) {
                    $('.turnCounter').html(`<td>Match nul ! </td>`);
                    alert(`Match nul !`);
                    $('#victoryCounter').html(`<li>Victoire de ${this.playerOne} (couleur : ${this.player_one_color}) : ${playerOneWins}</li> <li>Victoire de ${this.playerTwo} (couleur : ${this.player_two_color}) : ${playerTwoWins}</li> <li>Matchs nuls : ${draw}</li>`);
                    draw = draw + 1;
                    document.getElementById(this.container.replace("#", '')).innerHTML("");

                    $('#restart').show()
                } else if (this.winner == 1) {
                    $('.turnCounter').html(`<td>${this.playerOne} gagne ! </td>`);
                    alert(`${this.playerOne} gagne !`);
                    playerOneWins = playerOneWins + 1;
                    $('#victoryCounter').html(`<li>Victoire de ${this.playerOne} (couleur : ${this.player_one_color}) : ${playerOneWins}</li> <li>Victoire de ${this.playerTwo} (couleur : ${this.player_two_color}) : ${playerTwoWins}</li> <li>Matchs nuls : ${draw}</li>`);
                    $(this.container.replace("#", '')).html("");

                    $('#restart').show()
                } else if (this.winner == 2) {
                    $('.turnCounter').html(`<td>${this.playerTwo} gagne ! </td>`);
                    alert(`${this.playerTwo} gagne !`);
                    playerTwoWins = playerTwoWins + 1;
                    $('#victoryCounter').html(`<li>Victoire de ${this.playerOne} (couleur : ${this.player_one_color}) : ${playerOneWins}</li> <li>Victoire de ${this.playerTwo} (couleur : ${this.player_two_color}) : ${playerTwoWins}</li> <li>Matchs nuls : ${draw}</li>`);
                    $(this.container.replace("#", '')).hide();

                    $('#restart').show()
                }
            }
        }

        win(player) {
            let count = 0;
            for (let row = 0; row < this.lengthY; row++) {
                for (let h = 0; h < this.lengthX; h++) {
                    if (document.querySelector(`[data-col='${h}'][data-col-row='${row}']`).getAttribute("data-col-status") == player) {
                        count = count + 1;
                    } else {
                        count = 0;
                    }

                    if (count >= 4) {
                        return true
                    } 
                }
            }

            count = 0;
            for (let h = 0; h < this.lengthX; h++) {
                for (let row = 0; row < this.lengthY; row++) {
                    if (document.querySelector(`[data-col='${h}'][data-col-row='${row}']`).getAttribute("data-col-status") == player) {
                        count = count + 1;
                    } else {
                        count = 0;
                    }

                    if (count >= 4) {
                        return true
                    }
                }
            }
            
            // DIAGONALE
            count = 0;
            let incrementLocation;
            for (let row = 0; row < (this.lengthY - 3); row++) {
                for (let d = 0; d < (this.lengthX - 3); d++) {
                    incrementLocation = 0;
                    for (let h = 0; h < (this.lengthX - 3); h++) {
                        if (incrementLocation == 0) {
                            if (document.querySelector(`[data-col='${h + d}'][data-col-row='${row}']`).getAttribute("data-col-status") == player) {
                                count = count + 1;
                                incrementLocation = 1;
                            } else {
                                count = 0;
                                incrementLocation = 1;
                            }
                        } else {
                            let newRow = row + incrementLocation;
                            if (newRow < this.lengthY && document.querySelector(`[data-col='${(h + d)}'][data-col-row='${(newRow)}']`).getAttribute("data-col-status") == player) {
                                count = count + 1;
                                incrementLocation = incrementLocation + 1;
                            } else {
                                count = 0;
                                incrementLocation = incrementLocation + 1;
                            }
                        }

                        if (count >= 4) {
                            return true
                        }
                    }
                }
            }
            
            
            // ANTI-DIAGONALE
            count = 0;
            let incrementLocation2;
            for (let row = 0; row < (this.lengthY - 3); row++) {
                for (let d = 0; d < (this.lengthX - 3); d++) {
                    incrementLocation2 = 0;
                    for (let h = (this.lengthX - 1); h >= 3; h--) {
                        if (incrementLocation2 == 0) {
                            if (document.querySelector(`[data-col='${h - d}'][data-col-row='${row}']`).getAttribute("data-col-status") == player) {
                                count = count + 1;
                                incrementLocation2 = 1;
                            } else {
                                count = 0;
                                incrementLocation2 = 1;
                            }
                        } else {
                            let newRow = row + incrementLocation2;
                            if (newRow < this.lengthY && document.querySelector(`[data-col='${(h - d)}'][data-col-row='${(newRow)}']`).getAttribute("data-col-status") == player) {
                                count = count + 1;
                                incrementLocation2 = incrementLocation2 + 1;
                            } else {
                                count = 0;
                                incrementLocation2 = incrementLocation2 + 1;
                            }
                        }

                        if (count >= 4) {
                            return true
                        }
                    }
                }
            }
        }

        restart() {
            this.turn = 1;
            this.playerTurn = 1;
            this.winner = null; 

            this.grid();
        }
    }
    
    let myGame = new Game("#my_board", "red", "red", 7, 6, "Christopher" , "Humain");
    // constructor(container, player_one_color = "red", player_two_color = "yellow", lengthX = 7, lengthY = 6, playerOne = "Player 1" , playerTwo = "Player 2")
    $('#restart').click(function () {
        myGame.restart();
    })
})