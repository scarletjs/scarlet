Scarlet Performance Tests
=========================

Benchmarking has been performed against [hooks](https://github.com/bnoguchi/hooks-js) using [benchmark](https://github.com/bestiejs/benchmark.js).

1. Clone the repository
2. browse to the performance directory in the terminal
3. Run the **run.sh** command:

```
$: ./run.sh

```

##Results of Last Test Run

Intercepting an Instance of a Named Function:
scarlet x 153,162 ops/sec ±6.59% (71 runs sampled)
hooks x 62,861 ops/sec ±2.03% (90 runs sampled)
scarlet is 133% faster.

Intercepting a Prototype Function:
scarlet x 116,899 ops/sec ±2.90% (73 runs sampled)
hooks x 63,887 ops/sec ±1.59% (92 runs sampled)
scarlet is 81% faster.

Intercepting a Un-Named Function:
scarlet x 144,433 ops/sec ±5.24% (74 runs sampled)
hooks x 56,789 ops/sec ±2.34% (86 runs sampled)
scarlet is 147% faster.

Intercepting a Object Literal:
scarlet x 170,106 ops/sec ±3.17% (86 runs sampled)
hooks x 62,440 ops/sec ±2.07% (86 runs sampled)
scarlet is 170% faster.

Multiple Interception using a Named Function:
scarlet x 134,730 ops/sec ±4.36% (72 runs sampled)
hooks x 45,955 ops/sec ±1.76% (91 runs sampled)
scarlet is 186% faster.

Multiple Interception using a Object Literal:
scarlet x 136,564 ops/sec ±4.67% (67 runs sampled)
hooks x 44,983 ops/sec ±2.32% (88 runs sampled)
scarlet is 197% faster.

Multiple Interception using a Prototype Function:
scarlet x 107,840 ops/sec ±4.02% (75 runs sampled)
hooks x 42,572 ops/sec ±4.88% (83 runs sampled)
scarlet is 155% faster.

Multiple Interception using a Un-Named Function:
scarlet x 143,705 ops/sec ±4.62% (70 runs sampled)
hooks x 61,645 ops/sec ±1.71% (90 runs sampled)
scarlet is 127% faster.
143689.4672024598,113601.71118093889,137246.76872598458,164878.8343793929,129102.72661810226,130466.40832015725,103668.36439240159,137359.88022901394
61612.94996579221,62884.7105050723,55492.60858074349,61176.56303531015,45159.154999195365,43964.61644317327,40593.2543762308,60607.544168073844

scarlet is 147% (2.47x) faster than hooks.
