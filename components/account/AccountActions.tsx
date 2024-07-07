"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface AccountActionsProps {
    user: User;
}

const AccountActions = ({user}: AccountActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true} className="cursor-pointer">
        <Image src={user.image!} width={40} height={40} className="rounded-full" quality={100} priority alt="profile image"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={()=>signOut()} className="cursor-pointer text-red-500 font-semibold">
            Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountActions;
