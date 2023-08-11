#include<stdio.h>
#define pi 3.14

int main(){
	printf("Périmètre d'un cercle.\n");
		float d=0;	//Diamètre (entrée)
		float P=0;	//Le périmètre
		
//Entrée des données
	printf("Entrer le diamètre en centimètre: ");
	scanf("%f",&d);
	
//Traitement
	P=d*pi;
	
//Sortie de résultat
	printf("Le périmètre du cercle de diamètre %f est %f;\n",d,P);
	
return 0;
}
