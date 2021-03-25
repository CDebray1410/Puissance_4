## Index
1. Infos générales
2. Fonctionnalités
3. Utilisation
4. Prérequis

## 1) Infos générales
Nom du projet : Puissance 4
Statut du projet : Fini.
    Version : 1.0
Auteur: Christopher Debray
Objectif (résumé du sujet) :
    Vous allez devoir réaliser un jeu en utilisant la librairie jQuery reprenant les règles du célèbre jeu de Puissance4.

## 2) Fonctionnalités

Jeu de puissance 4 
    - Jeu à deux joueurs
    - Tour par tour 
    - Les deux joueurs placent un pion dans la colonne de leur choix, le pion coulisse à la position la plus basse possible dans la-dite colonne. 
    - Quand un joueur aligne à la suite au moins 4 de ses pièces il gagne la partie que cet alignement soit : 
        - horizontal
        - vertical 
        - diagonale
        - anti-diagonale
        
    - S’il n’y a plus de case de la grille disponible la partie est déclarée nulle
    - En cas de relance de partie ( via le bouton restart ) : 
        - La grille sera vidée et le compteur de tour sera remis à 0 .
        - Le compteur de victoire des joueurs (ou du match nul) s'incrémentera et conservera les résultat des matchs précédents

## 3) Utilisation

###### Dans l'instanciation de la class qui est déjà présente ici (ligne 247 : let myGame) 
- Modifier les paramètres si besoin (Seul le premier est obligatoire, tous les autres ont une valeurs par défaut) :        
    - 1er = id de l'élément qui contiendra le puissance 4
    - 2ème = couleur de pion du joueur 1
    - 3ème = couleur de pion du joueur 2
    - 4ème = nombre de colonnes de la grille de jeu
    - 5ème = nombre de rangées de la grille de jeu
    - 6ème = nom du joueur 1
    - 7ème = nom pion du joueur 2
    
## 4) Prérequis
JQuery.
