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
    dataType:"json",
		success:function(retorno){
			if(retorno.usuario.logado == 1){
        window.location.href = "home.html";
        if(retorno.usuario.admin == "F"){
          sessionStorage.setItem('logado','padrao');
        }else{
          sessionStorage.setItem('logado','admin');
        }  
        sessionStorage.setItem('codigo',retorno.usuario.codigo);
        sessionStorage.setItem('nome',retorno.usuario.nome);
        sessionStorage.setItem('email',retorno.usuario.email);
      }else{
        navigator.notification.alert("Usuário ou senha incorretos");
      }
		}
	});
	return false;
});

$(document).on('submit','#frmUsuario',function(){
  var email = $('#email').val();
  var senha = $('#senha').val();
  sessionStorage.setItem('preCadastroEmail', email);
  sessionStorage.setItem('preCadastroSenha', senha);
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

$(document).on('click','#logout',function(){
	sessionStorage.removeItem('logado');
  sessionStorage.removeItem('codigo');
  sessionStorage.removeItem('nome');
  sessionStorage.removeItem('email');
  window.location.href = "index.html";
});