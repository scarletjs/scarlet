Scarlet
=======

The simple fast javascript interceptor.

[![Build Status](https://travis-ci.org/scarletjs/scarlet.svg?branch=master)](https://travis-ci.org/scarletjs/scarlet)

[![NPM](https://nodei.co/npm/scarlet.png?downloads=true)](https://nodei.co/npm/scarlet/)

![Scarlet!](https://raw.github.com/scarletjs/scarlet/master/logo.png)

## Installation

    npm install scarlet

## Quick Start

```javascript
var Scarlet = require('scarlet');
var scarlet = Scarlet();

Math.min = scarlet.intercept(Math.min)
                .using(function(proceed){ 
                    console.log("In interceptor");
                    proceed(); 
                })
                .proxy();

Math.min(1,2,3);
//-> 1. interceptor called --> outputs "In interceptor" 
//-> 2. Math.min will be called as normal and will return 1
```

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

* Observe anything
* Change anything
* Always at runtime

## Intercepting Basic Functions

Here is an example where we intercept Math.min using an anonymous function as an interceptor.

```javascript
var Scarlet = require('scarlet');
var scarlet = new Scarlet();

Math.min = scarlet.intercept(Math.min)
    .using(function(proceed){
        proceed();
    }).proxy();

var result = Math.min(1, 2, 3); //result = 1;
```

We could just as easily change the behaviour or Math.min to always return the result of Math.max as follows: 

```javascript
var Scarlet = require('scarlet');
var scarlet = new Scarlet();

Math.min = scarlet.intercept(Math.min)
    .using(function(proceed, invocation){ 
        proceed(null, Math.max(invocation.args));
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

function myInterceptor(proceed) {
    // 'Prelude Code' or 'Before Advice'
    var result = proceed(); // 'Target Method' or 'Join Point'
    // 'Postlude Code' or 'After Advice'
    timesCalled += 1;
}

function MyClass() {
    var self = this;
    self.memberProperty1 = "any";
    self.memberFunction1 = function() {};
    self.memberFunction2 = function() {};
}

MyProxiedClass = scarlet
    .intercept(MyClass)
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
    .intercept(myFunction)
    .using(function(proceed){
        var thisContext = this;
        process.nextTick(function(){ //Asynchronous interceptor method dispatch
            proceed(); // Continuation, without synchronous methods will break
        });
    }).proxy();

```

The benefits of this approach is that you can have interceptors that perform asynchronous behaviour; write to a databse, file, etc. The down side is this could effect synchronous methods.

## Using Multiple Interceptors

You can also use multiple interceptors on the same function: 

```javascript
var Scarlet = require("scarlet");
var scarlet = new Scarlet();

function myInterceptor1(proceed) {proceed();};

function myInterceptor2(proceed) {proceed();};

function myFunction() {...}

myFunction = scarlet
    .intercept(myFunction)
    .using(myInterceptor1)
    .using(myInterceptor2)
    .proxy();
```

It is important to note that interceptors are chained together using a 'Russian Dolls' call pattern. So each **proceed** is the next interceptor in the call chain until the concrete method is finally passed through. The benefit of this is each interceptor can override the previous interceptors results. The last interceptor has the final say though. 

## Using Events

Scarlet interceptors emit the following events:

 - **before**: emitted before *interceptors* are called
 - **after**: emitted after *intercepted* method, not called if error
 - **done**: emitted after all *interceptors* and *intercepted* method called
 - **error**: emitted if an error occurs

```javascript
Scarlet.intercept(Math.min)
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

### A Simple Interceptor

```javascript
function myInterceptor1(proceed) {
    proceed();
}
```

 - **this**: Is always the context of the instance of the object.
 - **proceed**: Is the callback to proceed to the next interceptor or main method.  The result of this funtion is the result of the intercepted method.

### Interceptor with Invocation object

```javascript
function myInterceptor1(invocation, proceed) {
    proceed();
}
```

 - **this**: Is always the context of the instance of the object.
 - **proceed**: Is the callback to proceed to the next interceptor or main method.  The result of this funtion is the result of the intercepted method.
 - **invocation**: Is an object which contains meta data about the function being intercepted. 


### Interceptor with Invocation and Error object

```javascript
function myInterceptor1(error, invocation, proceed) {
    proceed();
}
```

 - **this**: Is always the context of the instance of the object.
 - **proceed**: Is the callback to proceed to the next interceptor or main method.  The result of this funtion is the result of the intercepted method.
 - **invocation**: Is an object which contains meta data about the function being intercepted. 
 - **error**: Is the error, if any that has been returned by any previous interceptors.

## Invocation Properties

### Args

A property which can be used to determine the arguments of the proxied method

```javascript
function myInterceptor1(invocation, proceed) {
    console.log(invocation.args); //args -> [1,2,3];
    proceed();
};

Math.min = scarlet.intercept(Math.min)
                    .using(myInterceptor1)
                    .proxy();
Math.min(1,2,3);
```

### Result

A property which can be used to determine or change the result of the proxied method

```javascript
function myInterceptor1(invocation, proceed) {
    proceed();
    console.log(invocation.result); //result -> 1;
    invocation.result = 100; //Modifies the result to be 100;
};

Math.min = scarlet.intercept(Math.min)
                    .using(myInterceptor1)
                    .proxy();
var result = Math.min(1,2,3);
console.log(result); //result -> 100
```

### Member Name

A property which can be used to determine the name of the proxied method.

```javascript
function myInterceptor1(invocation, proceed) {
    proceed();
    console.log(invocation.memberName); //result -> min;
};

Math.min = scarlet.intercept(Math.min)
                    .using(myInterceptor1)
                    .proxy();
var result = Math.min(1,2,3);
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
            function interceptor(proceed)
                console.log("In interceptor");
                proceed();
            };
            function doStuff () {
                console.log("In doStuff");
            }
            doStuff = scarlet
                .intercept(doStuff)
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
        -->interceptor<function<anonymous>>(proceed,invocation) // interceptor is called
                |
                --> var result = proceed(); // interceptor calls 'actual' method and saves 'result'
                        |
                        -->interceptor<function<anonymous>>(proceed, invocation) // interceptor is called
                            |
                            --> return result; // result is returned. 
``` 

## Performance

Benchmarking has been performed against a [hooks](https://github.com/bnoguchi/hooks-js).  See [Performance Tests](https://github.com/scarletjs/scarlet/tree/master/perf) for details.

## Api Reference

For all api information see the [docs](https://github.com/scarletjs/scarlet/tree/master/docs).

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
