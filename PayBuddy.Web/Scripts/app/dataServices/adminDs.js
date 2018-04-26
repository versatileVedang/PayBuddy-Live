'use strict';
app.factory("adminDs", ['clientcontext', function adminDs(clientcontext) {
    var key = 'adminDs',
        adminDs = {
            getby:
            {
                Users: '/api/user/getUser',
                Products: '/api/product/getProduct'
            },

            get:
            {
                Users: '/api/user',
                Products: '/api/product'
            },

            post:
            {
                Products: '/api/product'
            },

            del:
            {
                Users: '/api/user',
                Products: '/api/product'
            },

            put:
            {
                Products: '/api/product'
            }
        };
    return clientcontext.initializeApi(adminDs, key);
}]);