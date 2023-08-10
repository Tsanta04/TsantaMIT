#include<stdio.h>
#include<stdlib.h>
#include<time.h>

int main(){
///Introduction
	printf("\t\tJEU DE DEVINETTE D'UN NOMBRE ENTRE 0 ET 100.\n");
	printf("\n\tInstructions:\nVous allez deviner un nombre entre 0 et 100. Vous n'avez que 7 chances pour  y tenter.\n");
	
///Les variables
	int nDevine=0,		//le nombre a deviner (donne aleatoirement par le programme 
		nJoueur=0;		//nombre entree par le joueur

///Initialisation du generateur de nombre aleatoire
	srand(time(NULL));
	
///Génerer les nombres aleatoires: cf.Numerical Recipes
	nDevine= (1+ (int)(100.0*rand() / (RAND_MAX + 1.0)));	

/*
	printf("n= %d\n",nDevine);
*/
	
///Debut du jeu
	printf("\nCommencez à deviner (entrer le nombre) :\t");	//Demander au joueur de tenter
	scanf("%d",&nJoueur);	//lire ce qu'il a entre
	
	int coups=1;	//Nombre de coups du joueur
		
///Traitement

	for (int i=6;i>0;i--){		
		if( nJoueur > nDevine ){	//si le nombre entree est plus grand que le nombre à deviner
			printf("Trop grand!\n");
			printf("Essayez encore mais vous n'avez que %d chance:\t",i);	//Redemander au joueur de tenter
			scanf("%d",&nJoueur);	
			coups++;
		}
		
		else if( nJoueur < nDevine ){	//si le nombre entree est plus petit que le nombre à deviner
			printf("Trop petit!\n");	
			printf("Essayez encore mais vous n'avez que %d chance:\t",i);	//Redemander au joueur de tenter
			scanf("%d",&nJoueur);
			coups++;
		}
	}
	
///Sortie du resultat du jeu
	if ( nJoueur == nDevine ){		//si le joueur trouve le nombre
		printf("\nFelicitations! Vous avez gagné! !\n");
		printf("Vous avez tenté %d fois.\n",coups);
	}
	
	else if( nJoueur != nDevine ){	//si le joueur ne trouve pas le nombre
		printf("\nVous avez perdu ! ");
		printf("Vous n'avez plus de chance :( \n");
	}

	return 0;
}
