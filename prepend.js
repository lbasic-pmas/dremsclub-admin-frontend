const fs = require('fs');
const filepath = 'src/environments/environment.ts';

var urlApi, dlink, dlabel, env ;

let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth())).slice(-2);
let year = date_ob.getFullYear();
let hours = ("0" + (date_ob.getHours())).slice(-2);
let minutes = ("0" + (date_ob.getMinutes())).slice(-2);
let seconds =  ("0" + (date_ob.getSeconds())).slice(-2);

//var deployTime = "'"+ year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds +"'";
var deployTime = "'"+ new Date().toISOString() +"'";
var production = false;
process.argv.forEach(function (val, index, array) {
  var argv = val.split(' ');
  argv.forEach(function(value){
    if(val.includes('--api')){
      urlApi = "'" + value.split('=')[1] +"'";
    }
    if(val.includes('--dlabel')){
      var v = value.split('=')[1];
      dlabel = "'" + v.substr(0,7) +"'";
      dlink   = "'https://github.com/trypo-cl/admin-trypo/commit/"+ v +"'"
    }
    if(val.includes('--env')){
      env = value.split('=')[1];
      if(env.toString() == "PRODUCTION")
        production = true;
      else
        production = false
    }
  });

});

var content = `
export const environment = {
  production: ${production},
  urlApi: ${urlApi},
  lastCommitLabel : ${dlabel || "'-'"},
  lastCommitUrl : ${dlink || "'#'"},
  deploy : ${deployTime}
};
`;
fs.writeFileSync(filepath, content);
