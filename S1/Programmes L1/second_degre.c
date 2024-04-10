#include<stdio.h>
#include<math.h>

int main(){
	printf("Resoudre l'équation ax²+bx+c=0\n");	//Ce que je vais faire
	
///Entrée de données

	float	a=1 , b=-3,c=9;	// a,b,c les données du problème
	float	x1=0, x2=0;		//x1,x2 les résultats		
	float	delta=1;
	
///Calculs des solutions
/*
	printf("le delta est %f",delta);
*/
	delta = b*b - 4*a*c;
	
	
	if (delta>=0){
		x1=(-b+sqrt(delta))/2*a;
		x2=(-b-sqrt(delta))/2*a;
		
			//printf("Cette équation admet deux solutions réelles.\nx1=%d\nx2=%d.\n",x1,x2);
	}
	
	else{
		printf("Il n'y a pas de solution réelle.\n");
	}

///Sortie de données
	if (delta>=0){
		printf("Les solutions sont:\n");
		printf("x1=%f\n x2=%f\n", x1, x2);
	}
	return 0;
}

	
