#include<stdio.h>
#include<math.h>
#include"fn.h"


int main(){
	printf("\n La fonction: f(x)=ln(x)-1\n\n");

///Les variables
	float a=0,b=0;
	float eps=0;
	//double resultat=0.0;

///Entree de donnee
	lesDonnees(&a,&b,&eps);
	
///Traitement et sortie des donnees
	newton(a,b,eps);
	//printf("\nFinal result = %f\n",resultat);
	return 0;
}
