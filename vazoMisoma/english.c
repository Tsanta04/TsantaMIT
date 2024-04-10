#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<time.h>
#include<unistd.h>
#include<ctype.h>
#include<ncurses.h>


int max(int a, int b);
int request(char donnee[3][200]);
int homePage(char langue[5][100]);
char* get(char* commande);
void scoreFileRegister(int numero, int* resultat, char* file);
void scoreRegister(int* resultat);
void debutJeu1(int* repetition,char* artiste,int* resultat,char* joueur);
void debutJeu2(int* resultat,char* joueur);
void reorderingName(int* resultat,int numero,int bestscore,char* joueur);
void lyricsTranslating(int* resultat,int numero,int bestscore,char* joueur);
void gameDescription();
void revenirAcceuil(char *reponse);
int menuJeu(char langue[5][100]);
void score(int* resultat,int bestscore,char* joueur);
void guessingSong(int* resultat,int numero,int bestscore,char* joueur);
void aide();
void AffichageEntree();
void debutJeu3(int* repetition,char* categorie,int* resultat,char* joueur);
void affichage(char *entree);
void chargement();
void scoreInfo(int theBest1,int theBest2,int theBest3);
int meilleurScore(char* file);
int gamerRegister(char* joueur, int* score);
int* scoreRegister2(int number);

int main(int argc, char **argv){
///Les variables

    int n=0;		//numéro d'acceuil
    int numero=0;
    char f[12];		//recuperer les valeurs non recupérés par le scanf
    int k=0;		//numéro de menu
	int reponse;
	int scan=1;
	int* resultat;
	int opt=getopt(argc,argv,"DHLRG");
	int bestscore1=meilleurScore("score1");
	int bestscore2=meilleurScore("score2");
	int bestscore3=meilleurScore("score3");
	char joueur[100];
	char langue[5][100]={"Game's description","Mini-games","Help","Scores","Quit"};
	char menu[5][100]={"Lyrics translating","Singer's name re-ordering","Guess the song","Come back to home page","Mini-games"};

///Initialisation
	resultat=(int*)malloc(sizeof(int)*3);
///tête

	//AffichageEntree();
	system("clear");
    affichage("Welcome to \033[34mVAZO MISOMA\033[0m!!!!");
    sleep(1);
    system("clear");

///ENregistrer le joueur
	numero=gamerRegister(joueur,resultat);

///Traitement (+option)
if(opt=='D'){gameDescription();}
else if(opt=='H'){aide();}
else if(opt=='L'){lyricsTranslating(resultat,numero,bestscore1,joueur);} 
else if(opt=='R'){reorderingName((resultat+1),numero,bestscore2,joueur);}
else if(opt=='G'){guessingSong((resultat+2),numero,bestscore3,joueur);}

else if(opt==-1){
	
 while(1){ 			//Boucle pour revenir à la page d'acceuil
	n=homePage(langue);
	while(1){ 		//Boucle pour l'entrée des numéros de choix
///Traitement des choix
		if(n>=0 && n<=3){	//Si le numéro entré est compris entre les numéros de choix
			system("clear");
			switch(n){		//Tous les choix
				case 0:		
						while(1){				//boucle pour revenir à la page d'acceuil ou non (X)
							gameDescription();      //fonctions description du jeu	
							printf("\nPress on \033[33m< 1 >\033[0m to come back to home page\n=>");
							reponse=0;
							scan=scanf("%d",&reponse);		
							if(scan==0){		//si la valeur entrée n'est pas e type int
								scanf("%s",f);
								}
							system("clear");		
							//sleep(1);
							if(reponse ==1){	//Si oui, on sort de ce boucle (X)
								system("clear");
						break;                 
							}
						}
	break;			//Sort de la boucle pour l'entrée des numéros de choix, et revenir à la page d'acceuil
				case 1:	while(1){			//Boucle pour l'option 2 (les jeux) (tant qu'on ne veut pas sortir, le jeu se répète)            //initialiser k a chaque boucle	
							k=menuJeu(menu);
							clear();
								if(k==0){
									system("clear");
									lyricsTranslating(resultat,numero,bestscore1,joueur);
									
								}	
								else if(k==1){
									system("clear");
									reorderingName((resultat+1),numero,bestscore2,joueur);
								}
								else if(k==2){
									system("clear");
									guessingSong((resultat+2),numero,bestscore3,joueur);
									
								}	
								else if(k==3){
									system("clear");
						break;			//pour sortir l'option 2 des jeux
								}	
						}
	break;			//Sort de la boucle pour l'entrée des numéros de choix d'acceuil, et revenir à la page d'acceuil (si on sort du boucle précédent)
				case 2: aide();	
						clear();
	break;
				case 3: //scoreInfo(&resultat[0],&resultat[1],&resultat[2],&bestscore1,&bestscore2,&bestscore3);
						scoreInfo(bestscore1,bestscore2,bestscore3);clear();
	break;
			}
	break;			//Sort de la boucle pour l'entrée des numéros de choix d'acceuil, et revenir à la page d'acceuil (si on sort du boucle précédent)
		}
		
		else if(n==4){  //Si quitter
			system("clear");
			AffichageEntree();
			system("clear");
			exit(1);
	break;	//Sort de la boucle pour l'entrée des numéros de choix d'acceuil, et revenir à la page d'acceuil
		}
	break;	//Puis on sort de grand boucle pour revenir à la page d'acceuil
		
   	 }
   }
  } 
return 0;
}

///Les fonctions
int homePage(char langue[5][100]){
///Les variables
	int x,y;	//coodonnee

initscr();
///Creation window
	getmaxyx(stdscr,y,x);
	WINDOW* titre=newwin(3,x-20,0,10);
	WINDOW* win1=newwin(3,x-10,5,5);
	WINDOW* win2=newwin(3,x-10,9,5);
	WINDOW* win3=newwin(3,x-10,13,5);
	WINDOW* win4=newwin(3,x-10,17,5);
	WINDOW* win5=newwin(3,x-10,21,5);
	//WINDOW* rep=newwin(3,10,y-6,2);
	
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
				fleche=4;
			}
			else if(fleche>0){
				fleche--;
			}
		}
		else if(clavier==KEY_DOWN){
			if(fleche==4){
				fleche=0;
			}
			else if(fleche<4){
				fleche++;
			}
		}
		box(win1,0,0);
		box(win2,0,0);
		box(win3,0,0);
		box(win4,0,0);
		box(win5,0,0);
		if(fleche==0){
			wbkgd(win1, COLOR_PAIR(2));
			wbkgd(win2, A_NORMAL);
			wbkgd(win3, A_NORMAL);
			wbkgd(win4, A_NORMAL);
			wbkgd(win5, A_NORMAL);			
		}
		if(fleche==1){
			wbkgd(win2, COLOR_PAIR(2));
			wbkgd(win1, A_NORMAL);
			wbkgd(win3, A_NORMAL);
			wbkgd(win4, A_NORMAL);
			wbkgd(win5, A_NORMAL);
		}
		if(fleche==2){
			wbkgd(win3, COLOR_PAIR(2));
			wbkgd(win1, A_NORMAL);
			wbkgd(win2, A_NORMAL);
			wbkgd(win4, A_NORMAL);
			wbkgd(win5, A_NORMAL);
		}
		if(fleche==3){
			wbkgd(win4, COLOR_PAIR(2));
			wbkgd(win1, A_NORMAL);
			wbkgd(win2, A_NORMAL);
			wbkgd(win3, A_NORMAL);
			wbkgd(win5, A_NORMAL);
		}
		if(fleche==4){
			wbkgd(win5, COLOR_PAIR(2));
			wbkgd(win1, A_NORMAL);
			wbkgd(win2, A_NORMAL);
			wbkgd(win4, A_NORMAL);
			wbkgd(win3, A_NORMAL);
		}

		mvwprintw(win1,1,25,"%s",langue[0]);
		mvwprintw(win2,1,28,"%s",langue[1]);
		mvwprintw(win3,1,30,"%s",langue[2]);
		mvwprintw(win4,1,29,"%s",langue[3]);
		mvwprintw(win5,1,29,"%s",langue[4]);

