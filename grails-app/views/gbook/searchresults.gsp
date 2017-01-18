<%--
  Created by IntelliJ IDEA.
  User: Yiguang
  Date: Dec 20, 2008
  Time: 9:30:55 PM
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
 <meta name="layout" content="main"/>

  <title>CCIM GSword Online Bible studio</title>
  <meta name="description" content="CCIM Chinese Christian GSword Online Bible Studio"/>
  <meta name="keywords" content="CCIM,GSword,Jsword,Bible,Chinese,groovy,grails"/>

  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<feed:meta kind="rss" version="2.0" controller="gbook" action="feed"/>
</head>
<%
 //def tm="showword(\"ChiNCVs\");"
 def tm="showword(\"ChiUns\");"
%>
<body onload='${tm}' >

 <g:render template="includes/searchdlg" />
</body>
</html>
