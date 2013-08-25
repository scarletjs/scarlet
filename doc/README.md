# Scarlet

## `Interception Methods`

* [`Interceptor`][0]
* [`using`][1]
* [`resolve`][2]
* [`Scarlet`][3]
* [`intercept`][4]
* [`interceptAsync`][5]
* [`loadPlugin`][6]

## `Invocation Attributes`

* [`args`][7]
* [`object`][8]
* [`method`][9]
* [`result`][10]
* [`proceed`][11]

## `Interception Methods`

### `Interceptor`

[\#][0] [Ⓣ][12]

#### Emited Events

* before - emitted before _interceptors_ are called
* after - emitted after _intercepted_ method
* done - emitted after all _interceptors_ and _intercepted_ method called

#### Example:

Basic interceptor

    Scarlet.intercept(someFunction)
           .using(someInterceptor);
    

Interceptor with events

    Scarlet.intercept(someFunction)
            .on('before', beforeFunction)
            .on('after', afterFunction)
            .on('done', doneFunction);
    

#### Arguments

1. `typeOrInstance` _(Function | Object)_ - the type or instance to be intercepted

#### Returns  
  
_(Function)_ - A Scarlet interceptor object.

---

### `using`

[\#][1] [Ⓣ][12]

#### Example:

    function AnyObject() {};
    function interceptor1(proceed) { proceed();}
    function interceptor2(proceed) { proceed();}
    
    scarlet.intercept(AnyObject) 
            .using(interceptor1) //->indicates the first interceptor to be called
            .using(interceptor2); //->indicates the second interceptor to be called
    
    //-> AnyObject will now have the two interceptors attached
    

#### Arguments

1. `targetMethod` _(Function)_ - the method to call when the type or instance is intercepted
2. `targetThisContext` _(Function)_ - the reference to self/this to be used when calling the intercepotr

#### Returns  
  
_(Function)_ - A reference to the current interceptor(self)

---

### `resolve`

[\#][2] [Ⓣ][12]

#### Example:

    function AnyObject() {};
    
    AnyObject = scarlet.intercept(AnyObject)
                        .using(interceptor)
                        .resolve();
    
    //-> AnyObject will contain the **interceptor**
    

#### Returns  
  
_(Function)_ - A reference to the function being intercepted

---

### `Scarlet`

[\#][3] [Ⓣ][12]

#### Example:

    Scarlet
        .intercept(someFunction)
        .using(someInterceptorFunction);
    

#### Arguments

1. `pluginArr` _(Array)_ - - optional array of plugins to load

---

### `intercept`

[\#][4] [Ⓣ][12]

#### Example:

Basic interceptor

    Scarlet.intercept(someFunction);
    

interceptor with events

    Scarlet.intercept(someFunction)
           .on('before', beforeFunction)
           .on('after', afterFunction)
           .on('done', doneFunction);
    

#### Arguments

1. `typeOrInstance` _(Function | Object)_ - the type or instance to be intercepted

#### Returns  
  
_(Function)_ - A Scarlet interceptor object.

---

### `interceptAsync`

[\#][5] [Ⓣ][12]

#### Example:

Given an asynchronous interceptor:

    function asyncInterceptor(proceed){
        setTimeout(function(){
            //done with long task
            proceed
        },10);
    }
    

Basic interceptor

    Scarlet.interceptAsync(someFunction)
           .using(asyncInterceptor)
    

interceptor with events

    Scarlet.intercept(someFunction)
           .using(asyncInterceptor)
           .on('before', beforeFunction)
           .on('after', afterFunction)
           .on('done', doneFunction);
    

#### Arguments

1. `typeOrInstance` _(Function | Object)_ - the type or instance to be intercepted

#### Returns  
  
_(Function)_ - A Scarlet interceptor object.

---

### `loadPlugin`

[\#][6] [Ⓣ][12]

#### Example:

    Scarlet.loadPlugin(someScarletPlugin);
    

#### Arguments

1. `pluginPath` _(Function | Object)_ - the plugin to be loaded

#### Returns  
  
_(Function)_ - A reference to scarlet(self)

---

## `Invocation Attributes`

### `args`

[\#][7] [Ⓣ][13]

#### Types

  * _Object_

The original arguments passed into the function being intercepted

---

### `object`

[\#][8] [Ⓣ][13]

#### Types

  * _Object_

The reference to self for the original/called methd

---

### `method`

[\#][9] [Ⓣ][13]

#### Types

  * _Function_

The method being intercepted

---

### `result`

[\#][10] [Ⓣ][13]

#### Types

  * _Any_

The result of the method being intercepted

---

### `proceed`

[\#][11] [Ⓣ][13]

Calls the intercepted method

#### Returns  
  
_(Function | Object)_ - of the result of the original method call

---



[0]: #interceptor
[1]: #using
[2]: #resolve
[3]: #scarlet
[4]: #intercept
[5]: #interceptasync
[6]: #loadplugin
[7]: #args
[8]: #object
[9]: #method
[10]: #result
[11]: #proceed
[12]: #interception-methods
[13]: #invocation-attributes