/**
 * @author Alessio De Angelis, 417021
 * 
 * Produce the model of horizontal and vertical stabilizers (local coordinate system).
 */

var drawRightStabilizer = function(){
	
var POLYPOINT = function (points) {
  return SIMPLICIAL_COMPLEX(points)(points.map(function (p,i) { 
    return [i];
  }));
}

var HULL = function(points){
	return COLOR([1,0,1,1])(POLYLINE(points));
}

var domain1 = INTERVALS(1)(100);
var domain2 = DOMAIN([[0,1],[0,1]])([50,50]);

var nodes0 = [0,0,0,1,2,3,3,3];

//middle section
var p0 = [[0.4,0,0],[0.4,1,0],[0.4,1,0.1],[0.4,1/5,1/20],[0.4,0,0]];
var c0 = NUBS(S0)(2)(nodes0)(p0);
var p1 = p0.map(function (p) {return [p[0]+0.2, p[1], p[2]]});
var p2 = p0.map(function (p) {return [p[0]+0.4, p[1], p[2]]});
var p3 = p0.map(function (p) {return [p[0]+0.6, p[1], p[2]]});
var p4 = p0.map(function (p) {return [p[0]+0.8, p[1], p[2]]});

var c4 = NUBS(S0)(2)(nodes0)(p4);
var controls = AA(NUBS(S0)(2)(nodes0))([p0,p1,p2,p3,p4]);

//middle section stripes
var curves= STRUCT(CONS(AA(MAP)(controls))(domain1));
var curves = COLOR([0,0,0,1])(curves);
DRAW(curves);

//left section
var p5 = [[0,0.3,0],[0,1,0],[0,1,0.1],[0,1.5/5,1/20],[0,0.3,0]];
var c5 = NUBS(S0)(2)(nodes0)(p5);

var p6 = [[0.1,0.2,0],[0,1,0],[0,1,0.1],[0,1.5/5,1/20],[0.1,0.2,0]];
var c6 = NUBS(S0)(2)(nodes0)(p6);

var p7 = [[0.2,0.1,0],[0,1,0],[0,1,0.1],[0,1.5/5,1/20],[0.2,0.1,0]];
var c7 = NUBS(S0)(2)(nodes0)(p7);

var p8= [[0.3,0,0],[0.4,1,0],[0.4,1,0.1],[0.4,1/5,1/20],[0.3,0,0]];
var c8 = NUBS(S0)(2)(nodes0)(p8);

//right section

var p9= [[1.4,0.3,0],[1.4,0.7,0],[1.4,0.7,0.1],[1.4,1/5,1/20],[1.4,0.3,0]];
var c9 = NUBS(S0)(2)(nodes0)(p9);

var p10 = [[1.38,0.5,0]];//1.2

var c10 = BEZIER(S0)(p10);

var wing = BEZIER(S1)(controls);
var middleSurf = MAP(wing)(domain2);
middleSurf = COLOR([1,1,0,1])(middleSurf);
DRAW(middleSurf);

var leftSurf = MAP(BEZIER(S1)([c5,c6,c7,c8,c0]))(domain2);
leftSurf = COLOR([1,1,0,1])(leftSurf);
DRAW(leftSurf);

var rightSurf = MAP(BEZIER(S1)([c4,c9,c10]))(domain2);
rightSurf = COLOR([1,1,0,1])(rightSurf);
DRAW(rightSurf);

return [leftSurf,middleSurf,rightSurf,curves];
}

var drawLeftStabilizer = function (rightStab){
	var rightStab = drawRightStabilizer();
	var leftStab = AA(R([0,2])([Math.PI]))(rightStab);
	var leftStab2 = AA(R([1,2])([Math.PI*0.035]))(leftStab);
	var struct = STRUCT(leftStab2);
	DRAW(struct);
	return leftStab2;
}();

var drawVerticalStabilizer = function(){
	var rightStab = drawRightStabilizer();
	var leftStab = AA(R([0,2])([Math.PI]))(rightStab);
	var leftStab2 = AA(R([1,2])([Math.PI*0.035]))(leftStab);
	var struct = STRUCT(leftStab2);
	DRAW(struct);
	return leftStab2;
}
