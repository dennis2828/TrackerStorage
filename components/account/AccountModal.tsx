"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateAccount from "./CreateAccount";
import SignIn from "./SignIn";
import { useState } from "react";
import { useAccountModal } from "@/hooks";

const AccountModal = () => {
  const [signUpForm, setSignUpForm] = useState<boolean>(false);
  const {isOpen, setIsOpen} = useAccountModal();


  return (
    <>
      <Dialog open={isOpen} onOpenChange={open=>setIsOpen(open)}>
        <DialogTrigger className="text-white font-semibold hover:text-gray-300 duration-75">
          Login
        </DialogTrigger>
        <DialogContent className="bg-gray-200">
          <DialogHeader>
            <DialogTitle className="text-center">{signUpForm ? "Create Account":"Sign In"}</DialogTitle>
          </DialogHeader>
          {signUpForm ? (
            <CreateAccount setSignUpForm={setSignUpForm} />
          ) : (
            <SignIn setSignUpForm={setSignUpForm} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountModal;
