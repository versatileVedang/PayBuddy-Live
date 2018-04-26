app.controller("checkOutCtrl", ['$scope', '$location', 'ds', 'response', '$rootScope', function checkOutCtrl($scope, $location, ds, response, $rootScope) {

    $scope.getBalance = function () {
        var userId = parseInt(localStorage.getItem('userRef'));
        ds.balance.getByBalance.get({ id: userId }).then(function (jsonResult) {
            if (jsonResult === false) {
                $scope.balance = 0;
            }
            else {
                $scope.balance = jsonResult.balanceAmount;
            }
            $scope.$apply();
        });
    };

    $scope.initCheckOut = function () {
        var userId = parseInt(localStorage.getItem('userRef'));
        var ship = $scope.ship;
        ds.cart.getByCarts.get({ id: userId }).then(function (jsonResult) {
            debugger
            $scope.cartList = jsonResult;
            $scope.getTotal();
            $scope.$apply();
        });
    };

    $scope.getTotal = function () {
        //var array = rx.linq($scope.cartList).select("x=>x.subTotal");
        var array = $scope.cartList.map(a => a.subTotal);
        $scope.total = rx.linq(array).sum("a=>a");
    };

    $scope.getSubTotal = function (item) {
        var cartList = rx.json.del($scope.cartList, item);
        if (item.discount !== 0) {
            var withDiscount = (item.discount * item.cost) / 100
            item.subTotal = ((item.cost - withDiscount) * item.quantity);
        }
        else {
            item.subTotal = (item.cost * item.quantity);
        }
        cartList.push(item);
        $scope.cartList = cartList;
        $scope.getTotal();
    };

    $scope.placeOrder = function (order) {
        var userId = parseInt(localStorage.getItem('userRef'));
        var URL = $location.path();
        var orderId = URL.split('/')[2];
        var message;
        if (order !== null && order !== undefined) {
            var details = {
                cardCompanyId: order.cardCompany,
                cardNumber: order.cardNumber,
                cvv: order.cvv,
                expMonth: order.expMonth,
                expYear: order.expYear,
                orderId: orderId,
                paymentTypeId: order.paymentType,
                userId: userId,
                amount: $scope.total
            };
            ds.transaction.postCheckout.post(details).then(function (jsonResult) {
                if (jsonResult === "items ordered") {
                    ds.cart.deleteCarts.del({ userId: userId }).then(function (jsonResult) {
                        debugger
                        $rootScope.cartCount = 0;
                        response.redirect('/thankYou/' + orderId);
                        $scope.$apply();
                    });
                }
                else {
                    rx.log.error("");
                }
            });
        }
        else {
            rx.log.error("Please Enter Valid Details");
        }
    };

}]);