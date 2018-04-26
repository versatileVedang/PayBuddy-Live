'use strict';
app.factory("transactionDs", ['clientcontext', function transactionDs(clientcontext) {
    var key = 'transactionDs',
        transactionDs =
            {
                getby:
                {

                },

                get:
                {
                    Balance: '/api/balance'
                },

                post:
                {
                    Withdraw: 'api/withdraw',
                    Deposit: 'api/deposit',
                    Checkout: '/api/orderDetail'
                },
            };

    return clientcontext.initializeApi(transactionDs, key);

}]);