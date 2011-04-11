(function(){d3.layout = {};
d3.layout.chord = function() {
  var chord = {},
      chords,
      groups,
      matrix,
      n,
      padding = 0,
      sortGroups,
      sortSubgroups,
      sortChords;

  function relayout() {
    var subgroups = {},
        groupSums = [],
        groupIndex = d3.range(n),
        subgroupIndex = [],
        k,
        x,
        x0,
        i,
        j;

    chords = [];
    groups = [];

    // Compute the sum.
    k = 0, i = -1; while (++i < n) {
      x = 0, j = -1; while (++j < n) {
        x += matrix[i][j];
      }
      groupSums.push(x);
      subgroupIndex.push(d3.range(n));
      k += x;
    }

    // Sort groups…
    if (sortGroups) {
      groupIndex.sort(function(a, b) {
        return sortGroups(groupSums[a], groupSums[b]);
      });
    }

    // Sort subgroups…
    if (sortSubgroups) {
      subgroupIndex.forEach(function(d, i) {
        d.sort(function(a, b) {
          return sortSubgroups(matrix[i][a], matrix[i][b]);
        });
      });
    }

    // Convert the sum to scaling factor for [0, 2pi].
    // TODO Allow start and end angle to be specified.
    // TODO Allow padding to be specified as percentage?
    k = (2 * Math.PI - padding * n) / k;

    // Compute the start and end angle for each group and subgroup.
    x = 0, i = -1; while (++i < n) {
      x0 = x, j = -1; while (++j < n) {
        var di = groupIndex[i],
            dj = subgroupIndex[i][j],
            v = matrix[di][dj];
        subgroups[di + "-" + dj] = {
          index: di,
          subindex: dj,
          startAngle: x,
          endAngle: x += v * k,
          value: v
        };
      }
      groups.push({
        index: di,
        startAngle: x0,
        endAngle: x,
        value: (x - x0) / k
      });
      x += padding;
    }

    // Generate chords for each (non-empty) subgroup-subgroup link.
    i = -1; while (++i < n) {
      j = i - 1; while (++j < n) {
        var source = subgroups[i + "-" + j],
            target = subgroups[j + "-" + i];
        if (source.value || target.value) {
          chords.push({
            source: source,
            target: target
          })
        }
      }
    }

    if (sortChords) resort();
  }

  function resort() {
    chords.sort(function(a, b) {
      a = Math.min(a.source.value, a.target.value);
      b = Math.min(b.source.value, b.target.value);
      return sortChords(a, b);
    });
  }

  chord.matrix = function(x) {
    if (!arguments.length) return matrix;
    n = (matrix = x) && matrix.length;
    chords = groups = null;
    return chord;
  };

  chord.padding = function(x) {
    if (!arguments.length) return padding;
    padding = x;
    chords = groups = null;
    return chord;
  };

  chord.sortGroups = function(x) {
    if (!arguments.length) return sortGroups;
    sortGroups = x;
    chords = groups = null;
    return chord;
  };

  chord.sortSubgroups = function(x) {
    if (!arguments.length) return sortSubgroups;
    sortSubgroups = x;
    chords = null;
    return chord;
  };

  chord.sortChords = function(x) {
    if (!arguments.length) return sortChords;
    sortChords = x;
    if (chords) resort();
    return chord;
  };

  chord.chords = function() {
    if (!chords) relayout();
    return chords;
  };

  chord.groups = function() {
    if (!groups) relayout();
    return groups;
  };

  return chord;
};
// A rudimentary force layout using Gauss-Seidel.
d3.layout.force = function() {
  var force = {},
      event = d3.dispatch("tick"),
      size = [1, 1],
      alpha = .5,
      distance = 30,
      interval,
      nodes,
      links,
      distances;

  function tick() {
    var n = distances.length,
        i, // current index
        o, // current link
        s, // current source
        t, // current target
        l, // current distance
        x, // x-distance
        y; // y-distance

    // gauss-seidel relaxation
    for (i = 0; i < n; ++i) {
      o = distances[i];
      s = o.source;
      t = o.target;
      x = t.x - s.x;
      y = t.y - s.y;
      if (l = Math.sqrt(x * x + y * y)) {
        l = alpha / (o.distance * o.distance) * (l - distance * o.distance) / l;
        x *= l;
        y *= l;
        if (!t.fixed) {
          t.x -= x;
          t.y -= y;
        }
        if (!s.fixed) {
          s.x += x;
          s.y += y;
        }
      }
    }

    event.tick.dispatch({type: "tick"});

    // simulated annealing, basically
    return (alpha *= .99) < .005;
  }

  force.on = function(type, listener) {
    event[type].add(listener);
    return force;
  };

  force.nodes = function(x) {
    if (!arguments.length) return nodes;
    nodes = x;
    return force;
  };

  force.links = function(x) {
    if (!arguments.length) return links;
    links = x;
    return force;
  };

  force.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return force;
  };

  force.distance = function(d) {
    if (!arguments.length) return distance;
    distance = d;
    return force;
  };

  force.start = function() {
    var i,
        j,
        k,
        n = nodes.length,
        m = links.length,
        w = size[0],
        h = size[1],
        o;

    var paths = [];
    for (i = 0; i < n; ++i) {
      o = nodes[i];
      o.x = o.x || Math.random() * w;
      o.y = o.y || Math.random() * h;
      o.fixed = 0;
      paths[i] = [];
      for (j = 0; j < n; ++j) {
        paths[i][j] = Infinity;
      }
      paths[i][i] = 0;
    }

    for (i = 0; i < m; ++i) {
      o = links[i];
      paths[o.source][o.target] = 1;
      paths[o.target][o.source] = 1;
      o.source = nodes[o.source];
      o.target = nodes[o.target];
    }

    // Floyd-Warshall
    for (k = 0; k < n; ++k) {
      for (i = 0; i < n; ++i) {
        for (j = 0; j < n; ++j) {
          paths[i][j] = Math.min(paths[i][j], paths[i][k] + paths[k][j]);
        }
      }
    }

    distances = [];
    for (i = 0; i < n; ++i) {
      for (j = i + 1; j < n; ++j) {
        distances.push({
          source: nodes[i],
          target: nodes[j],
          distance: paths[i][j] * paths[i][j]
        });
      }
    }

    distances.sort(function(a, b) {
      return a.distance - b.distance;
    });

    d3.timer(tick);
    return force;
  };

  force.resume = function() {
    alpha = .1;
    d3.timer(tick);
    return force;
  };

  force.stop = function() {
    alpha = 0;
    return force;
  };

  // use `node.call(force.drag)` to make nodes draggable
  force.drag = function() {
    var node, element;

    this
      .on("mouseover", function(d) { d.fixed = true; })
      .on("mouseout", function(d) { if (d != node) d.fixed = false; })
      .on("mousedown", mousedown);

    d3.select(window)
      .on("mousemove", mousemove)
      .on("mouseup", mouseup);

    function mousedown(d) {
      (node = d).fixed = true;
      element = this;
      d3.event.preventDefault();
    }

    function mousemove() {
      if (!node) return;
      var m = d3.svg.mouse(element);
      node.x = m[0];
      node.y = m[1];
      force.resume(); // restart annealing
    }

    function mouseup() {
      if (!node) return;
      mousemove();
      node.fixed = false;
      node = element = null;
    }

    return force;
  };

  return force;
};
d3.layout.partition = function() {
  var hierarchy = d3.layout.hierarchy(),
      size = [1, 1]; // width, height

  function position(node, x, dx, dy) {
    var children = node.children;
    node.x = x;
    node.y = node.depth * dy;
    node.dx = dx;
    node.dy = dy;
    if (children) {
      var i = -1,
          n = children.length,
          c,
          d;
      dx /= node.value;
      while (++i < n) {
        position(c = children[i], x, d = c.value * dx, dy);
        x += d;
      }
    }
  }

  function depth(node) {
    var children = node.children,
        d = 0;
    if (children) {
      var i = -1,
          n = children.length;
      while (++i < n) d = Math.max(d, depth(children[i]));
    }
    return 1 + d;
  }

  function partition(d, i) {
    var nodes = hierarchy.call(this, d, i);
    position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
    return nodes;
  }

  partition.sort = d3.rebind(partition, hierarchy.sort);
  partition.children = d3.rebind(partition, hierarchy.children);
  partition.value = d3.rebind(partition, hierarchy.value);

  partition.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return partition;
  };

  return partition;
};
d3.layout.pie = function() {
  var value = Number,
      sort = null,
      startAngle = 0,
      endAngle = 2 * Math.PI;

  function pie(data, i) {

    // Compute the start angle.
    var a = +(typeof startAngle == "function"
        ? startAngle.apply(this, arguments)
        : startAngle);

    // Compute the angular range (end - start).
    var k = (typeof endAngle == "function"
        ? endAngle.apply(this, arguments)
        : endAngle) - startAngle;

    // Optionally sort the data.
    var index = d3.range(data.length);
    if (sort != null) index.sort(function(i, j) {
      return sort(data[i], data[j]);
    });

    // Compute the numeric values for each data element.
    var values = data.map(value);

    // Convert k into a scale factor from value to angle, using the sum.
    k /= values.reduce(function(p, d) { return p + d; }, 0);

    // Compute the arcs!
    var arcs = index.map(function(i) {
      return {
        value: d = values[i],
        startAngle: a,
        endAngle: a += d * k
      };
    });

    // Return the arcs in the original data's order.
    return data.map(function(d, i) {
      return arcs[index[i]];
    });
  }

  /**
   * Specifies the value function *x*, which returns a nonnegative numeric value
   * for each datum. The default value function is `Number`. The value function
   * is passed two arguments: the current datum and the current index.
   */
  pie.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return pie;
  };

  /**
   * Specifies a sort comparison operator *x*. The comparator is passed two data
   * elements from the data array, a and b; it returns a negative value if a is
   * less than b, a positive value if a is greater than b, and zero if a equals
   * b.
   */
  pie.sort = function(x) {
    if (!arguments.length) return sort;
    sort = x;
    return pie;
  };

  /**
   * Specifies the overall start angle of the pie chart. Defaults to 0. The
   * start angle can be specified either as a constant or as a function; in the
   * case of a function, it is evaluated once per array (as opposed to per
   * element).
   */
  pie.startAngle = function(x) {
    if (!arguments.length) return startAngle;
    startAngle = x;
    return pie;
  };

  /**
   * Specifies the overall end angle of the pie chart. Defaults to 2π. The
   * end angle can be specified either as a constant or as a function; in the
   * case of a function, it is evaluated once per array (as opposed to per
   * element).
   */
  pie.endAngle = function(x) {
    if (!arguments.length) return endAngle;
    endAngle = x;
    return pie;
  };

  return pie;
};
// data is two-dimensional array of x,y; we populate y0
// TODO perhaps make the `x`, `y` and `y0` structure customizable
d3.layout.stack = function() {
  var order = "default",
      offset = "zero";

  function stack(data) {
    var n = data.length,
        m = data[0].length,
        i,
        j,
        y0;

    // compute the order of series
    var index = d3_layout_stackOrders[order](data);

    // set y0 on the baseline
    d3_layout_stackOffsets[offset](data, index);

    // propagate offset to other series
    for (j = 0; j < m; ++j) {
      for (i = 1, y0 = data[index[0]][j].y0; i < n; ++i) {
        data[index[i]][j].y0 = y0 += data[index[i - 1]][j].y;
      }
    }

    return data;
  }

  stack.order = function(x) {
    if (!arguments.length) return order;
    order = x;
    return stack;
  };

  stack.offset = function(x) {
    if (!arguments.length) return offset;
    offset = x;
    return stack;
  };

  return stack;
}

