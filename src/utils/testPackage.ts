import { getConfig } from "..";



export const testPackage = (a: number, b: number, c: number): number => {
    const originalFunction = (a: number, b: number, c: number): number => {
      return a + b + c;
    };
  
    const customHook = getConfig().callbacks?.testPackage;
    if (customHook) {
      return customHook(originalFunction)(a, b, c);
    }
  
    return originalFunction(a, b, c);
  };
  