# README

Rails v6/react App


INSTALL: 

Ruby Version: 2.6.3  (using rvm - rvm install 2.6.3)

Yarn: npm install yarn

Postgress: sudo apt install postgresql postgresql-contrib libpq-dev

SETUP: 
Postgresql:
	create user role:  	- login to psql: sudo su -postgres
					   	- create role: CREATE ROLE salza80 WITH CREATEDB LOGIN

create database:  rails create:db

run: 
	bundle install


DEVELOPMENT:

backend:  rails s -p 3001
front-end: cd game_platfrom_spa
		   npm run start

Backend - Rails 6 / Devise / graphql (ruby)

Front-end development uses facebooks create-react-app, and proxies requests to 3001
Tech: React/ApolloGraphql/react-router
http://localhost:3000  for front-end app development
http://localhost:3001/admin for active admin


Production deploy for front-end:

cd game_platfrom_spa
npm run build   -- creates production build
cp -R game_platform_spa/build/* public/spa   --copy spa build to rails public/spa directory

Automated with Capistrano: 

run: cap production deploy (with access setup for deployment server/deploy user)  -- to deploy app to production
