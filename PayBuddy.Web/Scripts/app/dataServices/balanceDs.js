'use strict';
app.factory("balanceDs", ['clientcontext', function balanceDs(clientcontext)
{
    var key = 'balanceDs',
        balanceDs =
            {
                getby:
                {
                     Balance: 'api/balance/getBalance'
                },

                get:
                {
                    Balance: '/api/balance'
                },

                post:
                {
                    Balance :'/api/balance'
                },
            };

    return clientcontext.initializeApi(balanceDs, key);

}]);