
app.controller("adminCtrl", ["$scope", "ds", "response", "request", "gridOptionsUsers", "gridOptionsProducts", "rxData", "rxPopup", "$location", function adminCtrl($scope, ds, response, request, gridOptionsUsers, gridOptionsProducts, rxData, rxPopup, $location) {

    $scope.initAdmin = function () {
        $scope.displayName = localStorage.getItem("name");
    };

    $scope.signOut = function () {
        localStorage.removeItem("name");
        window.open("Index#/signIn", "_ self");
    };

    //----------------------------------------------SEARCHLIST-----------------------------------------------

    $scope.userAutoFilter = function () {
        if (!angular.isUndefined($scope.searchInput)) {
            $scope.usersGrid.autoFilter($scope.searchInput);
        }
        else {
            rx.log.warning("Please enter search input.");
        }
    };

    $scope.productAutoFilter = function () {
        if (!angular.isUndefined($scope.searchInput)) {
            $scope.productsGrid.autoFilter($scope.searchInput);
        }
        else {
            rx.log.warning("Please enter search input.");
        }
    };

    $scope.userResetSearch = function () {
        $scope.searchInput = undefined;
        $scope.usersGrid.resetSearch();
        rx.log.success("Grid Reset Successfully.");

    };

    $scope.productResetSearch = function () {
        $scope.searchInput = undefined;
        $scope.productsGrid.resetSearch();
        rx.log.success("Grid Reset Successfully.");
    };

    
    //-----------------------------------------------USERS---------------------------------------------------



    $scope.initGetUser = function () {
        $scope.user = {};
        rx.progress.show();
        ds.admin.getUsers.get().then(function (jsonResult) {
            rx.progress.hide();
            $scope.userList = jsonResult;
            for (var user in jsonResult) {
                jsonResult[user].salt = null;
                jsonResult[user].password = null;
                jsonResult[user].roleId = null;
                if (jsonResult[user].genderId === 1) {
                    $scope.userList[user].gender = "Male";
                }
                else {
                    $scope.userList[user].gender = "Female";
                }
            }
            $scope.usersGrid = jsonResult;
            $scope.usersGridOption = gridOptionsUsers.usersGrid;
            $scope.$apply();
        });
    };

    $scope.deleteUser = function () {
        var user = rxData[rxData.activeGrid].row;
        ds.admin.deleteUsers.del(user).then(function (jsonResult) {
            rxData.rowDelete(rxData.activeGrid);
            $scope.$apply();
            rx.log.success("User Deleted Successfully.");
        });
    };

    $scope.initViewUser = function () {
        var userId = rxData[rxData.activeGrid].row.userId;
        ds.admin.getByUsers.get({ id: userId }).then(function (jsonResult) {
            if (jsonResult !== null) {
                $scope.user = jsonResult;
                if (jsonResult.genderId === 1) {
                    $scope.user.gender = "Male";
                }
                else {
                    $scope.user.gender = "Female";
                }
            }
            $scope.$apply();
        });
    };

    $scope.closeView = function () {
        rxPopup.hidePopup();
    };

    //----------------------------------------------PRODUCTS-------------------------------------------------

   

    $scope.initGetProduct = function () {
        $scope.product = {};
        rx.progress.show();
        ds.admin.getProducts.get().then(function (jsonResult) {
            $scope.productList = jsonResult;
            $scope.productsGrid = jsonResult;
            $scope.productsGridOption = gridOptionsProducts.productsGrid;
            rx.progress.hide();
            $scope.$apply();
        });
    };

    $scope.postProduct = function (product) {
        var productDiscountId = parseInt(product.discount);
        var productSubCategoryId = parseInt(product.subCategory);
        var productBrandId = parseInt(product.brand);
        if ($scope.product !== null && $scope.product !== undefined) {
            var products = {
                productName: product.productName,
                productDate: product.productDate,
                productDescription: product.productDescription,
                quantity: product.quantity,
                cost: product.cost,
                comment: product.comment,
                discountId: productDiscountId,
                subCategoryId: productSubCategoryId,
                brandId: productBrandId,
                productImage: $scope.productImage
            };
            ds.admin.postProducts.post(products).then(function (jsonResult) {
                response.redirect('/productList');
                $scope.$apply();
                rx.progress.hide();
                rx.log.success("Product Added Successfully.");
            });
        }
        else {
            rx.log.error("Error");
        }
    };

    $scope.getImageUploaded = function (file) {
        var fileExtension = file.type.toLowerCase();
        if (fileExtension === "png" || fileExtension === "bmp" || fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "gif" || fileExtension === "jfif") {
            $scope.productImageName = file.Name;
            $scope.imageUpload = file.url;
            $scope.productImage = file.FileContent;
        }
    };

    $scope.initPutProduct = function () {
        rx.progress.show();
        var productId = request.queryString("productId");
        ds.admin.getByProducts.get({ id: productId }).then(function (jsonResult) {
            $scope.product = jsonResult;
            $scope.imageUpload = jsonResult.productImageBaseString;
            rx.progress.hide();
            $scope.$apply();
        });
    };

    $scope.updateProduct = function (product) {
        if ($scope.product !== null && $scope.product !== undefined) {
            var products = {
                productId: product.productId,
                productName: product.productName,
                productDescription: product.productDescription,
                quantity: product.quantity,
                cost: product.cost,
                comment: product.comment,
                discount: product.discount,
                subCategory: product.subCategory,
                brand: product.brand,
                productImage: $scope.productImage,
                productImageBaseString: $scope.imageUpload
            };
            ds.admin.putProducts.put(products).then(function (jsonResult) {
                response.redirect('/productList');
                $scope.$apply();
                rx.progress.hide();
                rx.log.success("Product Updated Successfully.");
            });
        }
        else {
            rx.log.error("Error");
        }
    };

    $scope.deleteProduct = function () {
        var product = rxData[rxData.activeGrid].row;
        ds.admin.deleteProducts.del(product).then(function (jsonResult) {
            rxData.rowDelete(rxData.activeGrid);
            $scope.$apply();
            rx.log.success("Product Deleted Successfully.");
        });
    };

    $scope.initViewProduct = function () {
        var productId = rxData[rxData.activeGrid].row.productId;
        ds.admin.getByProducts.get({ id: productId }).then(function (jsonResult) {
            if (jsonResult !== null) {
                $scope.product = jsonResult;
            }
            $scope.$apply();
        });
    };

}]);
