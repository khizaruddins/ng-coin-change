import { IntegerValidatorService } from './../utilities/integer-validator.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-box',
  templateUrl: './change-box.component.html',
  styleUrls: ['./change-box.component.scss']
})
export class ChangeBoxComponent implements OnInit {

  constructor(
    private integerValidatorService: IntegerValidatorService
  ) { }
  tabActive: string = 'changebox';
  changeBoxInput: FormControl = new FormControl(null, [Validators.required, Validators.min(1), this.integerValidatorService.isInteger]);
  coinsRes: {} = {};
  userId: string = '';
  transactionsArr: any[] = [];

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userInfo')).userId;
  }

  changeTab(value: string): void {
    this.tabActive = value;
    if (this.tabActive === 'transactions') {
      this.getTransactions()
    }
  }

  getTransactions() {
    let userTrans = JSON.parse(localStorage.getItem('userTransactions'));
    if (userTrans) {
      let transactionItem = userTrans.find(item => item.userId === this.userId)
      let transactionArr;
      if (transactionItem) {
        transactionArr = transactionItem.transactions;

        this.transactionsArr = [...transactionArr];
      } else {
        transactionArr = null;
        this.transactionsArr = null;
      }
    } else {
      this.transactionsArr = null;
    }
  }

  getLengthOfCoinRes() {
    return Object.keys(this.coinsRes).length > 0;
  }

  onSubmitChangeBoxInput() {
    if (this.changeBoxInput.valid) {
      let arr = [];
      let resultCoinArr = [];
      const res = this.changeCoin(10, this.changeBoxInput.value);
      [1, 2, 5, 10].forEach(coin => {

        if (!(Object.keys(res).map(item => parseInt(item)).includes(coin))) {
          res[coin] = 0;
          resultCoinArr.push(0)
        } else {
          resultCoinArr.push(res[coin])
        }
      });
      this.coinsRes = res;
      if (localStorage.getItem('userTransactions') !== null) {
        let userTrans = JSON.parse(localStorage.getItem('userTransactions'));
        userTrans.map(item => {
          if (item.userId === this.userId) {
            item.transactions.push({
              value: this.changeBoxInput.value,
              change: resultCoinArr
            });
          }
        });
        localStorage.setItem('userTransactions', JSON.stringify(userTrans));
      } else {
        arr = [
          {
            userId: this.userId,
            transactions: [{
              value: this.changeBoxInput.value,
              change: resultCoinArr
            }]
          }
        ];
        localStorage.setItem('userTransactions', JSON.stringify(arr));
      }
    } else {
      this.changeBoxInput.markAllAsTouched();
    }
  }

  changeCoin(coin, amount) {
    let res = {};
    if (amount !== 1) {
      let quotient = amount / coin;
      res[coin] = Math.floor(quotient);
      let remainder = amount % coin;
      if (remainder === 3) {
        const remainderRes = this.changeCoin(2, remainder);
        res = {
          ...res,
          ...remainderRes,
        }
      } else if ((remainder > 1 || remainder > 2) && Number.isInteger(remainder) && remainder % 5 != 0 && remainder % 2 !== 0) {
        const remainderRes = this.changeCoin(5, remainder);
        res = {
          ...res,
          ...remainderRes,
        }

      } else if (remainder % 5 === 0 && remainder !== 0) {
        const remainderRes = this.changeCoin(5, remainder);
        res = {
          ...res,
          ...remainderRes,
        }
      } else if ((remainder == 1) || remainder == 2) {
        res[remainder] = remainder;
      } else if (remainder !== 0) {
        const resRemainder = this.changeCoin(2, remainder);
        res = {
          ...res,
          ...resRemainder
        }
      }
    } else {
      res[amount] = amount;
    }
    return res;
  }

}
