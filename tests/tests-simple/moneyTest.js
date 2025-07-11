import {formatCurrency} from '../../scripts/utils/money.js';

console.log('test suite: formatCurrency')
console.log('converts cents into dollars');

if(formatCurrency(2095) === '20.95'){//Basic test case
    console.log('passed');
}else {
    console.log('failed');
}

console.log('works with 0');

if(formatCurrency(0) === '0.00'){//Edge case
    console.log('passed');
}else{
    console.log('failed');
}

console.log('rounds up to the nearest cent');

if(formatCurrency(2000.5) === '20.01'){//Edge case
    console.log('passed');
}else{
    console.log('failed');
}

console.log('rounds down to the nearest cent');

if(formatCurrency(2000.4) === '20.00'){
    console.log('passed');
}else{
    console.log('false');
}

console.log('converts negetive cents into dollars');

if(formatCurrency(-500) === '-5.00'){
    console.log('passed');
}else{
    console.log('false');
}