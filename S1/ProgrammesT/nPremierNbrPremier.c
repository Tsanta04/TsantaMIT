#include<stdio.h>
#include<stdlib.h>

void getData(int *pn);
void displayResult(int* A,int n);

int main(){
	printf("Les n premiers nombres premiers.\n");
	
	///Entrée des données

	int n=0;
	getData(&n);
/*	
	int A[n];	//tsy mety fa raha ampiditra valeur avy n'scannéna dia pointeur no ampiasaina
*/
	while (n!=0){

		int* A;				//pointeur pour stocker les nombres premiers
		int i=0,j=0,k=0;	//compteurs des boucles utilisés au-dessous
		int b=0,c=0;		//valeurs utilisées pour vérifier un nombre s'il est un nombre premier
		A=(int*)malloc(sizeof(int)*n);
	
	///Traitement
		//displayResult(A,n);
		
		for(i=2,b=0,k=-1;k<n;i++){
			c=0;
			for(j=1;j<=i;j++){
				b=i%j;
				if(b==0){
					c+=j;
				}
			}
		//	printf("\nc=%d\n",c);
			if (c==(i+1)){
				k++;
				*(A+k)=i;
			}
		}
		
	///Sortie des données
		displayResult(A,n);
	
	///ENtrée des données
		getData(&n);
		
	}
	
return 0;
}

///Les fonctions

void displayResult(int* A, int n){
	printf("Les %d premiers nombres premiers sont:\n",n);
	for(int i=0,j=1;i<n&&j<=n;i++,j++){
		printf("(%d): %d\n",j,*(A+i));
	}	
}

void getData(int *pn){
	printf("Entrer n=\t");
	scanf("%d", pn);
}

