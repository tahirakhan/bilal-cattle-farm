var crypto = require('crypto');
exports.encode = function(payload,secrate){
    algorithm = 'HS256';
    
    var header = {
        type: 'JWT',
        alg: algorithm
    };
    
    var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));
    
    return jwt + '.' + sign(jwt,secrate);
}

exports.decode = function(token,secrate){
    var segments = token.split('.');
    
    if(segments.length !== 3){
        throw Error("Toekn structure incorrect");
    }
    
    var header = JSON.parse(base64Decode(segments[0]));
    var payload = JSON.parse(base64Decode(segments[1]));
    
    var rawSignature = segments[0] + '.' + segments[1];
    if(!verify(rawSignature,secrate,segments[2]))
        throw new Error("Verification failed");
    
    return payload;
}

function verify(raw,secrate,signature){
    return signature === sign(raw,secrate);
}
function sign(str,key){
    return crypto.createHmac('sha256',key).update(str).digest('base64');
}

function base64Encode(str){
    return new Buffer(str).toString('base64');
}

function base64Decode(str){
    return new Buffer(str,'base64').toString();
}