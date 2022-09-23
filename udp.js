var udp = require('dgram');

// --------------------creating a udp server --------------------

// creating a udp server
var server = udp.createSocket('udp4');

// emits when any error occurs
server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});

// emits on new datagram msg
server.on('message',function(msg,info){
  // console.log('Data received from client : ' + msg.toString());
  // console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
     console.log(msg.toString());
//sending msg
server.send(msg,7401,'129.7.214.135',function(error){
  if(error){
    client.close();
  }else{
    // console.log('Data sent !!!');
  }

});

});

//emits when socket is ready and listening for datagram msgs
server.on('listening',function(){
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Server is listening at port' + port);
  console.log('Server ip :' + ipaddr);
  console.log('Server is IP4/IP6 : ' + family);
});

//emits after the socket is closed using socket.close();
server.on('close',function(){
  console.log('Socket is closed !');
});

server.bind(7400);

setTimeout(function(){
server.close();
},600000);

// -------------------- udp client ----------------

var buffer = require('buffer');

// creating a client socket
var client = udp.createSocket('udp4');

//buffer msg
var data = Buffer.from('Hello');

client.on('message',function(msg,info){
  console.log('Data received from server : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
});

//sending msg
client.send(data,7401,'129.7.214.135',function(error){
  if(error){
    client.close();
  }else{
    console.log('Data sent !!!');
  }
});

var data1 = Buffer.from('I am');
var data2 = Buffer.from('Alik');

//sending multiple msg
client.send([data1,data2],7401,'129.7.214.135',function(error){
  if(error){
    client.close();
  }else{
    console.log('Data sent !!!');
  }
});