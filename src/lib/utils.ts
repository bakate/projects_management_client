import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = async (input: string, settings = {}) => {
  const response = await (
    await fetch(input, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json",
      },
      ...settings,
    })
  ).json();
  return response;
};

export const canDelete = (userId: string, ownerId: string) => {
  if (!userId || !ownerId) {
    return false;
  }
  return userId === ownerId;
};

export function convertDays(days: number): string {
  if (days < 1) {
    const hours = Math.floor(days * 24);
    if (hours < 1) {
      const minutes = Math.floor(days * 24 * 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
    return `since ${hours} hour${hours > 1 ? "s" : ""}`;
  } else if (days < 30) {
    return `since ${days} day${days > 1 ? "s" : ""}`;
  } else if (days < 365) {
    const months = Math.floor(days / 30);
    return `since ${months} month${months > 1 ? "s" : ""}`;
  } else {
    const years = Math.floor(days / 365);
    return `since ${years} year${years > 1 ? "s" : ""}`;
  }
}
