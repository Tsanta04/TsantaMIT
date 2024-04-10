#include<stdio.h>
#include<stdlib.h>

char* allouer1D(int taille);
char** allouer2D(int taille1D,int taille2D);
int estSeparateur(int initialise,char* tableau,char* separateur,int tailleSep);
int estSeparateurVirg(int initialise,int limite,char* tableau,char* separateur,int tailleSep);
char** recuperer2(int v,int j,int m,int a,char* tableau);
char* recuperer(int initialise,int limite,char* tableau);
double charToNum(char* tableau,int taille);
double puiss(double a, double b);
int* hMinSec(double nombre);
int* monthDayHminSec(double nombre,int mois);
int* dayHminSec(double nombre,int mois);
int* minSec(double nombre);

int main(){
	printf("Montrer la date avec l'heure entrE\n");	//Ce que je vais faire
	
///Les variables
	char* date;		//stocker la date entree
	char** jHdMa;	//tableau contenant les jours,heures,mois,annee separement
/*
 *(jHdMa+0)=jour
 *(jHdMa+1)=jour-heure
 *(jHdMa+2)=mois
 *(jHdMa+3)=mois-jour
 *(jHdMa+4)=annee
 *(jHdMa+5)=annee-mois
 */
//variable contenant les separateur existants
	char separatVirg[5]=".,;'";
	char separateur[5]="/:-|";

//varialbles pour stocker le numero de la place des separateur 
	int virguleDH=0;	// separant le jour et l'heure
	int virguleMD=0;	// separant le jour et l'heure
	int virguleAM=0;	// separant le jour et l'heure
	
	int barreJ=0;	// separant le jour et le mois
	int barreM=0;	// separant le mois et l'annee
	int barreA=0;	// l'annee
//variables pour stocker la longuer de chaque donnees utiles
	int tailleD=0;		//jour
	int tailleM=0;		//mois
	int tailleY=0;		//annee
	int tailleDH=0;		//Jour-heure
	int tailleMD=0;		//mois-jour
	int tailleYM=0;		//annee-mois
//variables pour stocker les donnees en mode arithmetique
	double day=0;		//jour
	double month=0;	//mois
	double year=0;		//annee
	double hour=0;
	double minute=0;
	double second=0;
	
	double hourFday=0;		//hour from day
	double dayFmonth=0;		//day from month
	double monthFyear=0;	//month from year
	
//variable d'ajout de donnees
	int* clockD;
	int* clockM;
	int* clockY;
	
//Variable de configuration
	int totalEnSec=0;
	//int testHeure=0;
//variable a sortir
	char* realDate;
	
	
///Malloc
	date=allouer1D(50);
	jHdMa=allouer2D(6,50);
	realDate=allouer1D(50);
	clockD=(int*)malloc(sizeof(int)*5);
	clockM=(int*)malloc(sizeof(int)*5);
	clockY=(int*)malloc(sizeof(int)*5);
	
///Entree des donnees
	printf("Entrer la date:\t");
	scanf("%s",date);


///Traitements
//place de tous les separateur
	barreJ=estSeparateur(0,date,separateur,5);	//Jour,Mois
	barreM=estSeparateur((barreJ+1),date,separateur,5);	//Mois,annee (barreJ+1 pour ne pas recuperer le "/" et ainsi de suite)
	barreA=estSeparateur((barreM+1),date,separateur,5);	//strlen
	virguleDH=estSeparateurVirg(0,barreJ,date,separatVirg,5);	//Jour,Heure
	virguleMD=estSeparateurVirg((barreJ+1),barreM,date,separatVirg,5);	//Jour,Heure
	virguleAM=estSeparateurVirg((barreM+1),barreA,date,separatVirg,5);	//Jour,Heure
	
//Recuperer les jours,heures,mois,annee separement + Taille == numero de d'indice max ("\0" n'est pas comptE)
/*
	if(virgule!=-1){
		jHdMa=recuperer2(virgule,barreJ,barreM,barreA,date);
	}
*/
	///Day and Hour
	
	if(virguleDH<barreJ){		//cela veut dire que s'il y a de virgule
		*(jHdMa+0)=recuperer(0,virguleDH,date);
		*(jHdMa+1)=recuperer((virguleDH+1),barreJ,date);
		tailleD=virguleDH-1;	//(il y a ce (-1) pour ne pas faire le calcul en ajoutant le separateur la-dedans)
		tailleDH=barreJ-virguleDH-2;
	}
	else{	//Sinon
		*(jHdMa+0)=recuperer(0,barreJ,date);
		tailleD=barreJ-1;	//(il y a ce (-1) pour ne pas faire le calcul en ajoutant le separateur la-dedans)
	}
	
	///Month and Day
	if(virguleMD<barreM){		//cela veut dire que s'il y a de virgule
		*(jHdMa+2)=recuperer((barreJ+1),virguleMD,date);
		*(jHdMa+3)=recuperer((virguleMD+1),barreM,date);
		tailleM=virguleMD-barreJ-2;	//(il y a ce (-1) pour ne pas faire le calcul en ajoutant le separateur la-dedans)
		tailleMD=barreM-virguleMD-2;
	}
	else{	//Sinon
		(*(jHdMa+2))=recuperer((barreJ+1),barreM,date);
		tailleM=barreM-barreJ-2;	//(pour ne pas recuperer les places des 2 separateurs gauche et droite)
	}
	
	///Year and Month
	if(virguleAM<barreA){		//cela veut dire que s'il y a de virgule
		*(jHdMa+4)=recuperer((barreM+1),virguleAM,date);
		*(jHdMa+5)=recuperer((virguleAM+1),barreA,date);
		tailleY=virguleAM-barreM-2;	//(il y a ce (-1) pour ne pas faire le calcul en ajoutant le separateur la-dedans)
		tailleYM=barreA-virguleAM-2;
	}
	else{	//Sinon
		(*(jHdMa+4))=recuperer((barreM+1),barreA,date);
		tailleY=barreA-barreM-2;
	}

//Transformer les valeurs 
	day=charToNum(*(jHdMa+0),tailleD);
	month=charToNum(*(jHdMa+2),tailleM);
	year=charToNum(*(jHdMa+4),tailleY);	
	
	if(virguleDH<barreJ){
		hourFday=(charToNum(*(jHdMa+1),tailleDH)*(puiss(10,-(tailleDH+1))));	// -(tailleH+1) ex: de taille=0 =>puissance -1 
	}
	if(virguleMD<barreM){
		dayFmonth=(charToNum(*(jHdMa+3),tailleMD)*(puiss(10,-(tailleMD+1))));	// -(tailleH+1) ex: de taille=0 =>puissance -1 
	}
	if(virguleAM<barreA){
		monthFyear=(charToNum(*(jHdMa+5),tailleYM)*(puiss(10,-(tailleYM+1))));	// -(tailleH+1) ex: de taille=0 =>puissance -1 
	}
	
//Traitement de l'heure 
	for(int i=0;i<5;i++){
		*(clockD+i)=0;
		*(clockM+i)=0;
		*(clockY+i)=0;
	}	
	
	if(virguleDH<barreJ){
		totalEnSec=hourFday*3600*24;
		clockD=hMinSec(totalEnSec);
	}	
	if(virguleMD<barreM){
		totalEnSec=dayFmonth*3600*24*31;
		clockM=dayHminSec(totalEnSec,31);
	}
	if(virguleAM<barreA){
		totalEnSec=monthFyear*3600*24*31*12;
		clockY=monthDayHminSec(totalEnSec,31);
	}
	
//Resolution des virgules
	day=day+*(clockM+3)+*(clockY+3);
	month=month+*(clockM+4)+*(clockY+4);
	hour=(*(clockD+2)+*(clockM+2)+*(clockY+2));
	minute=(*(clockD+1)+*(clockM+1)+*(clockY+1));
	second=(*(clockD)+*(clockM)+*(clockY));

//Test si la date est correcte
	///Reglage minutes et secondes
	clockD=minSec(second);
	minute=minute+*(clockD+1);
	second=*(clockD+2);					//atambatra amle etsy ambony daholo dia asesy manomboka year dia miaraka @test (day%2)==1) an'ny mois sns 
	///Reglage hours and minutes			
	clockD=hMinSec(minute);
	hour=hour+*(clockD);
	minute=*(clockD+1);
	///Reglage months and days
//Les vraies valeurs des dates
	
//Mettre dans le vrai resultat dans realDate
	sprintf(realDate,"Day:\t%d / %d / %d\nAt:\t%dh : %dmn : %ds",(int)day,(int)month,(int)year,(int)hour,(int)minute,(int)second);

///Sortie des donnees
	printf("%s",realDate);
/*
	printf("Dans clockD:\n");
	for(int i=0;i<6;i++){
		printf("%d\t",*(clockD+i));
	}
	printf("\n");
	printf("Dans clockM:\n");
	for(int i=0;i<6;i++){
		printf("%d\t",*(clockM+i));
	}
	printf("\n");	
	printf("Dans clockY:\n");
	for(int i=0;i<6;i++){
		printf("%d\t",*(clockY+i));
	}
	printf("\n");
*/
/*	
	printf("Date:\t%s\n",date); 
	printf("Day:\t%f\n",day);
	printf("hourFday:\t%f\n",hourFday);
	printf("dayFmonth:\t%f\n",dayFmonth);
	printf("monthFyear:\t%f\n",monthFyear);
	printf("Month:\t%f\n",month);
	printf("Year:\t%f\n\n",year);


	printf("Dans clock:\n");
	for(int i=0;i<3;i++){
		printf("%d\t",*(clock+i));
	}
*/
/*
	printf("TailleD:\t%d\n",tailleD); 
	printf("TailleM:\t%d\n",tailleM);
	printf("TailleY:\t%d\n",tailleY);
	printf("TailleDH:\t%d\n",tailleDH);
	printf("TailleMD:\t%d\n",tailleMD);
	printf("TailleYM:\t%d\n\n",tailleYM);

	printf("VirguleDH:\t%d\n",virguleDH);
	printf("barreJ:\t%d\n",barreJ);
	printf("VirguleMD:\t%d\n",virguleMD);
	printf("barreM:\t%d\n",barreM);
	printf("VirguleAM:\t%d\n",virguleAM);
	printf("barreA:\t%d\n",barreA);
	
	printf("%s",(*(jHdMa+4)));	

	for(int i=0;i<4;i++){
		if((virgule>=barreJ)&&(i==1)){
			continue;
		}
		else{
			for(int j=0;*((*(jHdMa+i))+j)!='\0';j++){
				printf("%c",*((*(jHdMa+i))+j));
			}
			printf("\n");
		}
	}
*/
	return 0;
}

