// valueurs des cartes
var cards = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];

// sauvegarde des cartes cliquées
var clicked_cards = [];
var tile_ids = [];
var flipped = 0;

// Ressources
var bonus = 0;
var extraBonus = 0;
var monnaie = 0;
var seuilExtraBonus = 59;

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
var timer = 0;

var start2 = new Date();
var end2 = 0;
var diff2 = 0;

var sec2;
var min2;

// pour eviter de jouer tant qu'on n'a pas cliqué sur New Game
var stopGame=true;

// chronomètre
function chrono(){ 
    end = new Date(); // date courante
    diff = end - start;
    diff = new Date(diff);
    var msec = diff.getMilliseconds();
    var sec = diff.getSeconds();
    var min = diff.getMinutes();
    
    if (min < 10){
        min = "0" + min; // affiche 01,02,03...
    }
    if (sec < 10){
        sec = "0" + sec; // affiche 01,02,03...
    }
    /*if(msec < 10){
        msec = "00" +msec;
    }
    else if(msec < 100){
        msec = "0" +msec;
    }*/
    document.getElementById("chronotime").innerHTML = min + ":" + sec;
    timer = setTimeout("chrono()", 10); // 10 msec avant l'execution de chrono()
}


function chronoStart(){
    document.chronoForm.pauseContinue.value = "Pause";
    document.chronoForm.pauseContinue.onclick = chronoStop;
    document.chronoForm.reset.onclick = chronoReset;
    start = new Date();
    chrono();
}

function chronoContinue(){
    document.chronoForm.pauseContinue.value = "Pause";
    document.chronoForm.pauseContinue.onclick = chronoStop;
    document.chronoForm.reset.onclick = chronoReset;
    start = new Date()-diff;
    start = new Date(start);
    chrono();
    stopGame=false;
}

// New Game button
function chronoReset(){
    document.getElementById("chronotime").innerHTML = "00:00";
    start = new Date();
}

function chronoStopReset(){
    document.getElementById("chronotime").innerHTML = "00:00";
    document.chronoForm.pauseContinue.onclick = chronoStart;
}

function chronoStop(){
    document.chronoForm.pauseContinue.value = "Continue";
    document.chronoForm.pauseContinue.onclick = chronoContinue;
    document.chronoForm.reset.onclick = chronoStopReset;
    stopGame=true;
    clearTimeout(timer);
}


// initialisation du plateau
function newBoard(){
    //bonus=bonus2;
	flipped = 0;
	var output = '';
    //start1=
    // on mélange les cartes
    cards.shuffle();
    // MAJ des ressources
    updateRessources();
    // on parcourt toutes les cartes
	for(var i = 0; i < cards.length; i++){
        // on ajoute a output tous les petits divs qui représentent les cartes et chaque div a un id et un tile nb
		output += '<div id="tile_'+i+'" onclick="flip(this,\''+cards[i]+'\')"></div>';
	}
    // on place le output dans le plateau
	document.getElementById('memory_board').innerHTML = output;
}


// initialisation ressources
function updateRessources(){
    document.getElementById('bonus').innerHTML = bonus;
    document.getElementById('extraBonus').innerHTML = extraBonus;
    document.getElementById('monnaie').innerHTML = monnaie;
}


// fonction principale
function flip(tile,value){
    // jeu bloqué tant qu'on n'a pas cliqué New Game
    if(stopGame){
        return;
    }
    else{
         if(tile.innerHTML == "" && clicked_cards.length < 2){
            // fond de la carte
            tile.style.background = '#FFF';
            // valeur de la carte
            tile.innerHTML = value;
            // si on retourne la première carte
            if(clicked_cards.length == 0){
                clicked_cards.push(value);
                tile_ids.push(tile.id);
                console.log('a');
            // si on retourne la deuxième carte    
            } else if(clicked_cards.length == 1){
                clicked_cards.push(value);
                tile_ids.push(tile.id);
                console.log('a');
                // si les deux cartes sont identiques
                if(clicked_cards[0] == clicked_cards[1]){
                    flipped += 2;
                    // on vide les tableaux
                    clicked_cards = [];
                    tile_ids = [];
                    console.log('a');
                    // vérifie que tout le plateau est remis à zéro
                    if(flipped == cards.length){
                        // fin du jeu
                        alert("Jeu terminé... Initialisation d'un nouveau jeu");
                        document.getElementById('memory_board').innerHTML = "";
                        // nouveau jeu
                        endGame();
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
                        console.log('a');
                    }
                    setTimeout(different, 700);
                }
            }
        }   
    }
}


// calcul du bonus et de l'extraBonus
function endGame(){
    // a chaque fin de partie on augmente bonus de 1
    bonus++;
    // si on finit la partie en moins de 15 secondes, on augmente l'extraBonus de 2
    end2 = new Date();
    diff2 = end2 - start2;
    diff2 = new Date(diff2);
    min2 = diff2.getMinutes();
    sec2 = diff2.getSeconds();
    //console.log("sec = "+diff2.getSeconds());
    if(min2<1 && sec2<seuilExtraBonus){
        extraBonus++;
        //console.log("extrabonus !");
    }
    else{
        console.log("trop lent pour l'extrabonus !");    
    }    
    chronoStop();
    stopGame = true;
}


// on remet le chrono à 0 et on débloque les cartes
function startGame(){
    chronoReset();
    chronoStart();
    start2 = new Date();
    stopGame=false;
    
}