//Mise a jour
		wrefresh(titre);
		wrefresh(win1);
		wrefresh(win2);
		wrefresh(win3);
		wrefresh(win4);
		wrefresh(win5);
//Getchar		
		noecho();
		wmove(stdscr,0,0);
		clavier=wgetch(stdscr);
		refresh();
}
	endwin();
	
	return fleche;
}
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
void lyricsTranslating(int* resultat,int numero,int bestscore,char* joueur){
///Les variables
	char f[10];
	char artistName[100];
	char commande1[200];
	int repetition=0;
	int test=1;
	int scan=0;
	int x=0;
//	int vSleep=1;
	
///Introduction
	
		
///Les listes des artistes disponibles
	while(1){
		
		printf("\t\t\t\033[36mVAZO MISOMA: Lyrics Translating\033[0m\n\n");
		scoreRegister(resultat);
		
	 ici:
		printf("\t\t\t\033[36mVAZO MISOMA: Lyrics Translating\033[0m\n\n");
    	printf("\033[037mThis mini-game consists of translating a part of song lyrics written in English in Malagasy.\n\033[0m");
       
        if(x==0){affichage("\nHere are the artists available at the moment:\n\n");}
			
	
		//printf("\nVoici les artistes disponibles pour le moment:\n"); 
		sprintf(commande1,"cat /usr/local/fichier/listeArtistesExistants");
		system(commande1);
///Entrer dans le fichier de l'artiste
		printf("\nChoose your favorite artist amoung among what in the list above:\033[33m(entrer le nom)\033[0m\n=>");
/*	char *choixartiste={"\nChoisir votre Artiste prefere(entrer le nom):\n"};
	      for(int i=0;i<strlen(choixartiste);i++){
			printf("\033[35m%c\033[0m",*(choixartiste+i));
			usleep(50000);
			fflush(stdout);
			}*/
		scanf("%s",artistName);
		sprintf(commande1,"test -e /usr/local/fichier/%s/",artistName);
		test=system(commande1);
	//printf("%d",test);
		if(test!=0){
			printf("\033[5;31mERROR:Artist not found!!!\033[0m\n");
			sleep(2);
			system("clear");
			x++;
			goto ici;
		}
		else if(test==0){
			sleep(1);
			system("clear");
			
				affichage("\n\t\tOK!!!! Please wait for a moment\n");
			
				   system("clear");    	
	            chargement(); 
			    sleep(2);
			    int u=0;
			while(1){
				char donnee1[3][200]={"Lyrics Translating\n\n\t\tARE YOU READY?","Quit","Ready"};
				test=request(donnee1);
				if(test==0){
					sleep(1);
					clear();
					break;
				}
				else if(test==1){
					//printf("\n\t Commençons alors le jeu!!!\n");
					sleep(2);
					
						system("clear");
				///Debut du jeu;
				if(u==0){ affichage("Let's start the game!!!!\nYou have \033[33m3\033[0m chances to guess the right answer.\n");
					      system("clear");
					      }
				here:
					debutJeu1(&repetition,artistName,resultat,joueur);
					score(resultat,bestscore,joueur);
						u++;
					sleep(2);
					system("clear");
				test=123;
				char donnee2[3][200]={"Lyric's translating\n\n\tDo you want to continue or to quit this game?","Quit","Replay"};
				test=request(donnee2);	
				if(test==1){
					clear();
					goto here;
				}
				
				if(test==0){
					scoreFileRegister(numero,resultat,"score1");
	break;
				}
			}
			break;
			}
		}
	break;
		}
		clear();
}
void gameDescription(){
	//printf("\t\t\t\tVAZO MISOMA\n\n");
	printf("\t\t\t\033[36m Game's description\033[0m \n\n");
	system("cat ~/Mahaleo/descriptionJeu");
}
void revenirAcceuil(char *reponse){
	printf("Press on ' x ' to come back to home page:\n");
	scanf("%c",reponse);
	//sleep(1);
		if(*reponse =='x'){
			system("clear");
		}
}
int menuJeu(char langue[5][100]){
	///Les variables
	int x,y;	//coodonnee
initscr();
///Creation window
	getmaxyx(stdscr,y,x);
	WINDOW* titre=newwin(3,x-20,0,10);
	WINDOW* win=newwin(3,x-5,5,2);
	WINDOW* win1=newwin(3,x-10,9,5);
	WINDOW* win2=newwin(3,x-10,13,5);
	WINDOW* win3=newwin(3,x-10,17,5);
	WINDOW* win4=newwin(3,x-10,21,5);
	
///Colors
	start_color();
	init_pair(1,COLOR_GREEN,0);
	init_pair(2,COLOR_WHITE,COLOR_RED);
///Traitement
	int clavier=0,fleche=0;
	
while(clavier!='\n'){
	
///Affichage titre
	box(titre,'|','~');
	box(win,'.','.');
	attron(COLOR_PAIR(1));
	wattron(titre,A_BOLD);
	wattron(win,A_BLINK);
		mvwprintw(titre,1,8,"\t\tVazo Misoma");
		mvwprintw(win,1,2,"%s",langue[4]);
	wattroff(win,A_BLINK);
	wattroff(titre,A_BOLD);
	attroff(COLOR_PAIR(1));
	refresh();
	wrefresh(titre);
	wrefresh(win);
	wrefresh(win1);
	wrefresh(win2);
	wrefresh(win3);
	
///Affichage langue
keypad(stdscr,true);
//Qlq variables utils
		if(clavier==KEY_UP){
			if(fleche==0){
				fleche=3;
			}
			else if(fleche>0){
				fleche--;
			}
		}
		else if(clavier==KEY_DOWN){
			if(fleche==3){
				fleche=0;
			}
			else if(fleche<3){
				fleche++;
			}
		}
		box(win1,0,0);
		box(win2,0,0);
		box(win3,0,0);
		box(win4,0,0);
		if(fleche==0){
			wbkgd(win1, COLOR_PAIR(2));
			wbkgd(win2, A_NORMAL);
			wbkgd(win3, A_NORMAL);
			wbkgd(win4, A_NORMAL);
		}
		if(fleche==1){
			wbkgd(win2, COLOR_PAIR(2));
			wbkgd(win1, A_NORMAL);
			wbkgd(win3, A_NORMAL);
			wbkgd(win4, A_NORMAL);
		}
		if(fleche==2){
			wbkgd(win3, COLOR_PAIR(2));
			wbkgd(win1, A_NORMAL);
			wbkgd(win2, A_NORMAL);
			wbkgd(win4, A_NORMAL);
		}
		if(fleche==3){
			wbkgd(win4, COLOR_PAIR(2));
			wbkgd(win1, A_NORMAL);
			wbkgd(win2, A_NORMAL);
			wbkgd(win3, A_NORMAL);
		}
		mvwprintw(win1,1,5,"%s",langue[0]);	//25
		mvwprintw(win2,1,5,"%s",langue[1]);	//22
		mvwprintw(win3,1,5,"%s",langue[2]);	//27
		mvwprintw(win4,1,5,"%s",langue[3]);	//21
		
//Mise a jour
		wrefresh(titre);
		wrefresh(win);
		wrefresh(win1);
		wrefresh(win2);
		wrefresh(win3);
		wrefresh(win4);

//Getchar		
		noecho();
		wmove(stdscr,0,0);
		clavier=wgetch(stdscr);
		refresh();
}
	endwin();
	
	return fleche;
}
void debutJeu1(int* repetition,char* artiste,int* resultat,char* joueur){
	int a=0;	//aléatoire
	char tenavaliny[100];
	char tenatenavaliny[100];
	char variable[100];
	char valiny[100];
	char tabValiny[100];
	char tabTenatenavaliny[100];
	char indice[100];

	//valiny=(char*)malloc(sizeof (char)*100);
///initialisation rand
	srand(time(NULL));
	a=(1+(int)((20.0*rand())/(RAND_MAX +1.0)));
	
///Traitement
 			       
	//printf("\n(Vous n'avez que 3 chances pour entrer....)");
	for(int i=3;i>0;--i){
		printf("\t\t\t\033[36mVAZO MISOMA: Lyrics Translating\033[0m\n\n");
		//printf("\t\t\tALEFAAAAA...!!!\n\n");
		sprintf(variable,"head -%d ~/vazoMisoma/usr/local/fichier/%s/synonyme|tail -1",a,artiste);

		
///Indices
		if(i==1){
				printf("--> Une indication \033[33m(song's title)\033[0m:\n");
				sprintf(indice,"head -%d ~/vazoMisoma/usr/local/fichier/%s/titre|tail -1",a,artiste);
				system(indice);
				printf("\n");
			}

		system(variable);
		sprintf(tenavaliny,"head -%d ~/vazoMisoma/usr/local/fichier/%s/valiny|tail -1",a,artiste);
		//system(tenavaliny);
		FILE* fp=popen(tenavaliny,"r");	
		fgets(tenatenavaliny, sizeof(tenatenavaliny),fp);
		pclose(fp);
///Suite du traitement	
        printf("\n\033[33mAnswer\033[0m=>"); 
		fgets(valiny,100,stdin);
	if((i==3)&&(*repetition==0)){
		fgets(valiny,100,stdin);
		*repetition=1;
	}
///Comparer
		int f=0;
		for(int i=0;(i<=strlen(valiny));i++){
			if(((*(valiny+i)<='Z')&&(*(valiny+i)>='A'))||((*(valiny+i)<='z')&&(*(valiny+i)>='a'))){
				(*(tabValiny+f))=(toupper(*(valiny+i)));
				f++;

			}
		}
		int j=0;
		for(int i=0;(i<strlen(tenatenavaliny));i++){
			if(((*(tenatenavaliny+i)<='Z')&&(*(tenatenavaliny+i)>='A'))||((*(tenatenavaliny+i)<='z')&&(*(tenatenavaliny+i)>='a'))){
				(*(tabTenatenavaliny+j))=(toupper(*(tenatenavaliny+i)));
				j++;
			}
		}
		int k=0;
		int mx=max(j,f);
		for(int i=0;i<mx;i++){
			if( (*(tabTenatenavaliny+i))==(*(tabValiny+i)) ){
				k++;
			}
		}
/*	
		x=strcmp(valiny,tenatenavaliny);
		x=strcmp(tabValiny,tabTenatenavaliny);
		printf("%d\n",x);
		printf("\n%d valiny, %d tenatenavaliny\n", valiny, tenatenavaliny);
*/	
		//if((x)!=0){
		if(k!=j){ 
			//sleep(1);
			printf("\n~~You're \033[31mWRONG\033[0m!Please try again...\n");
			if(i!=1){
				printf("(You only have \033[33m%d\033[0m chance(s).)\n\n",(i-1));
				sleep(2);
				system("clear");
				printf("(Only \033[33m%d\033[0m chance(s).)\n\n",(i-1));
				//*resultat=0;
			}
			if(i==1){
				sleep(1);
				system("clear");
				printf("\n\n\t\t\t\tVAZO MISOMA\n\n");
				printf("\t\tLyrics Translating\n\n");
				printf("\t~~You \033[31mlost\033[0m \033[33m%s\033[0m!!\n\n",joueur);
				printf("Here is the right answer: '%s'",tenatenavaliny);
			}
		}
		//if ((x)==0){
		if(k==j){
			sleep(1);
			system("clear");
			printf("\t\t\t\033[36mVAZO MISOMA: Lyrics Translating\033[0m\n\n");
			printf("\n~~\033[32mCongratulations\033[0m!!You \033[32mwon\033[0m \033[33m%s\033[0m!!\n\n",joueur);
			(*resultat)++;
		break;
			}
	}
}
void reorderingName(int* resultat,int numero,int bestscore,char* joueur){
	int test=0;
	int scan=0;
	char f[10];
	int x=0;
	
	while(1){
		printf("\t\t\t\033[36mVAZO MISOMA: Singer's name re-ordering\033[0m\n\n");
		scoreRegister(resultat);
		char donnee[3][200]={"Singer's name re-ordering\n\n\tThis game consist of messing up Malagasy artist names.\n\t\t\tARE YOU READY??","Ready","Quit"};
			if(x==0){
				    //affichage("\033[037mTHis game consist of messing up Malagasy artist names.\n\033[0m");
				test=request(donnee);
				sleep(1);
			}
			if(test==1){
				clear();
				break;
			}
			else if(test==0){
				clear();
				///Debut du jeu
			  affichage("Let's start the game!!!!\nYou have \033[33m3\033[0m chances to guess the right answer.\n\n");
			   sleep(1);
			   system("clear");
			here:	debutJeu2(resultat,joueur);
					score(resultat,bestscore,joueur);
						affichage("\tDo you want to continue or to quit this game?\n\n");
					
					//printf("\tVoulez-vous reste rejouer ou quitter ce jeu?\n");
				x++;
				test=123;
				char donnee2[3][200]={"Singer's name re-ordering\n\n\tDo you want to continue or to quit this game?","Quit","Replay"};
				test=request(donnee2);
				if(test==1){
					goto here;
				}
				
				if(test==0){
					scoreFileRegister(numero,resultat,"score2");
	break;
				}
			}
   }
   clear();
}
void score(int* resultat,int bestscore,char* joueur){	//les grades
	if(*(resultat)==bestscore){
		system("clear");
		printf("\n\t\t\033[32m!!Congratulations %s!!!\033[0mYou have gotten the best score at the moment\033[0m maintenant!!\n",joueur);
		sleep(3);
		system("clear");
		
	}
	if((*resultat==5)){
		system("clear");
		printf("\n\t\t\033[32m!!Congratulations %s!!!\033[0mYou are a \033[32m'PRE-DIAMOND'\033[0m now!!\n",joueur);
		sleep(3);
		system("clear");
	}
	else if((*resultat==10)){
		system("clear");
		printf("\n\t\t\033[32m!!Congratulations %s!!!\033[0mYou are a \033[32m'DIAMOND 1'\033[0m now!!\n",joueur);
		sleep(3);
		system("clear");
	}
	else if((*resultat==20)){
		system("clear");
		printf("\n\t\t\033[32m!!Congratulations %s!!!\033[0mYou are a \033[32m'DIAMOND 2'\033[0m now!!\n",joueur);
		sleep(3);
		system("clear");
	}
	else if((*resultat==35)){
		system("clear");
		printf("\n\t\t\033[32m!!Congratulations %s!!!\033[0mYou are a \033[32m'DIAMOND 3'\033[0m now!!\n",joueur);
		sleep(3);
		system("clear");
	}
	else if((*resultat==50)){
		system("clear");
		printf("\n\t\t\033[32m!!Congratulations %s!!!\033[0mYou are a \033[32m'DIAMOND 4'\033[0m now!!\n",joueur);
		sleep(3);
		system("clear");
	}
	else if((*resultat==70)){
		system("clear");
		printf("\n\t\t\033[32m!!Congratulations %s!!!\033[0mYou are a \033[32m'DIAMOND 1 star'\033[0m now!!\n",joueur);
		sleep(3);
		system("clear");
	}
	else if((*resultat==95)){
		system("clear");
		printf("\n\t\t\033[32m!!Congratulations %s!!!\033[0mYou are a \033[32m'DIAMOND 2 stars'\033[0m now!!\n",joueur);
		sleep(3);
		system("clear");
	}
	else if((*resultat==125)){
		system("clear");
		printf("\n\t\t\033[32m!!Congratulations %s!!!\033[0mYou are a \033[32m'DIAMOND 3 stars'\033[0m now!!\n",joueur);
		sleep(3);
		system("clear");
	}
	else if((*resultat==160)){
		system("clear");
		printf("\n\t\t\033[32m!!Congratulations %s!!!\033[0mYou are a \033[32m'DIAMOND 4 stars'\033[0m now!!\n",joueur);
		sleep(3);
		system("clear");
	}
}
/*
void debutJeu2(int* resultat,char* joueur){
///Les variables
	char commande[100];
	char comp[100];
	char tenaizy[100];
	char valinkorontana[100];
	char indice[100];
	int m=0,y=0;

	
///Initialisation rand
	srand(time(NULL));
	m=(1+(int)((25.0*rand())/(RAND_MAX +1.0)));
///Traitement
	
	for(int i=3;i>0;i--){
		printf("\t\t\t\033[36mVAZO MISOMA: Singer's name reordering\033[0m\n\n");
		
	/*if(i==3){
		affichage("Commencons alors le jeu!!!!\nVous avez \033[33m3\033[0m chances pour deviner la bonne reponse.\n\n");
		}/			
		sprintf(commande,"head -%d ~/vazoMisoma/usr/local/fichier/valin-korontana|tail -1",m);

		
///Indices
		if(i==1){
			printf("--> Indication \033[33m(song's title)\033[0m:\n=>");
			sprintf(indice,"head -%d ~/Mahaleo/indiceKorontana|tail -1",m);
			system(indice);
			printf("\n");
		}

		
		FILE* fd=popen(commande,"r");
		fgets(tenaizy, sizeof(tenaizy),fd);
		strcpy(comp,tenaizy);
		
		char tmp;
		int len=strlen(tenaizy);
		int numRand=8;
		int numRand2=9;

        ambony:
		for(int i=0;i<57+numRand;i++){
			numRand=((int)(((float)(len)*rand())/(RAND_MAX +1.0)));
			numRand2=(int)(((float)(len)*rand())/(RAND_MAX+1.0));
			while(numRand==numRand2){numRand2=(int)(((float)(len)*rand())/(RAND_MAX+1.0));}
			
			tmp=tenaizy[numRand];
			tenaizy[numRand]=tenaizy[numRand2];
			tenaizy[numRand2]=tmp;
			
			}
		
		int etg=strcmp(tenaizy,comp);	
        if(etg==0){goto ambony;}
        printf("\033[33m--> \033[0m");
		for(int i=0;i<len;i++){
			if(tenaizy[i]!='\n'){
			printf("\033[34m~\033[0m%c\033[34m~\033[0m",tenaizy[i]);}}
                
		printf("\n\033[33mAnswer\033[0m=>");
		
        fgets(valinkorontana,100,stdin);
        
	  for(int i=0;i<strlen(tenaizy);i++){
			   
	     if(i<strlen(valinkorontana) && valinkorontana[i]!='\n'){
		        	   
			   if(valinkorontana[i]==comp[i]){
				   if(valinkorontana[i]!=' '){printf("\033[32m%c\033[0m",valinkorontana[i]);}
				   else{printf("\033[42m%c\033[0m",valinkorontana[i]);}
				   }
			   else if(valinkorontana[i]!=comp[i]){
				   if(valinkorontana[i]!=' '){printf("\033[31m%c\033[0m",valinkorontana[i]);}
				   else{printf("\033[41m%c\033[0m",valinkorontana[i]);}
					   }
			   
			  }
			     
		   } 
			     
		if(i!=3){
			   if(strlen(tenaizy)>strlen(valinkorontana)){
				   for(int i=strlen(valinkorontana);i<strlen(tenaizy);i++){
					   printf("\033[31m*\033[0m");
				       }
				   }
			  
			   else if(strlen(tenaizy)<strlen(valinkorontana)){
				   
				   for(int i=strlen(tenaizy);i<strlen(valinkorontana);i++){
				    if(valinkorontana[i]!='\n'){
						printf("\033[9;31;5m%c\033[0m",valinkorontana[i]);
						}
			           }
		              }
		              
		       }        
	
		if(i==3){
			fgets(valinkorontana,100,stdin);
		//	printf("%ld",strlen(valinkorontana));
		 for(int i=0;i<strlen(tenaizy);i++){
			   
	     if(i<strlen(valinkorontana) && valinkorontana[i]!='\n'){
		        	   
			   if(valinkorontana[i]==comp[i]){
				   if(valinkorontana[i]!=' '){printf("\033[32m%c\033[0m",valinkorontana[i]);}
				   else{printf("\033[42m%c\033[0m",valinkorontana[i]);}
				   }
			   else if(valinkorontana[i]!=comp[i]){
				   if(valinkorontana[i]!=' '){printf("\033[31m%c\033[0m",valinkorontana[i]);}
				   else{printf("\033[41m%c\033[0m",valinkorontana[i]);}
					   }
			   
			  }
			     
		   } 
			     
	
			   if(strlen(tenaizy)>strlen(valinkorontana)){
				   for(int i=strlen(valinkorontana);i<strlen(tenaizy);i++){
					   printf("\033[31m*\033[0m");
				       }
				   }
			  
			   else if(strlen(tenaizy)<strlen(valinkorontana)){
				   
				   for(int i=strlen(tenaizy);i<strlen(valinkorontana)-1;i++){
				    if(valinkorontana[i]!='\n'){
						printf("\033[9;31;5m%c\033[0m",valinkorontana[i]);
						}
			           }
		              }
		              
		
		}

		y=strcmp(comp,valinkorontana);

      
		if(y!=0){ 
			
			if(i!=1){
				printf("\n~~You are \033[31mWrong\033[0m!Please try again...\n");
				printf("You only have\033[33m%d\033[0m chances.\n\n",(i-1));
				sleep(1);
				system("clear");

			}
			if(i==1){
				printf("\n");sleep(1);
				system("clear");
				printf("\t\t\t\033[36mVAZO MISOMA: Singer's name reordering\033[0m\n\n");
				printf("\t~~You \033[31mlost\033[0m!! \033[33m%s\033[0m!!\n\n",joueur);
				
			}
		}
		if (y==0){
			sleep(2);
			system("clear");
			printf("\t\t\t\033[36mVAZO MISOMA: Singer's name reordering\033[0m\n\n");
			printf("\t~~\033[32mCongratulations\033[0m!!You \033[32mwon\033[0m \033[33m%s\033[0m!!\n\n",joueur);
			(*resultat)++;
	break;
		}
	}
}
*/	
void guessingSong(int* resultat,int numero,int bestscore,char* joueur){
	char categorie[100];
	char commande1[1000];
	int test=1;
	int repetition=0;
	while(1){
		printf("\t\t\t\033[36mVAZO MISOMA: Guess the Song\033[0m\n\n");
		scoreRegister(resultat);
		int x=0;
		while(1){
		  ici:
		  printf("\t\t\t\033[36mVAZO MISOMA: Guess the Song\033[0m\n\n");
		  printf("  This game consists of guessing the song played by giving the song title and singers\n\n");
			if(x==0){
			    affichage("\nHere are the song categories avalaible at the moment:\n\n");
		        sleep(2);
			 }
			//printf("\nVoici les artistes disponibles pour le moment:\n"); 
			
			sprintf(commande1,"cat /usr/local/fichier/listeCategorie");
			system(commande1);
///Entrer dans le fichier de SONGS
			printf("Choose the song category to launch \033[33m(Enter the noun)\033[0m:\n=>");
			scanf("%s",categorie);
			sprintf(commande1,"test -e /usr/local/Audio/%s/%s",categorie,categorie);
			test=system(commande1);
		//printf("%d",test);
			if(test!=0){
				printf("\033[5;31mERROR:Category not found!!!\033[0m\n");
				sleep(2);
				system("clear");
				x++;
				goto ici;
			}
			else if(test==0){
				sleep(1);
				system("clear");
				affichage("\n\t\tOK!!!! PLease wait for a moment\n");
				   system("clear");    	
			       chargement();
			    sleep(2);
					system("clear");
				char donnee1[3][200]={"Guess the Song\n\n\t\tARE YOU READY?","Quit","Ready"};
				test=request(donnee1);
				if(test==0){
					sleep(1);
					clear();
					break;
				}
				else if(test==1){
					//printf("\n\t Commençons alors le jeu!!!\n");
					sleep(2);
					
						system("clear");
				///Debut du jeu
							//debutJeu1(artistName,&resultat);
			here:				debutJeu3(&repetition,categorie,resultat,joueur);
							score(resultat,bestscore,joueur);
							sleep(2);
							system("clear");
				test=123;
				char donnee2[3][200]={"Guess the song\n\n\tDo you want to continue or to quit this game?","Quit","Replay"};
				test=request(donnee2);	
				if(test==1){
					clear();
					goto here;
				}
				if(test==0){
					scoreFileRegister(numero,resultat,"score3");
	break;
				}
			}
		break;
			}
	}
	break;
	}
	clear();
}


