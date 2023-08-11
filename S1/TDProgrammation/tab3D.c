#include<stdio.h>
//void getArray(int tableau[][][], int a,int b,int c);

int main (){
	printf("Essai tableau à trois dimensions.\n");
	
	int tab[2][3][4];
	
///Entrée des données
	//getArray(tab,2,3,4);

	printf("\nEntrer la valeur du tableau à 3 dimensions.\n");
	for(int i=0; i<2;i++){
		for(int j=0;j<2;j++){
			for (int k=0;k<4;k++){
				printf("tab[%d][%d][%d]=\t",i,j,k);
				scanf("%d", &tab[i][j][k]);
			}
		}
	}


///Sortie de résultat


	printf("\nLes contenus de votre tableau sont:\n");
	for(int i=0; i<2;i++){
		for(int j=0;j<2;j++){
			for (int k=0;k<4;k++){
				printf("tab[%d][%d][%d]=%d\n",i,j,k,tab[i][j][k]);
			}
		}
	}


	return 0;
}

///Les fonctions
/*
void getArray(int tableau[][][], int a,int b,int c){
	printf("\nEntrer la valeur du tableau à 3 dimensions.\n");
	
	for(int i=0; i<a;i++){
		for(int j=0;j<b;j++){
			for (int k=0;k<c;k++){
				printf("tab[%d][%d][%d]=\t",i,j,k);
				scanf("%d", &tableau[i][j][k]);
			}
		}
	}
}
*/
