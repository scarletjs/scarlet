Scarlet
=======

The simple fast javascript interceptor for methods and properties.

[![Build Status](https://travis-ci.org/scarletjs/scarlet.png?branch=0.0.24)](https://travis-ci.org/scarletjs/scarlet)

[![NPM](https://nodei.co/npm/scarlet.png?downloads=true)](https://nodei.co/npm/scarlet/)

![Scarlet!](http://www.scarletjs.com/img/scarlet.png)

## Installation

    npm install scarlet

## Start Intercepting

Here is an example where we intercept Math.min using an anonymous function as an interceptor.

```javascript
var scarlet = require('scarlet');

Math.min = scarlet.intercept(Math.min, scarlet.type.asFunction())
    .using(function(info, method, args){ 
        var result = method.call(this, info, method, args);
        return result;
    }).proxy();

var result = Math.min(1, 2, 3); //result = 1;
```

We could just as esily change the behaviour or Math.min to always return the result of Math.max as follows: 

```javascript
var scarlet = require('scarlet');

Math.min = scarlet.intercept(Math.min, scarlet.type.asFunction())
    .using(function(info, method, args){ 
        return Math.max(args);
    }).proxy();

var result = Math.min(1, 2, 3); //result = 3;
```

As you can see we use Scarlet in a capacity not only where we 'observe' behaviour but we can effectively 'change'
it. Scarlet also has the ability to intercept constructors, properties and functions. Pretty neat huh? :)

### What does Scarlet call when?

Here is a visual breakdown of a pseudo callstack for the Math.min example above.  

```
-->Math.min(1,2,3) // proxied method is called
        |
        |
        -->interceptor<function<anonymous>>(info, method, args) // interceptor is called
                |
                |
                --> var result = method.call(this, info, method, args) // interceptor calls 'actual' method and saves 'result'
                        |
                        |
                        -->interceptor<function<anonymous>>(info, method, args) // interceptor is called
                            |
                            |
                            --> return result; // result is returned. 
``` 

## Project Purpose

To be a simple easy to use javascript method and property interception framework. *Interception* allows you to gain access 
to **methods** and **properties** when they get called.  This gives you access to the **arguments**, **results**, and 
context of **this** for the called method. In addition, it allows you to dynamically change the behavior of a 
method/property.  

For more about interception and aop read [here](http://en.wikipedia.org/wiki/Aspect-oriented_programming).

This project focuses on the following foundations:

* Performance
* Documentation
* Simple straightforward API
* Browser compatible
* Clean Code

## Why you should choose Scarlet?

Scarlet was written to elimante the complexities with creating interceptors.  The project allows you to seamlessly 
integrate aop interception into your application, framework, or method.  Here are a couple of reasons **Scarlet** was 
written:

* Intercept all object members
* Creation of interception events
* Creation of asynchronous interceptors
* Access to intercepted method details

## Plugins

Scarlet allows for easy integration of plugins.  

Here are a few you might find useful:
* scarlet-ioc - A Javascript IoC container
* scarlet-winston - Scarlet plugin for using Winston with method and property event interception

### Creating a plugin

The best way to get started writing your own plugin, is to use the [scarlet-init](https://github.com/scarletjs/scarlet-init) 
project to get the project setup.

### Intercept all object members

One of the main benefits is that you can intercept all **enumerable** members for an object as follows:

```javascript
var assert = require('assert');

var interceptorTimesCalled = 0;

function someInterceptor(info, method, args) {
    // 'Prelude Code' or 'Before Advice'
    var result = method.call(this, info, method, args); // 'Target Method' or 'Join Point'
    interceptorTimesCalled += 1;
    // 'Postlude Code' or 'After Advice'
    return result;
}

function someFunction() {
    var self = this;
    self.memberProperty1 = "any";
    self.memberFunction1 = function() {};
    self.memberFunction2 = function() {};
}

someFunction = scarlet.intercept(someFunction, scarlet.type.asPrototype()) //-> memberFunction1 and 2 will now be intercepted
    .using(someInterceptor)
    .proxy();

var instance = new someFunction();
instance.memberProperty1 = "other";
instance.memberFunction1();
instance.memberFunction2();

assert(interceptorTimesCalled === 4); // Once for constructor and 3 times for members
```

### Creation of interception events

Scarlet interceptors emit the following events with the `invocation` object:

* before - emitted before *interceptors* are called
* after - emitted after *intercepted* method
* done - emitted after all *interceptors* and *intercepted* method called

If an error occurs in an interceptor, scarlet will emit an error event with the error data:
* error - emitted if an error occurs

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

### Creation of asynchronous interceptors

Scarlet allows you to create **asynchronous** interceptors, that will call the *intercepted* method once all the interceptors have completed.  here is an example

```javascript
function asyncInterceptor(proceed){
	setTimeout(function(){ 
        console.log("completed interceptor long running function");

        //-> proceeds to the next interceptor if one exists
        proceed(); 
     }, 10);
}

function asyncMethod(){
    console.log("Async method called");

    setTimeout(function(){
        console.log("Async method Completed");
    },10);
}

scarlet.interceptAsync(asyncMethod)
        .using(asyncInterceptor);
        
asyncMethod();
//-> 1. ~10 ms later --> outputs "completed interceptor long running function"
//-> 2. outputs "Async method called"
//-> 3. ~10 ms later --> outputs "Async method Completed"
```

### Access to intercepted method details (arguments, result, etc)

Scarlet provides interceptors with a view into the main method being called.  When an interceptor gets called the *2nd* argument contains an invocation object containing:

* args - the arguments passed into the method
* methodName - the method name being intercepted
* object - the *this* context of the called method
* objectName - the name of the *this* context object
* executionEndDate - the start datetime of the method execution
* executionStartDate - the start datetime of the method execution
* result - result of the method called (populated after main method gets called)

Here is an example of how to get result and args from the invocation object:

```javascript
function someInterceptor(proceed, invocation){
	proceed();
    
    console.log("intercepted method("+invocation.methodName+") returned:"+invocation.result);
    
    var parameters = Array.prototype.slice.call(invocation.args);
    console.log("given the following parameters:["+parameters+"]");
}

scarlet.intercept(Math,'min')
		.using(someInterceptor);

Math.min(1,2,3);
//-> 1. someInterceptor called
//-> 2. Math.min will be called as normal and will return 1
//-> 3. Outputs --> "intercepted method(min) returned:1"
//-> 4. Outputs --> "given the following parameters:[1,2,3]"
```

These are just of couple of the reasons why **Scarlet** was written and why you should use it.

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

### Creation of interception events

Scarlet interceptors emit the following events with the `invocation` object:

* before - emitted before *interceptors* are called
* after - emitted after *intercepted* method
* done - emitted after all *interceptors* and *intercepted* method called

If an error occurs in an interceptor, scarlet will emit an error event with the error data:
* error - emitted if an error occurs

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

### Multiple Interceptor

```javascript
var scarlet = require('scarlet');

function interceptor1(proceed){ proceed(); }
function interceptor2(proceed){ proceed(); }

scarlet.intercept(Math,"min")
        .using(interceptor1);
        .using(interceptor2);
        
var min = Math.min(1,2,3);
//-> 1. interceptor1 called
//-> 2. interceptor2 called
//-> Math.min called and returns result
```

### Async Interceptor

```javascript
function asyncInterceptor(proceed){
    setTimeout(function(){ 
        console.log("completed interceptor long running function");

        //-> proceeds to the next interceptor if one exists
        proceed(); 
     }, 10);
}

function asyncMethod(){
    console.log("Async method called");

    setTimeout(function(){
        console.log("Async method Completed");
    },10);
}

scarlet.interceptAsync(asyncMethod)
        .using(asyncInterceptor);
        
asyncMethod();
//-> 1. ~10 ms later --> outputs "completed interceptor long running function"
//-> 2. outputs "Async method called"
//-> 3. ~10 ms later --> outputs "Async method Completed"
```

### Using the invocation object

The following properties are available on the invocation(second argument to the interceptor)

* args - the arguments passed into the method
* methodName - the method name being intercepted
* object - the *this* context of the called method
* objectName - the name of the *this* context object
* executionEndDate - the end datetime of the method execution
* executionStartDate - the start datetime of the method execution
* result - result of the method called (populated after main method gets called)

```javascript
function someInterceptor(proceed, invocation){
    proceed();
    
    console.log("intercepted method("+invocation.methodName+") returned:"+invocation.result);
    
    var parameters = Array.prototype.slice.call(invocation.args);
    console.log("given the following parameters:["+parameters+"]");
}

scarlet.intercept(Math,'min')
        .using(someInterceptor);

Math.min(1,2,3);
//-> 1. someInterceptor called
//-> 2. Math.min will be called as normal and will return 1
//-> 3. Outputs --> "intercepted method(min) returned:1"
//-> 4. Outputs --> "given the following parameters:[1,2,3]"
```

### Browser Example

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
