"use client";

import React from "react";
import { cn } from "@/lib";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorMessage, Field } from "formik";
import { Input, Label } from "@/components/ui";


const LocationContact = (props: any) => {
  const { step, setFieldValue, setFieldTouched, values, errors, touched } =
    props;

  return (
    <AnimatePresence mode={"popLayout"}>
      {step === 2 || step === 6 ? (
        <motion.section
          initial={{ x: step === 2 || step === 6 ? "100%" : 0 }}
          animate={{ x: step === 2 || step === 6 ? 0 : "-100%" }}
          exit={{ x: "-100%" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className={cn(
            "grid-cols-1 gap-y-5 px-2.5 w-full transition-opacity will-change-auto transform-gpu",
            step === 2 || step === 6 ? "grid opacity-100" : "opacity-0 hidden"
          )}
        >
          <motion.div className="w-full px-5">
            <h6 className="font-dm-serif text-primary/85 text-lg">
              Where Can Diners Find You?
            </h6>

            <p className={cn("font-dm-sans text-sm", step === 6 && "hidden")}>
              Help diners locate and connect with you easily.
            </p>

            <div className="grid grid-cols-12 gap-5 w-full my-5">
              <div className="col-span-12 lg:col-span-6 flex flex-col items-start gap-y-0.5 transition-all duration-300 will-change-auto">
                <Label
                  htmlFor="locationContact.address"
                  className="text-sm text-primary/90"
                >
                  What&apos;s your restaurant&apos;s address?
                </Label>

                <Field
                  as={Input}
                  type="text"
                  name="locationContact.address"
                  id="locationContact.address"
                  readOnly={step === 6}
                  onBlur={() =>
                    setFieldTouched("locationContact.address", true, true)
                  }
                  className={cn(
                    "w-full h-10 rounded-full font-dm-sans text-cta text-primary/90 text-left placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                    errors.locationContact?.address &&
                      touched.locationContact?.address &&
                      "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                  )}
                />

                <ErrorMessage
                  name="locationContact.address"
                  component={motion.div}
                  className={cn(
                    "text-destructive text-sm font-dm-sans transition-all duration-200 will-change-auto",
                    errors.locationContact?.address
                      ? "animate-in slide-in-from-top-2 zoom-in-95"
                      : "animate-out slide-out-to-top-2 zoom-out-95"
                  )}
                />
              </div>

              <div className="col-span-12 lg:col-span-6 flex flex-col items-start gap-y-0.5 transition-all duration-300 will-change-auto">
                <Label
                  htmlFor="locationContact.city"
                  className="text-sm text-primary/90"
                >
                  Which city is your restaurant located in?
                </Label>

                <Field
                  as={Input}
                  type="text"
                  name="locationContact.city"
                  id="locationContact.city"
                  readOnly={step === 6}
                  onBlur={() =>
                    setFieldTouched("locationContact.city", true, true)
                  }
                  className={cn(
                    "w-full h-10 rounded-full font-dm-sans text-cta text-primary/90 text-left placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                    errors.locationContact?.city &&
                      touched.locationContact?.city &&
                      "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                  )}
                />

                <ErrorMessage
                  name="locationContact.city"
                  component={motion.div}
                  className={cn(
                    "text-destructive text-sm font-dm-sans transition-all duration-200 will-change-auto",
                    errors.locationContact?.city
                      ? "animate-in slide-in-from-top-2 zoom-in-95"
                      : "animate-out slide-out-to-top-2 zoom-out-95"
                  )}
                />
              </div>

              <div className="col-span-12 lg:col-span-6 flex flex-col items-start gap-y-0.5 transition-all duration-300 will-change-auto">
                <Label
                  htmlFor="locationContact.postalCode"
                  className="text-sm text-primary/90"
                >
                  What&apos;s your postal code?
                </Label>

                <Field
                  as={Input}
                  type="text"
                  name="locationContact.postalCode"
                  id="locationContact.postalCode"
                  readOnly={step === 6}
                  onBlur={() =>
                    setFieldTouched("locationContact.postalCode", true, true)
                  }
                  className={cn(
                    "w-full h-10 rounded-full font-dm-sans text-cta text-primary/90 text-left placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                    errors.locationContact?.postalCode &&
                      touched.locationContact?.postalCode &&
                      "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                  )}
                />

                <ErrorMessage
                  name="locationContact.postalCode"
                  component={motion.div}
                  className={cn(
                    "text-destructive text-sm font-dm-sans transition-all duration-200 will-change-auto",
                    errors.locationContact?.postalCode
                      ? "animate-in slide-in-from-top-2 zoom-in-95"
                      : "animate-out slide-out-to-top-2 zoom-out-95"
                  )}
                />
              </div>

              <div className="col-span-12 lg:col-span-6 flex flex-col items-start gap-y-0.5 transition-all duration-300 will-change-auto">
                <Label
                  htmlFor="locationContact.phoneNumber"
                  className="text-sm text-primary/90"
                >
                  What&apos;s the best phone number to reach you?
                </Label>

                <Field
                  as={Input}
                  type="tel"
                  name="locationContact.phoneNumber"
                  id="locationContact.phoneNumber"
                  readOnly={step === 6}
                  onBlur={() =>
                    setFieldTouched("locationContact.phoneNumber", true, true)
                  }
                  className={cn(
                    "w-full h-10 rounded-full font-dm-sans text-cta text-primary/90 text-left placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                    errors.locationContact?.phoneNumber &&
                      touched.locationContact?.phoneNumber &&
                      "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                  )}
                />

                <ErrorMessage
                  name="locationContact.phoneNumber"
                  component={motion.div}
                  className={cn(
                    "text-destructive text-sm font-dm-sans transition-all duration-200 will-change-auto",
                    errors.locationContact?.phoneNumber
                      ? "animate-in slide-in-from-top-2 zoom-in-95"
                      : "animate-out slide-out-to-top-2 zoom-out-95"
                  )}
                />
              </div>

              <div className="col-span-12 lg:col-span-6 flex flex-col items-start gap-y-0.5 transition-all duration-300 will-change-auto">
                <Label
                  htmlFor="locationContact.website"
                  className="text-sm text-primary/90"
                >
                  Do you have a website? Share the link! (Optional)
                </Label>

                <Field
                  as={Input}
                  type="text"
                  name="locationContact.website"
                  id="locationContact.website"
                  readOnly={step === 6}
                  className={cn(
                    "w-full h-10 rounded-full font-dm-sans text-cta text-primary/90 text-left placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                    errors.locationContact?.website &&
                      touched.locationContact?.website &&
                      "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                  )}
                />
              </div>
            </div>
          </motion.div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
};

LocationContact.displayName = "LocationContact";
export { LocationContact };
