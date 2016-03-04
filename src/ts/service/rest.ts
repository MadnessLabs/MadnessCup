/// <reference path="../../tsd/angularjs/angular.d.ts"/>

module MadnessCup {
	class RestService {

		constructor(protected $http: any, protected $q: any, protected $httpParamSerializer, protected $rootScope) {
            // On Load
		}

		get(rUrl, rParams = false, silent = false) {
            if (!silent) {
                this.$rootScope.$broadcast('loading:show');
            }

			if (rParams) {
				rParams = this.$httpParamSerializer(rParams);
			}
			var deferred = this.$q.defer();
			this.$http.get(rUrl, rParams, {
				headers: {
					'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
				}
			})
			.success(function(data, status, headers, config) {
                if (!silent) {
                	this.$rootScope.$broadcast('loading:hide');
                }
				deferred.resolve(data);
			}.bind(this))
			.error(function(data, status, headers, config) {
                if (!silent) {
                    this.$rootScope.$broadcast('loading:hide');
                }
				console.log('Failed to Get Data from: ' + rUrl);
			}.bind(this));
			
			return deferred.promise;
		}

		post(rUrl, rParams = false, silent = false) {
            if (!silent) {
                this.$rootScope.$broadcast('loading:show');
            }
			
            if (rParams) {
                rParams = this.$httpParamSerializer(rParams);
            }
            
			var deferred = this.$q.defer();
			this.$http.post(rUrl, rParams, {
				headers: {
					'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
				}
			})
			.success(function(data, status, headers, config) {
                if (!silent) {
                    this.$rootScope.$broadcast('loading:hide');
                }
				deferred.resolve(data);
			}.bind(this))
			.error(function(data, status, headers, config) {
                if (!silent) {
                    this.$rootScope.$broadcast('loading:hide');
                }
				console.log('Failed to Post Data to: ' + rUrl);
			}.bind(this));

			return deferred.promise;
		}

        upload(rUrl, rParams = false, silent = false) {
            var fd = new FormData();

            angular.forEach(rParams, function(val, key){
                fd.append(key, val);
            });
                
            if (!silent) {
                this.$rootScope.$broadcast('loading:show');
            }

            var deferred = this.$q.defer();
            this.$http.post(rUrl, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-type': undefined
                }
            })
            .success(function(data, status, headers, config) {
                if (!silent) {
                    this.$rootScope.$broadcast('loading:hide');
                }
                deferred.resolve(data);
            }.bind(this))
            .error(function(data, status, headers, config) {
                if (!silent) {
                    this.$rootScope.$broadcast('loading:hide');
                }
                console.log('Failed to Get Data from: ' + rUrl);
            }.bind(this));

            return deferred.promise;
        }
        
	}

	angular.module('MadnessCup').service('Rest', RestService);
}