import { Pipe, PipeTransform } from '@angular/core';
import { PhotoData } from '../model/photoData.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
   transform( data: PhotoData[], searchText: string): PhotoData[] {
    if ( searchText === '' ) {
      return data;
    }
    searchText = searchText.toLowerCase();
    return data.filter(element => element.id.toString().includes(searchText) || element.text.includes(searchText));
  }
}
