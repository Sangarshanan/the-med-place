"use strict";
var app = angular.module('store', ['routing', 'ngStorage', 'ui.bootstrap', 'angularValidator', 'ngResource', 'angular-flexslider', 'productFactory', 'ng.deviceDetector']);

app.run(function ($rootScope) {

    //Switch this value between your test and live Publishable key
    $rootScope.key = 'pk_test_nwAgb18io4WLRQx5SNob1P8G';

    //Change this values for your social medias
    $rootScope.facebook = 'http://facebook.com';
    $rootScope.pinterest = 'https://www.pinterest.com/';
    $rootScope.google = 'https://plus.google.com';

    //Change this value for your real email. Used to display it on confirmation page
    $rootScope.email_contact = 'sangarshanan1998@gmail.com';

    $rootScope.$on('$routeChangeSuccess', function(event, current) {
        if(current.$$route.originalPath  != "/" && $(window).width() < 768)
            $('.header-wrapper').addClass('mobile-top-bar');
        else
            $('.header-wrapper').removeClass('mobile-top-bar');
    });
});

app.service("Global", function () {
    this.total = 0;
});

app.controller('homeController', ['$scope', function ($scope) {

    //Replace each url with your images path to be use on the slider
    $scope.sliders = [
        {url: 'assets/img/slider1.jpg'},
        {url: 'assets/img/slider2.jpg'},
        {url: 'assets/img/slider3.jpg'}
    ];

}]);

app.controller('mainController', ['$scope', '$localStorage', '$rootScope', 'Global', '$location', 'productFactory', 'deviceDetector', function ($scope, $localStorage, $rootScope, Global, $location, productFactory, deviceDetector) {

    $rootScope.display_menu = false;

    $scope.facebook = $rootScope.facebook;
    $scope.pinterest = $rootScope.pinterest;
    $scope.google = $rootScope.google;


    $scope.open_menu = function () {
        $rootScope.display_menu = true;
    };

    $scope.hide_menu = function () {
        $rootScope.display_menu = false;
    };

    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };

    $scope.Global = Global;
    $scope.Global.total = $localStorage.myTotal || 0;

    $scope.cart = $localStorage.myObj || [];

    $scope.products = [];
    $scope.categories = [];
    $scope.newestProduct = [];
    $scope.clientId = $rootScope.clientId;
    $scope.highPrice = 'name';

    $scope.products = productFactory.products;

    $scope.allCategories = [];
    for (var i = 0; i < $scope.products.length; i++) {
        $scope.allCategories.push($scope.products[i].category);
    }

    $.each($scope.allCategories, function (i, element) {
        if ($.inArray(element, $scope.categories) === -1) $scope.categories.push(element);
    });


    $('#preloader').delay(200).fadeOut(200);

    $scope.loadimage = function (img) {
        var res = img;

        if (typeof (img) != 'undefined' && img != '') {
            var list = img.split(';');

            if (list.length > 0)
                res = list[0];
            return "assets/img/" + res;
        }
    };

    $scope.changeQty = function (qty, index) {
        $scope.allCart = $localStorage.myObj;
        $scope.Global.total = $localStorage.myTotal;
        $scope.otroTotal = 0;

        if ($scope.allCart[index].productQty > 0) {
            for (var i = 0; i < $scope.allCart.length; i++) {
                $scope.otroTotal += $scope.allCart[i].productPrice * $scope.allCart[i].productQty;
                $localStorage.myTotal = $scope.otroTotal;
            }
        } else {
            $scope.allCart[index].productQty = 1;
            return false;
        }
        $scope.Global.total = $scope.otroTotal;
    };

    var vm = this;
    vm.data = deviceDetector;
    vm.allData = JSON.stringify(vm.data, null, 2);

    $scope.selectExtraClassDetail = '';
    $scope.selectExtraClassShop = '';

    if(vm.data.device === "iphone" || vm.data.device === "ipad"){
        $scope.selectExtraClassDetail = 'selectExtraClassDetail';
        $scope.selectExtraClassShop = 'selectExtraClassShop';
    }

}]);

