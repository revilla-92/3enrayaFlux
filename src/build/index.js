(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Tablero = require('./Tablero.jsx');
var Cabecera = require('./Cabecera.jsx');
var JUGADORX = "jugador 1 - las X";
var JUGADOR0 = "jugador 2 - los 0";

function compruebaGanador(valores) {

	var nab = 9;

	// Comprobaciones para filas y columnas.
	for (var a = 0; a < 3; a++) {

		// Contadores para coincidencias en fila de 3.
		var n1X = 0;
		var n2X = 0;
		var n3X = 0;
		var n4X = 0;
		var n10 = 0;
		var n20 = 0;
		var n30 = 0;
		var n40 = 0;
		var juegoAcabado = false;

		// Bucle secundario para comprobar las filas y columnas.
		for (var b = 0; b < 3; b++) {

			// Comprobamos que ya no hay más casillas en el tablero por rellenar.
			if (valores[a][b] === 'X' || valores[a][b] === '0') {
				nab--;
				console.log(nab);
			}

			// Comprobamos filas para el valor X
			if (valores[a][b] === 'X') {
				n1X++;
			}
			// Comprobamos columnas para el valor X
			if (valores[b][a] === 'X') {
				n2X++;
			}
			// Comprobamos filas para el valor 0
			if (valores[a][b] === '0') {
				n10++;
			}
			// Comprobamos columnas para el valor 0
			if (valores[b][a] === '0') {
				n20++;
			}

			// Comprobamos la diagonal principal.
			if (valores[b][b] === 'X') {
				n3X++;
			}

			if (valores[b][b] === '0') {
				n30++;
			}

			// Comprobamos la diagonal inversa.
			if (valores[b][2 - b] === 'X') {
				n4X++;
			}

			if (valores[b][2 - b] === '0') {
				n40++;
			}

			// Si se termina el juego y nadie ha ganado se invita a jugar otra partida.
			if (nab === 0) {
				juegoAcabado = true;
				ponerACero(n1X, n2X, n3X, n4X, n10, n20, n30, n40);
				var x = confirm("Juego Terminado. Nadie ha ganado. \n ¿Desea empezar otra partida?");
				if (x === true) {
					return true;
				}
			}

			// Si alguno de los contadores ha llegado a 3 coincidencias con X es que ha hecho 3 en raya y finaliza el juego.
			if (n1X === 3 || n2X === 3) {
				juegoAcabado = true;
				ponerACero(n1X, n2X, n3X, n4X, n10, n20, n30, n40);
				var x = confirm("Ha ganado el jugador X. \n ¿Desea empezar otra partida?");
				if (x === true) {
					return true;
				}
			}

			// Si alguno de los contadores ha llegado a 3 coincidencias con X es que ha hecho 3 en raya y finaliza el juego.
			if (n10 === 3 || n20 === 3) {
				juegoAcabado = true;
				ponerACero(n1X, n2X, n3X, n4X, n10, n20, n30, n40);
				var x = confirm("Ha ganado el jugador 0 \n ¿Desea empezar otra partida?");
				if (x === true) {
					return true;
				}
			}

			if (n3X === 3) {
				juegoAcabado = true;
				ponerACero(n1X, n2X, n3X, n4X, n10, n20, n30, n40);
				var x = confirm("Ha ganado el jugador X \n ¿Desea empezar otra partida?");
				if (x === true) {
					return true;
				}
			}

			if (n30 === 3) {
				juegoAcabado = true;
				ponerACero(n1X, n2X, n3X, n4X, n10, n20, n30, n40);
				var x = confirm("Ha ganado el jugador 0 \n ¿Desea empezar otra partida?");
				if (x === true) {
					return true;
				}
			}

			if (n4X === 3) {
				juegoAcabado = true;
				ponerACero(n1X, n2X, n3X, n4X, n10, n20, n30, n40);
				var x = confirm("Ha ganado el jugador X \n ¿Desea empezar otra partida?");
				if (x === true) {
					return true;
				}
			}

			if (n40 === 3) {
				juegoAcabado = true;
				ponerACero(n1X, n2X, n3X, n4X, n10, n20, n30, n40);
				var x = confirm("Ha ganado el jugador 0 \n ¿Desea empezar otra partida?");
				if (x === true) {
					return true;
				}
			}

			if (juegoAcabado === true) {
				break;
			}
		}
	}
};

function ponerACero(a, b, c, d, e, f, g, h) {
	a = b = c = d = e = f = g = h = 0;
};

var App = React.createClass({
	displayName: 'App',

	getInitialState: function getInitialState() {
		return {
			turno: JUGADORX,
			valores: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]
		};
	},
	appClick: function appClick(numeroFila, numeroColumna) {
		var valores = this.state.valores;
		var nuevoValor = this.state.turno === JUGADORX ? 'X' : '0';
		valores[numeroFila][numeroColumna] = nuevoValor;
		this.setState({
			turno: this.state.turno === JUGADORX ? JUGADOR0 : JUGADORX,
			valores: this.state.valores
		});
		var z = compruebaGanador(this.state.valores);
		if (z === true) {
			this.setState({
				turno: JUGADORX,
				valores: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]
			});
		}
	},
	render: function render() {
		var texto;
		texto = "Turno del " + this.state.turno;
		return React.createElement(
			'div',
			null,
			React.createElement(Cabecera, { texto: texto }),
			React.createElement(Tablero, { valores: this.state.valores,
				manejadorTableroClick: this.appClick })
		);
	}
});

module.exports = App;

},{"./Cabecera.jsx":2,"./Tablero.jsx":4}],2:[function(require,module,exports){
"use strict";

var Cabecera = React.createClass({
	displayName: "Cabecera",

	render: function render() {
		return React.createElement(
			"header",
			{ className: "cabecera" },
			this.props.texto
		);
	}
});

module.exports = Cabecera;

},{}],3:[function(require,module,exports){
'use strict';

var casillaStyle = {
	height: '100px',
	width: '100px'
};

var Casilla = React.createClass({
	displayName: 'Casilla',

	casillaClick: function casillaClick() {
		if (this.props.valor === "-") {
			this.props.manejadorClick(this.props.indiceFila, this.props.indiceColumna);
		}
	},
	render: function render() {
		return React.createElement(
			'button',
			{ style: casillaStyle, className: this.props.valor === "-" ? "clickable" : "no_clickable", onClick: this.casillaClick },
			this.props.valor
		);
	}
});

module.exports = Casilla;

},{}],4:[function(require,module,exports){
"use strict";

var Casilla = require("./Casilla.jsx");

var Tablero = React.createClass({
	displayName: "Tablero",

	tableroClick: function tableroClick(numeroFila, numeroColumna) {
		this.props.manejadorTableroClick(numeroFila, numeroColumna);
	},
	render: function render() {
		var casillas = this.props.valores.map((function (valoresFila, indiceFila) {
			var fila = valoresFila.map((function (valor, indiceColumna) {
				var mykey = "" + indiceFila + indiceColumna;
				return React.createElement(Casilla, { valor: valor, indiceFila: indiceFila,
					indiceColumna: indiceColumna, key: mykey, manejadorClick: this.tableroClick });
			}).bind(this));
			return React.createElement(
				"div",
				{ key: "fila" + indiceFila },
				fila
			);
		}).bind(this));
		return React.createElement(
			"div",
			null,
			casillas
		);
	}
});

module.exports = Tablero;

},{"./Casilla.jsx":3}],5:[function(require,module,exports){
"use strict";

var App = require("./App.jsx");

ReactDOM.render(React.createElement(App, null), document.getElementById('contenedor'));

},{"./App.jsx":1}]},{},[5]);
