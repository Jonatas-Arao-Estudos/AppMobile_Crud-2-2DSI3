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

$(document).on('submit','#atualizaPerfil',function(){
	var dados = $(this).serialize();
	$.ajax({
		url: 'https://atividadeappcrudinho.000webhostapp.com/controlUsuario.php?acao=editar',
		type: 'POST',
		data: dados,
		success:function(retorno){
			navigator.notification.alert(retorno);
		}
	});
	return false;
});

$(document).on('click','#telaInicial',function(){
		$('#appTela').load('meuPerfil.html');
  $("#sidenav").toggleClass("ativo");
});

$(document).on('click','#mostraAdmin',function(){
	$('#appTela').load('admin.html');
  $("#sidenav").toggleClass("ativo");
});

$(document).on('click','#mostraUsuarios',function(){
	$('#appTela').load('usuarios.html');
  $("#sidenav").toggleClass("ativo");
});

$(document).on('click','#editarPerfil',function(){
	$('#appTela').load('editarPerfil.html');
  $("#sidenav").toggleClass("ativo");
});

$(document).on('click','#mostraAmigos',function(){
	$('#appTela').load('amigos.html');
  $("#sidenav").toggleClass("ativo");
});

$(document).on('click','#logout',function(){
	sessionStorage.removeItem('logado');
  sessionStorage.removeItem('codigo');
  sessionStorage.removeItem('nome');
  sessionStorage.removeItem('email');
  window.location.href = "index.html";
});

function carregarPerfil(){
  var parametros = {
        "cd": sessionStorage.getItem('codigo')
        };
  $.ajax({
        type: "post",
        url:"https://atividadeappcrudinho.000webhostapp.com/controlUsuario.php?acao=perfil",
        data: parametros,
        dataType: "json",
        success: function(data){
          $('#nome').val(data.usuario.nome);
          $('#dtnascimento').val(data.usuario.dt_nascimento);
          $('#cidade').val(data.usuario.cidade);
          $('#bio').val(data.usuario.bio);
          $('#cd').attr('value',sessionStorage.getItem('codigo'));
        },
        error: function(data){
          navigator.notification.alert("Erro ao carregar perfil");
        }
    });
}

function listar(){
  var parametros = {
        "cd": 0
        };
  $.ajax({
        type: "post",
        url:"https://atividadeappcrudinho.000webhostapp.com/controlUsuario.php?acao=perfil",
        data: parametros,
        dataType: "json",
        success: function(data){
          var itemlista = "";
          $.each(data.usuario,function(i,dados){
            if(dados.codigo != sessionStorage.getItem('codigo')){
              itemlista += "<option value='"+dados.codigo+"'>"+dados.nome+"</option>";
            }
          });
          $("#listaUsuario").append(itemlista);
        },
        error: function(data){
          navigator.notification.alert("Erro ao listar usuários");
        }
    });
}

function listarCadastro(){
  var parametros = {
        "cd": 0
        };
  $.ajax({
        type: "post",
        url:"https://atividadeappcrudinho.000webhostapp.com/controlUsuario.php?acao=perfil",
        data: parametros,
        dataType: "json",
        success: function(data){
          var itemlista = "";
          $.each(data.usuario,function(i,dados){
              itemlista += "<option value='"+dados.codigo+"'>"+dados.nome+"</option>";
          });
          $("#listaCadastro").append(itemlista);
        },
        error: function(data){
          navigator.notification.alert("Erro ao listar usuários");
        }
    });
}

function listarAmigos(){
  var parametros = {
        "cd": sessionStorage.getItem('codigo')
        };
  $.ajax({
        type: "post",
        url:"https://atividadeappcrudinho.000webhostapp.com/controlAmizade.php?acao=listar",
        data: parametros,
        dataType: "json",
        success: function(data){
          var itemlista = "";
          $.each(data.amizade,function(i,dados){
              itemlista += "<option value='"+dados.codigo+"'>"+dados.nome+"</option>";
          });
          $("#listaAmigos").append(itemlista);
        },
        error: function(data){
          navigator.notification.alert("Erro ao listar amigos");
        }
    });
}

