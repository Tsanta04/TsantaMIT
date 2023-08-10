#include<stdio.h>
#define pi 3.14

int main(){
	printf("Calcul de la circonférence\n");
	float	rayon=1,			// le rayon dy cercle
			circonference=0;	// la circonférence du cercle
	
// Entrée de données
	printf("Entrez le rayon du cercle\n");
	scanf("%f",&rayon);
	
// Traitement
	circonference=2*pi*rayon;
	
// Sortie de données

	printf("Mon rayon est %f\nMa circonférence est %f",rayon, circonference);
	
	return 0;
}
