# Lit Books Tutorial

<!-- TOC -->

- [Lit Books Tutorial](#lit-books-tutorial)
  - [Objective](#objective)
  - [Libraries](#libraries)
    - [Server](#server)
    - [Client](#client)
  - [What this course will cover](#what-this-course-will-cover)
    - [What you need to know before:](#what-you-need-to-know-before)
    - [Section 1 - Planning](#section-1---planning)
    - [Section 2 - Setup Prerequisites](#section-2---setup-prerequisites)
      - [Section 2.1 - Setup MongoDB](#section-21---setup-mongodb)
    - [Section 3 - Setup Dependencies/Structure](#section-3---setup-dependenciesstructure)
    - [Section 4 - Server Basic Express/Apollo Setup](#section-4---server-basic-expressapollo-setup)
      - [Section 4.1 Setting up environment variables](#section-41-setting-up-environment-variables)
    - [Section 5 - Server MongoDB Connect](#section-5---server-mongodb-connect)
    - [Section 6 - Server User Model](#section-6---server-user-model)
    - [Section 7 - Server Auth](#section-7---server-auth)

<!-- /TOC -->

## Objective

This tutorial will cover React 16, GraphQL (Apollo), JWT, Mongoose and Authentication.

We will focus on the MERN, (**M**ongoDB, **E**xpress, **R**eact, **N**ode.js) stack. It will take you through setting up a server that handles authenticaion and a frontend app that will interface with the server.

## Libraries

### Server

The server will use the following:
- Express
- JWT
- Mongoose (MongoDB ORM)
- Apollo Server
- Babel (ES7)

### Client

The client will use the following:
- Create React App 2
- React Router
- Apollo Client

## What this course will cover

### What you need to know before:
- Novice understanding of HTML/CSS/Javascript

### Section 1 - Planning

Cover application requirements, sitemap, wireframe and planning the database schema/models based on a hypothetical client requesting an application to be built.

### Section 2 - Setup Prerequisites

Cover setting up prerequisites for project. Installing [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/), creating project folder and server folder.

#### Section 2.1 - Setup MongoDB

This sub-section will focus primarily on setting up MongoDB on your local machine.

### Section 3 - Setup Dependencies/Structure

Setting folders structure, getting package dependencies installed and installing [eslint](https://eslint.org/) and [stylelint](https://github.com/stylelint/stylelint).

### Section 4 - Server Basic Express/Apollo Setup

Setting up express and apollo. Getting the server to boot and adding a few mock queries to test out the playground.

#### Section 4.1 Setting up environment variables

Setting up system environment variables.

### Section 5 - Server MongoDB Connect

We will connect to our mongoDB instance.

### Section 6 - Server User Model

Setting up the user model as defined in the planning section. We will create the schema for mongoose

### Section 7 - Server Auth

Here we will wire up the basic signup and login in components for our Authentication and use JWT for Authorization.
