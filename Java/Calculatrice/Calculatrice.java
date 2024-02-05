import javax.swing.*;
import java.awt.*;

public class Calculatrice extends JFrame{
	public JFrame win;
	public JPanel box;
	private JTextField input;
	private String[] bouton={"1","2","3","4","5","6","7","8","9","0","+","-","/","*",".","="};
	//private JButton[] bouton={new JButton("1"),new JButton("2"),new JButton("3"),new JButton("4"),new JButton("5"),new JButton("6"),new JButton("7"),new JButton("8"),new JButton("9"),new JButton("0"),new JButton("."),new JButton("*"),new JButton("-"),new JButton("+"),new JButton("/"),new JButton("=")};
	public JPanel nul(){
		JPanel nul2=new JPanel();
		nul2.setLayout(null);
		return nul2;
	}

	public JButton button(String titre){
		JButton b=new JButton(titre);
		//b.addActionListener(new ActionListener(){public void actionPerformed(ActionEvent e){this.input.setText(titre);}});
		return b;
	}

	public Calculatrice(){
		this.input=new JTextField();
		this.win= new JFrame();
		this.box= new JPanel();
		this.win.setSize(500,500);
		this.box.setLayout(new GridLayout(7,1));

		JPanel titre=new JPanel();
		titre.setBackground(null);
		titre.add(new JLabel("C.A.L.C.U.L.A.T.R.I.C.E"));
		this.box.add(titre);

		this.box.add(this.input);
		this.box.add(nul());

		int k=0;
		for(int j=0;j<4;j++){
			int i=1;
			JPanel miniBox2=new JPanel();
			miniBox2.setLayout(new GridLayout(1,4));
			for(i=k;i<(k+4);i++){
				miniBox2.add(this.button(this.bouton[i]));
			}
			this.box.add(miniBox2);
			k=i;
		}
		this.win.setContentPane(this.box);
		this.win.setVisible(true);
	}
}
