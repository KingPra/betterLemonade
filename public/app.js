(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const app = angular.module('Lemonade', ['ui.router']);
//  importing controllers
 const controllers = [
    require('./controller/createStand'),
    require('./controller/standInfo'),
    require('./controller/highScores'),
    require('./controller/supplies'),
 ];

for (let i = 0; i < controllers.length; i++) {
    app.controller(controllers[i].name, controllers[i].func)
};

/** importing components */
const components = [
    require('./components/createStand'),
    require('./components/standInfo'),
    require('./components/highScores'),
];

for (let i = 0; i < components.length; i++) {
    app.component(components[i].name, components[i].object)
};

/** importing services */
const services = [
    require('./services/createStand'),
    require('./services/highScores'),
    require('./services/supplies'),
    require('./services/weather'),
    require('./services/buy'),
];

for (let i = 0; i < services.length; i++) {
    app.factory(services[i].name, services[i].func)
};




const routers = require('./routers');

app.config($stateProvider => {
    for (let i = 0; i < routers.length; i++) {
        $stateProvider.state(routers[i]);
    }
});




},{"./components/createStand":2,"./components/highScores":3,"./components/standInfo":4,"./controller/createStand":5,"./controller/highScores":6,"./controller/standInfo":7,"./controller/supplies":8,"./routers":9,"./services/buy":10,"./services/createStand":11,"./services/highScores":12,"./services/supplies":13,"./services/weather":14}],2:[function(require,module,exports){
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
    $scope.startGame = () => {
        // passes the value of the input box as a parameter of newStand func
        CreateStandService.newStand($scope.name);
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
    $interval( function () {
        SuppliesService.updateStats()}, 15000);;
    $scope.update = () => {
        SuppliesService.updateStats();
    };

    $scope.buyStuff = function (name, num) {
        console.log(name, num);
        BuyService.buyMoreStuff(name, num);
    };
    $scope.setPrice = function (cost) {
        BuyService.cupPrice(cost);
    };

    }

};
},{}],8:[function(require,module,exports){
module.exports = {
    name: 'SuppliesController', 
    func: function ($scope) {
        console.log('we need all the lemons!');
        $scope.cost = 0;
        $scope.setPrice = function (cost) {
            console.log('set cost was clicked')
            console.log(`${cost} per cup`);
            }
        },
};
},{}],9:[function(require,module,exports){
module.exports = [


    {
        name: 'create-stand',
        url: '/createstand',
        component: 'createStand',
    },

    {
        name: 'stand-info',
        url: '/stand-info',
        component: 'standInfo',
    },

    {
        name: 'high-score',
        url: '/high-score',
        component: 'highScore',
    },

    {
        name: 'supplies',
        url: '/supplies',
        component: 'supplies',
    },


]
},{}],10:[function(require,module,exports){
module.exports = {
    name: 'BuyService',
    func: function ($http) {
        let stats = [];
        let standId = null;
        console.log('Buy Service')
        return {

            sendId: function (id) {
                standId = id;
                console.log(`send id func : ${standId}`);
            },

            buyMoreStuff: function (name, num) {
                console.log(`one of the buy buttons was clicked so here I am ${standId}...buy ${num} of name:${name}`)
                $http.post(`https://blooming-hamlet-70507.herokuapp.com/stand/update?id=${standId}`, {
                    property: `ingredients.${name}`,
                    add: num,
                }).then(function (response) {
                    angular.copy(response.data, stats);
                    console.log(`stats from buyMoreStuff func: ${stats}`);
                    console.log(name, num);
                });
            },

            cupPrice: function (cost) {
                console.log(`set price of cups ${standId}...buy ${cost}`)
                $http.post(`https://blooming-hamlet-70507.herokuapp.com/stand/update?id=${standId}`, {
                    property: `business.price`,
                    set: cost,
                }).then(function (response) {
                    angular.copy(response.data, stats);
                    console.log(`stats from buyMoreStuff func: ${stats}`);
                });
            },

        }
    },
};
},{}],11:[function(require,module,exports){
module.exports = {
    name: 'CreateStandService',
    func: function ($http) {
        let standIdentification = null;
        //const standIdentification = 'a5d184b4-63ec-47b1-910d-09aae5415801';
        return {
            newStand(name) {
                $http.post('http://blooming-hamlet-70507.herokuapp.com/stand', {
                    stand_name: name,
                }).then(function (response) {
                    standIdentification = response.data.stand_id;
                })
            },
            getId: function () {
                return '36e8e745-fc10-4874-8816-53939d1a36a1';
                //return standIdentification;
            },
        }

    },
};
},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
module.exports = {
    name: 'SuppliesService',
    func: function ($http) {
        const statsUp = [];
        const ingredients = [];
        let standId = null;

        return {
            newId: function (id) {
                standId = id;
                return standId;
            },

            updateStats: function () {
                //currently hard coded for testing. need to change back to standId
                $http.get(`https://blooming-hamlet-70507.herokuapp.com/stand/${standId}`, {
                    // $http.post(`https://blooming-hamlet-70507.herokuapp.com/stand/update?id=${standId}`,{
                    //     property: 'ice',
                    //     add: 0,
                })
                    .then(function (response) {
                        angular.copy(response.data, statsUp);
                        angular.copy(response.data.ingredients, ingredients);
                        console.log(`data update:`);
                        console.log(ingredients);
                        console.log('end of data update');
                        return statsUp;
                    });


            },

            showStats: function () {
                console.log(` show stats function here:`);
                console.log(statsUp);
                console.log('end of show stats function ');
                return statsUp;
            },

            showIngredients: () => {
                return ingredients;
            },


        }
    },
};
},{}],14:[function(require,module,exports){
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
