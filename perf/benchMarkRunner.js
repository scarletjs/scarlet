var Benchmark = require('benchmark');


var Runner = function(){};

Runner.prototype.Benchmark = Benchmark;

Runner.prototype.run = function(suites){

  var window = typeof global == 'object' && global || this;

  /** Used to access the Firebug Lite panel (set by `run`) */
  var fbPanel;

  /** Used to match path separators */
  var rePathSeparator = /[\/\\]/;

  /** Used to detect primitive types */
  var rePrimitive = /^(?:boolean|number|string|undefined)$/;

  /** Used to match RegExp special characters */
  var reSpecialChars = /[.*+?^=!:${}()|[\]\/\\]/g;

  /** Detect if in a browser environment */
  var isBrowser = isHostType(window, 'document') && isHostType(window, 'navigator');

  /** Detect Java environment */
  var isJava = !isBrowser && /Java/.test(toString.call(window.java));

  /** Add `console.log()` support for Narwhal, Rhino, and RingoJS */
  var console = window.console || (window.console = { 'log': window.print });

    /**
     * Computes the geometric mean (log-average) of an array of values.
     * See http://en.wikipedia.org/wiki/Geometric_mean#Relationship_with_arithmetic_mean_of_logarithms.
     *
     * @param {Array} array The array of values.
     * @returns {Number} The geometric mean.
     */
    function getGeometricMean(array) {
    	var sum = 0;
    	for (var i = 0; i < array.length; i++) {
    		var value = array[i];
    		sum = sum + Math.log(value);
    	};

      return Math.pow(Math.E, sum / array.length) || 0;
    }

    /**
     * Gets the Hz, i.e. operations per second, of `bench` adjusted for the
     * margin of error.
     *
     * @param {Object} bench The benchmark object.
     * @returns {Number} Returns the adjusted Hz.
     */
    function getHz(bench) {
      var result = 1 / (bench.stats.mean + bench.stats.moe);
      return isFinite(result) ? result : 0;
    }

    /**
     * Host objects can return type values that are different from their actual
     * data type. The objects we are concerned with usually return non-primitive
     * types of "object", "function", or "unknown".
     *
     * @param {Mixed} object The owner of the property.
     * @param {String} property The property to check.
     * @returns {Boolean} Returns `true` if the property value is a non-primitive, else `false`.
     */
    function isHostType(object, property) {
      if (object == null) {
        return false;
      }
      var type = typeof object[property];
      return !rePrimitive.test(type) && (type != 'object' || !!object[property]);
    }

    /**
     * Logs text to the console.
     *
     * @param {String} text The text to log.
     */
    function log(text) {
      console.log(text + '');
      if (fbPanel) {
        // scroll the Firebug Lite panel down
        fbPanel.scrollTop = fbPanel.scrollHeight;
      }
    }

  /**
   * Runs all benchmark suites.
   *
   */
  function run() {
    fbPanel = (fbPanel = window.document && document.getElementById('FirebugUI')) &&
      (fbPanel = (fbPanel = fbPanel.contentWindow || fbPanel.contentDocument).document || fbPanel) &&
      fbPanel.getElementById('fbPanel1');

    log('\nSit back and relax, this may take a while.');
    if (suites.length > 0 ) {
      suites[0]();
    }
  }

  var score = { 'a': [], 'b': [] };

  Benchmark.extend(Benchmark.Suite.options, {
  'onStart': function() {
    log('\n' + this.name + ':');
  },
  'onCycle': function(event) {
    log(event.target);
  },
  'onComplete': function() {
    for (var index = 0, length = this.length; index < length; index++) {
      var bench = this[index];

      if (bench.error) {
        var errored = true;
      }
    }
    if (errored) {
      log('There was a problem, skipping...');
    }
    else {
      var formatNumber = Benchmark.formatNumber,
          fastest = this.filter('fastest'),
          fastestHz = getHz(fastest[0]),
          slowest = this.filter('slowest'),
          slowestHz = getHz(slowest[0]),
          aHz = getHz(this[0]),
          bHz = getHz(this[1]);

      if (fastest.length > 1) {
        log('It\'s too close to call.');
        aHz = bHz = slowestHz;
      }
      else {
        var percent = ((fastestHz / slowestHz) - 1) * 100;

        log(
          fastest[0].name + ' is ' +
          formatNumber(percent < 1 ? percent.toFixed(2) : Math.round(percent)) +
          '% faster.'
        );
      }
      // add score adjusted for margin of error
      score.a.push(aHz);
      score.b.push(bHz);
    }
    // remove current suite from queue
    suites.shift();

    if (suites.length) {
      // run next suite
      suites[0]();
    }
    else {
      var aMeanHz = getGeometricMean(score.a),
          bMeanHz = getGeometricMean(score.b),
          fastestMeanHz = Math.max(aMeanHz, bMeanHz),
          slowestMeanHz = Math.min(aMeanHz, bMeanHz),
          xFaster = fastestMeanHz / slowestMeanHz,
          percentFaster = formatNumber(Math.round((xFaster - 1) * 100)),
          message = 'is ' + percentFaster + '% ' + (xFaster == 1 ? '' : '(' + formatNumber(xFaster.toFixed(2)) + 'x) ') + 'faster than';

          log(score.a);
          log(score.b);
      // report results
      if (aMeanHz >= bMeanHz) {
        log('\n' + this[0].name + ' ' + message + ' ' + this[1].name + '.');
      } else {
        log('\n' + this[1].name + ' ' + message + ' ' + this[0].name+ '.');
      }
    }
  }
  });

  if (Benchmark.platform + '') {
    log(Benchmark.platform);
  }
  // in the browser, expose `run` to be called later
  if (window.document && !window.phantom) {
    window.run = run;
  } else {
    run();
  }


};

module.exports = new Runner();