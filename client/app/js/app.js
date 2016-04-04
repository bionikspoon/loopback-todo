var app = angular.module('todoApp', [ 'lbServices' ]);

app.controller('todoController', function ($scope, $http, Todo) {
  $scope.todos = Todo.find();
  $scope.todo = $scope.todo || null;
  $scope.loading = false;

  $scope.add = function () {
    $scope.loading = true;

    Todo.create({ title: $scope.todo.title, isDone: false }).$promise
        .then(function (todo) {
          $scope.todos.push(todo);
          $scope.todo.title = '';
          $scope.loading = false;
        });
  };

  $scope.delete = function ($index) {
    $scope.loading = true;
    var todo = $scope.todos[ $index ];

    Todo.deleteById({ id: todo.id }).$promise
        .then(function () {
          $scope.todos.splice($index, 1);
          $scope.loading = false;
        });
  };

  $scope.update = function (todo) {
    todo.$save();
  };

});
