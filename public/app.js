(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const app = angular.module('Lemonade', ['ui.router']);


let newStand = require('./controller/createStand')
app.controller(newStand.name, newStand.func);

let infoStand = require('./controller/standInfo')
app.controller(infoStand.name, infoStand.func);

let allScores = require('./controller/highScores')
app.controller(allScores.name, allScores.func);

// let supplies = require('./controller/supplies')
// app.controller(supplies.name, supplies.func);


let createStand = require('./components/createStand')
app.component(createStand.name, createStand.object);

let standInfo = require('./components/standInfo')
app.component(standInfo.name, standInfo.object);

// let highScores = require('./components/highScores')
// app.component(highScores.name, highScores.object);

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




// app.controller('StandInfoController', function ($scope, CreateStandService) {
//     let stand = CreateStandService.getId();
//     console.log('info controller kicked in');
//     console.log(stand);
// });

// app.controller('SuppliesController', function ($scope) {
//     console.log('we need all the lemons!');
//     $scope.cost = 0;
//     $scope.setPrice = function (cost) {
//         console.log(`${cost} per cup`);
//     };

// });


// app.component('createStand', {
//     controller: 'CreateStandController',
//     templateUrl:'templates/createstand.html',
// });

// app.component('standInfo', {
//     controller: 'StandInfoController', 
//     templateUrl: 'templates/stand-info.html',
// });

// app.component('highScore', {
//     controller: 'HighScoresController',
//     templateUrl: 'templates/high-score.html',
// });

// app.component('supplies', {
//     controller: 'SuppliesController',
//     templateUrl: 'templates/supplies.html',
// });

// app.component('buy', {
//     controller: 'buyController',
//     templateUrl: 'templates/supplies.html',
// });


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
 let standId = null;
 console.log('next 2 lines are from Supplies Service')
 console.log(stand);
 console.log(stats);
 $http.get(`https://blooming-hamlet-70507.herokuapp.com/stand/51eb84f6-df8b-4e40-9b74-1fce5f06e1d4`)
 .then(function (response) {
     angular.copy(response.data, stats);

 });
 return{
     newId: function (id) {
        standId = id;
        console.log(`supplies service newID function running : ${id}`); 
     },
     showStats: function () {
         return stats;
     },
 }
});

app.factory('WeatherService', function ($http) {
    let weather = [];
    console.log(weather);
    $http.get(`https://blooming-hamlet-70507.herokuapp.com/weather/forecast`)
    .then(function (response) {
        angular.copy(response.data, weather);
    });
    return {
        getWeather: function () {
            return weather;
        },
    }
});

app.factory('HighScoresService', function ($http) {
    let scores = [];
    $http.get('https://blooming-hamlet-70507.herokuapp.com/stand/top')
    .then(function (response) {
      angular.copy(response.data, scores);
  });
    return {
        getScores: function (something) {
            return scores;
        },
    }
});

// app.factory('BuyService', function ($http) {
//     let supplies = [];
//     $http.post('https://blooming-hamlet-70507.herokuapp.com/stand/update?id=51eb84f6-df8b-4e40-9b74-1fce5f06e1d4', {
        
//     }).then
// })
},{"./components/createStand":2,"./components/standInfo":3,"./controller/createStand":4,"./controller/highScores":5,"./controller/standInfo":6}],2:[function(require,module,exports){
module.exports = {
name: 'createStand',
object: {
    controller: 'CreateStandController',
    templateUrl:'templates/createstand.html',
    },
};
},{}],3:[function(require,module,exports){
module.exports = {
name: 'standInfo',
object: {
    controller: 'StandInfoController', 
    templateUrl: 'templates/stand-info.html',
    },
};
},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
module.exports = {
    name: 'HighScoresController',
    func: function ($scope, HighScoresService) {
      $scope.scores = HighScoresService.getScores();
      console.log($scope.scores)
      console.log('high scores controller firing off')

    }
};
},{}],6:[function(require,module,exports){
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
},{}]},{},[1]);
