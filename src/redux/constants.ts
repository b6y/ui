export class Mode { constructor(public mode: string) {} }

export const RESTART_ON_REMOUNT = new Mode("@@saga-injector/restart-on-remount");
export const DAEMON = new Mode("@@saga-injector/daemon");
export const ONCE_TILL_UNMOUNT = new Mode("@@saga-injector/once-till-unmount");

export interface Modes {
  RESTART_ON_REMOUNT: Mode;
  DAEMON: Mode;
  ONCE_TILL_UNMOUNT: Mode;
}

export const Modes = {
  DEFAULT: RESTART_ON_REMOUNT,
  RESTART_ON_REMOUNT,
  DAEMON,
  ONCE_TILL_UNMOUNT,
};
