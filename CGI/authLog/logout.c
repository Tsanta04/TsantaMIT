#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include"fn.h"

int main(){
	printf("Content-type: text/html\n");
	printf("Set-Cookie:session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly\n");
	printf("Cache-Control: no-cache, no-store, must-revalidate\n");
	printf("Pragma: no-cache\n");
	printf("Expires: 0\n");
	printf("Status: 302 Found\n");
	printf("Location: http://www.tsa.com/cgi-bin/authLogC/authLog.cgi\n\n");			
	return 0;
}
