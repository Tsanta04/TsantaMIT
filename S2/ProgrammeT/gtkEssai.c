#include<stdio.h>
#include<gtk/gtk.h>
#include<string.h>

///Structure
struct donnee{
	GtkWidget* window; 
	GtkWidget* vbox;
	GtkWidget* h1box;
	GtkWidget* h2box;
	GtkWidget* h3box;
	GtkWidget* h4box;
	GtkWidget* h5box;
	
	GtkWidget* entry;
	GtkWidget* plus;
	GtkWidget* moins;
	GtkWidget* fois;
	GtkWidget* division;
	GtkWidget* virgule;
	GtkWidget* egale;	
	
	GtkWidget* button1;
	GtkWidget* button2;
	GtkWidget* button3;
	GtkWidget* button4;
	GtkWidget* button5;
	GtkWidget* button6;
	GtkWidget* button7;
	GtkWidget* button8;
	GtkWidget* button9;
	GtkWidget* button0;

	const gchar* calcul;
};
typedef struct donnee donnee;

///Callbacks
gboolean operation(GtkWidget* carre, GdkEventButton* event,gpointer data){

	donnee* fenetre = (donnee*)data;
	char* operation = (char*)(fenetre->calcul);
	char a[100][100];
	char calc[100];
	const char* thResult;
	char result[100];
	float resultat=0;

	float* A;
	int i=0,k=0,l=0,m=0;
	g_print("%s\n",operation);
	for(i=0;k!=strlen(operation);i++){

		if((operation[k]!='x')&&(operation[k]!='/')){
			a[m][0]=operation[k];
			l=1;
			k++;
		}
		else if((operation[k]=='x')||(operation[k]!='/')) {
			l=0;
			k=k;
		}

		for(k=k;k!=strlen(operation);k++){
			if((operation[k]=='x')||(operation[k]=='+')||(operation[k]=='-')){
				calc[m]=operation[k];
				k++;
				m++;
				break;
			}
			a[i][l]=operation[k];
			l++;
		}
		a[i][l]='\0';		
	}

	A=(float*)malloc(sizeof(float)*k);
	float inter=0;
	if(i==(m+1)){
		for(int k=0;k<i;k++){
			A[k]=atof(a[k]);
			g_print("\n%s-------%f",a[k],A[k]);
		}
		g_print("%s",calc);
	resultat=A[0];
/*
		if(calc[0]=='x'){
			resultat=A[0]*A[1];
		}
		else if(calc[0]=='/'){
			resultat=A[0]/A[1];
		}

		if(i==2){
			if(calc[0]=='+'){
				resultat=A[0]+A[1];
			}
			else if(calc[0]=='-'){
				resultat=A[0]-A[1];
			}
		}
*/
		for(int i=0;i<m;i++){
			if(calc[i]=='/'){
				resultat=(resultat)/A[i+1];
			}
			else if(calc[i]=='x'){
				resultat=(resultat)*A[i+1];
			}
			else if(calc[i]=='+'){
				inter=A[i+1];
				for(int k=i+1;((k<m)&&((calc[k]=='x')||(calc[k]=='/')));k++){
					if(calc[k]=='x'){
						inter*=A[k+1];
					}
					else if(calc[k]=='/'){
						inter=(inter)/A[k+1];
					}
					i++;
				}
				resultat+=inter;
			}
			else if(calc[i]=='-'){
				inter=A[i+1];
				for(int k=i+1;((k<m)&&((calc[k]=='x')||(calc[k]=='/')));k++){
					if(calc[k]=='x'){
						inter*=A[k+1];
					}
					else if(calc[k]=='/'){
						inter=(inter)/A[k+1];
					}
					i++;
				}
				resultat-=inter;
			}
		}
/*
		else if(calc[0]=='+'){
			resultat=A[0]+A[1];
		}
		else if(calc[0]=='-'){
			resultat=A[0]-A[1];
		}
		for(int i=1;i<m;i++){
			if(calc[i]=='+'){
				resultat+=A[i+1];
			}
			if(calc[i]=='-'){
				resultat-=A[i+1];
			}
			if(calc[i]=='x'){
				resultat*=A[i+1];
			}
		}
*/	
		sprintf(result,"%f",resultat);
		thResult = (const char*)result;
		gtk_entry_set_text(GTK_ENTRY(fenetre->entry),thResult);
		fenetre->calcul = "";
	}

/*
	for(i=0;i!=strlen(operation);i++){
		if((operation[i]=='x')||(operation[i]=='+')||(operation[i]=='-')){
			calc[0]=operation[i];
			break;
		}
		a[i]=operation[i];
	}
	A=atof(a);
	g_print("\nA=%f",A);
	if((i+1)<strlen(operation)){
		int k=0;
		for(int j=i+1;j!=strlen(operation);j++){
			a[k]=operation[j];
			k++;
		}
		a[k]='\0';
		B=atof(a);
		g_print("\nB=%f",B);

		if(calc[0]=='x'){
			resultat=A*B;
		}
		else if(calc[0]=='+'){
			resultat=A+B;
		}
		else if(calc[0]=='-'){
			resultat=A-B;
		}
		g_print("%f",resultat);
		sprintf(result,"%f",resultat);
		thResult = (const char*)result;
		gtk_entry_set_text(GTK_ENTRY(fenetre->entry),thResult);
	
	}
*/
	
	return FALSE;
}

