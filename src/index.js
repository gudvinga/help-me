module.exports = function count(s, pairs) {
  let divisorsN = pairs.reduce( (obj, pair) => ({...obj, [pair[0]]:pair[1]}), {}),
      divisorsK = {};
  let countK = 0,
      res = [];

  s = String(s).split('').map( n => +n);

  let i = 0;
  while (JSON.stringify(divisorsN) !== JSON.stringify(divisorsK) && i < 10000) {
    for (let j = 0; j < s.length; j++) {
      createDevisorsK(i+j, 2);
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
      res *= key in divisorsK ?  Math.pow(+key, Math.min(divisorsN[key], divisorsK[key])) : 1;
    }
    return res;
  }

  function createDevisorsK(K, i) {
    divisorsK = {};
    if (K === 0) {
      divisorsK = {0:1}
    } else if (K === 1) {
      divisorsK = {1:1}
    } else {
      while (K !== 1) {
        if (K % i === 0) {
          divisorsK[i] ? divisorsK[i]++ : divisorsK[i] = 1;
          K /= i;
        } else {
          i++;
        }
      }
    }
  }

  return countK % 1000000007;

}