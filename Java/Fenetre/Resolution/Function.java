package Resolution;
import java.lang.Math;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class Function{
	protected float solution;
	protected static int i;
	protected static int j;
	public Function(){}
	
	public float f(float x){
		return (float)(Math.log(x)-1);
	}

	public void set(JTextField A,JTextField B){
		this.i=Integer.parseInt(A.getText());
		this.j=Integer.parseInt(B.getText());
	}
	
	public static void intervale(int a, int b){
		i=a;
		j=b;
	}
	public int getI(){
		return i;
	}
	public int getJ(){
		return j;
	}
	
	public String getResult(){
		return "La solution c'est: "+this.solution;
	}	
	
	public void displayData(){
		System.out.println("La solution c'est: "+this.solution);
	}

	public float centre(float a,float b){
		return ((b+a)/2);
	}

	public float produit(float x,float y){
		return (x*y);
	}

}
