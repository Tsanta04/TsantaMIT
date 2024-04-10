#include<stdio.h>
int main(){
	printf("Arranger par ordre croissant les nombres à entrer.\n");
	
///Entrer des données
	int A[10];
	int i=0, j=0, tmp;
	
	printf("Veuiller entrer les nombres:\n");
	
	for(i=0; i<10; i++){
		printf("A[%d]=\t", i);
		scanf("%d",&A[i]);
	}
	
///Traitement
	for(i=0; i<10; i++){
		for(j=i+1; j<10; j++){
			if(A[i]>A[j]){
				tmp=A[i];
				A[i]=A[j];
				A[j]=tmp;
			}
		}
	}
///Sortie des données
	printf("Les nombres sont:\n");
	for(i=0;i<10;i++){
		printf("%d\t", A[i]);
	}
	
return 0;
}
