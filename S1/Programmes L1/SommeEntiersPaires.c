#include<stdio.h>

void displayResult(int n, int s);
int sumOdd(int s);

int main(){
	printf("Calcul des n premiers entiers impaires.\n");
	
	int //i=0,	//Le compteur
		n=0,	//La limite des entiers
		s=0;	//Le résultat
		
///Entrée de donnée
	printf("Entrer n=");
	scanf("%d",&n);
	
///Calcul

	/*for(i=0,s=0;i<=(2*n);i+=2){
		s+=i;
		//printf("i=%d alors s=%d\n",i,s);
	}*/
	
	s= sumOdd(n);
	
///Sortie de la résultat

	displayResult(n, s);
		
	/*printf("La somme des %d premiers nombres impaires est %d.\n",n,s);*/ 


return 0;

}


///Fonctions

int sumOdd (int n){
	//Calcul des n premiers impairs
	int i=0,s=0;
	for(i=0,s=0;i<=2*n;i+=2){	
			s+=i;
			printf("i=%d alors s=%d\n",i,s);
	}
	printf("\ni finale=%d",i);
	
	return s;
}

void displayResult(int n, int s){
	printf("\nLa somme des %d premiers nombres impaires est %d.\n",n,s); 
}
