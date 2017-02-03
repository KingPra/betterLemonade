module.exports = {
    name: 'HighScoresController',
    func: function ($scope, HighScoresService) {
      $scope.scores = HighScoresService.getScores();
      console.log($scope.scores)
      console.log('high scores controller firing off')

    }
};