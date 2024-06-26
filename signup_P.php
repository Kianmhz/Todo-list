<?php include 'middleware.php'; ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script
      src="https://kit.fontawesome.com/bc8482cdd5.js"
      crossorigin="anonymous"
    ></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="auth.css" />
    <title>signup</title>
</head>
<main class="main">
	<div class="container">
		<section class="wrapper">
			<div class="heading">
				<h1 class="text text-large">Sign up</h1>
			</div>
            <form name="signup" class="form" method="POST" action="/signup.php">
                <div class="input-control">
                    <label for="F-name" class="input-label" hidden>Full Name</label>
                    <input type="text" name="F-name" class="input-field" placeholder="Full Name" required>
                </div>
                <div class="input-control">
                    <label for="username" class="input-label" hidden>Username</label>
                    <input type="text" name="username" class="input-field" placeholder="Username" required>
                </div>
                <div class="input-control">
                    <label for="email" class="input-label" hidden>Email</label>
                    <input type="email" name="email" class="input-field" placeholder="Email" required>
                </div>
                <div class="input-control">
                    <label for="password" class="input-label" hidden>Password</label>
                    <input type="password" name="password" class="input-field" placeholder="Password" required>
                </div>
                <div class="input-control">
                    <label for="confirm-password" class="input-label" hidden>Confirm Password</label>
                    <input type="password" name="confirm-password" class="input-field" placeholder="Confirm Password" required>
                </div>
                <div class="input-control">
                    <input type="submit" name="submit" class="input-submit" value="Sign Up">
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