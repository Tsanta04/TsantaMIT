#include<stdio.h>
#include<stdlib.h>

int** calculProd(int** matrice1,int** matrice2,int b,int a1,int a2);
void getNum(int*a,int*b);
void getNum1(int*a);
int** allouer(int taille1,int taille2);
void somme();
void produit();
void produitScal();
int** getdata(int a,int b);
int** calculSomme(int** matrice1,int** matrice2,int a,int b);
void displayResult(int** tab,int a,int b);
int** calculProdScal(int** matrice1,int scal,int a,int b);
void inverse();

int main(){
	printf("\t\t\tCalcul matrice\n\n");
///Les variables
	int choix;
	
///Choix
	printf("Les choix existants:\n\n");
	printf("1--Somme\n2--Produit de deux matrices\n3--Inverse\n4--Scalaire\n\nEntrer votre choix:\t");
	scanf("%d",&choix);
	
///Entree des donnees
	switch(choix){
		case 1: somme();
		case 2: produit();
		case 3: //inverse();
		case 4: produitScal();
	}
	return 0;
}

void produit(){
///Les variables
here:	int l1,c1,l2,c2;
		getNum(&l1,&c1);
		getNum(&l2,&c2);

///Test si on peut le continuer ou non
	if(c1!=l2){
		printf("On ne peut pas faire le produit de 2 matrices dont le nombre de colonnes du premier matrice est different du deuxieme.\nEntrer un autre.\n");
		goto here;
	}
	int commun=c1;
///Initialisation
	int** matrice1=allouer(l1,c1);
	int** matrice2=allouer(l2,c2);
	int** resultat=allouer(l1,c2);
///Entree des donnees
	printf("\nEntrer la premiere matrice A:\n");
	matrice1=getdata(l1,c1);
	printf("\nEntrer la deuxieme matrice B:\n");	
	matrice2=getdata(l2,c2);
///Traitement
	resultat=calculProd(matrice1,matrice2,commun,l1,c2);
///Afficher resultat
	printf("A*B=\n");
	displayResult(resultat,l1,c2);
}

int** calculProd(int** matrice1,int** matrice2,int b,int l1,int c2){
	int** resultat=allouer(l1,c2);
///Initialisation
	for(int i=0;i<l1;i++){
		for(int j=0;j<c2;j++){
			resultat[i][j]=0;
		}
	}
///Calcul
	for(int k=0;k<l1;k++){	
		for(int i=0;i<c2;i++){
			for(int j=0;j<b;j++){
				(*((*(resultat+k))+i))+=(*((*(matrice1+k))+j))*(*((*(matrice2+j))+i));
			}
		}
	}
	return resultat;
}

void inverse(){
///Les variables
	int n;
	getNum1(&n);
///Initialisation
	int** resultat=allouer(n,n);
	int** matrice1=allouer(n,n);
///Entree des donnees
	printf("\nEntrer la premiere matrice A:\n");
	matrice1=getdata(n,n);

}

void produitScal(){
///Les variables
	int l,c,scal;
	getNum(&l,&c);
///Initialisation
	int** resultat=allouer(l,c);
	int** matrice1=allouer(l,c);
///Entree des donnees
	printf("\nEntrer la premiere matrice A:\n");
	matrice1=getdata(l,c);
	printf("Entrez le scalaire c:\t");
	scanf("%d",&scal);
///Traitement
	resultat=calculProdScal(matrice1,scal,l,c);
///Sortie des donees
	printf("c*A=\n");
	displayResult(resultat,l,c);

}

void somme(){
///Les variables
	int l,c;
	getNum(&l,&c);
///Initialisation
	int** matrice1=allouer(l,c);
	int** matrice2=allouer(l,c);
	int** resultat=allouer(l,c);
///Entree des donnees
	printf("\nEntrer la premiere matrice A:\n");
	matrice1=getdata(l,c);
	printf("\nEntrer la deuxieme matrice B:\n");	
	matrice2=getdata(l,c);
///Traimtement
	resultat=calculSomme(matrice1,matrice2,l,c);
///Sortie des donnees
	printf("A+B=\n");
	displayResult(resultat,l,c);
}

void getNum(int*a,int*b){
	printf("\nEntrer le nombre de ligne de votre matrice:\t");
	scanf("%d",a);
	printf("Entrer le nombre de colonne de votre matrice:\t");	
	scanf("%d",b);
}
void getNum1(int*a){
	printf("\nEntrer le nombre de ligne de votre matrice:\t");
	scanf("%d",a);
}

int** allouer(int taille1,int taille2){
	int**matrice=(int**)malloc(sizeof(int*)*taille1);
	for(int i=0;i<taille1;i++){
		*(matrice+i)=(int*)malloc(sizeof(int)*taille2);
	}
	return matrice;
}

int** getdata(int a,int b){
	int** tab=allouer(a,b);
	for(int i=0;i<a;i++){
		for(int j=0;j<b;j++){
			printf("[%d][%d]:\t",i+1,j+1);
			scanf("%d",(*(tab+i)+j)	);
		}
		printf("\n");
	}
	return tab;
}

int** calculProdScal(int** matrice1,int scal,int a,int b){
	int** resultat=allouer(a,b);
	for(int i=0;i<a;i++){
		for(int j=0;j<b;j++){
			*((*(resultat+i))+j)=(scal)*(*((*(matrice1+i))+j));
		}
	}
	return resultat;
}

int** calculSomme(int** matrice1,int** matrice2,int a,int b){
	int** resultat=allouer(a,b);
	for(int i=0;i<a;i++){
		for(int j=0;j<b;j++){
			*((*(resultat+i))+j)=*((*(matrice1+i))+j)+*((*(matrice2+i))+j);
		}
	}
	return resultat;
}

void displayResult(int** tab,int a,int b){
	for(int i=0;i<a;i++){
		for(int j=0;j<b;j++){
			printf("\t%d",*((*(tab+i))+j));
		}
		printf("\n");
	}
}
