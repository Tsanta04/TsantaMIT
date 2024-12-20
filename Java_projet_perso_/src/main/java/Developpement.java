import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


/**
 * Servlet implementation class Developpement
 */
@WebServlet("/Developpement")
public class Developpement extends HttpServlet {
	public String url="";
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Developpement() {
        super();
        // TODO Auto-generated constructor stub
    }

    private Fonction getFonction(HttpServletRequest request) {
    	Fonction fx = new Fonction();
    	fx.setDim(Integer.parseInt(request.getParameter("dim")));
    	float[] coef = new float[fx.dim+1];
    	for(int i=0;i<= fx.dim;i++) {
    		coef[i]=Integer.parseInt(request.getParameter(String.valueOf(100+i)));
    	}
    	fx.setCoeff(coef);
    	return fx;
    }
    
    private void traitement(HttpServletRequest request, HttpServletResponse response)throws IOException, InterruptedException {
		Fonction fx;
		fx = getFonction(request);
		String path=request.getContextPath();	
		
		if(Integer.parseInt(request.getParameter("methode"))==1) {
			Dichotomie f=new Dichotomie();
			
			f.setFonction(fx);
			f.setPointA(Float.parseFloat(request.getParameter("pointA")));
			f.setPointB(Float.parseFloat(request.getParameter("pointB")));
			f.resolution("datas.txt");
			f.gnuplot("function.png",f.pointA,f.pointB);
			f.getByteImage();
			request.setAttribute("methode", f.methode);
			request.setAttribute("fonction", f.f.f);
			request.setAttribute("iteration", f.iteration);
			request.setAttribute("path", f.pathImg);
			request.setAttribute("resultat", f.resultat);
			request.setAttribute("coef", f.f.coefficient);
			request.setAttribute("pointA", f.pointA);
			request.setAttribute("pointB", f.pointB);
			request.setAttribute("Image", f.image);
			this.url="Dashboard.jsp?mode=A";
		}
		
		else if(Integer.parseInt(request.getParameter("methode"))==2) {
			NewtonR f=new NewtonR();
			f.setFonction(fx);
			f.setPointI(Float.parseFloat(request.getParameter("pointI")));
			f.resolution("datas.txt");
			f.gnuplot(path+"function.png",f.pointI,f.pointI);
			f.getByteImage();
			request.setAttribute("methode", f.methode);
			request.setAttribute("fonction", f.f.f);
			request.setAttribute("iteration", f.iteration);
			request.setAttribute("path", f.pathImg);
			request.setAttribute("resultat", f.resultat);
			request.setAttribute("coef", f.f.coefficient);
			request.setAttribute("pointA", f.pointI);
			request.setAttribute("pointB", "--");
			request.setAttribute("Image", f.image);			
			this.url="Dashboard.jsp?mode=A";
		}		
		else if(Integer.parseInt(request.getParameter("methode"))==3) {
			Descartes f=new Descartes();
			f.setFonction(fx);
			f.setPointA(Float.parseFloat(request.getParameter("pointA")));
			f.setPointB(Float.parseFloat(request.getParameter("pointB")));
			f.resolution("datas.txt");
			f.gnuplot(path+"function.png",f.pointA,f.pointB);
			f.getByteImage();
			request.setAttribute("methode", f.methode);
			request.setAttribute("fonction", f.f.f);
			request.setAttribute("iteration", f.iteration);
			request.setAttribute("path", f.pathImg);
			request.setAttribute("resultat", f.resultat);
			request.setAttribute("coef", f.f.coefficient);
			request.setAttribute("pointA", f.pointA);
			request.setAttribute("pointB", f.pointB);
			request.setAttribute("Image", f.image);			
			this.url="Dashboard.jsp?mode=A";
		}
		else if(Integer.parseInt(request.getParameter("methode"))==4) {
			NewtonM f=new NewtonM();
			f.setFonction(fx);
			f.setPointI(Float.parseFloat(request.getParameter("pointI")));
			f.setPas(Float.parseFloat(request.getParameter("pas")));			
			f.resolution("datas.txt");
			f.gnuplot(path+"function.png",f.pointI,f.pointI);
			f.getByteImage();
			request.setAttribute("methode", f.methode);
			request.setAttribute("fonction", f.f.f);
			request.setAttribute("iteration", f.iteration);
			request.setAttribute("path", f.pathImg);
			request.setAttribute("resultat", f.resultat);
			request.setAttribute("coef", f.f.coefficient);
			request.setAttribute("pointA", f.pointI);
			request.setAttribute("pointB", "--");
			request.setAttribute("Image", f.image);			
			this.url="Dashboard.jsp?mode=B";
		}
		else if(Integer.parseInt(request.getParameter("methode"))==5) {
			Descente f=new Descente();
			f.setFonction(fx);
			f.setPointI(Float.parseFloat(request.getParameter("pointI")));
			f.setPas(Float.parseFloat(request.getParameter("pas")));			
			f.resolution("datas.txt");
			f.gnuplot(path+"function.png",f.pointI,f.pointI);
			f.getByteImage();
			request.setAttribute("methode", f.methode);
			request.setAttribute("fonction", f.f.f);
			request.setAttribute("iteration", f.iteration);
			request.setAttribute("path", f.pathImg);
			request.setAttribute("resultat", f.resultat);
			request.setAttribute("coef", f.f.coefficient);
			request.setAttribute("pointA", f.pointI);
			request.setAttribute("pointB", "--");
			request.setAttribute("Image", f.image);			
			this.url="Dashboard.jsp?mode=B";
		}
		else if(Integer.parseInt(request.getParameter("methode"))==6) {
			Rectangle f=new Rectangle();
			f.setFonction(fx);
			f.setPointA(Float.parseFloat(request.getParameter("pointA")));
			f.setPointB(Float.parseFloat(request.getParameter("pointB")));
			f.setPas(Float.parseFloat(request.getParameter("pas")));			
			f.resolution("datas.txt");
			f.gnuplot(path+"function.png",f.pointA,f.pointB);
			f.getByteImage();
			request.setAttribute("methode", f.methode);
			request.setAttribute("fonction", f.f.f);
			request.setAttribute("path", f.pathImg);
			request.setAttribute("resultat", f.resultat);
			request.setAttribute("coef", f.f.coefficient);
			request.setAttribute("pointA", f.pointA);
			request.setAttribute("pointB", f.pointB);
			request.setAttribute("iteration", f.pas);			
			request.setAttribute("Image", f.image);			
			this.url="Dashboard.jsp?mode=C";
		}
		else if(Integer.parseInt(request.getParameter("methode"))==7) {
			Trapeze f=new Trapeze();
			f.setFonction(fx);
			f.setPointA(Float.parseFloat(request.getParameter("pointA")));
			f.setPointB(Float.parseFloat(request.getParameter("pointB")));
			f.setPas(Float.parseFloat(request.getParameter("pas")));			
			f.resolution("datas.txt");
			f.gnuplot(path+"function.png",f.pointA,f.pointB);
			f.getByteImage();			
			request.setAttribute("methode", f.methode);
			request.setAttribute("fonction", f.f.f);
			request.setAttribute("path", f.pathImg);
			request.setAttribute("resultat", f.resultat);
			request.setAttribute("coef", f.f.coefficient);
			request.setAttribute("pointA", f.pointA);
			request.setAttribute("pointB", f.pointB);
			request.setAttribute("iteration", f.pas);			
			request.setAttribute("Image", f.image);			
			this.url="Dashboard.jsp?mode=C";
		}
		else if(Integer.parseInt(request.getParameter("methode"))==8) {
			Simpson f=new Simpson();
			f.setFonction(fx);
			f.setPointA(Float.parseFloat(request.getParameter("pointA")));
			f.setPointB(Float.parseFloat(request.getParameter("pointB")));
			f.setPas(Float.parseFloat(request.getParameter("pas")));			
			f.resolution("datas.txt");
			f.gnuplot(path+"function.png",f.pointA,f.pointB);
			f.getByteImage();
			request.setAttribute("methode", f.methode);
			request.setAttribute("fonction", f.f.f);
			request.setAttribute("path", f.pathImg);
			request.setAttribute("resultat", f.resultat);
			request.setAttribute("coef", f.f.coefficient);
			request.setAttribute("pointA", f.pointA);
			request.setAttribute("pointB", f.pointB);
			request.setAttribute("iteration", f.pas);			
			request.setAttribute("Image", f.image);	
			this.url="Dashboard.jsp?mode=C";
		}
		if((int)request.getAttribute("iteration")==-1) {
			request.setAttribute("iteration", "indefinie");
			request.setAttribute("resultat", "Aucune solution");
		}
		else if((int)request.getAttribute("iteration")==-2) {
			request.setAttribute("iteration", "indefinie");
			request.setAttribute("resultat", "Les donnees entrees ne sont pas compatibles avec cette methode.");
		}
		else if((int)request.getAttribute("iteration")>=0) {}
    }
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			traitement(request,response);
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
		}		
		request.getRequestDispatcher(url).forward(request, response);
		//doGet(request, response);
	}
}
