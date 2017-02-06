module.exports = {
    name: 'WeatherService',
    func: function ($http) {
        let weather = [];
        $http.get(`https://blooming-hamlet-70507.herokuapp.com/weather/forecast`)
            .then(function (response) {
                angular.copy(response.data, weather);
            });
        return {
            getWeather: function () {
                return weather;
            },
        }
    },
};