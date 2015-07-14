/*
  This messages backup module only works for backup the messages from the phone to SD card. Since ther is no messages restore API, we cannot restore our backup file. So, currently, we cannot apply a unit test for this messages backup module. 
  But you can test it by using the console. When you load the app in your phone, you can call "ffosbr.messages.backup()" in the console of web IDE. That backup() fucntion will backup all messages from your phone to SD card in "messages.json" file. If you do not want that backup file any more, you can call "ffosbr.messages.clean()" to delete "messages.json" file.
*/
