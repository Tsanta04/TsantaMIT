#include<stdio.h>
int main(){
		printf("essai calcul très long.\n");
	
	long	x=500000,y=1000,
			z=0;
	z=x*y;		//la valeur exacte obtenu par ce calcul ne peut pas stocker que dans la variable de type long (-2.147.483.648 à 2.147.483.647)  
	
	printf("%ld",z);		
	
	return 0;
}
