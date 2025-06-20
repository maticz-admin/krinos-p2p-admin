// import lib
import isEmpty from './isEmpty';

export const toFixed = (item, type = 2) => {
    try {
        if (!isEmpty(item) && !isNaN(item)) {
            item = parseFloat(item)
            return item.toFixed(type)
        }
        return ''
    } catch (err) {
        return ''
    }
}

export const currencyFormat = (item) => {
    try {
        if (!isEmpty(item) && !isNaN(item)) {
            item = item.toString();
            let splitValue = item.split('.')
            return splitValue[1] ? `${splitValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${splitValue[1]}` : splitValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        return ''
    } catch (err) {
        return ''
    }
}


export const toFixedNumber = (x) => {
    if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10, e - 1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
    } else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10, e);
            x += (new Array(e + 1)).join('0');
        }
    }
    return x;
}