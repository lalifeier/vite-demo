const logWrapper = (location: string, args: any[], log: (...args: any[]) => void) => {
  log(`[@admin-pro/${location}]:`, ...args);
};

const info = (location: string, ...args: any[]): void => logWrapper(location, args, console.log);
const warn = (location: string, ...args: any[]): void => logWrapper(location, args, console.warn);
const error = (location: string, ...args: any[]): void => logWrapper(location, args, console.error);

export const Logger = { info, warn, error };

export const throwError = (location: string, message: string): never => {
  throw new Error(`[@admin-pro/${location}]: ${message}`);
};
