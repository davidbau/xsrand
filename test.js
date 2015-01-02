// A simple smoke test and benchmark for the generators.

var assert = require('assert');
var xor128 = require('./xor128')(1);
var xsadd = require('./xsadd')(1);
var xorwow = require('./xorwow')(1);
var xs7 = require('./xorshift7')(1);
var xor4096 = require('./xor4096')(1);

var benchmarks = {};

function test(label, fn, double1, float3, int4) {
  if (double1 != null) assert.equal(fn.double(), double1);
  if (float3 != null) assert.equal(fn(), float3);
  if (int4 != null) assert.equal(fn.int32(), int4);
  assert(fn() > 0);
  assert(fn() < 1);
  console.log(label + ' correct');
  benchmarks[label] = {rand: fn, times: []};
};

function benchmark() {
  var n = 20;
  var trials = 30;
  for (var j = 0; j < trials; ++j) {
    for (var k in benchmarks) {
      var fn = benchmarks[k].rand;
      start = +new Date;
      for (var j = 0; j < n* 1e6; ++j) {
        fn();
      }
      end = +new Date;
      benchmarks[k].times.push(end - start);
    }
  }
  for (var k in benchmarks) {
    benchmarks[k].times.sort();
  }
  var nativetime = benchmarks.native.times[0];
  for (var k in benchmarks) {
    var time = benchmarks[k].times[0];
    console.log(k+ ': ' + time / n + ' nanoseconds per call, ' +
       (time / nativetime).toFixed(1) + 'x native random.');
  }
}

test("native", Math.random, null, null, null);
test("xor128", xor128, 0.20348077818368193, 0.3200180798303336, 990383463);
test("xsadd", xsadd, 0.4690656170697256, 0.4788569991942495, -1139748236);
test("xorwow", xorwow, 0.8178000247146859, 0.8407576507888734, 533150816);
test("xorshift7", xs7, 0.21241471533241418, 0.9957620368804783, -1678071207);
test("xor4096", xor4096, 0.1520436450538547, 0.4206166828516871, 1312695376);

benchmark();
