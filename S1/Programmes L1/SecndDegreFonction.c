#include<stdio.h>
#include<math.h>

float delt(int a, int b, int c);
void calculSol(int a, int b, float delta);

int main(){
	printf("Resoudre l'équation ax²+bx+c=0\n");	//Ce que je vais faire
	
///Entrée de données

	int	a=0, b=0,c=0;	// a,b,c les données du problème
	//float	x1=0, x2=0;		//x1,x2 les résultats		
	float	delta=0;

	printf("Entrer a b c\n");
	scanf("%d %d %d",&a, &b, &c);
	
///Traitement
	/*delta = b*b - 4*a*c;*/
	delta=delt(a,b,c);

///SOrtie de résultat	
	printf("delta=%f",delta);
	calculSol(a,b,delta);
	
	/*if (delta>=0){
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
	}*/
	return 0;
}

void calculSol(int a, int b, float delta){
	if (delta>=0){
		float	x1=0, x2=0;
		x1=(-b+sqrt(delta))/2*a;
		x2=(-b-sqrt(delta))/2*a;
	
		printf("Les solutions sont:\n");
		printf("x1=%f\n x2=%f\n", x1, x2);
	}
	
	else{
		printf("Il n'y a pas de solution réelle.\n");
	}		
}
	
float delt(int a, int b, int c){
	float delta=0;
	delta = b*b - 4*a*c;
	
	return delta;
}
