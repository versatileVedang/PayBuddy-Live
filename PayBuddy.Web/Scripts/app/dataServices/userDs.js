'use strict';
app.factory("userDs", ['clientcontext', function userDs(clientcontext) {
    var key = 'userDs',
        userDs = {
            getby:
            {
                    Users: '/api/user/getUser',
                    Count: '/api/user/getCount'
            },

            post:
            {
                Users: '/api/user',
                UserAuthentication: '/api/userAuthentication'
            },

            put:
            {
                Users: '/api/user',
                ForgotPassword: '/api/userAuthentication'
            }
        };
    return clientcontext.initializeApi(userDs, key);
}]);