<?php
	session_start();

	require_once('db.class.php');

	$id_usuario = $_SESSION['id_usuario'];
	$seguir_id_usuario = $_POST['seguir_id_usuario'];


	if($id_usuario == '' || $seguir_id_usuario == ''){
		die();
	}

	$objDb = new db();
	$link = $objDb->conecta_mysql();

	$sql = "INSERT INTO usuario_seguidores(id_usuario, seguindo_id_usuario) values ($id_usuario, $seguir_id_usuario)";

	mysqli_query($link, $sql);
?>