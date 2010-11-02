/**
 * Returns a function that, given a GeoJSON feature, returns the corresponding
 * SVG path. The function can be customized by overriding the projection. Point
 * features are mapped to circles with a default radius of 4.5px; the radius
 * can be specified either as a constant or a function that is evaluated per
 * feature.
 */
d3.geo.geoJson = function() {
  var pointRadius = 4.5,
      pointCircle = d3_geoJson_circle(pointRadius),
      projection = d3.geo.albers();

  function geoJson(d, i) {
    if (typeof pointRadius == "function") {
      pointCircle = d3_geoJson_circle(pointRadius.apply(this, arguments));
    }
    return type(featureTypes, d);
  }

  function project(coordinates) {
    return projection(coordinates).join(",");
  }

  function type(types, o) {
    return o && o.type in types
        ? types[o.type](o)
        : "";
  }

  var featureTypes = {

    FeatureCollection: function(f) {
      var path = [],
          features = f.features,
          i = -1, // features.index
          n = features.length;
      while (++i < n) path.push(type(featureTypes, features[i]));
      return path.join("");
    },

    Feature: function(f) {
      return type(geometryTypes, f.geometry);
    }

  };

  var geometryTypes = {

    Point: function(o) {
      return "M" + project(o.coordinates) + pointCircle;
    },

    MultiPoint: function(o) {
      var path = [],
          coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length;
      while (++i < n) path.push("M", project(coordinates[i]), pointCircle);
      return path.join("");
    },

    LineString: function(o) {
      var path = ["M"],
          coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length;
      while (++i < n) path.push(project(coordinates[i]), "L");
      path.pop();
      return path.join("");
    },

    MultiLineString: function(o) {
      var path = [],
          coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length,
          subcoordinates, // coordinates[i]
          j, // subcoordinates.index
          m; // subcoordinates.length
      while (++i < n) {
        subcoordinates = coordinates[i];
        j = -1;
        m = subcoordinates.length;
        path.push("M");
        while (++j < m) path.push(project(subcoordinates[j]), "L");
        path.pop();
      }
      return path.join("");
    },

    Polygon: function(o) {
      var path = [],
          coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length,
          subcoordinates, // coordinates[i]
          j, // subcoordinates.index
          m; // subcoordinates.length
      while (++i < n) {
        subcoordinates = coordinates[i];
        j = -1;
        m = subcoordinates.length;
        path.push("M");
        while (++j < m) path.push(project(subcoordinates[j]), "L");
        path[path.length - 1] = "Z";
      }
      return path.join("");
    },

    MultiPolygon: function(o) {
      var path = [],
          coordinates = o.coordinates,
          i = -1, // coordinates index
          n = coordinates.length,
          subcoordinates, // coordinates[i]
          j, // subcoordinates index
          m, // subcoordinates.length
          subsubcoordinates, // subcoordinates[j]
          k, // subsubcoordinates index
          p; // subsubcoordinates.length
      while (++i < n) {
        subcoordinates = coordinates[i];
        j = -1;
        m = subcoordinates.length;
        while (++j < m) {
          subsubcoordinates = subcoordinates[j];
          k = -1;
          p = subsubcoordinates.length - 1;
          path.push("M");
          while (++k < p) path.push(project(subsubcoordinates[k]), "L");
          path[path.length - 1] = "Z";
        }
      }
      return path.join("");
    },

    GeometryCollection: function(o) {
      var path = [],
          geometries = o.geometries,
          i = -1, // geometries index
          n = geometries.length;
      while (++i < n) path.push(type(geometryTypes, geometries[i]));
      return path.join("");
    }

  };

  geoJson.projection = function(x) {
    projection = x;
    return geoJson;
  };

  geoJson.pointRadius = function(x) {
    if (typeof x == "function") pointRadius = x;
    else {
      pointRadius = +x;
      pointCircle = d3_geoJson_circle(pointRadius);
    }
    return geoJson;
  };

  return geoJson;
};

function d3_geoJson_circle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + (-2 * radius)
      + "a" + radius + "," + radius + " 0 1,1 0," + (+2 * radius)
      + "z";
}
