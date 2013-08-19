# Scarlet

## `Invocation Attributes`

* [`args`][0]
* [`object`][1]
* [`method`][2]
* [`result`][3]
* [`proceed`][4]

## `Interception Methods`

* [`Scarlet`][5]
* [`intercept`][6]
* [`using`][7]
* [`resolve`][8]
* [`loadPlugin`][9]

## `Invocation Attributes`

### `args`

[\#][0] [Ⓣ][10]

#### Types

  * _Object_

The original arguments passed into the function being intercepted

---

### `object`

[\#][1] [Ⓣ][10]

#### Types

  * _Object_

The reference to self for the original/called methd

---

### `method`

[\#][2] [Ⓣ][10]

#### Types

  * _Function_

The method being intercepted

---

### `result`

[\#][3] [Ⓣ][10]

#### Types

  * _Any_

The result of the method being intercepted

---

### `proceed`

[\#][4] [Ⓣ][10]

Calls the intercepted method

#### Returns  
  
_(Function | Object)_ - of the result of the original method call

---

## `Interception Methods`

### `Scarlet`

[\#][5] [Ⓣ][11]

#### Example:

    Scarlet
        .intercept(someFunction)
        .using(someInterceptorFunction);
    

#### Arguments

1. `pluginArr` _(Array)_ - - optional array of plugins to load

---

### `intercept`

[\#][6] [Ⓣ][11]

#### Example:

    Scarlet.intercept(someFunction);
    

#### Arguments

1. `typeOrInstance` _(Function | Object)_ - the type or instance to be intercepted

#### Returns  
  
_(Function)_ - An interceptor object

---

### `using`

[\#][7] [Ⓣ][11]

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

[\#][8] [Ⓣ][11]

#### Example:

    function AnyObject() {};
    
    AnyObject = scarlet.intercept(AnyObject)
                        .using(interceptor)
                        .resolve();
    
    //-> AnyObject will contain the **interceptor**
    

#### Returns  
  
_(Function)_ - A reference to the function being intercepted

---

### `loadPlugin`

[\#][9] [Ⓣ][11]

#### Example:

    Scarlet.loadPlugin(someScarletPlugin);
    

#### Arguments

1. `pluginPath` _(Function | Object)_ - the plugin to be loaded

#### Returns  
  
_(Function)_ - A reference to scarlet(self)

---



[0]: #args
[1]: #object
[2]: #method
[3]: #result
[4]: #proceed
[5]: #scarlet
[6]: #intercept
[7]: #using
[8]: #resolve
[9]: #loadplugin
[10]: #invocation-attributes
[11]: #interception-methods