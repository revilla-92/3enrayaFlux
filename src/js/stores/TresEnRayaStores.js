const EventEmitter = require('events').EventEmitter;

var TresEnRayaDispatcher = require('../dispatchers/TresEnRayaDispatcher');
var Constants = require('../constants/TresEnRayaConstants');


var valoresTablero = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
var turno = Constants.JUGADORX;
var jugadorGanadorX = false;
var jugadorGanadorY = false;
var movimientos = 0;

var turnoInicial = Constants.JUGADORX;
var jugadorGanadorXInicial = false;
var jugadorGanadorYInicial = false;
var movimientosInicial = 0;

function compruebaGanadorJugadorX(valores){

	// Comprobaciones para filas y columnas.
	for (var a = 0; a < 3; a++){
		
		// Contadores para coincidencias en fila de 3.
		var n1X = 0;
		var n2X = 0;
		var n3X = 0;
		var n4X = 0;

		// Bucle secundario para comprobar las filas y columnas.
		for (var b = 0; b < 3; b++){

			// Comprobamos filas para el valor X
			if(valores[a][b] === 'X'){
				n1X++;
			}
			// Comprobamos columnas para el valor X
			if(valores[b][a] === 'X'){
				n2X++;
			}

			// Comprobamos la diagonal principal.
			if (valores[b][b] === 'X'){
				n3X++;
			}

			// Comprobamos la diagonal inversa.
			if (valores[b][2-b] === 'X'){
				n4X++;
			}

			// Si alguno de los contadores ha llegado a 3 coincidencias con X es que ha hecho 3 en raya y finaliza el juego.
			if(n1X === 3 || n2X === 3 || n3X === 3 || n4X ===3){
				return true;
			}
		}
	}
};


function compruebaGanadorJugadorY(valores){

	// Comprobaciones para filas y columnas.
	for (var a = 0; a < 3; a++){
		
		// Contadores para coincidencias en fila de 3.
		var n10 = 0;
		var n20 = 0;
		var n30 = 0;
		var n40 = 0;

		// Bucle secundario para comprobar las filas y columnas.
		for (var b = 0; b < 3; b++){

			// Comprobamos filas para el valor X
			if(valores[a][b] === '0'){
				n10++;
			}
			// Comprobamos columnas para el valor X
			if(valores[b][a] === '0'){
				n20++;
			}

			// Comprobamos la diagonal principal.
			if (valores[b][b] === '0'){
				n30++;
			}

			// Comprobamos la diagonal inversa.
			if (valores[b][2-b] === '0'){
				n40++;
			}

			// Si alguno de los contadores ha llegado a 3 coincidencias con X es que ha hecho 3 en raya y finaliza el juego.
			if(n10 === 3 || n20 === 3 || n30 === 3 || n40 ===3){
				return true;
			}
		}
	}
};

var TresEnRayaStore = Object.assign({}, EventEmitter.prototype, {
	getTurno: function () {
		return turno;
	},
	getValores: function () {
		return valoresTablero;
	},
	getMovimientos: function () {
		return movimientos;
	},
	getGanadorJugadorX: function(){
		return jugadorGanadorX;
	},
	getGanadorJugadorY: function(){
		return jugadorGanadorY;
	},
	addChangeListener(callback) {
		this.on(Constants.CHANGE_EVENT, callback);
	},
	removeChangeListener(callback) {
		this.removeListener(Constants.CHANGE_EVENT, callback);
	},
	emitChange() {
		this.emit(Constants.CHANGE_EVENT);
	}
});

TresEnRayaDispatcher.register(function (payload) {
	switch (payload.type) {
		case Constants.ActionTypes.JUGAR_POSICION:
			let nuevoValor = turno === Constants.JUGADORX ? 'X' : '0';
			turno = turno === Constants.JUGADORX ? Constants.JUGADOR0 : Constants.JUGADORX;
			valoresTablero[payload.x][payload.y] = nuevoValor;
			movimientos = movimientos + 1;

			jugadorGanadorX = compruebaGanadorJugadorX(valoresTablero);
			jugadorGanadorY = compruebaGanadorJugadorY(valoresTablero);

			TresEnRayaStore.emitChange();
			break;

		case Constants.ActionTypes.REINICIAR:

			jugadorGanadorX = jugadorGanadorXInicial;
			jugadorGanadorY = jugadorGanadorYInicial;
			valoresTablero = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
			movimientos = movimientosInicial;
			turno = turnoInicial;

			TresEnRayaStore.emitChange();
			break;

		}
	});

module.exports = TresEnRayaStore;