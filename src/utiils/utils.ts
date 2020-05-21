import { StatusEnum } from '../model/enums/status.enum';

export class Utils {
  static getStatusEnumFromString(str: string): StatusEnum {
      if(str.trim() =='active' || str.trim() =='ACTIVE' ){
        return StatusEnum.ACTIVE;
      }

    if(str.trim() =='suspended' || str.trim() =='SUSPENDED' ){
      return StatusEnum.SUSPENDED;
    }
    return StatusEnum.ACTIVE;
  }
}
