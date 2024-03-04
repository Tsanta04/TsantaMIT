import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.lang.Math;
import java.lang.Exception;

public class Calculatrice extends JFrame{
	public JFrame win;
	public JPanel box;
	private JTextField input;
	private String operation="";
	private String[] bouton={"1","2","3","4","5","6","7","8","9","0","/","=","*",".","^","M","+","-","(",")","DEL","AC"};
	//private JButton[] bouton={new JButton("1"),new JButton("2"),new JButton("3"),new JButton("4"),new JButton("5"),new JButton("6"),new JButton("7"),new JButton("8"),new JButton("9"),new JButton("0"),new JButton("."),new JButton("*"),new JButton("-"),new JButton("+"),new JButton("/"),new JButton("=")};
	public JPanel nul(){
		JPanel nul2=new JPanel();
		nul2.setLayout(null);
		return nul2;
	}

	public JButton button(String titre,JTextField inp){
		JButton b=new JButton(titre);
		b.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				if(titre!="="){
					if(titre=="DEL"){
						operation="";
					}
					else if(titre=="AC"){
						//operation.pop();
					}
					else{
						operation+=titre;
					}
					inp.setText(operation);
				}
				else{
					char[] res=new char[100];
					float result=0;
					try{
						operation=reglage(operation);
						result=calcul(operation);
						operation="";
						operation+=result;
						inp.setText(operation);
						
					}catch(Exception err){
						inp.setText("SYNTAX  ERROR");
						return;
						
					}finally{
						operation="";
					}
				}
			}
		});
		return b;
	}

	public Calculatrice(){
		this.input=new JTextField();
		this.win= new JFrame();
		this.box= new JPanel();
		this.win.setSize(500,500);
		this.box.setLayout(new GridLayout(9,1));

		JPanel titre=new JPanel();
		titre.setBackground(null);
		titre.add(new JLabel("C.A.L.C.U.L.A.T.R.I.C.E"));
		this.box.add(titre);

		this.box.add(this.input);
		this.box.add(nul());

		int k=0;
		for(int j=0;j<6;j++){
			int i=1;
			JPanel miniBox2=new JPanel();			
			if(j<5){
				miniBox2.setLayout(new GridLayout(1,4));
				for(i=k;i<(k+4);i++){
					miniBox2.add(this.button(this.bouton[i],this.input));
				}
			}
			else if(j==5){
				miniBox2.setLayout(new GridLayout(1,2));
				for(i=k;i<(k+2);i++){
					miniBox2.add(this.button(this.bouton[i],this.input));
				}
			}
			this.box.add(miniBox2);
			k=i;
		}
		this.win.setContentPane(this.box);
		this.win.setVisible(true);
	}

	private int erreur(){
		char[] anomalies={'+','-','v','*','/','M','^','.'};
		char oh=operation.charAt(0);
		int test=0;
		for(int j=3;j<7;j++){
			if(oh==anomalies[j])return -1;
		}
		for(int i=0;i<operation.length();i++){
			if(operation.charAt(i)=='('){
				test++;
			}
			else if(operation.charAt(i)==')'){
				test--;
			}
		}
		if(test!=0)return -1;
		for(int i=1;i<operation.length();i++){
			if((oh==operation.charAt(i))&&(oh=='.'))return -1;
			for(int j=3;j<7;j++){
				if(oh==anomalies[j]){
					for(int k=3;k<7;k++){
						if(operation.charAt(i)==anomalies[k])return -1;
					}
				}
				if(((oh=='+')||(oh=='(')||(oh=='-')||(oh=='v'))&&(operation.charAt(i)==anomalies[j]))return -1;
				if((operation.charAt(i)==')')&&(oh==anomalies[j]))return -1;
			}
			oh=operation.charAt(i);
		}
		return 0;
	}

	private String reglage(String operation){
		String operationK="";
		operationK+=operation.charAt(0);
		char oh=operation.charAt(0);
		for(int i=1;i<(int)operation.length();i++){
			if((oh==')')&&(operation.charAt(i)>='0')&&(operation.charAt(i)<='9')){
				operationK+='*';
				operationK+=+operation.charAt(i);
			}
			else if(((operation.charAt(i)=='(')||(operation.charAt(i)=='v'))&&(((oh>='0')&&(oh<='9'))||(oh==','))){
				if(operation.charAt(i)=='v')operationK+="*v";
				else if(operation.charAt(i)=='(')operationK+="*(";
			}
			else operationK+=operation.charAt(i);
			oh=operation.charAt(i);
		}
	//    ui->input->setText(QString::fromStdString(operationK));
		return operationK;
	}

	private float calcul(String operation)throws Error{
		char[][] num= new char[100][100];
		char[] oper=new char[10];
		char oh;
		int k=0;
		int l=0;
		int test=0;
		float result=0;
		int sOperande=0;    //Hijerena ny fisiana operateur maro mifanesy
		String operationK="";
		String tmp="";

	///Error
		if(erreur()==-1){
			throw new Error("SYNTAX ERROR");
		}
		
	///Gestion parenthèse

		for(int i=0;i<operation.length();i++){
			if(operation.charAt(i)=='('){
				test=1;
				for(int j=i+1;test!=0;j++,i++){
					if(operation.charAt(j)==')'){
						test--;
					}
					else if(operation.charAt(j)=='('){
						test++;
					}
					if(test!=0){tmp+=operation.charAt(j);}
				}
				operationK+=calcul(tmp);
				tmp="";
				continue;
			}
			operationK+=operation.charAt(i);
		}
		operation=operationK;

	///Calcul
	
		//if(str!=""){
			if((operation.charAt(0)=='+')||(operation.charAt(0)=='-')){
				num[k][l]=operation.charAt(0);
				l++;
				sOperande=1;
			}

			for(int i=sOperande;i<operation.length();i++){
				oh=operation.charAt(i);
				if(((oh>='0')&&(oh<='9'))||(oh=='v')){
					num[k][l]=oh;
					l++;
					sOperande=0;
				}
			
				else if(oh=='.'){
					num[k][l]='.';
					l++;
					sOperande=0;
				}
				else if ((oh=='+')||(oh=='*')||(oh=='/')||(oh=='-')||(oh=='^')||(oh=='M')){
					if(sOperande==1){
						if(l==0){
							num[k][0]=oh;
							l++;
						}
						else if(num[k][0]=='+'){
							if(oh=='+')num[k][0]='+';
							else if(oh=='-')num[k][0]='-';
						}
						else if(num[k][0]=='-'){
							if(oh=='-')num[k][0]='+';
							else if(oh=='+')num[k][0]='-';
						}
					}
					else{
						if(oh=='M')oper[k]='%';
						else oper[k]=oh;
						k++;
						l=0;
						if((oh=='+')||(oh=='-')){
							num[k][l]=oh;
							l++;
						}
					}
				   sOperande=1;
				}
			}

	///Puissance
			for(int i=0;i<k;i++){
				if(oper[i]=='^'){
					float n1=Float.parseFloat(String.valueOf(num[i]));
					float n2=Float.parseFloat(String.valueOf(num[i+1]));
					result=(float)(Math.pow(n1,n2));
					num[i]=Float.toString(result).toCharArray();
					for(int j=i+1;j<(k+2);j++){
						num[j]=num[j+1];
					}
					for(int j=i;j<(k-1);j++){
						oper[j]=oper[j+1];
					}
					k--;
					i--;
				}
			}
			result=0;

	///Fois et division
			for(int i=0;i<k;i++){
				if((oper[i]=='*')||(oper[i]=='/')||(oper[i]=='%')){
					float n1=Float.parseFloat(String.valueOf(num[i]));
					float n2=Float.parseFloat(String.valueOf((num[i+1])));
					if(oper[i]=='%')result=((int)n1%(int)n2);
					if(oper[i]=='*')result=(n1*n2);
					if(oper[i]=='/')result=(n1/n2);
					num[i]=Float.toString(result).toCharArray();
					for(int j=i+1;j<(k+2);j++){
						num[j]=num[j+1];
					}
					for(int j=i;j<(k-1);j++){
						oper[j]=oper[j+1];
					}
					k--;
					i--;
				}
			}
			result=0;

	///Somme et addition
			for(int i=0;i<=k;i++){
				float n1=Float.parseFloat(String.valueOf(num[i]));
				result+=n1;
			}
			return result;
	}
}

