angular.module('Reports')
    .factory('AuthenticationService', function($http) {
        var user = null;
        var roles = null;
        var TOKEN_KEY = 'jwtToken';

        var getJwtToken = function() {
            return localStorage.getItem(TOKEN_KEY);
        };

        var setJwtToken = function(token) {
            localStorage.setItem(TOKEN_KEY, token);
        };

        var removeJwtToken = function() {
            localStorage.removeItem(TOKEN_KEY);
        };

        var createAuthorizationTokenHeader = function() {
            var token = getJwtToken();
            if (token) {
                return {
                    "Authorization": "Bearer " + token,
                    'Content-Type': 'application/json'
                };
            } else {
                return {
                    'Content-Type': 'application/json'
                };
            }
        }

        var getUser = function() {
            return $http({
                headers: createAuthorizationTokenHeader(),
                method: 'GET',
                url: '/user'
            });
        };

        return {
            getUser: getUser,
            getJwtToken: getJwtToken,
            setJwtToken: setJwtToken,
            removeJwtToken: removeJwtToken,
            createAuthorizationTokenHeader: createAuthorizationTokenHeader
        };
    });
