module.exports = {
    name: 'CreateStandController',
    func: function ($scope) {
    $scope.name = '';
    $scope.startGame = function () {
        console.log($scope.name);
        console.log(`lets get it on ${$scope.name}`);
        }
    }
};



// app.controller('CreateStandController', function ($scope) {
//     $scope.name = '';
//     $scope.startGame = function () {
//         console.log($scope.name);
//         console.log(`lets get it on ${$scope.name}`);
//     };
// }); 