$(document).on("change","#listaUsuario",function(){
      var parametros = {
        "cd": $("option:selected", ("#listaUsuario")).val()
        };
        $.ajax({
        type: "post",
        url:"https://atividadeappcrudinho.000webhostapp.com/controlUsuario.php?acao=perfil",
        data: parametros,
        dataType:"json",
        success: function(data){
          $('#usuarios').show();
          $("#usuarioNome").html(data.usuario.nome);
          $("#usuarioCidade").html(data.usuario.cidade);
          $("#usuarioNasc").html(data.usuario.dt_nascimento);
          $("#usuarioBio").html(data.usuario.bio);
          $(".perfil").attr("value",data.usuario.codigo);
          $(".usuario").attr("value",sessionStorage.getItem('codigo'));
          verificaAmizade(data.usuario.codigo,sessionStorage.getItem('codigo'));
        },
        error: function(data){
          navigator.notification.alert("Erro ao carregar");
        }
      });
    });

    $(document).on("change","#listaCadastro",function(){
      var parametros = {
        "cd": $("option:selected", ("#listaCadastro")).val()
        };
        $.ajax({
        type: "post",
        url:"https://atividadeappcrudinho.000webhostapp.com/controlUsuario.php?acao=listar",
        data: parametros,
        dataType:"json",
        success: function(data){
          $('#cd').attr('value',$("option:selected", ("#listaCadastro")).val());
          $("#nome").val(data.usuario.nome);
          $("#email").val(data.usuario.email);
        },
        error: function(data){
          navigator.notification.alert("Erro ao carregar");
        }
      });
    });

$(document).on("change","#listaAmigos",function(){
      var parametros = {
        "cd": $("option:selected", ("#listaAmigos")).val()
        };
        $.ajax({
        type: "post",
        url:"https://atividadeappcrudinho.000webhostapp.com/controlUsuario.php?acao=perfil",
        data: parametros,
        dataType:"json",
        success: function(data){
          $('#amigos').show();
          $("#usuarioNome").html(data.usuario.nome);
          $("#usuarioCidade").html(data.usuario.cidade);
          $("#usuarioNasc").html(data.usuario.dt_nascimento);
          $("#usuarioBio").html(data.usuario.bio);
          $(".perfil").attr("value",data.usuario.codigo);
          $(".usuario").attr("value",sessionStorage.getItem('codigo'));
          verificaAmizade(data.usuario.codigo,sessionStorage.getItem('codigo'));
        },
        error: function(data){
          navigator.notification.alert("Erro ao carregar");
        }
      });
    });

function verificaAmizade(solicitado,solicitante){
  var parametros = {
        "solicitado": solicitado,
        "solicitante": solicitante
      };
  $.ajax({
        type: "post",
        url:"https://atividadeappcrudinho.000webhostapp.com/controlAmizade.php?acao=verifica",
        data: parametros,
        success: function(data){
          if(data == 1){
            $('#addAmizade').hide();
            $('#okAmizade').hide();
            $('#solAmizade').hide();
            $('#negAmizade').hide();
            $('#delAmizade').show();
          }else{
              $('#addAmizade').hide();
              $('#okAmizade').hide();
              $('#delAmizade').hide();
              $('#solAmizade').hide();
              $('#negAmizade').hide();
              var otherparametros = {
                    "solicitado": solicitado,
                    "solicitante": solicitante
                  };
              $.ajax({
                    type: "post",
                    url:"https://atividadeappcrudinho.000webhostapp.com/controlAmizade.php?acao=verificaSolicitacao",
                    data: otherparametros,
                    success: function(data){
                     if(data == 2){
                       $('#okAmizade').show();
                       $('#negAmizade').show();
                     }
                     else if(data == 1){
                       $('#solAmizade').show();
                     }
                     else{
                       $('#addAmizade').show();
                     }
                    }
                });
          }
        }
    });
}

$(document).on('submit','#addAmizade',function(){
	var dados = $(this).serialize();
	$.ajax({
		url: 'https://atividadeappcrudinho.000webhostapp.com/controlAmizade.php?acao=solicitar',
		type: 'POST',
		data: dados,
		success:function(retorno){
			navigator.notification.alert(retorno);
      $('#addAmizade').hide();
      $('#solAmizade').show();
		}
	});
	return false;
});