void debutJeu2(int* resultat,char* joueur){
///Les variables
	char commande[100];	//hanaovana commande
	char comp[100];		//ilay tena izy
	char tenaizy[100];	//ilay mikorontana
	char valinkorontana[100];	//valiny omen'ny olona
	char* indice=(char*)malloc(100);
	int m=0,y=0;

	
///Initialisation rand
	srand(time(NULL));
	m=(1+(int)((25.0*rand())/(RAND_MAX +1.0)));


///Annonce	
	for(int i=3;i>0;i--){
/*		printf("\t\t\t\033[36mVAZO MISOMA: Singer's name reordering\033[0m\n\n");
		
	if(i==3){
		printf("Commencons alors le jeu!!!!\nVous avez \033[33m3\033[0m chances pour deviner la bonne reponse.\n\n");
	}		
*/

///Debut Ncurses 
	initscr();

///Colors
	start_color();
	init_pair(1,COLOR_WHITE,COLOR_RED);
	init_pair(2,COLOR_GREEN,0);
	
///Annonce
	attron(COLOR_PAIR(1));
	mvprintw(1,10,"VAZO MISOMA: Singer's name reordering");
	attroff(COLOR_PAIR(1));
	
	attron(COLOR_PAIR(2));
	mvprintw(3,7, "Let's start the game!!!!\nYou have 3 chances to guess the right answer.");
	attroff(COLOR_PAIR(2));
	//mvprintw(5,3,"(Appuyez sur 'ENTRER' pour entrer la reponse)");
	
	
	refresh();
	
///Recuperataion du valiny
		sprintf(commande,"head -%d /usr/local/fichier/valin-korontana|tail -1",m);
		FILE* fd=popen(commande,"r");
		fgets(tenaizy, sizeof(tenaizy),fd);
		strcpy(comp,tenaizy);
		comp[strlen(comp)-1]='\0';
		
///Gestion du desordre
		char tmp;
		int len=strlen(tenaizy);
		int numRand=8;
		int numRand2=9;

        ambony:
		for(int i=0;i<57+numRand;i++){
			numRand=((int)(((float)(len)*rand())/(RAND_MAX +1.0)));
			numRand2=(int)(((float)(len)*rand())/(RAND_MAX+1.0));
			while(numRand==numRand2){
				numRand2=(int)(((float)(len)*rand())/(RAND_MAX+1.0));
			}
			tmp=tenaizy[numRand];
			tenaizy[numRand]=tenaizy[numRand2];
			tenaizy[numRand2]=tmp;
		}
		
		int etg=strcmp(tenaizy,comp);	
        if(etg==0){goto ambony;}	//raha tsy mikorontana dia averina

		
///Indices a la derniere tentative
	if(i==1){
		mvprintw(5,2,"--> Indication (the song's title)");
		sprintf(indice,"head -%d /usr/local/fichier/indiceKorontana|tail -1",m);
		indice=get(indice);
		mvprintw(5,42,"%s",indice);
		printf("\n");
	}
	
/*
///Affichage du desordre a arranger
        printf("\033[33m~~ \033[0m");
		for(int i=0;i<len;i++){
			if(tenaizy[i]!='\n'){
				printf("\033[34m~\033[0m%c\033[34m~\033[0m",tenaizy[i]);
			}
		}
		printf("\n\033[33mRéponse\033[0m=>");
*/

///Affichge de desordre
	WINDOW* window = newwin(12,55,7,7);

noecho();
keypad(stdscr,true);
int c=0;
while(c!='\n'){
	int test=0;
	int tour=0;
	int** place=(int**)malloc(sizeof(int*)*len);
	for(int i=0;i<len;i++){*(place+i)=(int*)malloc(sizeof(int)*2);}
	int x,y;
	for(int i=0;i<len;i++){
here:	numRand=((int)(((float)(y)*rand())/(RAND_MAX +1.0)));
		numRand2=(int)(((float)(x)*rand())/(RAND_MAX+1.0));
		*(*(place+i))=numRand;*((*(place+i))+1)=numRand2;
		for(int i=0;i<tour;i++){
			if((numRand==place[i][0])&&(numRand==place[i][1])){
				test++;
			}
		}
eto:getmaxyx(window,y,x);
	box(window,'|','-');
		if(test==0){
			wattron(window,A_BOLD);
			if((numRand==0)||(numRand>12)||(numRand2==0)||(numRand2>50)){goto here;}
			mvwprintw(window,numRand,numRand2,"%c",tenaizy[i]);
			wattroff(window,A_BOLD);
			wrefresh(window);
			tour++;
		}
		else if(test>0){goto here;}
	}
	wmove(stdscr,0,0);	
	//sleep(3);
	c=getch();
	if((c!='\n')&&(c!=KEY_UP)){goto eto;}
	wclear(window);
}

///Entrer la reponse
	echo();
	int x,y;
	getmaxyx(stdscr,y,x);
	WINDOW* reponse = newwin(3,x-4,y-4,2);
	box(reponse,0,0);
	wbkgd(reponse, COLOR_PAIR(2));
	mvwprintw(reponse,1,1,"The answer =>");
	wscanw(reponse,"%s",valinkorontana);
	wrefresh(reponse);
	sleep(2);
/*
///Entrer la reponse
	fgets(valinkorontana,100,stdin);
*/

endwin();
clear();
system("clear");

///Analyse de la reponse (+affichage)       
printf("\t\t\t\033[36mVAZO MISOMA: Singer's name reordering\033[0m\n\n\033[032mThe result:\033[0m");
	for(int i=0;i<strlen(tenaizy);i++){
		if(i<strlen(valinkorontana) && valinkorontana[i]!='\n'){
			if(valinkorontana[i]==comp[i]){
				if(valinkorontana[i]!=' '){
					printf("\033[32m%c\033[0m",valinkorontana[i]);
				}
				else{
					printf("\033[42m%c\033[0m",valinkorontana[i]);
				}
		   }
			else if(valinkorontana[i]!=comp[i]){
				if(valinkorontana[i]!=' '){
					printf("\033[31m%c\033[0m",valinkorontana[i]);
				}
				else{
					printf("\033[41m%c\033[0m",valinkorontana[i]);
				}
			}   
		}			     
	} 
	if(strlen(tenaizy)>strlen(valinkorontana)){
		for(int i=strlen(valinkorontana);i<strlen(tenaizy);i++){
			printf("\033[31m*\033[0m");
		}
	}	  
	else if(strlen(tenaizy)<strlen(valinkorontana)){		   
		for(int i=strlen(tenaizy);i<strlen(valinkorontana);i++){
			if(valinkorontana[i]!='\n'){
				printf("\033[9;31;5m%c\033[0m",valinkorontana[i]);
			}
	    }
	} 

///Test+Annonce si c'est la vraie ou la fauuse reponse
		y=strcmp(comp,valinkorontana);
		if(y!=0){
			if(i!=1){
				printf("\n~~You are \033[31mWrong\033[0m!Please try again...\n");
				printf("You only have\033[33m%d\033[0m chances.\n\n",(i-1));
				sleep(1);
				system("clear");
			}
			if(i==1){
				printf("\n");
				system("clear");
				printf("\t\t\t\033[36mVAZO MISOMA: Singer's name reordering\033[0m\n\n");
				printf("\t~~You \033[31mlost\033[0m!! \033[33m%s\033[0m!!\n\n",joueur);
				sleep(1);
			system("clear");
			}
		}
		if (y==0){
			system("clear");
			printf("\t\t\t\033[36mVAZO MISOMA: Singer's name reordering\033[0m\n\n");
			printf("\t~~\033[32mCongratulations\033[0m!!You \033[32mwon\033[0m \033[33m%s\033[0m!!\n\n",joueur);
			(*resultat)++;
			sleep(2);	
			system("clear");
	break;
		}
	}
	clear();
}	

