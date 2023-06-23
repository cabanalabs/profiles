
export type TenantReg = {
  slug: string;
  name: string;
  badges: string;
  notifyMints?: boolean;
  allowReset?: boolean;
}

export type BadgeInfo = {
  id: string;
  label: string;
  issuer: string;
};


export class ProfileOptions {
  bgColor?: string;
  bgGradient?: string;
  bgUrl?: string;
  avatar?: string;
  name?: string;
  did?: string
  orgId?: string
  userId?: string
  userName?: string
  bio?: string
  accentColor?: string
  format?: 'svg' | 'png' | 'html';
  encoding?: 'base64' | 'binary' | 'html' | 'string';
  timestamp?: number
  qrCodeLink?: string;
  badges?: string[];
  title?: string;
}

export type ProfileCommandVP = {
  verifiableCredential: string[];
}

export type ProfileCommandVC = {
  id: string;
  type: string[];
  issuer: { id: string };
  credentialSubject: { [name: string]: any };
}

export type ProfileCommandClaims = {
  issuer: string;
  id: string;
  visible: boolean;
  credentialType: string;
  properties: { [name: string]: any };
}

export type ProfilePresentationInfo = {
  meCard: ProfileOptions;
  names: ProfileCredential[];
  titles: ProfileCredential[];
  badges: ProfileCredential[];
  bios: ProfileCredential[];
  avatars: ProfileCredential[];
  // claims: ProfileCredential[];
  // shownCredentials: ProfileCredential[];
  // notShownCredentials: ProfileCredential[];
  unclaimed: ProfileCredential[];
  manifest?: Map<string, boolean>;
  changed: boolean;
  issuer: string;
}

export type ProfileCredential = {
  issuer: string;
  visible: boolean;
  credentialType: string;
  propertyName: string;
  propertyValue: any;
  provider?: string;    // for badges
  id?: string;
}

export enum ProfileAction {
  NextPage = 'next-page',
  PreviousPage = 'previous-page',
  BrowseUnclaimed = 'browse-unclaimed',
  BrowseName = 'browse-name',
  BrowseTitle = 'browse-title',
  BrowseBio = 'browse-bio',
  BrowseAvatar = 'browse-avatar',
  BrowseBadges = 'browse-badges',
  SelectClaim = 'select-claim',
  SelectMint = 'select-mint',
  ApplyChanges = 'apply-changes',
}

export enum ProfileAttributeMode {
  Unclaimed = 'Unclaimed',
  Name = 'Name',
  Title = 'Title',
  Bio = 'Bio',
  Avatar = 'Avatar',
  Badges = 'Badges'
}

export type CredentialRequest = {
  id: string;
  type: string;
  properties?: any;
} | {
  id?: string;
  type: string;
  properties: any;
}

export type PresentationRequestForm = {
  did?: string; //if provided, will be verified against the DID of the account
  issuerIid: string,
  recipientIid?: string,
  credentials: CredentialRequest[];   //These are issued immediately (double-check auto-issuance)
  presentation?: {
    assetType: string,
    credentialType: string
  }
}

export type CredentialRequestForm = {
  did?: string; //if provided, will be verified against the DID of the account
  issuerIid: string,
  recipientIid?: string,
} & CredentialRequest