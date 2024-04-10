#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<time.h>
#include<unistd.h>
#include<ctype.h>
#include<ncurses.h>

void AffichageEntree();

int main(){
///Les variables
	char langue[3][100]={"Malagasy","Francais","English"};
	int x,y;	//coodonnee

///Introduction
	AffichageEntree();
//eto:
initscr();
///Creation window
	getmaxyx(stdscr,y,x);
	WINDOW* titre=newwin(3,x-20,0,10);
	WINDOW* win1=newwin(3,x-10,5,5);
	WINDOW* win2=newwin(3,x-10,9,5);
	WINDOW* win3=newwin(3,x-10,13,5);
	WINDOW* rep=newwin(3,10,y-6,2);
	
///Colors
	start_color();
	init_pair(1,COLOR_GREEN,0);
	init_pair(2,COLOR_WHITE,COLOR_RED);
///Traitement
	int clavier=0,fleche=0;
while(clavier!='\n'){
	
///Affichage titre
	box(titre,'|','~');
	wattron(titre,COLOR_PAIR(1));
	wattron(titre,A_BOLD);
		mvwprintw(titre,1,8,"\t\tVazo Misoma");
	wattroff(titre,A_BOLD);
	wattroff(titre,COLOR_PAIR(1));
	refresh();
	wrefresh(titre);
	wrefresh(win1);
	wrefresh(win2);
	wrefresh(win3);
	
///Affichage langue
keypad(stdscr,true);
//Qlq variables utils
		if(clavier==KEY_UP){
			if(fleche==0){
				fleche=2;
			}
			else if(fleche>0){
				fleche--;
			}
		}
		else if(clavier==KEY_DOWN){
			if(fleche==2){
				fleche=0;
			}
			else if(fleche<2){
				fleche++;
			}
		}
		box(win1,0,0);
		box(win2,0,0);
		box(win3,0,0);
		if(fleche==0){
			wbkgd(win1, COLOR_PAIR(2));
			wbkgd(win2, A_NORMAL);
			wbkgd(win3, A_NORMAL);
		}
		if(fleche==1){
			wbkgd(win2, COLOR_PAIR(2));
			wbkgd(win1, A_NORMAL);
			wbkgd(win3, A_NORMAL);
		}
		if(fleche==2){
			wbkgd(win3, COLOR_PAIR(2));
			wbkgd(win1, A_NORMAL);
			wbkgd(win2, A_NORMAL);
		}
		mvwprintw(win1,1,29,"%s",langue[0]);
		mvwprintw(win2,1,29,"%s",langue[1]);
		mvwprintw(win3,1,29,"%s",langue[2]);

//Mise a jour
		wrefresh(titre);
		wrefresh(win1);
		wrefresh(win2);
		wrefresh(win3);
//Getchar		
		noecho();
		wmove(stdscr,0,0);
		clavier=wgetch(stdscr);
		refresh();
}
	box(rep,0,0);
	mvwprintw(rep,1,2,":OK..");
	wrefresh(rep);
	sleep(2);
	endwin();
	
	switch(fleche){
		case 1:	printf("\033[32m\nO K\t\033[0m");
				//sleep(3);
				system("clear");
				system("~/Documents/Projet/vazoMisoma/usr/local/src2/francais");
				exit(1);
	
		case 0: printf("\033[32m\nO K\t\033[0m");
				//sleep(3);
				system("clear");
				system("~/Documents/Projet/vazoMisoma/usr/local/src2/malagasy");
				exit(1);
	
		case 2: printf("\033[32m\nO K\t\033[0m");
				//sleep(3);
				system("clear");
				system("~/Documents/Projet/vazoMisoma/usr/local/src2/english");
				exit(1);
	}
/*
	system("clear");
///Choix langue
	printf("\t\t\t\t\033[34;5mVazo Misoma\n\033[0m");
	printf("\n");
	system("cat ~/Documents/Projet/vazoMisoma/usr/local/fichier/langue");
	printf("\n\033[33mEntrer le numero\033[0m :\n=>\t");
	scan=scanf("%d",&num);

	if(scan==0){
		scanf("%s",string);
	}
	
	if(num>3||num<1){
		printf("\033[31;5mErreur!!\033[0m");
		sleep(2);
		//printf("\n");
		system("clear");
		goto eto;
	}
	switch(num){
		case 2:	printf("\033[32m\nO K\t\033[0m");
				sleep(3);
				system("clear");
				system("~/Documents/Projet/vazoMisoma/usr/local/src2/francais");
	
		case 1: printf("\033[32m\nO K\t\033[0m");
				sleep(3);
				system("clear");
				system("~/Documents/Projet/vazoMisoma/usr/local/src2/malagasy");

	
		case 3: printf("\033[32m\nO K\t\033[0m");
				sleep(3);
				system("clear");
				system("~/Documents/Projet/vazoMisoma/usr/local/src2/english");
	}
*/

	return 0;
}

///Les fonctions

void AffichageEntree(){
	
	system("figlet V");
	usleep(200000);
	system("clear");
	system("figlet VA");
	usleep(200000);
	system("clear");
	system("figlet VAZ");
	usleep(200000);
	system("clear");
	system("figlet VAZO");
	usleep(200000);
	system("clear");
	
	printf("\033[31m\n");
	system("figlet VAZO ");
    usleep(200000);
    system("clear");
	system("figlet VAZO M");
	usleep(200000);
	system("clear");
	system("figlet VAZO MI");
	usleep(200000);
	system("clear");
	printf("\033[0m");
	
	printf("\033[32m\n");
	system("figlet VAZO MIS");
	usleep(200000);
	system("clear");
	system("figlet VAZO MISO");
	usleep(200000);
	system("clear");
	system("figlet VAZO MISOM");
	usleep(200000);
	system("clear");
	system("figlet VAZO MISOMA");
	sleep(1);
	system("clear");
	printf("\033[0m");
	
	
		printf("\033[31m m   m   mmm   mmmmm   mmm          mmmmm  mmm     mmm    mmm   mmmmm   mmm\033[0m\n");
		usleep(500000);
		printf("\033[32m  m m       #     m   #   #         # # #    #    #      #   #  # # #      #\033[0m\n");
        usleep(500000);
		printf("\033[28m  #m#   m°°°#   m°    #   #         # # #    #     °°°m  #   #  # # #  m°°°#\033[0m\n");
		usleep(500000);
		printf("\033[31m   #    °mm°#  #mmmm  °#m#°         # # #  mm#mm  °mmm°  °#m#°  # # #  °mm°#\033[0m\n");
		usleep(500000);
		system("clear");
			
}
