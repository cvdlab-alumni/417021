var drawTube = function(r,n,color){
	var domain = DOMAIN([[0,PI],[0,2*PI]])([n,n]);
	var mapEllissoide = function(p){
		var u = p[0];
		var v = p[1];
		var x = (r * COS(u) + 3) * COS (v);
		var y = (r * COS(u) + 3) * SIN (v);
		var z = r * SIN(u);
		return [x,y,z];
	}
	var ellissoide = MAP(mapEllissoide)(domain);
	DRAW(ellissoide);
	COLOR(color)(ellissoide);
}
