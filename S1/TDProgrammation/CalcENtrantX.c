#include<stdio.h>
int main(){
	printf("Le calcul de 4*x²+10x+5\n");
	int i=1;
///Entrée des données
	while(i<5){
		i++;
		float x=0, y=0;
		printf("Entrer x=");
		scanf("%f",&x);
	
///Traitement
		y=(4*x*x)+(10*x)+5;
	
///Sortie des données
		printf("Alors le résultat est %f.\n",y);
	}
	
return 0;
}