///Les fonctions
int* monthDayHminSec(double nombre,int mois){
	//int totalEnSec=0;
	int testHeure=86400*mois;
	int* resultat=(int*)malloc(sizeof(int)*5);
	int countHeure=0;
//transformer en seconde
	//totalEnSec=nombre*testHeure*12;
//separer day
	for(countHeure=0;nombre>=testHeure;countHeure++){
		nombre-=testHeure;
		//printf("%f",nombre);
	}
	resultat=dayHminSec(nombre,mois);
	*(resultat+4)=countHeure;	//month
	return resultat;
}

int* dayHminSec(double nombre,int mois){
//	int totalEnSec=0;
	int testHeure=86400;
	int* resultat=(int*)malloc(sizeof(int)*5);
	int countHeure=0;
//transformer en seconde
//	totalEnSec=nombre*testHeure*mois;
//separer day
	for(countHeure=0;nombre>=testHeure;countHeure++){
		nombre-=testHeure;
	}
	//printf("%d",countHeure);
	resultat=hMinSec(nombre);
	*(resultat+3)=countHeure;	//day
	
	return resultat;
}

int* hMinSec(double nombre){
	//int totalEnSec=0;
	int testHeure=3600;
	int* resultat=(int*)malloc(sizeof(int)*5);
	int countHeure=0;
//transformer en seconde
	//totalEnSec=nombre*testHeure*24;
//separer heure
		for(countHeure=0;nombre>=testHeure;countHeure++){
			nombre-=testHeure;
		}
		resultat=minSec(nombre);
		*(resultat+2)=countHeure;	//heure
	return resultat;	
}

