# hackernews
Simple react app displaying Hacker News stories and their comments

## React Application
> Displaying top 10 Hacker News Stories, and up to 20 comments for each story.
> Using functional components with the of React Hooks instead of React Class lifecycle methods.
> No local component state. All application state is resides in Redux.

### Application Flow
> On page load top 10 stories are fetched and loaded into Redux.
> On request of comments for a story, comments are fetched and loaded into redux (once).

### For Local Development with Webpack Dev Server, pls run
> yarn dev 
> // Project is running at http://localhost:3030/

#### For Production Build, pls run
> yarn buld

#### Webpack bundler with a simple custom configuration
#### Webpack Dev Server for local development, with (HMR) hot module replacement

#### State managment is managed with Redux

### Unit Tests implemented with JEST.
> Testing of reducer actions

### Styling with Styled components
> Minimal use of media query to manage font size between Mobile and Desktop

#### IO is handled through Epics, implementing Futures. Futures (Fluture) are a Mondaic alternative to handling Promises.

#### Errors in our IO, are pushed to an error action in the reducer. At this stage I am NOT doing anything to display these errors to the user.

> [Fluture Parallel](https://github.com/fluture-js/Fluture/tree/11.x#parallel)

> Parallel allows us to limit the number of out going requests our APP will make at a time. I currently set it to Infinity, which is unlimited. But this number can be adjusted so that we can have 5 async requests take off and complete before sending another 5. Their order of completion is not important.

> [Fluture tryP](https://github.com/fluture-js/Fluture/tree/11.x#tryp)
