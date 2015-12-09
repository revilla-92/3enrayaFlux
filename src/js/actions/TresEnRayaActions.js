var TresEnRayaDispatcher = require('../dispatchers/TresEnRayaDispatcher');

var Constants = require('../constants/TresEnRayaConstants');

module.exports = {
	jugarPosicion: function(x,y) {
		TresEnRayaDispatcher.dispatch({
			type : Constants.ActionTypes.JUGAR_POSICION, 
			x :x,
			y:y
		});
	},
	reiniciar: function(){
		TresEnRayaDispatcher.dispatch({
			type: Constants.ActionTypes.REINICIAR
		});
	}
};