# imp.zone

### What is this?
I wanted to build a modern forum for me and my friends to post on. A forum built on current tech that looks and feels good to use. A forum tailored to our specific needs. Imp Zone is that forum.

### Is it done?
Not quite. It has all the basic features you would expect from an old school web forum, but there is still a lot of work left to do. The primary features I am working on right now are moderation and sub forums. The original idea was for the forum to be primarily centered around video game discussion, so it only makes sense to have a gaming sub forum in addition to one for general discussion.
### What tech is it built on?
The client is built entirely with React, using Redux for state management. I find using regular CSS in React projects kind of cumbersome, so for styling I went with Styled Components, and it has been a very pleasant experience. The back end is built on Node/Express, with Postgres as a database and Sequelize as the ORM. All in all a modern, scalable tech stack.
### What if I want to play around with it?
To run it yourself, you just need to clone the repo and `cd` into the directory,

`git clone https://github.com/lukecamelo/pern-forum.git`

`cd pern-forum`

start the server,

`node server`

start the React dev server,

`cd client && npm start`

and you're up and running! Also, you can run the tests with `npm test`

### The live site
The official live forums can be found at https://imp-zone.herokuapp.com, though eventually they will be moving to imp.zone as the name implies. Join us!
