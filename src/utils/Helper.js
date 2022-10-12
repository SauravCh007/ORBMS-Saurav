
export function dateWeekdayTime(date) {
  const inputDate = new Date(date);
  if (date === undefined || date === null) {
    return '';
  }
  return (`${inputDate.toLocaleDateString([], { month: 'short', day: 'numeric' })} (${inputDate.toLocaleDateString([], { weekday: 'short' })})`);
}

export function timestampToMonthDayTime(date) {
  const inputDate = new Date(date);
  return `${inputDate.toLocaleDateString([], { month: 'short', day: 'numeric' })} (${inputDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
}

// --Just Now, 7 minutes ago, 1 hour ago,
export function timespan(someDate, option = 0) {
  const inputDate = new Date(someDate);
  const currentDate = new Date();
  const diffDate = Math.abs(currentDate - inputDate);

  const oneSecond = 1000;
  const oneMinute = 60 * oneSecond;
  const oneHour = 60 * oneMinute;
  const oneDay = 24 * oneHour;
  const fiveDays = 5 * oneDay;
  const oneWeek = 7 * oneDay;
  const sixMonths = 24 * oneWeek;

  switch (option) {
    // Option 0
    case 0:
      if (diffDate < oneMinute) {
        return ('Just now');
      } else if (diffDate < oneHour) {
        if (diffDate < (oneMinute * 2)) {
          return (`${Math.floor(diffDate / oneMinute)} minute ago`);
        }
          return (`${Math.floor(diffDate / oneMinute)} minutes ago`);
      } else if (diffDate < oneDay) {
        if (diffDate < (oneHour * 2)) {
          return (`${Math.floor(diffDate / oneHour)} hour ago`);
        }
          return (`${Math.floor(diffDate / oneHour)} hours ago`);
      } else if (diffDate < oneWeek) {
        return (
          `${inputDate.toLocaleDateString([], { weekday: 'long' })}, ${inputDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
      }
        return (
          `${inputDate.toLocaleDateString([], {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}, ${inputDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',
          })}`
        );
    // Option 1
    case 1:
      if (diffDate < oneDay) {
        return ((inputDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })));
      } else if (diffDate < fiveDays) {
        return ((inputDate.toLocaleDateString([], { weekday: 'short' })));
      } else if (diffDate < sixMonths) {
        return ((inputDate.toLocaleDateString([], { month: 'short', day: 'numeric' })));
      }
        return ((inputDate.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })));
    default:
      return ('Another option?');
  }
}

export function cleanEmailBody(str) {
  return str.replace(/<\/?[^>]+(>|$)/g, '');
}

export function cleanEmailBodyPreview(str) {
  // console.log(str,'++++++++');
  const length = 100;
  str = str.replace(/(<([^>]+)>)/ig, '');
  //str = str.replace(/(\r\n|\n|\r)/gm, '');
  str = str.replace(/\s+/g,' ').trim();
  str = str.substring(0, length);
  // str = `${str}...`;
  // console.log(str,'************');
  return str;
}

export function FormatTime(time) {
  var timeString = time;
  var H = +timeString.substr(0, 2);
  var h = H % 12 || 12;
  var ampm = (H < 12 || H === 24) ? " AM" : " PM";
  timeString = h + timeString.substr(2, 3) + ampm;

  return timeString
}

export function timestrToSec(timestr) {
  var parts = timestr.split(':');
  return (parts[0] * 3600) +
         (parts[1] * 60);
}

function pad(num) {
  if(num < 10) {
    return "0" + num;
  } else {
    return "" + num;
  }
}

export function formatTime(seconds) {
  return [pad(Math.floor(seconds/3600)),
          pad(Math.floor(seconds/60)%60),
          ].join(":");
}

export function tConvert (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    // time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}

export function emailInfo(email) {
  let from = '';
  let to = '';
  let toList = [];

  if (email && email.from) {
    if (email.from instanceof Array) {
      email.from.forEach((item, index) => {
        if (index > 0) {
          from += ', ';
        }
        if (item.personal && item.personal !== '') {
          from += item.personal;
        } else {
          from += `${item.mailbox}@${item.host}`;
        }
      });
    } else if (email.from instanceof String) {
      from += email.from;
    }
  } 
  /*
  if (email && email.to && email.to.length > 0) {
    email.to.forEach((item, index) => {
      if (index > 0) {
        to += ', ';
      }
      let newTo = `${item.mailbox}@${item.host}`;
      to += newTo;
      toList.push(newTo);
    });
  }
  */
  return {
    from,
    to,
    toList,
  }
}

export const formatMobileNumber = (text) => {
  var cleaned = ('' + text).replace(/\D/g, '');
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = (match[1] ? '+1 ' : '');
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return text;
  /*
  var cleaned = ("" + text).replace(/\D/g, "");
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = match[1] ? "+1 " : "",
      number = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
        ""
      );
    return number;
  }
  return text;
  */
}
