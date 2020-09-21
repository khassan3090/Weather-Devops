window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'http://cors-anywhere.herokuapp.com/'

            //const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=604d853988acb3267fdbb75ce716254c`;


            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    //set DOM elements from the API
                    temperatureDegree.textContent = data.main.temp;
                    temperatureDescription.textContent = data.weather[0].description;
                    locationTimezone.textContent = data.timezone;
                    const icon = data.weather[0].description.replace('sky', 'day');
                    console.log(icon);
                    setIcons(icon, document.querySelector('.icon'));
                });
        });

    }

    //else {
    //  h1.textContent = "Reasons"
    //}
    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/\s/g, '_').toUpperCase();
        //currentIcon = icon.replace('sky', 'day').toUpperCase();
        console.log(currentIcon);
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});