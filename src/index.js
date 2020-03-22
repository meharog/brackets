module.exports = function check(str, bracketsConfig) {
  let strArr = str.split('')
  if (strArr.length % 2 !== 0) { return false };
  let step = 0;//step in str
  let depth = 0;//depth brackets in str
  let previousState = 'close';//previous state of brackets in str
  let openStart;
  let closeStart;
  for (let i = 0; i < bracketsConfig.length; i++) {
    if (str[0] === bracketsConfig[i][0]) {
      openStart = bracketsConfig[i][0];
      closeStart = bracketsConfig[i][1];
    };
  };
  if (openStart === undefined) { return false }//check 1

  findBracket(openStart, closeStart, 'without_openOver');

  function findBracket(open, close, openOver) {
    step++;
    if (previousState === 'open') { depth++; };
    previousState = 'open';//?
    while (step < strArr.length) {
      if (strArr[step] === close) {
        close = undefined;//exclude repeated closing brackets
        step++;
        if (previousState === 'close') { depth--; };//if close closed
        previousState = 'close';
      } else {
        let openNext;
        let closeNext;
        for (let i = 0; i < bracketsConfig.length; i++) {
          if (str[step] === bracketsConfig[i][0]) {
            openNext = bracketsConfig[i][0];
            closeNext = bracketsConfig[i][1];
          };
        };
        if ((openNext === closeNext) && (openNext === openOver) && (depth > 0)) { return }
        if (openNext === undefined) { return };//check 1.1
        findBracket(openNext, closeNext, open);
      };
    };
  };
  if (depth !== 0) { return false };
  if (step !== strArr.length) { return false };
  return true;
};