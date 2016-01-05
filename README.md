# d3

This branch contains the prerelease of D3 4.0. This API is unstable and may change at any point prior to the release.

## Installing

If you use NPM, `npm install d3@4.0.0-alpha.1`. Otherwise, download the [latest release](https://github.com/mbostock/d3/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a custom build using [Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3js.org](https://d3js.org):

```html
<script src="https://d3js.org/d3.v4pre.min.js"></script>
```

## API Reference

* [Arrays](#arrays) ([Statistics](#statistics), [Histograms](#histograms), [Nests](#nests), [Search](#search), [Transformations](#transformations), [Objects](#objects), [Maps](#maps), [Sets](#sets))
* [Colors](#colors)
* [Delimiter-Separated Values](#delimiter-separated-values)
* [Easing Functions](#easing-functions)
* [Events](#events)
* [Paths](#paths)
* [Random Numbers](#random-numbers)
* [Requests](#requests)
* [Time Intervals](#time-intervals)
* [Timers](#timers)

D3 uses [semantic versioning](http://semver.org/). The current version is exposed as d3.version.

## [Arrays](https://github.com/d3/d3-array)

Array manipulation, ordering, searching, summarizing, etc.

#### [Statistics](https://github.com/d3/d3-array#statistics)

Methods for computing basic summary statistics.

* [d3.min](https://github.com/d3/d3-array#min) - compute the minimum value in an array.
* [d3.max](https://github.com/d3/d3-array#max) - compute the maximum value in an array.
* [d3.extent](https://github.com/d3/d3-array#extent) - compute the minimum and maximum value in an array.
* [d3.sum](https://github.com/d3/d3-array#sum) - compute the sum of an array of numbers.
* [d3.mean](https://github.com/d3/d3-array#mean) - compute the arithmetic mean of an array of numbers.
* [d3.median](https://github.com/d3/d3-array#median) - compute the median of an array of numbers (the 0.5-quantile).
* [d3.quantile](https://github.com/d3/d3-array#quantile) - compute a quantile for a sorted array of numbers.
* [d3.variance](https://github.com/d3/d3-array#variance) - compute the variance of an array of numbers.
* [d3.deviation](https://github.com/d3/d3-array#deviation) - compute the standard deviation of an array of numbers.

#### [Histograms](https://github.com/d3/d3-array#histograms)

Bin discrete samples into continuous, non-overlapping intervals.

* [d3.histogram](https://github.com/d3/d3-array#histogram) - constructs a new histogram generator.
* [*histogram*](https://github.com/d3/d3-array#_histogram) - compute the histogram for the given array of samples.
* [*histogram*.value](https://github.com/d3/d3-array#histogram_value) - specify a value accessor for each sample.
* [*histogram*.domain](https://github.com/d3/d3-array#histogram_domain) - specify the interval of observable values.
* [*histogram*.thresholds](https://github.com/d3/d3-array#histogram_thresholds) - specify how values are divided into bins.
* [d3.thresholdFreedmanDiaconis](https://github.com/d3/d3-array#thresholdFreedmanDiaconis) - the Freedman–Diaconis binning rule.
* [d3.thresholdScott](https://github.com/d3/d3-array#thresholdScott) - Scott’s normal reference binning rule.
* [d3.thresholdSturges](https://github.com/d3/d3-array#thresholdSturges) - Sturge’s binning formula.

#### [Nests](https://github.com/d3/d3-array#nests)

Group data into arbitrary hierarchies.

* [d3.nest](https://github.com/d3/d3-array#nest) - constructs a new nest generator.
* [*nest*.key](https://github.com/d3/d3-array#nest_key) - add a level to the nest hierarchy.
* [*nest*.sortKeys](https://github.com/d3/d3-array#nest_sortKeys) - sort the current nest level by key.
* [*nest*.sortValues](https://github.com/d3/d3-array#nest_sortValues) - sort the leaf nest level by value.
* [*nest*.rollup](https://github.com/d3/d3-array#nest_rollup) - specify a rollup function for leaf values.
* [*nest*.map](https://github.com/d3/d3-array#nest_map) - generate the nest, returning a map.
* [*nest*.object](https://github.com/d3/d3-array#nest_object) - generate the nest, returning an associative array.
* [*nest*.entries](https://github.com/d3/d3-array#nest_entries) - generate the nest, returning an array of key-values tuples.

#### [Search](https://github.com/d3/d3-array#search)

Methods for searching arrays for a specific element.

* [d3.scan](https://github.com/d3/d3-array#scan) - linear search for an element using a comparator.
* [d3.bisect](https://github.com/d3/d3-array#bisect) - binary search for a value in a sorted array.
* [d3.bisectRight](https://github.com/d3/d3-array#bisectRight) - binary search for a value in a sorted array.
* [d3.bisectLeft](https://github.com/d3/d3-array#bisectLeft) - binary search for a value in a sorted array.
* [d3.bisector](https://github.com/d3/d3-array#bisector) - bisect using an accessor or comparator.
* [d3.ascending](https://github.com/d3/d3-array#ascending) - compute the natural order of two values.
* [d3.descending](https://github.com/d3/d3-array#descending) - compute the natural order of two values.

#### [Transformations](https://github.com/d3/d3-array#transformations)

Methods for transforming arrays and for generating new arrays.

* [d3.merge](https://github.com/d3/d3-array#merge) - merge multiple arrays into one array.
* [d3.pairs](https://github.com/d3/d3-array#pairs) - returns an array of adjacent pairs of elements.
* [d3.permute](https://github.com/d3/d3-array#permute) - reorder an array of elements according to an array of indexes.
* [d3.shuffle](https://github.com/d3/d3-array#shuffle) - randomize the order of an array.
* [d3.ticks](https://github.com/d3/d3-array#ticks) - generate representative values from a numeric interval.
* [d3.tickStep](https://github.com/d3/d3-array#tickStep) - generate representative values from a numeric interval.
* [d3.range](https://github.com/d3/d3-array#range) - generate a range of numeric values.
* [d3.transpose](https://github.com/d3/d3-array#transpose) - transpose an array of arrays.
* [d3.zip](https://github.com/d3/d3-array#zip) - transpose a variable number of arrays.

#### [Objects](https://github.com/d3/d3-array#objects)

Methods for converting associative arrays (objects) to arrays.

* [d3.keys](https://github.com/d3/d3-array#keys) - list the keys of an associative array.
* [d3.values](https://github.com/d3/d3-array#values) - list the values of an associated array.
* [d3.entries](https://github.com/d3/d3-array#entries) - list the key-value entries of an associative array.

#### [Maps](https://github.com/d3/d3-array#maps)

Like ES6 Map, but with string keys and a few other differences.

* [d3.map](https://github.com/d3/d3-array#map) - constructs a new, empty map.
* [*map*.has](https://github.com/d3/d3-array#map_has) - returns true if the map contains the given key.
* [*map*.get](https://github.com/d3/d3-array#map_get) - returns the value for the given key.
* [*map*.set](https://github.com/d3/d3-array#map_set) - sets the value for the given key.
* [*map*.remove](https://github.com/d3/d3-array#map_remove) - removes the entry for given key.
* [*map*.clear](https://github.com/d3/d3-array#map_clear) - removes all entries.
* [*map*.keys](https://github.com/d3/d3-array#map_keys) - returns the map’s array of keys.
* [*map*.values](https://github.com/d3/d3-array#map_values) - returns the map’s array of values.
* [*map*.entries](https://github.com/d3/d3-array#map_entries) - returns the map’s array of entries (key-values objects).
* [*map*.each](https://github.com/d3/d3-array#map_each) - calls the given function for each entry in the map.
* [*map*.empty](https://github.com/d3/d3-array#map_empty) - returns false if the map has at least one entry.
* [*map*.size](https://github.com/d3/d3-array#map_size) - returns the number of entries in the map.

#### [Sets](https://github.com/d3/d3-array#sets)

Like ES6 Set, but with string keys and a few other differences.

* [d3.set](https://github.com/d3/d3-array#set) - constructs a new, empty set.
* [*set*.has](https://github.com/d3/d3-array#set_has) - returns true if the set contains the given value.
* [*set*.add](https://github.com/d3/d3-array#set_add) - adds the given value.
* [*set*.remove](https://github.com/d3/d3-array#set_remove) - removes the given value.
* [*set*.clear](https://github.com/d3/d3-array#set_clear) - removes all values.
* [*set*.values](https://github.com/d3/d3-array#set_values) - returns the set’s array of values.
* [*set*.each](https://github.com/d3/d3-array#set_each) - calls the given function for each value in the set.
* [*set*.empty](https://github.com/d3/d3-array#set_empty) - returns true if the set has at least one value.
* [*set*.size](https://github.com/d3/d3-array#set_size) - returns the number of values in the set.

## [Colors](https://github.com/d3/d3-color)

Color manipulation and color space conversion.

* [d3.color](https://github.com/d3/d3-color#color) - parses the given CSS color specifier.
* [*color*.rgb](https://github.com/d3/d3-color#color_rgb) - returns the RGB equivalent of this color.
* [*color*.brighter](https://github.com/d3/d3-color#color_brighter) - returns a brighter copy of this color.
* [*color*.darker](https://github.com/d3/d3-color#color_darker) - returns a darker copy of this color.
* [*color*.displayable](https://github.com/d3/d3-color#color_displayable) - returns true if the color is displayable on standard hardware.
* [*color*.toString](https://github.com/d3/d3-color#color_toString) - formats the color as an RGB hexadecimal string.
* [d3.rgb](https://github.com/d3/d3-color#rgb) - constructs a new RGB color.
* [d3.hsl](https://github.com/d3/d3-color#hsl) - constructs a new HSL color.
* [d3.lab](https://github.com/d3/d3-color#lab) - constructs a new Lab color.
* [d3.hcl](https://github.com/d3/d3-color#hcl) - constructs a new HCL color.
* [d3.cubehelix](https://github.com/d3/d3-color#cubehelix) - constructs a new Cubehelix color.

## [Delimiter-Separated Values](https://github.com/d3/d3-dsv)

Parse and format delimiter-separated values, most commonly CSV and TSV.

* [d3.dsv](https://github.com/d3/d3-dsv#dsv) - constructs a new parser and formatter for the given delimiter.
* [*dsv*.parse](https://github.com/d3/d3-dsv#dsv_parse) - parse the given string, returning an array of objects.
* [*dsv*.parseRows](https://github.com/d3/d3-dsv#dsv_parseRows) - parse the given string, returning an array of rows.
* [*dsv*.format](https://github.com/d3/d3-dsv#dsv_format) - format the given array of objects.
* [*dsv*.formatRows](https://github.com/d3/d3-dsv#dsv_formatRows) - format the given array of rows.
* [d3.csv](https://github.com/d3/d3-dsv#csv) - a parser and formatter for comma-separated values (CSV).
* [d3.tsv](https://github.com/d3/d3-dsv#tsv) - a parser and formatter for tab-separated values (TSV).

## [Easing Functions](https://github.com/d3/d3-ease)

* [d3.easeBind](https://github.com/d3/d3-ease#bind) - bind optional parameters to the given easing function.
* [d3.easeLinearIn](https://github.com/d3/d3-ease#linearIn) - linear easing; the identity function.
* [d3.easeLinearOut](https://github.com/d3/d3-ease#linearOut) - linear easing; the identity function.
* [d3.easeLinearInOut](https://github.com/d3/d3-ease#linearInOut) - linear easing; the identity function.
* [d3.easePolyIn](https://github.com/d3/d3-ease#polyIn) - polynomial easing; raises time to the given power.
* [d3.easePolyOut](https://github.com/d3/d3-ease#polyOut) - reverse polynomial easing.
* [d3.easePolyInOut](https://github.com/d3/d3-ease#polyInOut) - symmetric polynomial easing.
* [d3.easeQuadIn](https://github.com/d3/d3-ease#quadIn) - quadratic easing; squares time.
* [d3.easeQuadOut](https://github.com/d3/d3-ease#quadOut) - reverse quadratic easing.
* [d3.easeQuadInOut](https://github.com/d3/d3-ease#quadInOut) - symmetric quadratic easing.
* [d3.easeCubicIn](https://github.com/d3/d3-ease#cubicIn) - cubic easing; cubes time.
* [d3.easeCubicOut](https://github.com/d3/d3-ease#cubicOut) - reverse cubic easing.
* [d3.easeCubicInOut](https://github.com/d3/d3-ease#cubicInOut) - symmetric cubic easing.
* [d3.easeSinIn](https://github.com/d3/d3-ease#sinIn) - sinusoidal easing.
* [d3.easeSinOut](https://github.com/d3/d3-ease#sinOut) - reverse sinusoidal easing.
* [d3.easeSinInOut](https://github.com/d3/d3-ease#sinInOut) - symmetric sinusoidal easing.
* [d3.easeExpIn](https://github.com/d3/d3-ease#expIn) - exponential easing.
* [d3.easeExpOut](https://github.com/d3/d3-ease#expOut) - reverse exponential easing.
* [d3.easeExpInOut](https://github.com/d3/d3-ease#expInOut) - symmetric exponential easing.
* [d3.easeCircleIn](https://github.com/d3/d3-ease#circleIn) - circular easing.
* [d3.easeCircleOut](https://github.com/d3/d3-ease#circleOut) - reverse circular easing.
* [d3.easeCircleInOut](https://github.com/d3/d3-ease#circleInOut) - symmetric circular easing.
* [d3.easeElasticIn](https://github.com/d3/d3-ease#elasticIn) - elastic easing, like a rubber band.
* [d3.easeElasticOut](https://github.com/d3/d3-ease#elasticOut) - reverse elastic easing.
* [d3.easeElasticInOut](https://github.com/d3/d3-ease#elasticInOut) - symmetric elastic easing.
* [d3.easeBackIn](https://github.com/d3/d3-ease#backIn) - anticipatory easing, like a dancer bending his knees before jumping.
* [d3.easeBackOut](https://github.com/d3/d3-ease#backOut) - reverse anticipatory easing.
* [d3.easeBackInOut](https://github.com/d3/d3-ease#backInOut) - symmetric anticipatory easing.
* [d3.easeBounceIn](https://github.com/d3/d3-ease#bounceIn) - bounce easing, like a rubber ball.
* [d3.easeBounceOut](https://github.com/d3/d3-ease#bounceOut) - reverse bounce easing.
* [d3.easeBounceInOut](https://github.com/d3/d3-ease#bounceInOut) - symmetric bounce easing.

## [Events](https://github.com/d3/d3-dispatch)

Separate concerns using named callbacks.

* [d3.dispatch](https://github.com/d3/d3-dispatch#dispatch) - create a custom event dispatcher.
* [*dispatch*.on](https://github.com/d3/d3-dispatch#dispatch_on) - register or unregister an event listener.
* [*dispatch*.*type*](https://github.com/d3/d3-dispatch#dispatch_type) - dispatch an event to registered listeners.

## [Interpolators](https://github.com/d3/d3-interpolate)

Interpolate numbers, colors, strings, arrays, objects, whatever!

* [d3.interpolateBind](https://github.com/d3/d3-interpolate#bind) - bind optional parameters to the given interpolator.
* [d3.interpolate](https://github.com/d3/d3-interpolate#value) - interpolate arbitrary values.
* [d3.interpolators](https://github.com/d3/d3-interpolato#values) - register a custom interpolator.
* [d3.interpolateArray](https://github.com/d3/d3-interpolate#array) - interpolate arrays of arbitrary values.
* [d3.interpolateNumber](https://github.com/d3/d3-interpolate#number) - interpolate numbers.
* [d3.interpolateObject](https://github.com/d3/d3-interpolate#object) - interpolate arbitrary objects.
* [d3.interpolateRound](https://github.com/d3/d3-interpolate#round) - interpolate integers.
* [d3.interpolateString](https://github.com/d3/d3-interpolate#string) - interpolate strings with embedded numbers.
* [d3.interpolateTransform](https://github.com/d3/d3-interpolate#transform) - interpolate 2D matrix transforms.
* [d3.interpolateZoom](https://github.com/d3/d3-interpolate#zoom) - zoom and pan between two views.
* [d3.interpolateRgb](https://github.com/d3/d3-interpolate#rgb) - interpolate RGB colors.
* [d3.interpolateHsl](https://github.com/d3/d3-interpolate#hsl) - interpolate HSL colors.
* [d3.interpolateHslLong](https://github.com/d3/d3-interpolate#hslLong) - interpolate HSL colors, the long way.
* [d3.interpolateLab](https://github.com/d3/d3-interpolate#lab) - interpolate Lab colors.
* [d3.interpolateHcl](https://github.com/d3/d3-interpolate#hcl) - interpolate HCL colors.
* [d3.interpolateHclLong](https://github.com/d3/d3-interpolate#hclLong) - interpolate HCL colors, the long way.
* [d3.interpolateCubehelix](https://github.com/d3/d3-interpolate#cubehelix) - interpolate Cubehelix colors.
* [d3.interpolateCubehelixLong](https://github.com/d3/d3-interpolate#cubehelixLong) - interpolate Cubehelix colors, the long way.

## [Paths](https://github.com/d3/d3-path)

Serialize Canvas path commands to SVG.

* [d3.path](https://github.com/d3/d3-path#path) - constructs a new path serializer.
* [*path*.moveTo](https://github.com/d3/d3-path#path_moveTo) - move to the given point.
* [*path*.closePath](https://github.com/d3/d3-path#path_closePath) - close the current subpath.
* [*path*.lineTo](https://github.com/d3/d3-path#path_lineTo) - draw a straight line segment.
* [*path*.quadraticCurveTo](https://github.com/d3/d3-path#path_quadraticCurveTo) - draw a quadratic Bézier segment.
* [*path*.bezierCurveTo](https://github.com/d3/d3-path#path_bezierCurveTo) - draw a cubic Bézier segment.
* [*path*.arcTo](https://github.com/d3/d3-path#path_arcTo) - draw a circular arc segment.
* [*path*.arc](https://github.com/d3/d3-path#path_arc) - draw a circular arc segment.
* [*path*.rect](https://github.com/d3/d3-path#path_rect) - draw a rectangle.
* [*path*.toString](https://github.com/d3/d3-path#path_toString) - serialize to an SVG path data string.

## [Random Numbers](https://github.com/d3/d3-random)

Generate random numbers from various distributions.

* [d3.randomUniform](https://github.com/d3/d3-random#uniform) - from a uniform distribution.
* [d3.randomNormal](https://github.com/d3/d3-random#normal) - from a normal distribution.
* [d3.randomLogNormal](https://github.com/d3/d3-random#logNormal) - from a log-normal distribution.
* [d3.randomBates](https://github.com/d3/d3-random#bates) - from a Bates distribution.
* [d3.randomIrwinHall](https://github.com/d3/d3-random#irwinHall) - from an Irwin–Hall distribution.
* [d3.randomExponential](https://github.com/d3/d3-random#exponential) - from an exponential distribution.

## [Requests](https://github.com/d3/d3-request)

A convenient alternative to asynchronous XMLHttpRequest.

* [d3.request](https://github.com/d3/d3-request#request) - construct a new asynchronous request.
* [*request*.header](https://github.com/d3/d3-request#request_header) - set a request header.
* [*request*.mimeType](https://github.com/d3/d3-request#request_mimeType) - set the MIME type.
* [*request*.timeout](https://github.com/d3/d3-request#request_timeout) - set the timeout in milliseconds.
* [*request*.responseType](https://github.com/d3/d3-request#request_responseType) - set the response type.
* [*request*.response](https://github.com/d3/d3-request#request_response) - set the response function.
* [*request*.get](https://github.com/d3/d3-request#request_get) - send a GET request.
* [*request*.post](https://github.com/d3/d3-request#request_post) - send a POST request.
* [*request*.send](https://github.com/d3/d3-request#request_send) - set the request.
* [*request*.abort](https://github.com/d3/d3-request#request_abort) - abort the request.
* [*request*.on](https://github.com/d3/d3-request#request_on) - listen for a request event.
* [d3.requestCsv](https://github.com/d3/d3-request#requestCsv) - request a comma-separated values (CSV) file.
* [d3.requestHtml](https://github.com/d3/d3-request#requestHtml) - request an HTML file.
* [d3.requestJson](https://github.com/d3/d3-request#requestJson) - request a JSON file.
* [d3.requestText](https://github.com/d3/d3-request#requestText) - request a plain text file.
* [d3.requestTsv](https://github.com/d3/d3-request#requestTsv) - request a tab-separated values (TSV) file.
* [d3.requestXml](https://github.com/d3/d3-request#requestXml) - request an XML file.

## [Time Intervals](https://github.com/d3/d3-time)

A calculator for humanity’s peculiar conventions of time.

* [d3.timeInterval](https://github.com/d3/d3-time#interval) - implement a new custom time interval.
* [*interval*](https://github.com/d3/d3-time#_interval) - alias for *interval*.floor.
* [*interval*.floor](https://github.com/d3/d3-time#interval_floor) - round down to the nearest boundary.
* [*interval*.round](https://github.com/d3/d3-time#interval_round) - round to the nearest boundary.
* [*interval*.ceil](https://github.com/d3/d3-time#interval_ceil) - round up to the nearest boundary.
* [*interval*.offset](https://github.com/d3/d3-time#interval_offset) - offset a date by some number of intervals.
* [*interval*.range](https://github.com/d3/d3-time#interval_range) - generate a range of dates at interval boundaries.
* [*interval*.filter](https://github.com/d3/d3-time#interval_filter) - create a filtered subset of this interval.
* [*interval*.every](https://github.com/d3/d3-time#interval_every) - create a filtered subset of this interval.
* [*interval*.count](https://github.com/d3/d3-time#interval_count) - count interval boundaries between two dates.
* [d3.timeMillisecond](https://github.com/d3/d3-time#millisecond), [d3.utcMillisecond](https://github.com/d3/d3-time#millisecond) - the millisecond interval.
* [d3.timeMilliseconds](https://github.com/d3/d3-time#millisecond), [d3.utcMilliseconds](https://github.com/d3/d3-time#millisecond) - aliases for millisecond.range.
* [d3.timeSecond](https://github.com/d3/d3-time#second), [d3.utcSecond](https://github.com/d3/d3-time#second) - the second interval.
* [d3.timeSeconds](https://github.com/d3/d3-time#second), [d3.utcSeconds](https://github.com/d3/d3-time#second) - aliases for second.range.
* [d3.timeMinute](https://github.com/d3/d3-time#minute), [d3.utcMinute](https://github.com/d3/d3-time#minute) - the minute interval.
* [d3.timeMinutes](https://github.com/d3/d3-time#minute), [d3.utcMinutes](https://github.com/d3/d3-time#minute) - aliases for minute.range.
* [d3.timeHour](https://github.com/d3/d3-time#hour), [d3.utcHour](https://github.com/d3/d3-time#hour) - the hour interval.
* [d3.timeHours](https://github.com/d3/d3-time#hour), [d3.utcHours](https://github.com/d3/d3-time#hour) - aliases for hour.range.
* [d3.timeDay](https://github.com/d3/d3-time#day), [d3.utcDay](https://github.com/d3/d3-time#day) - the day interval.
* [d3.timeDays](https://github.com/d3/d3-time#day), [d3.utcDays](https://github.com/d3/d3-time#day) - aliases for day.range.
* [d3.timeWeek](https://github.com/d3/d3-time#week), [d3.utcWeek](https://github.com/d3/d3-time#week) - aliases for Sunday and UTC Sunday.
* [d3.timeWeeks](https://github.com/d3/d3-time#week), [d3.utcWeeks](https://github.com/d3/d3-time#week) - aliases for week.range.
* [d3.timeSunday](https://github.com/d3/d3-time#sunday), [d3.utcSunday](https://github.com/d3/d3-time#sunday) - the week interval, starting on Sunday.
* [d3.timeSundays](https://github.com/d3/d3-time#sunday), [d3.utcSundays](https://github.com/d3/d3-time#sunday) - aliases for sunday.range.
* [d3.timeMonday](https://github.com/d3/d3-time#monday), [d3.utcMonday](https://github.com/d3/d3-time#monday) - the week interval, starting on Monday.
* [d3.timeMondays](https://github.com/d3/d3-time#monday), [d3.utcMondays](https://github.com/d3/d3-time#monday) - aliases for monday.range.
* [d3.timeTuesday](https://github.com/d3/d3-time#tuesday), [d3.utcTuesday](https://github.com/d3/d3-time#tuesday) - the week interval, starting on Tuesday.
* [d3.timeTuesdays](https://github.com/d3/d3-time#tuesday), [d3.utcTuesdays](https://github.com/d3/d3-time#tuesday) - aliases for tuesday.range.
* [d3.timeWednesday](https://github.com/d3/d3-time#wednesday), [d3.utcWednesday](https://github.com/d3/d3-time#wednesday) - the week interval, starting on Wednesday.
* [d3.timeWednesdays](https://github.com/d3/d3-time#wednesday), [d3.utcWednesdays](https://github.com/d3/d3-time#wednesday) - aliases for wednesday.range.
* [d3.timeThursday](https://github.com/d3/d3-time#thursday), [d3.utcThursday](https://github.com/d3/d3-time#thursday) - the week interval, starting on Thursday.
* [d3.timeThursdays](https://github.com/d3/d3-time#thursday), [d3.utcThursdays](https://github.com/d3/d3-time#thursday) - aliases for thursday.range.
* [d3.timeFriday](https://github.com/d3/d3-time#friday), [d3.utcFriday](https://github.com/d3/d3-time#friday) - the week interval, starting on Friday.
* [d3.timeFridays](https://github.com/d3/d3-time#friday), [d3.utcFridays](https://github.com/d3/d3-time#friday) - aliases for friday.range.
* [d3.timeSaturday](https://github.com/d3/d3-time#saturday), [d3.utcSaturday](https://github.com/d3/d3-time#saturday) - the week interval, starting on Saturday.
* [d3.timeSaturdays](https://github.com/d3/d3-time#saturday), [d3.utcSaturdays](https://github.com/d3/d3-time#saturday) - aliases for saturday.range.
* [d3.timeMonth](https://github.com/d3/d3-time#month), [d3.utcMonth](https://github.com/d3/d3-time#month) - the month interval.
* [d3.timeMonths](https://github.com/d3/d3-time#month), [d3.utcMonths](https://github.com/d3/d3-time#month) - aliases for month.range.
* [d3.timeYear](https://github.com/d3/d3-time#year), [d3.utcYear](https://github.com/d3/d3-time#year) - the year interval.
* [d3.timeYears](https://github.com/d3/d3-time#year), [d3.utcYears](https://github.com/d3/d3-time#year) - aliases for year.range.

## [Timers](https://github.com/d3/d3-timer)

An efficient queue capable of managing thousands of concurrent animations.

* [d3.timer](https://github.com/d3/d3-timer#timer) - schedules a new timer.
* [*timer*.restart](https://github.com/d3/d3-timer#timer_restart) - resets the timer’s start time and callback.
* [*timer*.stop](https://github.com/d3/d3-timer#timer_stop) - stops the timer.
* [*timer*.id](https://github.com/d3/d3-timer#timer_id) - a unique, opaque identifier.
* [d3.timerFlush](https://github.com/d3/d3-timer#timerFlush) - immediately executes any active timers.
