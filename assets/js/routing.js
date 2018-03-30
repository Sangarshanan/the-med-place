"use strict";

angular.module('routing', ['ngRoute'])

.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'homeController',
			templateUrl: 'partials/home.html',
		})
		.when('/shop', {
			templateUrl: 'partials/shop.html',
		})
		.when('/products/:productId', {
			controller:'productDetail',
			templateUrl: 'partials/product-detail.html'
		})
		.when('/cart', {
			controller:'cartController',
			templateUrl: 'partials/cart.html'
		})
		.when('/about', {
			controller:'aboutController',
			templateUrl: 'partials/about.html'
		})
		.when('/contact', {
			controller:'contactController',
			templateUrl: 'partials/contact.html'
		})
		.when('/confirmation', {
			controller:'confirmationController',
			templateUrl: 'experience/confo.html'
		})
		.when('/team', {
			controller:'teamController',
			templateUrl: 'partials/team.html'
		})
		.when('/experience', {
			controller:'teamController',
			templateUrl: 'partials/experience.html'
		})


		.otherwise({
			redirecTo: '/'
		});

})
