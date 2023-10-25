#include<stdio.h>
#include<math.h>
#include<ctype.h>
#include<stdlib.h>
#include<string.h>

float* integraleT(float a,float b,float eps,int* bor);
float* integraleC(float a,float b,float eps);
float f(float x);

int main(){

///Les variables
	float* integrT;
	float* integrC;
	int borne=0;
	
	char* data=getenv("QUERY_STRING");
	char a[100]="";char b[100]="";char eps[100]="";

///Recuperation URL
	sscanf(data,"a=%[^&]&b=%[^&]&eps=%[^\n]\n",a,b,eps);


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
				printf("<FORM ACTION='integrale.cgi' METHOD='GET' style='box-sizing:border-box;position:fixed;top:0;width:100vw;height:13vh;background:linear-gradient(to right,pink,#afffff);display:flex;flex-direction:row;justify-content:space-around;align-items:center;box-shadow:2px 5px 3px;'>");
					printf("<p class='input' align='center'><LABEL for='a'>Borne a gauche: </LABEL><INPUT style='width:25vw' name='a' type='text' required/></p>");	//pattern='[0-9]+'
					printf("<p class='input' align='center'><LABEL for='b'>Borne a droite: </LABEL><INPUT style='width:25vw' name='b' type='text' required/></p>");
					printf("<p class='input' align='center'><LABEL for='eps'>Incrementation: </LABEL><INPUT style='width:25vw' name='eps' type='text' required/></p>");
					printf("<p class='input' align='center'><INPUT type='submit' value='Enter'/></p>");
				printf("</FORM>");
			//printf("</div>");
            printf("<div class='container rounded' style='margin:auto;margin-top:25vh;margin-bottom:10vh;padding:1vw;box-sizing:border-box;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'><h1 align='center'>f(x)=log(x)-1</h1></div>"); 

	if(strcmp(eps,"")!=0){		
///Get donnee
		integrT=integraleT(atof(a),atof(b),atof(eps),&borne);
		integrC=integraleC(atof(a),atof(b),atof(eps));

///Display result		
		printf("<TABLE class='table table-borderless rounded table-striped' style='margin-bottom:8vh;'>\n");
			printf("<THEAD class='table-warning'>\n");
				printf("<TH>ITERATION</TH>\n");
				printf("<TH>METHODE RECTANGLE</TH>\n");
				printf("<TH>METHODE TRAPEZE</TH>\n");
			printf("</THEAD>\n");
			printf("<TBODY>\n");
				for(int i=0;i<borne;i++){
					printf("<TR>");
					printf("<TD>%d</TD>\n",i);
					printf("<TD>%f</TD>\n",integrC[i]);
					printf("<TD>%f</TD>\n",integrT[i]);
					printf("</TR>");
				}		
			printf("</TBODY>\n");
		printf("</TABLE>\n");	
	printf("</BODY></HTML>");
	}
	return 0;
}

///Les fonctions
float* integraleC(float a,float b,float eps){
	int borne= (int)( (float)((b-a)/eps) )+1;
	float* result=(float*)malloc(sizeof(float)*borne);
	float rep=0.0;
	int k=0;

	for(float i=a;i<b;i+=eps){
		k++;
		rep+=( f(i)*eps );
///Vaut mieux perdre les donnees plutot que d'inventer
		if( fabs(f(i))>fabs(f(i+eps)) ){
			rep-=( (f(i)-f(i+eps))*eps );
		}
		result[k]=rep;
		//printf("-->%d: %f\n",k,rep);
	}

	return result;
}

///Integrale Trapeze
float* integraleT(float a,float b,float eps,int* bor){
	int borne= (int)( (float)((b-a)/eps) )+1;
	float* result=(float*)malloc(sizeof(float)*borne);
	float rep=0.0;
	int k=0;

	for(float i=a;i<b;i+=eps){
///Choix s'il faut ajouter ou soustraire le petit rectangle
		if( fabs(f(i))>fabs(f(i+eps)) ){
			rep+=( f(i)*eps )-fabs( ((f(i)-f(i+eps))*eps)/2 );
		}
		else if( fabs(f(i))<=fabs(f(i+eps)) ){
			rep+=( f(i)*eps )+fabs( ((f(i)-f(i+eps))*eps)/2 );
		}
		result[k]=rep;
		//printf("-->%d: %f\n",k,rep);
		k++;
	}
	*bor=k;
	return result;
}

float f(float x){
	float y=(float)(((float)log(x))-1.0);
	return y;
}
