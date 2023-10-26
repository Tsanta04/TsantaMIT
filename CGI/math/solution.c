#include<stdio.h>
#include<math.h>
#include<ctype.h>
#include<stdlib.h>

///Les prototypes
float f(float x);
float* dichotomie(float a,float b,float eps,int* bo);
float centre(float a,float b);
float produit(float x,float y);
float* traitementSecante(float a,float b,float eps,int* bo);
float secante(float a,float b);
float quot(float x,float y );
float rest(float x,float a );
float* newton(float a,float b,float eps,int* bo);
float tangente(float x);
int max(int a,int b,int c);

int main(){

///Les variables
	float* dich;
	float* tan;
	float* sec;
	
	int bs=0,bd=0,bt=0;
	
	char* data=getenv("QUERY_STRING");
	char a[100]="";char b[100]="";
	float eps=pow(10,-5);

///Recuperation URL
	sscanf(data,"a=%[^&]&b=%[^\n]\n",a,b);


///Barre de recherche
	printf("content-type: text/html\n\n");
	printf("<!DOCTYPE html>\n");
	printf("<html lang='en'>");
		printf("<head>");
		        printf("<meta charset='UTF-8'>");
		        printf("<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n");
				printf("<title>Fonction</title>\n");
        	    printf("<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN' crossorigin='anonymous'>");
    		printf("</head>\n");
		printf("<body>");
			//printf("<div style='box-sizing:border-box;position:fixed;top:0;width:100vw;height:13vh;background:linear-gradient(to right,pink,#afffff);display:flex;flex-direction:row;justify-content:space-between;align-items:center;box-shadow:2px 5px 3px;'>"); 
				printf("<FORM ACTION='solution.cgi' METHOD='GET' style='box-sizing:border-box;position:fixed;top:0;width:100vw;height:13vh;background:linear-gradient(to right,pink,#afffff);display:flex;flex-direction:row;justify-content:space-around;align-items:center;box-shadow:2px 5px 3px;'>");
					printf("<p>A noter: eps=10^-5</p>");
					printf("<p class='input' align='center'><LABEL for='a'>Borne a gauche: </LABEL><INPUT style='width:25vw' name='a' type='number' step='0.0001' required/></p>");	//pattern='[0-9]+'
					printf("<p class='input' align='center'><LABEL for='b'>Borne a droite: </LABEL><INPUT style='width:25vw' name='b' type='number' step='0.0001' required/></p>");
					printf("<p class='input' align='center'><INPUT type='submit' value='Enter'/></p>");
				printf("</FORM>");
			//printf("</div>");
            printf("<div class='container rounded' style='margin:auto;margin-top:25vh;margin-bottom:10vh;padding:1vw;box-sizing:border-box;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'><h1 align='center'>f(x)=log(x)-1</h1></div>"); 
		
///Get donnee
	dich=dichotomie(atof(a),atof(b),eps,&bd);
	tan=newton(atof(a),atof(b),eps,&bt);
	sec=traitementSecante(atof(a),atof(b),eps,&bs);

	if(sec==NULL){
			printf("<div class='rounded' align='center' style='width:50vw;box-shadow:2px 2px 5px #daa8d8;padding:3vw;margin:auto;margin-top:10vw;background:linear-gradient(to right,#aca5a5,#ece5e5);display:flex;flex-direction:column;justify-content:space-around;'>");
				printf("<p align='center' style='font-size:10vw'>OoOPs!!</p>");
				printf("<p class='container text-secondary' style='margin-top:5vw' align='center'>Il n'y a pas de solution :) </p>");
			printf("</div>");
		}

///Display result		
	else{
		printf("<TABLE class='table table-borderless rounded table-striped' style='margin-bottom:8vh;'>\n");
			printf("<THEAD class='table-warning'>\n");
				printf("<TH>BOUCLE</TH>\n");
				printf("<TH>DICHOTOMIE</TH>\n");
				printf("<TH>TANGENTE</TH>\n");
				printf("<TH>SECANTE</TH>\n");
			printf("</THEAD>\n");
			printf("<TBODY>\n");
				for(int i=0;i<max(bs,bt,bd);i++){
					printf("<TR>");
					printf("<TD>%d</TD>\n",i);
					if(i<bd){printf("<TD>%f</TD>\n",dich[i]);}
					else{printf("<TD>----</TD>\n");}
					if(i<bt){printf("<TD>%f</TD>\n",tan[i]);}
					else{printf("<TD>----</TD>\n");}
					if(i<bs){printf("<TD>%f</TD>\n",sec[i]);}
					else{printf("<TD>----</TD>\n");}										
					printf("</TR>");
				}		
			printf("</TBODY>\n");
		printf("</TABLE>\n");
	}
	
	
	printf("</BODY></HTML>");
	
	return 0;
}
	
