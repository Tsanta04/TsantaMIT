#include<stdio.h>
void getData(int *a, int*n);

int main(){
	printf("Clacul a^n.\n");
	
///ENtrée des données
	int a=0, n=0,x=1;
	getData(&a,&n);
	
///Traitement
	for(int i=1;i<=n;i++){
		x*=a;
	}
		
///Sortie des données
	printf("ALors %d^%d est %d.\n",a,n,x);
	

	return 0;
}


void getData(int *a, int*n){
	printf("Donner a=\t");
	scanf ("%d",a);

	printf("Donner n=\t");
	scanf ("%d",n);
	
}

	
