"use client";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Input,
} from "@/components/ui";
import { cn } from "@/lib";
import { Store, UI } from "@/models";
import { AnimatePresence, motion } from "framer-motion";
import { Formik, Form, Field, useField, ErrorMessage } from "formik";

import { useEffect, useRef, useState } from "react";

import debounce from "lodash/debounce";
import Image from "next/image";

import { Line } from "rc-progress";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea.component";
import { useDropzone } from "react-dropzone";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { whileTapOptions } from "@/constants";
import { useRestaurantFormStore } from "@/store/restaurant-creation.store";
import { restaurantFormSchema } from "@/validations";
import { useToast } from "@/hooks/use-toast";

type FormValues = {
  basicInfo: Store.BasicInfo;
};

const AddRestaurant = () => {
  const { toast } = useToast();
  const { step, basicInfo, setStep, setBasicInfo, getProgress } =
    useRestaurantFormStore();

  const onPrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onNext = (valid: boolean) => {
    if (step >= 6) return;

    console.log(valid);

    if (valid && step < 6) {
      setStep(step + 1);
    } else {
      console.log("Toasting...");
      toast({
        variant: "destructive",
        title: "Almost There!",
        description:
          "Please make sure all fields are filled out correctly before proceeding. Check for any errors or missing information.",
      });
    }
  };

  const isStepOneValid = (errors: any, setFieldTouched: any) => {
    Object.keys(errors.basicInfo || {}).forEach((field) => {
      setFieldTouched(`basicInfo.${field}`, true, true);
    });

    return !Object.keys(errors.basicInfo || {}).length;
  };

  return (
    <Formik<FormValues>
      initialValues={{ basicInfo }}
      validationSchema={restaurantFormSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log({ values });
      }}
    >
      {({
        values,
        errors,
        touched,
        setTouched,
        setFieldTouched,
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form>
          <DialogContent className="sm:max-w-[425px] lg:max-w-[55vw] 2xl:max-w-[45vw] grid grid-cols-1 overflow-hidden bg-muted !rounded-xl p-0 pr-0.5 outline-none focus-within:outline-none">
            <motion.div className="w-full max-h-[90vh] !rounded-xl overflow-y-auto">
              <DialogHeader className="sticky top-0 bg-muted/65 backdrop-blur backdrop-filter z-50 px-5 py-5">
                <DialogTitle className="font-dm-serif tracking-wider text-primary/90 capitalize text-xl">
                  Add Your Restaurant to Inu Dining
                </DialogTitle>

                <DialogDescription className="text-primary/80 text-sm md:text-base font-dm-sans">
                  Join our community of inclusive restaurants and connect with
                  diners who value great food and welcoming spaces. Let&apos;s
                  get started!
                </DialogDescription>

                <motion.header className="flex items-center pl-[46px] relative h-14">
                  <div className="size-12 rounded-full p-px grid place-items-center bg-[#fef6e8] absolute top-1/2 -translate-y-1/2 left-0 shadow-[0_0_0_1px] shadow-accent/80">
                    <p className="font-bold font-dm-sans text-cta transition-all duration-300 ml-0.5 text-[#e09617]">
                      {getProgress()}%
                    </p>
                  </div>

                  <Line
                    percent={getProgress()}
                    strokeWidth={1.5}
                    trailColor="#fef6e8"
                    strokeColor={"#f9a71a"}
                  />
                </motion.header>
              </DialogHeader>

              {/* STEPS */}
              <AnimatePresence mode={"wait"}>
                <motion.section
                  initial={{ x: step === 1 ? "100%" : 0 }}
                  animate={{ x: step === 1 ? 0 : "-100%" }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="grid grid-cols-1 gap-y-5 px-2.5 w-full will-change-transform transform-gpu"
                >
                  <motion.div className="w-full px-5">
                    <h6 className="font-dm-serif text-primary/85 text-lg">
                      Let&apos;s Get to Know Your Restaurant
                    </h6>

                    <p className="font-dm-sans text-sm">
                      We&apos;ll use this information to help diners find and
                      recognize your restaurant.
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
                          onBlur={() =>
                            setFieldTouched(
                              "basicInfo.restaurantName",
                              true,
                              true
                            )
                          }
                          className={cn(
                            "w-full h-10 rounded-full font-dm-sans text-cta text-primary/90 placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                            errors.basicInfo?.restaurantName &&
                              touched.basicInfo?.restaurantName &&
                              "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                          )}
                        />

                        <ErrorMessage
                          name="basicInfo.restaurantName"
                          component={motion.div}
                          className={cn(
                            "text-destructive text-sm font-dm-sans",
                            errors.basicInfo?.restaurantName
                              ? "animate-in slide-in-from-top-2 zoom-in-95"
                              : "animate-out slide-out-to-top-2 zoom-out-95"
                          )}
                        />
                      </div>

                      <div className="col-span-12 lg:col-span-6 flex flex-col items-start gap-y-0.5">
                        <Label
                          htmlFor="terms"
                          className="text-sm text-primary/90"
                        >
                          What type of cuisine do you serve?
                        </Label>
                        <Input className="w-full h-10 rounded-full font-dm-sans text-cta text-primary/90 placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto" />
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
                          id={"basicInfo.description"}
                          name={"basicInfo.description"}
                          className={cn(
                            "w-full rounded-full min-h-10 max-h-16 resize-none px-4 font-dm-sans text-cta text-primary/90 placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
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
              </AnimatePresence>

              <DialogFooter className="px-5 py-2.5 pb-10">
                <motion.button
                  {...whileTapOptions}
                  onClick={onPrevious}
                  type="button"
                  aria-label="Next"
                  className={cn(
                    "border items-center gap-x-2 font-medium font-dm-sans uppercase py-2.5 px-5 rounded-full text-cta text-primary/90 border-none outline-none focus:outline-none shadow-[0px_0px_0px_1px] shadow-primary/25 hover:shadow-muted-200/25 bg-transparent hover:bg-muted-100 hover:text-primary-400 transition-colors duration-200 will-change-auto",
                    step < 2
                      ? "transition-opacity opacity-0 hidden"
                      : "flex transition-opacity opacity-1"
                  )}
                >
                  <IconArrowNarrowLeft size={20} />
                  <span>Previous</span>
                </motion.button>

                <motion.button
                  {...whileTapOptions}
                  onClick={() =>
                    onNext(isStepOneValid(errors, setFieldTouched))
                  }
                  type="button"
                  aria-label="Next"
                  className={cn(
                    "group/next border items-center gap-x-2 font-medium font-dm-sans uppercase py-2.5 px-5 rounded-full text-cta text-accent-600 border-none outline-none focus:outline-none shadow-[0px_0px_0px_1px] shadow-accent-600/30 hover:shadow-accent-400/25 bg-transparent hover:bg-accent-200 hover:text-accent-700 transition-colors duration-200 will-change-auto",
                    step < 6
                      ? "flex transition-opacity opacity-100"
                      : "hidden transition-opacity opacity-0"
                  )}
                >
                  <span className="text-inherit">Next</span>
                  <IconArrowNarrowRight
                    size={20}
                    className="stroke-accent-600 group-hover/next:stroke-accent-700"
                  />
                </motion.button>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Form>
      )}
    </Formik>
  );
};

const FileUpload = (props: any) => {
  const { required, name, errors, touched, setFieldValue, setFieldTouched } =
    props;

  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);

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

      <div
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
      </div>
    </div>
  );
};

FileUpload.displayName = "FileUpload";
AddRestaurant.displayName = "AddRestaurant";
export { AddRestaurant };
