# PW6 Project

Memory Game

Projet fait par Lina ABU HIJLEH et Louis CHASLE dans le cadre du module de PW6 pour l'Université Paris 7 2016/2017

Langages utilisés : PHP, Symfony, Javascript, JQuery, HTML, CSS

Fonctionnalités de chaque page:

    => auth.html: page permettant de s'inscrire et de se connecter (FINIE)
        New Game = demarre jeu + chrono
        Pause = bloque jeu + chrono
        Continue = debloque jeu + chrono
    
    => monPerso.html: affiche les infos du personnage de l'utilisateur (son nom, nb de bonus, nb de double bonus, temps de connexion, nb de MP) (FINIE)
    
    => game.js: le jeu en JS
        manque: mise en place du point d'action et de la section multijoueur
                liste de tous les persos
    
    => memory.html: page principale du jeu (jeu, ressources, MP, liste de tous les persos)
        manque: affichage de tous les persos
                
    => creationPerso.html: permet de créer un nouveau perso (FINIE)


Ressources:

    => 1 partie finie = +1 bonus
    
    => si on finit la partie en moins de 59 secondes = +2 doubleBonus
    
    => toutes les 15 min = +1$ (point d'action)
    
    => si on a 5 bonus + 2$ = on peut acheter la totalité des jetons des autres joueurs (section multijoueur)
    
