/* solution submission link: https://leetcode.com/problems/string-to-integer-atoi/submissions/1912511993/*/
/* I think this link can be only accessible my me, though other people can see the problem but can't see the solution */

function myAtoi(s: string): number {
  const numbers = new Set<string>(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])

  /* "  -12312" */
  let isLeading = true;
  let isMinus = false;

  const INT_32_BIT_MAX = 2147483647;
  const INT_32_BIT_MIN = -2147483648;
  let num = 0;
  for (let i = 0; i < s.length; i++) {
    /* handing whitespace. all these comments with handling blah blah are not necessary. But I feel a little organized somehow. Weired :) */
    const isWhiteSpace = s[i] === " "
    if (isLeading && isWhiteSpace) continue; // go to next loop
    else if(!isLeading && isWhiteSpace) break;

    /* handling minus sign */
    const isMinusSign = s[i] === "-";
    if(isLeading && isMinusSign) {
      isMinus = true;
      isLeading = false;
      continue
    } else if(!isLeading && isMinusSign) {
      break;
    }

    /* handling plus sign */
    if(s[i] === "+" && isLeading) {
      isLeading = false;
      continue
    }
    else if(s[i] === "+" && !isLeading) break;

    /* handling number */
    const isNumber = numbers.has(s[i])
    if(isNumber) {
      const convertedNum = convertCharToNumber(s[i]);
      num = addNumber(num, convertedNum);
      if(isLeading) isLeading = false;
    } else {
      /* this means it's not a number */
      break;
    }
  }

  if(isMinus) num = num * (-1);

  if(num > INT_32_BIT_MAX) num = INT_32_BIT_MAX;
  else if(num < INT_32_BIT_MIN) num = INT_32_BIT_MIN;

  return num;
}

/**
 * Accumulates a numeric value by shifting the previous result
 * one decimal place to the left (×10) and adding the next digit.
 */
const addNumber = (prevNum, add) => {
  return (prevNum * 10) + add;
}

const convertCharToNumber = (
  // this should be a single character input
  char:string
)=> {
  const charCodeOfZero = "0".charCodeAt(0);
  const charCodeOfInput = char.charCodeAt(0);
  return charCodeOfInput - charCodeOfZero;
}
