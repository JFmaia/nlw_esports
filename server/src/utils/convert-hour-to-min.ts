//18:00hrs --> 1080min

 export function convertHourToMin (hourString: string){
 const [hours, minutes] =hourString.split(':').map(Number);

 const minutesAmount = (hours * 60) + minutes;

 return minutesAmount;
}