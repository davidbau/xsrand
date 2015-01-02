// A selection of fast 32-bit xorshift RNGs that can be implemented
// in Javascript.
//
// Usage:
//
// var rng = require('xsrand').xor4096(seed);
// var r = rng(); // pseudorandom between 0 and 1.
//
// Background: in 2003, George Marsaglia discovered a class of
// fast RNGs using only on xor and shift operations - these
// generators are very robust compared to their simplicity.
//
// Several others have studied this class of generators and
// proposed variants that improve robustness of the randomness.
// The best algorithms that can be implemented in Javascript
// are included below.
//
// native: 27.35 nanoseconds per call, 1.0x native random.
// Benchmark times compare to Math.random based on v8 on an Intel PC.
//
// Only 32-bits of randomness are generated into numbers [0..1).
//
// For 53 bits of randomness into (0..1), call "double":
// var u = xor4096.double();
//
// To generate a raw int32 with 32 random bits, call "int32":
// var i = xor4096.int32();
//
// Just use >>> 0 if you need positive numbers only:
// var u = xor4096.int32() >>> 0;


// xor128: 38 nanoseconds per call, 1.4x native random.
// A pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = require('./xor128')(1);

// xsadd: 49.25 nanoseconds per call, 1.8x native random.
// Mutsuo Saito and Makoto Matsumoto's xorshift with an addition.
// Period: 2^128-1.
// Fails when bits reversed: LinearComp, MatrixRank, MaxOft, Permutation.
var xsadd = require('./xsadd')(1);

// xorwow: 51.15 nanoseconds per call, 1.9x native random.
// George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = require('./xorwow')(1);

// xorshift7: 56.35 nanoseconds per call, 2.1x native random.
// François Panneton & Pierre L'ecuyer's 7-shift generator with 256 bits.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = require('./xorshift7')(1);

// xor4096: 57.65 nanoseconds per call, 2.1x native random.
// Richard Brent's 4096-bit "xorgens" xor shift plus weyl.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = require('./xor4096')(1);

module.exports = {
  xor128: xor128,
  xsadd: xsadd,
  xorwow: xorwwow,
  xorshift7: xorshift7,
  xor4096: xor4096
};
