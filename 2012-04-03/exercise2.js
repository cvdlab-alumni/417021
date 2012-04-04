/**
 * @author Alessio De Angelis, 417021
 */
/*
Reproduce a 3D model of the Barcellona Pavilion
using only the plasm.js primitives SIMPLEX_GRID and STRUCT.

Affine transformations T, S or R are also allowed.
 * **/

var generateSquare = function(x,y){
	var x = x || 0;
	var y = y || 0;
	return POLYLINE([[x,y],[x+1,y],[x+1,y+1],[x,y+1],[x,y]]);
}
var square = generateSquare(0,0);
//DRAW(square);


var generateSquareGrid = function(xi,xf,yi,yf){
	//xi<xf e yi<yf
	//xi,yi coordinate del punto iniziale
	//xf,yf coordinate del punto in alto a dx
	var i, j;
	var grid = [];
	for (i = xi; i < xf; i++){
		for(j = yi; j < yf; j++){
			grid.push(generateSquare(i,j));
		}
	}
	return STRUCT(grid);
}


//var grid = generateSquareGrid(0,10,0,3);
//DRAW(grid);

var generateRect = function(xi,xf,yi,yf){
	return POLYLINE([[xi,yi],[xi,yf],[xf,yf],[xf,yi],[xi,yi]]);	
}

var generateVerticalDashes = function(xi,xf,yi,yf,dx){
	var dashes = [];
	dashes.push(POLYLINE([[xi,yi],[xi,yf]]))
	for(var i = xi; xi < xf; i++){
		dashes.push(POLYLINE([[xi+dx,yi],[xi+dx,yf]]));
	}
	return STRUCT(dashes);
}

var generateVerticalDashes = function(xi,xf,yi,yf,dx){
	var dashes = [];	
	var x = xi;
	while(x < xf){
		dashes.push(POLYLINE([[x,yi],[x,yf]]));
		x+=dx;
	}
	return STRUCT(dashes);
}
var generateHorizontalDashes = function(xi,xf,yi,yf,dy){
	var dashes = [];
	var y = yi;
	while(y < yf){
		dashes.push(POLYLINE([[xi,y],[xf,y]]));
		y+=dy;
	}
	return STRUCT(dashes);
}

var generateBoldLine = function(points){
	var line = POLYLINE(points);
	return COLOR([0,0,0])(line);
}

var generateAllGrids = function(){
	var firstRow = generateSquareGrid(0,39,0,1);
	var secondRow = STRUCT([generateSquare(0,1),generateSquareGrid(21,36,1,2)]);
	var grid1 = generateSquareGrid(21,31,2,14);
	var grid2 = generateSquareGrid(31,32,2,7);
	var grid3 = generateSquareGrid(32,36,2,9);
	var grid4 = generateSquareGrid(36,47,4,16);
	var grid5 = STRUCT([generateSquareGrid(47,52,4,5),generateSquare(51,5)]);
	var grid6 = generateSquareGrid(34,36,9,12);
	var grid7 = generateSquareGrid(32,36,12,16);
	var grid8 = generateSquareGrid(1,21,10,14);
	var grid9 = STRUCT([generateSquareGrid(1,6,14,15),generateSquareGrid(22,32,14,15)]);
	var grid10 = generateSquareGrid(1,9,15,22);
	var grid11 = generateSquareGrid(9,39,15,17);
	return STRUCT([
						firstRow,secondRow,grid1,grid2,grid3,grid4,
						grid5,grid6,grid7,grid8,grid9,grid10,grid11,
						
						]);
}

var generateAllDashes = function(){
	var dashes1 = generateHorizontalDashes(32,32.2,9,12,1);
	var dashes2 = generateHorizontalDashes(33.2,34,9,12,1);	
	var dashes3 = generateVerticalDashes(7,22,14.7,15,1);
	var dashes4 = generateVerticalDashes(6.6,22,14,14.7,2.2);
	var stairs = generateVerticalDashes(36,39,1,4,0.3);
	return STRUCT([dashes1,dashes2,dashes3,dashes4,stairs]);
}

var generateAllRects = function(){
	var rect1 = generateRect(31,32,7.4,13.8);
	var rect2 = generateRect(32.2,33.2,9,12);
	var rect3 = generateRect(6.6,22,14,14.7)

	var pool1 = generateRect(1,21,1,10);
	var pool2 = generateRect(47,51,5,16);
	return STRUCT([rect1,rect2,rect3,pool1,pool2]);
}

