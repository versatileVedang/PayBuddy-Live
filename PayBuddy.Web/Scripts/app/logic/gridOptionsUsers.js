app.factory('gridOptionsUsers', function gridOptionsUsers() {
    var option = {
        usersGrid: {
            gridCss: {
                tableCss: 'table display datatable table-bordered',
                tableHeadingRowCss: 'headingCenter',
                showTextCss: "row-hyperlink"
            },
            gridMaster: {
                allowMultipleColumSorting: true,
                primaryKey: 'userId',
                pageSize: 10,
                gridName: 'usersGrid',
                showFooterPagging: true,
                itemName: 'Users'
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
                                templatePath: 'Templates/Admin/Users/ViewUser/ViewUser.html',
                                columnCss: "actioncss col-lg-1 col-xs-1",
                                tooltip: {
                                    title: "View",
                                    trigger: "hover",
                                    placement: "top"
                                },
                                eventIdentity: "view"
                            },

                            {
                                iconCss: "glyphicon glyphicon-remove-circle",
                                templatePath: 'Templates/Admin/Users/DeleteUser/DeleteUser.html',
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
                        headerText: "UserId",
                        dataField: "userId",
                        columnCss: "userCSS",
                        activeColumn: true,
                        isDataColumn: true,
                        tooltip: true

                    },

                    {
                        columnType: "textColumn",
                        headerText: "First Name",
                        dataField: "firstName",
                        columnCss: "userCSS",
                        activeColumn: true,
                        isDataColumn: true,
                        tooltip: true

                    },
                    {
                        columnType: "textColumn",
                        headerText: "Last Name",
                        dataField: "lastName",
                        columnCss: "userCSS",
                        activeColumn: true,
                        isDataColumn: true,
                        tooltip: true

                    },
                    {
                        columnType: "textColumn",
                        headerText: "Email",
                        dataField: "email",
                        columnCss: "userCSS",
                        activeColumn: true,
                        isDataColumn: true,
                        tooltip: false
                    },
                    {
                        columnType: "textColumn",
                        headerText: "Contact",
                        dataField: "contact",
                        columnCss: "userCSS",
                        activeColumn: true,
                        isDataColumn: true,
                        tooltip: false
                    },
                    {
                        columnType: "textColumn",
                        headerText: "Address",
                        dataField: "address",
                        columnCss: "userCSS",
                        activeColumn: true,
                        isDataColumn: true,
                        tooltip: false
                    },
                    {
                        columnType: "textColumn",
                        headerText: "Gender",
                        dataField: "gender",
                        columnCss: "userCSS",
                        activeColumn: true,
                        isDataColumn: true,
                        tooltip: false
                    },
                    {
                        columnType: "textColumn",
                        headerText: "Balance",
                        dataField: "balance",
                        columnCss: "userCSS",
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



