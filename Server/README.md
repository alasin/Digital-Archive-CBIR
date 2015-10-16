This is the node.js app for server interface i.e. the interface where user uploads all the images in the archive.

- **node_modules** contains the node modules that need to be installed before running the code. All  the required node modules are mentioned in `package.json` and can be installed using `npm install`.

- **public** contains the public javascripts and stylesheets. Doesn't contain anything important.

- **routes** contains node.js routes. Doesn't contain anything important.

- **views** contains the `index.jade` file which can be manipulated to change the frontend of interface.

- **package.json** contains the required dependencies.

- **app.js** contains the driver code for running the app and contains the upload mechanism, thumbnail creation and XML database update . Type `nodemon app` or `node app` to start the server at `localhost:8080`. Modify this file to change the server properties like listening port etc.
