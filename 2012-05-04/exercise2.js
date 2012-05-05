/**
 * @author Alessio De Angelis, 417021
 * 
 * Produce the model of the fuselage (local coordinate system).
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
	 

	//cockpit
	var surf1 = MAP(BEZIER(S1)([c0,c2,c3]))(domain2);
	

	
		 var p4 = [[3.7/3,8.5,1/2],[4/3,8.5,0],[2/3,8.5,0],[2.5/3,8.5,1],[3.5/3,8.5,1],[3.7/3,8.5,1/2]];
	// var p2 = p1.map(function (p) {return [p[0]*0.07, p[1]*0.07, p[2]]});
	 var c4 = NUBS(S0)(2)(nodes0)(p4);
	
	 var curve4 = MAP(c4)(domain1);
	 
	 var p5 = [[1,8.5,1/5]];
	 var c5 = BEZIER(S0)(p5);
	 //tail
	 var surf2 = MAP(BEZIER(S1)([c1,c4,c5]))(domain2);
	 
	 surf1 = R([0,2])([PI])(surf1);
	 surf2 = R([0,2])([PI])(surf2);
	 surf0 = R([0,2])([PI])(surf0);
	 
	 surf0 = R([1,2])([PI])(surf0);
	 surf1 = R([1,2])([PI])(surf1);
	 surf2 = R([1,2])([PI])(surf2);
	 	DRAW(COLOR([1,1,0,1])(surf0));	
	DRAW((surf1));	
	 DRAW(COLOR([1,1,0,1])(surf2));	
	 

}();