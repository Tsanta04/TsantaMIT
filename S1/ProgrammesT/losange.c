#include<stdio.h>

int main(){
	printf("Losange\n\n");
	//char izy[2]="\t";
	//char etoile[6]="******";
	int n=0;
	int k=5;
///Triangle
	for(int i=0;i<=5;i++){
		for(int j=0;j<=k;j++){
			printf(" ");
		}
		for(int j=0;j<=(2*n);j++){
			//printf("%c",*(etoile+j));
			printf("*");
		}
		n++;
		k--;
		printf("\n");
	}
		//*(izy)=*(izy)-9;
		//*(etoile)=*(etoile)+'*';
	
///Triangle inversé
	n=0;
	k=8;
	for(int i=0;i<=5;i++){
		for(int j=0;j<=(n+1);j++){
			printf(" ");
		}
		for(int j=0;j<=k;j++){
			//printf("%c",*(etoile+j));
			printf("*");
		}
		n++;
		k-=2;
		printf("\n");
	}
		
	
	return 0;
}