int* minSec(double nombre){
	int testHeure=60;
	int* resultat=(int*)malloc(sizeof(int)*5);
	int countHeure=0;
//separer heure
		for(countHeure=0;nombre>=testHeure;countHeure++){
			nombre-=testHeure;
		}
	*(resultat+0)=nombre;	//seconde
	*(resultat+1)=countHeure;	//minute
		
	return resultat;	
}

double puiss(double a, double b){
	double puissance=1;
	if(b==0){
		puissance=1;
	}
	else if(b>0){
		puissance=a*(puiss(a,(b-1)));
	}
	else if(b<0){
		b=-b;
		puissance=(1/a)*(puiss((1/a),(b-1)));
	}
	return puissance;
}

double charToNum(char* tableau, int taille){
	double nombre=0;
	int ascii=48;
	int j=taille;
	for(int i=0;i<=taille;i++){
		//printf("%d\t",*(tableau+i));
		nombre+=((*(tableau+i))-ascii)*(puiss(10,j));
		j--;
	}
	//printf("%d\n",nombre);
	return nombre;
}

int estSeparateurVirg(int initialise,int limite,char* tableau,char* separateur,int tailleSep){
	int place=initialise;
	int separat=0;
	//printf("%c",*(separateur+0));
	for(int i=initialise;(i<limite)&&(separat==0);i++){
		for(int j=0;j<tailleSep;j++){
			if((*(tableau+i)==*(separateur+j))){
				separat++;
			}
		}
		if(separat==0){
			place++;
		}
		else if(separat==1){
			break;
		}
	}
	return place;
}

