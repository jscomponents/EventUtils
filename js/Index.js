/**
 * 
 * Script para teste do EventUtils.js
 * @author: Edy Segura - edy@segura.eti.br
 *
 */


var Index = {
	
	//atributos
	nome  : "Edy Segura",
	sexo  : "Masculino",
	idade : "23 Anos",
	
	
	//métodos
	init: function () {
		Index.setButtons();
	},
	
	
	getNome: function() {
		alert(Index.nome);
	},
	
	
	getSexo: function() {
		alert(Index.sexo);
	},
	
	
	getIdade: function() {
		alert(Index.idade);
	},
	
	
	withParams: function(params) {
		alert([params.nome, params.sobrenome].join("\n"));
	},
	
	
	setButtons: function() {
		var buttonAdd = document.getElementById("add");
		var buttonRemove = document.getElementById("remove");
		var buttonReload = document.getElementById("reload");
		
		buttonAdd.onclick = function() {
			Index.addOrRemoveEvent("add");
		};
		
		buttonRemove.onclick = function() {
			Index.addOrRemoveEvent("remove");
		};
		
		buttonReload.onclick = function() {
			document.location.reload();
		};
		
	},
	
	
	resetChecks: function(checks) {
		for(var i=0; i<checks.length; i++) {
			checks[i].checked = false;
		}
	},
	
	
	addOrRemoveEvent: function(isAdd) {
		var element = document.getElementsByTagName('p')[1];
		var checks = document.getElementsByName('eventos');
		var log = document.getElementById('log');
		
		log.value = "";
		isAdd = (isAdd == "add") ? true : false;
		
		for(var i=0; i<checks.length; i++) {
			if(isAdd && checks[i].checked && checks[i].id == "event4") {
				EventUtils.add(element, 'click', EventUtils.getFunction(Index.withParams, eval('(' + checks[i].value + ')')));
				log.value += "Evento Index.withParams adicionado.\n";
				continue;
			}
			else if(checks[i].checked && checks[i].id == "event4") {
				log.value += "Não é possivel remover o evento Index.withParams.\n";
				continue;
			}
			
			if(isAdd && checks[i].checked) {
				EventUtils.add(element, 'click', eval(checks[i].value));
				log.value += "Evento " + checks[i].value + " adicionado.\n";
			}
			else if(checks[i].checked) {
				EventUtils.remove(element, 'click', eval(checks[i].value));
				log.value += "Evento " + checks[i].value + " removido.\n";
			}
		}
		
		Index.resetChecks(checks);
	}
	
};

//inicializacao
window.onload = Index.init;