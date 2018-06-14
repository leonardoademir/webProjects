/*eslint-disable eqeqeq, no-unused-vars, radix*/
var timerId = null; // variavel q armazena a chamada da funcao setTimeout

function startGame(){
	
	var url = window.location.search;
	var level = url.replace("?", "");
	

	var time = 	0;
	
	
	//NIVEL DO JOGO
	if(level == 1){
		time = 120;
	}
	
	if(level == 2){
		time = 60;
	}
	
	if(level == 3){
		time = 30;
	}
	
	
	//inserindo segundos no span
	document.getElementById('cronometro').innerHTML = time;
	
	//criacao baloes
	var qtd_baloes = 30;
	
	createBaloes(qtd_baloes);
	
	//imprimir qtd baloes inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;
	
	contagem_tempo(time + 1);
}


function game_over(){
    remove_eventos_baloes();
    alert('Fim de jogo, você não conseguiu estourar todos os balões a tempo');
}


function contagem_tempo(segundos){
	segundos = segundos - 1;
	
	if(segundos == -1){
		clearTimeout(timerId); //para a execucao do setTimeout
		game_over();
		return false;
	}
	
	document.getElementById('cronometro').innerHTML = segundos;
	
	timerId = setTimeout("contagem_tempo("+segundos+")",1000);
}

function createBaloes(qtd_baloes){
	for(var i=1; i<= qtd_baloes; i++){
		
		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.id = 'b' +i;
		balao.onclick = function(){estourar(this);};
		
		document.getElementById('cenario').appendChild(balao);
		
	}
}

function estourar(e){
	var id_balao = e.id;
	
	document.getElementById(id_balao).setAttribute("onclick", "");
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
	
	pontuacao(-1);
}

function pontuacao(acao){
	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
	
	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);
	
	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;
	
	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;
	
	situacao_jogo(baloes_inteiros, baloes_estourados);
}

function situacao_jogo(inteiros){
	if(inteiros == 0){
		alert('Congratulations, you did it!!!')
		parar_jogo();
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o elementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}