char* allouer1D(int taille){
	char* pointeur;
	pointeur=(char*)malloc(taille);
	return pointeur;
}

int estSeparateur(int initialise,char* tableau,char* separateur,int tailleSep){
	int place=initialise;
	int separat=0;
	//printf("%c",*(separateur+0));
	for(int i=initialise;(separat==0);i++){
		for(int j=0;j<tailleSep;j++){
			if((*(tableau+i)==*(separateur+j))){
				separat++;
			}
		}
		if(separat==0){
			place++;
		}
		else if(separat==1){
			break;
		}
	}
	return place;
}

char** allouer2D(int taille1D,int taille2D){
	char** pointeur;
	pointeur=(char**)malloc(sizeof(char*)*taille1D);
	for(int i=0;i<taille2D;i++){
		*(pointeur+i)=allouer1D(taille2D);
	}
	return pointeur;
}

char** recuperer2(int v,int j,int m,int a,char* tableau){
	char** resultat;
	resultat=allouer2D(5,50);
//Recuperation du jour
	for(int i=0;i<v;i++){
		*((*resultat)+i)=*(tableau+i);
	}
//Recuperation de heure
	for(int i=v+1;i<j;i++){
		*((*(resultat+1))+i)=*(tableau+i);
	}
//Recuperation du mois
	for(int i=j+1;i<m;i++){
		*((*(resultat+2))+i)=*(tableau+i);
	}
//Recuperation de l'annee
	for(int i=m+1;i<a;i++){
		*((*(resultat+3))+i)=*(tableau+i);
	}
	return resultat;
}

char* recuperer(int initialise,int limite,char* tableau){
	char* resultat;
	resultat=allouer1D(50);
	int j=0;
	for(int i=(initialise);i<limite;i++){
		*(resultat+j)=*(tableau+i);
		j++;
	}
	return resultat;
}
