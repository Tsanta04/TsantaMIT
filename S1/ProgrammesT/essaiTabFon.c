#include<stdio.h>
void entrerTableau(int *A, int a);
void afficherTableau(int A,int a);

int main(){
	printf("Essai fonction tableau.\n");

///Entrée des données
	int A[10];
	entrerTableau(A,10);

///Sortie des données
	//afficherTableau(A,10);
	
return 0;
}

/*
void afficherTableau(int A,int a){
	printf("Alors ce tableau contient:\n");
	for(int i=0;i<a;i++){
		printf("%d\t",A[i]);
	}
}
*/
3
void entrerTableau(int *A, int a){
	for(int i=0; i<a; i++){
		printf("Entrer = ");
		scanf("%d",(A+a));
	}
}
