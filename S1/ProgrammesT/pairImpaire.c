#include<stdio.h>

int main(){
	
	printf("Dire si n est paire ou impaire.\n");
	
///Entrée des données
	int n=0;	//l'entier à entrer
	
	printf("Entrer n=");
	scanf("%d",&n);
	
	while (n!=0){
	
///Traitement
		if(n%2==0){		//% calcule le reste de la  division  
			printf("Le nombre est paire.\n");
			printf("Entrer n=");
			scanf("%d",&n);
		}
		
		else{
			printf("Le nombre est impaire.\n");
			printf("Entrer n=");
			scanf("%d",&n);
		}
	}
	if (n==0){
		printf("Oh noo!!");
	}
return 0;
}
