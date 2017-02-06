module.exports = {
  name: 'HighScoresController',
  func: function ($scope, HighScoresService) {
    $scope.scores = HighScoresService.getScores();
  },
};