'use strict';

angular.module('app')
  .factory('authToken', function ($window) {

    var storage = $window.localStorage;
    var cachedToken;
    var cachedUser;

    var userToken = 'userToken';
    var userId = 'userId';
    var userEmail = 'userEmail';
    var companyId = 'companyId';
    var masterAdmin = 'masterAdmin';
    
    
    
    var authToken =  {
        setToken: function(token){
          cachedToken = token;
          storage.setItem(userToken,token);
        },
        setUser:function(user){
            storage.setItem(userId,user.userId);
            storage.setItem(userEmail,user.email);
            storage.setItem(companyId,user.companyId);
            storage.setItem(masterAdmin,user.masterAdmin);
        },
        getUser:function(){
            if(!cachedUser){
                cachedUser = {userId:storage.getItem(userId),
                    userEmail:storage.getItem(userEmail),
                    companyId:storage.getItem(companyId),
                    masterAdmin:storage.getItem(masterAdmin)
                }
            }
            
            return cachedUser;

        },
        getToken:function(){
            if(!cachedToken)
                cachedToken = storage.getItem(userToken);
            
            return cachedToken;
        },
        isAuthenticated: function(){
            return !!authToken.getToken();
        },
        removeToken: function(){
            cachedToken = null;
            cachedUser = null;
            storage.removeItem(userToken);
            storage.removeItem(userId);
            storage.removeItem(userEmail);
            storage.removeItem(companyId);
            storage.removeItem(masterAdmin);
            
        }
    }
    
    return authToken;
  });
