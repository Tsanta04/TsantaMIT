#include <stdio.h>

void entrerTab(int A[], int a);
void arranger(int A[],int b);
int comparer(int A[], int a, int B[], int b);
void displayResult(int booleen, int a);

int main(){
	printf("Comparaison des deux tableaux.\n");

///Entrée des données
	int A[10];		//Le premier tableau à comparer
	int B[10];		//Deuxième tableau à comparer
	int booleen=0;	//Valeur à rendre pour savir s'ils sont similaires ou différents
	
	entrerTab(A,10);
	entrerTab(B,10);
	
///Traitement

	arranger(A,10);
	arranger(B,10);

	booleen=comparer(A,10,B,10);
	
///Sortie des données
	
	displayResult(booleen,10);

return 0;
}

///Les fonctions

void displayResult(int booleen, int a){
	if(booleen==a){		//Si cette valeur est 10, c'est à dire "c" a  tjrs returné la valeur 1 (10fois)=>tous les valeurs sont égaux
		
		printf("Ces deux tableaux sont identiques.\n");
	}
	
	else{
		printf("Ces deux tableaux ne sont pas identiques.\n");
	}
}

int comparer(int A[], int a, int B[], int b){
	int c=0;	//valeur à retourner si les deux valeurs des tableaux snt identiques
	int d=0;	//Somme de c
	for(int i=0,j=0;i<a&&j<b;i++,j++){
		if(A[i]==B[j]){
			c=1;
			d+=c;
		}
	}

return d;
}

void arranger(int A[],int a){
	int tmp=0;
	for(int i=0;i<a;i++){
		for(int j=i+1;j<a;j++){
			if(A[i]>A[j]){
				tmp=A[i];
				A[i]=A[j];
				A[j]=tmp;
			}
		}
	}	
}

void entrerTab(int A[], int a){
	printf("\nEntrer le contenu du tableau.\n");
	for(int i=0; i<a;i++){
		printf("Entrer tab[%d]=\t",i);
		scanf("%d",&A[i]);
	 }
}
