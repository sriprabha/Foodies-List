angular.module('restaurantFinder').directive('numbersOnly',function(){
	var directive = {};
	directive.require='ngModel';
	directive.link=function(scope,element,attributes,modelCtrl){
		modelCtrl.$parsers.push(function(inputValue){
			if(inputValue==undefined) return '';
			var transformedInput=inputValue.replace(/[^0-9]/g, '');
			if(transformedInput!=inputValue){
				modelCtrl.$setViewValue(transformedInput);
				modelCtrl.$render();
			}
			return transformedInput;
		});
	}
	return directive;
});