app.controller('cartController', ['$scope', '$localStorage', 'Global', '$rootScope', '$window', function ($scope, $localStorage, Global, $rootScope, $window) {

    $('.header-wrapper').addClass('top-bar');

    $scope.Global = Global;
    $scope.Global.total = $localStorage.myTotal || 0;
    $scope.allCart = $localStorage.myObj || '';

    $scope.countCart = $scope.allCart.length;

    if ($scope.countCart === 1) {
        $scope.customColumn = 'col-md-offset-3 col-md-6';
    } else if ($scope.countCart === 2) {
        $scope.customColumn = 'col-md-6';
    } else {
        $scope.customColumn = 'col-md-4';
    }

    $scope.counterPlus = function (qty, index) {
        $scope.otroTotal = 0;
        $scope.allCart[index].productQty = qty + 1;

        for (var i = 0; i < $scope.allCart.length; i++) {
            $scope.otroTotal += $scope.allCart[i].productPrice * $scope.allCart[i].productQty;
            $localStorage.myTotal = $scope.otroTotal;
        }
        $scope.Global.total = $scope.otroTotal;
    };

    $scope.counterMinus = function (qty, index) {

        $scope.otroTotal = 0;
        $scope.allCart[index].productQty = qty - 1;

        if ($scope.allCart[index].productQty > 0) {
            for (var i = 0; i < $scope.allCart.length; i++) {
                $scope.otroTotal += $scope.allCart[i].productPrice * $scope.allCart[i].productQty;
                $localStorage.myTotal = $scope.otroTotal;
            }
        } else {
            $scope.allCart[index].productQty = 1;
            return false;
        }
        $scope.Global.total = $scope.otroTotal;
    };


    $scope.deleteProductCart = function (index, price, qty) {

        $scope.allCart = $localStorage.myObj;
        $scope.allCart.splice(index, 1);


        $scope.Global.total -= price * qty;
        $localStorage.myTotal = $scope.Global.total;

        if ($scope.allCart.length === 0) {
            $scope.myCart = false;
            $scope.message = true;
        } else {
            $scope.myCart = true;
            $scope.message = false;
        }
    };

    if (typeof ($scope.allCart) === 'undefined' || $scope.allCart.length === 0) {
        $scope.myCart = false;
        $scope.message = true;
    } else {
        $scope.myCart = true;
        $scope.message = false;
    }


    $scope.stripePayment = function () {
      var total = $scope.Global.total;
      console.log(total);
      $window.alert("Your account has been deducted by $"  + total);
      $window.location = '#confirmation';




    };

}]);

