var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
    $http.get('/contactlist').success(function(response) {
        console.log("I got data requested");
        $scope.contactlist = response;
    });

    $scope.saveAPIs = function() {
        $scope.trello_api = $('#trello_api').val();
        $scope.trello_boardid = $('#trello_boardid').val();
        $scope.habitica_usr_api = $('#habitica_usr_api').val();
        $scope.habitica_pass_api = $('#habitica_pass_api').val();
    }

    $scope.loadData = function() {
      $.ajax({
      //The URL to process the request
        'url' : 'https://api.trello.com/1/boards/' + $scope.trello_boardid + '/cards',
        'type' : 'GET',
        'data' : {
          'fields' : 'name,idList,url',
          'key' : $scope.trello_api
        },

      //The response from the server
        'success' : function(data) {
          var stringList = [];
          for(i in data) {
            stringList.push(data[i].name);
          }
          $scope.cardList = stringList;
        }
      });


      $.ajax({
        url: 'https://habitica.com/api/v3/tasks/user',
        type: 'GET',
        dataType: 'json',
        cache: false,
        beforeSend: function(xhr){
          xhr.setRequestHeader('x-api-user', $scope.habitica_usr_api);
          xhr.setRequestHeader('x-api-key',  $scope.habitica_pass_api);
        },
        'success' : function(data) {
          //console.log("Habitica data: " + JSON.stringify(data));
          var stringList = [];
          var listData = data.data;
          for(i in listData) {
            stringList.push(listData[i].text);
          }
          //console.log("HabiticaList: " + stringList);
          $scope.habiticaList = stringList;
        }
      });
    }
}]);
