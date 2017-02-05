module.exports = {
    name: 'StandInfoController',
    func: function ($scope, CreateStandService, SuppliesService, WeatherService, $interval, BuyService) {

    $scope.sun = WeatherService.getWeather();
    let temp = $scope.sun;

    let standIdNumber = CreateStandService.getId();
    SuppliesService.newId(standIdNumber);
    console.log(`calling buy service ${standIdNumber}`)
    BuyService.sendId(standIdNumber);

    $scope.id = SuppliesService.newId(standIdNumber);

    $scope.stats = SuppliesService.showStats();
    $scope.newStats = SuppliesService.updateStats();
    $interval( function () {
        console.log('autoupdate:')
        console.log($scope.newStats);
        console.log(SuppliesService.updateStats());
        console.log('end autoupdate');
        SuppliesService.updateStats()}, 15000);;

    $scope.buyStuff = function (name, num) {
        console.log(name, num);
        BuyService.buyMoreStuff(name, num);
    };
    $scope.setPrice = function (cost) {
        BuyService.cupPrice(cost);
    };

    }

};