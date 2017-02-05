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

/** routers */
console.log(`app config `);
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


