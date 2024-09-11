# Welcome to OAP (obi-api-prisma)!

  

This guide will help you to know more about **obi-api-prisma**. It will explain obi-api, how to install and run it, finaly how to contribute on devlopement.

  

# Introduction

  

## What is obi-api-prisma ?

  

**obi-api-prisma** is an API for interacting with obi-sql database. It provides an interface for operating on the database. It allow multiple applications to use same function. It also allows developer to reduce maintenance time.

  

# Installation

  

# Developpement

  

### Download

  

You can download the latest version of obi-api-prisma from https://github.com/obi-api-prisma/obi-api-prisma

  
  

## Need during developpement

  

### ZOD

In order to manage validation parameter zod is used in the chain middelware. Based on following exponation from [Stephen Akugbe on DEV]( https://dev.to/osalumense/validating-request-data-in-expressjs-using-zod-a-comprehensive-guide-3a0j) need to be install.

npm install express body-parser zod

npm install http-status-codes --save

  

### Router and Controller standardisation

The management of routes are process as described in [mozilla documentation](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes). 
Based endpoind are defined : 

 - `obi/`  — The home/index page.
-   `obi/api/v1/catalog/`  — The list of all catalogs, (e.g. /obi/api/v1/persistences,  etc.)
-   `catalog/<object>/<id>`  — The detail page for a specific book, bookinstance, genre, or author with the given  `_id`  field value (e.g.  `/catalog/book/584493c1f4887f06c0e67d37)`.
-   `catalog/<object>/create`  — The form to create a new book, bookinstance, genre, or author (e.g.  `/catalog/book/create)`.
-   `catalog/<object>/<id>/update`  — The form to update a specific book, bookinstance, genre, or author with the given  `_id`  field value (e.g.  `/catalog/book/584493c1f4887f06c0e67d37/update)`.
-   `catalog/<object>/<id>/delete`  — The form to delete a specific book, bookinstance, genre, or author with the given  `_id`  field value (e.g.  `/catalog/book/584493c1f4887f06c0e67d37/delete)`.


### Adding PUG


Assurer vous que vous pouvez exécuter express :

    express --help

If you're block by script execution change restriction in powershell 

    Set-ExecutionPolicy -ExecutionPolicy Unrestricted

Following steps are base on [geeksforgeeks](https://www.geeksforgeeks.org/how-to-add-pug-engine-in-express-js/) : 

    npm install pug --save

Now to set pug as the view engine, run the command:

    express --pug

ou

    express --view=pug



