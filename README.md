# popular-repos
Web app that lists most popular repos and enables the user to star them.

## Development
You can run this app with:
```
$ npm install
$ npm run start-watch
```

This will start a server on the configured port ([default is 8443](http://localhost:8443/explore)), listening to changes via the watch functionality of webpack.

## Architecture
This project is a **Node server** that exposes API endpoints to interact with Github's API, and also serves a React APP which can consume said endpoints.

The React APP consists of a server-side rendered webpage, with prefetching on the server (for the most popular repos listings), and two tabs: **Explore** and **My Starred**.

### *Explore - /explore*
This tab has a prefetching solution, so if you were to [go to this page](http://localhost:8443/explore) you will get the server-side rendered components with all the data that it needs to hydrate.

It lists the most popular repositories

### *Explore - /my-starred*
This tab does not have a prefetching solution, due to the starred repositories being saved in localStorage, so if you were to [go to this page](http://localhost:8443/my-starred) you will get the server-side rendered components, showing a loading indicator while starred repositories are being fetched.
