/**
 * @author Alessio
 */

//git clone ...
//git submodule init
//git submodule init update

var pillars = SIMPLEX_GRID([
	REPLICA(3)([0.15,-6*2.4,0.15]),//x
	[0.15,-6*2.4,0.15],//y
	[1.5,3,3]	//z
]);

//DRAW(pillars);

//TRAVONI
var beams = SIMPLEX_GRID([
	REPLICA(3)([0.15,-6*2.4,0.15]),
	[0.15 + 6*2.4 + 0.15], //14.7
	[-7.5,1.5]	
]);

var building = STRUCT([pillars,beams]);
DRAW(building);
