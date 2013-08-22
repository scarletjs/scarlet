Scarlet
=======

The simple fast javascript interceptor for methods and properties.

[![Build Status](https://travis-ci.org/tjchaplin/scarlet.png?branch=master)](https://travis-ci.org/tjchaplin/scarlet)

![Scarlet!](http://www.scarletjs.com/img/scarlet.png)

## Installation

    npm install scarlet

## Start Intercepting


```javascript
var scarlet = require('scarlet');

//Tell scarlet to start intercepting
scarlet.intercept(Math,"max")
        .using(function(proceed){ //->Create a interceptor function with a callback function
            proceed(); 
        });

//-> when Math.max() gets called the interceptor will get called first and then **proceed** to Math.max function

```

See [Simple Example for full code](#simple-node-example)

### What does Scarlet call when?
```
-->someFunction  //call to main method
            |
            |
            -->interceptor //before method starts executing the interceptor gets called
                        |
                        |
                        -->someFunction //after the interceptor **proceeds** it calls the main method
                                    |
                                    |
                                    -->interceptor // interceptor gets called with the result of the main method

``` 

## Project Purpose

To be a simple easy to use javascript method and property interception framework. *Interception* allows you to gain access to **methods** and **properties** when they get called.  This gives you access to the **arguments**, **results**, and context of **this** for the called method. In addition, it allows you to dynamically change the behavior of a method/property.  For more about interception and aop read [here](http://en.wikipedia.org/wiki/Aspect-oriented_programming).


This project focuses on the following foundations:

* Performance
* Documentation
* Simple straightforward API
* Browser compatible
* Clean Code

## Performance

Benchmarking has been performed against a [hooks](https://github.com/bnoguchi/hooks-js).  See [Performance Tests](https://github.com/scarletjs/scarlet/tree/master/performanceTests) for details.

## Api Reference

For all api information see the [docs](https://github.com/scarletjs/scarlet/tree/master/doc).

## Examples

### Simple Node Example

```javascript
var scarlet = require('scarlet');

function someFunction() {
    //Do awesome stuff
};

function interceptor(proceed) {
    //-> Do stuff before calling **someFunction**

    var result = proceed(); //-> proceed to calling **someFunction**

    //-> Do stuff with result after method call
}

scarlet.intercept(someFunction) 
        .using(interceptor) //->indicates the interceptor to be called

//-> someFunction will now have the interceptors
```

### Simple Browser Example

Grab scarlet.js from the dist/scarlet.js.  Place it in your web pages javascript directory(js/) and start using.

Here is a sample page.
```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <script type="text/javascript" src="js/scarlet.js"></script> 
        <script type="text/javascript">
            function interceptor(proceed){
                console.log("In interceptor");
                proceed();
            };
            function doStuff () {
                console.log("In doStuff");
            }
            doStuff = scarlet.intercept(doStuff)
                    .using(interceptor);

            doStuff();
        </script>
    </head>
    <body>
        <div>
        </div>
    </body>
</html>
```
