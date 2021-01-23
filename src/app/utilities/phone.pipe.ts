import { Pipe } from "@angular/core";

@Pipe({
  name: "phone"
})
export class PhonePipe {
  transform(rawNum) {
    rawNum = String(rawNum);
    rawNum = rawNum.charAt(0) != 0 ? "+91" + rawNum : "" + rawNum;

    let newStr = "";
    let i = 0;
    for (; i < Math.floor(rawNum.length / 2) - 1; i++) {
      if (i < 3) {
        newStr = newStr + rawNum.substr(i * 3, 3) + "-";
      } else if (i === 3) {
        newStr = newStr + rawNum.substr(i * 3, rawNum.length);
      }
    }

    return newStr;
  }
}
