newSchoolRunner
===============

CI status: ![Build Status](https://travis-ci.org/SRunner/newSchoolRunner.svg?branch=master)

A newSchoolRunner project, which includes:

1. webpack
2. babel
3. express
4. jquery
5. react

All the changes to js/jsx files can be hot-reloaded in browser.

```
npm install -g babel-cli
npm install -g eslint
npm install -g eslint-config-twa-camp-2016
npm install
npm start
```

If you expect the code for you automatically modify the error , please enter the code below

```
eslint . -c twa-camp-2016 --no-eslintrc --fix
```

Then visit <http://localhost:3000>, you will see `Hello world` on the page.

If you modify `public/hello.jsx` to change the text, you will see the changes are applied to page instantly.



