module.exports = {
    name: 'SuppliesController', 
    func: function ($scope) {
        console.log('we need all the lemons!');
        $scope.cost = 0;
        $scope.setPrice = function (cost) {
        console.log(`${cost} per cup`);
        }
    },
};