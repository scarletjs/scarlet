# Scarlet

## `Interception Methods`

* [`Interceptor`][0]
* [`using`][1]
* [`resolve`][2]
* [`Scarlet`][3]
* [`extend`][4]
* [`intercept`][5]
* [`interceptAsync`][6]
* [`loadPlugin`][7]

## `Invocation Attributes`

* [`args`][8]
* [`object`][9]
* [`result`][10]
* [`method`][11]
* [`objectName`][12]
* [`methodName`][13]
* [`executionStartDate`][14]
* [`executionEndDate`][15]
* [`proceed`][16]

## `Interception Methods`

### `Interceptor`

[\#][0] [Ⓣ][17]

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

[\#][1] [Ⓣ][17]

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

[\#][2] [Ⓣ][17]

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

[\#][3] [Ⓣ][17]

#### Example:

    Scarlet
        .intercept(someFunction)
        .using(someInterceptorFunction);
    

#### Arguments

1. `pluginArr` _(Array)_ - - optional array of plugins to load

---

### `extend`

[\#][4] [Ⓣ][17]

#### Example:

    scarlet.extend(someObject);
    //-> someObject can now invoke and call scarlet members
    

#### Arguments

1. `target` _(Function | Object)_ - the object to put the scarlet properties on

#### Returns  
  
_(Function)_ - A Scarlet interceptor object.

---

### `intercept`

[\#][5] [Ⓣ][17]

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

[\#][6] [Ⓣ][17]

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

[\#][7] [Ⓣ][17]

#### Example:

    Scarlet.loadPlugin(someScarletPlugin);
    

#### Arguments

1. `pluginPath` _(Function | Object)_ - the plugin to be loaded

#### Returns  
  
_(Function)_ - A reference to scarlet(self)

---

## `Invocation Attributes`

### `args`

[\#][8] [Ⓣ][18]

#### Types

  * _Object_

The original arguments passed into the function being intercepted

---

### `object`

[\#][9] [Ⓣ][18]

#### Types

  * _Object_

The reference to self for the original/called methd

---

### `result`

[\#][10] [Ⓣ][18]

#### Types

  * _Any_

The result of the method being intercepted

---

### `method`

[\#][11] [Ⓣ][18]

#### Types

  * _Function_

The method being intercepted

---

### `objectName`

[\#][12] [Ⓣ][18]

#### Types

  * _String_

Gets the name of the intercepted object

---

### `methodName`

[\#][13] [Ⓣ][18]

#### Types

  * _String_

Gets the name of the intercepted method

---

### `executionStartDate`

[\#][14] [Ⓣ][18]

#### Types

  * _Date_

The start date time when the method was invoked

---

### `executionEndDate`

[\#][15] [Ⓣ][18]

#### Types

  * _Date_

The end date time when the method was invoked

---

### `proceed`

[\#][16] [Ⓣ][18]

Calls the intercepted method

#### Returns  
  
_(Function | Object)_ - of the result of the original method call

---



[0]: #interceptor
[1]: #using
[2]: #resolve
[3]: #scarlet
[4]: #extend
[5]: #intercept
[6]: #interceptasync
[7]: #loadplugin
[8]: #args
[9]: #object
[10]: #result
[11]: #method
[12]: #objectname
[13]: #methodname
[14]: #executionstartdate
[15]: #executionenddate
[16]: #proceed
[17]: #interception-methods
[18]: #invocation-attributes