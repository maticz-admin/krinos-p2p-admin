// import lib
import isEmpty from './isEmpty';
import moment from 'moment';

export const dateTimeFormat = (dateTime, format = 'YYYY-MM-DD HH:mm:ss') => {
    try {
        if (!isEmpty(dateTime)) {
            let newDateTime = new Date(dateTime);
            if (format.includes('YYYY')) {
                format = format.replace('YYYY', newDateTime.getFullYear())
            }

            if (format.includes('MM')) {
                let month = newDateTime.getUTCMonth() + 1;
                month = month > 9 ? month : `0${month}`
                format = format.replace('MM', month)
            }

            if (format.includes('DD')) {
                let date = newDateTime.getUTCDate();
                date = date > 9 ? date : `0${date}`
                format = format.replace('DD', date)
            }

            if (format.includes('HH')) {
                let hour = newDateTime.getUTCHours();
                hour = hour > 9 ? hour : `0${hour}`
                format = format.replace('HH', hour)
            }

            if (format.includes('mm')) {
                let minute = newDateTime.getUTCMinutes();
                minute = minute > 9 ? minute : `0${minute}`
                format = format.replace('mm', minute)
            }

            return format

        } else {
            return ''
        }
    } catch (err) {
        return ''
    }
}

export const momentFormat = (dateTime,format='YYYY-MM-DD HH:mm') => {
    try{
        if (!isEmpty(dateTime)) {
            let newDateTime = new Date(dateTime);
            return moment(newDateTime).utc().format(format)
        }
        return ''
    } catch(err){
        return ''
    }
}