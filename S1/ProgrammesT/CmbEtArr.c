#include<stdio.h>

int main(){
	printf("Calcul d'arrangement et de combinaison.\n");

///Entrée des données
	int n=0, p=0;
	int comb=1, arra=1;
	int i=0,
		perm=1;
	
	printf("Entrer n=\t");
	scanf("%d",&n);
	printf("Entrer p=\t");
	scanf("%d",&p);
	
///Traitement

	for(i=(n-p+1);i<=n;i++){	//i allant de n-p+1 à n => n(n-1)(n-2)...(n-p+1) (de terme p) 
		arra*=i;
	}
	
	for(i=1;i<=p;i++){
		perm*=i;
	}
	comb=arra/perm;

///Sortie des données
	printf("La combinaison de %d d'ordre %d est %d.\n",n,p,comb);
	printf("L'arrangement de %d d'ordre %d est %d.\n",n,p,arra);
	
	return 0;
}
