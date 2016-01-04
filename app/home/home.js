/**
 * Created by vakamat on 12/26/2015.
 */
'use strict';

var movieManiaApp = angular.module('movieManiaApp', ['ngAnimate', 'ngRoute']);

movieManiaApp.controller('MovieListController',
    function ($scope, $http) {
        $http({
            method: 'GET',
            url: '/app/data/movies_list.json'
        }).then(function successCallback(response) {
            $scope.movies = response.data;
        }, function errorCallback(response) {
            $scope.movies = [];
        });
    }
);

movieManiaApp.controller('MovieDetailController', ['$scope', '$routeParams','$http',
    function ($scope, $routeParams, $http) {
        $scope.movieId = $routeParams.movieId;
        $http({
           // method: 'JSONP', //To overcome cross-domain access issue
           // url: 'http://m.imdb.com/title/json/usercomments?callback=JSON_CALLBACK&tconst='+$routeParams.movieId+'&start=0&limit=1'
            method : 'GET',
            url : '/app/data/movie-detail-'+$routeParams.movieId+'.json'
        }).then(function successCallback(response) {
            $scope.movieDetail = response.data;
        }, function errorCallback(response) {
            $scope.movieDetail = null;
        });
    }]
);

movieManiaApp.directive('mmPopularity', function () {
    return {
        restrict: 'E',
        scope: {
            moviePop: '=pop'
        },
        templateUrl: 'mm-popularity-iso.html'
    };
});

movieManiaApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/movies', {
            templateUrl: 'movie-list.html',
            controller: 'MovieListController'
        }).
        when('/movies/:movieId', {
            templateUrl: 'movie-detail.html',
            controller: 'MovieDetailController'
        }).
        otherwise({
            redirectTo: '/movies'
        });
    }]
);



