import type { Request } from "express";

// Minimal authentication hook for TSOA @Security("anonymous")
export async function expressAuthentication(
  _request: Request,
  securityName: string,
  _scopes?: string[]
): Promise<any> {
  // Allow all requests for the 'anonymous' security name
  if (securityName === "anonymous") {
    return true;
  }

  // Default: unauthorized
  throw new Error("Unauthorized");
}
