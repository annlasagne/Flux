package com.ahl.web.fluxinterface.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ahl.web.fluxinterface.fluxcommand.FluxCommand;

/**
 * Servlet implementation class FluxServlet
 */
@WebServlet("/FluxServlet")
public class FluxServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private FluxCommand flux = null;
	private String lastCommand = "You haven't done anything yet";
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FluxServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		System.out.println("doGET - start");
				
		flux.uCommand(request.getParameter("control2"));
		lastCommand = flux.gResponse();
		
		request.setAttribute("control1",lastCommand);	
		request.getRequestDispatcher("Flux.jsp").forward(request, response); 
		
		System.out.println("doGET - end");	 
	    
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("doPOST - redirect");
		doGet(request, response);
		
	}
	
	
	public void init() throws ServletException {
		System.out.println("init method");
		flux  = new FluxCommand();
		flux.uCommand("You are at the start");
		lastCommand = flux.gResponse();
		
	  }
	  
}
