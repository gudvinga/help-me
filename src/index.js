module.exports = function count(s, pairs) {
  let divisorsN = pairs.reduce( (obj, pair) => ({...obj, [pair[0]]:pair[1]}), {}),
      divisorsK = {};
  let countK = 0,
      res = [];

  s = String(s).split('').map( n => +n);

  let j = 0;
  while (JSON.stringify(divisorsN) !== JSON.stringify(divisorsK)) {
    createDevisorsK(j, 2);

    res.push(NOD(divisorsK, divisorsN));

    // if (NOD(divisorsK, divisorsN) === 1) {
    //   countK++;
    // }

    j++;
    // console.log(JSON.stringify(divisorsK));
    // console.log('countK = ', countK);   
  }

  for (key of s) {
    if (key === 0) {
      res.forEach( item => item !== 1 ? countK++ : null)
    } else {
      res.forEach((item, i) => item === 1 && i !== 0 ? countK++ : null)
    }
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