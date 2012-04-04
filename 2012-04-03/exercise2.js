/**
 * @author Alessio De Angelis, 417021
 */
/*
Reproduce a 3D model of the Barcellona Pavilion
using only the plasm.js primitives SIMPLEX_GRID and STRUCT.

Affine transformations T, S or R are also allowed.
 * **/

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
	var hPiede = 0.4;
	var hFloor = 1.5;
	var hBase = 0.3;
	var base = T([0])([7])(SIMPLEX_GRID([REPLICA(7)([2.2,-0.03]),[-14,0.8],[-hFloor-hPiede,hBase]]));
	//var piedi = T([0])([7.2])(SIMPLEX_GRID([REPLICA(7)([-0.2,0.3,-1.2,0.4,-0.3]),[-14,0.8],[-hFloor,hPiede]]));
	var piedi = T([0])([7.2])(SIMPLEX_GRID([REPLICA(7)([0.3,-1.83]),[-14,0.8],[-hFloor,hPiede]]));
	var lastPiede = SIMPLEX_GRID([[-22.2,0.3],[-14,0.8],[-hFloor,hPiede]]);
	var benches = STRUCT([piedi,base,lastPiede]);
	return benches;
}

var wallHeight = 5.5;//4m + pavimento

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
 	var wall9 = SIMPLEX_GRID([[-30,10],[-13.6,0.2],[wallHeight]]);
 	var wall10 = SIMPLEX_GRID([[-36.8,5],[-11.5,0.2],[wallHeight]]);
 	var wall11 = SIMPLEX_GRID([[-44.6,0.2],[-7,7],[wallHeight]]);
 	
 	return STRUCT([wall1,wall2,wall3,wall4,wall6,wall5,wall7,wall8,wall9,wall10,wall11]);
}

var generateColoumns = function(){
	var coloumnModel=SIMPLEX_GRID([[0.15],[0.15],[-1.5,4]]);//da traslare a seconda delle necessità
		
	var coloumn1=T([0,1])([44.9,7])(coloumnModel);
	var coloumn2=T([0,1])([31,14])(coloumnModel);
	var coloumn3=T([0,1])([44.9,14])(coloumnModel);
	var coloumn4=T([0,1])([38.5,14])(coloumnModel);
	var coloumn5=T([0,1])([26.1,14])(coloumnModel);
	var coloumn6=T([0,1])([38.5,7])(coloumnModel);
	var coloumn7=T([0,1])([31,7])(coloumnModel);
	var coloumn8=T([0,1])([38.45,7])(coloumnModel);
	var coloumn9=T([0,1])([25.7,7])(coloumnModel);
	
	return STRUCT([coloumn1,coloumn2,
		coloumn3,coloumn4,coloumn5,coloumn6,coloumn7,coloumn8,coloumn9]);
}

var generateRoofs = function(){
	var leftRoof = SIMPLEX_GRID([[10],[-13,10],[-wallHeight-0.3,0.15]]);
	var rightRoof = SIMPLEX_GRID([[-24,23],[-4,13],[-wallHeight-0.3,0.15]]);
	
	return STRUCT([leftRoof,rightRoof]);
}


var generateSottoTetti = function(){
	var rightSottoTetto = SIMPLEX_GRID([[-24.2,22.6],[-4.2,12.6],[-wallHeight,0.3]]);
	var leftSottoTetto = SIMPLEX_GRID([[-0.2,9.6],[-13.2,9.6],[-wallHeight,0.3]]);
	return STRUCT([leftSottoTetto,rightSottoTetto]);
}

var generateGlasses = function(){
	var glass1 = SIMPLEX_GRID([[-30,11.2],[-5,0.2],[-1.5,4]]); 
	var glass2 = SIMPLEX_GRID([[-1,8],[-17,0.2],[-1.5,4]]); 
	var glass3 = SIMPLEX_GRID([[-31,0.2],[-7.6,7],[-1.5,4]]); 
	return STRUCT([glass1,glass2,glass3]);
}




DRAW(generate3DFloor());
DRAW(generateStairs());
DRAW(generateBenches());
DRAW(generatePools());
DRAW(generateColoumns());
DRAW(generateWalls());
DRAW(generateRoofs());
DRAW(generateSottoTetti());
DRAW(generateGlasses());

