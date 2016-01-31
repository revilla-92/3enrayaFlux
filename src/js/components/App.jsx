const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');

var TresEnRayaActions = require('../actions/TresEnRayaActions');
var TresEnRayaStore = require('../stores/TresEnRayaStores');

function getAppStateFromStore() {
	return {
		turno: TresEnRayaStore.getTurno(),
		valores: TresEnRayaStore.getValores(),
		movimientos: TresEnRayaStore.getMovimientos(),
		jugadorGanadorX: TresEnRayaStore.getGanadorJugadorX(),
		jugadorGanadorY: TresEnRayaStore.getGanadorJugadorY()
	};
}

var App = React.createClass({
	getInitialState: function(){
		return getAppStateFromStore();
	},
	componentDidMount() {
		TresEnRayaStore.addChangeListener(this._onChange);
	},
	componentWillUnmount() {
		TresEnRayaStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState(getAppStateFromStore());
	},
	_onClickButtonReinicio: function () {
		TresEnRayaActions.reiniciar();
	},
	render: function(){

		if(this.state.jugadorGanadorX){
			alert("Ha ganado el jugador X");
		}
		if(this.state.jugadorGanadorY){
			alert("Ha ganado el jugador O");
		}
		if(this.state.movimientos === 9){
			alert("Ha acabado el juego, pulsa el boton para reiniciar");
		}

		var texto = "Turno del " + this.state.turno;

		return (
			<div>
				<Cabecera texto={texto}/>
				<Tablero valores={this.state.valores}/>
				<div id="movimientos"> Movimientos: {this.state.movimientos}</div>
				<button onClick={this._onClickButtonReinicio}> Reiniciar Partida. </button>
			</div>
		)
	}
});

module.exports = App;