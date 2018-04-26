rx.appConfiguration = {
    grid: {},
    date: {
        culture: 'en-us',
        format: 'mm/dd/yy'
    },
    log: {
        warning: true,
        success: false,
        error: true,
    },
    fileUpload: {
        acceptFileTypes: ''
    },
    notification: {
        toastr: {

        },
        success: true,
        error: true,
        warning: true,

    },
    loader: {
        loaderId: 'rxLoad',
        loadInClass: 'rxloadin',
        loadOutClass: 'rxloadout',
        html: '<div class="wait-box" style="position:absolute; top:40%; left:48%">' +
        '<center>' +
        //'<img src="Content/SystemTheme/img/big-progress.gif" class="wait-image"><div class="wait-message"></div>' +
        '</center>' +
        '</div>'
    },
    required: {
        valid: 'rx-valid',
        invalid: 'rx-invalid'
    },
    clientContext: {
        beforeSend: function (xhr) {
            if (!angular.isUndefined(rx.cache.global.get("oauth"))) {
                var authorization = rx.cache.global.get("oauth");
                xhr.setRequestHeader("Authorization", authorization);
            }

            if (!angular.isUndefined(rx.cache.global.get("sauth"))) {
                var session = rx.cache.global.get("sauth");
                xhr.setRequestHeader("x-session", session);
            }
            return true;
        },
        requestDecoder: function (data, status, xhr, success, error) {
            var authorization = xhr.getResponseHeader("Authorization");
            if (authorization != undefined) {
                rx.cache.global.save("oauth", authorization);
            }

            var session = xhr.getResponseHeader("x-session");
            if (session != undefined) {
                rx.cache.global.save("sauth", session);
            }
            if (xhr.status == 406) {
                if (localStorage.isSessionExpired == undefined) {
                    localStorage.clear();
                    sessionStorage.clear();
                    localStorage.isSessionExpired = true;
                    rx.log.error('Session Expired');
                    document.cookie = '__RequestVerificationToken=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
                    var t = setTimeout(function () {
                        window.open("index", "_self");
                        localStorage.isSessionExpired = undefined;
                    }, 500);
                }
                return true;
            }
            else if (xhr.status == 401) {
                window.open("Unauthorized", "_self");
            }

            if (xhr.status == 200 || status === "success" || xhr.status == 204) {
                return true;
            }
        }
    }
}


