module.exports = {
    name: 'CreateStandController',
    func: function ($scope, CreateStandService) {
    $scope.name = '';
    $scope.startGame = () => {
        // passes the value of the input box as a parameter of newStand func
        CreateStandService.newStand($scope.name);
        }
    }
};
