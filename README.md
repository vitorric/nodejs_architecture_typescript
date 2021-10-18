
# API NodeJS with TypeScript

This is a basic project **NodeJS** with **Typescript** created for study, using these technologies:

- **Express** as server;
- **Postgres** as DB;
- **Prisma** as ORM.

# Layers of project

The project contains 2 main layers: 

 1. **Infra**: Layer of third components, libs and foreign framework;
 2. **Core**: Layer of core business logic.

![Layers Project](https://i.ibb.co/pK0wmcS/flow-nodejs-typescript.png)

The communication between the 2 layers happens using interfaces. 

# How to Run

Before run, need to install the dependencies, execute this command on terminal:

`yarn install`

After, just run the command to up the docker:

`yarn docker-up`

Enjoy this repository! :D
