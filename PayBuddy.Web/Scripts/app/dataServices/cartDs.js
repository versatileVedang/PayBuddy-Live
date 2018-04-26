'use strict';
app.factory("cartDs", ['clientcontext', function cartDs(clientcontext) {
    var key = 'cartDs',
        cartDs =
            {
                getby:
                {
                    Carts: 'api/cart',
                    SubCategoryProducts: 'api/product/getSubCategoryProduct',
                    CategoryProducts: 'api/product/getCategoryProduct',
                    BrandProducts: 'api/product/getBrandProduct',
                    ShippingDetail: 'api/shippingDetail'
                
                },

                get:
                {
                   
                },

                post:
                {
                    Carts: 'api/cart',
                    ShippingDetail: 'api/shippingDetail',
                    Orders: '/api/order'

                },

                del:
                {
                    CartItem: '/api/cart/deleteCartItem',
                    Carts: '/api/cart/deleteCart'
                },
                put:
                {
                    Carts: 'api/cart'
                }
            };

    return clientcontext.initializeApi(cartDs, key);

}]);