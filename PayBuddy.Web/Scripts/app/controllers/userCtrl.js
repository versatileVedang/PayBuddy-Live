app.controller("userCtrl", ['$scope', '$location', 'ds', 'response', 'request', '$rootScope', function userCtrl($scope, $location, ds, response, request, $rootScope) {

    $scope.initUser = function () {
        $scope.displayName = localStorage.getItem("name");
    };

    $scope.initCartCount = function () {
        var userId = parseInt(localStorage.getItem('userRef'));
        ds.user.getByCount.get({ id: userId }).then(function (jsonResult) {
            if (jsonResult != null) {
                $rootScope.cartCount = jsonResult.cartCount;
            }
            else {
                $rootScope.cartCount = 0;
            }
            $scope.$apply();
        });
    }

    $scope.signOut = function () {
        localStorage.removeItem("name");
        window.open("Index#/signIn", "_ self");
    };

    $scope.signUp = function (user) {
        rx.progress.show();
        var gender = parseInt(user.gender);
        var contact = parseInt(user.contact);
        if ($scope.user !== null && $scope.user !== undefined) {
            var users = {
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password,    
                email: user.email,
                genderId: gender,
                address: user.address,
                contact: contact
            };
            ds.user.postUsers.post(users).then(function (jsonResult) {
                rx.progress.hide();
                response.redirect('/signIn');
                $scope.$apply();
                rx.log.success("You are Registered Successfully.");
            });
        }
        else {
            rx.log.error("Error");
        }
    };

    $scope.redirectToPutUser = function () {
        var id = parseInt(localStorage.getItem('userRef'));
        response.redirect('/putUser/' + id);
    };

    $scope.initPutUser = function () {
        var myTabObj = [
            {
                "title": "Basic Profile",
                "url": "/Templates/User/BasicProfile/BasicProfile.html",
                "selected": true,
                "iconTitle": "Basic Profile"
            },
            {
                "title": "Change Password",
                "url": "/Templates/User/ChangePassword/ChangePassword.html",
                "iconTitle": "Change Password"
            }
        ];
        $scope.myTabObj = myTabObj;
        $scope.myActiveTab = 0;
        $scope.myChangeData = false;
        $scope.cssclass = {
            headerclass: "sidebar-right-control",
            contentclass: "sidebar-right-content"
        };
    };

    $scope.initPutProfile = function () {
        var userId = parseInt(localStorage.getItem('userRef'));
        ds.user.getByUsers.get({ id: userId }).then(function (jsonResult) {
            $scope.user = jsonResult;
            var gender = jsonResult.genderId.toString();
            var contact = jsonResult.contact.toString();
            $scope.user.contact = contact;
            rx.progress.hide();
            $scope.$apply();
        });
    };

    $scope.updateProfile = function (user) {
        rx.progress.show();
        var userId = parseInt(localStorage.getItem('userRef'));
        if ($scope.user !== null && $scope.user !== undefined) {
            var gender = parseInt(user.genderId);
            var contact = parseInt(user.contact);
            var users = {
                userId: userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                genderId: gender,
                address: user.address,
                contact: contact,
                roleId: user.roleId
            };
            ds.user.putUsers.put(users).then(function (jsonResult) {
                rx.progress.hide();
                response.redirect('/dashboard');
                $scope.$apply();
                rx.log.success("Your Profile Updated Successfully.");

            });
        }
        else {
            rx.log.error("Error");
        }
    };

    $scope.updatePassword = function (user) {
        rx.progress.show();
        var userId = parseInt(localStorage.getItem('userRef'));
        if ($scope.user !== null && $scope.user !== undefined) {
            var users = {
                userId: userId,
                password: user.newPassword
            };
            ds.user.putUsers.put(users).then(function (jsonResult) {
                rx.progress.hide();
                response.redirect('/dashboard');
                $scope.$apply();
                rx.log.success("Your Password Updated Successfully.");

            });
        }
    };

    $scope.electronics = function () {
        response.redirect('/productCategory/1');
    };

    $scope.clothing = function () {
        response.redirect('/productCategory/2');
    };

    $scope.sports = function () {
        response.redirect('/productCategory/3');
    };

    $scope.redirectToBalance = function () {
        var id = parseInt(localStorage.getItem('userRef'));
        response.redirect('/balance/' + id);
    };
}]);

