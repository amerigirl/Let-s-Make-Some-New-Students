import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'phone'
})

export class Phone implements PipeTransform{

  transform(phoneValue: number | string) {

    phoneValue = phoneValue.toString();
    const countryCode = "1+ ";
    const areaCode = phoneValue.slice(0,3)
    const midNums = "-" + phoneValue.slice(3,6)
    const finalNums = "-" + phoneValue.slice(7,12)

    return countryCode + areaCode + midNums + finalNums;
  }

}
