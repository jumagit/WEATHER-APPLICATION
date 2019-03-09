$(document).ready(function(){
    
    $(".short").hide();

    if (navigator.geolocation) {

    	var currentPosition = '';

    	navigator.geolocation.getCurrentPosition(function(position){

    		currentPosition = position;

    		//console.log(currentPosition);

    		//getting lats and longs

    		var latitude = currentPosition.coords.latitude;

    		var longitude = currentPosition.coords.longitude;

    		//console.log(latitude, longitude);

    		//ajax request for the api

    		var url = 'https://api.apixu.com/v1/current.json?key=fcb9d56dce1a4f3fa2590410190903&q=';

    		$.getJSON(url + latitude + ',' + longitude , function(data){

            var data = JSON.stringify(data);
            // Json .stringfy changes object into json text and then stores that text in a string

            var json = JSON.parse(data);
            // this JSON.parse turns astring of json text into a javascript object

             $(".short").show();

            var country = json.location.country;

            var city = json.location.name;

            var state = json.location.region;

            var temp_c = json.current.temp_c;

            var temp_f = json.current.temp_f;

            var last_updated = json.current.last_updated.replace('-',' ');

            var wind = json.current.wind_kph;

            var humidity = json.current.humidity;

            var time = json.location.localtime.split(' ')[1];

            var cloud =json.current.cloud;


            $('#weather').html(city + ',' + state  + ',' + country);
           

            $("#info1").html(time);

            $("#info2").html('Wind ' + wind + ' kph');

            $("#info3").html("Temp " + temp_c + "&#8451");


            if (temp_c < 18) {

            	$('.grey-jumbo').css( {

             backgroundImage :'url(https://cdn.pixabay.com/photo/2019/03/03/17/49/sea-4032471_960_720.jpg)'
            		
            		});

            	$("#temp").html("<h1>It's pretty a cold day today</h1>");

            }else if(temp_c > 10 && temp_c < 28){

            	$('.grey-jumbo').css({ 

             backgroundImage :'url(https://cdn.pixabay.com/photo/2019/03/05/16/22/dunes-4036513_960_720.jpg)'
            		
            		});
           $("#temp").html("<h1>It's pretty a sunny day today</h1>");

            }else{

            	$('.grey-jumbo').css({ 

             backgroundImage :'url(https://cdn.pixabay.com/photo/2019/03/06/03/04/happy-day-of-the-woman-4037497_960_720.jpg)'
            		
            		});
            	  $("#temp").html("<h1>It's pretty a hot day today</h1>");


            }


       // the button toggling     

            var yes = true;

           $("#switch").on('click', function(){
          
            

            if (yes) {


           $("#info3").html("Temp " + temp_f + "&#8457");

           $("#switch").html("Show in farenheight");


           yes = false;


            }else{

           $("#info3").html("Temp " + temp_c + "&#8451");

            $("#switch").html("Show in celcius");

           yes = true;

            }

           });
 
  // the button toggling ends


        if (cloud <= 30) {

       $("#info5").html("Clear sky");

        }else{

      $("#info5").html("Cloudy sky");

        }

 //humidity
    

     $("#info6").html("humidity "+ humidity + "%");

        

         







    		});

    	

    	});
    }
});