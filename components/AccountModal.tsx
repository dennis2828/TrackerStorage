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
import { CreateAccountSchema, CreateAccountType } from "@/validators";
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

const AccountModal = () => {

  const form = useForm<CreateAccountType>({
    resolver: zodResolver(CreateAccountSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const {mutate: registerAccount, isPending} = useMutation({
    mutationFn: async (values: CreateAccountType) =>{
      const res = await createAccount(values);
    }
  })

  return (
    <Dialog>
      <DialogTrigger className="text-white font-semibold hover:text-gray-300 duration-75">
        Account
      </DialogTrigger>
      <DialogContent className="bg-gray-200">
        <DialogHeader>
          <DialogTitle className="text-center">Create an account</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          {/* @ts-ignore */}
          <form onSubmit={form.handleSubmit(registerAccount)} className="space-y-8">
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button isLoading={isPending} type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountModal;
