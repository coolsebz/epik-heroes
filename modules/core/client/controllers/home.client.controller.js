(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$http'];

  function HomeController($http) {
    var vm = this;

    vm.vibrateEnabled = false;
    vm.currentLocation =  { lat: '', long: ''},

    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

    if (navigator.vibrate) {
      // vibration API supported
      vm.vibrateEnabled = true;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(location) {
        vm.currentLocation = location.coordinates;
        console.log(location);
        vm.queryAreas();
      });
    }

    vm.queryAreas = function() {

      $http.get('/api/distress/signals', {
        lat: location.latitude,
        long: location.longitude
      });
    };

    vm.triggerAlert = function() {
      $http.post('/api/distress/signals', {
        "loc": {
          "type": "Point", "coordinates": [100.5, 0.7]
        },
        "area": "59051cf22fdedea09f1afc5e"
      });
    };


  }
}());
