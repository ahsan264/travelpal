/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
/*

*/
var lat;
var logi;
var city;
var country;
var countrycode;
var currency;

function getLocation(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    
}
// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//

var onSuccess = function(position) {
   lat=position.coords.latitude;
    logi=position.coords.longitude;
    //alert(lat+' '+logi)  
    const url = 'https://api.opencagedata.com/geocode/v1/json?key=d91cdae0bc53473480c6e11d7693b43a&q='+lat.toString()+
    '+'+logi.toString()+'&pretty=1';
   
 var http = new XMLHttpRequest();
  http.open("GET", url);//
    http.send();
    http.onreadystatechange = (e) => {
            var response = http.responseText;
            console.log(response);
            var responseJSON = JSON.parse(response);
console.log(response);
   city=responseJSON.results[0].components.city;
   country=responseJSON.results[0].components.country;
   countrycode=responseJSON.results[0].components.country_code;
	currency=responseJSON.results[0].annotations.currency.iso_code;
	
	document.getElementById("city").innerHTML = city;  
	document.getElementById("country").innerHTML = country;
    document.getElementById("local").innerHTML = currency;	

    }

};

// onError Callback receives a PositionError object

function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}




function getWeather(){

var cityName=city.toString().replace(/\d/g, "");
   	   const url = 'http://api.openweathermap.org/data/2.5/weather?q='+cityName+','+countrycode.toString()+'&APPID=35694bce07ae4329dab0c80f187b08d5';
	
	   var http = new XMLHttpRequest();
    http.open("GET", url);
      http.send();
      http.onreadystatechange = (e) => {
              var response = http.responseText;
              
              var responseJSON = JSON.parse(response);

     var weather_description=responseJSON.weather[0].main;
    	var temperature=responseJSON.main.temp;
		
		var desc = responseJSON.weather[0].description;
 
  document.getElementById("weather").innerHTML = weather_description;
 document.getElementById("temp").innerHTML= temperature-273.15;
 document.getElementById("d_desc").innerHTML = desc;
  }
    
  }


var usad;
function currencyconverter(){
   	   const url = 'http://apilayer.net/api/live?access_key=e62ac909cca0f6647b1e7c384fd317e8&currencies='+currency.toString()+'&source=USD&format=1';

	   var http = new XMLHttpRequest();
    	http.open("GET", url);//
      	http.send();
      	http.onreadystatechange = (e) => {
              var response = http.responseText;
              //alert(response);
              var responseJSON = JSON.parse(response);
		
		var quote= [];
		
		var result=responseJSON.quotes;
		for(var i in result){
			quote.push([i, result[i]]);
			}
//alert(quote);

 rate=quote[0];
 
 var ustolocal=Number(rate[1]);
 var localtous=(1/ustolocal);
var  us= document.getElementById("usd").value;
var loca=document.getElementById("localcur").value;

 var us;
 
 document.getElementById("localcur").value=us*Number(rate[1]);
 
  
  }
    
  }
  
  
  
  
  //Camera
  
  
  function pics(){
		navigator.camera.getPicture(cameraCallback, onError);	
}

function cameraCallback(imageData){
	var image = document.getElementById('myImage');
	
	image.src = imageData;
	}

function onError(){
	alert ('Error!!!');
	}
  
  
//Save File 

function savefile(){
 
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);
   
}  

function fileSystemCallback(fs){
 
    // Name of the file I want to create
    var fileToCreate = "newPersistentFile.txt";
 
    // Opening/creating the file
    fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);
}
 
var fileSystemOptionals = { create: true, exclusive: false };
 
function getFileCallback(fileEntry){
    
    var dataObj = new Blob(['Hello'], { type: 'text/plain' });
    // Now decide what to do
    // Write to the file
    writeFile(fileEntry, dataObj);
 
    // Or read the file
    readFile(fileEntry);
}
 
// Let's write some files
function writeFile(fileEntry, dataObj) {
 
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {
 
        // If data object is not passed in,
        // create a new Blob instead.
        alert("Saving In Progress");
        if (!dataObj) {
            dataObj = new Blob(['Hello'], { type: 'text/plain' });
        }
 
        fileWriter.write(dataObj);
 
        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
        };
 
        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };
 
    });
}
 
// Let's read some files
function readFile(fileEntry) {
 
    // Get the file from the file entry
    fileEntry.file(function (file) {
        
        // Create the reader
        var reader = new FileReader();
        reader.readAsText(file);
 
        reader.onloadend = function() {
 
            console.log("Successful file read: " + this.result);
            console.log("file path: " + fileEntry.fullPath);
 document.getElementById("content").innerHTML=this.result;
        };
 
    }, onError);
}

function onError(msg){
    console.log(msg);
}  
  
  
  
//Slider Menus
  
  var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}


var coll = document.getElementsByClassName("collapsible1");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

var coll = document.getElementsByClassName("collapsible2");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}