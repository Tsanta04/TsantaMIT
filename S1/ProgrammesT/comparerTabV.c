#include<stdio.h>
void getArray(int* tableau,int a);
void arranger(int* tableau,int a);
void displayResult(int* tableau,int a);
int comparer1par1(int* tableau1, int* tableau2, int a);
int trier(int* tableaua,int* tableau,int a);
int eltCom(int* tabCom,int* taba,int* tabb,int i,int j);
int eltDist(int* tabDiff,int* tableau,int* tabCom,int a,int b);

int main(){
	printf("Comparer deux tableaux.\n");
	
///Les variables
	int tab1[10],	//les tableaux à traiter
		tab2[10];
		
	int taba[10],	//les versions des tableaux sans repetition
		tabb[10];

	int tabCom[10],		//tableau où on stocke les élements communs
		tabDiff1[10],	//les tableaux où n stocke les élements distincts 
		tabDiff2[10];	
	
	int i=0,		//Les dimensions des taba et tabb
		j=0,
		c=0,		//Dimension de tabCom
		d=0,		//Dimension de tabDiff1
		e=0;		//Dimension de tabDiff2
		
	int k=0;		//variable booléen (oui=1, non=0)

///Entrée des données
	printf("Entrer les élements du premier tableau.\n");
		getArray(tab1,10);
	printf("Entrer les élements du deuxième tableau.\n");
		getArray(tab2,10);
	
///Traitements
	///Arranger d'abord le tableau
		arranger(tab1,10);
		arranger(tab2,10);
	///Dire si ces deux tableaux sont identiques ou non
		k=comparer1par1(tab1,tab2,10);
		
	///Si ce n'est pas identique, on passe à avouer les élements communs et différents
		if(k==0){
		///Former une version du tableau sans repetition
			i=trier(taba,tab1,10);
			j=trier(tabb,tab2,10);
		///Les élements communs
			c=eltCom(tabCom,taba,tabb,i,j);	
		///Les élements distincts
			d=eltDist(tabDiff1,taba,tabCom,i,c);
			e=eltDist(tabDiff2,tabb,tabCom,j,c);
	}
///Sortie des données
/*
	printf("\nLes élements du premier tableau sont:\n");
		displayResult(taba,i);
	printf("Les élements du premier tableau sont:\n");
		displayResult(tabb,j);
*/
	if(k==1){
		printf("Ces deux élements sont identiques.\n");
	}
	
	else if(k==0){
	///Identique ou différents?
		printf("Ces deux élements ne sont pas identiques.\n");
	///Les élements communs
		if(c==0){
			printf("Ils n'ont pas d'élement commun.\n");
		}
		else if(c!=0){
		printf("\nL'(Les) élement(s) commun(s) est (sont):\n");
			displayResult(tabCom,c);
		
	///Les élements distincts dans tab1
			if(d==0){
				printf("Tous les élements du premier tableau sont inclus dans le deuxième tableau.\n");
			} 
			else if(d!=0){
				printf("\nL'(Les) élement(s) qui différencie(ent) le premier tableau est (sont):\n");
					displayResult(tabDiff1,d);		
			}
	///Les élements distincts de tab2
			if(e==0){
				printf("Tous les élements du deuxième tableau sont inclus dans le premier tableau.\n");
			}
			else if(e!=0){
				printf("\nL'(Les) élement(s) qui différencie(ent) le deuxième tableau est (sont):\n");
					displayResult(tabDiff2,e);
			}
		}
	}

	return 0;
}


///Les fonctions

	///Les élements distincts
int eltDist(int* tabDiff,int* tableau,int* tabCom,int a,int b){
		int k=0, c=0;
		for(int i=0;i<a;i++){
			k=0;
			for(int j=0;j<b;j++){
				if(tableau[i]==tabCom[j]){
					k++;
				}
			}
		if(k==0){
			tabDiff[c]=tableau[i];
			c++;
		}
	}
	return c;
}
	
	///Les élements communs
int eltCom(int* tabCom,int* taba,int* tabb,int a,int b){
	int k=0, c=0;
	for(int i=0;i<a;i++){
		k=0;
		for(int j=0;j<b;j++){
			if(taba[i]==tabb[j]){
				k++;
			}
		}
		if(k>0){
			tabCom[c]=taba[i];
			c++;
		}
	}
	return c;
}

	///Comparer les deux tableaux 1 par 1
int comparer1par1(int* tableau1, int* tableau2, int a){
	int k=0;
	for(int i=0;i<a;i++){
		if( *(tableau1+i)==*(tableau2+i) ){
			k++;
		}
	}
	if(k==a){
		k=1;
	}
	else if(k!=a){
		k=0;
	}
	
	return k;
}

	///Créer la version sans repetition des tableau entrés
int trier(int* tableaua,int* tableau,int a){
	int k=1;		//Dimension de tab
	*tableaua=*tableau;
	
	for(int i=0;i<a;i++){
		int l=0;	//Compteur
		
		for(int j=0;j<k;j++){
			if(*(tableau+i)==*(tableaua+j)){	//test de l'élement d'il est deéjà dans ce tableau ou non
				l++;
			}
		}
		
		if(l==0){	//sinon
			*(tableaua+k)=*(tableau+i);
			k++;
		}
	}
	return k;
}

	///Affichage des resultats
void displayResult(int* tableau,int a){
	for(int i=0;i<a;i++){
		printf("%d\n",*(tableau+i));
	}
}

	///Arranger les élements du tableau
void arranger(int* tableau,int a){
	int tmp=0;
	for(int i=0; i<a; i++){
		for(int j=i+1; j<a; j++){
			if(tableau[i]>tableau[j]){
				tmp=tableau[i];
				tableau[i]=tableau[j];
				tableau[j]=tmp;
			}
		}
	}
}

	///Remplir les tableaux
void getArray(int* tableau,int a){
		for(int i=0;i<a;i++){
		printf("tab[%d]=\t",i);
		scanf("%d",(tableau+i));
	}
}
