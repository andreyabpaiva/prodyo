import { HttpError } from "@/lib/http";

export function getAuthErrorKey(error: unknown): string {
  if (error instanceof HttpError) {
    switch (error.status) {
      case 401:
        return "auth.errors.invalidCredentials";
      case 409:
        return "auth.errors.emailTaken";
      case 400:
        return "auth.errors.invalidRequest";
    }
  }

  return "auth.errors.generic";
}
