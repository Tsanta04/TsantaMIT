#include<stdio.h>
#include<stdlib.h>
int main(){
	printf("Entrer un tableau à partir d'un pointeur.\n");
	
///ENtrée des données
	int n=0;
	
	printf("Entrer n=\t");
	scanf("%d",&n);
	
	int* b;
	b=(int*)malloc(sizeof(int)*n);	//initialisation
	
	for (int i=0;i<n;i++){
		printf("Entrer la valeur %d:\t",i);
		scanf("%d",&b[i]);			//&b[i]=(b+i) : iray ihany ireo
	}
	
		printf("Les valeurs sont:\n");
		for (int i=0;i<n;i++){
			printf("%d, ", b[i]);	//b[i]=*(b+i) : iray ihany ireo
		}
		
return 0;
}
