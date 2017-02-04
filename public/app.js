(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const app = angular.module('Lemonade', ['ui.router']);

 const controllers = [
    require('./controller/createStand'),
    require('./controller/standInfo'),
    require('./controller/highScores'),
    require('./controller/supplies'),
 ];

for (let i = 0; i < controllers.length; i++) {
    app.controller(controllers[i].name, controllers[i].func)
};



const components = [
    require('./components/createStand'),
    require('./components/standInfo'),
    require('./components/highScores'),
];

for (let i = 0; i < components.length; i++) {
    app.component(components[i].name, components[i].object)
};


const services = [
    require('./services/createStand'),
    require('./services/highScores'),
    require('./services/supplies'),
    require('./services/weather'),
];

for (let i = 0; i < services.length; i++) {
    app.factory(services[i].name, services[i].func)
};

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


// app.factory('CreateStandService', function ($http) {
//     let stand = null;
//     console.log('Create stand service making it rain');
//     console.log(stand);
//     return {
//         newStand(name) {
//             $http.post('http://blooming-hamlet-70507.herokuapp.com/stand', {
//                 stand_name: name,
//             }).then(function (response) {
//                 stand = response.data.stand_id;
//                 console.log(`newStand function Create Stand Service ${stand}`);
//             })
//         },
//         getId: function () {
//             return stand;
//         },
//     }

// });

// app.factory('SuppliesService', function ($http) {
//  let stats = [];
//  let standId = null;
//  console.log('next 2 lines are from Supplies Service')
//  console.log(stand);
//  console.log(stats);
//  $http.get(`https://blooming-hamlet-70507.herokuapp.com/stand/3ab885ae-91ef-4ea4-b400-e26e2c4c8ec3`)
//  .then(function (response) {
//      angular.copy(response.data, stats);

//  });
//  return{
//      newId: function (id) {
//         standId = id;
//         console.log(`supplies service newID function running : ${id}`); 
//      },
//      showStats: function () {
//          return stats;
//      },
//  }
// });

// app.factory('WeatherService', function ($http) {
//     let weather = [];
//     console.log(weather);
//     $http.get(`https://blooming-hamlet-70507.herokuapp.com/weather/forecast`)
//     .then(function (response) {
//         angular.copy(response.data, weather);
//     });
//     return {
//         getWeather: function () {
//             return weather;
//         },
//     }
// });

// app.factory('HighScoresService', function ($http) {
//     let scores = [];
//     $http.get('https://blooming-hamlet-70507.herokuapp.com/stand/top')
//     .then(function (response) {
//       angular.copy(response.data, scores);
//   });
//     return {
//         getScores: function (something) {
//             return scores;
//         },
//     }
// });

// app.factory('BuyService', function ($http) {
//     let supplies = [];
//     $http.post('https://blooming-hamlet-70507.herokuapp.com/stand/update?id=51eb84f6-df8b-4e40-9b74-1fce5f06e1d4', {
        
//     }).then
// })


},{"./components/createStand":2,"./components/highScores":3,"./components/standInfo":4,"./controller/createStand":5,"./controller/highScores":6,"./controller/standInfo":7,"./controller/supplies":8,"./services/createStand":9,"./services/highScores":10,"./services/supplies":11,"./services/weather":12}],2:[function(require,module,exports){
module.exports = {
name: 'createStand',
object: {
    controller: 'CreateStandController',
    templateUrl:'templates/createstand.html',
    },
};
},{}],3:[function(require,module,exports){
module.exports = {
name: 'highScore',
object: {
    controller: 'HighScoresController',
    templateUrl: 'templates/high-score.html',
    } ,  
};
},{}],4:[function(require,module,exports){
module.exports = {
name: 'standInfo',
object: {
    controller: 'StandInfoController', 
    templateUrl: 'templates/stand-info.html',
    },
};
},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
module.exports = {
    name: 'HighScoresController',
    func: function ($scope, HighScoresService) {
      $scope.scores = HighScoresService.getScores();
      console.log($scope.scores)
      console.log('high scores controller firing off')

    }
};
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
module.exports = {
    name: 'CreateStandService',
    func: function ($http) {
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

    }
};
},{}],10:[function(require,module,exports){
module.exports = {
    name: 'HighScoresService',
    func: function ($http) {
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
    }

};
},{}],11:[function(require,module,exports){
module.exports = {
    name: 'SuppliesService',
    func: function ($http) {
        let stats = [];
        let standId = null;
        console.log('next 2 lines are from Supplies Service')
        console.log(standId);
        console.log(stats);
        $http.get(`https://blooming-hamlet-70507.herokuapp.com/stand/3ab885ae-91ef-4ea4-b400-e26e2c4c8ec3`)
            .then(function (response) {
                angular.copy(response.data, stats);

            });
        return {
            newId: function (id) {
                standId = id;
                console.log(`supplies service newID function running : ${id}`);
            },
            showStats: function () {
                return stats;
            },
        }
    },
};
},{}],12:[function(require,module,exports){
module.exports = {
    name: 'WeatherService',
    func: function ($http) {
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
    },
};
},{}]},{},[1]);
