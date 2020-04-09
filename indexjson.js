var protobuf = require("protobufjs");

var jsonDescriptor = require("./awesome.json"); 
 
var root = protobuf.Root.fromJSON(jsonDescriptor); 

// Obtain a message type
var AwesomeMessage = root.lookupType("AwesomeMessage");
 
// Exemplary payload
var payload = { 
        awesomeField: "AwesomeString",
        awesomeField2: "taylor",
       // type: 3
    }
// };
// payload = {
//     awesomeField2: "taylor"
// }
//  payload = {
//      awesomeField2: "taylor",
//      awesomeField: "AwesomeString"
 //}

// Verify the payload if necessary (i.e. when possibly incomplete or invalid)
var errMsg = AwesomeMessage.verify(payload);
if (errMsg)
    throw Error(errMsg);

// Create a new message
var message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary

// Encode a message to an Uint8Array (browser) or Buffer (node)
var buffer = AwesomeMessage.encode(message).finish();
console.log('length', buffer.length  )
// ... do something with buffer

// Decode an Uint8Array (browser) or Buffer (node) to a message
var message = AwesomeMessage.decode(buffer);
// ... do something with message

// If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

// Maybe convert the message back to a plain object
var object = AwesomeMessage.toObject(message, {
    longs: String,
    enums: String,
    bytes: String,
    // see ConversionOptions
});

  console.log(object);
  


