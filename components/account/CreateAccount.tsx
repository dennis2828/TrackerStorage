"use client"

import { useMutation } from "@tanstack/react-query"
import LoginProviders from "../LoginProviders"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { createAccount, CreateAccountResponse } from "@/actions/user.actions"
import { CreateAccountSchema, CreateAccountType } from "@/validators"
import toast from "react-hot-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dispatch, SetStateAction } from "react"
import { signIn } from "next-auth/react"

interface CreateAccountProps {
  setSignUpForm: Dispatch<SetStateAction<boolean>>;
}

const CreateAccount = ({setSignUpForm}: CreateAccountProps) => {

    const { mutate: registerAccount, isPending } = useMutation<
    CreateAccountResponse,
    Error,
    CreateAccountType
  >({
    mutationFn: async (values: CreateAccountType) => {
      return await createAccount(values);
    },
    onSuccess: (data, values) => {
      if (data.ok) {
        toast.success(data.message || "Account was successfully created!");
        createAccountForm.reset();
        signIn("credentials", {signin_email: values.email, signin_password: values.password});
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


  const createAccountForm = useForm<CreateAccountType>({
    resolver: zodResolver(CreateAccountSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  return (
    
        <Form {...createAccountForm}>
          {/* @ts-ignore */}
          <form onSubmit={createAccountForm.handleSubmit(registerAccount)} className="space-y-8">
            <FormField
              control={createAccountForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter an username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createAccountForm.control}
              name="email"
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
              control={createAccountForm.control}
              name="password"
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
              Submit
            </Button>
            <LoginProviders />
            <p onClick={()=>setSignUpForm(false)} className="text-sm w-fit font-semibold relative after:absolute after:content-[''] after:left-[50%] after:right-[50%] after:-translate-x-1/2 after:-bottom-1 after:w-0 after:duration-100 after:hover:w-full after:h-[1px] after:bg-darkCyan cursor-pointer">Already have an account ?</p>
          </form>
        </Form>
  )
}

export default CreateAccount