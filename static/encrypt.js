const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = 'd6F3Efeq';
// const iv = crypto.randomBytes(16);


const fs = require('fs');
// console.log(key, iv)
function encrypt(text) {
 let cipher = crypto.createCipher('aes-256-cbc', Buffer.from(key));
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return encrypted.toString('hex');
}

function decrypt(encryptedData) {
//  let t_iv = Buffer.from(iv, 'hex');
 let encryptedText = Buffer.from(encryptedData, 'hex');
 let decipher = crypto.createDecipher('aes-256-cbc', Buffer.from(key));
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}


var encryptedData = encrypt("Some serious stuff")
console.log(encryptedData)
console.log(decrypt(encryptedData))
// console.log(decrypt("c0778ca7a72a7072639861008944d6aa173bd6b268e6dbb46333abea72e45e96"))

let filelist = fs.readdirSync("datasets/")


for (let i = 0; i < filelist.length; i++){
    let t_filename = filelist[i]
    let t_path =  "datasets/" + t_filename
    let t_path1 =  "datasets1/" + t_filename

    let inputData = fs.readFileSync(t_path)
    let jsonstr = JSON.stringify(JSON.parse(inputData))

    let encryptstr = encrypt(jsonstr)
    let decryptstr = decrypt(encryptstr)
    // console.log(encryptstr)
    

    fs.writeFileSync(t_path1, encryptstr, "utf-8", "hex");
    // break

}


// const r = fs.createReadStream('file.txt');

// // encrypt content


// // decrypt content
// const decrypt = crypto.createDecipheriv(algorithm, secretKey, iv);

// // write file
// const w = fs.createWriteStream('file.out.txt');

// // start pipe
// r.pipe(encrypt)
//     .pipe(decrypt)
//     .pipe(w);