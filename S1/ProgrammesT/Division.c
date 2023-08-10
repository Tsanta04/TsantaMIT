#include<stdio.h>
void getData(int* a,int* b, int *x);
void ValDiv(int a,int b,float* Div);
void displayResult(int a, int b, float Div);

int main(){
	
	printf("Division des 2entiers.\n");
///Entrée des données
	int a=0, b=0;	//les 2 entiers
	float Div=0;	//La valeur de la division
	int x=0;	//pour la valeur de scanf
	
	getData(&a,&b,&x);
	 
///Traitement
	ValDiv(a,b,&Div);

///Sortie des données
	displayResult(a,b,Div);

return 0;
}

void displayResult(int a, int b, float Div){
	if(b==0){
		printf("On obtient l'infinité du résultat.\n");
	}
	
	else if(b!=0){
		printf("La valeur de la division %d par rapport à %d est %f.\n",a,b,Div);
	}
}


void ValDiv(int a,int b,float* Div){
	*Div=(float)a/b;
}
	

void getData(int* a,int* b,int *x){
	printf("Enter a="); scanf("%d",a);
	printf("Enter b="); scanf("%d",b);
}
