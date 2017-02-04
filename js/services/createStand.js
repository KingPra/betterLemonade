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