#include<stdio.h>
#include<math.h>
void displayResult(float a, float b, float c, float delta, float x1, float x2);
float calcDelta(float a, float b,float c);
void resolve(float a, float b, float c, float* delta, float* x1,float* x2);
float resolve1(float a,float b, float c,float* x1,float* x2);
void getData( float* pa, float* pb, float* pc);


int main(){
	printf("Résolution de a*x²+b*x+c=0 dans R.\n");
		
///Données
	float a=0, b=0, c=0;		//Les coeffi. de l'équation
	float x1=0, x2=0;			//Les solutions éventuelles
	float delta=1;				//Le discriminant de l'équation
	int	i=1;					//Compteur
	
	while(i<=3){
		i++;
		getData (&a,&b,&c);			//Pour récuperer des valeurs de a,b,c		
	
///Calcul
		resolve(a, b, c, &delta, &x1, &x2);		// &delta, &x1,&x2: addresse de delta,x1,x2
	//delta= resolve1(a, b,c,&x1,&x2);
/*
	delta = calcDelta(a, b, c);
	
	if(delta>=0){
		x1=(-b-sqrt(delta))/2*a;
		x2=(-b+sqrt(delta))/2*a;
	}
*/
///Sortie
		displayResult(a,b,c,delta,x1,x2);
	}
	return 0;
}


void getData( float* pa, float* pb, float* c){
	printf("Entrer a="); scanf("%f",pa);
	printf("Entrer b="); scanf("%f",pb);	//Tsy mila asiana addresse intsony satria efa addresse ilay a (*a)...
	printf("Entrer c="); scanf("%f",c);
}


float resolve1(float a,float b, float c,float* x1,float* x2){
	float delta1=0;		//POur calculer delta (variable local)
	delta1 = calcDelta(a, b, c);
	
	if(delta1>=0){
		*x1=(-b-sqrt(delta1))/2*a;
		*x2=(-b+sqrt(delta1))/2*a;
	}
	return delta1;
}


void resolve(float a, float b, float c, float* delta, float* x1,float* x2){
	*delta = calcDelta(a, b, c);
	
	if(*delta>=0){
		*x1=(-b-sqrt(*delta))/2*a;
		*x2=(-b+sqrt(*delta))/2*a;
	}
}

float calcDelta(float a, float b,float c){
	float delta=0;
	delta = b*b-4*a*c;
	
	return delta;
}


void displayResult(float a, float b, float c, float delta, float x1, float x2){
	printf("Avec des coefficients \na=%f \nb=%f \nc=%f \n", a,b,c);
	if(delta<0){
		printf("Il n'y a pas de solution réelle.\n");
	}
	else{
	printf("Les solutions sont \nx1=%f \nx2=%f \n", x1,x2); 
	}
}