var d3_layout_stackOrders = {

  "inside-out": function(data) {
    var n = data.length,
        i,
        j,
        max = data.map(d3_layout_stackMaxIndex),
        sums = data.map(d3_layout_stackReduceSum),
        index = d3.range(n).sort(function(a, b) { return max[a] - max[b]; }),
        top = 0,
        bottom = 0,
        tops = [],
        bottoms = [];
    for (i = 0; i < n; i++) {
      j = index[i];
      if (top < bottom) {
        top += sums[j];
        tops.push(j);
      } else {
        bottom += sums[j];
        bottoms.push(j);
      }
    }
    return bottoms.reverse().concat(tops);
  },

  "reverse": function(data) {
    return d3.range(data.length).reverse();
  },

  "default": function(data) {
    return d3.range(data.length);
  }

};

var d3_layout_stackOffsets = {

  "silhouette": function(data, index) {
    var n = data.length,
        m = data[0].length,
        sums = [],
        max = 0,
        i,
        j,
        o;
    for (j = 0; j < m; ++j) {
      for (i = 0, o = 0; i < n; i++) o += data[i][j].y;
      if (o > max) max = o;
      sums.push(o);
    }
    for (j = 0, i = index[0]; j < m; ++j) {
      data[i][j].y0 = (max - sums[j]) / 2;
    }
  },

  "wiggle": function(data, index) {
    var n = data.length,
        x = data[0],
        m = x.length,
        max = 0,
        i,
        j,
        k,
        ii,
        ik,
        i0 = index[0],
        s1,
        s2,
        s3,
        dx,
        o,
        o0;
    data[i0][0].y0 = o = o0 = 0;
    for (j = 1; j < m; ++j) {
      for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j].y;
      for (i = 0, s2 = 0, dx = x[j].x - x[j - 1].x; i < n; ++i) {
        for (k = 0, ii = index[i], s3 = (data[ii][j].y - data[ii][j - 1].y) / (2 * dx); k < i; ++k) {
          s3 += (data[ik = index[k]][j].y - data[ik][j - 1].y) / dx;
        }
        s2 += s3 * data[ii][j].y;
      }
      data[i0][j].y0 = o -= s1 ? s2 / s1 * dx : 0;
      if (o < o0) o0 = o;
    }
    for (j = 0; j < m; ++j) data[i0][j].y0 -= o0;
  },

  "zero": function(data, index) {
    var j = 0,
        m = data[0].length,
        i0 = index[0];
    for (; j < m; ++j) data[i0][j].y0 = 0;
  }

};

