#include<stdio.h>

int sumNum(int n);
void displayResult(int n, int s);

int main(){
	printf("Calcul de la somme des n premiers entiers non nul.\n");	
	
	
// Entrée des Données
	int n=0,		//Le nombre des premiers entier à entrer
		s=0;		//La somme de ses entiers
		
			printf("Entrer n=");
			scanf("%d", &n);

// Traitement
		while(n!=0){
			s=sumNum(n);
			displayResult(n,s);
		}
// Sortie des Résultats
		
		
	/*if (n==0){
		for(int i=0;i<=n; i++){
						s+=i;
		}
			printf("Invalide\n");

	}*/
return 0;
}


int sumNum(int n){
	int s=0;
	for (int i=1;i<=n; i++){	
		s+=i;
		printf("i=%d dans la boucle et s=%d\n",i,s);
	}
	return s;
}
			
void displayResult(int n, int s){
		printf("La somme des %d premiers entiers est %d\n", n, s);
		printf("Entrer n=");
		scanf("%d", &n);
}
