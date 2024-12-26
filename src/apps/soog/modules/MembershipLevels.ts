import { MembershipObj } from "../types.js";

export const MembershipLevels = {
  BASIC: {
    cost: 0.0,
    maxTeams: 1,
    maxMembers: 3,
    maxJournies: 1,
    id: 1,
  },
  ESSENTIAL: {
    cost: 14.99,
    maxTeams: 5,
    maxMembers: 20,
    maxJournies: 50,
    id: 2,
  },
  PRO: {
    cost: 24.99,
    maxTeams: 15,
    maxMembers: 50,
    maxJournies: 100,
    id: 3,
  },
  findById(id: number): MembershipObj | void {
    // Use direct reference instead of `this`
    if (id == 1) {
      return this.BASIC;
    }
    if (id == 2) {
      return this.ESSENTIAL;
    }
    if (id == 3) {
      return this.PRO;
    }
  },
  getAll(): MembershipObj[] {
    // Use direct reference
    return [this.BASIC, this.ESSENTIAL, this.PRO];
  },
};
