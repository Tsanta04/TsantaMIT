#include<stdio.h>

int main(){
	printf("Calcul de la somme des n entiers non nul.\n");	//Ce que je vais faire
	
//Entrée des données
	
	int n=0,		//La limite de la somme 
		somme=0;	//La somme à calculer
	int i=0;		//un compteur (l'entier à cumuler)

		
	printf("Entrer n non nul : ");
	scanf("%d",&n);
	
//Calcul ou traitement
	//while(n!=0){
		for(i=1, somme=0; i<=n; i++){
			somme += i;
		}
		printf("La somme des %d premiers entiers = %d.\n",n,somme);
		/*printf("Entrer n non nul : ");
		scanf("%d",&n);
	
	}*/

//Sortie des résultats

	/*printf("Pour n=%d\n\t La somme de 1+2+...n=%d\n", n, somme);*/

		
	return 0;
}