$(document).on('submit','#delAmizade',function(){
	var dados = $(this).serialize();
	$.ajax({
		url: 'https://atividadeappcrudinho.000webhostapp.com/controlAmizade.php?acao=desfazer',
		type: 'POST',
		data: dados,
		success:function(retorno){
			navigator.notification.alert(retorno);
      $('#delAmizade').hide();
      $('#addAmizade').show();
		}
	});
	return false;
});

$(document).on('submit','#negAmizade',function(){
	var dados = $(this).serialize();
	$.ajax({
		url: 'https://atividadeappcrudinho.000webhostapp.com/controlAmizade.php?acao=negar',
		type: 'POST',
		data: dados,
		success:function(retorno){
			navigator.notification.alert(retorno);
      $('#okAmizade').hide();
      $('#negAmizade').hide();
      $('#addAmizade').show();
		}
	});
	return false;
});

$(document).on('submit','#okAmizade',function(){
	var dados = $(this).serialize();
	$.ajax({
		url: 'https://atividadeappcrudinho.000webhostapp.com/controlAmizade.php?acao=aceitar',
		type: 'POST',
		data: dados,
		success:function(retorno){
			navigator.notification.alert(retorno);
      $('#okAmizade').hide();
      $('#negAmizade').hide();
      $('#delAmizade').show();
		}
	});
	return false;
});

$(document).on("click","#editar",function(){
      if($("option:selected", ("#listaCadastro")).attr("disabled") != "disabled"){
        $("#nome").attr( "disabled", false );
        $("#email").attr( "disabled", false );
      }
  });

    $(document).on("click","#cancelar",function(){
      if($("option:selected", ("#lista")).attr("disabled") != "disabled"){
        var parametros = {
          "cd": $("option:selected", ("#listaCadastro")).val()
          };
          $.ajax({
          type: "post",
          url:"https://atividadeappcrudinho.000webhostapp.com/controlUsuario.php?acao=listar",
          data: parametros,
          dataType:"json",
          success: function(data){
            $("#nome").attr( "disabled", true );
            $("#email").attr( "disabled", true );
            $("#nome").val(data.usuario.nome);
            $("#email").val(data.usuario.email);
          },
          error: function(data){
            navigator.notification.alert("Erro ao carregar");
          }
        });        
      }
    });

$(document).on('click','#atualizar',function(){
  var dados = {
          "cd": $("#cd").val(),
          "nome" : $("#nome").val(),
          "email" : $("#email").val()
        };
	$.ajax({
		url: 'https://atividadeappcrudinho.000webhostapp.com/controlUsuario.php?acao=atualizacadastro',
		type: 'POST',
		data: dados,
    success: function(data){
      $("#nome").attr( "disabled", true );
      $("#email").attr( "disabled", true );
      navigator.notification.alert(data);
    },
    error: function(data){
      navigator.notification.alert("Erro ao cadastrar");
    }
	});
	return false;
});

$(document).on("click","#deletar",function(){
      if($("option:selected", ("#lista")).attr("disabled") != "disabled"){
        var parametros = {
          "cd": $("#cd").val()
          };
          $.ajax({
          type: "post",
          url:"https://atividadeappcrudinho.000webhostapp.com/controlUsuario.php?acao=excluir",
          data: parametros,
          success: function(data){
            navigator.notification.alert(data);
            $('#appTela').load('admin.html');
          },
          error: function(data){
            navigator.notification.alert("Erro ao deletar");
          }
        });
      }
    });

function mostraPerfil(){
  var parametros = {
    "cd": sessionStorage.getItem('codigo')
    };
    $.ajax({
    type: "post",
    url:"https://atividadeappcrudinho.000webhostapp.com/controlUsuario.php?acao=perfil",
    data: parametros,
    dataType:"json",
    success: function(data){
      $("#meuNome").html(data.usuario.nome);
      $("#meuCidade").html(data.usuario.cidade);
      $("#meuNasc").html(data.usuario.dt_nascimento);
      $("#meuBio").html(data.usuario.bio);
    },
    error: function(data){
      navigator.notification.alert("Erro ao carregar");
    }
  });
}