function d3_layout_stackReduceSum(d) {
  return d.reduce(d3_layout_stackSum, 0);
}

function d3_layout_stackMaxIndex(array) {
  var i = 1,
      j = 0,
      v = array[0].y,
      k,
      n = array.length;
  for (; i < n; ++i) {
    if ((k = array[i].y) > v) {
      j = i;
      v = k;
    }
  }
  return j;
}

function d3_layout_stackSum(p, d) {
  return p + d.y;
}
d3.layout.hierarchy = function() {
  var sort = d3_layout_hierarchySort,
      children = d3_layout_hierarchyChildren,
      value = d3_layout_hierarchyValue;

  // Recursively compute the node depth and value.
  // Also converts the data representation into a standard hierarchy structure.
  function recurse(data, depth, nodes) {
    var datas = children.call(hierarchy, data, depth),
        node = {depth: depth, data: data};
    nodes.push(node);
    if (datas) {
      var i = -1,
          n = datas.length,
          c = node.children = [],
          v = 0,
          j = depth + 1;
      while (++i < n) {
        d = recurse(datas[i], j, nodes);
        if (d.value > 0) { // ignore NaN, negative, etc.
          c.push(d);
          v += d.value;
          d.parent = node;
        }
      }
      if (sort) c.sort(sort);
      node.value = v;
    } else {
      node.value = value.call(hierarchy, data, depth);
    }
    return node;
  }

  // Recursively re-evaluates the node value.
  function revalue(node, depth) {
    var children = node.children,
        v = 0;
    if (children) {
      var i = -1,
          n = children.length,
          j = depth + 1;
      while (++i < n) v += revalue(children[i], j);
    } else {
      v = value.call(hierarchy, node.data, depth);
    }
    return node.value = v;
  }

  function hierarchy(d) {
    var nodes = [];
    recurse(d, 0, nodes);
    return nodes;
  }

  hierarchy.sort = function(x) {
    if (!arguments.length) return sort;
    sort = x;
    return hierarchy;
  };

  hierarchy.children = function(x) {
    if (!arguments.length) return children;
    children = x;
    return hierarchy;
  };

  hierarchy.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return hierarchy;
  };

  // Re-evaluates the `value` property for the specified hierarchy.
  hierarchy.revalue = function(root) {
    revalue(root, 0);
    return root;
  };

  return hierarchy;
}

