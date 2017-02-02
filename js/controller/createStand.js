module.exports = {
    name: 'CreateStandController',
    func: function ($scope, CreateStandService) {
    $scope.name = '';
    $scope.startGame = function () {
        CreateStandService.newStand($scope.name);
        console.log(`createStand controller hard at work ${$scope.name}`);
        }
    }
};
