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
                return '74256647-704e-45a4-86a8-4aa015cad422';
                //return standIdentification;
            },
        }

    },
};