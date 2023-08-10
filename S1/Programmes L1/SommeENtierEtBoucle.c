#include<stdio.h>

int main(){
	printf("Calcul de la somme des n premiers entiers non nul.\n");	//i initialisé-na 1 mba ho confirmé ilay hoe "non nul"

// Entrée des Données
	int n=0,		//Le nombre des premiers entier à entrer
		s=0,		//La somme de ses entiers
		i=12345;		//Compteur
		
			printf("Entrer n=");
			scanf("%d", &n);

// Traitement
		
		//for(;n!=0;){
		while(n!=0){
			
			//ilay initialisation somme afaka atao aty ambony fa tsy voatery hatao ao anty "for"
			
			for (i=1,s=0;i<=n; i++){	
					s+=i;
					printf("i=%d dans la boucle et s=%d\n",i,s);
							
			}
				printf("\ni=%d en dehors de la boucle\n",i);
			
// Sortie des Résultats
		
				printf("La somme des %d premiers entiers est %d\n", n, s);
				printf("Entrer n=");
				scanf("%d", &n);
		}
		
	/*if (n==0){
		for(i=0;i<=n; i++){
						somme+=i;
		}
			printf("Invalide\n");

	}*/
return 0;
}
