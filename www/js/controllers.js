angular.module('app.controllers', [])


	.controller('menuCtrl', function ($scope, $http, sharedCartService, sharedFilterService) {


		//put cart after menu
		var cart = sharedCartService.cart;

		$scope.slide_items = [{
			"p_id": "1",
			"p_name": "New Chicken Maharaja",
			"p_description": "Product Description",
			"p_image_id": "slide_1",
			"p_price": "183"
		},

		{
			"p_id": "2",
			"p_name": "Big Spicy Chicken Wrap",
			"p_description": "Product Description",
			"p_image_id": "slide_2",
			"p_price": "171"
		},

		{
			"p_id": "3",
			"p_name": "Big Spicy Paneer Wrap",
			"p_description": "Product Description",
			"p_image_id": "slide_3",
			"p_price": "167"
		}
		];

		$scope.noMoreItemsAvailable = false; // lazy load list

		//loads the menu----onload event
		$scope.$on('$stateChangeSuccess', function () {
			$scope.loadMore();  //Added Infine Scroll
		});

		// Loadmore() called inorder to load the list 
		$scope.loadMore = function () {

			str = sharedFilterService.getUrl();
			$http.get(str).success(function (response) {
				$scope.menu_items = response.records;
				$scope.hasmore = response.has_more;	//"has_more": 0	or number of items left
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});

			//more data can be loaded or not
			if ($scope.hasmore == 0) {
				$scope.noMoreItemsAvailable = true;
			}
		};


		//show product page
		$scope.showProductInfo = function (id, desc, img, name, price) {
			sessionStorage.setItem('product_info_id', id);
			sessionStorage.setItem('product_info_desc', desc);
			sessionStorage.setItem('product_info_img', img);
			sessionStorage.setItem('product_info_name', name);
			sessionStorage.setItem('product_info_price', price);
			window.location.href = "#/page13";
		};

		//add to cart function
		$scope.addToCart = function (id, image, name, price) {
			cart.add(id, image, name, price, 1);
		};
	})

	.controller('cartCtrl', function ($scope, sharedCartService, $ionicPopup, $state) {

		//onload event-- to set the values
		$scope.$on('$stateChangeSuccess', function () {
			$scope.cart = sharedCartService.cart;
			$scope.total_qty = sharedCartService.total_qty;
			$scope.total_amount = sharedCartService.total_amount;
		});

		//remove function
		$scope.removeFromCart = function (c_id) {
			$scope.cart.drop(c_id);
			$scope.total_qty = sharedCartService.total_qty;
			$scope.total_amount = sharedCartService.total_amount;

		};

		$scope.inc = function (c_id) {
			$scope.cart.increment(c_id);
			$scope.total_qty = sharedCartService.total_qty;
			$scope.total_amount = sharedCartService.total_amount;
		};

		$scope.dec = function (c_id) {
			$scope.cart.decrement(c_id);
			$scope.total_qty = sharedCartService.total_qty;
			$scope.total_amount = sharedCartService.total_amount;
		};

		$scope.checkout = function (total) {
			if ($scope.total_amount > 0) {
				// console.log(sharedCartService.total_amount);
				sessionStorage.setItem('total_amount', sharedCartService.total_amount);
				$state.go('checkOut');
			}
			else {
				var alertPopup = $ionicPopup.alert({
					title: 'ไม่มีสินค้าในตระกร้า',
					template: 'กรุณาเลือกสินค้า'
				});
			}
		};

	})

	.controller('checkOutCtrl', function ($scope, $state) {
		$scope.loggedin = function () {
			if (sessionStorage.getItem('loggedin_id') == null) { return 1; }
			else {
				$scope.loggedin_name = sessionStorage.getItem('loggedin_name');
				$scope.loggedin_id = sessionStorage.getItem('loggedin_id');
				$scope.loggedin_phone = sessionStorage.getItem('loggedin_phone');
				$scope.loggedin_address = sessionStorage.getItem('loggedin_address');
				$scope.loggedin_pincode = sessionStorage.getItem('loggedin_pincode');
				$scope.total_amount = sessionStorage.getItem('total_amount');
				return 0;
			}

		};

		$scope.bt = function () {
			$state.go('payment');
			// console.log(sessionStorage);
			//   $bt = confirm("Press a button!");
			//   if($bt == true){
			// 	
			//   }

		};



	})

	.controller('indexCtrl', function ($scope, sharedCartService) {
		//$scope.total = 10; 
	})

	.controller('loginCtrl', function ($scope, $http, $ionicPopup, $state, $ionicHistory) {
		$scope.user = {};

		$scope.login = function (user) {
			// str = "http://localhost/api/user-details.php?e=" + $scope.user.email + "&p=" + $scope.user.password;
			var link = 'http://localhost/api/user-details.php';
			$http.post(link, { us: user.username, ps: user.password })
				.then(function (res) {
					// console.log(res);
					$scope.user_details = res.data.records;
					sessionStorage.setItem('loggedin_name', $scope.user_details.u_name);
					sessionStorage.setItem('loggedin_id', $scope.user_details.u_id);
					sessionStorage.setItem('loggedin_phone', $scope.user_details.u_phone);
					sessionStorage.setItem('loggedin_address', $scope.user_details.u_address);
					sessionStorage.setItem('loggedin_pincode', $scope.user_details.u_pincode);
					// console.log(sessionStorage);
					$ionicHistory.nextViewOptions({
						disableAnimate: true,
						disableBack: true
					});
					lastView = $ionicHistory.backView();
					// console.log('Last View', lastView);
					//BUG to be fixed soon
					/*if(lastView.stateId=="checkOut"){ $state.go('checkOut', {}, {location: "replace", reload: true}); }
					else{*/
					$state.go('profile', {}, { location: "replace", reload: true });
					window.location.reload();
				});
			// $http.get(str)
			// 	.success(function (response) {
			// 		$scope.user_details = response.records;
			// 		sessionStorage.setItem('loggedin_name', $scope.user_details.u_name);
			// 		sessionStorage.setItem('loggedin_id', $scope.user_details.u_id);
			// 		sessionStorage.setItem('loggedin_phone', $scope.user_details.u_phone);
			// 		sessionStorage.setItem('loggedin_address', $scope.user_details.u_address);
			// 		sessionStorage.setItem('loggedin_pincode', $scope.user_details.u_pincode);

			// 		$ionicHistory.nextViewOptions({
			// 			disableAnimate: true,
			// 			disableBack: true
			// 		});
			// 		lastView = $ionicHistory.backView();
			// 		console.log('Last View', lastView);
			// 		//BUG to be fixed soon
			// 		/*if(lastView.stateId=="checkOut"){ $state.go('checkOut', {}, {location: "replace", reload: true}); }
			// 		else{*/
			// 		$state.go('profile', {}, { location: "replace", reload: true });
			// 		//}

			// 	}).error(function () {
			// 		var alertPopup = $ionicPopup.alert({
			// 			title: 'Login failed!',
			// 			template: 'Please check your credentials!'
			// 		});
			// 	});
		};

	})

	.controller('signupCtrl', function ($scope, $http, $ionicPopup, $state, $ionicHistory) {

		$scope.signup = function (data) {
			var link = 'http://localhost/api/signup.php';
			$http.post(link, { n: data.name, us: data.username, ps: data.password, ph: data.phone, add: data.address, pin: data.pincode })
				.then(function (res) {
					// console.log(res.data);
					$scope.response = res.data;
					// console.log($scope.response);
					if ($scope.response.result.created == "1") {
						$scope.title = "สมัครเสร็จสิ้น!";
						$scope.template = "คุณเป็นสมชิกเรียบร้อยแล้ว!";

						//no back option
						$ionicHistory.nextViewOptions({
							disableAnimate: true,
							disableBack: true
						});
						$state.go('login', {}, { location: "replace", reload: true });

					} else if ($scope.response.result.exists == "1") {
						$scope.title = "มีผู้ใช้ชื่อผู้เข้าใช้นี้แล้ว";
						$scope.template = "กรุณาเปลี่ยนชื่อผู้เข้าใช้งาน";

					} else {
						$scope.title = "ล้มเหลว";
						$scope.template = "กรุณาติดต่อทีมงาน";
					}

					var alertPopup = $ionicPopup.alert({
						title: $scope.title,
						template: $scope.template
					});

					1
				});

		}
	})

	.controller('filterByCtrl', function ($scope, sharedFilterService) {

		$scope.Categories = [
			{ id: 1, name: 'ประเภทไม้ดอก' },
			{ id: 2, name: 'ประเภทไม้ประดับ' },
			{ id: 3, name: 'อุปกรณ์จัดสวน' }
		];

		$scope.getCategory = function (cat_list) {
			console.log(cat_list);

			categoryAdded = cat_list;
			var c_string = ""; // will hold the category as string

			for (var i = 0; i < categoryAdded.length; i++) { c_string += (categoryAdded[i].id + "||"); }

			c_string = c_string.substr(0, c_string.length - 2);
			sharedFilterService.category = c_string;
			window.location.href = "#/page1";
		};


	})

	.controller('sortByCtrl', function ($scope, sharedFilterService) {
		$scope.sort = function (sort_by) {
			sharedFilterService.sort = sort_by;
			console.log('sort', sort_by);
			window.location.href = "#/page1";
		};
	})

	.controller('paymentCtrl', function ($scope, $http, $state, $ionicHistory, $ionicPopup) {

		//onload event
		angular.element(document).ready(function () {
			$scope.id = sessionStorage.getItem('product_info_id');
			$scope.desc = sessionStorage.getItem('product_info_desc');
			$scope.img = "img/" + sessionStorage.getItem('product_info_img') + ".jpg";
			$scope.name = sessionStorage.getItem('product_info_name');
			$scope.price = sessionStorage.getItem('product_info_price');
		});

		$scope.Payment = [
			{ id: 1, name: 'ชำระเงินผ่านบัตรเครดิต' },
			{ id: 2, name: 'ชำระเงินผ่านแอป' },
			{ id: 3, name: 'COD' }
		];

		$scope.data = 'Male';

		$scope.loggedin = function () {
			if (sessionStorage.getItem('loggedin_id') == null) { return 1; }
			else {
				$scope.loggedin_name = sessionStorage.getItem('loggedin_name');
				$scope.loggedin_id = sessionStorage.getItem('loggedin_id');
				$scope.loggedin_phone = sessionStorage.getItem('loggedin_phone');
				$scope.loggedin_address = sessionStorage.getItem('loggedin_address');
				$scope.loggedin_pincode = sessionStorage.getItem('loggedin_pincode');
				return 0;
			}

		};

		$scope.payment = function (pay) {

			// console.log(pay);
			// console.log(sessionStorage);
			if (pay) {
				$sess = sessionStorage;
				// console.log($sess);

				$link = 'http://localhost/api/payment.php';
				$http.post($link, { sess: $sess, pay: pay, })
					.then(function (res) {
						// console.log(res);
						$scope.response = res.data;
						if ($scope.response.result.created == "1") {
							$scope.title = "สั่งซื้อสำเร็จ!";
							$scope.template = "คุณได้ทำการสั่งซื้อเรียบร้อยแล้ว!";

							//no back option
							$ionicHistory.nextViewOptions({
								disableAnimate: true,
								disableBack: true
							});
							$state.go('menu', {}, { location: "replace", reload: true });

						} else if ($scope.response.result.exists == "1") {
							$scope.title = "สั่งซื้อล้มเหลว";
							$scope.template = "กรุณาลองใหม่ภายหลัง";

						} else {
							$scope.title = "ล้มเหลว";
							$scope.template = "กรุณาติดต่อทีมงาน";
						}

						var alertPopup = $ionicPopup.alert({
							title: $scope.title,
							template: $scope.template
						});

					});
			}

		};


	})

	.controller('profileCtrl', function ($scope, $http, $rootScope, $ionicHistory, $state) {

		$scope.loggedin_name = sessionStorage.getItem('loggedin_name');
		$scope.loggedin_id = sessionStorage.getItem('loggedin_id');
		$scope.loggedin_phone = sessionStorage.getItem('loggedin_phone');
		$scope.loggedin_address = sessionStorage.getItem('loggedin_address');
		$scope.loggedin_pincode = sessionStorage.getItem('loggedin_pincode');

		if ($scope.loggedin_id != 'admin') {
			$scope.hide = 'none'
		}


		$scope.logout = function () {
			delete sessionStorage.loggedin_name;
			delete sessionStorage.loggedin_id;
			delete sessionStorage.loggedin_phone;
			delete sessionStorage.loggedin_address;
			delete sessionStorage.loggedin_pincode;
			sessionStorage.clear();
			// console.log('Logoutctrl', sessionStorage.getItem('loggedin_id'));

			$ionicHistory.nextViewOptions({
				disableAnimate: true,
				disableBack: true
			});
			$state.go('login', {}, { location: "replace", reload: true });
		};

		$scope.bt_admin = function () {
			$state.go('admin', {}, { location: "replace", reload: true });
		};
	})

	.controller('myOrdersCtrl', function ($scope) {

	})

	.controller('editProfileCtrl', function ($scope) {

	})

	.controller('favoratesCtrl', function ($scope) {

	})

	.controller('productPageCtrl', function ($scope, sharedCartService) {

		//onload event
		angular.element(document).ready(function () {
			$scope.id = sessionStorage.getItem('product_info_id');
			$scope.desc = sessionStorage.getItem('product_info_desc');
			$scope.img = "img/" + sessionStorage.getItem('product_info_img') + ".jpg";
			$scope.name = sessionStorage.getItem('product_info_name');
			$scope.price = sessionStorage.getItem('product_info_price');
		});

		//put cart after menu
		var cart = sharedCartService.cart;
		//add to cart function
		$scope.addToCart = function (id, image, name, price) {
			cart.add(id, image, name, price, 1);
		};
	})

	.controller('admin', function ($scope, $http, $state, $ionicPopup, $ionicHistory) {
		$link = 'http://localhost/api/admin.php';
		$http.post($link, { type: "POST" })
			.then(function (res) {
				// console.log(res);
				$scope.admin = res.data.records;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});

		$scope.bt_admin_del = function (id) {

			str = "http://localhost/api/admin.php?m=GET&id=" + id;
			$http.get(str)
				.success(function (res) {
					// console.log(res);
					$scope.response = res;
					// console.log($scope.response.result);
					if ($scope.response.result.created == "1") {
						$scope.title = "ลบข้อมูลสำเร็จ!";
						$scope.template = "คุณได้ทำการลบข้อมูลเรียบร้อยแล้ว!";

						//no back option
						$ionicHistory.nextViewOptions({
							disableAnimate: true,
							disableBack: true
						});

					} else if ($scope.response.result.exists == "1") {
						$scope.title = "ลบข้อมูลล้มเหลว";
						$scope.template = "กรุณาลองใหม่ภายหลัง";

					} else {
						$scope.title = "ล้มเหลว";
						$scope.template = "กรุณาติดต่อทีมงาน";
					}


					if(window.location.reload() == true){
						// $state.go('admin', {}, { location: "replace", reload: true });
						var alertPopup = $ionicPopup.alert({
							title: $scope.title,
							template: $scope.template
						});
					}



				});
		};
	})

