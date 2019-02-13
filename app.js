window.addEventListener('load', () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector(
		'.temperature-description'
	);
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			console.log(position);
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/2a9532d933f57b7d249193b1080fbe74/${lat},${long}`;

			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);
					const { temperature, summary } = data.currently;
					// set DOM ELements from the API
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
				});
		});
	} else {
		h1.textContent = 'Allow geolocator or the app will not work!';
	}
});
