const postDate = new Date();

console.log('now:', Date.now());
console.log("today: ", postDate);
console.log("day", postDate.getDay());
console.log("day of month", postDate.getDate());
console.log("month", postDate.getMonth());
console.log("year", postDate.getFullYear());
console.log("hour", postDate.getHours());
console.log("minutes", postDate.getMinutes());
console.log("seconds", postDate.getSeconds());
console.log('milliseconds', postDate.getMilliseconds());
console.log('timestamp', postDate.getTime())

console.log('UTC Hours: ', postDate.getUTCHours())
console.log('local timezone offset from UTC: ', postDate.getTimezoneOffset())


//Here is an example that shows how you can get the system's IANA time zone in JavaScript:
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log(timezone); // Asia/Karachi