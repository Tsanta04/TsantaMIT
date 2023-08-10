#include<gtk/gtk.h>
#include<stdio.h>

/*1Initier
int main(int arg,char** argv){
	gtk_init(&arg,&argv);

	gtk_main();
	return 0;
}
*/
// 2Creer une application
void activation(GtkApplication* app, gpointer user_data){GtkWidget* window = gtk_application_window_new(app);
	gtk_widget_show_all(window);
};

int main(int argc,char** argv){
	GtkApplication* app= gtk_application_new ("tsanta.com",G_APPLICATION_FLAGS_NONE);
	g_signal_connect(app,"activate",G_CALLBACK(activation),NULL);
	int i = g_application_run(G_APPLICATION(app),argc,argv);
	g_object_unref(app);
	
	return i;
}


/*1er Methode:Creer une fenetre
int main(int argc, char** argv){
	gtk_init(&argc,&argv);
	
	GtkWidget* window = gtk_window_new(GTK_WINDOW_TOPLEVEL);
		g_signal_connect(window,"destroy",G_CALLBACK(gtk_main_quit),NULL);
	gtk_widget_show_all(window);
	
	gtk_main();
	
	return 0;
}
*/
/*2eme methode: Creer une fenetre a partir d'une application
void activation(GtkApplication* app, gpointer user_data){
	GtkWidget* window = gtk_application_window_new(app);
	gtk_widget_show_all(window);
}

int main(int argc, char** argv){
	GtkApplication* app = gtk_application_new("tsanta.com",G_APPLICATION_FLAGS_NONE);
	g_signal_connect(app,"activate",G_CALLBACK(activation),NULL);
	int i = g_application_run(G_APPLICATION(app),argc,argv);
	g_object_unref(app);
	return i;
}
*/
/*Personnalisation de la fenetre
int main(int argc, char** argv){
	const char* title;
	gtk_init(&argc,&argv);
	
	GtkWidget* window = gtk_window_new(GTK_WINDOW_TOPLEVEL);
	gtk_window_set_position(GTK_WINDOW(window),GTK_WIN_POS_MOUSE);
	gtk_window_set_default_size(GTK_WINDOW(window),500,600);
	gtk_window_set_title(GTK_WINDOW(window),"Essai oh");
	gtk_window_set_resizable(GTK_WINDOW(window),FALSE);
	//gtk_window_maximize(GTK_WINDOW(window));
		g_signal_connect(window,"destroy",G_CALLBACK(gtk_main_quit),NULL);
		title=gtk_window_get_title(GTK_WINDOW(window));
		printf("Title: %s",title);

	gtk_widget_show_all(window);
	gtk_main();
	
	return 0;
}
*/
/* Ajouter UN boutton a un window
int main(int argc, char** argv){
	gtk_init(&argc,&argv);
	
	GtkWidget* win = gtk_window_new(GTK_WINDOW_TOPLEVEL);
	GtkWidget* button1;
	GtkWidget* button2;
	
	button1 = gtk_button_new_with_label("button1");
	button2 = gtk_button_new_with_label("button2");
	
	gtk_container_add(GTK_CONTAINER(win),button1);
	gtk_container_remove(GTK_CONTAINER(win), button1);
	gtk_container_add(GTK_CONTAINER(win),button2);
	
	g_signal_connect(win,"destroy",G_CALLBACK(gtk_main_quit),NULL);
	gtk_widget_show_all(win);
	gtk_main();
	return 0;
}
*/
/*Creer DES bouttons dans une fenetre a partir d'un window
int main(int argc, char** argv){
	gtk_init(&argc,&argv);
	
	GtkWidget* win = gtk_window_new(GTK_WINDOW_TOPLEVEL);
	GtkWidget* box = gtk_box_new(GTK_ORIENTATION_HORIZONTAL,0);
	GtkWidget* button1 = gtk_button_new_with_label("BUTTON1");
	GtkWidget* button2 = gtk_button_new_with_label("BUTTON2");
	
	gtk_widget_set_size_request(box,500,500);
	gtk_container_add(GTK_CONTAINER(win),box);
	gtk_box_pack_start(GTK_BOX(box),button1,TRUE,TRUE,50);
	gtk_box_pack_end(GTK_BOX(box),button2,FALSE,TRUE,50);
	
	gtk_window_maximize(GTK_WINDOW(win));
	//gtk_window_set_decorated(GTK_WINDOW(win),FALSE);
	gtk_box_set_homogeneous(GTK_BOX(box),TRUE);	
	
	g_signal_connect(win,"destroy",G_CALLBACK(gtk_main_quit),NULL);
	gtk_widget_show_all(win);	
	gtk_main();
	
	return 0;
}
*/

/*Creer Des bouons fixEs a des coordonnees donnees
int main(int argc, char** argv){
	gtk_init(&argc,&argv);
	
	GtkWidget* window = gtk_window_new(GTK_WINDOW_TOPLEVEL);
	GtkWidget * fixed = gtk_fixed_new();
	GtkWidget* button1= gtk_button_new_with_label("Button1");
	GtkWidget* button2= gtk_button_new_with_label("Button2");	

	gtk_widget_set_size_request(fixed,500,500);
	
	gtk_fixed_put(GTK_FIXED(fixed),button1, 400,400);
	gtk_fixed_put(GTK_FIXED(fixed),button2, 200,400);

	gtk_fixed_move(GTK_FIXED(fixed),button1, 100,300);
	gtk_fixed_move(GTK_FIXED(fixed),button2, 200,100);

	gtk_container_add(GTK_CONTAINER(window),fixed);
	
	g_signal_connect(GTK_WINDOW(window),"destroy",G_CALLBACK(gtk_main_quit),NULL);
	gtk_widget_show_all(window);
	gtk_main();
	return 0;
}
*/
