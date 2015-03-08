package com.ahl.web.fluxinterface.fluxcommand;

import java.text.SimpleDateFormat;
import java.util.Date;

public class FluxCommand implements FluxInterface {
	
	private String lastCommand = null;

	public FluxCommand() {	
		
	}
	
	public void uCommand(String command){
		if (command != null) {
			Date dNow = new Date();
			SimpleDateFormat t = new SimpleDateFormat ("hh:mm:ss");
			lastCommand = (t.format(dNow) + " " + command);
		}
	}
	
	public String gResponse(){
		return lastCommand;		
	}

}