function d3_layout_hierarchyChildren(d) {
  return d.children;
}

function d3_layout_hierarchyValue(d) {
  return d.value;
}

function d3_layout_hierarchySort(a, b) {
  return b.value - a.value;
}
d3.layout.pack = function() {
  var hierarchy = d3.layout.hierarchy(),
      separation = 1, // spacing
      size = [1, 1];
      radius = d3_layout_packRadius;

  function pack(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0];

    d3_layout_packRadii(nodes, radius);

    /* Recursively compute the layout. */
    root.x = 0;
    root.y = 0;
    root.radius = d3_layout_packTree(root, separation);

    var w = size[0],
        h = size[1],
        k = 1 / Math.max(2 * root.radius / w, 2 * root.radius / h);
    d3_layout_packTransform(root, w / 2, h / 2, k);
    return nodes;
  }

  pack.sort = d3.rebind(pack, hierarchy.sort);
  pack.children = d3.rebind(pack, hierarchy.children);
  pack.value = d3.rebind(pack, hierarchy.value);

  pack.separation = function(x) {
    if (!arguments.length) return separation;
    separation = x;
    return pack;
  };

  pack.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return pack;
  };

  pack.radius = function(x) {
    if (!arguments.length) return radius;
    radius = x;
    return pack;
  };

  return pack;
};

