const app = angular.module('Lemonade', ['ui.router']);

// const controllers = [
//     require('./controllers/CreateStandController')
// ];

// for (let i = 0; i < controllers.length; i++) {
//     app.controller(controllers[i].name, controllers[i].func)
// };

app.config(function ($stateProvider) {
    $stateProvider.state({
        name: 'create-stand',
        url: '/createstand',
        component: 'createStand',
    });

    $stateProvider.state({
        name: 'stand-info',
        url: '/stand-info',
        component: 'standInfo',
    });

    $stateProvider.state({
        name: 'high-score',
        url: '/high-score',
        component: 'highScore',
    });

    $stateProvider.state({
        name: 'supplies',
        url: '/supplies',
        component: 'supplies',
    });
});



app.controller('CreateStandController', function ($scope, CreateStandService) {
    $scope.name = '';
    $scope.startGame = function () {
        console.log($scope.name);
        console.log(`lets get it on ${$scope.name}`);
        CreateStandService.newStand(name);
    };
}); 

app.controller('StandInfoController', function ($scope) {
    console.log('info controller kicked in');
});

app.controller('SuppliesController', function ($scope) {
    console.log('we need all the lemons!');
    $scope.cost = 0;
    $scope.setPrice = function (cost) {
        console.log(`${cost} per cup`);
    };

});

app.controller('HighScoresController', function ($scope, HighScoresService) {
    $scope.scores = HighScoresService.getScores();
    console.log($scope.scores)
  console.log('high scores controller firing off')


});






app.component('createStand', {
    controller: 'CreateStandController',
    templateUrl:'templates/createstand.html',
});

app.component('standInfo', {
    controller: 'StandInfoController', 
    templateUrl: 'templates/stand-info.html',
});

app.component('highScore', {
    controller: 'HighScoresController',
    templateUrl: 'templates/high-score.html',
});

app.component('supplies', {
    controller: 'SuppliesController',
    templateUrl: 'templates/supplies.html',
});





app.factory('CreateStandService', function ($http) {
    let id = null;
    return {
        newStand(name) {
            console.log('pow pow new company')
            $http.post('http://blooming-hamlet-70507.herokuapp.com/stand', {
                "stand_name": name,
            });
        },
    }

});

app.factory('SuppliesService', function () {

});

app.factory('HighScoresService', function ($http) {
    let scores = [];
    $http.get('https://blooming-hamlet-70507.herokuapp.com/stand/top').then(function (response) {
      angular.copy(response.data, scores);
  });
    return {
        getScores: function (something) {
            return scores;
        },
    }
});