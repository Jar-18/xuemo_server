
exports.calcCrow = function(lat1, lon1, lat2, lon2) {
	var R = 6371; // km
	var dLat = _toRad(lat2 - lat1);
	var dLon = _toRad(lon2 - lon1);
	var lat1 = _toRad(lat1);
	var lat2 = _toRad(lat2);
	var a = Math.sin(dLat / 2.0) * Math.sin(dLat / 2.0) +
		Math.sin(dLon / 2.0) * Math.sin(dLon / 2.0) * Math.cos(lat1) * Math.cos(lat2);
	var c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
	var d = R * c;
	return d;
}

// Converts numeric degrees to radians
_toRad = function(Value) {
	return Value * Math.PI / 180;
}