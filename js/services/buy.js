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
            // currently fixed property.
            property: `${name}`,
            add: num,
            }).then(function (response) {
                angular.copy(response.data, stats);
                console.log(`stats from buyMoreStuff func: ${stats}`);
                });
            },

            cupPrice: function (cost) {
                console.log(`set price of cups ${standId}...buy ${cost}`)
                $http.post(`https://blooming-hamlet-70507.herokuapp.com/stand/update?id=${standId}`, {
            // currently fixed property.
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