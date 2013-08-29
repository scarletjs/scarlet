Scarlet
=======

The simple fast javascript interceptor for methods and properties.

[![Build Status](https://travis-ci.org/scarletjs/scarlet.png?branch=0.0.24)](https://travis-ci.org/scarletjs/scarlet)

![Scarlet!](http://www.scarletjs.com/img/scarlet.png)

## Installation

    npm install scarlet

## Start Intercepting


```javascript
var scarlet = require('scarlet');

scarlet.intercept(Math,"min")
        .using(function(proceed){ 
                console.log("In interceptor");
                proceed(); 
        });
        
Math.min(1,2,3);
//-> 1. interceptor called --> outputs "In interceptor" 
//-> 2. Math.min will be called as normal and will return 1

```

### What does Scarlet call when?
```
-->someFunction  //call to main method
        |
        |
        -->interceptor //before method starts
                |
                |
                -->someFunction //after the interceptor **proceeds**
                        |
                        |
                        -->interceptor // interceptor gets main method results
``` 

## Project Purpose

To be a simple easy to use javascript method and property interception framework. *Interception* allows you to gain access to **methods** and **properties** when they get called.  This gives you access to the **arguments**, **results**, and context of **this** for the called method. In addition, it allows you to dynamically change the behavior of a method/property.  For more about interception and aop read [here](http://en.wikipedia.org/wiki/Aspect-oriented_programming).


This project focuses on the following foundations:

* Performance
* Documentation
* Simple straightforward API
* Browser compatible
* Clean Code

## Why you should choose Scarlet?

Scarlet was written to elimante the complexities with creating interceptors.  The project allows you to seamlessly integrate aop interception into your application, framework, or method.  Here are a couple of reasons **Scarlet** was written:

* Intercept all object members
* Creation of interception events
* Creation of asynchronous interceptors
* Access to intercpted method details (method name,arguments, result, execution start and end date)

### Intercept all object members

One of the main benefits is that you can intercept all **enumerable** members for an object as follows:

```javascript
function someFunction(){
	var self = this;
    
	self.memberFunction1 = function(){};
	self.memberFunction2 = function(){};
}

scarlet.intercept(someFunction) //-> memberFunction1 and 2 will now be intercepted
		.using(someInterceptor);
```
This stops you from writing each member when setting up an interceptor. It allows you to change *someFunction* and not have to change the interceptor definition; this is especially nice for logging all method calls in an object.

### Creation of interception events

Scarlet interceptors emit the following events:

* before - emitted before *interceptors* are called
* after - emitted after *intercepted* method
* done - emitted after all *interceptors* and *intercepted* method called
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

### Access to intercpted method details (arguments, result, etc)

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

Scarlet interceptors emit the following events:

* before - emitted before *interceptors* are called
* after - emitted after *intercepted* method
* done - emitted after all *interceptors* and *intercepted* method called
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
