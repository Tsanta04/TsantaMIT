import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.concurrent.TimeUnit;

public class NewtonR implements Traitement{
	public Fonction f;
	public int iteration=0;
	public float pointI;
	public float resultat;
	public String pathImg;
	public String pathDatas;
	public String methode="Newton";
	
	public NewtonR() {
		
	}

	public Fonction getFonction(){return this.f; }
	public int getIteration(){return this.iteration; }	
	public float getPointI(){return this.pointI; }
	public String getPathImg(){return this.pathImg; }
	public float getResultat(){return this.resultat; }
	
	public void setFonction(Fonction fx) {
		this.f = fx;
	}

	public void setPointI(float i) {
		this.pointI = i;
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
        out.println(String.format("set xrange [%f:%f]\n", (this.pointI-8), (this.pointI+8)));
        out.println("set output '" + path + "'\n");
        out.write("f(x)=" + f.f + "\n");
        out.write("replot '" + this.pathDatas + "' w linespoints pt 28 lw 1 lc 'red' , f(x) w linespoints pt 28 lw 1 lc 'red'\n");  // Use 'replot' for clarity
        out.close();
        this.pathImg=path;
        // Exécution de Gnuplot
        Runtime.getRuntime().exec("gnuplot auxfile.gp");
	}

	public void resolution(String path) throws FileNotFoundException {
		PrintWriter fd = new PrintWriter(new File(path));
		float r=0;
		float a=this.pointI;
		float tol=(float) 0.00001;
		float x=a-(f.f(a)/f.fp(a));
		do{
			r=x;
			x=r-(f.f(r)/f.fp(r));
			fd.println(r+" "+f.f(r)+"\n");
			this.iteration++;
		}while((Math.abs(f.f(r))>tol) && (this.iteration<10000));
		if(this.iteration>=10000)this.iteration=-1;
		this.pathDatas=path;
		this.resultat=r;
		fd.close();
	}
}