export const RESTART_ON_REMOUNT = "@@saga-injector/restart-on-remount";
export const DAEMON = "@@saga-injector/daemon";
export const ONCE_TILL_UNMOUNT = "@@saga-injector/once-till-unmount";

export interface Modes {
  RESTART_ON_REMOUNT: string;
  DAEMON: string;
  ONCE_TILL_UNMOUNT: string;
}

export const Modes = {
  RESTART_ON_REMOUNT: "@@saga-injector/restart-on-remount",
  DAEMON: "@@saga-injector/daemon",
  ONCE_TILL_UNMOUNT: "@@saga-injector/once-till-unmount",
};
