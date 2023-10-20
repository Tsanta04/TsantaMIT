#include<stdio.h>
#include<math.h>
#include"fn.h"

int main(){
	
	///Les variables
	float a=0,b=0;
	float eps=0;
	float resultat=0.0;

///Entree de donnee
	lesDonnees(&a,&b,&eps);
	
///Traitement et sortie des donnees
	printf("\tCalcul d'integrale Carre\n\n");
	resultat=integraleC(a,b,eps);
	printf("\tCalcul d'integrale Trapeze\n\n");
	resultat=integraleT(a,b,eps);
//	printf("\nFinal result = %f\n",resultat);
	return 0;
}
