export interface RenownProfile {
  documentId: string;
  ethAddress: string;
  username: string;
  userImage?: string;
  updatedAt: string;
}

export interface MemberProfileData {
  phid: string;
  ethAddress: string;
  name: string;
  profileImage?: string;
}

export interface VetraPackageData {
  documentId: string;
  name: string;
  description: string;
  authorName: string;
  githubUrl: string;
  npmUrl?: string;
}

export interface PHIDOption {
  id: string;
  title: string;
  value: string;
  description: string;
  path: {
    text: string;
    url: string;
  };
  icon?: "Person" | "PackageManager";
}
