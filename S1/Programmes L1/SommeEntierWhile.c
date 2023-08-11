#include<stdio.h>

int main(){
	printf("Calculer la somme des n premiers nombres entiers.\n"); 

///Entrée des données
	int n=0,	//La limite(n à entrée)
		s=0,	//Le  résultat (la somme)
		i=0;	//Le compteur
		
	printf("ENtrer n=");
	scanf("%d",&n);
	
///Traitement
	while(i<n){
		i++;
		s+=i;
		printf("i est %d.\n",i);
	}
	
///Sortie des données
	printf("La somme des %d premiers entiers est %d.\n",n,s);
	
return 0;
}
