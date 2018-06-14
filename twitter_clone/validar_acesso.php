<?php
	
	session_start();

	require_once('db.class.php');

	$usuario = $_POST['usuario'];
	$senha = md5($_POST['senha']);

	$sql = " SELECT * FROM usuario WHERE usuario = '$usuario' AND senha = '$senha' ";

	$objDb = new db();
	$link = $objDb->conecta_mysql();

	$result_id = mysqli_query($link, $sql);

	if($result_id){

	$dados_usuario = mysqli_fetch_array($result_id);

	if(isset($dados_usuario['usuario'])){

		$_SESSION['id_usuario'] = $dados_usuario['id'];
		$_SESSION['usuario'] = $dados_usuario['usuario'];
		$_SESSION['email'] = $dados_usuario['email'];

		header('Location: home.php');
	}else{
		header('Location: index.php?erro=1');
	}

	}else{
		echo "Erro na execucao da consulta, favor entrar em contato com o admin";
	}

	
?>