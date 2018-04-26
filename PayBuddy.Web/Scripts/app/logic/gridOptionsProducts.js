app.factory('gridOptionsProducts', function gridOptionsProducts() {
    var option = {
        productsGrid: {
            gridCss: {
                tableCss: 'table display datatable table-bordered',
                tableHeadingRowCss: 'headingCenter',
                showTextCss: "row-hyperlink"
            },
            gridMaster: {
                allowMultipleColumSorting: true,
                primaryKey: 'productId',
                pageSize: 10,
                gridName: 'productsGrid',
                showFooterPagging: true,
                itemName: 'Products'
            },
            masterTableView: {
                columns: [
                    {
                        columnType: "actionsColumn",
                        headerText: "Action",
                        columnCss: "userCSS",
                        divClass: "width-100",
                        actions: [
                            {
                                iconCss: "glyphicon glyphicon-eye-open",
                                templatePath: 'Templates/Admin/Products/ViewProduct/ViewProduct.html',
                                columnCss: "actioncss col-lg-1 col-xs-1",
                                tooltip: {
                                    title: "View",
                                    trigger: "hover",
                                    placement: "top"
                                },
                                eventIdentity: "view"
                            },
                            {
                                iconCss: "glyphicon glyphicon-edit",
                                navigateUrl: '/' + 'putProduct' + '/:productId',
                                columnCss: "actioncss col-lg-1 col-xs-1",
                                tooltip: {
                                    title: "Edit",
                                    trigger: "hover",
                                    placement: "top"
                                },
                                eventIdentity: "edit"
                            },
                            {
                                iconCss: "glyphicon glyphicon-remove-circle",
                                templatePath: 'Templates/Admin/Products/DeleteProduct/DeleteProduct.html',
                                columnCss: "actioncss col-lg-1 col-xs-1",
                                tooltip: {
                                    title: "Delete",
                                    trigger: "hover",
                                    placement: "top"
                                },
                                eventIdentity: "delete"
                            }
                        ]
                    },
                    {
                        columnType: "textColumn",
                        headerText: "ProductId",
                        dataField: "productId",
                        columnCss: "productCSS",
                        activeColumn: true,
                        isDataColumn: true,
                        tooltip: true
                    },
                    {
                        columnType: "textColumn",
                        headerText: "ProductDate",
                        dataField: "productDateBaseString",
                        columnCss: "productCSS",
                        activeColumn: true,
                        isDataColumn: true,
                        tooltip: true
                    },
                    {
                        columnType: "textColumn",
                        headerText: "Product Name",
                        dataField: "productName",
                        columnCss: "productCSS",
                        activeColumn: true,
                        isDataColumn: true,
                        tooltip: true
                    },
                    {
                        columnType: "textColumn",
                        headerText: "Product Description",
                        dataField: "productDescription",
                        columnCss: "productCSS",
                        activeColumn: true,
                        isDataColumn: true,
                        tooltip: false
                    },
                    {
                        columnType: "textColumn",
                        headerText: "Quantity",
                        dataField: "quantity",
                        columnCss: "productCSS",
                        activeColumn: true,
                        isDataColumn: true,
                        tooltip: false
                    },
                    {
                        columnType: "textColumn",
                        headerText: "Cost",
                        dataField: "cost",
                        columnCss: "productCSS",
                        activeColumn: true,
                        isDataColumn: true,
                        tooltip: false
                    },
                    {
                        columnType: "textColumn",
                        headerText: "Discount",
                        dataField: "discount",
                        columnCss: "productCSS",
                        activeColumn: true,
                        isDataColumn: true,
                        tooltip: false
                    },
                    {
                        columnType: "textColumn",
                        headerText: "SubCategory",
                        dataField: "subCategory",
                        columnCss: "productCSS",
                        activeColumn: true,
                        isDataColumn: true,
                        tooltip: false
                    },
                    {
                        columnType: "textColumn",
                        headerText: "Brand",
                        dataField: "brand",
                        columnCss: "productCSS",
                        activeColumn: true,
                        isDataColumn: true,
                        tooltip: false
                    },
                    {
                        columnType: "imageColumn",
                        headerText: "Product Image",
                        dataField: "productImageBaseString",
                        columnCss: "productCSS",
                        imageCss: "myImageClass",
                        activeColumn: true,
                        isDataColumn: true,
                        tooltip: true
                    },
                    {
                        columnType: "textColumn",
                        headerText: "Comment",
                        dataField: "comment",
                        columnCss: "productCSS",
                        activeColumn: true,
                        isDataColumn: true,
                        tooltip: false
                    }
                ]
            }
        }
    };
    return option;
});



