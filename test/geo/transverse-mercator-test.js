require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.geo.transverseMercator");

suite.addBatch({
  "default transverseMercator": {
    topic: function() {
      return d3.geo.transverseMercator();
    },
    "projects a point to the expected location": function(projection) {
      assert.inDelta(projection([-122.4183, 37.7750]), [359.137150, -76.395031], 1e-6);
    },
    "inverts a location to the expected point": function(projection) {
      assert.inDelta(projection.invert([359.137150, -76.395031]), [-122.4183, 37.7750], 1e-6);
    }
  }
});

suite.export(module);