function d3_layout_packRadius(d) {
  return d.radius;
}

function d3_layout_packCircle(nodes, spacing) {
  var xMin = Infinity,
      xMax = -Infinity,
      yMin = Infinity,
      yMax = -Infinity,
      a, b, c, j, k;

  function bound(n) {
    xMin = Math.min(n.x - n.radius, xMin);
    xMax = Math.max(n.x + n.radius, xMax);
    yMin = Math.min(n.y - n.radius, yMin);
    yMax = Math.max(n.y + n.radius, yMax);
  }

  function insert(a, b) {
    var c = a.n;
    a.n = b;
    b.p = a;
    b.n = c;
    c.p = b;
  }

  function splice(a, b) {
    a.n = b;
    b.p = a;
  }

  function intersects(a, b) {
    var dx = b.x - a.x,
        dy = b.y - a.y,
        dr = a.radius + b.radius;
    return (dr * dr - dx * dx - dy * dy) > .001; // within epsilon
  }

  /* Create first node. */
  a = nodes[0];
  a.x = -a.radius;
  a.y = 0;
  bound(a);

  /* Create second node. */
  if (nodes.length > 1) {
    b = nodes[1];
    b.x = b.radius;
    b.y = 0;
    bound(b);

    /* Create third node and build chain. */
    if (nodes.length > 2) {
      c = nodes[2];
      d3_layout_packPlace(a, b, c);
      bound(c);
      insert(a, c);
      a.p = c;
      insert(c, b);
      b = a.n;

      /* Now iterate through the rest. */
      for (var i = 3; i < nodes.length; i++) {
        d3_layout_packPlace(a, b, c = nodes[i]);

        /* Search for the closest intersection. */
        var isect = 0, s1 = 1, s2 = 1;
        for (j = b.n; j != b; j = j.n, s1++) {
          if (intersects(j, c)) {
            isect = 1;
            break;
          }
        }
        if (isect == 1) {
          for (k = a.p; k != j.p; k = k.p, s2++) {
            if (intersects(k, c)) {
              if (s2 < s1) {
                isect = -1;
                j = k;
              }
              break;
            }
          }
        }

        /* Update node chain. */
        if (isect == 0) {
          insert(a, c);
          b = c;
          bound(c);
        } else if (isect > 0) {
          splice(a, j);
          b = j;
          i--;
        } else if (isect < 0) {
          splice(j, b);
          a = j;
          i--;
        }
      }
    }
  }

  /* Re-center the circles and return the encompassing radius. */
  var cx = (xMin + xMax) / 2,
      cy = (yMin + yMax) / 2,
      cr = 0;
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    n.x -= cx;
    n.y -= cy;
    cr = Math.max(cr, n.radius + Math.sqrt(n.x * n.x + n.y * n.y));
  }
  return cr + spacing;
}

