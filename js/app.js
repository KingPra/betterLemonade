const app = angular.module('Lemonade', ['ui.router']);


let newStand = require('./controller/createStand')
app.controller(newStand.name, newStand.func);

let allScores = require('./controller/highScores')
app.controller(allScores.name, allScores.func);

// const controllers = [
//     require('./controllers/CreateStandController')
// ];

// for (let i = 0; i < controllers.length; i++) {
//     app.controller(controllers[i].name, controllers[i].func)
// };
let stand = null;
console.log(`app config ${stand}`);
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




app.controller('StandInfoController', function ($scope, CreateStandService) {
    let stand = CreateStandService.getId();
    console.log('info controller kicked in');
    console.log(stand);
});

app.controller('SuppliesController', function ($scope) {
    console.log('we need all the lemons!');
    $scope.cost = 0;
    $scope.setPrice = function (cost) {
        console.log(`${cost} per cup`);
    };

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
    let stand = null;
    console.log('Create stand service making it rain');
    console.log(stand);
    return {
        newStand(name) {
            $http.post('http://blooming-hamlet-70507.herokuapp.com/stand', {
                stand_name: name,
            }).then(function (response) {
                stand = response.data.stand_id;
                console.log(`newStand function Create Stand Service ${stand}`);
            })
        },
        getId: function () {
            return stand;
        },
    }

});

app.factory('SuppliesService', function ($http) {
 let stats = [];
 console.log('next 2 lines are from Supplies Service')
 console.log(stand);
 console.log(stats);
 $http.post(`https://https://blooming-hamlet-70507.herokuapp.com//stand/update?id= ${stand}`)
    .then(function (response) {
     angular.copy(response.data, stats);
 });
 return{
     getStats: function () {
         return stats;
     },
 }
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