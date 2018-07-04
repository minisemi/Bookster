# Bookster

This is the specification of our web project Bookster.

## Screencast

A screencast can be found here: https://youtu.be/zNHUDc4boT4

## Running this project

This project is implemented with a locally hosted database. If you wish to run 
it with full features you may alter the database.js-file in the config repo to
your own mysql-database and run the database.schema in it to initialize and
create all necessary tables.


## Functional Specification

Bookster is a centralized booking
platform for venuesand facilities such as laundry rooms, barbeque places and 
sport halls. Several organizations and corporations are meant to be able to
post different locations to the site. End-customers will be able to register,
log in and book venues and facilities from different orginizations in one
application. 

The idea is to have two frontend customer interfaces; one for the end-customers
booking objects, and one for organizations posting bookables. The focus initially lays on the end-customer application where they can create a
profile, set preferences, select favourite objects and organizations. The
backend solution is thought to be the link between the end-customer and
organization applications, and as we will mock organization interactions for now,
the backend will solve a lot of the scheduling.

## Technological Specification

The frontend is built with React/Redux. The backend is buildt with Node/Express. We use MySQL for storing data, which will mostly be used for storage of end-user data and organization user data. End-user data includes profile
information and preferences, login info etc. Organization user data includes
bookables, schedules and as well as login info for the organizations. Jenkins will be implemented for continiuous
integration in combination with Selenium and Mocha/Jasmine.
