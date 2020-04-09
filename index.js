var protobuf = require("protobufjs");
var fs = require('fs');
var schema_class = require("./cat.proto");
var myroot = schema_class.

//var message = protobuf(fs.readFileSync(__dirname+'/awesome.proto'))
protobuf.load("cat.proto", function(err, root) {
    if (err)
        throw err;

    // Obtain a message type
//    var AwesomeMessage = root.lookupType("AwesomeMessage");
    var AwesomeMessage = root.lookupType("Cat");

    // Exemplary payload
//    var payload = { awesomeField: "AwesomeString" };
var parent = new Cat.Parent({"name": "Dave", "email": "nope@google.com"});
var payload = new Cat({
    "name": "Sonny",
    "age": 10,
    "parents": [parent]
  });

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
    // var object = AwesomeMessage.toObject(message, {
    //     longs: String,
    //     enums: String,
    //     bytes: String,
    //     // see ConversionOptions
    // });
    console.log(message);
    
});