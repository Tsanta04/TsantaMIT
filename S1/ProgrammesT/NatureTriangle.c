#include<stdio.h>

int main(){
	
	printf("Determination de la nature d'un triangle en dépendant du mesure de ses côtés.\n");
	float AB=0, BC=0, AC=0;
	
///Entrée des données
	printf("Entrer AB,BC,AC:\n");
	scanf("%f %f %f", &AB,&BC,&AC);
	
///Traitement
	while(AC>=0||BC>=0||AC>=0){	//Boucle

	//Les valeurs incorrectes
		if( AB<0 || BC<0 || AC<0 ){
			printf("C'est impossible!\n");
		}
	
	//Plat
	
		else if(AB==0||BC==0||AC==0){
			printf("Le triangle est verticalement plat.\n");
		}
	
		else if( (AB==AC+BC) || (BC==AB+AC) || (AC==AB+BC) ){
			printf("Le triangle est horizontalement plat.\n");
		}
	
	
	//Equilatéral
		
		else if(AB==BC&&BC==AC){
			printf("Le trinagle est équilatéral.\n");
		}
	
	//Isocèle
	
		else if(AB==BC){
			printf("Le triangle est isocèle en B.\n");
		}
	
		else if(BC==AC){
			printf("Le triangle est isocèle en C.\n");
		}
		
		else if(AC==AB){
			printf("Le triangle est isocèle en A.\n");
		}
	
	//Recangle
		
		else if((AB*AB)==(BC*BC)+(AC*AC)){
			printf("Le triangle est rectangle en C.\n");
		}
		
		else if((AC*AC)==(AB*AB)+(BC*BC)){
			printf("Le triangle est rectangle en B.\n");
		}
		
		else if((BC*BC)==(AC*AC)+(AB*AB)){
			printf("Le triangle est rectangle en A.\n");
		}
		
	//Rectangle isocèle
	
		else if( ((BC*BC)==(AB*AB)+(AC*AC))&&(AB==AC) ){
				printf("Le triangle est rectangle isocèle en A.\n");
		}
		
		else if( ( (AB*AB)==(BC*BC)+(AC*AC) ) && (BC==AC) ){
				printf("Le triangle est rectangle isocèle en C.\n");
		}
		
		else if( ( (AC*AC)==(AB*AB)+(BC*BC) ) && (AB==BC) ){
				printf("Le triangle est rectangle isocèle en B.\n");
		}
	
		else{
			printf("Le triangle est ....\n");
		}
		
		printf("Entrer AB,BC,AC:\n");
		scanf("%f %f %f", &AB,&BC,&AC);
	
	}
	
return 0;
}
