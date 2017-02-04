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