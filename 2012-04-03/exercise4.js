/**
 * @author Alessio De Angelis, 417021
 */

/*
Reproduce a 3D model of one piece of furniture, at your choice,
and instance it one or more times inside the Pavillion.
 * **/


var generateBookCase = function(){
	var height = 2.8;
	var depth = 0.05
	var length = 4.3;
	var width = 0.4
	var planes = SIMPLEX_GRID([[length],[width],REPLICA(6)([depth,-0.5])]);
	var dividers = SIMPLEX_GRID([REPLICA(6)([0.05,-0.8]),[width],[height]]);
	var back = SIMPLEX_GRID([[length],[0.02],[height]]);
	return STRUCT([dividers,planes,back]);	
};

var bookCase = T([0,1,2])([2,2,2])(generateBookCase());
DRAW(COLOR([1,0.5,0.3])(bookCase));
