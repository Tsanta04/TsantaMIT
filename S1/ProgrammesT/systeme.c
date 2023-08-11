#include<stdio.h>
#include<stdlib.h>

int main(){
	printf("Essai système.\n");

///	ENtrée des données
	int n=0;	//Numéro de l'application
	//int d=0;	//Booléen
	printf("Pour lancer des applications ci-dessous, entrer le nombre qui correspond au nom de cette application:\n");
	printf("1: Firefox\n2: Geany\n3: Arranger\n");
	
	while(1){
		printf("Entrer le numéro:\t");
		scanf("%d",&n);
	
///Traitement
	//for (int i=1;i<4;i++){
	
		if(n==1){
			system("firefox&");
		}
		
		else if(n==2){
			system("geany&");
		}
	
		else if(n==3){
			system("Arranger&");
		}
	
///Sortie des données
		if(n==0){
			printf("Erreur!!!\nRetapez.\n");
		}
		
		else if(n>1&&n<4){
			printf("OK!\n");
			break;
		}
		
		else if (n>4){
			printf("Il n'y a pas d'options qui se refère avec ce nombre...\nRetapez.\n");
		}
	}
	
	return 0;
}
