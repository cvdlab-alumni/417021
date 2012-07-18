var color_bone = [242 / 255, 234 / 255, 182 / 255, 1];
var aux_curves = [];
var domain1 = INTERVALS(1)(100);
var domain2 = DOMAIN([[0,1],[0,1]])([75, 75]);

var parseJson4PlasmPoints = function(jsonPoints, number_of_slices) {

	//var height = zValue || 0; //for problems with the z given from the json
	var num_slices = number_of_slices || 1000;

	var allPlasmPoints = [];

	for(var pl_num = 0; pl_num < 3; pl_num++)
		for(var k = 0; k < jsonPoints.plugins[pl_num].sets.valArray.length; k++) {//plugin[0] for points from Polyline plugin
			var allJsonPoints = jsonPoints.plugins[pl_num].sets.valArray[k];
			if(allJsonPoints != null)
				for(var i = 0; i < allJsonPoints.length; i++) {
					var points = allJsonPoints[i];

					//if(points != null || typeof (points) === "object") {
					if(points.length > 0) {
						var xx;
						var yy;
						var zz;
						var scalingFactor = 100;
						//to scale points' values
						var plasmPoints = [];

						//control points for plasm
						for(var j = 0; j < points.length; j++) {
							xx = points[j].x;
							yy = points[j].y;
							zz = points[j].z;
							plasmPoints[j] = [xx / scalingFactor, yy / scalingFactor, (zz) / 15];

						}
						if(points.length > 0)
							plasmPoints.push([(points[0].x) / scalingFactor, (points[0].y) / scalingFactor, (points[0].z) / 15]);
						//for closing the curve
						allPlasmPoints.push(plasmPoints);
						if(num_slices <= zz)//if you don't want to parse all the points
							return allPlasmPoints;
					}
				}
		}

	return allPlasmPoints;
}
/*Models a Nubs, given its control points*/
var N = function(controlPoints, degree) {

	/*Computes the knots array*/
	var k = degree || 2;
	var m = controlPoints.length;
	var n = (m + k + 1);
	var lastValue = n - 3;
	var knots = [];
	var knotValue = 0;

	for(var i = 0; i < (k + 1); i++)
		knots.push(knotValue);

	knotValue++;

	for(var i = (k + 1); i < lastValue; i++) {
		knots.push(knotValue);
		knotValue++;
	};

	for(var i = lastValue; i < n; i++)
		knots[i] = knotValue;

	return NUBS(S0)(k)(knots)(controlPoints);
};

var points2Nubs = function(plasmPoints) {

	var allNubs = [];
	for(var i = 0; i < plasmPoints.length; i++) {
		if(plasmPoints[i].length > 0 || plasmPoints[i] != null) {

			var nubs = N(plasmPoints[i]);
			allNubs.push(nubs);
		}
	}
	return allNubs;
};

function removeByIndex(arrayName, arrayIndex) {
	arrayName.splice(arrayIndex, 1);
}

var points2NubsPerFemore = function(plasmPoints) {
	var allNubs = [];
	for(var i = 0; i < plasmPoints.length - 1; i++) {
		if(plasmPoints[i].length > 0 || plasmPoints[i] != null) {

			var nubs = N(plasmPoints[i]);
			allNubs.push(nubs);
		}

	}
	//some edits in order to correct some drawing mistakes
	removeByIndex(allNubs, plasmPoints.length - 5);

	var lastCurve = plasmPoints[i - 1].map(function(p) {
		return [p[0], p[1], p[2] + 0.05]
	});

	allNubs.push(N(lastCurve));

	lastCurve = plasmPoints[i].map(function(p) {
		return [p[0] - 0.3, p[1] - 0.3, p[2] - 0.25];
	});

	allNubs.push(N(lastCurve));

	//removeByIndex(allNubs,plasmPoints.length-1);

	return allNubs;
};

/*Models a Nubs, given its control points*/
var NubsSup = function(controlPoints, degree) {

	/*Computes the knots array*/
	var k = degree || 2;
	var m = controlPoints.length;
	var n = (m + k + 1);
	var lastValue = n - 3;
	var knots = [];
	var knotValue = 0;

	for(var i = 0; i < (k + 1); i++)
		knots.push(knotValue);

	knotValue++;

	for(var i = (k + 1); i < lastValue; i++) {
		knots.push(knotValue);
		knotValue++;
	};

	for(var i = lastValue; i < n; i++)
		knots[i] = knotValue;

	return NUBS(S1)(k)(knots)(controlPoints);
};

