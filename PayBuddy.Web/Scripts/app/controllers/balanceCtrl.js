app.controller("balanceCtrl", ['$scope', '$location', 'ds', 'response', function balanceCtrl($scope, $location, ds, response) {

    $scope.initBalance = function () {
        var myTabObj = [
            {
                "title": "Withdraw",
                "url": "/Templates/User/Balance/Withdraw.html",
                "selected": true,
                "icon": "fa fa-balance-scale",
                "iconTitle": " Withdraw"
            },
            {
                "title": "Deposit",
                "url": "/Templates/User/Balance/Deposit.html",
                "icon": "fa fa-briefcase",
                "iconTitle": " Deposit"
            }
        ];
        $scope.myTabObj = myTabObj;
        $scope.myActiveTab = 0;
        $scope.myChangeData = true;
        $scope.cssclass = {
            headerclass: "sidebar-right-control",
            contentclass: "sidebar-right-content"
        };
    };

    $scope.withdraw = function () {
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

    $scope.withdrawMoney = function (transfer) {
        var userId = parseInt(localStorage.getItem('userRef'));
        if ((transfer != null) && (transfer != undefined)) {
            var withdrawal =
                {
                    accountHolderName: transfer.name,
                    amount: transfer.amount,
                    userId: userId,
                    bankId: transfer.bank,
                    accountNumber: transfer.accountNo,
                    IFSC: transfer.ifsc,
                    comment: "hello world"
                }
            ds.transaction.postWithdraw.post(withdrawal).then(function (jsonResult) {
                var balance = $scope.balance - transfer.amount;
                $scope.balance = balance;
                $scope.$apply();
            });
        }
        else {
            rx.log.error("Error");
        }
    };

    $scope.deposit = function () {
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

    $scope.depositMoney = function (transfer) {
        var dType = parseInt($scope.deposit.depositType);
        var userId = parseInt(localStorage.getItem('userRef'));
        if (transfer != null && transfer != undefined) {
            if (dType == 6 || dType == 7) {
                var card = {
                    CardNumber: transfer.cardNumber,
                    CVV: transfer.cvv,
                    DepositAmount: transfer.amount,
                    DepositTypeId: dType,
                    UserId: userId
                };
                ds.transaction.postDeposit.post(card).then(function (jsonResult) {
                    var balance = $scope.balance + transfer.amount;
                    $scope.balance = balance;
                    $scope.$apply();
                });
            }
            else if (dType == 5) {
                var bank = {
                    accountHolderName: transfer.name,
                    accountNumber: transfer.accountNumber,
                    depositAmount: transfer.amount,
                    IFSC: transfer.IFSC,
                    UserId: userId,
                    DepositTypeId: dType,
                };
                ds.transaction.postDeposit.post(bank).then(function (jsonResult) {
                    var balance = $scope.balance + transfer.amount;
                    $scope.balance = balance;
                    response.redirect('/balance/:userId');
                    $scope.$apply();
                });
            }
            else {
                rx.log.error("Error");
            }
        }

    };

}]);