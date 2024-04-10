#include<stdio.h>
#include<math.h>

void getData(float *a,float *b,float *c);
void calcDelta(float a,float b,float c,float* delt);
void displayResult(float a,float b,float c,float D,float x1,float x2);
float Rac1(float D,float a,float b);
float Rac2(float D,float a,float b);


int main(){
	printf("La réslution d'une équation de secnd degré.\n");
	
///Enntrée des données
	float a=0, b=0, c=0;
	float D=0;
	float x1=0, x2=0;
	getData(&a,&b,&c);
	
///Traitement
	calcDelta(a,b,c,&D);

	x1=Rac1(D,a,b);
	x2=Rac2(D,a,b);


///Sortie des données
	displayResult(a,b,c,D,x1,x2);
	
return 0;
}

void displayResult(float a,float b,float c,float D,float x1,float x2){
	if(D>=0){
		printf("Les solutions de l'équation %fx² +%fx +%f sont:\nx1=%f\tx2=%f",a,b,c,x1,x2);
	}
	
	else if(D<0){
		printf("Il n'y a pas de solution réelle._n");
	}
}

float Rac1(float D,float a,float b){
	int x1=0;
	x1=(sqrt(D)-b)/(2*a);
return x1;
}


float Rac2(float D,float a,float b){
	int x2=0;
	x2=(sqrt(D)+b)/(2*a);
return x2;
}


void getData(float *a,float *b,float *c){
	printf("Donner la valeur de a, b et c :\t");
	scanf("%f %f %f", a,b,c);
}

void calcDelta(float a,float b,float c,float* delt){
	*delt=(b*b)-(4*a*c);
}
