# [s_rank]

### What is this?

I wanted to build a modern forum for me and my friends to post on, one built on current tech that looks and feels good to use. This is what I ended up with.

### Is it done?

Not quite. It has all the basic features you would expect from an old school web forum, but there is still work left to do. The primary feature I am working on right now is moderation, which should be done in the next couple weeks. Currently new features is not at the top of my priority list but we'll get there!

### What tech is it built on?

The client is built entirely with React, using Redux for state management. I find using regular CSS in React projects kind of cumbersome, so for styling I went with Styled Components, and it has been a very pleasant experience. The back end is built on Node/Express, with Postgres as a database and Sequelize as the ORM. All in all a modern, scalable tech stack.

### What if I want to play around with it?

To run it yourself, you just need to clone the repo and `cd` into the directory,

```bash
# clone the repository
git clone https://github.com/lukecamelo/pern-forum.git

# enter the directory
cd pern-forum

# start the server
node server

# and the react dev server
cd client && npm start
```

and you're up and running! If you like you can run the tests with `npm test`

### The live site

The official live forums can be found at [https://imp-zone.herokuapp.com](), though eventually they will be moving a more fitting domain as I've decided to move on from the name imp.zone. Join us!
