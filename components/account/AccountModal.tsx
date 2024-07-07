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

const AccountModal = () => {
  const [signUpForm, setSignUpForm] = useState<boolean>(false);

  return (
    <>
      <Dialog>
        <DialogTrigger className="text-white font-semibold hover:text-gray-300 duration-75">
          Account
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
