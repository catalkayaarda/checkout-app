import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchBar' })
export class SearchBarPipe implements PipeTransform {
  transform(data: any, search: any): any {
    // transform(value: any[], keyword: string): any {
    //   if (!value || !keyword) return value;
    //   const regexpKeyword = new RegExp(keyword.toString(), 'gi');
    //   return value.filter((item) => {
    //     // @ts-ignore
    //     return regexpKeyword.test(Object.values(item));
    if (!data) return null;
    if (!search) return data;

    search = search.toLowerCase();

    return data.filter(function (item: any) {
      if (item.name && item.id && item.image_url) {
        return item.name.toLowerCase().includes(search);
      }
      if (item.name && item.dial_code && item.code) {
        return (
          item.name.toLowerCase().includes(search) ||
          item.dial_code.toLowerCase().includes(search)
        );
      } else {
        return JSON.stringify(item).toLowerCase().includes(search);
      }
    });
  }
}
