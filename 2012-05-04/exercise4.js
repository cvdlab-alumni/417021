/**
 * @author Alessio De Angelis, 417021
 * 
 * Assemble the various assemblies and/or subassemblies into a single model.
 */
// elica
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
	
	var nodes0 = [0,0,0,1,2,2,2];
	
	var p0 = [[-2.2,0,-1],[0,0,4],[1.5,0,-4],[-2,0,-3],[-2.2,0,-1]];
	var p0 = [[1,0,1],[3,0,1],[3,,0,3],[1,0,1]];
	var c0 = NUBS(S0)(2)(nodes0)(p0);
	//var c0 = BEZIER(S0)(p0);
	var curve0 = MAP(c0)(domain1);
	DRAW(curve0);
	DRAW(HULL(p0));