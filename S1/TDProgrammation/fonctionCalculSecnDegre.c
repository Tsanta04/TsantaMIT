#include<stdio.h>

void getData(float* a,float *b,float *c, float *x);
void displayResult(float a, float b, float c, float x, float y);
float calcValeur(float a,float b,float c, float x);

int main(){
	printf("Calcul de la solution a*x²+b*x+c=0");

///Entrée des données
	float a=0,b=0,c=0;	//les données d'entrée
	float x=0, y=0;	//Les données de sortie
	
	getData(&a,&b,&c,&x);
	
///Traitement
	y=calcValeur(a,b,c,x);
	
///Sortie des données
	displayResult(a, b, c ,x,y);
	
return 0;
}

///Les fonctions

float calcValeur(float a,float b,float c, float x){
	float y=0;
	y=(a*x*x)+(b*x)+c;
return y;
}
	
void displayResult(float a, float b, float c, float x,float y){
	printf("Le résultat du calcul %f * %f²+ %f *%f + %f est %f.\n",a,x,b,x,c,y);
}
	
void getData(float* a,float *b,float *c, float *x){
	printf("Entrer a,b,c et x:\t");
	scanf("%f %f %f %f", a,b,c,x);
}
