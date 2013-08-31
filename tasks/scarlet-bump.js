  grunt.registerTask("scarlet-bump", "A task for bumping release announcements to twitter", function() {

    require("string-format");

    var done = this.async();
    var fs = require("fs");
    var http = require("http");
    var prompt = require("prompt");

    var packageContents = fs.readFileSync(__dirname + "/../package.json");
    var packageInstance = JSON.parse(packageContents);

    var project = packageInstance.name;
    var version = packageInstance.version;

    console.log("Please enter the scarlet twitter password to bump the release annnouncement:");

    prompt.start();

    prompt.get(["password"], function(err, result) {
      var req = http.get("http://www.scarletjs.com/release/bump?project={0}&version={1}&auth={2}".format(project, version, result.password), function(res) {
        console.log("Scarletjs.com: " + res.statusCode);
        console.log("Scarletjs.com: " + JSON.stringify(res.headers));
        done();
      });

    });

  });