(function() {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$http', '$interval'];

  function HomeController($http, $interval) {
    var vm = this;

    vm.vibrateEnabled = false;
    vm.currentLocation = {
      lat: '',
      long: ''
    };
    vm.isAlert = false;
    vm.currentArea = '';

    vm.nextAction = 'alert';

    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

    if (navigator.vibrate) {
      // vibration API supported
      vm.vibrateEnabled = true;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(location) {
        vm.currentLocation = location.coords;
        vm.queryAreas();
      });
    }

    vm.action = function() {
      if(vm.nextAction === 'alert') {
        vm.triggerAlert();
        vm.nextAction = 'requestHelp';
      } else if(vm.nextAction === 'requestHelp') {
        vm.requestHelp();
      }
    }

    vm.queryAreas = function() {


      $interval(function() {
        $http({
          url: '/api/distress/signals',
          method: 'GET',
          params: {
            lat: vm.currentLocation.latitude,
            long: vm.currentLocation.longitude
          }
        }).then(function(success) {
          vm.isAlert = success.data.isAlert;
          vm.currentArea = success.data.area;
        }, function(error) {
          console.log(error);
        });
      }, 1000);


    };

    vm.triggerAlert = function() {

      console.log(vm.currentArea);
      $http.post('/api/distress/signals', {
        "loc": {
          "type": "Point",
          "coordinates": [vm.currentLocation.latitude, vm.currentLocation.longitude]
        },
        "area": vm.currentArea
      }).then( function(response) {

        navigator.vibrate([1000,      500,    1000]);

      });
    
    };


    vm.requestHelp = function() {

      $http.post('/api/helpRequests', {
        "loc": {
          "type": "Point",
          "coordinates": [vm.currentLocation.latitude, vm.currentLocation.longitude]
        },
        "area": vm.currentArea
      }).then( function(response) {

        vm.isRescue = true;
        navigator.vibrate([1000,      500,    1000]);

      });

    };


  }
}());