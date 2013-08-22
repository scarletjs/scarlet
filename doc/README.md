# Scarlet

## `Interception Methods`

* [`using`][0]
* [`resolve`][1]
* [`Scarlet`][2]
* [`intercept`][3]
* [`loadPlugin`][4]

## `Invocation Attributes`

* [`args`][5]
* [`object`][6]
* [`method`][7]
* [`result`][8]
* [`proceed`][9]

## `Interception Methods`

### `using`

[\#][0] [Ⓣ][10]

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

[\#][1] [Ⓣ][10]

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

[\#][2] [Ⓣ][10]

#### Example:

    Scarlet
        .intercept(someFunction)
        .using(someInterceptorFunction);
    

#### Arguments

1. `pluginArr` _(Array)_ - - optional array of plugins to load

---

### `intercept`

[\#][3] [Ⓣ][10]

#### Example:

    Scarlet.intercept(someFunction);
    

#### Arguments

1. `typeOrInstance` _(Function | Object)_ - the type or instance to be intercepted

#### Returns  
  
_(Function)_ - An interceptor object

---

### `loadPlugin`

[\#][4] [Ⓣ][10]

#### Example:

    Scarlet.loadPlugin(someScarletPlugin);
    

#### Arguments

1. `pluginPath` _(Function | Object)_ - the plugin to be loaded

#### Returns  
  
_(Function)_ - A reference to scarlet(self)

---

## `Invocation Attributes`

### `args`

[\#][5] [Ⓣ][11]

#### Types

  * _Object_

The original arguments passed into the function being intercepted

---

### `object`

[\#][6] [Ⓣ][11]

#### Types

  * _Object_

The reference to self for the original/called methd

---

### `method`

[\#][7] [Ⓣ][11]

#### Types

  * _Function_

The method being intercepted

---

### `result`

[\#][8] [Ⓣ][11]

#### Types

  * _Any_

The result of the method being intercepted

---

### `proceed`

[\#][9] [Ⓣ][11]

Calls the intercepted method

#### Returns  
  
_(Function | Object)_ - of the result of the original method call

---



[0]: #using
[1]: #resolve
[2]: #scarlet
[3]: #intercept
[4]: #loadplugin
[5]: #args
[6]: #object
[7]: #method
[8]: #result
[9]: #proceed
[10]: #interception-methods
[11]: #invocation-attributes