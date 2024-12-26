import { MembersLevelObj } from "../types.js";

export const TeamMemberLevels = {
  ADMIN: {
    name: "admin",
    read: true,
    update: true,
    deleted: true,
    create: true,
    reportAccess: true,
    id: 1,
  },
  WORKER: {
    name: "worker",
    read: true,
    update: true,
    deleted: true,
    create: true,
    reportAccess: false,
    id: 2,
  },
  OBSERVER: {
    name: "observer",
    read: true,
    update: false,
    deleted: false,
    create: false,
    reportAccess: false,
    id: 3,
  },
  LIMITED_WORKER: {
    name: "limited worker",
    read: true,
    update: true,
    deleted: false,
    create: false,
    reportAccess: false,
    id: 4,
  },
  REVIEWER: {
    name: "reviewer",
    read: true,
    update: true,
    deleted: false,
    create: false,
    reportAccess: true,
    id: 5,
  },
  findById(id : number) : MembersLevelObj | void {
    if (id == 1) {
      return this.ADMIN;
    }
    if (id == 2) {
      return this.WORKER;
    }
    if (id == 3) {
      return this.OBSERVER;
    }
    if (id == 4) {
      return this.LIMITED_WORKER;
    }
    if (id == 5) {
      return this.REVIEWER;
    }
  },
  getAll() : MembersLevelObj[] {
    return [
      this.ADMIN,
      this.WORKER,
      this.OBSERVER,
      this.LIMITED_WORKER,
      this.REVIEWER,
    ];
  },
};
