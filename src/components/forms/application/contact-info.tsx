"use client";

import { useUser } from "@clerk/nextjs";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactDetailsSchema } from "@/lib/schemas";
import type { ContactDetailsValues } from "@/lib/types";

interface ContactInfoProps {
  onNextAction: () => void;
}

export default function ContactInfo({ onNextAction }: ContactInfoProps) {
  const form = useForm<ContactDetailsValues>({
    resolver: zodResolver(contactDetailsSchema),
    defaultValues: {
      applicantEmail: "",
      guardianEmail: "",
      applicantPhone: "",
      guardianPhone: "",
      applicantAadhar: "",
    },
  });

  const onSubmit = (data: ContactDetailsValues) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("contactInfo", JSON.stringify(data));
    }
    onNextAction();
  };
  
  const { user } = useUser();
  
  if (!user) {
    return null;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormItem>
            <FormLabel>Applicant Email</FormLabel>
            <FormControl>
              <Input type="email" value={user.primaryEmailAddress?.emailAddress} disabled={true} />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormField
            control={form.control}
            name="guardianEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guardian Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="applicantPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Applicant Phone</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guardianPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guardian Phone</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="applicantAadhar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Applicant Aadhar</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">
            Submit <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
