const EventEmitter = require('events').EventEmitter;

var TresEnRayaDispatcher = require('../dispatchers/TresEnRayaDispatcher');

var Constants = require('../constants/TresEnRayaConstants');

var turno = Constants.JUGADORX;

var valoresTablero = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];

var movimientos = 0;


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
			TresEnRayaStore.emitChange();
			break;
		}
	});

module.exports = TresEnRayaStore;