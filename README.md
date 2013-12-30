Scarlet
=======

The simple fast javascript interceptor.

[![Build Status](https://travis-ci.org/scarletjs/scarlet.png?branch=0.0.24)](https://travis-ci.org/scarletjs/scarlet)

[![NPM](https://nodei.co/npm/scarlet.png?downloads=true)](https://nodei.co/npm/scarlet/)

![Scarlet!](https://raw.github.com/scarletjs/scarlet/master/logo.png)

## Installation

    npm install scarlet

## Project Purpose

Scarlet is designed to to be simple, easy and fast. It allows you to implement behaviours on **methods** and **properties** at runtime without having to change original source code. Why would you want to do this? Well it depends on your point of view. Scarlet can be used for writing all sorts of frameworks including logging, mocking, instrumentation, inversion of control containers and possibly many more. 

For more on aspect oriented programming please read [this](http://en.wikipedia.org/wiki/Aspect-oriented_programming).

This project focuses on the following:

* AOP
* Clean Code
* Performance
* Simple API's
* Documentation
* Browser Compatibility
* Test Driven Development

## Design Goals

Scarlet was written to eliminate the complexities that arise when intercepting code. The project allows you to seamlessly integrate interception into your application or framework with the following design goals in mind:

* Change anything
* Observe anything
* Intercept anything
* Always at runtime

## Intercepting Basic Functions

Here is an example where we intercept Math.min using an anonymous function as an interceptor.

```javascript
var Scarlet = require('scarlet');
var scarlet = new Scarlet();

Math.min = scarlet.intercept(Math.min, scarlet.FUNCTION)
    .using(function(info, method, args){ 
        var result = method.call(this, info, method, args);
        return result;
    }).proxy();

var result = Math.min(1, 2, 3); //result = 1;
```

We could just as easily change the behaviour or Math.min to always return the result of Math.max as follows: 

```javascript
var Scarlet = require('scarlet');
var scarlet = new Scarlet();

Math.min = scarlet.intercept(Math.min, scarlet.FUNCTION)
    .using(function(info, method, args){ 
        return Math.max(args);
    }).proxy();

var result = Math.min(1, 2, 3); //result = 3;
```

As you can see we use Scarlet not only where we observe behaviour but we can change it too. Scarlet also has the ability to intercept constructors, properties and functions. Pretty neat huh?

## Intercepting Complex Types

You can intercept all **enumerable** members for an object:

```javascript
var Scarlet = require('scarlet');
var scarlet = new Scarlet();

var assert = require('assert');

var timesCalled = 0;

function myInterceptor(info, method, args) {
    // 'Prelude Code' or 'Before Advice'
    var result = method.call(this, info, method, args); // 'Target Method' or 'Join Point'
    // 'Postlude Code' or 'After Advice'
    timesCalled += 1;
    return result;
}

function MyClass() {
    var self = this;
    self.memberProperty1 = "any";
    self.memberFunction1 = function() {};
    self.memberFunction2 = function() {};
}

MyProxiedClass = scarlet
    .intercept(MyClass, scarlet.PROTOTYPE)
    .using(myInterceptor)
    .proxy();

var instance = new MyProxiedClass();
instance.memberProperty1 = "other";
instance.memberFunction1();
instance.memberFunction2();

assert(timesCalled === 4); // Once for constructor and 3 times for members
```

## Intercepting Asynchronously

We have left the ability to intercept asyncronously up to you. It is important that you understand the implications of doing this. To intercept asyncronously you can do the following:

```javascript
var Scarlet = require('scarlet');
var scarlet = new Scarlet();

function myInterceptor(info, method, args){}

function myFunction(any) {/*do stuff*/}

myFunction = scarlet
    .intercept(myFunction, scarlet.FUNCTION)
    .using(function(info, method, args){
        var thisContext = this;
        var result = method.call(thisContext, info, method, args); // Continuation, without this results will break!
        process.nextTick(function(){ //Asynchronous interceptor method dispatch
            myInterceptor.call(thisContext, info, method, args);
        });
        return result; // Actual result
    }).proxy();

```

The benefits of this approach is that you can delegate your interceptors execution to the event loop and return values wont break. The down side is you cannot change return values from within your interceptor. In this case you might want to consider using a javascript futures framework that implements a promise pattern.

## Using Multiple Interceptors

You can also use multiple interceptors on the same function: 

```javascript
var Scarlet = require("scarlet");
var scarlet = new Scarlet();

function myInterceptor1(info, method, args) {...}

function myInterceptor2(info, method, args) {...}

function myFunction() {...}

myFunction = scarlet
    .intercept(myFunction)
    .using(myInterceptor1)
    .using(myInterceptor2)
    .proxy();
```

It is important to note that interceptors are chained together recursively via the callstack. So each **method** parameter is the previous interceptor in the call chain until the concrete method is finally passed through. The benefit of this is each interceptor can override the previous interceptors results. The first interceptor has the final say though. 

## Using Events

Scarlet interceptors emit the following events:

 - **before**: emitted before *interceptors* are called
 - **after**: emitted after *intercepted* method, not called if error
 - **done**: emitted after all *interceptors* and *intercepted* method called
 - **error**: emitted if an error occurs

```javascript
Scarlet.intercept(Math, 'min')
        .on('before', beforeFunction)
        .on('after', afterFunction)
        .on('done', doneFunction)
        .on('error', errorFunction);
        
var min = Math.min(1,2,3);
//-> 1. beforeFunction called
//-> 2. Math.min called as normal and will return 1
//-> 3. doneFunction called
//-> 4. afterFunction called
```

## Interceptor Parameters

The typical declaration of any interceptor is as follows:

```javascript
function myInterceptor1(info, method, args) {
    return method.call(this, info, method, args);
}
```
It is important to note a few things about this. 

 - **this**: Is always the context of the instance of the object.
 - **info**: Is an object which contains meta data about the function being intercepted.
 - **method**: A reference to the original method or next interceptor in the call chain.
 - **args**: The arguments passed to the method being intercepted.

The **info** parameter object has the following properties and functions: 

**isConstructor**

A function which can be used to determine if the current function begin called is used as a constructor function. 

```javascript
function myInterceptor1(info, method, args) {
    if(info.isConstructor()) // Only invokes if constructor
        return method.call(this, info, method, args);
}
```

**isFunction**

A function which determines whether the info object represents an object that is a function.

```javascript
function myInterceptor1(info, method, args) {
    if(info.isConstructor()) // Only invokes if function
        return method.call(this, info, method, args);
}
```

**isProperty**

A function which determines whether the info object represents a property.

```javascript
function myInterceptor1(info, method, args) {
    if(info.isProperty()) // Only invokes if property
        return method.call(this, info, method, args);
}
```

**isInstance**

A function which determines whether the info object represents an instance object.

```javascript
function myInterceptor1(info, method, args) {
    if(info.isInstance()) // Only invokes if instance
        return method.call(this, info, method, args);
}
```

**isPrototype**

A function which determines whether the info object represents a prototype.

```javascript
function myInterceptor1(info, method, args) {
    if(info.isPrototype()) // Only invokes if prototype
        return method.call(this, info, method, args);
}
```

## Browser Example

Grab scarlet.js from the pub/scarlet.js.  Place it in your web pages javascript directory(js/) and start using it.

Here is a sample page.

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <script type="text/javascript" src="js/scarlet.js"></script> 
        <script type="text/javascript">
            function interceptor(info, method, args){
                console.log("In interceptor");
                method.call(this, info, method, args);
            };
            function doStuff () {
                console.log("In doStuff");
            }
            doStuff = scarlet
                .intercept(doStuff, scarlet.FUNCTION)
                .using(interceptor)
                .proxy();

            doStuff();
        </script>
    </head>
    <body>
        <div>
        </div>
    </body>
</html>
```

## Method Call Lifecycle

Here is a visual breakdown of a pseudo callstack for the Math.min we saw earlier.  

```
-->Math.min(1,2,3) // proxied method is called
        |
        -->interceptor<function<anonymous>>(info, method, args) // interceptor is called
                |
                --> var result = method.call(this, info, method, args) // interceptor calls 'actual' method and saves 'result'
                        |
                        -->interceptor<function<anonymous>>(info, method, args) // interceptor is called
                            |
                            --> return result; // result is returned. 
``` 

## Performance

Benchmarking has been performed against a [hooks](https://github.com/bnoguchi/hooks-js).  See [Performance Tests](https://github.com/scarletjs/scarlet/tree/master/perf) for details.

## Api Reference

For all api information see the [docs](http://raw.github.com/scarletjs/scarlet/tree/master/docs/index.html).

## Plugins

Scarlet allows for easy integration of plugins.  

Here are a few you might find useful:
* scarlet-ioc - A Javascript IoC container
* scarlet-winston - Scarlet plugin for using Winston with method and property event interception

### Creating plugins

The best way to get started writing your own plugin, is to use the [scarlet-init](https://github.com/scarletjs/scarlet-init) project for a template. This will later be incorporated into the scarlet cli.

We accept pull requests if you are keen on hacking on scarlet and will definitely consider new ideas. 

## Node Versions

When running scarlet we recommend that you use node version manager. Currently works under node version 0.10.24. To install node version manager please see [nvm](https://github.com/creationix/nvm)