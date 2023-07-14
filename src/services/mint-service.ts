import {RestApi} from "./restApi";
import {CredentialRequest, CredentialRequestForm, PresentationRequestForm, ProfilePresentationInfo} from "../types";
import {configEnv} from "../config-env";

export class MintService {

  private restApi = new RestApi('mint');

  async profile(orgId: string, userId: string, info: ProfilePresentationInfo) {
    const meCard = info.meCard;
    const { name, title, badges, bio, avatar } = meCard;
    const platform = configEnv.getSessionProperty('platform')
    const iid = `${platform}:${userId}/profile`;

    const credentials: CredentialRequest[] = [];

    //Note: We may borrow Credentials from other projects and need to provide the id if there is one
    info.names.concat(info.titles, info.bios, info.avatars)
    .filter(v => v.visible).forEach(c => credentials.push({ id: c.issuer !== 'self' && c.id, type: c.credentialType, properties: { [c.propertyName]: c.propertyValue }}));
    if (badges) info.badges.forEach(badge => credentials.push({ id: badge.id, type: 'BadgeCredential'}))

    // if (name) info.names.filter(v => v.visible).forEach(c => credentials.push({ id: c.id, type: c.credentialType, properties: c.propertyValue}));
    // if (title) credentials.push({ type: 'SelfCredential', properties: { title }});
    // if (badges) badges.forEach(badge => credentials.push({ id: badge.id, type: 'BadgeCredential'}))
    // if (bio) credentials.push({ type: 'SelfCredential', properties: { bio }});
    // if (avatar) credentials.push({ type: 'SelfCredential', properties: { avatar: avatar }});

    const body: PresentationRequestForm = {
      did: meCard.did,
      issuerIid: `${platform}:${orgId}`,
      credentials
    };

    return this.restApi.$post<string>('/presentation', body, { jwt: { iid }});
  }

  async issueBadgeCredential(orgId: string, managerId: string, recipientId: string, badge: string) {

    const platform = configEnv.getSessionProperty('platform')
    const iid = `${platform}:${managerId}`;

    //NOTE: This credential will become ready to claim in the recipient's account
    const body: CredentialRequestForm = {
      type: 'BadgeCredential',
      issuerIid: `${platform}:${orgId}`,
      recipientIid: `${platform}:${recipientId}`,
      properties: { badge: { label: badge} },
    }

    return this.restApi.$post('/credential', body, { jwt: { iid }});
  }

  async claimCredential(orgId: string, userId: string, claimId: string) {

    const platform = configEnv.getSessionProperty('platform')
    const iid = `${platform}:${userId}`;

    const body = {
      issuerIid: `${platform}:${orgId}`,
      claimId
    }

    const result = await this.restApi.$post<{ id: string }>('/claim', body, { jwt: { iid }});

    console.log('claimCredential.result', result);

    return result.id;
  }
}