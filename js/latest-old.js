(function() {
  'use strict';

  var app = {
    spinner: document.querySelector('.loader')
  };

  var container = document.querySelector('.container');


  // Get Commit Data from Github API
  function fetchCommits() {
	  
    var url = 'https://api.github.com/repos/unicodeveloper/resources-i-like/commits';

    $.ajax({
    method: "GET",
    url: url,
  
    })
  .success(function( response ) {

    
    response.forEach(function(item){
      var msg = "<section id='card' class='card'><h4> Message: " + item.commit.message + "</h4><h4> Author: " + item.commit.author.name + "</h4><h4> Time committed: " + (new Date(item.commit.author.date)).toUTCString() +  "</h4><h4><a href='" + item.html_url + "'>Click me to see more!</a>"  + "</h4></section>";
        $('#appendHere').append(msg);
    })

        app.spinner.setAttribute('hidden', true); //hide spinner
      })
      // .catch(function (error) {
      //   console.error(error);
      // });
  };



  var address , i,j,k, x= "";
    address={
        "details":[{ "image" : "images/ford.jpg" ,"name":"Ford", "models":[ "Fiesta", "Focus", "Mustang" ] },{ "image" : "images/ford.jpg" ,"name":"BMW", "models":[ "320", "X3", "X5" ] },{ "image" : "images/ford.jpg" ,"name":"Fiat", "models":[ "500", "Panda" ] } 
        ] 
      };
        


    for (var i in address.details)
        { 
          x += '<img src= "' + address.details[i].image + '">'; 
           x +=  "<h2> Car Name :"  + address.details[i].name +  "</h2>";
          for (j in address.details[i].models) {   x += "<h4> Model Name :" + address.details[i].models[j] + "</h4>"  ; 

             }
           
           document.getElementById("card").innerHTML = x;
        }




  fetchCommits();


  

        
    
    

})();