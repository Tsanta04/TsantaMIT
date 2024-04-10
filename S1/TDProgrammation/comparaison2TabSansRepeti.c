#include <stdio.h>

void entrerTab(int A[], int a);
void arranger(int A[],int a);
int comparer(int A[], int a, int B[], int b);
void displayResult(int booleen);

int main(){
	printf("Comparaison des deux tableaux dont chacuns n'ont pas de valeurs qui se répètent.\n");

///Entrée des données
	int A[3];		//Le premier tableau à comparer
	int B[3];		//Deuxième tableau à comparer
	int booleen=0;	//Valeur à rendre pour savir s'ils sont similaires ou différents
	
	entrerTab(A,3);
	entrerTab(B,3);
	
///Traitement

	arranger(A,3);
	arranger(B,3);


	booleen=comparer(A,3,B,3);
	
///Sortie des données
	
	displayResult(booleen);

return 0;
}

///Les fonctions

void displayResult(int booleen){
	if(booleen==3){	//Si cette valeur est 10, c'est à dire "c" a  tjrs returné la valeur 1 (10fois)=>tous les valeurs sont égaux
		
		printf("\n=> D'où ces deux tableaux sont identiques.\n");
	}
	
	else{
		printf("\n=> D'où ces deux tableaux ne sont pas identiques.\n");
	}
}

int comparer(int A[], int a, int B[], int b){
	int c=0;	//valeur à retourner si les deux valeurs des tableaux snt identiques
	int d=0;	//Somme de c
	
	printf("\nLes élements communs sont:\n");
	for(int i=0;i<a;i++){
		for(int j=0;j<b;j++){
			if(A[i]==B[j]){
				printf("%d - ",A[i]);
				c=1;
				d+=c;
			}
		}
	}
			
	printf("\nLes élements différents sont:\n");
	for(int i=0;i<a;i++){
		for(int j=0;j<b;j++){
			if(A[i]!=B[j]){
				printf("%d - ",A[i]);
				c=0;
			}
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
