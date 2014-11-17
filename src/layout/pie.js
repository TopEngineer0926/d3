import "../arrays/range";
import "../arrays/sum";
import "../math/trigonometry";
import "layout";

d3.layout.pie = function() {
  var value = Number,
      sort = d3_layout_pieSortByValue,
      startAngle = 0,
      endAngle = τ,
      padAngle = 0;

  function pie(data) {
    var n = data.length,
        values = data.map(function(d, i) { return +value.call(pie, d, i); }),
        a = +(typeof startAngle === "function" ? startAngle.apply(this, arguments) : startAngle),
        da = (typeof endAngle === "function" ? endAngle.apply(this, arguments) : endAngle) - a,
        p = +(typeof padAngle === "function" ? padAngle.apply(this, arguments) : padAngle) * (da < 0 ? -1 : 1),
        np = Math.abs(da) >= τε && n > 1 ? n : n - 1,
        k = (da - np * p) / d3.sum(values),
        index = d3.range(n),
        arcs = [],
        v;

    // If reserved padding exceeds the available angular space, scale to zero.
    if (da > 0 ^ k > 0) k = 0, p = da / np;

    // Optionally sort the data.
    if (sort != null) index.sort(sort === d3_layout_pieSortByValue
        ? function(i, j) { return values[j] - values[i]; }
        : function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs! They are stored in the original data's order.
    index.forEach(function(i) {
      arcs[i] = {
        data: data[i],
        value: v = values[i],
        startAngle: a,
        endAngle: a += v * k + p,
        padAngle: p
      };
    });

    return arcs;
  }

  pie.value = function(_) {
    if (!arguments.length) return value;
    value = _;
    return pie;
  };

  pie.sort = function(_) {
    if (!arguments.length) return sort;
    sort = _;
    return pie;
  };

  pie.startAngle = function(_) {
    if (!arguments.length) return startAngle;
    startAngle = _;
    return pie;
  };

  pie.endAngle = function(_) {
    if (!arguments.length) return endAngle;
    endAngle = _;
    return pie;
  };

  pie.padAngle = function(_) {
    if (!arguments.length) return padAngle;
    padAngle = _;
    return pie;
  };

  return pie;
};

var d3_layout_pieSortByValue = {};