gboolean clicked(GtkWidget* carree,GdkEventButton* event,gpointer data){	//tsy maintsy misy an'ilay GdkEventButton io na tsy ampiasaina aza

	donnee *fenetre = (donnee*)data;
	const gchar* label;//=gtk_button_get_label(GTK_BUTTON(carree));
	//GtkWidget* entry = GTK_WIDGET(data);
	label = gtk_button_get_label(GTK_BUTTON(carree));
	fenetre->calcul = g_strdup_printf("%s%s",fenetre->calcul,label);
	gtk_entry_set_text(GTK_ENTRY(fenetre->entry),fenetre->calcul);
	g_print("%s",label);

	return FALSE;
}


int main(int argc,char** argv){
	gtk_init(&argc,&argv);

///Les donnees	
	donnee* contenu=(donnee*)malloc(sizeof(donnee));
	
	contenu->calcul = (const char*)malloc(sizeof(const char)*100);
	contenu->calcul = "";
	
	contenu->window = gtk_window_new(GTK_WINDOW_TOPLEVEL);
	contenu->vbox = gtk_box_new(GTK_ORIENTATION_VERTICAL,0);
	contenu->h1box =  gtk_box_new(GTK_ORIENTATION_HORIZONTAL,10);
	contenu->h2box =  gtk_box_new(GTK_ORIENTATION_HORIZONTAL,10);	
	contenu->h3box =  gtk_box_new(GTK_ORIENTATION_HORIZONTAL,10);
	contenu->h4box =  gtk_box_new(GTK_ORIENTATION_HORIZONTAL,10);
	contenu->h5box =  gtk_box_new(GTK_ORIENTATION_HORIZONTAL,10);

	contenu->entry = gtk_entry_new();
	contenu->plus = gtk_button_new_with_label("+");
	contenu->moins = gtk_button_new_with_label("-");
	contenu->fois = gtk_button_new_with_label("x");
	contenu->division = gtk_button_new_with_label("/");
	contenu->virgule = gtk_button_new_with_label(",");	
	contenu->egale = gtk_button_new_with_label("=");	
	
	contenu->button1 = gtk_button_new_with_label("1");
	contenu->button2 = gtk_button_new_with_label("2");
	contenu->button3 = gtk_button_new_with_label("3");
	contenu->button4 = gtk_button_new_with_label("4");
	contenu->button5 = gtk_button_new_with_label("5");
	contenu->button6 = gtk_button_new_with_label("6");
	contenu->button7 = gtk_button_new_with_label("7");
	contenu->button8 = gtk_button_new_with_label("8");
	contenu->button9 = gtk_button_new_with_label("9");
	contenu->button0 = gtk_button_new_with_label("0");

///Mise en forme
	gtk_window_set_title(GTK_WINDOW(contenu->window),"Calculatrice");
	gtk_window_set_default_size(GTK_WINDOW(contenu->window),400,500);

///Mise en place des box
	gtk_box_pack_start(GTK_BOX(contenu->h1box),contenu->entry,TRUE,TRUE,0);
	
	gtk_box_pack_start(GTK_BOX(contenu->h2box),contenu->button1,TRUE,TRUE,3);
	gtk_box_pack_start(GTK_BOX(contenu->h2box),contenu->button2,TRUE,TRUE,3);
	gtk_box_pack_start(GTK_BOX(contenu->h2box),contenu->button3,TRUE,TRUE,3);
	gtk_box_pack_start(GTK_BOX(contenu->h2box),contenu->plus,TRUE,TRUE,3);

	gtk_box_pack_start(GTK_BOX(contenu->h3box),contenu->button4,TRUE,TRUE,3);
	gtk_box_pack_start(GTK_BOX(contenu->h3box),contenu->button5,TRUE,TRUE,3);
	gtk_box_pack_start(GTK_BOX(contenu->h3box),contenu->button6,TRUE,TRUE,3);
	gtk_box_pack_start(GTK_BOX(contenu->h3box),contenu->moins,TRUE,TRUE,3);

	gtk_box_pack_start(GTK_BOX(contenu->h4box),contenu->button7,TRUE,TRUE,3);
	gtk_box_pack_start(GTK_BOX(contenu->h4box),contenu->button8,TRUE,TRUE,3);
	gtk_box_pack_start(GTK_BOX(contenu->h4box),contenu->button9,TRUE,TRUE,3);
	gtk_box_pack_start(GTK_BOX(contenu->h4box),contenu->fois,TRUE,TRUE,3);

	gtk_box_pack_start(GTK_BOX(contenu->h5box),contenu->virgule,TRUE,TRUE,3);
	gtk_box_pack_start(GTK_BOX(contenu->h5box),contenu->button0,TRUE,TRUE,3);
	gtk_box_pack_start(GTK_BOX(contenu->h5box),contenu->division,TRUE,TRUE,3);
	gtk_box_pack_start(GTK_BOX(contenu->h5box),contenu->egale,TRUE,TRUE,3);
	
	gtk_box_pack_start(GTK_BOX(contenu->vbox),contenu->h1box,TRUE,TRUE,3);
	gtk_box_pack_start(GTK_BOX(contenu->vbox),contenu->h2box,TRUE,TRUE,3);
	gtk_box_pack_start(GTK_BOX(contenu->vbox),contenu->h3box,TRUE,TRUE,3);
	gtk_box_pack_start(GTK_BOX(contenu->vbox),contenu->h4box,TRUE,TRUE,3);
	gtk_box_pack_start(GTK_BOX(contenu->vbox),contenu->h5box,TRUE,TRUE,3);
	
	gtk_container_add(GTK_CONTAINER(contenu->window),contenu->vbox);
	
///Les bouttons dans un tableau
	GtkWidget* button[]={contenu->button0,contenu->button1,contenu->button2,contenu->button3,contenu->button4,contenu->button5,contenu->button6,contenu->button7,contenu->button8,contenu->button9,contenu->plus,contenu->moins,contenu->fois,contenu->division,contenu->virgule};
	
///Traitement de calcul
	for(int i=0;i<15;i++){
		g_signal_connect(button[i],"button-press-event",(GCallback)clicked,contenu);
	}
	g_signal_connect(contenu->egale,"button-press-event",(GCallback)operation,contenu);

///Refresh
	g_signal_connect(contenu->window,"destroy",G_CALLBACK(gtk_main_quit),NULL);
	gtk_widget_show_all(contenu->window);
	gtk_main();
	return 0;
}
