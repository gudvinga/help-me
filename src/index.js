module.exports = function count(s, pairs) {
  let divisorsN = pairs.reduce( (obj, pair) => ({...obj, [pair[0]]:pair[1]}), {}),
      divisorsK = {};
  let countK = 0,
      res = [];

  s = String(s).split('').map( n => +n);

  let i = 1;
  while (JSON.stringify(divisorsN) !== JSON.stringify(divisorsK) && i < 10000) {
    for (let j = 0; j < s.length; j++) {
      createDivisorsK(i+j);
      if ( s[j] === 1 && NOD(divisorsK, divisorsN) === 1) {
        countK++;
      } else if (s[j] === 0 && NOD(divisorsK, divisorsN) !== 1) {
        countK++;
      }
    }
    i++;  
  }

  function NOD(divisorsK, divisorsN) {
    let res = 1;
    for (let key in divisorsN) {
      res *= key in divisorsK ? Math.pow(+key, Math.min(divisorsN[key], divisorsK[key])) : 1;
    }
    return res;
  }

  function createDivisorsK(K) {
    divisorsK = {};
    for (key in divisorsN) {
      while (K % +key === 0) {
        divisorsK[key] ? divisorsK[key]++ : divisorsK[key] = 1;
        K /= +key;
      }
    }
  }

  return countK % 1000000007;

}