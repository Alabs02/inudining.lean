"use client";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Input,
  Slider,
  Checkbox,
  DialogClose,
} from "@/components/ui";
import { cn } from "@/lib";
import { Store, UI } from "@/models";
import { AnimatePresence, motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

import debounce from "lodash/debounce";
import Image from "next/image";

import { Line } from "rc-progress";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea.component";
import { useDropzone } from "react-dropzone";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconCheckbox,
} from "@tabler/icons-react";
import { whileTapOptions } from "@/constants";
import { useRestaurantFormStore } from "@/store/restaurant-creation.store";
import { restaurantFormSchema } from "@/validations";
import { useToast } from "@/hooks/use-toast";

import { BasicInfo } from "./basic-info.form";
import { LocationContact } from "./location-contact.form";
import { DiningDetails } from "./dining-details.form";
import { PhotosMenu } from "./photos-menu.form";
import { inclusivityOptions } from "@/constants/db";
import { InclusivityDetails } from "./inclusivity-details.form";

type FormValues = {
  confirmation: boolean;
  basicInfo: Store.BasicInfo;
  photosMenu: Store.PhotosMenu;
  diningDetails: Store.DiningDetails;
  locationContact: Store.LocationContact;
  inclusivityDetails: Store.InclusivityDetails;
};

