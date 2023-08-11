#include<stdio.h>
void getArray(int* tableau, int a);
void displayResult1(int* tableau1,int* tableau2, int a);
void displayResult(int* tableau,int a); 

int main (){
	printf("Retirer un élement du tableau.\n");

///Variables
	int	tab1[10],	//le tableau
		n=0;		//élement entré
	int scan=0;		//La valeur de scanf	
			
///Entrée des données
	printf("Entrer les élements du tableau:\n");
	getArray(tab1,10);
	

	printf("\nEntrer l'élement que tu veux en retirer:\t");
	scan=scanf("%d",&n);
	
///Traitement
	while(scan==1){
	///Les autres variables
	
		int	tab2[10];	//tableau déjà filtré
		int a=0,		//Test existence et dimension de taba
			k=0,		//Dimension du tab2
			i=0;		//dimension de tabb
		int taba[10]={0,0,0},	//tableau des indices des élements rétiré
			tabb[10]={0,0,0};	//tableau des indices des élements existant 
	

		for (i=0;i<10;i++){
			if( n==tab1[i] ){
				taba[a]=i;
				a++;
			}
		}
	
		if(a>=1){
			for (i=0;i<10;i++){
				if(tab1[i]!=n){
					tab2[k]=tab1[i];
					tabb[k]=i;
					k++;
				}
			}
		}

	
///Sortie des données
		if(a==0){
			printf("Cet élement est déjà exclu du tableau.\n");
		}
	
		else if(a==10){
			printf("On a retiré les élements d'indice:\n");
			displayResult(taba,a);
			printf("\nTous les élements sont retirés.\n");
		}
	
		else if(a>=1&&a<10){
			printf("On a retiré les élements d'indice\t");
			displayResult(taba,a);
			printf("\nLes restes sont:\n");
			displayResult1(tab2,tabb,k);
		}
		
		printf("\nEntrer l'élement que tu veux en retirer:\t");
		scan=scanf("%d",&n);
	
	}

	if(scan==0){
		printf("\nOoops! ce n'est même pas un entier.\nAu revoir!!!\n");
	}

	return 0;
}
	
///Les fonctions
void displayResult(int* tableau,int a){
	for(int i=0;i<a;i++){
		printf("[%d]\n",*(tableau+i));
	}
}

void displayResult1(int* tableau1,int* tableau2, int a){
	for(int i=0;i<a;i++){
		printf("tab[%d]= %d\n",*(tableau2+i),*(tableau1+i));
	}
}

void getArray(int* tableau, int a){
	for(int i=0;i<a;i++){
		printf("tab[%d]=\t",i);
		scanf("%d", (tableau+i) );
	}
}
