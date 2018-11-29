angular.module('shop', []).controller('MainCtrl', [
    '$scope', '$http',
    function($scope, $http) {
        $scope.items = [];
        $scope.cart = [];
        $scope.getAll = function () {
            console.log("GetAll")
            return $http.get('/shop').success(function(data) {
                angular.copy(data, $scope.items);
            });
        };
        $scope.getAll();
        $scope.create = function(item) {
            return $http.post('/shop', item).success(function(data) {
                $scope.items.push(data);
            });
        };
        $scope.saveOrder = function() {
            console.log("in saveOrder");
            angular.forEach($scope.items, function(value,key) {
                if(value.selected) {
                  $scope.upvote(value);
                  $scope.cart.push(value);
                }
            });
        }
        $scope.upvote = function(item) {
          return $http.put('/shop/' + item._id + '/upvote')
            .success(function(data){
              console.log("upvote worked");
              item.upvotes += 1;
            });
        };
        $scope.addProduct = function() {
            console.log("in add");
            var newObj = {Name:$scope.nameContent,Price:$scope.priceContent,Image:$scope.imageContent,votes:0};
            console.log($scope.imageContent)
            $scope.create(newObj);
            $scope.nameContent = '';
            $scope.priceContent = 0;
            $scope.imageContent = '';
        };
        $scope.incrementUpvotes = function(item) {
            $scope.upvote(item);
        };
        $scope.delete = function(item) {
            console.log("Deleting: " + item.Name + " ID " + item._id);
            $http.delete('/shop/' + item._id)
                .success(function(item) {
                    console.log("delete worked");
                });
            $scope.getAll();
        };
    }
]);