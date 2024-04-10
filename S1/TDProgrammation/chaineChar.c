#include<stdio.h>

//void afficher( char tab[]);

int main (){
	printf("Essai chaîne de caractère.\n");
	
///ENtrée des données
/*
	char	janvier[10]="janvier",
			fevrier[10]="fevrier",
			mars[10]="mars",
			avril[10]="avril",
			mai[10]="mai",
			juin[10]="juin",
			juillet[10]="juillet",
			aout[10]="aout",
			septembre[10]="septembre",
			octobre[10]="octobre",
			novembre[10]="novembre",
			decembre[10]="decembre";
*/
	char* mois[12]={"janvier","fevrier","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","decembre"};
	
	int n=1;	//Le numéros
	
	while (n!=0&&n<12){
		printf("Entrer le numéros pour afficher le mois qui correspond avec:\t");
		scanf("%d", &n);
	
///Traitement
		printf("%s\n",mois[n-1]);
	}
	
	
	if(n==0||n>12){
		printf("Aucun mois correspond avec ce nombre.\nEssayer un autre:\t");
	}
	
/*
	if(n==0||n>12){
		printf("Aucun mois correspond avec ce nombre.\nEssayer un autre:\t");
		scanf("%d", &n);
	}
	
	else if(n==1){
		afficher(janvier);
	}
	
	else if(n==2){
		afficher(fevrier);
	}
	
	else if(n==3){
		afficher(mars);
	}
	
	else if(n==4){
		afficher(avril);
	}
	
	else if(n==5){
		afficher(mai);
	}
	
	else if(n==6){
		afficher(juin);
	}
	
	else if(n==7){
		afficher(juillet);
	}
	
	else if(n==8){
		afficher(aout);
	}
	
	else if(n==9){
		afficher(septembre);
	}
	
	else if(n==10){
		afficher(octobre);
	}
	
	else if(n==11){
		afficher(novembre);
	}
	
	else if(n==12){
		afficher(decembre);
	}
*/

///SOrtie des données
	
	return 0;
}

///Les fonctions
/*
void afficher(char tab[]){
	for(int i=0;strlen(tab);i++){
		printf("%c",tab[i]);
	}
}
*/