var createModelLowFemur = function(jPoints, number_of_slices) {
	//var plasmPoints = parseJson4PlasmPoints(jPoints, number_of_slices);

	var p2Nubs = points2NubsPerFemore(jPoints);

	var s12 = NubsSup(p2Nubs);
	var surf = MAP(s12)(domain2);

	return surf;
};
var points2NubsPerFemore = function(plasmPoints) {

	var allNubs = [];
	for(var i = 0; i < plasmPoints.length - 1; i++) {
		if(plasmPoints[i].length > 0 || plasmPoints[i] != null) {
			var nubs = N(plasmPoints[i]);
			allNubs.push(nubs);
		}

	}

	//some edits in order to correct some drawing mistakes

	removeByIndex(allNubs, 1);

	var lastCurve = plasmPoints[i - 1].map(function(p) {
		return [p[0], p[1], p[2] + 0.05]
	});

	allNubs.push(N(lastCurve));

	lastCurve = plasmPoints[i].map(function(p) {
		return [p[0] - 0.3, p[1] - 0.3, p[2] - 0.25];
	});

	allNubs.push(N(lastCurve));

	//removeByIndex(allNubs,plasmPoints.length - 3);

	return allNubs;
};

var createModel = function(jPoints, typeOfCurve) {
	//var plasmPoints = parseJson4PlasmPoints(jPoints, number_of_slices);

	var p2Nubs = points2Nubs(jPoints);

	var s12 = typeOfCurve(p2Nubs);
	//var s12 = NubsSup(p2Nubs);
	var surf = MAP(s12)(domain2);

	for(var i = 0; i < p2Nubs.length; i++) {
		var aux = p2Nubs[i];

		//DRAW(MAP(aux)(domain1));
	}

	return surf;
};


var translatePoints = function(points, delta) {

	var ret = [];
	if(points != undefined)
		for(var i = 0; i < points.length; i++) {
			var p = points[i];
			if(p != undefined || p != null)
				ret.push([p[0] + delta[0], p[1] + delta[1], p[2] + delta[2]]);
		}
	return ret;

}
var translateArrayPoints = function(points, delta) {
	// return points.map(function(p) {
	// if(p.length > 0)
	// return [p[0] + delta[0], p[1] + delta[1], p[2] + delta[2]];
	// });
	var retArray = [];
	var retPoint = [];
	if(points != undefined)
		for(var j = 0; j < points.length; j++) {
			retPoint = [];
			if(points[j] != undefined)
				for(var i = 0; i < points[j].length; i++) {
					var p = points[j][i];
					if(p != undefined || p != null)
						retPoint.push([p[0] + delta[0], p[1] + delta[1], p[2] + delta[2]]);
				}
			retArray.push(retPoint);
		}
	return retArray;

}
var drawModel = function() {
	var structArray = [];
	var bones = [];
	var points0 = parseJson4PlasmPoints(jsonPoints);
	//femore basso
	var points1 = parseJson4PlasmPoints(femore_alto_json, 22);
	var points2 = parseJson4PlasmPoints(femore_alto_piccolo, 22);
	var points_knee = parseJson4PlasmPoints(knee_json);
	var points_tibia = parseJson4PlasmPoints(tibia_json);
	var points_perone = parseJson4PlasmPoints(perone_json);
	var bottom_skin_points = parseJson4PlasmPoints(bottom_skin);

	var femur = [];
	femur.push((createModelLowFemur(points0)));
	// LOW PART
	//femur.push((createModel(translateArrayPoints(points0,[0,0,-5]).concat(points1),NubsSup)));// LOW PART
	femur.push(T([0,1,2])([0,0,-1.5])(createModel(points1, BEZIER(S1))));
	
	femur.push(T([0,1,2])([0,0,-1.5])(createModel(points2, BEZIER(S1))));
	bones.push(T([0,1,2])([0,0,-1.5])(createModel(points_knee, BEZIER(S1))));
	bones.push(T([0,1,2])([0,0,-1.5])(createModel(points_tibia, NubsSup)));
	bones.push(T([0,1,2])([0,0,-1.5])(createModel(points_perone, NubsSup)));


	var tmp = points2Nubs(points0);

	var tmpCurve0 = tmp[0];
	//tmp = points2Nubs(translatePoints(points1, [1, 2, -2]));
	tmp = N(translatePoints(points1[points1.length - 2], [0, 0, -1.5]));

	var tmpCurve1 = tmp;

	var tmpCurve2 = N(translatePoints(points2[points2.length - 1], [0, 0, -1.5]));

	femur.push(MAP(BEZIER(S1)([tmpCurve0,tmpCurve1,tmpCurve2]))(domain2));

	var femur_translated = femur;
	structArray.push((T([0,1,2])([0,0,5.5])(COLOR(color_bone)(STRUCT(bones)))));
	structArray.push((COLOR(color_bone)(STRUCT(femur_translated))));

	//structArray.push(COLOR([1,0,0,0.3])(T([0,1,2])([0,0,-1.5])(createModel(bottom_skin_points, BEZIER(S1)))));

	var surfStruct = STRUCT(structArray);

	var surfRotated = S([2])([-1])(surfStruct);
	var surfTrans = T([0,1,2])([-3,-3,10])(surfRotated);

	surfStruct = surfTrans;
	
	DRAW(surfStruct);
	DRAW(T([0])([8])(S([0])([-1])(surfStruct))); //draw the mirrored leg
}();

