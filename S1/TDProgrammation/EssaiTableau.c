#include<stdio.h>
int main(){
	printf("Essai Tableau.\n");
	
///ENtrée des données
	int A[10];
	int i=0;
	
	printf("Veuiller entrer les nombres:\n");
	
	for(i=0; i<10; i++){
		printf("A[%d]=\t", i);
		scanf("%d",&A[i]);
	}
	
///Sortie des dnnées
	printf("Les nombres du tableau sont:\n");
	for(i=0; i<10; i++){
		printf("%d\t", A[i]);
	}
return 0;
}
