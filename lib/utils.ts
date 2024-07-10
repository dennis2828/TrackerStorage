import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(err=>{console.log('Cannot copy.',err);
  });
}

export async function hashPassword(password: string) {
  try{
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }catch(err){
    return null;
  }
}

export function generateApiKey(): string {
  const prefix = 'trackerstorage-';
  const randomString = uuidv4().replace(/-/g, '').substring(0, 16); // Generate a UUID and remove dashes
  return prefix + randomString;
}