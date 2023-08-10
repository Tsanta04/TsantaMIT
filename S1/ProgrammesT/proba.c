#include<stdio.h>
float Arr(int n,int p);
float Comb(int n,int p);
void DisplayResult(int n, int p, float A, float C);

int main(){
	
	printf("Je vais connaître la chance de gagner sur ce jeu.\n");
///Entrée des données

	int n=0,	/* le nombre n d'ordre p*/
		A=0,	//Arrangement
		C=0,	//Combinaison
		p=0;
		
	printf("Entrer n et p.\n");
	scanf("%d %d",&n,&p);
	
///Traitement
	A=Arr(n,p);
	C=Comb(n,p);
	
///Sortie des données
	DisplayResult(n,p,A,C);

return 0;
}





float Arr(int n,int p){
///ENtrée des données
	int i=0,	//Compteur
		
		x=0,	//Calcul de n!
		y=0,	//Calcul de n-p
		z=1;	//Calcul de y!
		
	
	float Arr=0;	//Le résultat l'arrangement
		
	
///Traitement
	if(n>p){

		for(i=1, x=1;i<=n;i++){
			x*=i;
		}
		
		y=n-p;
	
		for(i=1,z=1;i<=y;i++){
			z*=i;
		}	
		
		Arr=x/z;
	}

return Arr;
}


float Comb(int n,int p){
///ENtrée des données
	int i=0,	//Compteur
		
		u=0,	//Calcul p!
		x=0,	//Calcul de n!
		y=0,	//Calcul de n-p
		z=1;	//Calcul de y!
		
	
	float Comb=0;	//Le résultat l'arrangement
		
	
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
		
		Comb=x/(u*z);
	}
return Comb;
}

void DisplayResult(int n, int p,float A, float C){
	if(n>p){
		printf("Dans l'ordre,tu as une chance sur %f de gagner.\nDans le désordre, tu as une chance sur %f de gagner.\n",A,C);
	}
	else if(n<p){
		printf("C'est impossible, il y a un erreur.");
	}
}
