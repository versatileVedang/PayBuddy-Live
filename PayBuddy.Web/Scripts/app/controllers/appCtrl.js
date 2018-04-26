
app.controller("appCtrl", ['$scope', function appCtrl($scope) {
    $scope.preventBack = function () {
        { window.history.forward(); }
        setTimeout("preventBack()", 0);
        window.onunload = function () { null };
    };
}]);

