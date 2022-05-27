import { State } from '../core/state';
import { sleep } from '../utils';

export interface Info {
  id: number;
  name: string;
}

export interface CommonModelState {
  current?: Info;
  // ...
}

export class CommonModel extends State<CommonModelState> {
  constructor() {
    super();
    this.init();
  }

  async init() {
    await this.fetchUserInfo();
  }

  async fetchUserInfo() {
    await sleep(1000);
    this.setState({ current: { id: 1, name: 'state-model', } });
  }

  logout() {
    this.setState({ current: undefined });
  }
}

export const commonModel = new CommonModel();