///La fonction
int max(int a,int b,int c){
	if((a>=b)&&(a>=c)){return a;}
	else if((b>=a)&&(b>=c)){return b;}	
	else if((c>=a)&&(c>=b)){return c;}
}

float f(float x){
	float y=(float)(((float)log(x))-1.0);
	return y;
}

///Methode de dichotomie
float* dichotomie(float a,float b,float eps,int* bo){
	float* result=(float*)malloc(sizeof(float)*50);
	float rep=0.0;
	int i=0;

///Traitement	
	while(fabs(f(rep))>=eps){
		
///On divise par deux
		rep=centre(a,b);
///Si aucun d'eux a une solution f(x)=0		
		if((produit(f(b),f(rep))>0)&&(produit(f(a),f(rep))>0)){
			return NULL;
		}
///Si il y en a, on remplace les bornes
		else if(produit(f(a),f(rep))<=0){
			b=rep;
		}
		else if(produit(f(b),f(rep))<=0){
			a=rep;
		}
	result[i]=rep;
	i++;
	}
	*bo=i;
	return result;
}

///Methode de secance
float* traitementSecante(float a,float b,float eps,int* bo){
	float* result=(float*)malloc(sizeof(float)*50);
	float rep=0.0;
	int i=0;
	rep=secante(a,b);
	if((rep>b)||(rep<a)){
		return NULL;
	}
///Comme la dichotomie, mais en ajoutant on ne choisit pas le centre mais le point d'instersection de (AB) et y=0
	else{
		while(fabs(f(rep))>eps){
			
			rep=secante(a,b);

			if(((f(a)*f(rep))>0)&&(f(b)*f(rep)>0)){
				return NULL;
			}
			else if(f(a)*f(rep)<=0){
				b=rep;
			}
			else if(f(b)*f(rep)<=0){
				a=rep;
			}
			result[i]=rep;
			i++;
		}
	}
	*bo=i;
	return result;
}

///Methode de Newton

float* newton(float a,float b,float eps,int* bo){
	float* result=(float*)malloc(sizeof(float)*50);
	float rep=0.0;
	int i=0;
	float tmp=0;

    //tmp=centre(a,b);
    if( (produit(f(a),f(b))>0)&&(produit(f(b),f(a))>0) ){
        return NULL;
    }
    
    else{
		rep=centre(a,b);
	while(fabs(f(rep))>eps){
		tmp=tangente(rep);
		result[i]=rep;
		i++;
		if((rep>b)||(rep<a)){
			if((produit(f(a),f(rep))<=0)){b=rep;}
			else if((produit(f(b),f(rep))<=0)){a=rep;}
			rep=centre(a,b);
		}
		else{
			rep=tmp;
		}
	}
    }
/*
	float rep=0.0;
	int i=0;

///Traitement	
	while(fabs(f(rep))>eps){
		i++;
///On divise par deux
		rep=tan(a);
		if((rep>b)||(rep<a)){
			rep=centre(a,b);
		}
///Si aucun d'eux a une solution f(x)=0		
		if((produit(f(b),f(rep)>0))&&(produit(f(a),f(rep))>0)){
			printf("=>Aucune solution\n");
			break;
		}
///Si il y en a, on remplace les bornes
		else if(produit(f(a),f(rep))<=0){
			b=rep;
			//continue;
		}
		else if(produit(f(b),f(rep))<=0){
			a=rep;
			//continue;
		}
		result[i]=rep;
	}
	*/
  	*bo=i;
	return result;
}

/*
void newton(float a,float b,float eps){
	float rep=0.0;
	int i=0;

///Traitement	
	while(fabs(f(rep))>eps){
		i++;
///On divise par deux
		rep=tan(a);
		if((rep>b)||(rep<a)){
			rep=centre(a,b);
		}
///Si aucun d'eux a une solution f(x)=0		
		if((produit(f(b),f(rep)>0))&&(produit(f(a),f(rep))>0)){
			printf("=>Aucune solution\n");
			break;
		}
///Si il y en a, on remplace les bornes
		else if(produit(f(a),f(rep))<=0){
			b=rep;
			//continue;
		}
		else if(produit(f(b),f(rep))<=0){
			a=rep;
			//continue;
		}
		printf("--> %d=%f\n",i,rep);
	}
}
*/

///Autres fonctions utiles
float secante(float a,float b){
    float A=quot(a,b);
    float B=rest(a,A);
    return (-B/A);
    
}
float quot(float x,float y ){
    return ( (f(x)-f(y))/(x-y) );
}
float rest(float x,float a ){
    return ( f(x)-(a*x) );
}
float tangente(float x){
	return (x/(1+f(x)));
}

float centre(float a,float b){
    return (((b-a)/2)+a);
}

float produit(float x,float y){
    return (x*y);
}
