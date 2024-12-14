"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createApplication } from "@/lib/actions/application.actions";

import { finalVerificationSchema } from "@/lib/schemas";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import type {
  PersonalInfoValues,
  ContactInfoValues,
  ResidentialInfoValues,
  OtherInfoValues,
  FinalVerificationValues,
} from "@/lib/types";

interface FinalVerificationProps {
  onNextAction: () => void;
}

export default function FinalVerificationForm({
  onNextAction,
}: FinalVerificationProps) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoValues>();
  const [contactInfo, setContactInfo] = useState<ContactInfoValues>();
  const [residentialInfo, setResidentialInfo] =
    useState<ResidentialInfoValues>();
  const [otherInfo, setOtherInfo] = useState<OtherInfoValues>();

  const { user } = useUser();

  const form = useForm<
    PersonalInfoValues &
      ContactInfoValues &
      ResidentialInfoValues &
      OtherInfoValues
  >({
    resolver: zodResolver(finalVerificationSchema),
    defaultValues: {},
  });

  const { reset } = form;

  useEffect(() => {
    const personalData = JSON.parse(
      localStorage.getItem("peronsalInfo") ?? "{}",
    ) as PersonalInfoValues;
    const contactData = JSON.parse(
      localStorage.getItem("contactInfo") ?? "{}",
    ) as ContactInfoValues;
    const residentialData = JSON.parse(
      localStorage.getItem("residentialInfo") ?? "{}",
    ) as ResidentialInfoValues;
    const otherData = JSON.parse(
      localStorage.getItem("otherInfo") ?? "{}",
    ) as OtherInfoValues;

    setPersonalInfo(personalData);
    setContactInfo(contactData);
    setResidentialInfo(residentialData);
    setOtherInfo(otherData);

    reset({
      guardianFirstName: personalData.guardianFirstName ?? "",
      guardianLastName: personalData.guardianLastName ?? "",
      dateOfBirth: personalData.dateOfBirth ?? "",
      gender: personalData.gender ?? "",
      guardianEmail: contactData.guardianEmail ?? "",
      applicantPhone: contactData.applicantPhone ?? "",
      guardianPhone: contactData.guardianPhone ?? "",
      applicantAadhar: contactData.applicantAadhar ?? "",
      pincode: residentialData.pincode ?? "",
      country: residentialData.country ?? "",
      nationality: residentialData.nationality ?? "",
      state: residentialData.state ?? "",
      city: residentialData.city ?? "",
      district: residentialData.district ?? "",
      region: residentialData.region ?? "",
      address: residentialData.address ?? "",
      religion: otherData.religion ?? "",
      category: otherData.category ?? "",
      bloodGroup: otherData.bloodGroup ?? "",
      isPWD: otherData.isPWD ?? "",
    });
  }, [reset]);

  if (
    !user ||
    !personalInfo ||
    !contactInfo ||
    !residentialInfo ||
    !otherInfo
  ) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data: FinalVerificationValues) => {
    try {
      const newApplication = await createApplication(data);
      
      if (newApplication) {
        onNextAction();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="space-y-4 rounded-lg bg-muted/70 p-4">
          <div className="grid grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>Applicant First Name</FormLabel>
              <FormControl>
                <Input type="text" value={user.firstName!} disabled={true} />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Applicant Last Name</FormLabel>
              <FormControl>
                <Input type="text" value={user.lastName!} disabled={true} />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="guardianFirstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guardian First Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      // defaultValue={personalInfo.guardianFirstName}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="guardianLastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guardian Last Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      // defaultValue={personalInfo.guardianLastName}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      // defaultValue={personalInfo.dateOfBirth}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <section className="space-y-4 rounded-lg bg-muted/70 p-4">
          <div className="grid grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>Applicant Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  value={user.primaryEmailAddress?.emailAddress}
                  disabled={true}
                />
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
                    <Input
                      type="email"
                      // defaultValue={contactInfo.guardianEmail}
                      {...field}
                    />
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
                    <Input
                      type="tel"
                      // defaultValue={contactInfo.applicantPhone}
                      {...field}
                    />
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
                    <Input
                      type="tel"
                      // defaultValue={contactInfo.guardianPhone}
                      {...field}
                    />
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
                <FormLabel>Applicant Aadhar Number</FormLabel>
                <FormControl>
                  <Input
                    // defaultValue={contactInfo.applicantAadhar}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="space-y-4 rounded-lg bg-muted/70 p-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      // defaultValue={residentialInfo.pincode}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      // defaultValue={residentialInfo.country}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      // defaultValue={residentialInfo.nationality}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      // defaultValue={residentialInfo.state}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      // defaultValue={residentialInfo.city}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      // defaultValue={residentialInfo.district}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="urban">Urban</SelectItem>
                    <SelectItem value="rural">Rural</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea
                    // defaultValue={residentialInfo.address}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="space-y-4 rounded-lg bg-muted/70 p-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="religion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Religion</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select religion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sikh">Sikh</SelectItem>
                      <SelectItem value="hindu">Hindu</SelectItem>
                      <SelectItem value="christian">Christian</SelectItem>
                      <SelectItem value="muslim">Muslim</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="obc">
                        Other Backward Classes (OBC)
                      </SelectItem>
                      <SelectItem value="sc">Scheduled Caste (SC)</SelectItem>
                      <SelectItem value="st">Scheduled Tribe (ST)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="bloodGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Group</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="a+">A+</SelectItem>
                      <SelectItem value="a-">A-</SelectItem>
                      <SelectItem value="b+">B+</SelectItem>
                      <SelectItem value="b-">B-</SelectItem>
                      <SelectItem value="o+">O+</SelectItem>
                      <SelectItem value="o-">O-</SelectItem>
                      <SelectItem value="ab+">AB+</SelectItem>
                      <SelectItem value="ab-">AB-</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPWD"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is PWD (Personal With Disabilities)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <div className="flex justify-end">
          <Button type="submit">
            Submit <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
