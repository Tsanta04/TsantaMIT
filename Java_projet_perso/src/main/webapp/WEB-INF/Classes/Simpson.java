import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.concurrent.TimeUnit;

public class Simpson implements Traitement{
	public Fonction f;
	public float pointA;
	public float pointB;
	public float pas;
	public float resultat;

	public String pathImg;
	public String pathDatas;
	public String methode="Simpson";
	
	public void setFonction(Fonction fx) {
		this.f = fx;
	}

	public void setPointA(float i) {
		this.pointA = i;
	}

	public void setPointB(float i) {
		this.pointB = i;
	}

	public void setPas(float i) {
		this.pas = i;
	}	
	
	public Simpson() {
		
	}

	public void gnuplot(String path) throws IOException, FileNotFoundException, InterruptedException {
		// TODO Auto-generated method stub
		FileWriter outF = new FileWriter("auxfile.gp");
        PrintWriter out = new PrintWriter(outF);
        // Gnuplot parameters
        out.println("set term png\n");
        out.println("set xzeroaxis\n");
        out.println("set yzeroaxis\n");
        out.println("set title '"+this.methode+"'\n");
        out.println("set xlabel 'x'\n");
        out.println("set ylabel 'f(x)'\n");
        out.println(String.format("set xrange [%f:%f]\n", (this.pointA-4), (this.pointB+4)));
        out.println("set output '" + path + "'\n");
        out.write("f(x)=" + f.f + "\n");
        out.write("replot '" + this.pathDatas + "' w linespoints pt 28 lw 1 lc 'red' , f(x) w linespoints pt 28 lw 1 lc 'red'\n");  // Use 'replot' for clarity
        out.close();

        // Exécution de Gnuplot
        Runtime.getRuntime().exec("gnuplot auxfile.gp");
	}

	public void resolution(String path) throws FileNotFoundException {
		PrintWriter fd = new PrintWriter(new File(path));
		float r=0;
		float a=this.pointA,b=this.pointB;
		float tol=(float) 0.005;
		float h=(Math.abs(b)-Math.abs(a))/tol;
		
		for(int i=2;i<tol;i+=2){
			r+=2*f.f(a);
			a+=2*h;
			fd.println(a+" "+f.f(a)+"\n");
		}
		for(int i=1;i<tol;i+=2){
			r+=4*f.f(a);
			a+=2*h;
		}	
		fd.close();
		this.pathDatas=path;
		this.resultat=(h/3)*r;		
	}
	
}
