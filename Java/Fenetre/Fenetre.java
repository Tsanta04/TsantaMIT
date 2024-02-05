import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import Seconde_degree.Second;
import Resolution.*;

public class Fenetre extends JFrame{
	public JFrame win;
	public JPanel box;
	public Second equ;
	public Dichotomie sol1;
	public Newton sol2;
	public Secante sol3;
	public JPanel result;
	public Fenetre(){
		this.sol1=new Dichotomie();
		this.sol2=new Newton();
		this.sol3=new Secante();
		this.equ=new Second();
		this.win= new JFrame();
		this.box= new JPanel();
		this.result= new JPanel();
		this.win.setSize(1000,500);
		this.box.setLayout(new GridLayout(10,1));

	}

	public JPanel nul(){
		JPanel nul2=new JPanel();
		nul2.setLayout(null);
		return nul2;
	}

	public JPanel label(String text,Color couleur){
		JPanel titre=new JPanel();
		titre.setBackground(couleur);
		titre.add(new JLabel(text));
		return titre;
	}

	public void displayResult(String answer){
		JLabel affiche=new JLabel(answer);
		this.result.setBackground(Color.GREEN);
		this.remove(affiche);
		this.result.add(affiche);
		this.box.add(result);
		this.win.setContentPane(box);
		this.win.setVisible(true);
	}

	public JButton buttonSecond(String label,JTextField A,JTextField B,JTextField C){
		JButton b=new JButton(label);
		b.addActionListener(new ActionListener(){public void actionPerformed(ActionEvent e){equ.set(A,B,C);displayResult(equ.getResult());}});
		return b;
	}

	public JButton buttonResolution(String label,JTextField A,JTextField B,int methode){
		JButton b=new JButton(label);
		if(methode==1){
			b.addActionListener(new ActionListener(){public void actionPerformed(ActionEvent e){sol1.set(A,B);displayResult(sol1.resolution());}});			
		}
		if(methode==2){
			b.addActionListener(new ActionListener(){public void actionPerformed(ActionEvent e){sol1.set(A,B);displayResult(sol2.resolution());}});			
		}
		if(methode==3){
			b.addActionListener(new ActionListener(){public void actionPerformed(ActionEvent e){sol1.set(A,B);displayResult(sol3.resolution());}});			
		}
		return b;
	}

	public void getDataSec(){
		this.box.add(label("Second degree function: ax²+bx+c=0",Color.YELLOW));
		JTextField a=new JTextField();
		JTextField b=new JTextField();
		JTextField c=new JTextField();

		this.box.add(this.nul());

		JPanel miniBox1=new JPanel();
		miniBox1.setLayout(new GridLayout(1,6));
		miniBox1.add(new JLabel("a: "));
		miniBox1.add(a);
		miniBox1.add(new JLabel("b: "));
		miniBox1.add(b);
		miniBox1.add(new JLabel("c: "));
		miniBox1.add(c);
		this.box.add(miniBox1);

		this.box.add(this.nul());

		JPanel miniBoxA=new JPanel();
		miniBoxA.setLayout(new GridLayout(1,3));
		miniBoxA.add(this.nul());
		miniBoxA.add(buttonSecond("Submit",a,b,c));
		miniBoxA.add(this.nul());
		this.box.add(miniBoxA);
		this.box.add(nul());

		this.win.setContentPane(box);
		this.win.setVisible(true);
	}

	public void getDataDic(int methode){
		JTextField a=new JTextField();
		JTextField b=new JTextField();
		
		this.box.add(label("Function: Log(x)-1",Color.YELLOW));
		this.box.add(this.nul());

		JPanel miniBox1=new JPanel();
		miniBox1.setLayout(new GridLayout(1,2));
		miniBox1.add(new JLabel("Borne à gauche: "));
		miniBox1.add(a);
		this.box.add(miniBox1);
		
		this.box.add(this.nul());
		
		JPanel miniBox2=new JPanel();
		miniBox2.setLayout(new GridLayout(1,2));
		miniBox2.add(new JLabel("Borne à droite: "));
		miniBox2.add(b);
		this.box.add(miniBox2);

		this.box.add(this.nul());
		
		JPanel miniBoxA=new JPanel();
		miniBoxA.setLayout(new GridLayout(1,3));
		miniBoxA.add(this.nul());
		miniBoxA.add(buttonResolution("Submit",a,b,methode));
		miniBoxA.add(this.nul());
		this.box.add(miniBoxA);
		this.box.add(nul());
				
		this.win.setContentPane(box);
		this.win.setVisible(true);
	}

}

/*
public void paintComponent(Graphics g){
	g.drawString("",x,y);
	}
*/
