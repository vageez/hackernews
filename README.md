# hackernews
Simple react app displaying Hacker News stories and their comments

## React Application
> Displaying top 10 Hakernews Stories, and up to 20 comments for each story.
> Using functional components with the of React Hooks instead of React Class lifecycle methods.
> No local component state. All application state is resides in Redux.

### Webpack bundler a simple custom configuration
### Webpack Dev Server for local development, with (HMR) hot module replacement

### For Local Development with Webpack Dev Server, pls run
> yarn dev // Project is running at http://localhost:3030/

### For Production Build, pls run
> yarn buld

### Redux is used for state managment

#### IO is handled through Epics, implementing Futures. Futures (Fluture) are a Mondaic alternative to handling Promises.
> [Fluture Parallel](https://github.com/fluture-js/Fluture/tree/11.x#parallel)
> [Fluture tryP](https://github.com/fluture-js/Fluture/tree/11.x#tryp)