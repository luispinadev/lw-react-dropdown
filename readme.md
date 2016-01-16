# README #

This example is a playground for a dropdownInput component, a module in the making. This component aims to provide a dropdown/input that is independent from bootstrap and does not pollute the global dom.
**!! check folder /src/app/views/components/ for component source!!**

Uses a boilerplate webpack+node+react-router setup, with babel and stylus loaders for css
.. sorry for the mess, this playground is a cowboy dev env, and I haven't set up the test stack as well.

### How do I get set up? ###

* npm install
* live reload: use 'node server.js'. This will run the webpack dev server with hot reloading @ localhost:8080 ( alternative: you can check out the script entry in package.json and trigger one of the scripts with npm [script name]
* static build bundle.js: use 'webpack'


### Usage ###

Current component options (pass as props):

* **initVal**: optional - initial value for input field. default is empty string
* **filterOptions**: wether to filter options based on input field value
* **filterFunc** optional - default checks if val is part of option
* **optionsPosition**: position of the options dropdown list. 'bottom' and 'top' are supported
* **options**: list of options for the dropdown list
* **selectCallback**: function to be triggered when user selects an option. Default prints a message to console
* **inputChangeCallback**: default false
* **debounceMillisecs**: debounce time for the input callback function (if set)

future options:
* **css animations**: add css animations for smooth dropdown collapse/expand
* **options position**: add extra options 'left', 'right', 'auto'(based on distance to window edge?)

ToDo:
* add test cases