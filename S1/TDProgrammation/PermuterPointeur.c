#include<stdio.h>
#include<stdlib.h>

int main(){
	printf("Permuter les valeurs par des pointeurs.\n");

///Entrée des données
	int *A;
	A=(int*)malloc(sizeof (int)*2);
	
	printf("Entrer les nombres par son ordre:\n");
	
	for(int i=0;i<2;i++){
		scanf("%d",(A+i));
	}
///Traitement
	int tmp=0;
	tmp=*(A+0);
	*(A+0)=*(A+1);
	*(A+1)=tmp;
	
///Sortie des données
	printf("Les valeurs sont:\n");
	for(int i=0;i<2;i++){
		printf("%d\t",*(A+i));
	}
	
return 0;
}
