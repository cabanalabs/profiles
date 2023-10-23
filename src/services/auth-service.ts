import {RestApi} from "./restApi";
import {configEnv} from "../config-env";
import {OrgReg} from "../types";

export class AuthService {

  private restApi = new RestApi('profile');

  async orgInfo(orgId: string) {
    return this.restApi.$get<OrgReg>('/reg', null, { jwt: { tenant: orgId }});
  }

  async session(tenant: TenantConnect) {
    const sessionInfo =  await this.restApi.$post('/session', tenant);
    configEnv.setSessionProperty('platform', tenant.platform);
    return sessionInfo;
  }

  async resetRegistration(orgId: string, managerId: string) {
    await this.restApi.$post('/reset', null, { jwt: { tenant: orgId, manager: managerId }});
  }
}

export type TenantConnect = {
  id: string;
  name: string;
  status?: string;
  platform: 'discord' | 'slack' | string;
}