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

