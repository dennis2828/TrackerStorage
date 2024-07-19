import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function copyToClipboard(text: string) {
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

export function formatPrismaDateToRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return 'now';
  } else if (minutes < 60) {
    return minutes === 1 ? '1 min ago' : `${minutes} mins ago`;
  } else if (hours < 24) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (days < 30) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  } else if (months < 12) {
    return months === 1 ? '1 month ago' : `${months} months ago`;
  } else {
    return years === 1 ? '1 year ago' : `${years} years ago`;
  }
}