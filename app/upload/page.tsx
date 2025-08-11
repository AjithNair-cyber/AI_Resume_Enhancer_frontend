"use client";
import { uploadResume } from "@/functions/apiFunctions";
import { Button } from "flowbite-react";
import React, { useState, useRef } from "react";
import { FormikHelpers, Formik, Form, Field, ErrorMessage } from "formik";
import ResumeUploadForm from "@/components/ResumeFileForm";
import * as Yup from "yup";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";

const UploadPage = () => {
  const [enhancedResume, setEnhancedResume] = useState<ResumeData | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorFileMessage, setErrorFileMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const initialValues: ResumeFormValues = {
    job: "",
    resume: null,
  };

  const handleSubmit = async (
    values: ResumeFormValues,
    actions: FormikHelpers<ResumeFormValues>
  ) => {
    const formData = new FormData();
    formData.append("job", values.job);

    if (!resumeFile) {
      setErrorFileMessage("Please upload a file");
      return;
    }
    if (resumeFile?.type !== "application/pdf") {
      console.log(resumeFile?.type);
      setErrorFileMessage("Please upload a file with valid file type (.pdf)");
      return;
    }
    formData.append("resume", resumeFile);
    // Submit logic here...

    try {
      setLoading(true);
      setError("");
      const data = await uploadResume(formData);
      toast.success("Resume uploaded successfully!");
      setEnhancedResume(data);
    } catch (err) {
      setLoading(true);
      setEnhancedResume(null);
      if (typeof err === "object" && err !== null && "response" in err) {
        // @ts-expect-error: err.response may exist if this is an Axios error
        setError(err.response?.data?.data);
      } else {
        setError(err instanceof Error ? err.message : "Signup failed");
      }
    } finally {
      setLoading(false);
    }

    actions.setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    job: Yup.string()
      .min(4, "Job description must be at least 4 characters long")
      .required("Job description is required"),
    resume: Yup.mixed().required("Resume is required"),
  });
  return (
    <div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!enhancedResume && (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue }) => (
            <Form className="w-7/8 mx-auto p-12 bg-white dark:bg-slate-800 rounded shadow space-y-6">
              <h1 className="text-2xl font-bold">Upload Resume</h1>
              <div className="flex md:flex-row flex-col gap-4 justify-around items-center align-middle">
                {/* Job Input */}
                <div className=" md:flex-3/5 w-full">
                  <label htmlFor="job" className="block font-medium mb-1">
                    Job Role/ Job Description
                  </label>
                  <Field
                    id="job"
                    as="textarea"
                    name="job"
                    placeholder="Enter job title or job description. Make it brief and add all relevant skills "
                    className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                    rows={4}
                    minLength={4}
                  />
                  <ErrorMessage
                    name="job"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Resume File Upload */}
                <div className="flex-1/6 flex flex-col items-center ">
                  <label htmlFor="resume" className="block font-medium  mb-1">
                    Upload Resume (PDF)
                  </label>
                  <Button
                    className="bg-blue-600 pl-8 pr-8 pt-2 pb-2 mb-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Select File
                  </Button>
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    disabled={loading}
                    ref={fileInputRef}
                    accept=".pdf"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.currentTarget.files?.[0] || null;
                      setResumeFile(file);
                      setFieldValue("resume", file);
                      setErrorFileMessage("");
                    }}
                    className="hidden"
                  />
                  <ErrorMessage
                    name="resume"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                  {resumeFile && (
                    <div className="text-sm ">
                      Selected:{" "}
                      <span className="font-medium">{resumeFile.name}</span>
                    </div>
                  )}

                  {errorFileMessage && (
                    <span className="text-sm text-red-600">
                      {errorFileMessage}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  className="bg-blue-600 pl-8 pr-8 pt-6 pb-6 "
                  type="submit"
                  disabled={loading}
                >
                  {loading && <Loader />}
                  {!loading && <p>Submit </p>}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {enhancedResume && <ResumeUploadForm {...enhancedResume} />}
    </div>
  );
};

export default UploadPage;
