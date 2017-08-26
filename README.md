# Instaquiz

A realtime quiz application for the classroom.

**WIP.** This application has not reached usability yet.

## The use case

A live quiz at the begining of each lesson is a great way to remind your students of the important things they learned during the last lesson.  It is more fun and engaging than a simpler recap, while providing you
with the opportunity to identify achieving and struggling students.

This (would-be) application is meant to be used this way: the professor (you) and each student connect to it on their own device. While you present the questions with, say, the aid of a projector, students are able to answer them live. Students are all engaged as they are asked to participate individually.

Because results are updated in realtime, evolving anonymous statistics can be displayed on the projected screen. They add the little bit of fun that makes the exercise even more engaging.

At the same time, you can see on your device the individual answers. A random student that successfuly answered can be asked to explain the answers to the whole class; that way you know you will never embarass a struggling student. The application also helps you identify those that failed so you can reached out to them and help them get past their difficulties.

Over time, you'll acquire more and more data which will help you track the progress of each student with little effort. Class-wide statistics also allow you to identify the difficult topics so you can dedicate more time to them.

## Contributing

Contributions are welcome, although the project has not reached a state where it makes sense to contribute.

This repository is a monorepo (multiple node packages in a single repo) but it doesn't use Lerna (or equivalent tools). As such, for the best experience, we advise you to use at least `yarn v0.28.4` to build the project. It provides the experimental "workspaces" feature that allow seamless use of both packages. Otherwise you will need to symlink the internal dependencies yourself.

The `instaquiz-server` package exports an express application while `instaquiz-nuxt` exports the nuxt object that can be used server-side to serve the frontend application.
The root package simply starts the express application with the nuxt renderer.

Thanks to `@std/esm` we can use ES2015 modules almost everywhere, so please do.

Don't forget to lint your code with ESLint. Don't use Prettier directly; `eslint --fix` will call it.

Please be mindful of your commit messages; I like them detailed and well-formated. If you contribute on a feature start it with `feature:`. If you fixed a bug start it with `fix:`. Reference the appropriate GitHub issues when applicable.

## Thanks

Thank you @mc100s and whoever contributed to [this Google IO talk](https://www.youtube.com/watch?v=vAgKZoGIvqs) for the inspiration.

## License

For the moment this project is licensed under the MIT license. It might change.
