/**
 *
 * Objeto Literal EventUtils. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/Event
 *
 * EventUtils.js
 * http://jscomponentes.googlecode.com/svn/trunk/Event/js/Event/EventUtils.js
 * @author: Edy Segura - edy@segura.pro.br
 *
 */
var EventUtils = {

	//old alias - deprecated
	addHandle: function(element, type, functionReference) {
		EventUtils.add(element, type, functionReference);
	},
	
	
	//example: EventUtils.add(window, 'load', functionReference);
	add: function(element, type, functionReference) {
		if(element.attachEvent) {
			element['e' + type + functionReference] = functionReference;
			element[type + functionReference] = function(){ element['e' + type + functionReference](window.event); };
			element.attachEvent('on' + type, element[type + functionReference]);
		}
		else if(element.addEventListener) {
			element.addEventListener(type, functionReference, false);
			return true;
		}
		else return false;
	},
	
	
	addLoad: function(functionReference) {
		EventUtils.add(window, 'load', functionReference);
	},
	
	
	//old alias - deprecated
	removeHandle: function(element, type, functionReference) {
		EventUtils.remove(element, type, functionReference);
	},
	
	
	//example: EventUtils.remove(document, 'keypress', functionReference);
	remove: function(element, type, functionReference) {
		if(element.detachEvent) {
			element.detachEvent('on' + type, element[type + functionReference]);
			element[type + functionReference] = null;
		}
		else if(element.addEventListener) {
			element.removeEventListener(type, functionReference, false);
			return true;
		}
		else return false;
	},
	
	
	//adicionar evento dinamicamente, http://www.jsfromhell.com/geral/event-listener
	addEvent: function(o, e, f, s) {
		var r = o[r = "_" + (e = "on" + e)] = o[r] || (o[e] ? [[o[e], o]] : []), a, c, d;
		r[r.length] = [f, s || o], o[e] = function(e){
			try{
				(e = e || event).preventDefault || (e.preventDefault = function(){e.returnValue = false;});
				e.stopPropagation || (e.stopPropagation = function(){e.cancelBubble = true;});
				e.target || (e.target = e.srcElement || null);
				e.key = (e.which + 1 || e.keyCode + 1) - 1 || 0;
			}catch(f){}
			for(d = 1, f = r.length; f; r[--f] && (a = r[f][0], o = r[f][1], a.call ? c = a.call(o, e) : (o._ = a, c = o._(e), o._ = null), d &= c !== false));
			return e = null, !!d;
			}
	},
	
	
	//remover evento dinamicamente, http://www.jsfromhell.com/geral/event-listener
	removeEvent: function(o, e, f, s) {
		for(var i = (e = o["_on" + e] || []).length; i;)
			if(e[--i] && e[i][0] == f && (s || o) == e[i][1])
				return delete e[i];
		return false;
	},
	
	
	//formata o evento no IE
	formatEvent: function(event) {
		if(event.srcElement && window.ActiveXObject) {
    	event.charCode = (event.type == "keypress") ? event.keyCode : 0;
      event.eventPhase = 2;
      event.isChar = (event.charCode > 0);
      
			event.pageX = event.clientX + document.body.scrollLeft;
      event.pageY = event.clientY + document.body.scrollTop;
      
			event.preventDefault = function () {
      	this.returnValue = false;
      };
			
      if(event.type == "mouseout") {
      	event.relatedTarget = event.toElement;
      } 
			else if(event.type == "mouseover") {
      	event.relatedTarget = event.fromElement;
      }
			
			event.stopPropagation = function () {
				this.cancelBubble = true;
			};
			
			event.target = event.srcElement;
			event.time = (new Date).getTime();
    }
		
    return event;
	},
	
	
	//pega o evento formatado para o IE
	getEvent: function() {
		if(window.event) {
    	return EventUtils.formatEvent(window.event);
    } else {
    	return EventUtils.getEvent.caller.arguments[0];
    }
	},
	
	
	//metodo para adicionar uma função com parâmetros
	getFunction: function(functionReference, params) {
		return function() {
			try {
				functionReference(params);
			}
			catch(e) {
				throw new Error("Erro na atribuição da functionReference em EventUtils.getFunction(). Descrição: " + e.message);
			}
		}
	},
	
	
	//metodo para pegar a posicao do mouse
	getMousePosition: function(e) {
		e = e || window.event;
		
		var positionX = (e.clientX) ? e.clientX : e.pageX;
		var positionY = (e.clientY) ? e.clientY : e.pageY;
		
		return {x:positionX, y:positionY};
	},
	
	
	//metodo para pegar o elemento que gerou o evento
	getSource: function(e) {
		e = e || window.event;
		
		var target = (e.target) ? e.target : 
		             (e.srcElement) ? e.srcElement : null;
		
		//necessario para safari e konqueror
		if(target && target.nodeType == 3) target = target.parentNode;
		return target;
	}

};
