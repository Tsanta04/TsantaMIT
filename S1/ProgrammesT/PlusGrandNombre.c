#include<stdio.h>

int main(){
	printf("Montrer le nombre le plus grand parmis les 10 nombres.\n");
	
///ENtrée des données
	int n=1,	//Les nombres à entrer
		Max=n,	//Le plus grand ( le résultat)
		i=0,	//Compteur
		Pos=0;	//La position
		
	for(i=1;n!=0;i++){
		
		printf("Entrer le nombre numéro %d:",i);
		scanf("%d",&n);
		
		if(n>Max){
			Max=n;
			Pos=i;
		}
	}
	
///Sortie des données
	printf("Le plus grand nombre est %d.\n Sa position est %d.\n",Max,Pos);
	
return 0;
}
