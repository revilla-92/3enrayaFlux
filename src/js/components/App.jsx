const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');

var TresEnRayaStore = require('../stores/TresEnRayaStores');

function getAppStateFromStore() {
	return {
		turno: TresEnRayaStore.getTurno(),
		valores: TresEnRayaStore.getValores(),
		movimientos: TresEnRayaStore.getMovimientos()
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
	render: function(){
		var texto = "Turno del " + this.state.turno;
		return (
			<div>
				<Cabecera texto={texto}/>
				<Tablero valores={this.state.valores}/>
				<div> Movimientos: {this.state.movimientos}</div>
			</div>
		)
	}
});

module.exports = App;