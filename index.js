// I wanted to write this after reading Tony Zotti's y-combinator because it 
// helped me understand what a y-combinator is. Here's his code:
// https://github.com/amZotti/YcombinatorJS

// A y-combinator is just an anonymous function that can call itself recursively
// because its definition was passed to itself as a parameter.
// It's just a clever way of giving an anonymous function a name.
// Instead of giving it a name by assigning a variable name to it using the
// assignment operator (=), we just give the function a name by passing it in as
// a parameter.

const identity = value =>
  (f => f(f, 0))((f, n) => n >= value ? n : f(f, n + 1))

console.log(identity(123))

// I wrote a logarithmic version just for fun assuming the value parameter is a 4 byte integer.
// 1 << 31 is the minimum value for a 4 byte integer (100...00).
// ~0 >>> 1 is the maximum value for a 4 byte integer (011...11).

const identityLogarithmic = value =>
  (f => f(f, 1 << 31, ~0 >>> 1))(
    (f, lo, hi) => {
      const mid = Math.floor(lo + (hi - lo) / 2)
      return (
        mid === value ? mid :
        mid > value ? f(f, lo, mid - 1) :
                      f(f, mid + 1, hi)
      )
    }
  )

console.log(identityLogarithmic(123))

// This isn't very useful, but it's interesting.
