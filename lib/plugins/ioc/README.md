scarlet
=======

A Javascript interceptor

#Installation

    npm install scarlet
    
#Getting Started

##Register An Interceptor

    var Scarlet = require("scarlet");
  	Scarlet.register(new myInterceptor()).forObject(objectToIntercept);
    
Registering an interceptor injects an interceptor between every method on an object.  Now whenever the "objectToIntercept" is instantiated all methods will be intercepted:

    var myInterceptedObject = new objecToIntercept();
    myInterceptedObject.dostuff(); //the method call will make a call to the interceptor

##Restore An Object Without An Interceptor

In certain cases you may want to remove the interceptor and reset the object back to how it was before interception.

    Scarlet.reset(); //Resets all registered objects
