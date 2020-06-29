var APIKey = "d7956632ba51a4633dd73de2b454c31e";

$("#search-button").on("click", function (e) {
	e.preventDefault();

	var name = $("#search-input").val();

	var queryURL =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		name +
		"&appid=" +
		APIKey;

	$.ajax({
		url: queryURL,
		method: "GET",
	})
		.then(function (response) {


			$("#city").text("Weather Details about " + response.name);

			var tempF = (response.main.temp - 273.15) * 1.8 + 32;

			$("#temp-display").text("Temperature: " + tempF.toFixed(1) + "°F");
			$("#wind-display").text("Wind Speed: " + response.wind.speed + "MPH");
			$("#hum-display").text("Humidity: " + response.main.humidity + "%");

			var lon = response.coord.lon;
			var lat = response.coord.lat;
			var uvIndex =
				"https://api.openweathermap.org/data/2.5/uvi?appid=" +
				APIKey +
				"&lat=" +
				lat +
				"&lon=" +
				lon;

			$.ajax({
				url: uvIndex,
				method: "GET",
			}).then(function (result) {
				$("#uv-display").text("UV Index: " + result.value);
			});

			var queryURL =
				"https://api.openweathermap.org/data/2.5/forecast?q=" +
				name +
				"&appid=" +
				APIKey;
			console.log(queryURL);

			$.ajax({
				url: queryURL,
				method: "GET",
			}).then(function (response) {
				console.log(response);
				console.log("this is the length: " + response.list.length);

				for (var i = 7; i < response.list.length; i += 8) {
					$("#day" + i).addClass("five-day-weather");
					var unixTime = new Date(
						response.list[i].dt * 1000
					).toLocaleDateString("en-US");
					var date = "<strong>" + unixTime + "</strong><br/>";
					var icon = response.list[i].weather[0].icon;
					var iconURL =
						"<img src=https://openweathermap.org/img/wn/" +
						icon +
						".png>  <br>";
					kelvin = response.list[i].main.temp;
					var temp =
						"Temp: " + Math.floor((kelvin - 273.15) * 1.8 + 32) + "&deg; F<br>";
					humidity = "Humidity: " + response.list[i].main.humidity + "%";
					$("#day" + i).append(date, iconURL, temp, humidity);
				}
			});
		});
});
