app.controller("cartCtrl", ['$scope', '$location', 'ds', 'response', 'request', '$rootScope', function cartCtrl($scope, $location, ds, response, request, $rootScope) {

    $scope.addProduct = function (item) {

        var id = parseInt(localStorage.getItem('userRef'));
        if (item !== null && item !== undefined) {
            var items = {
                userId: id,
                productId: item.productId,
                subTotal: item.cost,
                quantity: 1
            };
            ds.cart.postCarts.post(items).then(function (jsonResult) {
                rx.log.success("Product Added.");
                debugger
                $rootScope.cartCount = $rootScope.cartCount + 1;
                $scope.$apply();
            });
        }
    };

    $scope.getProducts = function () {
        var userId = parseInt(localStorage.getItem('userRef'));
        ds.cart.getByCarts.get({ id: userId }).then(function (jsonResult) {
            $scope.cartList = jsonResult;
            $scope.calculateDiscount();
            $scope.getTotal();
            $scope.$apply();
        });
    };

    $scope.removeItem = function (item) {
        rx.progress.show();
        ds.cart.deleteCartItem.del(item).then(function (jsonResult) {
            if (jsonResult === "Item Deleted.") {
                var data = rx.linq(angular.copy($scope.cartList)).where("t => t.cartId != " + item.cartId).toList();
                $scope.cartList = data;
                $rootScope.cartCount = $rootScope.cartCount - 1;
                $scope.$apply();
                rx.progress.hide();
            }
            else {
                rx.log.error("error");
            }
        });
    };

    $scope.viewCategoryProduct = function () {
        $scope.product = {};
        var URL = $location.path();
        var categoryId = URL.split('/')[2];
        ds.cart.getByCategoryProducts.get({ id: categoryId }).then(function (jsonResult) {
            $scope.productList = jsonResult;
            length = jsonResult.length;
            $scope.totalItems = length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 9;
            $scope.maxSize = 5; //Number of pager buttons to show
            console.log($scope.productList);
            $scope.$apply();
        });
    };

    $scope.viewSubCategoryProduct = function () {
        $scope.product = {};
        var URL = $location.path();
        var subCategoryId = URL.split('/')[2];
        ds.cart.getBySubCategoryProducts.get({ id: subCategoryId }).then(function (jsonResult) {
            $scope.productList = jsonResult;
            length = jsonResult.length;
            $scope.totalItems = length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 3;
            $scope.maxSize = 5; //Number of pager buttons to show
            console.log($scope.productList);
            $scope.$apply();
        });
    };

    $scope.viewBrandProduct = function () {
        $scope.product = {};
        var URL = $location.path();
        var brandId = URL.split('/')[2];
        ds.cart.getByBrandProducts.get({ id: brandId }).then(function (jsonResult) {
            $scope.productList = jsonResult;
            console.log($scope.productList);
            $scope.$apply();
        });
    };

    $scope.getSubTotal = function (item) {
        var cartList = rx.json.del($scope.cartList, item);
        if (item.discount !== 0) {
            var withDiscount = (item.discount * item.cost) / 100;
            item.subTotal = ((item.cost - withDiscount) * item.quantity);
        }
        else {
            item.subTotal = (item.cost * item.quantity);
        }
        cartList.push(item);
        $scope.cartList = cartList;
        $scope.getTotal();
    };

    $scope.calculateDiscount = function () {
        for (var i = 0; i < $scope.cartList.length; i++) {
            if ($scope.cartList[i].discount !== 0) {
                var withDiscount = ($scope.cartList[i].discount * $scope.cartList[i].cost) / 100;
                $scope.cartList[i].subTotal = (($scope.cartList[i].cost - withDiscount) * $scope.cartList[i].quantity);
            }
            else {
                $scope.cartList[i].subTotal = ($scope.cartList[i].cost * $scope.cartList[i].quantity);
            }
        }
    };

    $scope.getTotal = function () {
        var array = $scope.cartList.map(a => a.subTotal);
        $scope.total = rx.linq(array).sum("a=>a");
    };

    $scope.refresh = function (cartList) {
        var userId = parseInt(localStorage.getItem('userRef'));
        if (cartList !== null && cartList !== undefined) {

            var cartLists = {
                cartModel: cartList
            };
            ds.cart.putCarts.put(cartLists).then(function (jsonResult) {
                if (jsonResult.message === "Not enough in stock!") {
                    rx.log.error("Not enough item in stock");
                    item.quantity = jsonResult.quantity;
                }
                response.redirect('/reviewProduct');
                $scope.$apply();
            });
        }
        else {
            alert("Not valid entry");
        }
    };

    $scope.reviewProducts = function () {
        var userId = parseInt(localStorage.getItem('userRef'));
        ds.cart.getByCarts.get({ id: userId }).then(function (jsonResult) {
            $scope.cartList = jsonResult;
            $scope.getTotal();
            $scope.$apply();
        });
    };

    $scope.shipOrder = function (ship) {
        var id = parseInt(localStorage.getItem('userRef'));

        if (ship !== null && ship !== undefined) {
            var ships = {
                firstName: ship.firstName,
                lastName: ship.lastName,
                email: ship.email,
                userId: id,
                contact: ship.contact,
                shippingAddress: ship.address,
                country: ship.country,
                state: ship.state,
                pinCode: ship.zipCode
            };
            ds.cart.postShippingDetail.post(ships).then(function (jsonResult) {
                shipping = ship;
                response.redirect('/reviewProduct');
                $scope.$apply();
                rx.progress.hide();
            });
        }
        else {
            rx.log.error("Error");
        }
    };

    $scope.initCheckOut = function () {
        var userId = parseInt(localStorage.getItem('userRef'));
        var ship = shipping;
        ds.cart.getByCarts.get({ id: userId }).then(function (jsonResult) {
            $scope.cartList = jsonResult;
            $scope.getTotal();
            $scope.$apply();
        });
    };

    $scope.getAddress = function () {
        var userId = parseInt(localStorage.getItem('userRef'));
        ds.cart.getByShippingDetail.get({ id: userId }).then(function (jsonResult) {
            $scope.shippingDetail = jsonResult;
            $scope.$apply();
        });
    };

    $scope.selectedAddress = function (item) {
        var id = item.shippingId;
        $scope.shipId = id;
        $scope.$apply();
    };

    $scope.proceedToPay = function (cartList, shipId) {
        var userId = parseInt(localStorage.getItem('userRef'));
        if ($scope.cartList !== null && $scope.cartList !== undefined) {
            var orders = {
                amount: $scope.total,
                shippingId: shipId,
                userId: userId,
                orderStatus: false
            }
            ds.cart.postOrders.post(orders).then(function (jsonResult) {
                response.redirect('/checkOut/' + jsonResult.data);
                $scope.$apply();
            });
        };
    };

}]);