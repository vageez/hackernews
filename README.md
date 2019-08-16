# hackernews
Simple react app displaying Hacker News stories and their comments

## React Application
> Displaying top 10 Hacker News Stories, and up to 20 comments for each story.
> Using functional components with the of React Hooks instead of React Class lifecycle methods.
> No local component state. All application state is resides in Redux.

### For Local Development with Webpack Dev Server, pls run
> yarn dev 
> // Project is running at http://localhost:3030/

#### For Production Build, pls run
> yarn buld

#### Webpack bundler with a simple custom configuration
#### Webpack Dev Server for local development, with (HMR) hot module replacement

#### State managment is managed with Redux

#### IO is handled through Epics, implementing Futures. Futures (Fluture) are a Mondaic alternative to handling Promises.

> [Fluture Parallel](https://github.com/fluture-js/Fluture/tree/11.x#parallel)

> [Fluture tryP](https://github.com/fluture-js/Fluture/tree/11.x#tryp)