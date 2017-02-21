angular.module('starter.controllers', [])

// .controller('MapCtrl', function($scope, $ionicLoading) {
  
//   $scope.initialise = function(a, b) {
    
//     var myLatlng = new google.maps.LatLng(a, b);
//     var mapOptions = {
//       center: myLatlng,
//       zoom: 16,
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//     };



    
//     var map = new google.maps.Map(document.getElementById("map"), mapOptions);

//     navigator.geolocation.getCurrentPosition(function(pos) {
//         console.log(pos);
//         map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
//         var myLocation = new google.maps.Marker({
//             position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
//             map: map,
//             title: "My Location"
//         });
//     });

//     $scope.map = map;
//   };
//   google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise(45.18554,5.7282689));


// })
.controller('LoginCtrl', function($scope, $http){
  $scope.sendData = function(username, password){
    var data = {'json':{
        username: username,
        password: password
      }
    };
    console.log(data);
    $http.post('http://www.carbillet.net/api-digitalGrenoble/credentials/', JSON.stringify(data)).then(function(response){
      if (response.data) {
        alert('post success');
        
      }
    },function(response){
      alert('post error');
      console.log(response);
    })
      
  }
})


.controller('UsersCtrl', function($scope, UsersFactory){

    $scope.users = UsersFactory.getUsers().then(function(users){

    $scope.users = users.users;    

   }, function(msg){
        alert(msg);
   });
})

.controller('OneUserCtrl', function($scope, UsersFactory, $stateParams, $http){

   //PUT data
    $scope.putdata = function(age, telephone, adress){
      var data = {'json':{
        idUser: $stateParams.id,
        age: age,
        phone: telephone,
        adress: adress
        }
      };
      //console.log(data);

      $http.put('http://www.carbillet.net/api-digitalGrenoble/users/', JSON.stringify(data)).then(function(response){
        console.log(data);
        if (response.data) {
          alert('Put success');
        }
      }, function(response){
        console.log('data',response);
          alert('put error');
        })
    }
  //PUT data
  
  //Affichage user
    var user = UsersFactory.getUser($stateParams.id).then(function(user){
      $scope.title = user.name + " " + user.lastname;
      $scope.user = user;
      
      google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise(user.position.lat,user.position.lng, user.name));
     
    }, function(msg){
        alert(msg);
    })

    //affichage user
    
    //Maps google    
    $scope.initialise = function(a, b, c) {
    
    var myLatlng = new google.maps.LatLng(a, b);
    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var marker = new google.maps.Marker({
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            position: {lat: a, lng: b},
            map: map,
            title: c + " Position"
        });

    navigator.geolocation.getCurrentPosition(function(pos) {
        
        
        var myLocation = new google.maps.Marker({
            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            map: map,
            title: "Ma Position"
        });
    });


    
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    marker.setMap(map);
    map.setCenter(new google.maps.LatLng(a, b));

    // navigator.geolocation.getCurrentPosition(function(pos) {
    //     console.log(pos);
    //     map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    //     var myLocation = new google.maps.Marker({
    //         position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
    //         map: map,
    //         title: "My Location"
    //     });
    // });

    $scope.map = map;
  };
 
    
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
