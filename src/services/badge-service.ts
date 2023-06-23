import {RestApi} from "./restApi";
import {BadgeInfo} from "../types";

export class BadgeService {
  private restApi = new RestApi('profile');

  async getList(orgId: string) {
    return this.restApi.$get<BadgeInfo[]>('badges', null, { jwt: { tenant: orgId }});
  }

  addNew(orgId: string, name: string) {

    return this.restApi.$post<BadgeInfo[]>('badge', { name }, { jwt: { tenant: orgId }});
  }

}