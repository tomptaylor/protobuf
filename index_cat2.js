var protobuf = require("protobufjs");
var cat = require('./cat.js');


var payload = new Cat({
    "name": "Sonny",
    "age": 10,
    "parents": [parent]
  });

var parent = new Cat.Parent({"name": "Dave", "email": "nope@google.com"});
    
    // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
    var errMsg = AwesomeMessage.verify(payload);
    if (errMsg)
        throw Error(errMsg);
 
    // Create a new message
    var message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary
 
    // Encode a message to an Uint8Array (browser) or Buffer (node)
    var buffer = AwesomeMessage.encode(message).finish();
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
    console.log(object)


