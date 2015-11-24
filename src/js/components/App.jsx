const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');

var TresEnRayaStore = require('../stores/TresEnRayaStore');

function getAppStateFromStore() {
	return {
		turno: TresEnRayaStore.getTurno(),
		valores: TresEnRayaStore.getValores()
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
			</div>
		)
	}
});

module.exports = App;