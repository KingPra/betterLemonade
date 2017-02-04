module.exports = {
    name: 'HighScoresService',
    func: function ($http) {
        let scores = [];
        $http.get('https://blooming-hamlet-70507.herokuapp.com/stand/top')
            .then(function (response) {
                angular.copy(response.data, scores);
            });
        return {
            getScores: function (something) {
                return scores;
            },
        }
    }

};