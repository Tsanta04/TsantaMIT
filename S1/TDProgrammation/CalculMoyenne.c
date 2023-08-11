#include<stdio.h>
int main(){
	printf("Calcul de la moyenne:\n");
	
///Entrer des données
	int A[4];
	int i=0,s=0;
	float moyenne=0;
	
	printf("Veuiller entrer les nombres:\n");
	
	for(i=0; i<4; i++){
		printf("A[%d]=\t", i);
		scanf("%d",&A[i]);
	}

///Traitement
	for(i=0; i<4; i++){
		s+=A[i];
	}
	moyenne=(float)s/4;

///SOrtie des données
	printf("La moyenne des nombres entrés est %f\n", moyenne);

return 0;
}
