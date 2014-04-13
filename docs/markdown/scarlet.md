## `Methods`
* [`Scarlet`][0]
* [`intercept`][1]
* [`using`][2]
* [`proxy`][3]
* [`load`][4]

## `Declarations`

## `Methods`

### `Scarlet`

[\#][0] | [Ⓣ][5]



#### Arguments
1. `pluginArr` (*array | string*) - 

#### Returns  
  
(*scarlet.lib.Scarlet*) - 

---



### `intercept`

[\#][1] | [Ⓣ][5]



            var Scarlet = require("scarlet");
            var scarlet = new Scarlet();
    
            // Type for that we would like to intercept
            function MyClass(){
                var self = this;
                self.myMethod = function(arg1, arg2){
                    return arg1 + arg2;
                };
            }
    
            // First instantiate the type
            var instance = new MyClass();
    
            // Scarlet will only intercept the instance
            instance = scarlet
                .intercept(instance)
                .using(function(info, method, args){
                    return method.call(this, info, method, args);
                }).proxy();
    
            // Invoke
            var result = instance.myMethod(1,2);

---



### `using`

[\#][2] | [Ⓣ][5]



            var Scarlet = require("scarlet");
            var scarlet = new Scarlet();
    
            // Type for that we would like to intercept
            function MyClass(){
                var self = this;
                self.myMethod = function(arg1, arg2){
                    return arg1 + arg2;
                };
            }
    
            // First instantiate the type
            var instance = new MyClass();
    
            // Scarlet will only intercept the instance
            instance = scarlet
                .intercept(instance)
                .using(function(info, method, args){ // Interceptor 1
                    return method.call(this, info, method, args);
                })
                .using(function(info, method, args){ // Interceptor 2
                    return method.call(this, info, method, args);
                })
                .using(function(info, method, args){ // Interceptor 3
                    return method.call(this, info, method, args);
                }).proxy();
    
            // Invoke
            var result = instance.myMethod(1,2);

---



### `proxy`

[\#][3] | [Ⓣ][5]



---



### `load`

[\#][4] | [Ⓣ][5]



---



## `Declarations`
[0]: #scarlet
[1]: #intercept
[2]: #using
[3]: #proxy
[4]: #load
[5]: #methods