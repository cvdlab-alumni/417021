/**
 * @author Alessio De Angelis, 417021
 * 
 * Produce the model of a single wing in a local coordinate system.
 */

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
DRAW(COLOR([1,1,0,1])(surf));


var surf0 = MAP(BEZIER(S1)(section))(domain2);
DRAW(COLOR([1,1,0,1])(surf0));

return STRUCT([surf,surf0]);
}();
