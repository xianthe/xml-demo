'use strict';

/**
 * @ngdoc function
 * @name riftXmlDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the riftXmlDemoApp
 */

angular.module('riftXmlDemoApp')
  .factory('DataSource', ['$http', function($http){
     return {
        get: function(callback){
          $http.get(
            'data/Souls/Cleric/Cabalist.xml',
            {transformResponse: function(data) {
                // convert the data to JSON and provide
                // it to the success function below
                var x2js = new X2JS();
                var json = x2js.xml_str2json(data);
                return json;
              }
            }
          ).
          success(function(data) {
             // send the converted data back
             // to the callback function
             callback(data);
          })
        }
     }
  }]);

angular.module('riftXmlDemoApp')
  .config(function ($httpProvider){
  	$httpProvider.interceptors.push('xmlHttpInterceptor');
  })
  .controller('MainCtrl', function ($scope, $http, x2js, DataSource) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.todos = ['Item 1', 'Item 2', 'Item 3'];

    $scope.souls = [];

  //This is the callback function
  var setData = function(data) {
      $scope.dataSet = data;

        window.data = data;
        console.log("data");
        console.log(data);

      $scope.abilities = data.SoulTree.Abilities.Ability;
      $scope.traits = data.SoulTree.Traits.Trait;
      //$scope.ranks = data.SoulTree.Traits.Trait.Ranks.Rank;
  }


  DataSource.get(setData);

  console.log("==================");
  console.log(DataSource);

	$http.get('data/Souls/Cleric/Cabalist.xml').then(function(response) {
	  var els = response.xml.find('Rank'),
	  	  rank,
	  	  i;

	    console.log(els);
      window.els = els;

    var ranks = [];
    for (i = 0; i < els.length; i += 1){
       rank = angular.element(els[i]);
       window.rank = rank;

       var points, description;
       points = rank.find('Points');
       description = rank.find('Description');

       rank.find('Points').each(function(){
          if ($(this).length > 0){
            points = $(this).text();
          }
       });

       rank.find('Description').each(function(){
          if ($(this).length > 0){
            description  = $(this).text();
          }
       });

       ranks.push({
           points: points,
           description : description
       });
    }

    console.log(ranks);
     $scope.ranks = ranks;
	});
  });

