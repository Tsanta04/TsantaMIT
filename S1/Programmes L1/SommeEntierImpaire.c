#include<stdio.h>
void displayResult(int n, int s);
int sumOdd(int n);


int main(){
	printf("Calcul des n premiers nombres impaires.\n");	//Ce que je vais faire
	int n=0,	//Nombre n (entrée)
		/*i=0,	//Compteur
		k=0,	// intermédiaire*/
		s=0;	//la somme (le résultat)
		
///Entrée des données
	printf("Entrer n=");
	scanf("%d",&n);
	
///Calcul

	//for(;n>=0;){
		/*for(i=1,k=0, s=0;i<=n ;i++){
			k=((2*i)-1);
			s+=k;
		}*/
		s=sumOdd(s);
	
///Sortie des résutats

	displayResult(n,s);
	
		/*printf("La somme des %d  premiers nombres impaires est %d.\n",n,s);
		
		printf("Entrer à nouveau n.\nn=");
		scanf("%d",&n);
		
	}*/
	
return 0;
}


void displayResult(int n, int s){
	printf("La somme des %d  premiers nombres impaires est %d.\n",n,s);
}

int sumOdd(int n){
	int i=1, k=0, s=0;
	for(i=1,k=0,s=0;i<=n;i++){
			k=((2*i)-1);
			s+=k;
	}
	return s;
}
