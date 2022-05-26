
require("dotenv").config()
const path = require('path')
const execFile = require("child_process").execFile
const date = new Date()
const current_date = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`
const backup_file = `export_${current_date}`
const backup_file_ext = `export_${current_date}.tar`

let backup_script = `pg_dump --username=${process.env.DB_USER} ${process.env.DB_NAME}`

const backup = ()  => {
  console.log(process.env.DB_USER);
  console.log(process.env.DB_NAME);
  console.log(process.env.DB_PASSWORD);
  console.log(process.env);
  console.log(process.cwd());
  console.log(path.join(__dirname,'backup.sh'));
  var test = execFile(`/prueba.js`,[],      
  (error, stdout, stderr) => {
    if (error !== null) {
      console.log(`exec error: ${error}`)
    }
    console.log("Backup complete!")
  })
    var script = execFile(
    `${path.join(__dirname,'backup.sh')}`,
      [backup_script, backup_file, process.env.DB_PASSWORD],
      (error, stdout, stderr) => {
        if (error !== null) {
          console.log(`exec error: ${error}`)
        }
        console.log("Backup complete!")
      }
    )
}

module.exports = {
  backup
}