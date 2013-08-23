# Scarlet

## `Interception Methods`

* [`Interceptor`][0]
* [`using`][1]
* [`resolve`][2]
* [`Scarlet`][3]
* [`intercept`][4]
* [`loadPlugin`][5]

## `Invocation Attributes`

* [`args`][6]
* [`object`][7]
* [`method`][8]
* [`result`][9]
* [`proceed`][10]

## `Interception Methods`

### `Interceptor`

[\#][0] [Ⓣ][11]

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

[\#][1] [Ⓣ][11]

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

[\#][2] [Ⓣ][11]

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

[\#][3] [Ⓣ][11]

#### Example:

    Scarlet
        .intercept(someFunction)
        .using(someInterceptorFunction);
    

#### Arguments

1. `pluginArr` _(Array)_ - - optional array of plugins to load

---

### `intercept`

[\#][4] [Ⓣ][11]

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

### `loadPlugin`

[\#][5] [Ⓣ][11]

#### Example:

    Scarlet.loadPlugin(someScarletPlugin);
    

#### Arguments

1. `pluginPath` _(Function | Object)_ - the plugin to be loaded

#### Returns  
  
_(Function)_ - A reference to scarlet(self)

---

## `Invocation Attributes`

### `args`

[\#][6] [Ⓣ][12]

#### Types

  * _Object_

The original arguments passed into the function being intercepted

---

### `object`

[\#][7] [Ⓣ][12]

#### Types

  * _Object_

The reference to self for the original/called methd

---

### `method`

[\#][8] [Ⓣ][12]

#### Types

  * _Function_

The method being intercepted

---

### `result`

[\#][9] [Ⓣ][12]

#### Types

  * _Any_

The result of the method being intercepted

---

### `proceed`

[\#][10] [Ⓣ][12]

Calls the intercepted method

#### Returns  
  
_(Function | Object)_ - of the result of the original method call

---



[0]: #interceptor
[1]: #using
[2]: #resolve
[3]: #scarlet
[4]: #intercept
[5]: #loadplugin
[6]: #args
[7]: #object
[8]: #method
[9]: #result
[10]: #proceed
[11]: #interception-methods
[12]: #invocation-attributes