#include <stdio.h>
int main (){
	printf("Calcul de la racine carré de n.\n");
	
	float n=0, r=0;
	
	printf("Entrer n=");
	scanf("%f",&n);
	
	while(1){
		float i=0;
		printf("Entrer i pour trouve sa racine i=");
		scanf("%f",&i);
		if(n!=i*i){
			printf("Non;\n");	
			printf("Entrer i=");
			scanf("%f",&i);
		}
		else{
			break;
			r=i;
		}
	}	
		
	printf("La racine carrée et %f.\n",r);
	
return 0;
}
