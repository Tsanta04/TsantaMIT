#include<stdio.h>
#include<string.h>
#include<stdlib.h>
///Structure
typedef struct PLAYER{
	int score;
	char name[100];
}PLAYER;

typedef struct PILE{
	PLAYER player;
	struct PILE* suivant;
		
}PILE;
PILE* push(PILE* pile,char* nom,int val);

int main(){
	printf("\t\tScore joueur\n");

///Initialisation
	PILE* pile = NULL;
	pile = push(pile,"Tsanta",32);

///Affichage
	stack_show(pile);
	return 0;
}

///Les fonctions
void stack_show(PILE* pile){

	
}


PILE* push(PILE* pile,char* nom,int val){
///Declaration
	PILE* elt = malloc(sizeof(PILE));
///Ajout
	strcpy(elt->player.name,nom);
	elt->player.score = val;
///Insertion
	elt->suivant = pile;
	return elt;
}
