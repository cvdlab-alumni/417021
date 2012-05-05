/**
 * @author Alessio De Angelis, 417021
 * 
 * Model a reasonably simplified airstrip, and put there your aircraft model.
 */

var drawFuselage = function() {
	var POLYPOINT = function(points) {
		return SIMPLICIAL_COMPLEX(points)(points.map(function(p, i) {
			return [i];
		}));
	}
	var HULL = function(points) {
		return COLOR([1,0,1,1])(POLYLINE(points));
	}
	
	var domain1 = INTERVALS(1)(100);
	var domain2 = DOMAIN([[0,1],[0,1]])([50,50]);
	
	var nodes0 = [0,0,0,1,2,3,4,4,4];
	
	//var p0 = [[5.5/3,0,1],[2,0,0],[0,0,0],[1/3,0,2],[5/3,0,2],[5.5/3,0,1]];
	var p0 = [[5.5/3,1.5,1],[2,1.5,0],[0,1.5,0],[1/3,1.5,2],[5/3,1.5,2],[5.5/3,1.5,1]];
	var c0 = NUBS(S0)(2)(nodes0)(p0);
	var curve0 = MAP(c0)(domain1);
	// DRAW(curve0);
	// DRAW(HULL(p0));
	
	var p1 = [[5.5/3,7,1],[2,7,0],[0,8,0],[1/3,7,2],[5/3,7,2],[5.5/3,7,1]];
	var c1 = NUBS(S0)(2)(nodes0)(p1);
	var curve1 = MAP(c1)(domain1);
	
	var surf0 = MAP(BEZIER(S1)([c0,c1]))(domain2);
	
	
	 var p2 = [[3.7/3,0,1/2],[4/3,0,0],[2/3,0,0],[2.5/3,0,1],[3.5/3,0,1],[3.7/3,0,1/2]];
	// var p2 = p1.map(function (p) {return [p[0]*0.07, p[1]*0.07, p[2]]});
	 var c2 = NUBS(S0)(2)(nodes0)(p2);
	
	 var curve2 = MAP(c2)(domain1);
	 
	 var p3 = [[1,0,1]];
	 var c3 = BEZIER(S0)(p3);
	 

	
	var surf1 = MAP(BEZIER(S1)([c0,c2,c3]))(domain2);
	

	
		 var p4 = [[3.7/3,8.5,1/2],[4/3,8.5,0],[2/3,8.5,0],[2.5/3,8.5,1],[3.5/3,8.5,1],[3.7/3,8.5,1/2]];
	// var p2 = p1.map(function (p) {return [p[0]*0.07, p[1]*0.07, p[2]]});
	 var c4 = NUBS(S0)(2)(nodes0)(p4);
	
	 var curve4 = MAP(c4)(domain1);
	 
	 var p5 = [[1,8.5,1/5]];
	 var c5 = BEZIER(S0)(p5);
	 var surf2 = MAP(BEZIER(S1)([c1,c4,c5]))(domain2);
	 
	 surf1 = R([0,2])([PI])(surf1);
	 surf2 = R([0,2])([PI])(surf2);
	 surf0 = R([0,2])([PI])(surf0);
	 
	 surf0 = R([1,2])([PI])(surf0);
	 surf1 = R([1,2])([PI])(surf1);
	 surf2 = R([1,2])([PI])(surf2);
	 
	 	 surf0 = T([0,1,2])([1,2,0])(surf0);
	 surf1 = T([0,1,2])([1,2,0])(surf1);
	 surf2 = T([0,1,2])([1,2,0])(surf2);
	 	DRAW(COLOR([1,1,0,1])(surf0));	
	DRAW((surf1));	
	 DRAW(COLOR([1,1,0,1])(surf2));	
	 

	
}();

