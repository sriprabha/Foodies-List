angular.module('restaurantFinder').directive('ngConfirmClick',function(){
	return {
        priority:1,
        terminal:true,
      	link: function(scope, element, attr) {
        var msg = attr.ngConfirmClick;
        var clickAction = attr.ngClick;
        attr.ngClick = "";
        element.bind('click', function(event) {
          if(window.confirm(msg)){
          	scope.$eval(clickAction);
          }
          });
            
        }
      }
    });