#include<stdio.h>
#include<stdlib.h>
#include<time.h>

int main (){
	printf("Les nombres aléatoires.\n");
	
///initialisation du générateur de nombre alétoire
	srand(time(NULL));
	//srand(2);
	printf("time=%ld\t\t", time(NULL));
	printf("RAND_MAX=%d\n",RAND_MAX);
	
///Générer 10 nombres pseudo-aléatoire <RAND_MAX
	for (int i=0;i<10;i++){
		printf("%d\t",rand());
	}

///Pour générer des nombres entre 1 et 100: cf.Numerical Recipes
	printf("\n\nNombres entre 0 et 100.\n");
	for (int i=0;i<10;i++){
		printf("%d\t", 1+ (int)(100.0*rand() / (RAND_MAX + 1.0)));	
	}
	
///Pour générer des nombres entre 1 et 100: Autre méthode
	printf("\n\nNombres entre 0 et 100.\n");
	for (int i=0;i<10;i++){
		printf("%d\t", (int)(100.0*rand() / (RAND_MAX)));
	
	}

	printf("\n\nNombres entre 0 et 1.\n");
	for (int i=0;i<10;i++){
		printf("%f\t",(float)( rand() / (RAND_MAX) ));	
	}
	
	return 0;
}
