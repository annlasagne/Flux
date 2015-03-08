<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Flux</title>
</head>
<body>
Flux <br/>
<form name="commandForm" action="FluxServlet" method="POST">
<p>Your last command was: </p><input type="text" name="control1" 
			SIZE="35"  value="<%= request.getAttribute("control1")%>" >
<br/>
<p>Enter your next command: </p><input type="text" name="control2" SIZE="35" >
<input type="submit" name="Submit" value="Submit">
</form>
</body>
</html>