#include<stdio.h>

int main(){
	printf("Determiner si a et b sont opposés ou inverses.\n");

///Entrée des données
	float a=0,
		b=0;

	printf("Entrer a et b.\n");
	scanf("%f %f",&a,&b);
	
///Traitement
	while(a!=0&&b!=0){
		
		if( (a+b==0)||(a*b==1) ){
			printf("Vrai.\n");
		}
		
		else{
			printf("Faux.\n");
		}

		printf("Entrer a et b.\n");
		scanf("%f %f",&a,&b);
	}
	
return 0;
}
