app.controller("userAuthenticationCtrl", ['$scope', '$http','ds',  function userAuthenticationCtrl($scope, $http, ds) {

    $scope.initSignIn = function () {
        $scope.user = {};
    };


    $scope.signIn = function (user) {
        var data = { email: user.email, password: user.password };
        ds.user.postUserAuthentication.post(data).then(function (response) {
            if (response.message === true) {

                if (response.data.roleId === 2) {
                    var displayNameUser = response.data.firstName;
                    localStorage.setItem("name", displayNameUser);
                    localStorage.setItem("userRef", response.data.userId);
                    window.open("User#/dashboard", "_self");
                }
                else {
                    var displayNameAdmin = response.data.firstName;
                    localStorage.setItem("name", displayNameAdmin);
                    window.open("Admin#/userList", "_self");
                }
            }
            else {
                $scope.authMessage = "Please Enter Your Email and Password";
            }
        });
    };

    $scope.resetPassword = function (user) {

        var data = { email: user.email };
        ds.user.putForgotPassword.put(data).then(function (response) {
            debugger
            window.open("Index#/signIn", "_self");
            $scope.$apply();
            rx.log.success("Check your email for new password");
        });
    };
}]);

