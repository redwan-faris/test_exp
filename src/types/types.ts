import { LicenseSchema, LoginSchema } from "../types/schemas";

export type ActivateLicenseResponse = {
    token: string;
    license: ReturnType<typeof LicenseSchema.parse>;
    login?: ReturnType<typeof LoginSchema.parse>;
  };
  
  export type ErrorResponse = {
    status: number;
    message: string;
    command?: string;
    errorKey?: string;
  };
  
  export function isErrorResponse(data: any): data is ErrorResponse {
    return data && typeof data === 'object' && 'status' in data && 'message' in data;
  }

  export type ActivateLicenseHandlerResponse = {
    data: ActivateLicenseResponse | ErrorResponse;
    status: number;
  
  };

  export type verifyLicenseResponse = {
    token: string;
    license: ReturnType<typeof LicenseSchema.parse>;
    login?: ReturnType<typeof LoginSchema.parse>;
  };

  export type verifyLicenseHandlerResponse = {
    data: verifyLicenseResponse | ErrorResponse;
    status: number;
  };

  export type CreateLicenseResponse = {
    licenseKey: string;
  };

  export type CreateLicenseHandlerResponse = {
    data: CreateLicenseResponse | ErrorResponse;
    status: number;
  };

  export type DeactivateLicenseResponse = {
    status: number;
    message: string;
  };

  export type DeactivateLicenseHandlerResponse = {
    data: DeactivateLicenseResponse | ErrorResponse;
    status: number;
  };