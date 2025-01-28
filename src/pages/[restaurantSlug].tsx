"use client";

import React from "react";
import {
  BlurFade,
  Input,
  Label,
  ReviewPanel,
  Textarea,
  Toolbar,
} from "@/components/ui";
import { motion } from "framer-motion";
import Image from "next/image";
import { Circle } from "rc-progress";
import {
  IconBackground,
  IconClockPin,
  IconSparkles,
  IconWallet,
} from "@tabler/icons-react";
import { nanoid } from "nanoid";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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
import toString from "lodash/toString";

const validationSchema = Yup.object({
  name: Yup.string(),
  comment: Yup.string().required("Please share your thoughts!"),
  rating: Yup.number()
    .min(1, "Please give a rating between 1 and 5")
    .max(5, "Please give a rating between 1 and 5")
    .required("Rating is required"),
});

const RestaurantPreview = () => {
  return (
    <>
      <Toolbar />

      <motion.header className="w-full relative h-[120vh] 2xl:h-[80vh] -top-24 border-none">
        <Image
          src={"/images/1.png"}
          alt={""}
          width={1000}
          height={1000}
          quality={100}
          priority
          draggable={false}
          className="size-full object-cover object-center"
        />

        <div className="absolute left-1/2 top-[30%] -translate-y-[40%] -translate-x-1/2 flex flex-col items-center">
          <div className="relative size-32 grid grid-cols-1 place-items-center rounded-full bg-muted/55 backdrop-blur-md backdrop-filter border-none shadow-[0_0_0_1px] shadow-primary/20 p-px">
            <Image
              src={"/images/brand-logo.webp"}
              alt={""}
              width={300}
              height={300}
              quality={100}
            />
          </div>

          <p className="bg-gradient-to-b from-transparent via-muted  to-transparent rounded-full px-5 py-2.5 mt-2.5 text-primary font-dm-serif tracking-wide text-lg xl:text-2xl backdrop-filter">
            42 Holborn
          </p>
        </div>
      </motion.header>

      <motion.section className="section relative -top-24 !h-auto">
        <div className="flex flex-col relative w-full">
          <BlurFade delay={0.25} duration={0.8} inView>
            <div className="relative w-full lg:!w-[80%] place-self-end lg:!-translate-y-[344.5px] 2xl:!-translate-y-[353px] transform-gpu transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-4">
                {/* Row 1 */}
                <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-4 h-28 bg-transparent">
                  <div className="bg-transparent"></div>
                  <div className="bg-accent relative flex flex-col items-center justify-center">
                    <div className="relative size-14 rounded-full grid grid-cols-1 overflow-hidden">
                      <Circle
                        percent={45}
                        strokeWidth={15}
                        strokeColor="rgba(81,35,11,0.9)"
                        trailColor="rgba(81,35,11,0.5)"
                      />

                      <p className="text-primary/90 text-xl absolute font-dm-serif font-semibold left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
                        4.5
                      </p>
                    </div>
                    <p className="text-primary/90 font-medium tracking-wide">
                      Inclusivity Score
                    </p>

                    <IconSparkles className="text-primary/90 absolute top-1.5 left-1.5" />
                  </div>
                  <div className="col-span-2 bg-muted-300 p-2 flex flex-col items-center justify-center">
                    <p className="text-3xl text-accent tracking-wider font-dm-serif font-medium">
                    +44 7712 345678
                    </p>
                    <p className="text-base text-primary/90">
                    42 Kingsway, London WC2B 6EY, United Kingdom
                    </p>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 h-48 bg-muted-200 relative">
                  <div className="flex flex-col items-center justify-center px-1">
                    <div className="font-dm-serif text-lg xl:text-xl text-primary/90 tracking-wide text-center font-medium uppercase">
                      Weekday Hours
                    </div>
                    <p className="text-accent font-bold antialiased text-pretty">
                      8:00 AM to 23:59 PM
                    </p>

                    <div className="font-dm-serif text-lg xl:text-xl text-primary/90 tracking-wide text-center font-medium uppercase mt-5">
                      Weekend Hours
                    </div>
                    <p className="text-accent font-bold antialiased text-pretty">
                      10:00 AM to 23:59 PM
                    </p>

                    <IconClockPin className="stroke-accent absolute top-1.5 left-1.5 !-rotate-12" />
                  </div>

                  <div className="relative overflow-hidden">
                    <Image
                      src={"/images/3.png"}
                      alt={""}
                      width={500}
                      height={500}
                      quality={100}
                      objectFit={"cover"}
                      draggable={false}
                      className="size-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 h-48 bg-muted-200">
                  <div className="flex flex-col items-center justify-center px-1">
                    <div className="font-dm-serif text-lg xl:text-xl text-primary/90 tracking-wide text-center font-medium uppercase mb-2.5">
                      Seating Capacity
                    </div>
                    <p className="text-center flex items-center text-cta text-pretty text-primary/80">
                      <span className="text-inherit">
                        Accommodates up to{" "}
                        <span className="bg-muted size-6 inline-block rounded-full font-dm-serif font-medium">
                          42
                        </span>{" "}
                        guests at a time.
                      </span>
                    </p>
                  </div>
                  <div className="relative overflow-hidden">
                    <Image
                      src={"/images/2.png"}
                      alt={""}
                      width={500}
                      height={500}
                      quality={100}
                      objectFit={"cover"}
                      draggable={false}
                      className="size-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 h-48 bg-muted-200">
                  <div className="relative overflow-hidden">
                    <Image
                      src={"/images/4.png"}
                      alt={""}
                      width={500}
                      height={500}
                      quality={100}
                      objectFit={"cover"}
                      draggable={false}
                      className="size-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center relative px-1">
                    <div className="font-dm-serif text-lg xl:text-xl text-primary/90 tracking-wide text-center font-medium uppercase">
                      Average spending per person
                    </div>
                    <p className="bg-muted px-4 py-1.5 rounded-full font-bold antialiased text-pretty text-lg text-primary/90 mt-2.5">
                      £7 - £15
                    </p>
                    <IconWallet
                      className="absolute bottom-0 right-0 opacity-15 -rotate-12"
                      size={50}
                    />
                  </div>
                </div>
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 h-48 bg-muted-200">
                  <div className="relative overflow-hidden">
                    <Image
                      src={"/images/5.png"}
                      alt={""}
                      width={500}
                      height={500}
                      quality={100}
                      objectFit={"cover"}
                      draggable={false}
                      className="size-full object-cover object-center"
                    />
                  </div>
                  <div className="relative flex flex-col items-center justify-center px-1.5 overflow-hidden">
                    <div className="relative font-dm-sans text-lg xl:text-xl text-primary/90 tracking-wide text-center font-medium">
                      <span>
                        This restaurant offers a{" "}
                        <span className="text-accent-700">casual</span> vibe.
                      </span>
                    </div>

                    <IconBackground
                      className="opacity-5 absolute top-0 left-0"
                      size={300}
                    />
                  </div>
                </div>

                {/* Row 4 */}
                <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-4 h-20">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div className="bg-primary hover:bg-primary/90 flex items-center justify-center cursor-pointer uppercase text-cta md:text-base font-dm-sans font-medium tracking-wide text-muted transition-all duration-300">
                    Full Menu
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>

          <div className="w-full lg:!-translate-y-[140px] 2xl:!-translate-y-[250px]">
            <h6 className="text-2xl xl:text-3xl font-dm-serif mb-10">
              Reviews & Reviews
            </h6>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="grid grid-cols-1 gap-y-5">
                {Array(6)
                  .fill(0)
                  .map((item, index) => (
                    <ReviewPanel key={nanoid()} isLast={(index + 1) === 6} />
                  ))}
              </div>

              <div className="w-full">
                <ReviewForm />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

const ReviewForm = () => {
  return (
    <Formik
      initialValues={{ name: "", comment: "", rating: 0 }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        resetForm();
      }}
    >
      {({
        isSubmitting,
        errors,
        touched,
        values,
        setFieldValue,
        setFieldTouched,
      }) => {
        return (
          <Form className="flex flex-col">
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-2.5">
              <div className="col-span-1 flex flex-col gap-y-1 w-full">
                <Label htmlFor="name" className="text-sm text-primary/90">
                  Your name (Optional)
                </Label>

                <Field
                  as={Input}
                  name="name"
                  id="name"
                  onBlur={() => setFieldTouched("name", true, true)}
                  className={cn(
                    "w-full h-10 rounded-full font-dm-sans text-cta text-primary/90 text-left placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                    errors.name &&
                      touched.name &&
                      "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                  )}
                />

                <ErrorMessage
                  name="name"
                  component={motion.div}
                  className={cn(
                    "text-destructive text-sm font-dm-sans transition-all duration-200 will-change-auto",
                    errors.name
                      ? "animate-in slide-in-from-top-2 zoom-in-95"
                      : "animate-out slide-out-to-top-2 zoom-out-95"
                  )}
                />
              </div>

              <div className="col-span-1 flex flex-col gap-y-1 w-full">
                <Label htmlFor="rating" className="text-sm text-primary/90">
                  Star Rating <span className="text-destructive">*</span>
                </Label>

                <Select
                  onValueChange={(value) => {
                    setFieldValue("rating", value);
                  }}
                  onOpenChange={() => {
                    debounce(() => {
                      setFieldTouched("rating", true, true);
                    }, 1000)();
                  }}
                  defaultValue={toString(values.rating)}
                >
                  <SelectTrigger
                    className={cn(
                      "w-full h-10 rounded-full border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                      errors.rating &&
                        touched.rating &&
                        "!border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                    )}
                  >
                    <SelectValue
                      placeholder="Select vibe"
                      className="font-dm-sans text-cta text-primary/90 text-left placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-none ring-0 focus-visible:ring-0 focus:outline-none"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-muted border-none shadow-[0_0_0_1px] shadow-primary/25 rounded-xl max-h-56 overflow-y-auto flex flex-col">
                    <SelectGroup className="!px-0.5 w-full">
                      <SelectItem
                        className="!text-primary/90 hover:!bg-primary/15 active:!bg-accent"
                        value="1"
                      >
                        1 Star Rating
                      </SelectItem>
                      <SelectItem
                        className="!text-primary/90 hover:!bg-primary/15 active:!bg-accent"
                        value="2"
                      >
                        2 Star Rating
                      </SelectItem>
                      <SelectItem
                        className="!text-primary/90 hover:!bg-primary/15 active:!bg-accent"
                        value="3"
                      >
                        3 Star Rating
                      </SelectItem>
                      <SelectItem
                        className="!text-primary/90 hover:!bg-primary/15 active:!bg-accent"
                        value="4"
                      >
                        4 Star Rating
                      </SelectItem>
                      <SelectItem
                        className="!text-primary/90 hover:!bg-primary/15 active:!bg-accent"
                        value="5"
                      >
                        5 Star Rating
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <ErrorMessage
                  name="rating"
                  component={motion.div}
                  className={cn(
                    "text-destructive text-sm font-dm-sans transition-all duration-200 will-change-auto",
                    errors.rating
                      ? "animate-in slide-in-from-top-2 zoom-in-95"
                      : "animate-out slide-out-to-top-2 zoom-out-95"
                  )}
                />
              </div>

              <div className="col-span-2 flex flex-col gap-y-1 w-full">
                <Label htmlFor="comment" className="text-sm text-primary/90">
                  Your Review <span className="text-destructive">*</span>
                </Label>

                <div
                  className={cn(
                    "relative w-full grid grid-cols-1 gap-y-2.5 border-2 min-h-10 p-0.5 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent transition-colors duration-200",
                    errors.comment &&
                      touched.comment &&
                      "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50",
                    values.comment.length > 10
                      ? "rounded-2xl bg-transparent border-accent-600/50"
                      : "rounded-full overflow-hidden"
                  )}
                >
                  <Field
                    rows={1}
                    as={Textarea}
                    minLength={20}
                    maxLength={200}
                    id={"comment"}
                    name={"comment"}
                    className={cn(
                      "w-full rounded-full min-h-9 !bg-transparent max-h-16 resize-none px-2 font-dm-sans text-cta text-primary/90 text-left placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85  outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 border-none",
                      values.comment.length > 10 && "rounded-[14px]"
                    )}
                  />

                  <div
                    className={cn(
                      "justify-end transition-all duration-300 delay-75 p-2",
                      values.comment.length > 10
                        ? "flex opaity-100"
                        : "opacity-0 hidden"
                    )}
                  >
                    <motion.button
                      type="submit"
                      className="!text-sm py-1.5 px-3 bg-gradient-to-r from-accent hover:from-accent/90 via-accent/75 to-accent hover:via-accent/65 hover:to-accent/90 rounded-full shadow text-primary/90 uppercase text-cta text-pretty tracking-wide font-dm-sans font-medium"
                    >
                      <span className="text-inherit">
                        Share Your Experience
                      </span>
                    </motion.button>
                  </div>
                </div>

                <div
                  className={cn(
                    "flex flex-col-reverse gap-0.25 lg:!flex-row justify-start lg:justify-end w-full",
                    errors.comment && touched.comment && "lg:!justify-between"
                  )}
                >
                  <ErrorMessage
                    name={"comment"}
                    component={motion.div}
                    className={cn(
                      "text-destructive text-sm font-dm-sans !self-start !justify-self-start !place-self-start",
                      errors.comment
                        ? "animate-in slide-in-from-top-2 zoom-in-95"
                        : "animate-out slide-out-to-top-2 zoom-out-95"
                    )}
                  />

                  <small className="text-xs text-primary/90 place-self-end self-end mt-0.5">
                    Max 200 Characters.
                  </small>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

RestaurantPreview.displayName = "RestaurantPreview";
export default RestaurantPreview;
