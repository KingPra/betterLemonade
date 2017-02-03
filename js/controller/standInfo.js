module.exports = {
    name: 'StandInfoController',
    func: function ($scope, CreateStandService, SuppliesService, WeatherService) {
    let stand = CreateStandService.getId();
    $scope.stats = SuppliesService.showStats();
    $scope.sun = WeatherService.getWeather();
    let temp = $scope.sun;
    console.log(`stand info controller should print stat array:`);
    console.log(temp);
    console.log($scope.stats);
    SuppliesService.newId(stand);
    console.log('info controller kicked in');
    console.log(stand);
    }

};