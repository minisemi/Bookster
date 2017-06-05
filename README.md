# Bookster

This is the specification of our web project Bookster. It is a part of the
course TDDD27 Advances Web Programming at Linköping University.

## Screencast

A screencast can be found here: https://youtu.be/zNHUDc4boT4

## Running this project

This project is implemented with a locally hosted database. If you wish to run 
it with full features you may alter the database.js-file in the config repo to
your own mysql-database and run the database.schema in it to initialize and
create all necessary tables.



## Functional Specification

We will develop a web application called Bookster. It is a centralized booking
platform for venuesand facilities such as laundry rooms, barbeque places and 
sport halls. Several organizations and corporations are meant to be able to
post different locations to the site. End-customers will be able to register,
log in and book venues and facilities from different orginizations in one
application. We developed this as a business idea in the course TDDE02 Software
Entrepreneurship.

The idea is to have two frontend customer interfaces; one for the end-customers
booking objects, and one for organizations posting bookables. We have chosen
initially to focus on the end-customer application where they can create a
profile, set preferences, select favourite objects and organizations. The
backend solution is thought to be the link between the end-customer and
organization applications, and as we will mock organization interactions for now,
the backend will solve a lot of the scheduling.

## Technological Specification

We will use seperate front- and backend frameworks. For frontend we will start off
with using React. Going on we will implement more 3rd party liberaries as needed,
which React is great for. React suits us as we want a user friendly application
with fast data rendering. For backend we will use Node.js with the Express
framework. We will use MySQL for storing data, which will mostly be used for
storage of end-user data and organization user data. End-user data includes profile
information and preferences, login info etc. Organization user data includes
bookables, schedules and as well as login info for the organizations. We will use
postman to make the backend development efficient, and jenkins for continiuous
integration (perhaps in combination with Selenium).