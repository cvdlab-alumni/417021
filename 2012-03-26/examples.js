var d1 = DOMAIN([[0,5]])(3);
var d2 = DOMAIN([[0,5],[7,9]])([3, 4]);
var d3 = DOMAIN([[0,5],[7,9],[3,4]])([3, 4, 5]);

//disegnare la bisettrice del primo quadrante, quindi x = y
var domain = DOMAIN([[0,10]])([10])
var bisettrice = function(p) {; //itera su tutti i punti del dominio
	var u = p[0];
	//variabile x
	return [u, u];
};
var mapped = MAP(bisettrice)(domain);

var domain2 = DOMAIN([[0,20*PI]])([36])
//disegnare una sinusoide
var sinusoide = function(p) {
	var u = p[0];
	return [u, SIN(u)];
}
var mapped = MAP(sinusoide)(domain2);

//disegnare una circonferenza
var drawCircle = function(r, n) {//r raggio e n divisioni
	var domain = DOMAIN([[0,2*PI]])([n]);
	var circle = function(p) {
		var u = p[0];
		return [r * COS(u), r * SIN(u)];
	}
	var mappedCircle = MAP(circle)(domain);
	DRAW(mappedCircle);
}
var drawCylinder = function(r, h, n, m, color) {
	var domain = DOMAIN([[0,2*PI],[0,h]])([n, m]);
	var mapCylinder = function(p) {
		var u = p[0];
		//0-2pi
		var v = p[1];
		//0-h
		return [r * COS(u), r * SIN(u), v];
	};
	var cylinder = MAP(mapCylinder)(domain);
	DRAW(cylinder);
	COLOR(color)(cylinder);
}

var drawSphere = function(r,n,color){
	var domain = DOMAIN([[0,2*PI],[0,2*PI]])([n,n]);
	var mapSphere = function(p){
		var u = p[0];
		var v = p[1];
		var x = r * COS(u) * COS (v);
		var y = r * COS(u) * SIN (v);
		var z = r * SIN(u);
		return [x,y,z];
	}
	var sphere = MAP(mapSphere)(domain);
	DRAW(sphere);
	COLOR(color)(sphere);
}
