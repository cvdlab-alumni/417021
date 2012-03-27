var d1 = DOMAIN([[0,5]])(3);
var d2 = DOMAIN([[0,5],[7,9]])([3,4]);
var d3 = DOMAIN([[0,5],[7,9],[3,4]])([3,4,5]);

//disegnare la bisettrice del primo quadrante, quindi x = y
var domain = DOMAIN([[0,10]])([10])
var bisettrice = function(p){; //itera su tutti i punti del dominio
  var u = p[0]; //variabile x
  return [u,u];	
};
var mapped = MAP(bisettrice)(domain);

var domain2 = DOMAIN([[0,20*PI]])([36])
//disegnare una sinusoide
var sinusoide = function (p){
	var u = p[0];
	return [u,SIN(u)];
}
var mapped = MAP(sinusoide)(domain2);

//disegnare una circonferenza
var drawCircle = function(r, n){ //r raggio e n divisioni 
	var domain = DOMAIN([[0,2*PI]])([n]);
	var circle = function(p){
		var u = p[0];
		return [r*COS(u),r*SIN(u)];
	}
	var mappedCircle = MAP(circle)(domain);
	DRAW(mappedCircle);
}

// var drawCylinder(r,h,n,m,color){
// 
// }