    <div class="navbar navbar-default navbar-static-top" role="navigation">
        <div class="container">
<!--
            <div class="navbar-header">
		 <g:link controller="gbook" action="v">
                    <i class="fa grails-icon">
                        <asset:image src="gswordlogo.png"/>
                    </i>GSword
                   </g:link>
            </div>
-->
		<div class="navbar-collapse collapse" aria-expanded="true" style="height: 0.8px;"  role="navigation">
		<ul class="nav navbar-nav navbar-left">
		 <g:link controller="gbook" action="v">
                    <i class="fa grails-icon">
                        <asset:image src="gswordlogo.png"/>
                    </i>
                   </g:link>
		</ul>
		
		<ul class="nav navbar-nav navbar-left">
			<g:render template="/_menu/research"/>
		</ul>
		<ul class="nav navbar-nav navbar-left">
			<g:render template="/_menu/daily"/>
		</ul>
		<ul class="nav navbar-nav navbar-left">
			<g:render template="/_menu/classics"/>
		</ul>
		<ul class="nav navbar-nav navbar-left">
			<g:render template="/_menu/language"/>
		</ul>
		<ul class="nav navbar-nav navbar-left">
			<g:render template="/_menu/journal"/>
		</ul>
		<!--ul class="nav navbar-nav navbar-left">
			<g:render template="/_menu/oldtool"/>
		</ul-->

    	<ul class="nav navbar-nav navbar-left">
<!--
 			<g:render template="/_menu/search"/> 
			<g:render template="/_menu/admin"/>														
			<g:render template="/_menu/info"/>														
			<g:render template="/_menu/user"/>
-->
<!-- NOTE: the renderDialog for the "Register" modal dialog MUST be placed outside the NavBar (at least for Bootstrap 2.1.1): see bottom of main.gsp -->
<!-- <g:render template="/_menu/language"/>-->
	    </ul>			

		</div>
	</div>
</div>
<hr/>
