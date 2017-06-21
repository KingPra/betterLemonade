module.exports = {
    name: 'CreateStandService',
    func: function ($http) {
        let standIdentification = null;
        return {
            newStand(name) {
                $http.post('http://blooming-hamlet-70507.herokuapp.com/stand', {
                    stand_name: name,
                }).then(function (response) {
                    standIdentification = response.data.stand_id;
                })
            },
            getId: function () {
                return standIdentification;
            },
        }

    },
};