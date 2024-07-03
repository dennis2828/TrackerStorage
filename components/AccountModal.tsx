"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateAccountSchema, CreateAccountType, SignInSchema, SignInType } from "@/validators";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/actions/user.actions";
import toast from "react-hot-toast";
import { CreateAccountResponse } from "@/actions/user.actions";
import { signIn } from "next-auth/react"
import { useState } from "react";

const AccountModal = () => {

  const [signUpForm, setSignUpForm] = useState<boolean>(false);
  
  //sign-up

  const createAccountform = useForm<CreateAccountType>({
    resolver: zodResolver(CreateAccountSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutate: registerAccount, isPending } = useMutation<
    CreateAccountResponse,
    Error,
    CreateAccountType
  >({
    mutationFn: async (values: CreateAccountType) => {
      return await createAccount(values);
    },
    onSuccess: (data) => {
      if (data.ok) {
        toast.success(data.message || "Account was successfully created!");
        createAccountform.reset();
      } else {
        toast.error(
          data.message || "Something went wrong. Please try again later!"
        );
      }
    },
    onError: (error) => {
      toast.error(
        error.message || "Something went wrong. Please try again later!"
      );
    },
  });

  //sign-in
  const signInform = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      signin_email: "",
      signin_password: "",
    },
  });

  return (
    <>
    {
      signUpForm ? (
        <Dialog>
        <DialogTrigger className="text-white font-semibold hover:text-gray-300 duration-75">
          Account
        </DialogTrigger>
        <DialogContent className="bg-gray-200">
          <DialogHeader>
            <DialogTitle className="text-center">Create an account</DialogTitle>
          </DialogHeader>
          
        </DialogContent>
      </Dialog>
      ) : (
        <Dialog>
        <DialogTrigger className="text-white font-semibold hover:text-gray-300 duration-75">
          Account
        </DialogTrigger>
        <DialogContent className="bg-gray-200">
          <DialogHeader>
            <DialogTitle className="text-center">Sign In</DialogTitle>
          </DialogHeader>
  
          <Form {...signInform}>
            {/* @ts-ignore */}
            <form onSubmit={signInform.handleSubmit(async ()=>{
              const data = await signIn("credentials", {...signInform.getValues(), redirect:false});
              console.log(data);
              
            })} className="space-y-8">
              <FormField
                control={signInform.control}
                name="signin_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter an email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signInform.control}
                name="signin_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter a password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button isLoading={isPending} type="submit" className="w-full">
                Sign In
              </Button>
              <p onClick={()=>setSignUpForm(true)} className="text-sm w-fit font-semibold relative after:absolute after:content-[''] after:left-[50%] after:right-[50%] after:-translate-x-1/2 after:-bottom-1 after:w-0 after:duration-100 after:hover:w-full after:h-[1px] after:bg-darkCyan cursor-pointer">Don&apos;t have an account ?</p>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      )
    }
    </>
  );
};

export default AccountModal;