function d3_layout_packTree(n, spacing) {
  var nodes = [],
      children = n.children;
  if (children) {
    for (var i = 0, l = children.length; i < l; i++) {
      var c = children[i];
      if (c.children) c.radius = d3_layout_packTree(c, spacing);
      c.n = c.p = c;
      nodes.push(c);
    }
  }
  return d3_layout_packCircle(nodes, spacing);
}

function d3_layout_packTransform(n, x, y, k) {
  var children = n.children;
  if (children) {
    for (var i = 0, l = children.length; i < l; i++) {
      var c = children[i];
      c.x += n.x;
      c.y += n.y;
      d3_layout_packTransform(c, x, y, k);
    }
  }
  n.x = x + k * n.x;
  n.y = y + k * n.y;
  n.radius *= k;
}

function d3_layout_packPlace(a, b, c) {
  var da = b.radius + c.radius,
      db = a.radius + c.radius,
      dx = b.x - a.x,
      dy = b.y - a.y,
      dc = Math.sqrt(dx * dx + dy * dy),
      cos = (db * db + dc * dc - da * da) / (2 * db * dc),
      theta = Math.acos(cos),
      x = cos * db,
      h = Math.sin(theta) * db;
  dx /= dc;
  dy /= dc;
  c.x = a.x + x * dx + h * dy;
  c.y = a.y + x * dy - h * dx;
}

// Computes the radii of the leaf nodes.
// TODO (from Protovis version):
// Is it possible for spacing to operate in pixel space?
// Right now it appears to be multiples of the smallest radius.
function d3_layout_packRadii(nodes, radius) {
  for (var i = 0, n = nodes.length; i < n; i++) {
    var c = nodes[i];
    if (!c.children) {
      c.radius = radius.call(this, c, i);
    }
  }
}
// Node-link tree diagram using the Reingold-Tilford "tidy" algorithm
d3.layout.tree = function() {
  var hierarchy = d3.layout.hierarchy(),
      separation = d3_layout_treeSeparation,
      size = [1, 1]; // width, height

  function tree(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0];

    function firstWalk(node, previousSibling) {
      var children = node.children,
          layout = node._tree;
      if (children) {
        var n = children.length,
            firstChild = children[0],
            previousChild,
            ancestor = firstChild,
            child,
            i = -1;
        while (++i < n) {
          child = children[i];
          firstWalk(child, previousChild);
          ancestor = apportion(child, previousChild, ancestor);
          previousChild = child;
        }
        d3_layout_treeShift(node);
        var midpoint = .5 * (firstChild._tree.prelim + child._tree.prelim);
        if (previousSibling) {
          layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
          layout.mod = layout.prelim - midpoint;
        } else {
          layout.prelim = midpoint;
        }
      } else {
        if (previousSibling) {
          layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
        }
      }
    }

    function secondWalk(node, x) {
      node.x = node._tree.prelim + x;
      var children = node.children;
      if (children) {
        var i = -1,
            n = children.length;
        x += node._tree.mod;
        while (++i < n) {
          secondWalk(children[i], x);
        }
      }
    }

    function apportion(node, previousSibling, ancestor) {
      if (previousSibling) {
        var vip = node,
            vop = node,
            vim = previousSibling,
            vom = node.parent.children[0],
            sip = vip._tree.mod,
            sop = vop._tree.mod,
            sim = vim._tree.mod,
            som = vom._tree.mod,
            shift;
        while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
          vom = d3_layout_treeLeft(vom);
          vop = d3_layout_treeRight(vop);
          vop._tree.ancestor = node;
          shift = vim._tree.prelim + sim - vip._tree.prelim - sip + separation(vim, vip);
          if (shift > 0) {
            d3_layout_treeMove(d3_layout_treeAncestor(vim, node, ancestor), node, shift);
            sip += shift;
            sop += shift;
          }
          sim += vim._tree.mod;
          sip += vip._tree.mod;
          som += vom._tree.mod;
          sop += vop._tree.mod;
        }
        if (vim && !d3_layout_treeRight(vop)) {
          vop._tree.thread = vim;
          vop._tree.mod += sim - sop;
        }
        if (vip && !d3_layout_treeLeft(vom)) {
          vom._tree.thread = vip;
          vom._tree.mod += sip - som;
          ancestor = node;
        }
      }
      return ancestor;
    }

    // Initialize temporary layout variables.
    d3_layout_treeVisitAfter(root, function(node, previousSibling) {
      node._tree = {
        ancestor: node,
        prelim: 0,
        mod: 0,
        change: 0,
        shift: 0,
        number: previousSibling ? previousSibling._tree.number + 1 : 0
      };
    });

    // Compute the layout using Buchheim et al.'s algorithm.
    firstWalk(root);
    secondWalk(root, -root._tree.prelim);

    // Compute the left-most, right-most, and depth-most nodes for extents.
    var left = d3_layout_treeSearch(root, d3_layout_treeLeftmost),
        right = d3_layout_treeSearch(root, d3_layout_treeRightmost),
        deep = d3_layout_treeSearch(root, d3_layout_treeDeepest),
        x0 = left.x - separation(left, right) / 2,
        x1 = right.x + separation(right, left) / 2,
        y1 = deep.depth;

    // Clear temporary layout variables; transform x and y.
    d3_layout_treeVisitAfter(root, function(node) {
      node.x = (node.x - x0) / (x1 - x0) * size[0];
      node.y = node.depth / y1 * size[1];
      delete node._tree;
    });

    return nodes;
  }

  tree.sort = d3.rebind(tree, hierarchy.sort);
  tree.children = d3.rebind(tree, hierarchy.children);
  tree.value = d3.rebind(tree, hierarchy.value);

  tree.separation = function(x) {
    if (!arguments.length) return separation;
    separation = x;
    return tree;
  };

  tree.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return tree;
  };

  return tree;
};

