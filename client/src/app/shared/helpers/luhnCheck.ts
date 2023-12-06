export function luhnCheck(param: any) {
  return new Promise((resolve, reject) => {
    let cardNumber = param.replace(/ /gi, '').split('');
    let newCardNumber: any[] = [];
    let totalValue: number = 0;

    cardNumber.forEach((item: any, i: any) => {
      if (i % 2 === 0) {
        item = item * 2;
        if (item >= 10) {
          let value = item.toString().split('');
          newCardNumber.push(
            (parseInt(value[0]) + parseInt(value[1])).toString()
          );
        } else {
          newCardNumber.push(item.toString());
        }
      } else {
        newCardNumber.push(item.toString());
      }
    });
    newCardNumber.forEach((item, i) => {
      totalValue += parseInt(item);
    });

    if (totalValue % 10 === 0) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}