void debutJeu3(int* repetition,char* categorie,int* resultat,char* joueur){
///Les variables
	char commande1[100];
	/*char commande2[100];	
	char commande3[100];*/
	char titreArtiste[100];
	char valiny[100];
	char playPause[200];
	int n=0;
	char tabValiny[100];
	char tabTitreArtiste[100];
	
///Initialisation de rand
	srand(time(NULL));
	n=(1+(int)((24.0*rand())/(RAND_MAX +1.0)));

///Traitement des consignes
    
	sprintf(commande1,"head -%d /usr/local/Audio/%s/%s|tail -1",n,categorie,categorie);
	//system (commande1);
	FILE *fp=popen(commande1,"r");
	fgets(titreArtiste,100,fp);
	//titreArtiste[strlen(titreArtiste)-1]="\0";
	//sprintf(commande3,"%s.mp3",titreArtiste);
	pclose(fp);
	int	x=11;
	printf("%s\n",titreArtiste);
	clear();
///Traitements
	for(int i=3;i>0;i--){
if(i==3){
	initscr();
keypad(stdscr,true);
do{
	int x,y;
	getmaxyx(stdscr,y,x);
	WINDOW* win1=newwin(3,x-10,1,5);
	WINDOW* win2=newwin(y-10,x-4,5,2);
	WINDOW* win3=newwin(3,4,y-5,(x/2)-2);
///Colors
	start_color();
	init_pair(1,COLOR_GREEN,0);
	init_pair(2,COLOR_WHITE,COLOR_RED);
///Box
	box(win1,'|','~');
	box(win2,'.','.');
	box(win3,0,0);
///Affichage
	//wattron(win1,COLOR_PAIR(1));
	attron(A_BOLD);
		mvwprintw(win1,1,3,"VAZO MISOMA: Guess the Song");
	wattroff(win1,COLOR_PAIR(1));
		mvwprintw(win2,2,7,"Please write on your answer like:\t<title-Artist1&Artist2>");
		mvwprintw(win2,5,15,"NB\t: Listen to the song played..");
		mvwprintw(win2,8,3,"Press on <q> when the song stop playing or when you are ready to enter");
		mvwprintw(win2,9,20," the answer...\n\n");
	attroff(A_BOLD);
	wattron(win3,COLOR_PAIR(2));
	wattron(win3,A_BLINK);
		mvwprintw(win3,1,1,"OK");
	wattron(win3,A_BLINK);
	wattroff(win3,COLOR_PAIR(2));
///Mise a jour
	refresh();
	wrefresh(win1);
	wrefresh(win2);
	wrefresh(win3);
	wmove(stdscr,0,0);
}
while(wgetch(stdscr)!='\n');
	endwin();
	system("clear");
	clear();
	sleep(2);		
}
		sprintf(playPause,"rvlc --run-time=10 --start-time=%d /usr/local/Audio/%s/%s &",x,categorie,titreArtiste);
		system(playPause);
		system("clear");
	    printf("\t\t\t\033[36mVAZO MISOMA: Guess the Song\033[0m\n\n");
		printf("\t\033[31mNB\033[0m\t: Listen to the song played..\nPress on \033[33m<q>\033[0m when the song stop playing or when you are ready to enter the answer...\n\n");
		printf("\n\n\tEnter the \033[36mtitle\033[0m and the\033[33msinger\033[0m (\033[36m'Title'\033[0m: \033[33m'Singer's name'\033[0m):\n=>");
		fgets(valiny,100,stdin);
		if((i==3)&&(*repetition==0)){
		fgets(valiny,100,stdin);
		*repetition=1;
		}
		
///Comparer
		int f=0;
		for(int i=0;(i<(strlen(valiny)));i++){
			if(((*(valiny+i)<='Z')&&(*(valiny+i)>='A'))||((*(valiny+i)<='z')&&(*(valiny+i)>='a'))){
				(*(tabValiny+f))=(toupper(*(valiny+i)));
				f++;

			}
		}
		int j=0;
		for(int i=0;(i<(strlen(titreArtiste)-5));i++){
			if(((*(titreArtiste+i)<='Z')&&(*(titreArtiste+i)>='A'))||((*(titreArtiste+i)<='z')&&(*(titreArtiste+i)>='a'))){
				(*(tabTitreArtiste+j))=(toupper(*(titreArtiste+i)));
				j++;
			}
		}
		int k=0;
		int mx=max(j,f);
		for(int i=0;i<mx;i++){
			if( (*(tabTitreArtiste+i))==(*(tabValiny+i)) ){
				k++;
			}
		}
		
		if(k!=j){ 
			sleep(1);
				
			if(i!=1){
				printf("\n~~You are \033[31mWrong\033[0m!Please try again...\n");
				printf("You only have \033[33m%d\033[0m chances.\n\n",(i-1));
				sleep(1);
				system("clear");
				//*resultat=0;
				x=x+8;
				//*resultat=0;
			}
			if(i==1){
				
				system("clear");
				printf("\t\t\t\033[36mVAZO MISOMA: Guess the Song\033[0m\n\n");
				printf("\t~~You \033[31mlost\033[0m \033[33m%s\033[0m!!\n\n",joueur);
				titreArtiste[(strlen(titreArtiste))-5]='\0';
				printf("Here is the right answer: '%s'",titreArtiste);
			}
		}
		if(k==j){
			sleep(2);
			system("clear");
			printf("\t\t\t\033[36mVAZO MISOMA: Guess the Song\033[0m\n\n");
			printf("\t~~\033[32mCongratulations\033[0m!!You \033[32mwon\033[0m \033[33m%s\033[0m!!\n\n",joueur);
			(*resultat)++;
		break;
			}
	}	
}
void aide(){
	int choix=0;
	int quitter=0;
	char AideLyrics[300];
	char AideReordering[300];
	char AideSong[300];
	char f[10];
	int scan=0;
	char langue[5][100]={"Help for lyrics Translating","Help for 'Singer's name reordering","Help for Guess the song","Quit Help","Help"};
	
	while(1){
	/*
		printf("\t\t\t\t\033[36mHelp\033[0m\t\t\t\t\n\n");
		printf("\033[33m1--\033[0m Help for 'lyrics Translating\n");
		printf("\033[33m2--\033[0m Help for 'Singer's name reordering\n");
		printf("\033[33m3--\033[0m Help for 'Guess the song'\n");
		printf("\033[33m4--\033[0m Quit Help\n\n");
	*/
			choix=menuJeu(langue);
	    if(choix<=3 && choix>=0){
			if(choix==3){system("clear");break;}
				while(quitter!=1){
					switch(choix){
						case 0:system("clear");
						       printf("\t\t\t\033[36mHelp for 'Lyrics Translating'\033[0m\n");
						       sprintf(AideLyrics,"cat ~/Mahaleo/AideLyrics");
							   system(AideLyrics);
					           printf("\nEnter \033[33m<1>\033[0m to quit 'Help for 'Lyrics Translating''\n=> ");
					           scan=scanf("%d",&quitter);
					           if(scan==0){scanf("%s",f);}
					           system("clear");
	           break;
							  
				        case 1:	system("clear");
				                printf("\t\t\t\033[36mHelp for 'Singer's name reordering'\033[0m\n");
				                sprintf(AideReordering,"cat ~/Mahaleo/AideReordering");
								system(AideReordering);
								printf("\nEnter \033[33m<1>\033[0m to quit 'Help for 'Singer's name reordering''\n=> ");                         
                                scan=scanf("%d",&quitter);
					            if(scan==0){scanf("%s",f);}
                                system("clear");
               break;
				  
					    case 2: system("clear");
					     	    printf("\t\t\t\033[36mHelp for 'Guess the song'\033[0m\n");
					     	    sprintf(AideSong,"cat ~/Mahaleo/AideSong");
					     	    system(AideSong);
		                        printf("\nEnter \033[33m<1>\033[0m to quit 'Help for 'Guess the song''\n=> ");
                                scan=scanf("%d",&quitter);
                                if(scan==0){scanf("%s",f);}
	                            system("clear");
               break;
		                               
					}
			}
	   }
	 						 
	}	
}
void affichage(char* entree ){
	for(int i=0;i<=strlen(entree);i++){
		printf("%c",*(entree+i));
		usleep(50000);
		fflush(stdout);
		}
}
void scoreRegister(int* resultat){	//soit on revient a 0 soit on continue les points
	int test=123;
	char donnee[5][200]={"Do you want to continue the last game or do a new game?","Continue","New Game"};
	test=request(donnee);
	if(test==1){
	}
	if(test==0){
		(*resultat)=0;
	}
	sleep(1);
	system("clear");
}
void chargement(){
	char vazo[]="VazoMisoma";
	
			  for(int j=0;j<10;j++){
				 printf("\n\n\n"); 
				 for(int k=0;k<strlen(vazo);k++){	
					if(k%2==0){
						for(int i=0;i<j;i++){printf(" ");}
						printf("\033[32m%c\033[0m",vazo[k]);
					    }
					    
					else{
						for(int i=j;i<10;i++){printf(" ");}
						printf("\033[31m%c\033[0m",vazo[k]);
						}
					  	
					}
					printf("\n");	
					usleep(500000);
					system("clear");
			            
				}
	        
       system("clear");			    
	
	
	}	
