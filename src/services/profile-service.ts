import {RestApi} from "./restApi";
import console from "console";
import {ProfileMetadata, ProfileOptions} from "../types";

export class ProfileService {

  private restApi = new RestApi('profile');

  async getPublicUrl(orgId: string, memberId: string) {
    return this.restApi.$get<string>(`/image/url`, null, { jwt: { tenant: orgId, user: memberId }});
  }

  async getMetaData(orgId: string, memberId: string) {
    return this.restApi.$get<ProfileMetadata>(`/meta`, null, { jwt: { tenant: orgId, user: memberId }});
  }

  async avatar(orgId: string, userId: string, url: string) {
    return this.restApi.$post(`/avatar`, { url }, { jwt: { tenant: orgId, user: userId }});
  }

  async commit(orgId: string, userId: string) {
    return this.restApi.$post<string>(`/commit`, null, { jwt: { tenant: orgId, user: userId }});
  }

  async draft(orgId: string, userId: string, meCard: ProfileOptions) {
    return this.restApi.$post<string>(`/draft`, meCard, { jwt: { tenant: orgId, user: userId }});
  }

  async redeem(orgId: string, userId: string, code: string) {

    console.log('redeem', code);

    try {
      const result = await this.restApi.$post<{ message: string}>(`/redeem`, { code }, { jwt: { tenant: orgId, user: userId }});

      return result.message;
    }
    catch (e) {
      console.log('ClaimCommand.error', e.message);
      if (e.message.includes('ALREADY_REDEEMED_BY_OTHER')) {
        return 'This code has already been claimed by someone else.';
      }
      else if (e.message.includes('ALREADY_REDEEMED')) {
        return 'You already claimed this code.'
      }
      else {
        return 'Unable to claim code. Check with your provider.';
      }
    }
  }

  // async did(orgId: string, userId: string, temporary = false) {
  //   console.log('prepareProperties', userId, temporary);
  //
  //   if (temporary)  {
  //     return {
  //       did: '0xC17214bda852407b4429B7a73172D644812c9D90',
  //       qrCodeLink: 'Sample Card'
  //     }
  //   }
  //
  //   return await this.restApi.$get<any>('/card/did', null, { jwt: { tenant: orgId, user: userId }});
  // }
}