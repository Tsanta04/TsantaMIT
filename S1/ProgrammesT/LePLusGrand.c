#include <stdio.h>
void getData(int* n);
//void displayResult(int PG);
void displayResult1(int PP);

int main (){
	printf("Montrer le plus grand nombre.\n");
	
///Entrée des données
	int n=12345677,	//Les nombres à entrée
		PP=n;	//Le plus petit nombre
/*
		PG=n;	//Le plus grand nombre
*/
	
///Traitement
	while(n!=123456){
/*
		getData(&n);
		if(n>PG){
			PG=n;
		}
	}
*/
		getData(&n);
		if(n<PP){
			PP=n;
		}
	}

///Sortie des données
	//displayResult(PG);
	displayResult1(PP);
	
return 0;
}

void displayResult1(int PP){
	printf("Le nombre plus petit est %d.\n",PP);
}

/*
void displayResult(int PG){
	printf("Le nombre plus grand est %d.\n",PG);
}
*/

void getData(int* n){
	printf("Entrer n=");
	scanf("%d",n);
}
