"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import LoginProviders from "../LoginProviders";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignInType } from "@/validators";
import { signIn } from "next-auth/react";

interface SignInProps {
  setSignUpForm: Dispatch<SetStateAction<boolean>>;
}

const SignIn = ({ setSignUpForm }: SignInProps) => {
  const [signInErrorMessage, setSignInErrorMessage] = useState<string>("");
  const [signInLoading, setSignInLoading] = useState<boolean>(false);

  const signInform = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      signin_email: "",
      signin_password: "",
    },
  });

  useEffect(() => {
    if (signInErrorMessage && signInErrorMessage.trim() !== "")
      setTimeout(() => setSignInErrorMessage(""), 2000);
  }, [signInErrorMessage]);

  return (
    <Form {...signInform}>
      {/* @ts-ignore */}
      <form
        onSubmit={signInform.handleSubmit(async () => {
          setSignInLoading(true);
          const data = await signIn("credentials", {
            ...signInform.getValues(),
            redirect: false,
            callbackUrl:"/dashboard"
          });
          setSignInLoading(false);
          console.log(data);
          if (data?.error && data.error.trim() !== "")
            setSignInErrorMessage("Email or password is incorrect!");
          else window.location.reload();
        })}
        className="space-y-8"
      >
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
                <Input
                  type="password"
                  placeholder="Enter a password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={signInLoading} type="submit" className="w-full">
          Sign In
        </Button>
        <LoginProviders />
        {signInErrorMessage && signInErrorMessage.trim() !== "" && (
          <p className="text-sm font-semibold text-red-500">
            {signInErrorMessage}
          </p>
        )}
        <p
          onClick={() => setSignUpForm(true)}
          className="text-sm w-fit font-semibold relative after:absolute after:content-[''] after:left-[50%] after:right-[50%] after:-translate-x-1/2 after:-bottom-1 after:w-0 after:duration-100 after:hover:w-full after:h-[1px] after:bg-darkCyan cursor-pointer"
        >
          Don&apos;t have an account ?
        </p>
      </form>
    </Form>
  );
};

export default SignIn;
