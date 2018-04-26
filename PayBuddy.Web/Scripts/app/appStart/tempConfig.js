app.constant('tempConfig',
    {
        hashurl: {
            signIn: '/signIn',
            signUp: '/signUp',
            forgotPassword: '/forgotPassword',
            dashboard: '/dashboard',
            putUser: '/putUser/:userId',
            userList: '/userList',
            productList: '/productList',
            postProduct: '/postProduct',
            putProduct: '/putProduct/:productId',
            productSubCategory: '/productSubCategory/:subCategoryId',
            productCategory: '/productCategory/:categoryId',
            productBrand: '/productBrand/:brandId',
            shoppingCart: '/shoppingCart',
            reviewProduct: '/reviewProduct',
            balance: '/balance/:userId',
            checkOut: '/checkOut/:orderId',
            addShipmentAddress: '/addShipmentAddress',
            thankYou: '/thankYou/:orderId',
        },
        controllers: {

            userAuthenticationCtrl: 'userAuthenticationCtrl',
            userCtrl: 'userCtrl',
            adminCtrl: 'adminCtrl',
            cartCtrl: 'cartCtrl'
        },
        getTemplate: function (tmplname) {
            return "Templates/" + tmplname + ".html";
        }
    });