var generateAllBoldLines = function(){
	var wall1 = generateBoldLine([[6.3,15],[26.8,15]]);
	var wall2 = generateBoldLine([[7.8,1],[1,1],[1,22],[9,22],[9,17]]);
	var wall3 = generateBoldLine([[25,7.4],[34,7.4]]);
	var wall4 = generateBoldLine([[30,13.7],[40,13.7]]);
	var wall5 = generateBoldLine([[37.2,11.6],[42.6,11.6]]);
	var wall6 = generateBoldLine([[41.2,5],[51,5],[51,16],[37.8,16]]);
	var wall7 = generateBoldLine([[44.8,7],[44.8,14]]);
	return STRUCT([wall1,wall2,wall3,wall4,wall5,wall6,wall7]);
}

var generateFloor = function(){
	var floor = STRUCT([generateAllGrids(),generateAllDashes(),
						generateAllRects(),generateAllBoldLines()						
						]);
	return floor;
}

var drawFloor = function(){
	DRAW(generateFloor());
}();


var generate3DFloor = function(){
	var fl1 = SIMPLEX_GRID([[39],[1],[1.5]]);	
	var fl2 = SIMPLEX_GRID([[-1,35],[-1,3],[1.5]]);
	var fl3 = SIMPLEX_GRID([[-21,26],[-4,12],[1.5]]);
	var fl4 = SIMPLEX_GRID([[-51,1],[-4,2],[1.5]]); 
	var fl5 = SIMPLEX_GRID([[-1,38],[-16,1],[1.5]]);
	var fl6 = SIMPLEX_GRID([[1],[2],[1.5]]); 
	var fl7 = SIMPLEX_GRID([[-1,8],[-17,5],[1.5]]); 
	var fl8 = SIMPLEX_GRID([[-1,20],[-10,7],[1.5]]);
	var fl9 = SIMPLEX_GRID([[-47,4],[-4,1],[1.5]]);
	return STRUCT([fl1,fl2,fl3,fl4,fl5,fl6,fl7,fl8,fl9]);
}

var generateStairs = function(){
	var dx = 0.3;//lunghezza scalino
	var dz = 0.15;//altezza scalino
	var xi = 36;
	var yi = 1;
	var yf = 5;
	var xf = 39;
	var z = 1.5-dz;

	var x = xi;
	var stairs = [];
	while(x < xf){
		stairs.push(SIMPLEX_GRID([[-x,dx],[-1,3],[z]]));
		x += dx;
		z -= dz;
		
	}
	return STRUCT(stairs);
}

var generatePools = function(){
	var pool1 = SIMPLEX_GRID([[-1,20],[-1,9],[1.3]]);
	var pool2 = SIMPLEX_GRID([[-47,4],[-5,11],[1.3]]);
	return STRUCT([pool1,pool2]);
}

var generateBenches = function(){
	
}

var wallHeight = 6.5;

var generateWalls = function(){
	//muri di sinistra
 	var wall1 = SIMPLEX_GRID([[-0.8,7],[-0.8,0.2],[wallHeight ]]);
 	var wall2 = SIMPLEX_GRID([[-0.8,0.2],[-0.8,21.2],[wallHeight ]]);
 	var wall3 = SIMPLEX_GRID([[-0.8,8.2],[-21.8,0.2],[wallHeight ]]);
 	var wall4 = SIMPLEX_GRID([[-9,0.2],[-17,5],[wallHeight]]);
 	
 	//muri di destra
 	var wall5 = SIMPLEX_GRID([[-41.2,10],[-4.8,0.2],[wallHeight ]]);
 	var wall6 = SIMPLEX_GRID([[-51,0.2],[-4.8,11],[wallHeight ]]);
 	var wall7 = SIMPLEX_GRID([[-37.8,13.4],[-15.8,0.2],[wallHeight ]]);
 	
 	//muri centrali
 	var wall8 = SIMPLEX_GRID([[-6.2,19],[-15,0.2],[wallHeight]]);//vicino alle panchine
 	var wall8 = SIMPLEX_GRID([[-25,9],[-7.4,0.2],[wallHeight]]);
 	
 	return STRUCT([wall1,wall2,wall3,wall4,wall6,wall7,wall8]);
}

var generateRoofs = function(){
	var roof1 = SIMPLEX_GRID([[],[],[]]);
	return STRUCT([roof1]);
}

DRAW(generate3DFloor());
DRAW(generateStairs());
DRAW(generatePools());
DRAW(generateWalls());
