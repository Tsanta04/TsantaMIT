#include<stdio.h>

int main(){
	printf("Montrer le plus grand.\n");
	
///Entreé des données
	int n=0,pos=0, poss=0,	//Les nombres à entrer
		max=n,	//Le nombre le plus grand
		min=n,	//Le nombre le plus grand
		i=1;	//COmpteur
			
	printf("Entrer le nombre numéro %d=",i);
	scanf("%d",&n);
		max=min=n;
///Traitement
	for(i=2;i<=3;i++){
	
		printf("Entrer le nombre "); //numéro %d:",i);
		scanf("%d",&n);
		
		if(n>max){
			max=n;
			pos=i;
		}
				
		if(n<min){
			min=n;
			poss=i;
		}
	}
	
///La sortie des données
	
	printf("Le plus grand entré en n=%d est %d.\n",pos,max);
	printf("Le plus petit entré en n=%d est %d.\n",poss,min);
	
return 0;
}

///diso
