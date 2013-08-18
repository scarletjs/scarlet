## Scarlet

* [using][0]
* [resolve][1]
* [Scarlet][2]
* [loadPlugin][3]
* [intercept][4]

## Invocation

* [Invocation][5]
* [proceed][6]

## Proxy

* [ProxyInstance][7]

## Scarlet

### using

Example:

    function AnyObject() {};
    function interceptor1(proceed) { proceed();}
    function interceptor2(proceed) { proceed();}
    
    scarlet.intercept(AnyObject) 
                //indicates the first interceptor to be called
                .using(interceptor1)
                //indicates the second interceptor to be called
                .using(interceptor2);
                //-> AnyObject will now have the two interceptors attached
    

#### Arguments

1. targetMethod (Function) - the method to call when the type or instance is intercepted
2. targetThisContext (Function) - the reference to self/this to be used when calling the intercepotr

#### Returns  
  
(Function) - A reference to the current interceptor(self)

### resolve

Example:

    function AnyObject() {};
    AnyObject = scarlet.intercept(AnyObject)
                        .using(interceptor)
                        .resolve();
    //-> AnyObject will contain the **interceptor**
    

#### Arguments

#### Returns  
  
(Function) - A reference to the function being intercepted

### Scarlet

Example:

    Scarlet
        .intercept(someFunction)
        .using(someInterceptorFunction);
        

#### Arguments

1. pluginArr (Array) - the array of plugins to load

### loadPlugin

Example:

    Scarlet.loadPlugin(someScarletPlugin);
        

#### Arguments

1. pluginPath (Function | Object) - the plugin to be loaded

#### Returns  
  
(Function) - A reference to scarlet(self)

### intercept

Example:

    Scarlet.intercept(someFunction);
        

#### Arguments

1. typeOrInstance (Function | Object) - the type or instance to be intercepted

#### Returns  
  
(Function) - An interceptor object

## Invocation

### Invocation

Maintains the following properties for the object or function being intercepted:  
\* args (Object) - The original args passed into the function being intercepted  
\* object (Function|Object) - The original object or function  
\* method (Function|Object) - The method being intercepted  
\* result (Function|Object) - The result of the method being intercepted

#### Arguments

1. object (Function | Object) - the original object or function
2. method (Function | Object) - the method being intercepted
3. args (Function | Object) - the original args passed into the function being intercepted

### proceed

#### Arguments

#### Returns  
  
(Function | Object) - of the result of the original method call

## Proxy

### ProxyInstance

Example:

    //init a scarlet interceptor
    var interceptor = new Interceptor(someInstance);
    
    //create the ProxyInstance with the scarlet interceptor
    var proxy = new ProxyInstance(interceptor);
    
    //Set the proxied method to call when the instance gets called
    proxy.whenCalled(function(method,args){
            //-->Do stuff with the method and args of the proxied object
    });        
    //--> someInance will now call the proxy when it's called
    

#### Arguments

1. interceptor (Function | Object) - the scarlet interceptor to apply



[0]: #using
[1]: #resolve
[2]: #scarlet
[3]: #loadplugin
[4]: #intercept
[5]: #invocation
[6]: #proceed
[7]: #proxyinstance