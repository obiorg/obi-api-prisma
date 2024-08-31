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

### Router and controller standardisation
  
  In order to apply properly the management off route we base intégration from [mozilla documentation](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)
  


