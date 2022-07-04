xsrand
======

A selection of fast 32-bit xorshift RNGs in Javascript.

Usage
-----

<pre>
// Seed an algorithm to get an rng.
var rng = require('xsrand').xor4096(seed);
var r = rng();
</pre>

Included algorithms
-------------------

| algorithm | time | period            | BigCrush failures        |
| --------- | ---- | ----------------- | ------------------------ |
| xor128    | 1.4x | 2<sup>128</sup>-1 | MatrixRank, LinearComp   |
| xsadd     | 1.8x | 2<sup>128</sup>-1 | (reversed) LinearComp, MatrixRank, MaxOft, Permuation |
| xorwow    | 1.9x | 2<sup>192</sup>-2<sup>32</sup> | CollisionOver, SimpPoker, and LinearComp. |
| xorshift7 | 2.1x | 2<sup>256</sup>-1 | - |
| xor4096:  | 2.1x | 2<sup>4128</sup>-2<sup>32</sup> | - |


Advanced Usage
--------------

By default (and for speed), only 32-bits of randomness are generated
into numbers [0..1).

<pre>
var f = rng() * pow(2, 32);
assert.equal(f, Math.floor(f));
</pre>

For 53 bits of randomness into (0..1), call "double"

<pre>
var u = rng.double();
</pre>

To generate a raw int32 with 32 random bits, call "int32":

<pre>
var i = rng.int32();  // Signed int32.
var u = i >>> 0;      // Reinterpet as uint32.
</pre>

Background
----------
In 2003, George Marsaglia discovered a class of
fast RNGs using only on xor and shift operations - these
generators are very robust compared to their simplicity.
(http://www.jstatsoft.org/v08/i14/paper).

Several others have studied this class of generators and
proposed variants that improve robustness of the randomness.
The best algorithms that can be implemented in Javascript
are included here, and benchmarked against calls to
Javascript's native Math.random() on Chrome on an Intel
PC, in a loop where native calls consume 27.35 nanoseconds
per call.

**xor128** is a very fast pure xor-shift generator from Marsaglia's
original paper.  Though xor128 passes the Diehard tests, it fails
other statistical tests of randomness.  Marsaglia also
proposed **xorwow**, which adds a simple Weyl generator
to add more robustness.

**xsadd** adds robustness through an addition step; it was
proposed by Mutsuo Saito and Makoto Matsumoto (author of MT19937)
(http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/XSADD/index.html),
and it passes all BigCrush tests; although it fails some if
bits are reversed.  Sebastiano Vigna recently proposed another
algorithm based on this idea, "xorshift128+", which fixes
weaknesses in the lower bits; unfortunatly, that improved
algorithm requires 64-bit arithmatic and is not fast in Javascript.

**xorshift7***, by François Panneton and Pierre L'ecuyer, takes
a different approach: it adds robustness by allowing more shifts
than Marsaglia's original three.  It is a 7-shift generator
with 256 bits, that passes BigCrush with no systmatic failures.

**xor4096**, by Richard Brent, is a 4096-bit xor-shift with a
very long period that also adds a Weyl generator. It also passes
BigCrush with no systematic failures.  Its long period may
be useful if you have many generators and need to avoid
collisions.
