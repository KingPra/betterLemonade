module.exports = {
    name: 'SuppliesService',
    func: function ($http) {
        let statsUp = [];
        let business = [];
        let ingredients = [];
        let standId = null; 
        
        return {
            newId: function (id) {
                 standId = id;
                 return standId;
            },

            updateStats: function () {
                //currently hard coded for testing. need to change back to standId
                    $http.post(`https://blooming-hamlet-70507.herokuapp.com/stand/update?id=${standId}`,{
                        property: 'ice',
                        add: 0,
                    })
                    .then(function (response) {
                    angular.copy(response.data, statsUp);
                    angular.copy(response.data.business, business);
                    angular.copy(response.ingredients, ingredients );
                    console.log(`data update:`);
                    console.log(business);
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
        }
    },
};