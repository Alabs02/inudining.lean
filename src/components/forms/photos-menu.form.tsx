import { ErrorMessage, Field } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Input, Label } from "@/components/ui";
import { whileTapOptions } from "@/constants";
import { IconFileText, IconX } from "@tabler/icons-react";
import debounce from "lodash/debounce";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib";
import Image from "next/image";

const PhotosMenu = (props: any) => {
  const { step, setFieldValue, setFieldTouched, values, errors, touched } =
    props;

  return (
    <AnimatePresence mode={"popLayout"}>
      {step === 4 || step === 6 ? (
        <motion.section
          initial={{ x: step === 4 || step === 6 ? "100%" : 0 }}
          animate={{ x: step === 4 || step === 6 ? 0 : "-100%" }}
          exit={{ x: "-100%" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className={cn(
            "grid grid-cols-1 gap-y-5 px-2.5 w-full transition-opacity will-change-auto transform-gpu",
            step === 4 || step === 6 ? "grid opacity-100" : "opacity-0 hidden"
          )}
        >
          <motion.div className="w-full px-5">
            <h6 className="font-dm-serif text-primary/85 text-lg">
              Show Us What Makes Your Restaurant Special
            </h6>

            <p className={cn("font-dm-sans text-sm", step === 6 && "hidden")}>
              A picture is worth a thousand words! Show diners what makes your
              restaurant unique.
            </p>

            <div className="grid grid-cols-12 gap-5 w-full my-5">
              <div className="col-span-12 flex flex-col items-start gap-y-0.5 transition-all duration-300 will-change-auto">
                <Label
                  htmlFor="photosMenu.photos"
                  className="text-sm text-primary/90"
                >
                  Upload at least 3 photos of your restaurant.
                </Label>

                <MediaUpload
                  name={"photosMenu.photos"}
                  id={"photosMenu.photos"}
                  step={step}
                  required={true}
                  errors={errors}
                  touched={touched}
                  values={values}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />

                <ErrorMessage
                  name="photosMenu.photos"
                  component={motion.div}
                  className={cn(
                    "text-destructive text-sm font-dm-sans transition-all duration-200 will-change-auto",
                    errors.photosMenu?.photos
                      ? "animate-in slide-in-from-top-2 zoom-in-95"
                      : "animate-out slide-out-to-top-2 zoom-out-95"
                  )}
                />
              </div>

              <div className="col-span-12 lg:col-span-6 flex flex-col items-start gap-y-0.5">
                <Label
                  htmlFor="basicInfo.description"
                  className="text-sm text-primary/90"
                >
                  Share your menu.
                </Label>

                <DocumentUpload
                  name={"photosMenu.menu"}
                  id={"photosMenu.menu"}
                  step={step}
                  required={true}
                  errors={errors}
                  touched={touched}
                  values={values}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />

                <ErrorMessage
                  name={"photosMenu.menu"}
                  component={motion.div}
                  className={cn(
                    "text-destructive text-sm font-dm-sans !self-start !justify-self-start !place-self-start",
                    errors.photosMenu?.menu
                      ? "animate-in slide-in-from-top-2 zoom-in-95"
                      : "animate-out slide-out-to-top-2 zoom-out-95"
                  )}
                />
              </div>

              <div className="col-span-12 lg:col-span-6 flex flex-col items-start gap-y-0.5 transition-all duration-300 will-change-auto">
                <Label
                  htmlFor="photosMenu.signatureDishes"
                  className="text-sm text-primary/90"
                >
                  What are your signature dishes?
                </Label>

                <Field
                  as={Input}
                  name="photosMenu.signatureDishes"
                  id="photosMenu.signatureDishes"
                  readOnly={step === 6}
                  onBlur={() =>
                    setFieldTouched("photosMenu.signatureDishes", true, true)
                  }
                  placeholder="e.g., Spicy Jollof Rice, Grilled Suya, Gyros"
                  className={cn(
                    "w-full h-10 rounded-full font-dm-sans text-cta text-primary/90 text-left placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-70 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                    errors.photosMenu?.signatureDishes &&
                      touched.photosMenu?.signatureDishes &&
                      "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                  )}
                />

                <ErrorMessage
                  name="photosMenu.signatureDishes"
                  component={motion.div}
                  className={cn(
                    "text-destructive text-sm font-dm-sans transition-all duration-200 will-change-auto",
                    errors.photosMenu?.signatureDishes
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

const MediaUpload = (props: any) => {
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
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (values?.photosMenu?.photos && previews.length === 0) {
      const incomingSnaphot = values?.photosMenu?.photos;

      const newPreviews = incomingSnaphot.map((file: File) =>
        URL.createObjectURL(file)
      );
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  }, [step]);

  useEffect(() => {
    const cachedPreviews = JSON.parse(localStorage.getItem(name) || "[]");
    if (cachedPreviews.length && previews.length === 0) {
      setPreviews(cachedPreviews);
    }
  }, [name]);

  useEffect(() => {
    if (previews.length) {
      localStorage.setItem(name, JSON.stringify(previews));
    }
  }, [previews, name]);

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
      if (previews.length + incomingFiles.length > 6) {
        return alert("You can only upload up to 6 images.");
      }

      const newPreviews = incomingFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews((prev) => [...prev, ...newPreviews]);

      setFieldValue(name, [...(previews || []), ...incomingFiles]);
    },
    maxFiles: 6,
    maxSize: 500 * 1024,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/jpg": [],
      "image/svg": [],
    },
  });

  const handleRemove = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setFieldValue(
      name,
      previews.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="w-full transition-all duration-300 will-change-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4 transition-all duration-300 will-change-auto">
        {previews.map((preview, index) => (
          <div
            key={index}
            className="relative w-full h-32 bg-muted rounded-lg overflow-hidden transition-all duration-300 will-change-auto"
          >
            <Image
              src={preview}
              alt={`Uploaded Preview ${index + 1}`}
              priority
              fill
              quality={100}
              className="object-cover object-center"
            />
            <motion.button
              type="button"
              {...whileTapOptions}
              onClick={() => handleRemove(index)}
              className="absolute top-1.5 right-1.5 size-7 grid place-items-center p-px border-none outline-none focus:outline-none rounded-full text-sm text-destructive hover:underline shadow-[0_0_0_1px] shadow-destructive/25 hover:shadow-destructive/10 bg-destructive-100/90 backdrop-filter"
            >
              <IconX className="stroke-destructive" size={20} />
            </motion.button>
          </div>
        ))}
      </div>

      {(previews.length < 6 || step !== 6) && (
        <div
          {...getRootProps({
            className: cn(
              "w-full min-h-20 p-2 rounded-xl place-items-center relative text-cta leading-[23px] border-2 border-transparent hover:border-accent-600/50 focus:border-accent-600/50 focus-within:border-accent-600/50 focus:outline-none transition-all duration-300",
              isDragActive
                ? "bg-transparent border-accent-600/50 shadow-[inset_0px_0px_16px] shadow-accent-600"
                : "bg-accent-600/50 hover:bg-transparent focus:bg-transparent focus-within:bg-transparent text-primary/90",
              errors?.photosMenu?.photos &&
                touched?.photosMenu?.photos &&
                "!border-destructive/50"
            ),
          })}
          onBlurCapture={debounce(
            () => setFieldTouched(name, true, true),
            1000
          )}
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
            <p className="text-sm text-accent-600 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              Drop your file here...
            </p>
          ) : (
            <p className="text-sm text-primary/90 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              Drag & drop a file here, or click to select a file
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const DocumentUpload = (props: any) => {
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
  const [fileName, setFileName] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (values?.photosMenu?.menu && !preview) {
      const file = values?.photosMenu?.menu;
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  }, [step]);

  // Load preview from local storage on mount
  useEffect(() => {
    const cachedPreview = localStorage.getItem(`${name}_preview`);
    const cachedFileName = localStorage.getItem(`${name}_fileName`);
    if (cachedPreview && cachedFileName) {
      setPreview(cachedPreview);
      setFileName(cachedFileName);
    }
  }, [name]);

  // Cache preview and file name when updated
  useEffect(() => {
    if (preview && fileName) {
      localStorage.setItem(`${name}_preview`, preview);
      localStorage.setItem(`${name}_fileName`, fileName);
    }
  }, [preview, fileName, name]);

  // Clear cache after 24 hours
  useEffect(() => {
    const clearCache = () => {
      localStorage.removeItem(`${name}_preview`);
      localStorage.removeItem(`${name}_fileName`);
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

        // Validate file type and size
        if (file.type !== "application/pdf") {
          alert("Only PDF files are allowed!");
          return;
        }
        if (file.size > 500 * 1024) {
          alert("File size must be less than 500 KB!");
          return;
        }

        setFieldValue(name, file);
        setPreview(URL.createObjectURL(file));
        setFileName(file.name);
      }
    },
    maxFiles: 1,
    maxSize: 500 * 1024,
    accept: { "application/pdf": [] },
  });

  const handleRemove = () => {
    setFieldValue(name, null);
    setPreview(undefined);
    setFileName(undefined);
    localStorage.removeItem(`${name}_preview`);
    localStorage.removeItem(`${name}_fileName`);
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
          <div className="flex flex-col items-center py-2">
            <IconFileText className="w-12 h-12 stroke-primary/90 fill-accent" />
            <p className="mt-1 text-sm text-center text-primary">{fileName}</p>
          </div>
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

      {step !== 6 && (
        <div
          {...getRootProps({
            className: cn(
              "w-full min-h-20 p-2 rounded-xl place-items-center relative text-cta leading-[23px] border-2 border-transparent hover:border-accent-600/50 focus:border-accent-600/50 focus-within:border-accent-600/50 focus:outline-none transition-all duration-300",
              isDragActive
                ? "bg-transparent border-accent-600/50 shadow-[inset_0px_0px_16px] shadow-accent-600"
                : "bg-accent-600/50 hover:bg-transparent focus:bg-transparent focus-within:bg-transparent text-primary/90",
              errors?.photosMenu?.menu &&
                touched?.photosMenu?.menu &&
                "!border-destructive/50",
              preview
                ? "animate-out fade-out-95 hidden"
                : "grid animate-in fade-in-95"
            ),
          })}
          onBlurCapture={debounce(
            () => setFieldTouched(name, true, true),
            1000
          )}
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
              Drop your PDF here...
            </p>
          ) : (
            <p className="text-sm text-primary/90 absolute top-1/2 -translate-y-1/2">
              Drag & drop a PDF here, or click to select one
            </p>
          )}
        </div>
      )}
    </div>
  );
};

PhotosMenu.displayName = "PhotosMenu";
export { PhotosMenu };
