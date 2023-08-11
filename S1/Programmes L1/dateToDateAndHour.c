#include<stdio.h>
#include<stdlib.h>
#include<math.h>

int length(char* name);
double puiss(double a,double b);
double charToNumInt(char* name);
int length2(char* name);

int main(){
///Les variables
	
	char* date;
	//double len=0;
	//double len2=0;
	double day=0;
	double hours=0;
	
///L'initialisation de date
	date=(char*)malloc(50);
	
///Entree des donnees
	printf("Convert a date to a date with hours\n");
	printf("Enter the date:\t");
	scanf("%s",date);
	
///Traitements
/*
	nom="456,5";
	len=length(nom);
	//len2=length2(nom);

	len=puiss(len,(-2));
	printf("%f\n",len);
	//printf("%d\n",len2);
*/
	day=charToNumInt(date);
	
///Sortie des donnees
	printf("%f",day);

	return 0;
}

double charToNumInt(char* name){
	double n=0;
	int len=0;
	int len2=0;
	int test=0;
	int ascii=48;	

	for(int i=0;*(name+i)!='/';i++){
		if((*(name+i))==','){
			test++;
		}
	}

	if(test==1){
		len=length(name);
		len2=length2(name);
		//int len1=len-len2-1;
		int o=1;
		for(int j=0;j<len2;j++){
			n+=(((*(name+(len2-o)))-ascii)*(puiss(10,j)));
			o++;
		}
		o=-1;
		for(int j=(len2+1);j<len;j++){
			n+=(((*(name+j))-ascii)*(puiss(10,o)));
			//n+=(((*(name+j))-ascii)*(pow(10,o)));
			o--;
		}
	}

	else if(test==0){
		len=length(name);
		int o=1;
		for(int j=0;j<len;j++){
			n+=(((*(name+(len-o)))-ascii)*(puiss(10,j)));
			o++;
		}
	}
	return n;
}

int length(char* name){
	int i=0;
	for(i=0;*(name+i)!='/';i++){}
	return i;
}

int length2(char* name){
	int i=0;
	for(i=0;*(name+i)!=',';i++){}
	return i;
}

double puiss(double a,double b){
	double puissance=0.000;
	if(b==0){
		return 1;
	}
	else if(b>0){
		puissance=a;
		for(int i=1;i<b;i++)
			puissance*=a;
		return puissance;
	}
	else if(b<0){
		int c=-b;
		puissance=(1/a);
		//printf("%f",puissance);
		for(int i=1;i<c;i++)
			puissance*=(1/a);
		return puissance;
	}
}
