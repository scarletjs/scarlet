var Scarlet = require("scarlet");

var scarlet = new Scarlet();

function Comment(content, email) {
  var self = this;
  self.email = email;
  self.content = content;
  self.created = new Date();
}

function Blog(title, content, author) {
  var self = this;
  self.comments = [];
  self.title = title;
  self.author = author;
  self.content = content;
  self.created = new Date();
  self.addComment = function(comment){
  	console.log("Inside the add comment method")
    this.comments.push(comment);
  };
}

var print = console.log;

var Blog = scarlet
  .intercept(Blog, scarlet.PROTOTYPE)
  .using(function(info, method, args){
    print("First interceptor called");
    return method.call(this, info, method, args);
  })
  .using(function(info, method, args){
    print("Second interceptor called");
    return method.call(this, info, method, args);
  })
  .proxy();


var anyBlog = new Blog("Example", "Hello World!", "anonymous");
anyBlog.addComment(new Comment("buuuurrrrrrp!", "beer@ticktockdevelopment.com"));
/*anyBlog.title = "Updated Example";
anyBlog.content = "Updated Content";
print("Completed creating objects!");*/
