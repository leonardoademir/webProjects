<?php
	session_start();

	if(!isset($_SESSION['usuario'])){
		header('Location: index.php?erro=1');
	}

	require_once('db.class.php');

	$id_usuario = $_SESSION['id_usuario'];

	$objDb = new db();
	$link = $objDb->conecta_mysql();

	$sql = " SELECT DATE_FORMAT(t.data_inclusao, '%d %b %Y %T') AS data_inclusao, t.tweet, u.usuario ";
	$sql.= " FROM tweet AS t JOIN usuario AS u ON(t.id_usuario = u.id) ";
	$sql.= " WHERE id_usuario = $id_usuario ";
	$sql.= " OR id_usuario IN(select seguindo_id_usuario from usuario_seguidores where id_usuario = $id_usuario)";
	$sql.= " ORDER BY data_inclusao DESC";

	$result = mysqli_query($link, $sql);

	if($result){
		while($registro = mysqli_fetch_array($result, MYSQLI_ASSOC)){		
			echo '<a href="#" class="list-group-item">';
				echo '<h4 class="list-group-item-heading">'.$registro['usuario'].' <small> - '.$registro['data_inclusao'].' </small></h4>';
				echo '<p class="list-group-item-text">'.$registro['tweet'].'</p>';
				//echo '<span class="input-group-btn">
	    		//				<button class="btn btn-default btn-danger" id="btn_excluir_tweet" type="button"><small>Excluir Tweet</small></button>
				//</span>';
			echo "</a>";
			
		}
	} else{
		echo "Erro na consulta de tweets no bd";
	}
?>