function d3_layout_treeSeparation(a, b) {
  return a.parent == b.parent ? 1 : 2;
}

// function d3_layout_treeSeparationRadial(a, b) {
//   return (a.parent == b.parent ? 1 : 2) / a.depth;
// }

function d3_layout_treeLeft(node) {
  return node.children ? node.children[0] : node._tree.thread;
}

function d3_layout_treeRight(node) {
  return node.children ? node.children[node.children.length - 1] : node._tree.thread;
}

function d3_layout_treeSearch(node, compare) {
  var children = node.children;
  if (children) {
    var child,
        n = children.length,
        i = -1;
    while (++i < n) {
      if (compare(child = d3_layout_treeSearch(children[i], compare), node) > 0) {
        node = child;
      }
    }
  }
  return node;
}

function d3_layout_treeRightmost(a, b) {
  return a.x - b.x;
}

function d3_layout_treeLeftmost(a, b) {
  return b.x - a.x;
}

function d3_layout_treeDeepest(a, b) {
  return a.depth - b.depth;
}

function d3_layout_treeVisitAfter(node, callback) {
  function visit(node, previousSibling) {
    var children = node.children;
    if (children) {
      var child,
          previousChild = null,
          i = -1,
          n = children.length;
      while (++i < n) {
        child = children[i];
        visit(child, previousChild);
        previousChild = child;
      }
    }
    callback(node, previousSibling);
  }
  visit(node, null);
}

function d3_layout_treeShift(node) {
  var shift = 0,
      change = 0,
      children = node.children,
      i = children.length,
      child;
  while (--i >= 0) {
    child = children[i]._tree;
    child.prelim += shift;
    child.mod += shift;
    shift += child.shift + (change += child.change);
  }
}

function d3_layout_treeMove(ancestor, node, shift) {
  ancestor = ancestor._tree;
  node = node._tree;
  var change = shift / (node.number - ancestor.number);
  ancestor.change += change;
  node.change -= change;
  node.shift += shift;
  node.prelim += shift;
  node.mod += shift;
}

