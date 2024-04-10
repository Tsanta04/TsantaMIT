#include<stdio.h>

void getData(int *n);							//Fonction pour récuperer la valeur de n
void displayResult(int n,int scarre,int scube);	//Fonction pour afficher le résultat
void sommes(int n, int *pscarre,int *pscube);		//Fonction pour calculer la somme des carrées et des cubes des n premiers entiers non nuls

int main(){
	printf("Calculer la somme des carrés et des cubes des n premiers entiers non nuls.\n");	//Ce que je vais faire

///Entrée des données
	int n=0;		//La limite de la somme
	int scarres=0,	//La somme des carrés	
		scubes=0;	//La somme des cubes
	
	getData(&n);

///Traitement ou transformation
	sommes(n, &scarres,&scubes);
	
///Sortie des données ou résultats
	displayResult(n,scarres,scubes);

	return 0;
}

///Les fonctions

void sommes(int n, int *pscarres,int *pscubes){
	int i=0;		//C'est plus selectif si on va mettre la déclaration du variable en dehors de "for"
	*pscarres=0;	//Il ne faut jamais oublier d'initialiser les valeurs
	*pscubes=0;
	for(i=1;i<=n;i++){
		*pscarres+=(i*i);
		*pscubes+=(i*i*i);
		//*pscube+= pow(i, 3);	//il va encore le convertir en "double" 
	}
}

void displayResult(int n,int scarres,int scubes){
	printf("La somme des carres des %d premiers nombres entiers est %d.\n",n, scarres);	//NB: Il ne faut pas écrire aves des accents même dans la fonction "printf"
	printf("La somme des cubes des %d premiers nombres entiers est %d.\n",n ,scubes);
}	

void getData(int *n){
	printf("Entrer n:\t");
	scanf("%d",n);
}
