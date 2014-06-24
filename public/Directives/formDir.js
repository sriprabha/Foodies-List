angular.module('restaurantFinder').directive('formDir', function(){
	return {
		restrict:'E',
		replace:'true',
		templateUrl:'../View/form.html'
	};
});