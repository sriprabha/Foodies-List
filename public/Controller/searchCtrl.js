angular.module('restaurantFinder').controller('searchCtrl',function($scope,$http){

	$scope.ratings = [ 
		{rating: '1'}, 
		{rating: '2'},
		{rating: '3'},
		{rating: '4'}, 
		{rating: '5'} 
	];

	
	$http.get('/api/restaurants').success(function(data){
		$scope.items=data;
		console.log("Received data:" +data);
	})
	.error(function(data){
		console.log('Error:'+data);
	});

	$scope.delete=function(contact){
		$http.delete('/api/restaurants/'+contact)
			.success(function(data){
				$scope.items=data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error:' +data);
			});
	};

	$scope.openSite=function(itemObj){
		$scope.url='http://www.google.com/search?q='+itemObj.name+'+'+itemObj.location;
	}

	$scope.submitForm=function(){
		var obj = {
			"name": $scope.name,
			"address": $scope.address,
			"location": $scope.location,
			"contact": $scope.contact,
			"category":$scope.category,
			"rating": $scope.selectedOption.rating
		}

		$http.post('/api/restaurants',obj).success(function(data,status, headers){
			$scope.items=data;
			clearFields();
		})
		.error(function(data){
			console.log('Error:'+data);
		});

		clearFields=function(){
			$scope.name="";
			$scope.address="";
			$scope.location="";
			$scope.contact="";
			$scope.category="";
			$scope.selectedOption.rating="1";
		}
	}
});