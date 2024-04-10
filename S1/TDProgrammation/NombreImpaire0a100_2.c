#include <stdio.h>
int main(){
	printf("Je vais afficher les nombres impaires de 0 à 100.\n");
	int i,n=100,p=0;
	
	for(i=0;i<n/2;i++){
		p=2*i+1;
		printf("%d\n",p);
	}
return 0;
}
