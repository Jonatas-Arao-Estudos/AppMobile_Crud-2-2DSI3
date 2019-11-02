$(document).on('click','#paraCadastro',function(){
  var email = $('#email').val();
  var senha = $('#senha').val();
  sessionStorage.setItem('preCadastroEmail', email);
  sessionStorage.setItem('preCadastroSenha', senha);
  window.location.href = "cadastro.html";
});

$(document).on('submit','#frmUsuario',function(){
	var dados = $(this).serialize();
	$.ajax({
		url: 'https://atividadeappcrudinho.000webhostapp.com/controlUsuario.php?acao=cadastrar',
		type: 'POST',
		data: dados,
		success:function(retorno){
			navigator.notification.alert(retorno);
		}
	});
	return false;
});
