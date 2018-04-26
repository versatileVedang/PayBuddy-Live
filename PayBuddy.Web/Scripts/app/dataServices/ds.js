'use strict';
app.factory("ds", ['userDs', 'adminDs', 'cartDs', 'balanceDs', 'transactionDs', function ds(userDs, adminDs, cartDs, balanceDs, transactionDs) {
    return {
        user: userDs,
        admin: adminDs,
        cart: cartDs,
        balance: balanceDs,
        transaction: transactionDs
    };
}]);