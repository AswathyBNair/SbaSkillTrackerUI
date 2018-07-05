// create the module and name it WorkoutApp 

var WorkoutApp = angular.module('RoutingApp', ['ngRoute']);  

// configure our routes    
WorkoutApp.config(function($routeProvider) {  
  $routeProvider  

  /
  // route for the create workout page    
  .when('/create-associate', {  
      templateUrl: './create-associate/create-associate.component.html',  
      controller: 'CreateWorkoutController'  
  })  


.when('/skill', {  
      templateUrl: './skills/skills.component.html',  
      controller: 'SkillsController'  
  })  
  // route for the category page    
  .when('/home', {  
      templateUrl: './home/home.component.html',  
      controller: 'mainController'  
  })

});  

// create the controller and inject Angular's $scope    
WorkoutApp.controller('mainController', function($scope) {  
  // create a message to display in our view    
  $scope.HomeMessage = 'View All Controller Called !!!';  
});  

WorkoutApp.controller('CreateWorkoutController', function($scope) {  
  $scope.AboutMessage = 'Create Workout Controller Called !!!';  
});  

