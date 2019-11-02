$(document).on('click','#paraCadastro',function(){
  var email = $('#email').val();
  var senha = $('#senha').val();
  sessionStorage.setItem('preCadastroEmail', email);
  sessionStorage.setItem('preCadastroSenha', senha);
  window.location.href = "cadastro.html";
});

$(document).on('click','#nav-button',function(){
  $("#sidenav").toggleClass("ativo");
});

$(document).on('submit','#frmLogin',function(){
	var dados = $(this).serialize();
	$.ajax({
		url: 'https://atividadeappcrudinho.000webhostapp.com/controlUsuario.php?acao=login',
		type: 'POST',
		data: dados,
		success:function(retorno){
			if(retorno == 1){
        window.location.href = "home.html";
        sessionStorage.setItem('logado','padrao');
      }else if(retorno == 2){
        window.location.href = "home.html";
        sessionStorage.setItem('logado','admin');
      }else{
        navigator.notification.alert("Usuário ou senha incorretos");
      }
		}
	});
	return false;
});

$(document).on('submit','#frmUsuario',function(){
	var dados = $(this).serialize();
	$.ajax({
		url: 'https://atividadeappcrudinho.000webhostapp.com/controlUsuario.php?acao=cadastrar',
		type: 'POST',
		data: dados,
		success:function(retorno){
			navigator.notification.alert(retorno);
      window.location.href = "index.html";
		}
	});
	return false;
});
