#include<stdio.h>
void getData(int* n);

int main(){
	printf("La table de la multiplication.\n");
	
///Entrée des données
	int n=0, m=0;	//La table à rechercher
	
	getData(&n);

///Traitement
	for(int i=0;i<=10;i++){
		m=n*i;
		printf(" %d * %d = %d\n",n,i,m);
	}

///Sortie des données


}

void getData(int* n){
	printf("Donner n=");
	scanf("%d",n);
}
