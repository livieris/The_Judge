# base_server
a sample MEAN server stack using MySQL, PassportJS, and Sequelize

###To start
npm install in project

###set config
set config file to match sql db

###Initialize Local Server
   Run `npm start`
   If ERROR, `npm install`
   Server address--> `127.0.0.1:5000`

###Compile SASS to CSS
Run npm run sass
This starts node-sass with the command node-sass -o public/css public/sass/ This will compile the SASS files to CSS
Run npm run sass-watch
This starts node-sass with the command node-sass -o public/css public/sass/ -w This will watch all sass files in the appropriate folder (public/sass)

###Admin Account
    email = super@admin.admin
    password = Welcome1!

###Check if sql server running
  systemctl status mysql.service

###Command after installing node
  sudo ln -s "$(which nodejs)" /usr/bin/node

###Start mysqlworkbench
  mysql-workbench

###switching to github
create new folder.  copy app, .env, package.json, server.js, readme
