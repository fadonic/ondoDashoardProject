<%
	StringBuffer requestURL = request.getRequestURL();
	String t_tempURLWithGetURL = requestURL.toString();
	String t_contextURL = t_tempURLWithGetURL.substring(0, t_tempURLWithGetURL.lastIndexOf("/"));
%>
