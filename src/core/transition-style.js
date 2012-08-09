d3_transitionPrototype.style = function(name, value, priority) {
  if (arguments.length < 3) priority = "";
  return this.styleTween(name, d3.tween(value, d3_interpolateByName(name)), priority);
};

d3_transitionPrototype.styleTween = function(name, tween, priority) {
  if (arguments.length < 3) priority = "";
  return this.tween("style." + name, function(d, i) {
    var f = tween.call(this, d, i, window.getComputedStyle(this, null).getPropertyValue(name));
    return f === d3_tweenRemove
        ? (this.style.removeProperty(name), null)
        : f && function(t) { this.style.setProperty(name, f(t), priority); };
  });
};
