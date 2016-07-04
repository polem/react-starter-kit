var babelOptions = {
  "presets": [
    "es2015",
    "react",
    "stage-0"
  ],
  "env": {
      "production": {
          "plugins": ["transform-react-constant-elements", "transform-react-inline-elements"]
      }
  }
};

require('babel-register')(babelOptions);
require('./server')
