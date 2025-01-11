import { parse, format, subDays, isBefore, isEqual, isAfter, differenceInDays, addDays } from "https://esm.sh/date-fns";


const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;


export function dateStringCoverter(dateString) {
  const formattedDate = format(new Date(`${dateString}T00:00:00`), 'MMM, dd', { timeZone: userTimeZone });
  return formattedDate;
}


export function timeStringConverter(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);

  
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);  

  
  const formattedTime = format(date, 'hh:mm a', { timeZone: userTimeZone });
  return formattedTime;
}


export function getCurrentDate() {
  return format(new Date(), 'yyyy-MM-dd', { timeZone: userTimeZone });
}


export function getCurrentTime() {
  return format(new Date(), 'HH:mm', { timeZone: userTimeZone });
}


export function sortEventsByDateTime(array) {
  return array.sort((a, b) => {
    const dateTimeA = parse(`${a.date} ${a.time}`, 'MMM, dd hh:mm a', new Date(), { timeZone: userTimeZone });
    const dateTimeB = parse(`${b.date} ${b.time}`, 'MMM, dd hh:mm a', new Date(), { timeZone: userTimeZone });
    return dateTimeB - dateTimeA;
  });
}


export function isDateInRange(providedDate) {
  const currentDate = new Date();

  
  const twoDaysAgo = subDays(currentDate, 3);

  
  const parsedProvidedDate = parse(providedDate, 'MMM, dd', new Date(), { timeZone: userTimeZone });

  // Use the user's local time zone for comparisons
  const currentUTC = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()));
  const twoDaysAgoUTC = new Date(Date.UTC(twoDaysAgo.getUTCFullYear(), twoDaysAgo.getUTCMonth(), twoDaysAgo.getUTCDate()));

  return isAfter(parsedProvidedDate, twoDaysAgoUTC) && isBefore(parsedProvidedDate, currentUTC) || isEqual(parsedProvidedDate, twoDaysAgoUTC) || isEqual(parsedProvidedDate, currentUTC);
}

export function calculateDuration(startDate, endDate){
  const parsedDate1 = parse(startDate, 'yyyy-MM-dd', new Date());
  const parsedDate2 = parse(endDate, 'yyyy-MM-dd', new Date());

  const daysDifference = differenceInDays(parsedDate1, parsedDate2);

  return Math.abs(daysDifference);
}

export function isDateInRangeInclusive(dateToCheck, startDate, endDate) {
  // Parse the date to check in 'MMM, dd' format using the current year
  const currentYear = new Date().getFullYear();
  const parsedDateToCheck = parse(`${dateToCheck}, ${currentYear}`, 'MMM, dd, yyyy', new Date());

  // Parse start and end dates in 'yyyy-MM-dd' format
  const parsedStartDate = parse(startDate, 'yyyy-MM-dd', new Date());
  const parsedEndDate = parse(endDate, 'yyyy-MM-dd', new Date());

  // Check if the date to check is within the range, inclusive
  return (
    (isAfter(parsedDateToCheck, parsedStartDate) || isEqual(parsedDateToCheck, parsedStartDate)) &&
    (isBefore(parsedDateToCheck, parsedEndDate) || isEqual(parsedDateToCheck, parsedEndDate))
  );
}

export function regularDateStringConverter(dateToCheck){
  const currentYear = new Date().getFullYear();
  const parsedDateToCheck = parse(`${dateToCheck}, ${currentYear}`, 'MMM, dd, yyyy', new Date());

  return format(parsedDateToCheck, 'yyyy-MM-dd', { timeZone: userTimeZone });
}

export function getYesterdayDate() {
  const yesterday = subDays(new Date(), 1);
  return format(yesterday, 'yyyy-MM-dd'); // Format as 'yyyy-MM-dd'
}

export function addOneDayToDate(dateString, inputFormat = 'yyyy-MM-dd', outputFormat = 'yyyy-MM-dd') {
  // Parse the input date string into a Date object
  const parsedDate = parse(dateString, inputFormat, new Date());
  
  // Add one day to the date
  const nextDay = addDays(parsedDate, 1);

  // Format the resulting date
  return format(nextDay, outputFormat);
}

export function isTimeBeforeOrEqual(givenTime, referenceTime) {
  const today = new Date(); // Get today's date

  // Parse given and reference times into Date objects with AM/PM format
  const givenTimeDate = parse(givenTime, 'hh:mm a', today);
  const referenceTimeDate = parse(referenceTime, 'hh:mm a', today);

  // Check if the given time is before or equal to the reference time
  return isBefore(givenTimeDate, referenceTimeDate) || isEqual(givenTimeDate, referenceTimeDate);
}
