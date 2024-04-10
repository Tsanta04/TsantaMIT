#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include"fn.h"

int main(){
	printf("content-type: text/html\n");

///Ne pas le mettre en cache
	printf("Cache-Control: no-cache, no-store, must-revalidate\n");
	printf("Pragma: no-cache\n");
	printf("Expires: 0\n");

///Si deja connectE => redirection authLog.cgi
	char* cookies=getenv("HTTP_COOKIE");
	if(cookies!=NULL){
		printf("Status: 302 Found\n");
		printf("Location:http://www.tsa.com/cgi-bin/authLogC/authLog.cgi\n\n");		
	}

///Sinon afficher le formulaire de login
	int i=verifyID();
	formLogin(i);
	return 0;
}
