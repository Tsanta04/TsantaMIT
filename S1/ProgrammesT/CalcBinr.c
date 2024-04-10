#include<stdio.h>
int main(){
	printf("Convertir un nombre à base décimale en binaire.\n");

///Les variables
	int n=0;		//Nombre à base décimale
	int tab[100],	//Nombre à base binaire==reste de la division
		a=0;		//DImension de tab
/*	
	int reste=0,	//Reste de la division, qui forme le nombre binaire
		quotient=1;	//La variable de division
*/	
///Entrée des données
	printf("Entrée le nombre:\t");
	scanf("%d",&n);
	
/*	
	reste=n/2;
	printf("%d",reste);
*/
///Traitements
	while(n!=0){
		n=n/2;
		tab[a]= (n%2);
		a++;
	}
	
///Sortie des données
	printf("Ce nombre, a une  valeur de ");
	for(int i=0;i<a;i++){
		printf("%d",tab[i]);
	}
	printf(" en base binaire.\n");

	return 0;
}
