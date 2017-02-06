module.exports = {
    name: 'BuyService',
    func: function ($http) {
        let stats = [];
        let standId = null;
        return {

            sendId: function (id) {
                standId = id;
            },

            buyMoreStuff: function (name, num) {
                $http.post(`https://blooming-hamlet-70507.herokuapp.com/stand/update?id=${standId}`, {
                    property: `ingredients.${name}`,
                    add: num,
                }).then(function (response) {
                    angular.copy(response.data, stats);
                });
            },

            cupPrice: function (cost) {
                $http.post(`https://blooming-hamlet-70507.herokuapp.com/stand/update?id=${standId}`, {
                    property: `business.price`,
                    set: cost,
                }).then(function (response) {
                    angular.copy(response.data, stats);
                });
            },

        }
    },
};