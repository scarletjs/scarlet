scarlet
=======

[![Build Status](https://travis-ci.org/tjchaplin/scarlet.png?branch=master)](https://travis-ci.org/tjchaplin/scarlet)

A Javascript interceptor

##Installation

    npm install scarlet

#Api Reference

For all api information see the [docs](https://github.com/scarletjs/scarlet/tree/master/doc).

##Examples

###Using in the browser
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
