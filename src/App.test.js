function distance(lat1, lon1, lat2, lon2, unit = "K") {
	if (lat1 == lat2 && lon1 == lon2) {
		return 0;
	} else {
		var radlat1 = (Math.PI * lat1) / 180;
		var radlat2 = (Math.PI * lat2) / 180;
		var theta = lon1 - lon2;
		var radtheta = (Math.PI * theta) / 180;
		var dist =
			Math.sin(radlat1) * Math.sin(radlat2) +
			Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = (dist * 180) / Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit == "K") {
			dist = dist * 1.609344;
		}
		if (unit == "N") {
			dist = dist * 0.8684;
		}
		return dist;
	}
}

function swap(array, index1, index2) {
	[array[index2], array[index1]] = [array[index1], array[index2]];
	return array;
}

function parseDate(date) {
	let newDate = date.split(".");
	let correctDate = swap(newDate, 0, 1);
	return new Date(correctDate);
}

function parseRow(row, timeIndex, coordinateIndex) {
	const cells = row.querySelectorAll("td");
	const date = parseDate(cells[timeIndex].querySelector("span").innerText);
	console.log(cells[coordinateIndex].querySelector("span"));
	const coordinates = cells[coordinateIndex]
		.querySelector("span")
		.innerText.replace(/\s\(\d+\)/, "")
		.split(", ");
	return {
		date,
		lat: coordinates[0],
		lng: coordinates[1]
	};
}

function removeDefectives(tableBody, timeIndex = 1, coordinateIndex = 3) {
	let rows = tableBody.querySelectorAll("tr");
	for (const row of rows) {
		let data = parseRow(row, timeIndex, coordinateIndex);
		console.log(data);
	}
}
