<%-- <div style="">
	<div class="container-fluid" style="margin-bottom: 10px;border-bottom: 3px solid #002060;">
		<div class="col-lg-3 col-md-3 col-sm-3">
			<img class="img-responsive" src="images/KWARALOG.png" height="60px"
				width="230px" style="margin-top: 5px;">
		</div>
		<div class="col-lg-6 col-md-6 col-sm-5 text-center">
			<p class="custom-nav-header">
				<span style="color:#002060;">KWARA State Department of Road Tax<br></span>
				<span style="color:#076735;"> Vehicle Management System</span>
			</p>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-4">
			<div class="row">
				<div class="col-lg-8 col-md-8 col-sm-7 col-xs-6 text-right">
					<p style="font-family: sans-serif; font-size: 12px; margin-top: 9px; margin-bottom: 5px;line-height: 1">
						<span style="cursor: pointer;" bGlk="<%=lid%>" id="userLogoutBtn">
							<i class="fa fa-power-off" aria-hidden="true"></i>&nbsp;&nbsp;LOGOUT<br>
						</span>
						<span>WelCome<br></span>
						<span style="font-weight: 600;"><%=userName%><br></span>
						<span><%=role%><br></span>
						<a href="<%= t_contextURL%>/template.jsp" class="" style="text-decoration:none;color:black;">
							<span style="cursor: pointer;" id="">
								<i class="fa fa-home" aria-hidden="true"></i>&nbsp;&nbsp;HOME<br>
							</span>
						</a>
					</p>	
				</div>
				<div class="col-lg-4 col-md-4 col-sm-5 col-xs-6">
					<img class="img-responsive" src="images/profilePic.png" style="height: 58px;width: 58px;margin-top: 9px;">
				</div>
			</div>
			
		</div>
	</div>
</div>
<div class="hide">
	<nav class="navbar navbar-default custom-navbar-kwara">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" style="border: 0px"
					data-target="#myNavbar">
					<span class="icon-bar"></span> 
					<span class="icon-bar"></span> 
				</button>
				<a class="navbar-brand hide" href="#">WebSiteName</a>
			</div>
			<div class="collapse navbar-collapse" id="myNavbar" style="line-height: 10px;margin-top: 0px;">
				<ul class="nav navbar-nav">
					<li class="active"><a href="#" class="custom-link">
							<span style="font-weight: 600;"> <i class="fa fa-user-o"
								aria-hidden="true"></i>&nbsp;&nbsp;User Name (VERIFICATION OFFICER)
						</span>
					</a></li>
					<li class="active"><a href="<%= t_contextURL%>/template.jsp" class="custom-link">
							<span style="font-weight: 600;"> <i class="fa fa-user-o"
								aria-hidden="true"></i>&nbsp;&nbsp;Dashboard
						</span>
					</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li class="active" id="userLogoutBtn" bGlk="<%=lid%>"><a href="#" class="custom-link">
							<i class="fa fa-power-off" aria-hidden="true"></i>&nbsp;&nbsp;Logout
					</a></li>
				</ul>
			</div>
		</div>
	</nav>
</div> --%>