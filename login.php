<?php include 'middleware.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<script src="https://kit.fontawesome.com/bc8482cdd5.js" crossorigin="anonymous"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="stylesheet" href="auth.css" />
	<title>login</title>
</head>
<main class="main">
	<div class="container">
		<section class="wrapper">
			<div class="heading">
				<h1 class="text text-large">Sign In</h1>
				<p class="text text-normal">New user? <span><a href="/signup_P.php" class="text text-links">Create an
							account</a></span>
				</p>
			</div>
			<form name="login" class="form" method="POST" action="/auth.php">
				<div class="input-control">
					<label for="username" class="input-label" hidden>Username</label>
					<input type="username" name="username" class="input-field" placeholder="Username">
				</div>
				<div class="input-control">
					<label for="password" class="input-label" hidden>Password</label>
					<input type="password" name="password" class="input-field" placeholder="Password">
				</div>
				<div class="input-control">
					<input type="submit" name="submit" class="input-submit" value="Login">
				</div>
			</form>
			<div class="striped">
				<span class="striped-line"></span>
				<span class="striped-text">Or</span>
				<span class="striped-line"></span>
			</div>
			<div class="method">
				<div class="method-control">
					<a href="/main.php" class="method-action">
						<i class="ion ion-logo-apple"></i>
						<span></i>Enter as a Guest</span>
					</a>
				</div>
			</div>
		</section>
	</div>
</main>

</html>