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
* [`result`][9]
* [`method`][10]
* [`objectName`][11]
* [`methodName`][12]
* [`executionStartDate`][13]
* [`executionEndDate`][14]
* [`proceed`][15]

## `Interception Methods`

### `Interceptor`

[\#][0] [Ⓣ][16]

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

[\#][1] [Ⓣ][16]

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

[\#][2] [Ⓣ][16]

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

[\#][3] [Ⓣ][16]

#### Example:

    Scarlet
        .intercept(someFunction)
        .using(someInterceptorFunction);
    

#### Arguments

1. `pluginArr` _(Array)_ - - optional array of plugins to load

---

### `intercept`

[\#][4] [Ⓣ][16]

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

[\#][5] [Ⓣ][16]

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

[\#][6] [Ⓣ][16]

#### Example:

    Scarlet.loadPlugin(someScarletPlugin);
    

#### Arguments

1. `pluginPath` _(Function | Object)_ - the plugin to be loaded

#### Returns  
  
_(Function)_ - A reference to scarlet(self)

---

## `Invocation Attributes`

### `args`

[\#][7] [Ⓣ][17]

#### Types

  * _Object_

The original arguments passed into the function being intercepted

---

### `object`

[\#][8] [Ⓣ][17]

#### Types

  * _Object_

The reference to self for the original/called methd

---

### `result`

[\#][9] [Ⓣ][17]

#### Types

  * _Any_

The result of the method being intercepted

---

### `method`

[\#][10] [Ⓣ][17]

#### Types

  * _Function_

The method being intercepted

---

### `objectName`

[\#][11] [Ⓣ][17]

#### Types

  * _String_

Gets the name of the intercepted object

---

### `methodName`

[\#][12] [Ⓣ][17]

#### Types

  * _String_

Gets the name of the intercepted method

---

### `executionStartDate`

[\#][13] [Ⓣ][17]

#### Types

  * _Date_

The start date time when the method was invoked

---

### `executionEndDate`

[\#][14] [Ⓣ][17]

#### Types

  * _Date_

The end date time when the method was invoked

---

### `proceed`

[\#][15] [Ⓣ][17]

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
[9]: #result
[10]: #method
[11]: #objectname
[12]: #methodname
[13]: #executionstartdate
[14]: #executionenddate
[15]: #proceed
[16]: #interception-methods
[17]: #invocation-attributes