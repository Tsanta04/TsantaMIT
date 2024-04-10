import java.io.PrintWriter;
import java.util.concurrent.TimeUnit;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class Dichotomie implements Traitement{
	public Fonction f;
	public int iteration=0;
	public float pointA;
	public float pointB;
	public float resultat;
	public String pathImg;
	public String pathDatas;
	public String methode="Dichotomie";
	
	public Dichotomie() {
		
	}


	public void setFonction(Fonction fx) {
		this.f = fx;
	}

	public void setPointA(float i) {
		this.pointA = i;
	}

	public void setPointB(float i) {
		this.pointB = i;
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
        out.write("plot '" + this.pathDatas + "' w linespoints pt 28 lw 1 lc 'black' , f(x) w l lw 1 lc 'red'\n");  // Use 'replot' for clarity
        out.close();
        this.pathImg=path;
        // Exécution de Gnuplot
        Runtime.getRuntime().exec("gnuplot auxfile.gp");
	}

	public void resolution(String path) throws FileNotFoundException {
		PrintWriter fd = new PrintWriter(new File(path));
		float r=0;
		float a=this.pointA,b=this.pointB;
		float tol=(float) 0.005;
		
		while(Math.abs(f.f(r))>tol && this.iteration<10000){
			r=(a+b)/2;
			fd.println(r+" "+f.f(r));
			if((f.f(a)*f.f(r)*f.f(b))==0){
				if(f.f(this.pointA)==0)r=a;
				else if(f.f(b)==0)r=b;
				break;
			}
			else if((f.f(a)*f.f(r))<0){
				b=r;
			}
			else if((f.f(b)*f.f(r))<0){
				a=r;
			}
			else{
				break;
			}
			this.iteration++;
		}
		if(this.iteration>=10000 || b==a)this.iteration=-1;
		fd.close();
		this.resultat=r;
		this.pathDatas=path;
	}
}