var drawRightWing = function (){
	
var domain1 = INTERVALS(1)(100);
var domain2 = DOMAIN([[0,1],[0,1]])([50,50]);

var nodes0 = [0,0,0,1,2,3,3,3];

var p0 = [[0,0,0],[0,2,0.3],[0,2,0.1],[0,7/5,1/10],[0,0,0]];
var c0 = NUBS(S0)(2)(nodes0)(p0);
var curve0 = MAP(c0)(domain1);
//DRAW(COLOR([0,0,1,1])(curve0));

var p1 = [[1,0,0],[1,2,0.3],[1,2,0.1],[1,7/5,1/10],[1,0,0]];
var c1 = NUBS(S0)(2)(nodes0)(p1);
var curve1 = MAP(c1)(domain1);
//DRAW(COLOR([0,0,1,1])(curve1));

var p2 = [[2,1/20,0],[2,2-0.15,0.3],[2,2-0.15,0.1],[2,7/5,1/10],[2,1/20,0]];
var c2 = NUBS(S0)(2)(nodes0)(p2);
var curve2 = MAP(c2)(domain1);
//DRAW(COLOR([0,0,1,1])(curve2));

var p3 = [[3,4/20,0],[3,2-0.25,0.3],[3,2-0.25,0.1],[3,7/5,1/10],[3,4/20,0]];
var c3 = NUBS(S0)(2)(nodes0)(p3);
var curve3 = MAP(c3)(domain1);
//DRAW(COLOR([0,0,1,1])(curve3));

var p4 = [[4,6/20,0],[4,2-0.35,0.3],[4,2-0.35,0.1],[4,7/5,1/10],[4,6/20,0]];
var c4 = NUBS(S0)(2)(nodes0)(p4);
var curve4 = MAP(c4)(domain1);
//DRAW(COLOR([0,0,1,1])(curve4));

var p5 = [[5,8/20,0],[5,2-0.45,0.3],[5,2-0.45,0.1],[5,7/5,1/10],[5,8/20,0]];
var c5 = NUBS(S0)(2)(nodes0)(p5);
var curve5 = MAP(c5)(domain1);
//DRAW(COLOR([0,0,1,1])(curve5));

//the winglet
var p6 = [[5.1,1,0],[5.1,1.2,0]];
var c6 = BEZIER(S0)(p6);
var curve6 = MAP(c6)(domain1);
//DRAW(COLOR([0,0,1,1])(curve6));

var section = [c0,c1,c2,c3,c4,c5,c6];

var wing = BEZIER(S1)(section);
var surf = MAP(wing)(domain2);

var rightWing = surf;
	var leftWing = S([0])([-1])(surf);

var rightWing = T([0,1,2])([0.5,-2,1])(rightWing);
var leftWing = T([0,1,2])([-0.5,-2,1])(leftWing);

DRAW(COLOR([1,1,0,1])(rightWing));
DRAW(COLOR([1,1,0,1])(leftWing));
var wings = STRUCT([surf,leftWing]);
}();

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


var leftSurf = MAP(BEZIER(S1)([c5,c6,c7,c8,c0]))(domain2);
leftSurf = COLOR([1,1,0,1])(leftSurf);


var rightSurf = MAP(BEZIER(S1)([c4,c9,c10]))(domain2);
rightSurf = COLOR([1,1,0,1])(rightSurf);


	 leftSurf = T([0,1,2])([0,-6,0])(leftSurf);
	 middleSurf = T([0,1,2])([0,-6,0])(middleSurf);
	 rightSurf = T([0,1,2])([0,-6,0])(rightSurf);
	 curves = T([0,1,2])([0,-6,0])(curves);
	 
	 DRAW(middleSurf);
	 DRAW(leftSurf);
	 DRAW(rightSurf);
	 DRAW(curves);
	 
	 	 leftSurf1 = R([0,2])([PI/2])(leftSurf);
	 middleSurf1 = R([0,2])([PI/2])(middleSurf);
	 rightSurf1 = R([0,2])([PI/2])(rightSurf);

	 	 leftSurf1 = T([0,1,2])([0,-0.5,0])(leftSurf1);
	 middleSurf1 = T([0,1,2])([0,-0.5,0])(middleSurf1);
	 rightSurf1 = T([0,1,2])([0,-0.5,0])(rightSurf1);
	 
	 	 DRAW(middleSurf1);
	 DRAW(leftSurf1);
	 DRAW(rightSurf1);

	 
	 //var st = STRUCT([leftSurf,middleSurf,rightSurf,curves]);
	 DRAW(COLOR([1,1,0,1])(S([0])([-1])(middleSurf)));
	 DRAW(COLOR([1,1,0,1])(S([0])([-1])(leftSurf)));
	 DRAW(COLOR([1,1,0,1])(S([0])([-1])(rightSurf)));
	 DRAW(S([0])([-1])(curves));
	 


return [leftSurf,middleSurf,rightSurf,curves];
}();

var drawAirstrip = function(){
//	var c = CUBOID([15,30,2]);
var fl1 = T([0,1,2])([0,0,0])(SIMPLEX_GRID([[40],[100],[1]]));
fl1 = COLOR([0,0,0,1])(fl1);

var fl2 = (SIMPLEX_GRID([[-5,5],[100],[-1,0.1]]));
var fl3 = (SIMPLEX_GRID([[-30,5],[100],[-1,0.1]]));
fl2 = COLOR([1,1,1,1])(fl2);
fl3 = COLOR([1,1,1,1])(fl3);

var fl4 = T([0,1,2])([17,5,1])(SIMPLEX_GRID([[5],(REPLICA(7)([-5,7])),[0.1]]));

var s = T([0,1,2])([-15,-15,-10])(STRUCT([fl1,fl2,fl3,fl4]));
s = R([1,2])([Math.PI])(s);
	DRAW(s);
}();