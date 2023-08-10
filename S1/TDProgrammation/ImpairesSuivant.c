#include<stdio.h>
void getData(int* n);
void displayResult();

int main(){
	printf("Lister les 3 nombres paires suivant le nombre entré.\n");

///Entrée des données
	int n=0;
	getData(&n);

///Traitements et sortie des données
	displayResult();

	if(n%2==0){
		for(int i=n+1;i<=n+5;i+=2){
			printf("%d\t",i);
		}
	}
	
	else if((n%2)!=0){
		for(int i=n+2;i<=n+6;i+=2){
			printf("%d\t",i);
		}
	}

return 0;
}

void displayResult(){
	printf("Les 3 nombres impaires suivants sont:\n");
}

void getData(int* n){
	printf("Entrer n=");
	scanf("%d",n);
}