const AddRestaurant = () => {
  const { toast } = useToast();
  const {
    step,
    basicInfo,
    photosMenu,
    diningDetails,
    confirmation,
    locationContact,
    inclusivityDetails,
    setStep,
    setBasicInfo,
    setPhotosMenu,
    setConfirmation,
    setDiningDetails,
    setLocationContact,
    setInclusivityDetails,
    getProgress,
    resetStore,
    resetForm
  } = useRestaurantFormStore();

  const onPrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onNext = (valid: boolean, onComplete?: (...args: any) => void) => {
    if (step >= 6) return;

    if (valid && step < 6) {
      setStep(step + 1);

      debounce(() => {
        onComplete && onComplete();
      }, 300)();
    } else {
      toast({
        variant: "destructive",
        title: "Almost There!",
        description:
          "Please make sure all fields are filled out correctly before proceeding. Check for any errors or missing information.",
      });
    }
  };

  const isStepValid = (errors: any, setFieldTouched: any) => {
    const stepOneStatus =
      step === 1 ? isStepOneValid(errors, setFieldTouched) : false;
    const stepTwoStatus =
      step === 2 ? isStepTwoValid(errors, setFieldTouched) : false;
    const stepThreeStatus =
      step === 3 ? isStepThreeValid(errors, setFieldTouched) : false;
    const stepFourStatus =
      step === 4 ? isStepFourValid(errors, setFieldTouched) : false;
    const stepFiveStatus =
      step === 5 ? isStepFiveValid(errors, setFieldTouched) : false;

    switch (step) {
      case 1:
        return stepOneStatus;
      case 2:
        return stepTwoStatus;
      case 3:
        return stepThreeStatus;
      case 4:
        return stepFourStatus;
      case 5:
        return stepFiveStatus;
      default:
        return false;
    }
  };

  const isStepOneValid = (errors: any, setFieldTouched: any) => {
    Object.keys(errors.basicInfo || {}).forEach((field) => {
      console.log({ field });
      setFieldTouched(`basicInfo.${field}`, true, true);
    });

    return !Object.keys(errors.basicInfo || {}).length;
  };

  const isStepTwoValid = (errors: any, setFieldTouched: any) => {
    Object.keys(errors.locationContact || {}).forEach((field) => {
      setFieldTouched(`locationContact.${field}`, true, true);
    });

    return !Object.keys(errors.locationContact || {}).length;
  };

  const isStepThreeValid = (errors: any, setFieldTouched: any) => {
    Object.keys(errors.diningDetails || {}).forEach((field) => {
      if (field === "schedule") {
        Object.keys(errors.diningDetails.schedule || {}).forEach(
          (scheduleField) => {
            setFieldTouched(
              `diningDetails.schedule.${scheduleField}`,
              true,
              true
            );
          }
        );
      } else {
        setFieldTouched(`diningDetails.${field}`, true, true);
      }
    });

    return Object.keys(errors.diningDetails || {}).length === 1;
  };

  const isStepFourValid = (errors: any, setFieldTouched: any) => {
    Object.keys(errors.photosMenu || {}).forEach((field) => {
      setFieldTouched(`photosMenu.${field}`, true, true);
    });

    return !Object.keys(errors.photosMenu || {}).length;
  };

  const isStepFiveValid = (errors: any, setFieldTouched: any) => {
    Object.keys(errors.inclusivityDetails || {}).forEach((field) => {
      setFieldTouched(`inclusivityDetails.${field}`, true, true);
    });

    return !Object.keys(errors.inclusivityDetails || {}).length;
  };

  const saveFormSnapshot = (payload: FormValues) => {
    switch (step) {
      case 1:
        setBasicInfo(payload.basicInfo);
        break;
      case 2:
        setLocationContact(payload.locationContact);
        break;
      case 3:
        setDiningDetails(payload.diningDetails);
        break;
      case 4:
        setPhotosMenu(payload.photosMenu);
        break;
      case 5:
        setInclusivityDetails(payload.inclusivityDetails);
        break;
      default:
        break;
    }
  };

  return (
    <Formik<FormValues>
      initialValues={{
        basicInfo,
        locationContact,
        diningDetails,
        photosMenu,
        confirmation,
        inclusivityDetails,
      }}
      validationSchema={restaurantFormSchema}
      onSubmit={(
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
      ) => {
        alert("Triggered");
        console.log({ values });
        setTimeout(() => {
          setSubmitting(false);
        }, 500);
      }}
    >
      {({
        values,
        errors,
        touched,
        isValid,
        isSubmitting,
        setTouched,
        validateForm,
        setFieldTouched,
        setFieldValue,
        setSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form>
          <DialogContent className="sm:max-w-[425px] lg:max-w-[55vw] 2xl:max-w-[45vw] grid grid-cols-1 overflow-hidden bg-muted !rounded-xl p-0 pr-0.5 outline-none focus-within:outline-none transition-all duration-500 will-change-auto transform-gpu">
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

                {step === 6 && (
                  <>
                    <div className="w-full p-0 border-none transition-all duration-200 will-change-auto"></div>
                    <motion.section
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="p-2.5 rounded-md shadow-[0_0_0_1px] shadow-primary/20 transition-all duration-300 will-change-auto"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center w-full gap-2">
                        <Checkbox
                          id="confirmation"
                          checked={values.confirmation}
                          onCheckedChange={(e) => {
                            debounce(() => {
                              setFieldValue("confirmation", e, true);
                              setConfirmation(e as boolean);
                            }, 300)();
                          }}
                          onBlur={() =>
                            debounce(
                              () => setFieldTouched("confirmation", true, true),
                              300
                            )()
                          }
                        />

                        <Label
                          htmlFor="confirmation"
                          className="text-cta text-pretty cursor-pointer"
                        >
                          I confirm that the information provided is accurate.
                        </Label>
                      </div>

                      <ErrorMessage
                        name="confirmation"
                        component={motion.div}
                        className={cn(
                          "text-destructive text-sm font-dm-sans transition-all duration-200 will-change-auto",
                          errors.confirmation
                            ? "animate-in slide-in-from-top-2 zoom-in-95"
                            : "animate-out slide-out-to-top-2 zoom-out-95"
                        )}
                      />
                    </motion.section>
                  </>
                )}
              </DialogHeader>

              {/* STEPS */}
              {/* STEP 6 */}
              <AnimatePresence mode={"popLayout"}>
                {step === 6 ? (
                  <motion.section
                    initial={{ x: step === 6 ? "100%" : 0 }}
                    animate={{ x: step === 6 ? 0 : "-100%" }}
                    exit={{ x: "-100%" }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    className={cn(
                      "grid grid-cols-1 gap-y-5 px-2.5 w-full transition-opacity will-change-auto transform-gpu",
                      step === 6 ? "grid opacity-100" : "opacity-0 hidden"
                    )}
                  >
                    <motion.div className="w-full px-5 mb-5">
                      <h6 className="font-dm-serif text-primary/85 text-lg">
                        You&apos;re Almost Done!
                      </h6>

                      <p className="font-dm-sans text-sm">
                        Take a moment to review your details. When you&apos;re
                        ready, submit your restaurant to join the Inu Dining
                        community.
                      </p>
                    </motion.div>
                  </motion.section>
                ) : null}
              </AnimatePresence>

              {/* STEP 1 */}
              <BasicInfo
                step={step}
                errors={errors}
                values={values}
                touched={touched}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />

              {/* STEP 2 */}
              <LocationContact
                step={step}
                errors={errors}
                values={values}
                touched={touched}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />

              {/* STEP 3 */}
              <DiningDetails
                step={step}
                errors={errors}
                values={values}
                touched={touched}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />

              {/* STEP 4 */}
              <PhotosMenu
                step={step}
                errors={errors}
                values={values}
                touched={touched}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />

              {/* STEP 5 */}
              <InclusivityDetails
                step={step}
                errors={errors}
                values={values}
                touched={touched}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />

              <DialogFooter className="px-5 py-2.5 pb-10">
                
                  <motion.button
                    type="button"
                    onClick={() => {
                      resetForm()
                      resetStore()
                    }}
                    className="px-5 py-2.5 rounded-full text-destructive font-medium uppercase tracking-wide text-cta bg-transparent hover:bg-destructive-50 border-none shadow-none focus-visible:ring-0 focus-visible:outline-none"
                  >
                    <DialogClose asChild>
                      <span className="text-inherit">{step > 1 &&"Reset &"} Close</span>
                    </DialogClose>
                  </motion.button>

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
                    onNext(isStepValid(errors, setFieldTouched), () =>
                      saveFormSnapshot(values)
                    )
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

                <motion.button
                  {...whileTapOptions}
                  type={"submit"}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log({ values });
                  }}
                  className={cn(
                    "items-center bg-gradient-to-r from-accent hover:from-accent/90 via-accent/75 to-accent hover:via-accent/65 hover:to-accent/90 rounded-full shadow text-primary/90 uppercase text-cta text-pretty tracking-wide font-dm-sans font-medium py-2.5 px-5 border-none focus-visible:outline-none focus-visible:ring-0 transition-colors duration-200 will-change-auto",
                    step === 6
                      ? "flex transition-opacity opacity-100"
                      : "hidden transition-opacity opacity-0"
                  )}
                >
                  <span className="text-inherit -mb-px">
                    Submit All & Finish
                  </span>
                </motion.button>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Form>
      )}
    </Formik>
  );
};

AddRestaurant.displayName = "AddRestaurant";
export { AddRestaurant };
