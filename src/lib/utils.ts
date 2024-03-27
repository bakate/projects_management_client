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
