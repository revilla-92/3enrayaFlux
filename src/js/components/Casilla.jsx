var TresEnRayaActions = require('../actions/TresEnRayaActions');

const casillaStyle = {
	height: '100px',
	width: '100px'
};

let Casilla = React.createClass({
	casillaClick: function(){
		if(this.props.valor==="-"){
			TresEnRayaActions.jugarPosicion(this.props.indiceFila, this.props.indiceColumna);
		}
	},
	render: function(){
		return (
			<button style={casillaStyle} className={this.props.valor==="-" ? "clickable":"no_clickable"} onClick={this.casillaClick}>
				{this.props.valor}
			</button>
		)
	}
});

module.exports = Casilla;