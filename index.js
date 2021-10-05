//Dependencies
const Request = require("request")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Functions
function Main(type, dictionary){
    if(type == "body"){
        for( i in dictionary ){
            Request.post(Self_Args[0], {
                headers: {
                    "Content-Type": "json/application"
                },
                body: dictionary[i]
            },function(err, res, body){
                console.log(res.statusCode)
            })
        }
    }else if(type == "parameter"){
        for( i in dictionary ){
            Request(`${Self_Args[0]}${dictionary[i]}`, function(err, res, body){
                console.log(res.statusCode)
            })
        }
    }
}

//Main
if(!Self_Args.length){
    console.log(`node index.js <url> <body(JSON)/parameter> <dictionary>
Example: node index.js https://example.com?parameter= parameter example_dictionary.txt`)
    process.exit()
}

if(!Self_Args[0]){
    console.log("Invalid url.")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid body/parameter option.")
    process.exit()
}

if(!Self_Args[2]){
    console.log("Invalid dictionary.")
    process.exit()
}

if(Self_Args[1] == "body"){
    Main(Self_Args[1], Fs.readFileSync(Self_Args[2], "utf8").split("\n"))
}else if(Self_Args[1] == "parameter"){
    Main(Self_Args[1], Fs.readFileSync(Self_Args[2], "utf8").split("\n"))
}else{
    console.log("Invalid body/parameter option.")
    process.exit()
}
