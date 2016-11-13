# Politics And Wars Enhanced Chrome Extension

This is a little chrome extension that will provide:
* Detailed information on various nations through the Politics and War API
* Interact with the main Politics and War webpage to provide additional styling and information
  * Making current information more readable
  * Providing cost analysis on various city improvements
  * Additional Data that may be helpful that is brought up while playing the game
  
###Technology
* [React](https://facebook.github.io/react/)
* [Alt](http://alt.js.org/) - Flux implementation
* [Semantic-ui](http://react.semantic-ui.com/)
* ES6
* HTML5
* Chrome Extension API

###Build Process

To build the extension locally, run the following:

```
git clone https://github.com/jdollar/PoliticsWarChromeExt
npm install
npm start //For local development builds. Starts browserify
./node_modules/gulp/bin/gulp.js deployBuild //For local install builds. Creates build directory for install
```

Then on chrome at `chrome://extensions` enable developer extensions and hit the 'load unpacked extension' button.
In the dialog box that appears select the build folder generated in the cloned directory
