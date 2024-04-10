#include<stdio.h>
int main (){
	
	//printf("Les nombres paires entre 0 et 100.\n");

///Traitement
/*
	int i=0;
	for(i=1;i<=100;i+=2){
		printf("%d\n",i);
	}
*/
/*
	int i,n=100,p=0;
	
	for(i=0;i<n/2;i++){
		p=2*i+1;
		printf("%d\n",p);
	}
*/
	
	int i=1;
	
	while(i<100){
		i+=2;
		printf("%d\n",i);
	}
		
return 0;
}
