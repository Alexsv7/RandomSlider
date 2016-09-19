var app = angular.module('ngTestTask', ['ngRoute', 'ngResource', 'ngMaterial']);

app.config(function($routeProvider){
	$routeProvider 	
	.when('/task1',{
		templateUrl:'pages/task1.htm',
		controller:'firstTaskController'
	})

	.when('/task2',{
		templateUrl:'pages/task2.htm',
		controller:'secondTaskController'
	})

	.otherwise({ redirectTo:'pages/task1.htm' });
})

app.controller('firstTaskController',["$scope", "$resource", "$interval", function($scope, $resource, $interval){
	
	var toggled = false;
	var poller;

	$scope.server = $resource("https://myrand123.herokuapp.com/api",
	{callback: "JSON_CALLBACK"});
	$scope.randomNumb = $scope.server.get();

	$scope.start = function(){
		$scope.message = 'Stop polling!'
	    poller = $interval(function(){
	    $scope.randomNumb = $scope.server.get();
	    $scope.slider = { value: $scope.randomNumb.number };
	    },2000) 
    };

    $scope.stop = function(){
    	$scope.message = 'Start polling!'
        $interval.cancel(poller);
    };

	$scope.toggle = function() {
	    if (toggled) {
	        $scope.start();
	    } else {
	        $scope.stop();
	    }
	    toggled = !toggled;
	};

	$scope.start();

}]);

app.controller('secondTaskController',["$scope", function($scope){

}]);

