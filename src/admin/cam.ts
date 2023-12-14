const controlsIds = {
	F5: 327,
	W: 32,
	S: 33,
	A: 34,
	D: 35,
	Space: 321,
	LCtrl: 326
};

const fly = {
	flying: false,
	f: 2.0,
	w: 2.0,
	h: 2.0,
	point_distance: 1000
};
const gameplayCam = mp.cameras.gameplay;


let direction = null;
let coords = null;

function pointingAt(distance) {
	const farAway = new mp.Vector3(
		direction.x * distance + coords.x,
		direction.y * distance + coords.y,
		direction.z * distance + coords.z
	);

	const result = mp.raycasting.testPointToPoint(coords, farAway,);
	if (result === undefined) {
		return 'undefined';
	}
	return result;
}

mp.events.add('render', () => {
	const { controls } = mp.game;

	direction = gameplayCam.getDirection();
	coords = gameplayCam.getCoord();

	
});

mp.events.subscribe({
	getCamCoords: () => {
		const data = {
			position: coords,
			point: pointingAt(fly.point_distance)
		};

		return data;
	}
});

export {};
