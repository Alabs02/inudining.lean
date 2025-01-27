"use client";

import React, { useEffect, useRef, useState } from "react";
import { Label, Input, Textarea } from "@/components/ui";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorMessage, Field } from "formik";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";

import { cn } from "@/lib";
import { cuisines } from "@/constants/db";
import { IconCheckbox, IconX } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { whileTapOptions } from "@/constants";
import debounce from "lodash/debounce";

const BasicInfo = (props: any) => {
  const { step, setFieldValue, setFieldTouched, values, errors, touched } =
    props;

  return (
    <AnimatePresence mode={"popLayout"}>
      {step === 1 || step === 6 ? (
        <motion.section
          initial={{ x: step === 1 || step === 6 ? "100%" : 0 }}
          animate={{ x: step === 1 || step === 6 ? 0 : "-100%" }}
          exit={{ x: "-100%" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className={cn(
            "grid grid-cols-1 gap-y-5 px-2.5 w-full transition-opacity will-change-auto transform-gpu",
            step === 1 || step === 6 ? "grid opacity-100" : "opacity-0 hidden"
          )}
        >
          <motion.div className="w-full px-5">
            <h6 className="font-dm-serif text-primary/85 text-lg">
              Let&apos;s Get to Know Your Restaurant
            </h6>

            <p className={cn("font-dm-sans text-sm", step === 6 && "hidden")}>
              We&apos;ll use this information to help diners find and recognize
              your restaurant.
            </p>

            <div className="grid grid-cols-12 gap-5 w-full my-5">
              <div className="col-span-12 lg:col-span-6 flex flex-col items-start gap-y-0.5 transition-all duration-300 will-change-auto">
                <Label
                  htmlFor="basicInfo.restaurantName"
                  className="text-sm text-primary/90"
                >
                  What&apos;s the name of your restaurant?
                </Label>

                <Field
                  as={Input}
                  name="basicInfo.restaurantName"
                  id="basicInfo.restaurantName"
                  readOnly={step === 6}
                  onBlur={() =>
                    setFieldTouched("basicInfo.restaurantName", true, true)
                  }
                  className={cn(
                    "w-full h-10 rounded-full font-dm-sans text-cta text-primary/90 text-left placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                    errors.basicInfo?.restaurantName &&
                      touched.basicInfo?.restaurantName &&
                      "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                  )}
                />

                <ErrorMessage
                  name="basicInfo.restaurantName"
                  component={motion.div}
                  className={cn(
                    "text-destructive text-sm font-dm-sans transition-all duration-200 will-change-auto",
                    errors.basicInfo?.restaurantName
                      ? "animate-in slide-in-from-top-2 zoom-in-95"
                      : "animate-out slide-out-to-top-2 zoom-out-95"
                  )}
                />
              </div>

              <div className="col-span-12 lg:col-span-6 flex flex-col items-start gap-y-0.5">
                <Label
                  htmlFor="basicInfo.cuisine"
                  className="text-sm text-primary/90"
                >
                  What type of cuisine do you serve?
                </Label>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Field
                      as={Input}
                      id={"basicInfo.cuisine"}
                      name={"basicInfo.cuisine"}
                      readOnly={step === 6}
                      placeholder={values.basicInfo.cuisine?.join(", ")}
                      className={cn(
                        "w-full h-10 rounded-full font-dm-sans text-cta text-primary/90 text-left placeholder:inline-block placeholder:max-w-[90%] placeholder:text-ellipsis placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 placeholder:whitespace-nowrap placeholder:truncate border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                        errors.basicInfo?.cuisine &&
                          touched.basicInfo?.cuisine &&
                          "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50",
                          step === 6 && "!pointer-events-none"
                      )}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-muted border-none shadow-[0_0_0_1px] shadow-primary/25 rounded-xl">
                    <motion.div className="w-full max-h-64 xl:max-h-72 overflow-y-auto flex flex-col pr-0.5">
                      <DropdownMenuLabel className="font-dm-serif tracking-wider">
                        Cuisines
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {cuisines.map(({ id, cuisine }) => (
                        <motion.button
                          key={`cuisine-${id}`}
                          onClick={() => {
                            const currentCuisines =
                              values.basicInfo.cuisine || [];
                            const newCuisines = currentCuisines.includes(
                              cuisine
                            )
                              ? currentCuisines.filter(
                                  (item: any) => item !== cuisine
                                )
                              : [...currentCuisines, cuisine];
                            setFieldValue("basicInfo.cuisine", newCuisines);
                          }}
                          className="flex items-center gap-x-2 text-[13.5px] text-primary/90 hover:bg-primary/15 rounded px-1.5 py-2 transition-all duration-300 will-change-auto"
                        >
                          <div className="size-6 grid grid-cols-1 place-items-center transition-all duration-300">
                            <IconCheckbox
                              className={cn(
                                "stroke-accent-600 transition-all duration-300 will-change-transform transform-gpu",
                                values.basicInfo.cuisine?.includes(cuisine)
                                  ? "inline-flex animate-in zoom-in-95"
                                  : "animate-out zoom-out-95 hidden"
                              )}
                              size={20}
                            />
                          </div>
                          <span className="text-left text-inherit">
                            {cuisine}
                          </span>
                        </motion.button>
                      ))}
                    </motion.div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <ErrorMessage
                  name="basicInfo.cuisine"
                  component={motion.div}
                  className={cn(
                    "text-destructive text-sm font-dm-sans transition-all duration-200 will-change-auto",
                    errors.basicInfo?.cuisine
                      ? "animate-in slide-in-from-top-2 zoom-in-95"
                      : "animate-out slide-out-to-top-2 zoom-out-95"
                  )}
                />
              </div>

              <div className="col-span-12 flex flex-col items-start gap-y-0.5">
                <Label
                  htmlFor="basicInfo.description"
                  className="text-sm text-primary/90"
                >
                  Describe your restaurant in one sentence.
                </Label>

                <Field
                  rows={1}
                  as={Textarea}
                  minLength={20}
                  maxLength={150}
                  readOnly={step === 6}
                  id={"basicInfo.description"}
                  name={"basicInfo.description"}
                  className={cn(
                    "w-full rounded-full min-h-10 max-h-16 resize-none px-4 font-dm-sans text-cta text-primary/90 text-left placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                    errors.basicInfo?.description &&
                      touched.basicInfo?.description &&
                      "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                  )}
                />

                <div
                  className={cn(
                    "flex flex-col-reverse gap-0.25 lg:!flex-row justify-start lg:justify-end w-full",
                    errors.basicInfo?.description &&
                      touched.basicInfo?.description &&
                      "lg:!justify-between"
                  )}
                >
                  <ErrorMessage
                    name={"basicInfo.description"}
                    component={motion.div}
                    className={cn(
                      "text-destructive text-sm font-dm-sans !self-start !justify-self-start !place-self-start",
                      errors.basicInfo?.description
                        ? "animate-in slide-in-from-top-2 zoom-in-95"
                        : "animate-out slide-out-to-top-2 zoom-out-95"
                    )}
                  />

                  <small className="text-xs text-primary/90 place-self-end self-end mt-0.5">
                    Max 150 Characters.
                  </small>
                </div>
              </div>

              <div className="col-span-12 flex flex-col items-start gap-y-0.5">
                <Label
                  htmlFor="basicInfo.logo"
                  className="text-sm text-primary/90"
                >
                  Upload your restaurant&apos;s logo.
                </Label>

                <FileUpload
                  name={"basicInfo.logo"}
                  id={"basicInfo.logo"}
                  required={true}
                  errors={errors}
                  touched={touched}
                  values={values}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />

                <ErrorMessage
                  name={"basicInfo.logo"}
                  component={motion.div}
                  className={cn(
                    "text-destructive text-sm font-dm-sans !self-start !justify-self-start !place-self-start",
                    errors.basicInfo?.logo
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

const FileUpload = (props: any) => {
  const {
    required,
    name,
    errors,
    touched,
    step,
    values,
    setFieldValue,
    setFieldTouched,
  } = props;

  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (values?.basicInfo?.logo && !preview) {
      const file = values?.basicInfo?.logo;
      console.log({ file });
      setPreview(URL.createObjectURL(file));
    }
  }, [step]);

  useEffect(() => {
    const cachedPreview = localStorage.getItem(name);
    if (cachedPreview && !preview) {
      setPreview(cachedPreview);
    }
  }, [name]);

  useEffect(() => {
    if (preview) {
      localStorage.setItem(name, preview);
    }
  }, [preview, name]);

  useEffect(() => {
    const clearCache = () => {
      localStorage.removeItem(name);
    };

    const cacheTimeout = setTimeout(clearCache, 24 * 60 * 60 * 1000);

    return () => {
      clearTimeout(cacheTimeout);
      clearCache();
    };
  }, [name]);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: (incomingFiles: File[]) => {
      if (incomingFiles.length > 0) {
        const file = incomingFiles[0];
        setFieldValue(name, file);
        setPreview(URL.createObjectURL(file));
      }
    },
    maxFiles: 1,
    maxSize: 500 * 1024,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/jpg": [],
      "image/svg": [],
    },
  });

  const handleRemove = () => {
    setFieldValue(name, null);
    setPreview(undefined);
    if (hiddenInputRef.current) hiddenInputRef.current.value = "";
  };

  return (
    <div className="w-full transition-all duration-300 will-change-auto">
      <div
        className={cn(
          "relative flex-col items-center transition-all duration-300 rounded-xl shadow-[0_0_0_1px] shadow-primary/25",
          preview
            ? "flex animate-in fade-in-95"
            : "animate-out fade-out-95 hidden"
        )}
      >
        {preview && (
          <Image
            src={preview}
            alt="Uploaded Preview"
            priority
            width={500}
            height={500}
            quality={100}
            draggable={false}
            className="w-32 h-32 object-contain object-center"
          />
        )}

        <motion.button
          type="button"
          {...whileTapOptions}
          onClick={handleRemove}
          className="absolute top-1.5 right-1.5 size-7 grid place-items-center p-px border-none outline-none focus:outline-none rounded-full text-sm text-destructive hover:underline shadow-[0_0_0_1px] shadow-destructive/35 hover:shadow-destructive/10 bg-transparent hover:bg-destructive-100"
        >
          <IconX className="stroke-destructive" size={20} />
        </motion.button>
      </div>

      {step !== 6 && (<div
        {...getRootProps({
          className: cn(
            "w-full min-h-20 p-2 rounded-xl place-items-center relative text-cta leading-[23px] border-2 border-transparent hover:border-accent-600/50 focus:border-accent-600/50 focus-within:border-accent-600/50 focus:outline-none transition-all duration-300",
            isDragActive
              ? "bg-transparent border-accent-600/50 shadow-[inset_0px_0px_16px] shadow-accent-600"
              : "bg-accent-600/50 hover:bg-transparent focus:bg-transparent focus-within:bg-transparent text-primary/90",
            errors?.basicInfo?.logo &&
              touched?.basicInfo?.logo &&
              "!border-destructive/50",
            preview
              ? "animate-out fade-out-95 hidden"
              : "grid animate-in fade-in-95"
          ),
        })}
        onBlurCapture={debounce(() => setFieldTouched(name, true, true), 1000)}
      >
        <input
          type="file"
          name={name}
          required={required}
          style={{ opacity: 0 }}
          ref={hiddenInputRef}
        />

        <input {...getInputProps()} />

        {isDragActive ? (
          <p className="text-sm text-accent-600 absolute top-1/2 -translate-y-1/2">
            Drop your file here...
          </p>
        ) : (
          <p className="text-sm text-primary/90 absolute top-1/2 -translate-y-1/2">
            Drag & drop a file here, or click to select a file
          </p>
        )}
      </div>)}
    </div>
  );
};

export { BasicInfo };
