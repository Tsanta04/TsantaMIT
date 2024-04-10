#include<stdio.h>
int main(){
	/*printf("Calculer l'arrangement de n d'ordre p.\n");*/
	printf("Calculer la combinaison de n d'ordre p.\n");
	
///ENtrée des données
	int n=0,	/* le nombre n d'ordre p*/
		p=0,
		i=0,	//Compteur
		
		u=0,	//Calcul p!
		x=0,	//Calcul de n!
		y=0,	//Calcul de n-p
		z=1;	//Calcul de y!
		
	
	float A=0;	//Le résultat l'arrangement
		
	printf("Entrer n et p.\n");
	scanf("%d %d",&n,&p);
	
///Boucle
	while(n!=0||p!=0){
	
///Traitement
	if(n>p){
		for(i=1, x=1;i<=n;i++){
			x*=i;
		}
		
		for(i=1,u=1;i<=p;i++){
			u*=i;
		}
	
		y=n-p;
	
		for(i=1,z=1;i<=y;i++){
			z*=i;
		}
		
		A=x/(u*z);
	
///Sortie des données
		/*printf("L'arrangement de %d d'ordre %d est %f.\n",n,p,A);*/
		printf("La combinaison de %d d'ordre %d est %f.\n",n,p,A);
	}
	
	else if(p>n){
		printf("C'est impossible.\n");
	}
///Boucle
		printf("Entrer n et p.\n");
		scanf("%d %d",&n,&p);
	}

return 0;
}
