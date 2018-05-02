import * as moment from 'moment';

// object to hold events for calendar
export class Events {
  constructor(a, b) {
    this.start =  (b);
    this.title = a + 's Expiration Date';
  }
  start?: Date;
  title?: string;
}
