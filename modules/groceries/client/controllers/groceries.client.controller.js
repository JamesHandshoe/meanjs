(function () {
  'use strict';

  // Groceries controller
  angular
    .module('groceries')
    .controller('GroceriesController', GroceriesController);

  GroceriesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'groceryResolve'];

  function GroceriesController($scope, $state, $window, Authentication, grocery) {
    var vm = this;
    //TODO - create a function that pushes items into the groceryList
    vm.groceryList = [];

    vm.authentication = Authentication;
    vm.grocery = grocery;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.addItem = addItem;
    vm.save = save;
    // Remove existing Grocery
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.grocery.$remove($state.go('groceries.list'));
      }
    }

    function addItem(isValid) {
      //console.log(vm.grocery.item);
      vm.groceryList.push(vm.grocery.item);
      //console.log(vm.groceryList);
      vm.grocery.item = "";
    }

          // Save Grocery
    function save(isValid) {
      vm.grocery.items = vm.groceryList;
      //console.log(vm.grocery);
      //console.log(vm.grocery.$save())
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.groceryForm');
        return false;
      }
      // TODO: move create/update logic to service
      if (vm.grocery._id) {

        vm.grocery.$update().then(
            $state.go('groceries.list')
          );
      } else {
                              console.log(vm.grocery);

        vm.grocery.$save().then(
            $state.go('groceries.list')
          );
      }

      function successCallback(res) {
        $state.go('groceries.view', {
          groceryId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
