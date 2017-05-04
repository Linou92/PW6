// valueeurs des cartes
var cards = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
// sauvegarde des cartes cliquées
var clicked_cards = [];
var tile_ids = [];
var flipped = 0;

// Ressources
var bonus = "bb";


// fonction qui mélange les cartes et les positionne au hasard
Array.prototype.shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

// chronomètre
var startTime = 0;
var start = 0;
var end = 0;
var diff = 0;
var timerID = 0;

function chrono(){
    end = new Date();
    diff = end - start;
    diff = new Date(diff);
    var msec = diff.getMilliseconds();
    var sec = diff.getSeconds();
    var min = diff.getMinutes();
    var hr = diff.getHours()-1;
    if (min < 10){
        min = "0" + min;
    }
    if (sec < 10){
        sec = "0" + sec;
    }
    if(msec < 10){
        msec = "00" +msec;
    }
    else if(msec < 100){
        msec = "0" +msec;
    }
    document.getElementById("chronotime").innerHTML = min + ":" + sec;
    timerID = setTimeout("chrono()", 10);
}

function chronoStart(){
    document.chronoForm.startstop.value = "Pause";
    document.chronoForm.startstop.onclick = chronoStop;
    document.chronoForm.reset.onclick = chronoReset;
    start = new Date();
    chrono();
}

function chronoContinue(){
    document.chronoForm.startstop.value = "Pause";
    document.chronoForm.startstop.onclick = chronoStop;
    document.chronoForm.reset.onclick = chronoReset;
    start = new Date()-diff;
    start = new Date(start);
    chrono();
}

function chronoReset(){
    document.getElementById("chronotime").innerHTML = "00:00";
    start = new Date();
}

function chronoStopReset(){
    document.getElementById("chronotime").innerHTML = "00:00";
    document.chronoForm.startstop.onclick = chronoStart;
}

function chronoStop(){
    document.chronoForm.startstop.value = "Play";
    document.chronoForm.startstop.onclick = chronoContinue;
    document.chronoForm.reset.onclick = chronoStopReset;
    clearTimeout(timerID);
}


// initialisation du plateau
function newBoard(){
	flipped = 0;
	var output = '';
    // on mélange les cartes
    cards.shuffle();
    // on parcourt toutes les cartes
	for(var i = 0; i < cards.length; i++){
        // on ajoute a output tous les petits divs qui représentent les cartes et chaque div a un id et un tile nb
		output += '<div id="tile_'+i+'" onclick="flip(this,\''+cards[i]+'\')"></div>';
	}
    // on place le output dans le plateau
	document.getElementById('memory_board').innerHTML = output;
}


// fonction principale
function flip(tile,value){
    document.getElementById('bonus').value = "bb";
	
    if(tile.innerHTML == "" && clicked_cards.length < 2){
        // fond de la carte
		tile.style.background = '#FFF';
        // valeur de la carte
		tile.innerHTML = value;
        // si on retourne la première carte
		if(clicked_cards.length == 0){
			clicked_cards.push(value);
			tile_ids.push(tile.id);
        // si on retourne la deuxième carte    
		} else if(clicked_cards.length == 1){
			clicked_cards.push(value);
			tile_ids.push(tile.id);
            // si les deux cartes sont identiques
			if(clicked_cards[0] == clicked_cards[1]){
				flipped += 2;
				// on vide les tableaux
				clicked_cards = [];
            	tile_ids = [];
				// vérifie que tout le plateau est remis à zéro
				if(flipped == cards.length){
                    // fin du jeu
                    //bonus++;
                    //document.getElementById('bonus').value = bonus;
					alert("Jeu terminé... Initialisation d'un nouveau jeu");
					document.getElementById('memory_board').innerHTML = "";
					// nouveau jeu
                    newBoard();
				}
            // si les deux cartes ne sont pas identiques    
			} else {
				function different(){
				    // on retourne les deux cartes face cachées
				    var tile_1 = document.getElementById(tile_ids[0]);
				    var tile_2 = document.getElementById(tile_ids[1]);
				    tile_1.style.background = '#E17032';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = '#E17032';
            	    tile_2.innerHTML = "";
				    // on vide les tableaux
				    clicked_cards = [];
            	    tile_ids = [];
                   // document.getElementById('bonus').value = bonus;
				}
				setTimeout(different, 700);
			}
		}
	}
}