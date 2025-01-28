"use client";

import { ErrorMessage, Field } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Input, Label, Slider } from "@/components/ui";
import { cn } from "@/lib";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

import debounce from "lodash/debounce";

const DiningDetails = (props: any) => {
  const { step, setFieldValue, setFieldTouched, values, errors, touched } =
    props;

  return (
    <AnimatePresence mode={"popLayout"}>
      {step === 3 || step === 6 ? (
        <motion.section
          initial={{ x: step === 3 || step === 6 ? "100%" : 0 }}
          animate={{ x: step === 3 || step === 6 ? 0 : "-100%" }}
          exit={{ x: "-100%" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className={cn(
            "grid-cols-1 gap-y-5 px-2.5 w-full transition-opacity will-change-auto transform-gpu",
            step === 3 || step === 6 ? "grid opacity-100" : "opacity-0 hidden"
          )}
        >
          <motion.div className="w-full px-5">
            <h6 className="font-dm-serif text-primary/85 text-lg">
              Tell Us About Your Dining Experience
            </h6>

            <p className={cn("font-dm-sans text-sm", step === 6 && "hidden")}>
              Help diners know what to expect when they visit.
            </p>

            <div className="grid grid-cols-12 gap-5 w-full my-5">
              <div className="col-span-12 flex flex-col items-start gap-y-0.5 transition-all duration-300 will-change-auto">
                <Label
                  htmlFor="diningDetails.schedule"
                  className="text-sm text-primary/90"
                >
                  When are you open?
                </Label>

                <div className="w-full grid grid-cols-1 my-2.5">
                  <Label
                    htmlFor="diningDetails.schedule.weekdays"
                    className="text-base text-primary/90 font-dm-serif tracking-wider font-bold"
                  >
                    Weekdays:
                  </Label>

                  <div
                    id="diningDetails.schedule.weekdays"
                    className="w-full flex flex-col lg:flex-row lg:items-center lg:!justify-between gap-5"
                  >
                    <div className="flex flex-col items-start lg:flex-row lg:items-center gap-5">
                      <Label
                        htmlFor="diningDetails.schedule.weekdays_opening"
                        className="text-sm text-primary/90 self-center"
                      >
                        Opening Time:
                      </Label>

                      <div className="flex items-center gap-x-2.5">
                        <Field
                          as={Input}
                          type="number"
                          min={0}
                          max={23}
                          readOnly={step === 6}
                          maxLength={2}
                          placeholder="HH"
                          name="diningDetails.schedule.weekdays_opening_hours"
                          id="diningDetails.schedule.weekdays_opening_hours"
                          defaultValue={
                            values.diningDetails.schedule
                              ?.weekdays_opening_hours
                          }
                          onBlur={() =>
                            setFieldTouched(
                              "diningDetails.schedule.weekdays_opening_hours",
                              true,
                              true
                            )
                          }
                          className={cn(
                            "w-16 md:w-20 2xl:w-24 h-10 rounded-full font-dm-sans text-cta text-primary/90 text-center placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                            errors.diningDetails?.schedule
                              ?.weekdays_opening_hours &&
                              touched.diningDetails?.schedule
                                ?.weekdays_opening_hours &&
                              "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                          )}
                        />

                        <Field
                          as={Input}
                          type="number"
                          max={59}
                          maxLength={2}
                          placeholder="MM"
                          readOnly={step === 6}
                          name="diningDetails.schedule.weekdays_opening_mins"
                          id="diningDetails.schedule.weekdays_opening_mins"
                          defaultValue={
                            values.diningDetails.schedule?.weekdays_opening_mins
                          }
                          onBlur={() =>
                            setFieldTouched(
                              "diningDetails.schedule.weekdays_opening_mins",
                              true,
                              true
                            )
                          }
                          className={cn(
                            "w-16 md:w-20 2xl:w-24 h-10 rounded-full font-dm-sans text-cta text-primary/90 text-center placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                            errors.diningDetails?.schedule
                              ?.weekdays_opening_mins &&
                              touched.diningDetails?.schedule
                                ?.weekdays_opening_mins &&
                              "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-start lg:flex-row lg:items-center gap-5">
                      <Label
                        htmlFor="diningDetails.schedule.weekdays_closing"
                        className="text-sm text-primary/90 self-center"
                      >
                        Closing Time:
                      </Label>

                      <div
                        id="diningDetails.schedule.weekdays_closing"
                        className="flex items-center gap-x-2.5"
                      >
                        <Field
                          as={Input}
                          type="number"
                          min={0}
                          max={23}
                          maxLength={2}
                          placeholder="HH"
                          readOnly={step === 6}
                          defaultValue={
                            values.diningDetails.schedule
                              ?.weekdays_closing_hours
                          }
                          name="diningDetails.schedule.weekdays_closing_hours"
                          id="diningDetails.schedule.weekdays_closing_hours"
                          onBlur={() =>
                            setFieldTouched(
                              "diningDetails.schedule.weekdays_closing_hours",
                              true,
                              true
                            )
                          }
                          className={cn(
                            "w-16 md:w-20 2xl:w-24 h-10 rounded-full font-dm-sans text-cta text-primary/90 text-center placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                            errors.diningDetails?.schedule
                              ?.weekdays_closing_hours &&
                              touched.diningDetails?.schedule
                                ?.weekdays_closing_hours &&
                              "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                          )}
                        />

                        <Field
                          as={Input}
                          type="number"
                          max={59}
                          maxLength={2}
                          placeholder="MM"
                          readOnly={step === 6}
                          defaultValue={
                            values.diningDetails.schedule?.weekdays_closing_mins
                          }
                          name="diningDetails.schedule.weekdays_closing_mins"
                          id="diningDetails.schedule.weekdays_closing_mins"
                          onBlur={() =>
                            setFieldTouched(
                              "diningDetails.schedule.weekdays_closing_mins",
                              true,
                              true
                            )
                          }
                          className={cn(
                            "w-16 md:w-20 2xl:w-24 h-10 rounded-full font-dm-sans text-cta text-primary/90 text-center placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                            errors.diningDetails?.schedule
                              ?.weekdays_closing_mins &&
                              touched.diningDetails?.schedule
                                ?.weekdays_closing_mins &&
                              "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full grid grid-cols-1">
                  <Label
                    htmlFor="diningDetails.schedule.weekends"
                    className="text-base text-primary/90 font-dm-serif tracking-wider font-bold"
                  >
                    Weekends:
                  </Label>

                  <div
                    id="diningDetails.schedule.weekends"
                    className="w-full flex flex-col lg:flex-row lg:items-center lg:!justify-between gap-5"
                  >
                    <div className="flex flex-col items-start lg:flex-row lg:items-center gap-5">
                      <Label
                        htmlFor="diningDetails.schedule.weekends_opening"
                        className="text-sm text-primary/90 self-center"
                      >
                        Opening Time:
                      </Label>

                      <div
                        id="diningDetails.schedule.weekends_opening"
                        className="flex items-center gap-x-2.5"
                      >
                        <Field
                          as={Input}
                          type="number"
                          min={0}
                          max={23}
                          maxLength={2}
                          readOnly={step === 6}
                          placeholder="HH"
                          defaultValue={
                            values.diningDetails.schedule
                              ?.weekends_opening_hours
                          }
                          name="diningDetails.schedule.weekends_opening_hours"
                          id="diningDetails.schedule.weekends_opening_hours"
                          onBlur={() =>
                            setFieldTouched(
                              "diningDetails.schedule.weekends_opening_hours",
                              true,
                              true
                            )
                          }
                          className={cn(
                            "w-16 md:w-20 2xl:w-24 h-10 rounded-full font-dm-sans text-cta text-primary/90 text-center placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                            errors.diningDetails?.schedule
                              ?.weekends_opening_hours &&
                              touched.diningDetails?.schedule
                                ?.weekends_opening_hours &&
                              "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                          )}
                        />

                        <Field
                          as={Input}
                          type="number"
                          max={59}
                          min={0}
                          maxLength={2}
                          placeholder="MM"
                          readOnly={step === 6}
                          name="diningDetails.schedule.weekends_opening_mins"
                          id="diningDetails.schedule.weekends_opening_mins"
                          defaultValue={
                            values.diningDetails.schedule?.weekends_opening_mins
                          }
                          onBlur={() =>
                            setFieldTouched(
                              "diningDetails.schedule.weekends_opening_mins",
                              true,
                              true
                            )
                          }
                          className={cn(
                            "w-16 md:w-20 2xl:w-24 h-10 rounded-full font-dm-sans text-cta text-primary/90 text-center placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                            errors.diningDetails?.schedule
                              ?.weekends_opening_mins &&
                              touched.diningDetails?.schedule
                                ?.weekends_opening_mins &&
                              "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-start lg:flex-row lg:items-center gap-5">
                      <Label
                        htmlFor="diningDetails.schedule.weekends_closing"
                        className="text-sm text-primary/90 self-center"
                      >
                        Closing Time:
                      </Label>

                      <div
                        id="diningDetails.schedule.weekends_closing"
                        className="flex items-center gap-x-2.5"
                      >
                        <Field
                          as={Input}
                          type="number"
                          min={0}
                          max={23}
                          maxLength={2}
                          placeholder="HH"
                          readOnly={step === 6}
                          name="diningDetails.schedule.weekends_closing_hours"
                          id="diningDetails.schedule.weekends_closing_hours"
                          defaultValue={
                            values.diningDetails.schedule
                              ?.weekends_closing_hours
                          }
                          onBlur={() =>
                            setFieldTouched(
                              "diningDetails.schedule.weekends_closing_hours",
                              true,
                              true
                            )
                          }
                          className={cn(
                            "w-16 md:w-20 2xl:w-24 h-10 rounded-full font-dm-sans text-cta text-primary/90 text-center placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                            errors.diningDetails?.schedule
                              ?.weekends_closing_hours &&
                              touched.diningDetails?.schedule
                                ?.weekends_closing_hours &&
                              "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                          )}
                        />

                        <Field
                          as={Input}
                          type="number"
                          max={59}
                          maxLength={2}
                          placeholder="MM"
                          readOnly={step === 6}
                          name="diningDetails.schedule.weekends_closing_mins"
                          id="diningDetails.schedule.weekends_closing_mins"
                          defaultValue={
                            values.diningDetails.schedule?.weekends_closing_mins
                          }
                          onBlur={() =>
                            setFieldTouched(
                              "diningDetails.schedule.weekends_closing_mins",
                              true,
                              true
                            )
                          }
                          className={cn(
                            "w-16 md:w-20 2xl:w-24 h-10 rounded-full font-dm-sans text-cta text-primary/90 text-center placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                            errors.diningDetails?.schedule
                              ?.weekends_closing_mins &&
                              touched.diningDetails?.schedule
                                ?.weekends_closing_mins &&
                              "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-6 flex flex-col items-start gap-y-0.5 transition-all duration-300 will-change-auto">
                <Label
                  htmlFor="diningDetails.priceAverage"
                  className="text-sm text-primary/90"
                >
                  How much does the average customer spend per visit?
                </Label>

                <Field
                  as={Input}
                  type="number"
                  name="diningDetails.priceAverage"
                  id="diningDetails.priceAverage"
                  readOnly={step === 6}
                  defaultValue={values.diningDetails?.priceAverage}
                  onBlur={() =>
                    setFieldTouched("diningDetails.priceAverage", true, true)
                  }
                  className={cn(
                    "w-full h-10 rounded-full font-dm-sans text-cta text-primary/90 text-left placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                    errors.diningDetails?.priceAverage &&
                      touched.diningDetails?.priceAverage &&
                      "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                  )}
                />

                <ErrorMessage
                  name="diningDetails.priceAverage"
                  component={motion.div}
                  className={cn(
                    "text-destructive text-sm font-dm-sans transition-all duration-200 will-change-auto",
                    errors.diningDetails?.priceAverage
                      ? "animate-in slide-in-from-top-2 zoom-in-95"
                      : "animate-out slide-out-to-top-2 zoom-out-95"
                  )}
                />
              </div>

              <div className="col-span-12 lg:col-span-6 flex flex-col items-start gap-y-0.5 transition-all duration-300 will-change-auto">
                <Label
                  htmlFor="diningDetails.vibe"
                  className="text-sm text-primary/90"
                >
                  What&apos;s the vibe of your restaurant?
                </Label>

                <Select
                  disabled={step === 6}
                  onValueChange={(value) => {
                    setFieldValue("diningDetails.vibe", value);
                  }}
                  onOpenChange={() => {
                    debounce(() => {
                      setFieldTouched(
                        "diningDetails.vibe",
                        true,
                        true
                      );
                    }, 1000)();
                  }}
                  defaultValue={values.diningDetails.vibe}
                >
                  <SelectTrigger
                    className={cn(
                      "w-full h-10 rounded-full border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                      errors.diningDetails?.vibe &&
                        touched.diningDetails?.vibe &&
                        "!border-destructive/50 hover:border-destructive/50 focus:border-destructive/50",
                      step === 6 && "!pointer-events-none"
                    )}
                  >
                    <SelectValue
                      placeholder="Select vibe"
                      className="font-dm-sans text-cta text-primary/90 text-left placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-none ring-0 focus-visible:ring-0 focus:outline-none"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-muted border-none shadow-[0_0_0_1px] shadow-primary/25 rounded-xl max-h-56 overflow-y-auto flex flex-col">
                    <SelectGroup className="!px-0.5 w-full">
                      <SelectLabel className="font-dm-serif tracking-wider">
                        Vibes
                      </SelectLabel>
                      <SelectItem
                        className="!text-primary/90 hover:!bg-primary/15 active:!bg-accent"
                        value="casual"
                      >
                        Casual
                      </SelectItem>
                      <SelectItem
                        className="!text-primary/90 hover:!bg-primary/15 active:!bg-accent"
                        value="fine dining"
                      >
                        Fine Dining
                      </SelectItem>
                      <SelectItem
                        className="!text-primary/90 hover:!bg-primary/15 active:!bg-accent"
                        value="café"
                      >
                        Café
                      </SelectItem>
                      <SelectItem
                        className="!text-primary/90 hover:!bg-primary/15 active:!bg-accent"
                        value="fast food"
                      >
                        Fast Food
                      </SelectItem>
                      <SelectItem
                        className="!text-primary/90 hover:!bg-primary/15 active:!bg-accent"
                        value="bistro"
                      >
                        Bistro
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <ErrorMessage
                  name="diningDetails.vibe"
                  component={motion.div}
                  className={cn(
                    "text-destructive text-sm font-dm-sans transition-all duration-200 will-change-auto",
                    errors.diningDetails?.vibe
                      ? "animate-in slide-in-from-top-2 zoom-in-95"
                      : "animate-out slide-out-to-top-2 zoom-out-95"
                  )}
                />
              </div>

              <div className="col-span-12 lg:col-span-6 flex flex-col items-start gap-y-0.5 transition-all duration-300 will-change-auto">
                <Label
                  htmlFor="diningDetails.guestCapacity"
                  className="text-sm text-primary/90"
                >
                  How many guests can you accommodate?
                </Label>

                <div className="flex items-center relative pl-9 min-h-12 w-full">
                  <div className="size-10 grid place-items-center p-px rounded-full absolute left-0 top-1/2 -translate-y-1/2 bg-[#fef6e8] border-none shadow-[0_0_0_1px] shadow-accent z-20">
                    <span className="font-dm-sans font-bold text-[#e09617] mr-0.5 transition-all duration-300">
                      {values.diningDetails.guestCapacity}
                    </span>
                  </div>
                  <Slider
                    onValueChange={(array) => {
                      setFieldValue("diningDetails.guestCapacity", array[0]);
                    }}
                    onBlur={() =>
                      setFieldTouched("diningDetails.guestCapacity", true, true)
                    }
                    defaultValue={[values.diningDetails.guestCapacity]}
                    min={0}
                    max={150}
                    disabled={step === 6}
                    className={cn(step === 6 && "!pointer-events-none")}
                  />
                </div>

                <ErrorMessage
                  name="diningDetails.guestCapacity"
                  component={motion.div}
                  className={cn(
                    "text-destructive text-sm font-dm-sans transition-all duration-200 will-change-auto",
                    errors.diningDetails?.guestCapacity
                      ? "animate-in slide-in-from-top-2 zoom-in-95"
                      : "animate-out slide-out-to-top-2 zoom-out-95"
                  )}
                />
              </div>

              <div className="col-span-12 lg:col-span-6 flex flex-col items-start gap-y-0.5 transition-all duration-300 will-change-auto">
                <Label
                  htmlFor="diningDetails.outdoorSeating"
                  className="text-sm text-primary/90"
                >
                  Do you offer outdoor seating?
                </Label>

                <OutDoorSettingToggle
                  id="diningDetails.outdoorSeating"
                  name="diningDetails.outdoorSeating"
                  errors={errors}
                  touched={touched}
                  readOnly={step === 6}
                  className={cn("mt-0.5", step === 6 && "!pointer-events-none")}
                  checked={values.diningDetails.outdoorSeating}
                  onBlur={() =>
                    setFieldTouched("diningDetails.outdoorSeating", true, true)
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    console.log({ e: e.target.checked });

                    setFieldValue(
                      "diningDetails.outdoorSeating",
                      e.target.checked
                    );
                  }}
                />

                <ErrorMessage
                  name="diningDetails.outdoorSeating"
                  component={motion.div}
                  className={cn(
                    "text-destructive text-sm font-dm-sans transition-all duration-200 will-change-auto",
                    errors.diningDetails?.outdoorSeating
                      ? "animate-in slide-in-from-top-2 zoom-in-95"
                      : "animate-out slide-out-to-top-2 zoom-out-95"
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

const OutDoorSettingToggle = (props: any) => {
  const { checked, onBlur, onChange, className, errors, touched, ...rest } =
    props;

  return (
    <label
      className={cn(
        "relative inline-flex items-center cursor-pointer",
        className
      )}
    >
      <Field
        type="checkbox"
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        className="sr-only peer"
        {...rest}
      />

      <div
        className={`w-12 h-6 bg-muted shadow-[0_0_0_1px] shadow-primary/30 peer-checked:shadow-accent rounded-full peer-focus:ring-1 ring-offset-muted-200 peer-focus:ring-offset-2 peer-focus:ring-accent-300 outline-none focus:outline-none peer-focus:outline-none transition-all duration-200 ease-in-out`}
      ></div>

      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-primary/80 peer-checked:bg-accent rounded-full peer-checked:translate-x-6 transition-all duration-200 ease-in-out transform-gpu`}
      ></div>
    </label>
  );
};

DiningDetails.displayName = "DiningDetails";
export { DiningDetails };
