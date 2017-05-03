// valueeurs des cartes
var cards = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
// sauvegarde des cartes cliquées
var clicked_cards = [];
var tile_ids = [];
var flipped = 0;

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
				}
				setTimeout(different, 700);
			}
		}
	}
}