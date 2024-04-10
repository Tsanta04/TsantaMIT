#include <stdio.h>

void getData(int* A,int b);
void displayResult(int A[], int b,float m);
void calcMoy(int* A,int b,float* m);

int main (){
	printf("Calcul moyenne les notes des élèves.\n");
	
///Entrée des données
	int A[10];
	float m=0;
	getData(A,10);
	
///Traitements
	calcMoy(A,10,&m);
///Sortie des données
	displayResult(A,10,m);

return 0;
}

///Les fonctions

void calcMoy(int* A,int b,float* m){
	int som=0;
	for(int i=0;i<b;i++){
		som+=*(A+i);
	}
	*m=(float)som/b;
}

void displayResult(int A[], int b,float m){
	printf("Les notes sont:\t");
	for(int i=0; i<b;i++){
		printf("%d, ",A[i]);
	}
	printf("\nLa moyenne ce cet élève est %f.\n",m);
}

void getData(int* A,int b){
	for(int i=0; i<b; i++){
		printf("Entrer A[%d]=\t",i);
		scanf("%d",(A+i));
	}
}

