import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe implements PipeTransform {

  transform(value: string | Date): string {
    if (!value) return '';

    const date = new Date(value);
    if (isNaN(date.getTime())) return ''; // invalid date

    // Get date parts
    const day = ('0' + date.getDate()).slice(-2);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Get time parts
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // If time is zero, don't show it
    const hasTime = hours !== 0 || minutes !== 0 || seconds !== 0;

    let timeStr = '';
    if (hasTime) {
      let h = hours % 12;
      h = h ? h : 12; // convert 0 to 12
      const strHours = ('0' + h).slice(-2);
      const strMinutes = ('0' + minutes).slice(-2);
      const strSeconds = ('0' + seconds).slice(-2);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      timeStr = ` (${strHours}:${strMinutes}:${strSeconds} ${ampm})`;
    }
    return `${month} ${day}, ${year}${timeStr}`;
  }

}