void scoreInfo(int theBest1,int theBest2,int theBest3){	//score information (4-score)	
///Les variables
	int num=0;
	char commande[100];	//hanakambanana ny cmmande rehetra
	char* sousPartie;	//hakana ilay valeur rehetra
	int x,y;	//taille du terminale
	
///Initialisation
	sousPartie=(char*)malloc(150);

///Recuperer le nombre de ligne dans les fichiers scores
	sprintf(commande,"wc -l ~/Documents/Projet/vazoMisoma/score/nom|awk '{printf $1}'");
	sousPartie=get(commande);
	num=atoi(sousPartie);	//nombre de ligne dans le score

initscr();

///Creation des fenetres
here:
	getmaxyx(stdscr,y,x);
	WINDOW* nom=newwin((3*y/4),(x/4),0,0);
	WINDOW* lyricsTranslating=newwin((3*y/4),(x/4),0,(x/4));
	WINDOW* reorderingName=newwin((3*y/4),(x/4),0,(x/2));
	WINDOW* guessingSong=newwin((3*y/4),(x/4),0,(3*x/4));
	WINDOW* question=newwin((y/4),x,(3*y/4),0);

///Bordure
	box(nom,0,0);
	box(lyricsTranslating,0,0);
	box(reorderingName,0,0);
	box(guessingSong,0,0);
	box(question,0,0);

///Couleur
	start_color();
	init_pair(1,COLOR_WHITE,COLOR_GREEN);
	
///Traitement d'affichage score
//nom
	wattron(nom,COLOR_PAIR(1));
		mvwprintw(nom,1,2,"Name");
	wattroff(nom,COLOR_PAIR(1));
	for(int i=1;i<=num;i++){
		sprintf(commande,"head -n%d ~/Documents/Projet/vazoMisoma/score/nom|tail -n1",i);		
		sousPartie=get(commande);
		mvwprintw(nom,i+2,1,"%s",sousPartie);
	}

//lyricsTranslating
	wattron(lyricsTranslating,COLOR_PAIR(1));
		mvwprintw(lyricsTranslating,1,1,"Lyrics Translating");
	wattroff(lyricsTranslating,COLOR_PAIR(1));
	for(int i=1;i<=num;i++){
		sprintf(commande,"head -n%d ~/Documents/Projet/vazoMisoma/score/score1|tail -n1",i);		
		sousPartie=get(commande);
		if(atoi(sousPartie)==theBest1){
			wattron(lyricsTranslating,A_REVERSE);
				mvwprintw(lyricsTranslating,i+2,1,"%s",sousPartie);
			wattroff(lyricsTranslating,A_REVERSE);
		}
		else{
			mvwprintw(lyricsTranslating,i+2,1,"%s",sousPartie);
		}
	}

//reorderingName
	wattron(reorderingName,COLOR_PAIR(1));
		mvwprintw(reorderingName,1,2,"Reordering Name");
	wattroff(reorderingName,COLOR_PAIR(1));
	for(int i=1;i<=num;i++){
		sprintf(commande,"head -n%d ~/Documents/Projet/vazoMisoma/score/score2|tail -n1",i);		
		sousPartie=get(commande);
		if(atoi(sousPartie)==theBest2){
			wattron(reorderingName,A_REVERSE);
				mvwprintw(reorderingName,i+2,1,"%s",sousPartie);
			wattroff(reorderingName,A_REVERSE);
		}
		else{
			mvwprintw(reorderingName,i+2,1,"%s",sousPartie);
		}
	}

//guessingSOng
	wattron(guessingSong,COLOR_PAIR(1));
		mvwprintw(guessingSong,1,2,"Guessing the song");
	wattroff(guessingSong,COLOR_PAIR(1));
	for(int i=1;i<=num;i++){
		sprintf(commande,"head -n%d ~/Documents/Projet/vazoMisoma/score/score3|tail -n1",i);		
		sousPartie=get(commande);
		if(atoi(sousPartie)==theBest3){
			wattron(guessingSong,A_REVERSE);
				mvwprintw(guessingSong,i+2,1,"%s",sousPartie);
			wattroff(guessingSong,A_REVERSE);
		}
		else{
			mvwprintw(guessingSong,i+2,1,"%s",sousPartie);
		}
	}

//Question
	mvwprintw(question,1,1,"Press on <1> to quit:\t");
	getyx(question,y,x);
	wmove(question,y,x);

//Mise a jour
	refresh();
	wrefresh(nom);
	wrefresh(lyricsTranslating);
	wrefresh(reorderingName);
	wrefresh(guessingSong);
	wrefresh(question);

//Getch
	noecho();
	int c=getch();

///La reponse
	if(c!='1'){
		goto here;
	}
sleep(1);
endwin();
}
int meilleurScore(char* file){	//trouver ce qui est le meilleur score
///Les variables
	char* commande;
	int num=0;
	int bestScore=0;
///Initialisation
	commande=(char*)malloc(150);
///Entree des donnees
	sprintf(commande,"wc -l ~/Documents/Projet/vazoMisoma/score/nom|awk '{printf $1}'");
	commande=get(commande);
	//printf("%ld",strlen(sousPartie));
	num=atoi(commande);
///Initialisation des donnees
	sprintf(commande,"head -n1 ~/Documents/Projet/vazoMisoma/score/%s|tail -n1",file);	
	commande=get(commande);
	bestScore=atoi(commande);
///Traitement
	for(int i=2;i<=num;i++){
		int tmp=0;
		sprintf(commande,"head -n%d ~/Documents/Projet/vazoMisoma/score/%s|tail -n1",i,file);	
		commande=get(commande);
		tmp=atoi(commande);
		if(tmp>bestScore){
			bestScore=tmp;
		}
	}
	return bestScore;
	
}
int gamerRegister(char* joueur, int* score){	//faire entrer le joueur et enregistrer sont dernier point
///Les variables
	char joueurExistant[100];
	int x,y;
	int nombreJoueur=0;
	char commande[120];
	
///Recuperation des donnees dans les fichiers	
	sprintf(commande,"wc -l ~/Documents/Projet/vazoMisoma/score/nom|awk '{printf $1}'");
	FILE* fp=popen(commande,"r");
	fgets(commande,100,fp);
	pclose(fp);
	nombreJoueur=atoi(commande);
	char tab[nombreJoueur][100];
	
///Traitement d'aafichage des deja inscrits
	for(int i=0;i<nombreJoueur;i++){
		sprintf(commande,"head -n%d ~/Documents/Projet/vazoMisoma/score/nom|tail -n1",i+1);
		FILE* fp=popen(commande,"r");
		fgets(joueurExistant,100,fp);
		joueurExistant[(strlen(joueurExistant))-1]='\0';
		strcpy(tab[i],joueurExistant);
	}
	sprintf(tab[nombreJoueur],"Sign in");
	
	initscr();
	getmaxyx(stdscr,y,x);
	
	WINDOW* win= newwin(y-10,x-8,5,4);
	box(win,0,0);
	refresh();
	
	keypad(win,true);
	
	mvwprintw(stdscr,1,1,"Here are the players already registered at the moment:");
/*
	for(int i=0,k=1;k<(y-11);i++,k++){
		mvwprintw(win,k,2,"%s",tab[i]);
		wrefresh(win);
	}
*/
	noecho();
	refresh();
	//getch();
	int fleche=0;
	int c=0;
	int place=1;
	int borne=0;
	
	while(c!='\n'){
		int k=1,i=0;
		if(c==KEY_UP){
			if(fleche>0){//fleche==(y-9)
				if(place==1){borne=(fleche-1);}
				fleche--;
			}
		}
		else if(c==KEY_DOWN){
			if(fleche<nombreJoueur){
				if(place==(y-12)){borne=fleche-(y-14);}//i=fleche-(y-11);}
				fleche++;
			}
			else if(fleche==nombreJoueur){
				//i=fleche-(y-13);
				fleche=nombreJoueur;
			}
		}
		wclear(win);
		box(win,0,0);
		for(i=borne,k;k<(y-11);i++,k++){//(fleche-(y-8))
			if((fleche==i)){
				wattron(win,A_REVERSE);
				mvwprintw(win,k,2,"%s",tab[i]);
				wattroff(win,A_REVERSE);
				wrefresh(win);
				place=k;
			}
			else{
				mvwprintw(win,k,2,"%s",tab[i]);
				wrefresh(win);
			}
		}
		wmove(win,place,1);
		c=wgetch(win);
		wrefresh(win);
		refresh();
		//i=fleche-(y-14);
	}
	endwin();
	clear();
	
///Traitement de ce que le joueur entre
	if((fleche>=0)&&(fleche<nombreJoueur)){
		sprintf(commande,"head -n%d ~/Documents/Projet/vazoMisoma/score/nom|tail -n1",(fleche+1));
		fp=popen(commande,"r");
		fgets(joueur,100,fp);
		score=scoreRegister2(fleche);
		joueur[(strlen(joueur))-1]='\0';
		printf("\033[34mWelcome to you %s!!",joueur);
	}
	else if(fleche==nombreJoueur){
		system("clear");
ici:	affichage("Enter your name:\t");
		scanf("%s",joueur);
		//fgets(joueur,100,stdin);
		int id=0;
		for(int i=0;i<nombreJoueur;i++){
			sprintf(commande,"head -n%d ~/Documents/Projet/vazoMisoma/score/nom|tail -n1",(i+1));
			FILE* fp=popen(commande,"r");
			fgets(joueurExistant,100,fp);
			joueurExistant[(strlen(joueurExistant))-1]='\0';
			//printf("%s",joueurExistant);
			if(strcmp(joueur,joueurExistant)==0){
				id++;
			}
			//pclose(fp);
		}
		if(id>0){
			printf("\t\033[5;31mThis name is already in the list of players; Please enter another name.\033[0m\n");
			sleep(2);
			system("clear");
			goto ici;
		}
		else if(id==0){
			sprintf(commande,"echo %s>>~/Documents/Projet/vazoMisoma/score/nom",joueur);
			system(commande);
			for(int i=0;i<3;i++){
				sprintf(commande,"echo '0'>>~/Documents/Projet/vazoMisoma/score/score%d",(i+1));
				system(commande);
			}
		}
		printf("\033[34mWelcome to you %s!!",joueur);
	}
	printf("\n");
	sleep(2);
	system("clear");
	
	return (fleche+1);
}
int* scoreRegister2(int number){	//recuperer les scores enregistrer
	char commande[100];
	int* score;
	score=(int*)malloc(sizeof(int)*3);
	FILE *fichier;
	
	for(int i=0;i<3;i++){
		sprintf(commande,"head -n%d ~/Documents/Projet/vazoMisoma/score/score%d|tail -n1",(number+1),(i+1));
		fichier = popen(commande, "r");
		char ligne[100];
		fgets(ligne, 100, fichier);
		*(score+i)= atoi(ligne);
		pclose(fichier);
	}
	return score;
}
char* get(char* commande){
	FILE* fp;
	char* resultat=(char*)malloc(150);
	fp=popen(commande,"r");
	fgets(resultat,100,fp);
	for(int i=0;i<(strlen(resultat));i++){if(resultat[i]=='\n'){resultat[i]='\0';break;}}
	//resultat[(strlen(resultat))-1]='\0';
	pclose(fp);
	return resultat;
}
void scoreFileRegister(int numero, int* resultat, char* file){	//enregistrer les scores apres un jeu
	char commande[100];
///Entree des donnees
	//printf("Ancien donnee:\n");
	//system("cat ~/Documents/Projet/vazoMisoma/score/nom");
	//printf("\n");
///Traitement
	sprintf(commande,"sed -i '%dc\%d' ~/Documents/Projet/vazoMisoma/score/%s",numero,*(resultat),file);
	system(commande);
///SOrtie des donnees
	//printf("Maintenant:\n");
	//system("cat ~/Documents/Projet/vazoMisoma/score/nom");
}
int request(char donnee[3][200]){
///Les variables
	int x,y;	//coodonnee

initscr();
///Creation window
	getmaxyx(stdscr,y,x);
	WINDOW* titre=newwin(3,x-20,0,10);
	WINDOW* win=newwin(8,x-6,5,3);
	WINDOW* win1=newwin(3,14,14,8);
	WINDOW* win2=newwin(3,14,14,x-22);
///Colors
	start_color();
	init_pair(1,COLOR_GREEN,0);
	init_pair(2,COLOR_WHITE,COLOR_RED);
///Traitement
	int clavier=0,fleche=0;
	
while(clavier!='\n'){
	
///Affichage titre
	box(titre,'|','~');
	box(win,'.','.');
	attron(COLOR_PAIR(1));
	attron(A_BOLD);
		mvwprintw(titre,1,8,"\t\tVazo Misoma");
		mvwprintw(win,3,4,"%s",donnee[0]);
	attroff(A_BOLD);
	attroff(COLOR_PAIR(1));
	refresh();
	wrefresh(titre);
	wrefresh(win);
///Affichage langue
keypad(stdscr,true);
//Qlq variables utils
		if(clavier==KEY_LEFT){
			if(fleche==0){
				fleche=1;
			}
			else if(fleche==1){
				fleche=0;
			}
		}
		else if(clavier==KEY_RIGHT){
			if(fleche==1){
				fleche=0;
			}
			else if(fleche==0){
				fleche=1;
			}
		}
		box(win1,0,0);
		box(win2,0,0);
		if(fleche==0){
			wbkgd(win1, COLOR_PAIR(2));
			wbkgd(win2, A_NORMAL);
		}
		if(fleche==1){
			wbkgd(win2, COLOR_PAIR(2));
			wbkgd(win1, A_NORMAL);
		}
		mvwprintw(win1,1,1,"%s",donnee[1]); 
		mvwprintw(win2,1,1,"%s",donnee[2]);
		
//Mise a jour
		wrefresh(titre);
		wrefresh(win);
		wrefresh(win1);
		wrefresh(win2);

//Getchar		
		noecho();
		wmove(stdscr,0,0);
		clavier=wgetch(stdscr);
		refresh();
}
	endwin();
	
	return fleche;
}
int max(int a, int b){
	if(a>b){return a;}
	if(b>a){return b;}	
}
