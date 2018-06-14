<?php

	require_once('db.class.php');

	$usuario = $_POST['usuario'];
	$email = $_POST['email'];
	$senha = md5($_POST['senha']);

	$objDb = new db();
	$link = $objDb->conecta_mysql();

	$usuario_existe = false;
	$email_existe = false;
	//verificar se o usuario ja existe
	$sql = "SELECT * FROM usuario WHERE usuario ='$usuario'";
	if($result = mysqli_query($link, $sql)){
		$dados_usuario = mysqli_fetch_array($result);

		if(isset($dados_usuario['usuario'])){
			echo"usuario ja existe";
			$usuario_existe = true;
		}
	} else{
		echo "Erro ao tentar localizar usuario";
	}

	//verificar se o email ja existe
	$sql = "SELECT * FROM usuario WHERE email ='$email'";
	if($result = mysqli_query($link, $sql)){
		$dados_usuario = mysqli_fetch_array($result);

		if(isset($dados_usuario['email'])){
			echo"E-mail ja existe";
			$email_existe = true;
		}
	} else{
		echo "Erro ao tentar localizar e-mail";
	}

	if($usuario_existe || $email_existe){

		$retorno_get = '';

		if($usuario_existe){
			$retorno_get.= "erro_usuario=1&";
		}

		if($email_existe){
			$retorno_get.= "erro_email=1&";
		}

		header('Location: inscrevase.php?'.$retorno_get);
	}

	//die();

	$sql = "insert into usuario(usuario, email, senha) values('$usuario','$email','$senha')";

	//executar a query
	if(mysqli_query($link, $sql)){
		echo "Registro efetuado com sucesso.";
	} else{
		echo "Erro ao registrar usuario.";
	}

?>