app.controller('productDetail', function ($scope, $http, $routeParams, $localStorage, $rootScope, productFactory, $timeout) {

    $scope.allProducts = productFactory.products;
    $scope.ID = $routeParams.productId;
    $scope.productDetail = {};
    $scope.variation_exist = true

    $scope.isoutstock = function (product) {
        return product.qty > 0;
    };

    $scope.gocart = function () {
        window.location.href = '/#/cart';
    };

    if ($scope.cart.length > 0)
        $scope.showcart = true;
    else
        $scope.showcart = false;

    for (var i = 0; i < $scope.allProducts.length; i++) {
        if ($scope.allProducts[i].productId == $scope.ID) {
            $scope.productDetail = $scope.allProducts[i];

            $scope.images = $scope.productDetail.image.split(';');
            $scope.imageUrl = 'assets/img/' + $scope.images[0];
            $scope.variations = $scope.allProducts[i].variation;
            break;
        }
    }

    if (!$scope.variations)
        $scope.variation_exist = false;

    $scope.variations = $scope.variations.split(',');

    $scope.variationRepeated = function (product, variations) {

        var result = true;

        if (variations === undefined) {
            variations = 1;
            product.variationsselect = 1;
        }

        for (var x = 0; x < product.variationsselect.length; x++) {
            if (product.variationsselect[x] != variations[x]) {
                result = false;
                break;
            }
        }
        return result;
    };

    $scope.update = function () {
        if ($scope.variationsselect) {
            $scope.validate_category = '';
        }
    };


    $scope.addProductDetails = function (product) {

        $scope.validate_category = '';

        if ($scope.variations != '') {
            if (!$scope.variationsselect) {
                $scope.validate_category = 'validate-category';
                return;
            }
        }

        var price = product.price;
        var id = product.productId;
        var name = product.name;
        var path = product.image;

        $scope.showcart = true;
        $scope.Global.total += price;
        $localStorage.myTotal = $scope.Global.total;
        $scope.flag = true;


        if ($scope.cart.length > 0) {

            for (var i = 0; i < $scope.cart.length; i++) {
                if ($scope.cart[i].productId === id && $scope.variationRepeated($scope.cart[i], $scope.variationsselect)) {
                    $scope.cart[i].productQty++;
                    $scope.flag = false;
                    break;
                }
            }

            if ($scope.flag === true) {
                $localStorage.myObj.push({
                    productPrice: price,
                    productId: id,
                    productName: name,
                    productImage: path,
                    productQty: 1,
                    variationsselect: $scope.variationsselect,
                    allvariations: $scope.variations
                });
            }

        }
        else {
            $scope.cart.push({
                productPrice: price,
                productId: id,
                productName: name,
                productImage: path,
                productQty: 1,
                variationsselect: $scope.variationsselect,
                allvariations: $scope.variations
            });
            $localStorage.myObj = $scope.cart;
        }

        $scope.message = 'Product Added To Cart';
        $scope.showMessage = true;

        $timeout(function () {
            $scope.showMessage = false;
        }, 3000);

    };

    $scope.setImage = function (img) {
        $scope.imageUrl = 'assets/img/' + img;
    };

});

app.controller('aboutController', ['$scope', "$rootScope", function ($scope, $rootScope) {

    $scope.facebook = $rootScope.facebook;
    $scope.pinterest = $rootScope.pinterest;
    $scope.google = $rootScope.google;

}]);

app.controller('contactController', ['$scope', "$http", function ($scope, $http) {

    $scope.submitMyForm = function () {

        $http({
            method: 'POST',
            url: '../../mail/contact_form.php',
            data: $.param($scope.form),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
                if (data.success === true) {
                    $scope.msg_error = 'msg_true';
                } else {
                    $scope.msg_error = 'msg_false';
                }
                $scope.message = data.message;
                $scope.contactForm.reset();
            })
            .error(function (e) {
                console.log(e);
            });
    };

}]);


app.controller('confirmationController', ['$scope', '$localStorage', 'Global', '$rootScope', '$window', function ($scope, $localStorage, Global, $rootScope, $window) {

    $('.header-wrapper').addClass('top-bar');

    $scope.Global = Global;
    $scope.Global.total = $localStorage.myTotal || 0;
    $scope.allCart = $localStorage.myObj || '';

    $scope.countCart = $scope.allCart.length;

    if ($scope.countCart === 1) {
        $scope.customColumn = 'col-md-offset-3 col-md-6';
    } else if ($scope.countCart === 2) {
        $scope.customColumn = 'col-md-6';
    } else {
        $scope.customColumn = 'col-md-4';
    }

    $scope.counterPlus = function (qty, index) {
        $scope.otroTotal = 0;
        $scope.allCart[index].productQty = qty + 1;

        for (var i = 0; i < $scope.allCart.length; i++) {
            $scope.otroTotal += $scope.allCart[i].productPrice * $scope.allCart[i].productQty;
            $localStorage.myTotal = $scope.otroTotal;
        }
        $scope.Global.total = $scope.otroTotal;
    };



    if (typeof ($scope.allCart) === 'undefined' || $scope.allCart.length === 0) {
        $scope.myCart = false;
        $scope.message = true;
    } else {
        $scope.myCart = true;
        $scope.message = false;
    }


}]);