function d3_layout_treeAncestor(vim, node, ancestor) {
  return vim._tree.ancestor.parent == node.parent
      ? vim._tree.ancestor
      : ancestor;
}
// Squarified Treemaps by Mark Bruls, Kees Huizing, and Jarke J. van Wijk
d3.layout.treemap = function() {
  var hierarchy = d3.layout.hierarchy(),
      round = Math.round,
      size = [1, 1], // width, height
      sticky = false,
      stickies;

  // Recursively compute the node area based on value & scale.
  function scale(node, k) {
    var children = node.children;
    node.area = node.value * k;
    if (children) {
      var i = -1,
          n = children.length;
      while (++i < n) scale(children[i], k);
    }
  }

  // Recursively arranges the specified node's children into squarified rows.
  function squarify(node) {
    if (!node.children) return;
    var rect = {x: node.x, y: node.y, dx: node.dx, dy: node.dy},
        row = [],
        children = node.children.slice(), // copy-on-write
        child,
        best = Infinity, // the best row score so far
        score, // the current row score
        u = Math.min(rect.dx, rect.dy), // initial orientation
        n;
    row.area = 0;
    while ((n = children.length) > 0) {
      row.push(child = children[n - 1]);
      row.area += child.area;
      if ((score = worst(row, u)) <= best) { // continue with this orientation
        children.pop();
        best = score;
      } else { // abort, and try a different orientation
        row.area -= row.pop().area;
        position(row, u, rect, false);
        u = Math.min(rect.dx, rect.dy);
        row.length = row.area = 0;
        best = Infinity;
      }
    }
    if (row.length) {
      position(row, u, rect, true);
      row.length = row.area = 0;
    }
    node.children.forEach(squarify);
  }

  // Recursively resizes the specified node's children into existing rows.
  // Preserves the existing layout!
  function stickify(node) {
    if (!node.children) return;
    var rect = {x: node.x, y: node.y, dx: node.dx, dy: node.dy},
        children = node.children.slice(), // copy-on-write
        child,
        row = [];
    row.area = 0;
    while (child = children.pop()) {
      row.push(child);
      row.area += child.area;
      if (child.z != null) {
        position(row, child.z ? rect.dx : rect.dy, rect, !children.length);
        row.length = row.area = 0;
      }
    }
    node.children.forEach(stickify);
  }

  // Computes the score for the specified row, as the worst aspect ratio.
  function worst(row, u) {
    var s = row.area,
        r,
        rmax = 0,
        rmin = Infinity,
        i = -1,
        n = row.length;
    while (++i < n) {
      r = row[i].area;
      if (r < rmin) rmin = r;
      if (r > rmax) rmax = r;
    }
    s *= s;
    u *= u;
    return Math.max((u * rmax) / s, s / (u * rmin));
  }

  // Positions the specified row of nodes. Modifies `rect`.
  function position(row, u, rect, flush) {
    var i = -1,
        n = row.length,
        x = rect.x,
        y = rect.y,
        v = u ? round(row.area / u) : 0,
        o;
    if (u == rect.dx) { // horizontal subdivision
      if (flush || v > rect.dy) v = rect.dy; // over+underflow
      while (++i < n) {
        o = row[i];
        o.x = x;
        o.y = y;
        o.dy = v;
        x += o.dx = round(o.area / v);
      }
      o.z = true;
      o.dx += rect.x + rect.dx - x; // rounding error
      rect.y += v;
      rect.dy -= v;
    } else { // vertical subdivision
      if (flush || v > rect.dx) v = rect.dx; // over+underflow
      while (++i < n) {
        o = row[i];
        o.x = x;
        o.y = y;
        o.dx = v;
        y += o.dy = round(o.area / v);
      }
      o.z = false;
      o.dy += rect.y + rect.dy - y; // rounding error
      rect.x += v;
      rect.dx -= v;
    }
  }

  function treemap(d) {
    var nodes = stickies || hierarchy(d),
        root = nodes[0];
    root.x = 0;
    root.y = 0;
    root.dx = size[0];
    root.dy = size[1];
    if (stickies) hierarchy.revalue(root);
    scale(root, size[0] * size[1] / root.value);
    (stickies ? stickify : squarify)(root);
    if (sticky) stickies = nodes;
    return nodes;
  }

  treemap.sort = d3.rebind(treemap, hierarchy.sort);
  treemap.children = d3.rebind(treemap, hierarchy.children);
  treemap.value = d3.rebind(treemap, hierarchy.value);

  treemap.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return treemap;
  };

  treemap.round = function(x) {
    if (!arguments.length) return round != Number;
    round = x ? Math.round : Number;
    return treemap;
  };

  treemap.sticky = function(x) {
    if (!arguments.length) return sticky;
    sticky = x;
    stickies = null;
    return treemap;
  };

  return treemap;
};
})()