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

                })
                    .then(function (response) {
                        angular.copy(response.data, statsUp);
                        angular.copy(response.data.ingredients, ingredients);
                        return statsUp;
                    });
            },

            showStats: function () {
                return statsUp;
            },

            showIngredients: () => {
                return ingredients;
            },


        }
    },
};