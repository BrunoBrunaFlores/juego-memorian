var estadoImg = {};
estadoImg[0] = [false, false, false, false];
estadoImg[1] = [false, false, false, false];
estadoImg[2] = [false, false, false, false];
estadoImg[3] = [false, false, false, false];
var lugarImg = {};
lugarImg[0] = [0, 0, 0, 0];
lugarImg[1] = [0, 0, 0, 0];
lugarImg[2] = [0, 0, 0, 0];
lugarImg[3] = [0, 0, 0, 0];
var valorClick = {};
valorClick[1] = [0, 0, 0];
valorClick[2] = [0, 0, 0];

var juego = false;
var contador = 0;
var aciertos = 0;
var puntaje = 0;

var numClicks = 0;
var puntajeFinal = 0;
var player;

var primerLugar = [" ",0];
var segundoLugar = [" ",0];
var tercerLugar = [" ",0];

//tiempo
var hora = setTimeout("calcularHora()", 500);
function calcularHora() {
	var dia = new Date();
	var hora = dia.getHours();
	var minuto = dia.getMinutes();
	var segundos = dia.getSeconds();
	document.getElementById("reloj").innerHTML ="Hora: " + hora + ":" + minuto + ":" + segundos;
	document.getElementById("puntaje").innerHTML = "Puntaje: " + puntajeFinal;
	
	setTimeout("calcularHora()", 500);

	document.getElementById("primerlugar").innerHTML = "1er. " + primerLugar[0] + " puntos: " + primerLugar[1];
	document.getElementById("segundolugar").innerHTML = "2do. " + segundoLugar[0] + " puntos: " + segundoLugar[1];
	document.getElementById("tercerlugar").innerHTML = "3ro. " + tercerLugar[0] + " puntos: " + tercerLugar[1];
}
function esconderImg() {
	var id;
	for (var i = 0; i <= 3; i++) {
		for (var j = 0; j <= 3; j++) {
			id = "img" + i + j;
			if (estadoImg[i][j] == false) {
				document.getElementById(id).src = "imagenes/nulo.jpg";
			}
		}
	}
}
function cambiarImg() {
	var aleatorioX, aleatorioY;
	var puesto = 0;
	for (var i = 0; i <= 3; i++) {
		for (var j = 0; j <= 3; j++) {
			lugarImg[i][j] = 0;
		}
	}

	for (var i = 0; i < 9; i++) { //7
		while (puesto < 2) {
			aleatorioX = Math.floor(Math.random() * 4);
			aleatorioY = Math.floor(Math.random() * 4);
			if (lugarImg[aleatorioX][aleatorioY] == 0) {
				lugarImg[aleatorioX][aleatorioY] = i;
				puesto++;
			}
		}
		puesto = 0;
	}
}
function iniciarJuego() {

	for (var i = 0; i <= 3; i++) {
		for (var j = 0; j <= 3; j++) {
			estadoImg[i][j] = false;
		}
	}
	cambiarImg();
	esconderImg();
	puntaje = 0;
	aciertos = 0;
	puntajeFinal = 0;
	numClicks = 0;
	juego = true;
	alert("PUEDE INICAR EL JUEGO");
}
function destaparImg(fila, columna) {

	if (juego == true) {

		numClicks = numClicks+1; //aqui se suman los clicks!

		if (contador == 2) {
			contador = 0;
			verificar();
			esconderImg();
		}
		contador++;
		var id = "img" + fila + columna;
		var lugar = lugarImg[fila][columna];
		document.getElementById(id).src = "imagenes/img" + lugar + ".jpg";
		valorClick[contador][0] = lugar;
		valorClick[contador][1] = fila;
		valorClick[contador][2] = columna;
	} else {
		alert("INICIE UN NUEVO JUEGO!");
	}
}
function verificar() {
	var x, y;
	if (valorClick[1][0] == valorClick[2][0]) {
		x = valorClick[1][1];
		y = valorClick[1][2];
		estadoImg[x][y] = true;
		x = valorClick[2][1];
		y = valorClick[2][2];
		estadoImg[x][y] = true;
		aciertos++;
		puntaje = puntaje + 100 * aciertos;
		puntajeFinal = puntaje - (numClicks*10); //aqui se hace modifica el puntaje a relacion con los clicks
		if (aciertos == 8) {
				alert("JUEGO TERMINADO!");
				player = prompt("INGRESE SU NICK: ");
				//document.getElementById("records").innerHTML = "Record Actual es de " + player + " con " + puntajeFinal + " puntos";
				aciertos = 0;
				juego = false;
				verificarPuntaje();
			}
	}
}
function verificarPuntaje() {
	var temp = 0;
	var temp2;
	if (puntajeFinal >= primerLugar[1]) {
		if (puntajeFinal == primerLugar[1]) {
			temp2 = segundoLugar[0];
			temp = segundoLugar[1];
			segundoLugar[0] = player;
			segundoLugar[1] = puntajeFinal;
			tercerLugar[0] = temp2;
			tercerLugar[1]= temp;
			return;
		}
		temp2 = segundoLugar[0]; 
		temp = segundoLugar[1],
		segundoLugar[0] = primerLugar[0];
		segundoLugar[1] = primerLugar[1];
		tercerLugar[0] = temp2;
		tercerLugar[1] = temp;
		primerLugar[0] = player;
		primerLugar[1] = puntajeFinal;
		return;
	}
	if (puntajeFinal >= segundoLugar[1]) {
		if(puntajeFinal == segundoLugar[1]) {
			tercerLugar[0] = player;
			tercerLugar[1] = puntajeFinal;
			return;
		}
		tercerLugar[0] = segundoLugar[0];
		tercerLugar[1] = segundoLugar[1];
		segundoLugar[0] = player;
		segundoLugar[1] = puntajeFinal;
		return;
	}
	if (puntajeFinal >= tercerLugar) {
		tercerLugar[0] = player;
		tercerLugar[1] = puntajeFinal;
		return;
	}
	
}