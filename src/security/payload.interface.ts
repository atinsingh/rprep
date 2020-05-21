import { Authority } from '../model/authority.entity';


export interface Payload {
  id: string;
  username: string;
  authorities?: Authority[];
}
