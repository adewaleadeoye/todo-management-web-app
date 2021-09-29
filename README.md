## Todo Management App.

### Two ways to run this app

#### With NPM

To run this solution you need to have NodeJs and NPM running on your system.
[Get both](https://nodejs.org/en/download/)

Once they are installed.

- Open your terminal and change to the solution directory
- Install node modules with `npm install`
- From the project directory, run `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### With Docker (Not recommended at the moment)

(Known issue - server is currently using the wrong ip address. Just adding it here to show where I had to stop because of time)

Ensure [docker](https://www.docker.com/products/docker-desktop) is installed and running on your system.

- Open your terminal and change to the solution directory
- Run `docker build -t todo-app .` to build the container
- Then run `docker run -p 3000:3000 todo-app` to get the app up and running

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
