type MembershipObj = {
  cost: number;
  maxTeams: number;
  maxMembers: number;
  maxJournies: number;
  id: number;
};

type MembersLevelObj = {
  name: string;
  read: boolean;
  update: boolean;
  deleted: boolean;
  create: boolean;
  reportAccess: boolean;
  id: number;
};

export { MembershipObj, MembersLevelObj };
