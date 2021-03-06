module.exports = {
    name: 'StandInfoController',
    func: function ($scope, CreateStandService, SuppliesService, WeatherService, $interval, BuyService) {
        // weather 
        $scope.sun = WeatherService.getWeather();
        let temp = $scope.sun;
        // create stand
        let standIdNumber = CreateStandService.getId();
        SuppliesService.newId(standIdNumber);
        console.log(`calling buy service ${standIdNumber}`)
        BuyService.sendId(standIdNumber);

        $scope.id = SuppliesService.newId(standIdNumber);

        $scope.ingreds = SuppliesService.showIngredients();
        $scope.stats = SuppliesService.showStats();
        $scope.new = SuppliesService.updateStats();
        $interval(function () {
            SuppliesService.updateStats()
        }, 15000);;
        $scope.update = () => {
            SuppliesService.updateStats();
        };

        $scope.buyStuff = function (name, num) {
            BuyService.buyMoreStuff(name, num);
        };
        $scope.setPrice = function (cost) {
            BuyService.cupPrice(cost);
        };

    }

};