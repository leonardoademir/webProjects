/*eslint-disable no-unused-vars, no-undef*/
var round = 1;
var matriz_game = Array(3);

matriz_game['a'] = Array(3);
matriz_game['b'] = Array(3);
matriz_game['c'] = Array(3);

matriz_game['a'][1] = 0;
matriz_game['a'][2] = 0;
matriz_game['a'][3] = 0;

matriz_game['b'][1] = 0;
matriz_game['b'][2] = 0;
matriz_game['b'][3] = 0;

matriz_game['c'][1] = 0;
matriz_game['c'][2] = 0;
matriz_game['c'][3] = 0;

$(document).ready(function(){
	$('#btn-iniciar-jogo').click(function(){
		
		//valida a digitacao dos nicknames
		if(($('#nickname1').val()) == ''){
			alert('Nickname do Jogador 1 nao inserido');
			return false;
		}
		if(($('#nickname2').val()) == ''){
			alert('Nickname do Jogador 2 nao inserido');
			return false;
		};
	
	
		//exibir os apelidos
		$('#name-player1').html($('#nickname1').val());
		$('#name-player2').html($('#nickname2').val());
		
		//controla visualizacao das divs
		$('#pagina_inicial').hide();
		$('#palco_jogo').show();
	});
	
	$('.jogada').click(function(){
		
		var id_campo = this.id;
		$('#'+id_campo).off();
		jogada(id_campo);		
	});
	
	function jogada(id){
		var icone = '';
		var ponto = 0;
		
		if((round % 2) == 1){
			icone = 'url("imagens/marcacao_1.png")';
			ponto = -1;

		} else {
			icone = 'url("imagens/marcacao_2.png")';
			ponto = 1;

		}

		round++;
		
		$('#'+id).css('background-image', icone);
		
		var linha_coluna = id.split('-');
		
		matriz_game[linha_coluna[0]][linha_coluna[1]] = ponto;
		
		verifica_comb();
	}
	
	function verifica_comb(){
		
		//verifica na horizontal
		var pontos = 0;
		for(var i = 1; i<= 3; i++){
			pontos = pontos + matriz_game['a'][i];
		}
		
		var pontos = 0;
		for(var i = 1; i<= 3; i++){
			pontos = pontos + matriz_game['b'][i];
		}
		
		var pontos = 0;
		for(var i = 1; i<= 3; i++){
			pontos = pontos + matriz_game['b'][i];
		}
		ganhador(pontos);
		
		
		//verifica na vertical

		for(var l = 1; l <= 3; l++){
			pontos = 0;
			pontos += matriz_game['a'][l];
			pontos += matriz_game['b'][l];
			pontos += matriz_game['c'][l];
			
			ganhador(pontos);
		}

		//verificar na diagonal
		pontos = 0;		
		pontos = matriz_game['a'][1] + matriz_game['b'][2] + matriz_game['c'][3];
		ganhador(pontos);
		
		pontos = 0;		
		pontos = matriz_game['a'][3] + matriz_game['b'][2] + matriz_game['c'][1];		
		ganhador(pontos);		
		
		
	}
	
	function ganhador(pontos){
		if(pontos == -3){
			var jogada_1 = $('#nickname1').val();
			alert(jogada_1+' Won!!!');
			$('.jogada').off();
		} else if (pontos == 3){
			var jogada_2 = $('#nickname1').val();
			alert(jogada_2+' Won!!!');
			$('.jogada').off();
		}
	}
	
});