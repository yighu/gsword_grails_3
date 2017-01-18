<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>
        <g:layoutTitle default="GSword"/>
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <asset:stylesheet src="application.css"/>
    <asset:stylesheet src="sword.css"/>

    <g:layoutHead/>
</head>
<body>
 	<g:render template="/_menu/navbar" />
    <g:layoutBody/>

    <div class="footer" role="contentinfo">
 <g:link controller="gbook" action="drill">
                                        Drill Dictionaries
                                </g:link>
 	<g:render template="/_menu/footer" />
</div>

    <div id="spinner" class="spinner" style="display:none;">
        <g:message code="spinner.alt" default="Loading&hellip;"/>
    </div>

    <asset:javascript src="application.js"/>

</body>
</html>
