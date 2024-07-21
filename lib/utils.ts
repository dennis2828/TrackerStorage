import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { Metadata } from "next"

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

export function constructMetadata({
  title = "Tracker Storage",
  description = "TrackerStorage is a powerful tool for developers to store and track various types of data or events within their applications. Whether you need to capture errors, debug information, or other critical events, TrackerStorage provides a simple and efficient way to handle and display this data on a dedicated dashboard.",
  image = "https://res.cloudinary.com/dulb5sobi/image/upload/v1721584593/je4bobjyi8h9ciwsts0g.png",
  icons = "https://res.cloudinary.com/dulb5sobi/image/upload/v1721584593/je4bobjyi8h9ciwsts0g.png",
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean,
  keywords?: string[],
} = {}): Metadata {
  return {
    title,
    keywords:["tracker storage","web logs","track data", "track chunks"],
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ]
    },
    icons,
    metadataBase: new URL('https://tracker-storage.vercel.app/'),
    themeColor: '#2B193D"',
    ...(noIndex && {
      robots: {
        index: true,
        follow: true
      }
    })
  }
}