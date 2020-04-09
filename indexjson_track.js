var protobuf = require("protobufjs");
const WebSocket = require('ws');
var jsonDescriptor = require("./track_schema.json"); 

const wss = new WebSocket.Server({ port: 8080 });

var root = protobuf.Root.fromJSON(jsonDescriptor); 

// Obtain a message type
var AwesomeMessage = root.lookupType("Track");
 
// Exemplary payload
var coord1 = [-90.9544,39.1327].toString();
var coord2 = [-78999967,1234567,3948585.654321].toString();
var payload = {
    "ts" : 0,
    "id" :  1,      
    "coord1" : coord1,       
    "coord2" : coord2,        
    "speed" :  999,      
    "heading1" : 180,       
    "heading2" : 360,       
    "alt" :  900,      
    "altSensor" : 0,        
    "mode3" : 3333,
    "mode2" : 2222,
    "callsign" : 'TOM123',
    "dept" : 'SWH',
    "dest" : 'NEW',
    "arctType" : "F16",
    "attribKey" : 7,
    "force" : 0,
    "trackcolor" : "#00FFFF",
    "tracksymbol" : "E60C",
    "rotate" : 0,
    "rings" : "",
    "moved" : true, 
    "tfmdg" : false ,
    "lo" : false,
    "po" : false,  
    "gf" : "",
    "blink" : false,
    "points" : "",
    "attribs" : ""
}


// Verify the payload if necessary (i.e. when possibly incomplete or invalid)
var errMsg = AwesomeMessage.verify(payload);
if (errMsg)
    throw Error(errMsg);

// Create a new message
var message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary
//console.log(message.toString().length)
// Encode a message to an Uint8Array (browser) or Buffer (node)
var buffer = AwesomeMessage.encode(message).finish();
// console.log('length', buffer.length  )
// // ... do something with buffer

// // Decode an Uint8Array (browser) or Buffer (node) to a message
// var message = AwesomeMessage.decode(buffer);
// // ... do something with message

// // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

// // Maybe convert the message back to a plain object
// var object = AwesomeMessage.toObject(message, {
//     longs: String,
//     enums: String,
//     bytes: String,
//     // see ConversionOptions
// });

//   console.log(object);


wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        console.log('rec on server', data)
	 if (data == "hello"){
		ws.send(buffer)
	}

      wss.clients.forEach(function each(client) {

        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(buffer);
        }
      });
    });
  });
  


