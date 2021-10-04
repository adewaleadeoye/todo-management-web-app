## Todo Management App.

### To run this app

- From your terminal run `git clone https://github.com/adewaleadeoye/todo-management-web-app.git`

#### Using Docker

Ensure [docker](https://www.docker.com/products/docker-desktop) is installed and running on your system.

- Open your terminal and change to the solution directory
- Run `docker build -t todo-app .` to build the container
- Then run `docker run -p 3000:3000 todo-app` to get the app up and running

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Using NPM

To run this solution you need to have NodeJs and NPM running on your system.
[Get both](https://nodejs.org/en/download/)

Once they are installed.

- Open your terminal and change to the solution directory
- Install node modules with `npm install`
- From the project directory, run `npm run dev` or `npm run build` then `npm start`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Login Details

email: test@email.com
password: test

## Folder Structure

The project is organised into the following folders:

#### components

Contains specific react components used by pages or by other React components in subfolders (e.g. /components/todoForm).

#### Data

Contains JSON flats files holder todo and user data

#### Pages

Contains Pages and API route handlers for the Todo app.

The `/pages` folder contains all web app pages accessible from the browser.

The `/pages/api` folder contains all files for API route handlers named according to the api url

#### Services

Contains files that handle all http communication with the apis.

#### lib, utils

Contains files with helper functions

#### types

Contains files with type definitions

#### _tests_

Contains test files located as close as possible to the module being tested.
