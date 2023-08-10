#include<stdio.h>
int main(){
	printf("Lister tous les diviseurs d'un nombre entré\n");
	
///Entrée des données
	int n=0;
	printf("Donner n=");
	scanf("%d",&n);
	
///Traitements
	printf("Les diviseurs sont:\n");
	for(int i=2;i<=n;i++){
		if(n%i==0){
			printf("%d\n",i);
		}
	}

///Sortie des données


return 0;
}
