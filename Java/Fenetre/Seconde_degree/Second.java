package Seconde_degree;
import java.lang.Math;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class Second extends JFrame{
	private int a;
	private int b;
	private int c;
	private int delta;
	private float x1;
	private float x2;
	public Second(){}

	public void set(JTextField A,JTextField B,JTextField C){
		this.a=Integer.parseInt(A.getText());
		this.b=Integer.parseInt(B.getText());
		this.c=Integer.parseInt(C.getText());
	}

	public void set(int x, int y, int z){
		this.a=x;
		this.b=y;
		this.c=z;
	}
	public void calcDelta(){
		this.delta=(this.b*this.b)-(4*this.a*this.c);
	}
	public void racines(){
		if (this.a==0){
			if(this.c==0)this.x1=0;
			else this.x1=(-this.c)/(this.b);
			this.delta=0;
		}
		else{
			this.calcDelta();
			if(this.delta==0){
				this.x1=(-this.b)/(2*this.a);
			}
			else if (this.delta>0){
				this.x1=(float)((this.b - Math.sqrt(this.delta))/(2*this.a));			
				this.x2=(float)((-this.b - Math.sqrt(this.delta))/(2*this.a));			
			}
		}
	}
	public String getResult(){

		this.racines();
		if(this.delta==0){
			return "La seule solution est "+this.x1+" .";
		}
		else if (this.delta>0){
			return "Les solutions sont "+this.x1+" et "+this.x2+" .";
		}
		else if(this.delta<0){
			return "Cette equation n'admet pas de solution.";
		}

		return this.a + "," + this.b + "," + this.c;
	}
	public void displayData(){
		this.racines();
		if(this.delta==0){
			System.out.println("La seule solution est "+this.x1+" .");
		}
		else if (this.delta>0){
			System.out.println("Les solutions sont "+this.x1+" et "+this.x2+" .");
		}
		else if(this.delta<0){
			System.out.println("Cette equation n'admet pas de solution.");		
		}
	}
}
