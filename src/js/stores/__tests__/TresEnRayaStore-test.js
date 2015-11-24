jest.dontMock('../TresEnRayaStore');
jest.dontMock('object-assign');

describe('TresEnRayaStore', function () {
	var   TresEnRayaConstants = require('../../constants/TresEnRayaConstants');
	var   TresEnRayaDispatcher, TresEnRayaStore, callback;
	var actionJugarPosicion = {
		type: TresEnRayaConstants.ActionTypes.JUGAR_POSICION,
		x: 0,
		y: 0
    };
    beforeEach(function () {
    	TresEnRayaDispatcher = require('../../dispatchers/TresEnRayaDispatcher');
    	TresEnRayaStore = require('../TresEnRayaStore');
    	callback = TresEnRayaDispatcher.register.mock.calls[0][0];
    });
    it('registra un callback en el dispatcher', function () {
    	expect(TresEnRayaDispatcher.register.mock.calls.length).toBe(1);
    });
    it('inicializa con el tablero vacio y turno de las X', function () {
    	var valores = TresEnRayaStore.getValores();
    	expect(valores).toEqual([['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]);
    });
    it('juega la posicion 0-0', function () { callback(actionJugarPosicion);
    	var valores = TresEnRayaStore.getValores(); expect(valores[0][0]).toEqual('X');
    });
});