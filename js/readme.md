# Fist lesson of book

On the first implementation of the book, We will use javascriopt to build a block called "Turtle" language.

## My opinion

I maybe using the same idea, but in a functionall paradigm, it is much easier make it.
Becouse a functionall paradigm is much easier to write the same thing but with observer pattern.
[Rxjs](https://rxjs.dev/)
[Implementation](https://github.com/ErickWendel/rxjs-clone)

## By book

### Why Not Use MVC?

Model-View-Controller (MVC) was a good design choice for Smalltalk programs in the ’80s and it
can work in some variation or other for web apps, but it isn’t the right tool for every problem. All
the state (the “model” in MVC) is captured by the block elements in a block language anyway, so
replicating it into Javascript has little benefit unless there is some other need for the model (if we
were editing shared, distributed code, for instance).
An early version of Waterbear went to great lengths to keep the model in JavaScript and sync it
with the DOM, until I noticed that more than half the code and 90% of the bugs were due to keeping
the model in sync with the DOM. Eliminating the duplication allowed the code to be simpler and
more robust, and with all the state on the DOM elements, many bugs could be found simply by
looking at the DOM in the developer tools. So in this case there is little benefit to building further
separation of MVC than we already have in HTML/CSS/JavaScript.

### Toy Changes Can Lead to Real Changes

Building a small, tightly scoped version of the larger system I work on has been an interesting
exercise. Sometimes in a large system there are things you are hesitant to change because they affect
too many other things. In a tiny, toy version you can experiment freely and learn things which you
can then take back to the larger system. For me, the larger system is Waterbear and this project has
had a huge impact on the way Waterbear is structured.

### A Program is a Process, Not a Thing

There are things I wasn’t able to experiment with in the scope of this project that I may use the
blockcode codebase to test out in the future. It would be interesting to create “function” blocks which
create new blocks out of existing blocks. Implementing undo/redo would be simpler in a constrained
environment. Making blocks accept multiple arguments without radically expanding the complexity
would be useful. And finding various ways to share block scripts online would bring the webbiness
of the tool full circle.
