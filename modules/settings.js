 module.exports = function(Ffosbr) {

   var timeInMilliSec = 0;

   {
     options = {
       'photos': false,
       'videos': false,
       'contacts': false,
       'text': false,
       'intervalTime': null, // pass in value in hours
       'id': null,
       'registeredTimer': false,
       'repeat': false
     };
   }


   Ffosbr.prototype.Options = function(my_dictionary) {
     for (var key in my_dictionary) {
       if (key == 'photos') {
         options.photos = my_dictionary.photos;
       }
       if (key == 'videos') {
         options.videos = my_dictionary.videos;
       }
       if (key == 'contacts') {
         options.contacts = my_dictionary.contacts;
       }
       if (key == 'text') {
         options.text = my_dictionary.text;
       }
       if (key == 'id') {
         options.id = my_dictionary.id;
       }
       if (key == 'registeredTimer') {
         options.registeredTimer = my_dictionary.registeredTimer;
       }
       if (key == 'repeat') {
         options.repeat = my_dictionary.repeat;
       }

       //////pass in the value in hours /////////
       if (key == 'intervalTime') {
         timeInMilliSec = my_dictionary.intervalTime * 1000 * 60 * 60;
         options.intervalTime = timeInMilliSec;
       }

     }
     return options;

   };

   //Ffosbr.settings = new Settings();
 };
