#include<stdio.h>
int main(){
	printf("\tCALCULATRICE\n");
	
///ENtrée des données
	float x=0, y=0;
	char* c=0;
	float sol=0;
	
	printf("Entrer le calcul que vous voulez calculer:\n");
	scanf("%f %c %f",&x,c,&y);
	
	printf("%c",*c);
		
///Traitement
	if(*c == '+'){
		sol=x+y;
	}
///Sortie des données
	printf("Solution=%f",sol);

	return 0;
}

