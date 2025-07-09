"use client";
import { uploadResume } from "@/functions/apiFunctions";
import { Button } from "flowbite-react";
import React, { useState, useRef } from "react";
import { FormikHelpers, Formik, Form, Field } from "formik";
import ResumeUploadForm from "@/components/ResumeFileForm";

const UploadPage = () => {
  const [enhancedResume, setEnhancedResume] = useState<ResumeData | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }
    // Submit logic here...

    try {
      const data = await uploadResume(formData);
      setEnhancedResume(data);
    } catch (err) {
      setEnhancedResume(null);
      console.log(err);
    }

    actions.setSubmitting(false);
  };

  return (
    <div>
      {!enhancedResume && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
                    ref={fileInputRef}
                    accept=".pdf"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.currentTarget.files?.[0] || null;
                      setResumeFile(file);
                      setFieldValue("resume", file);
                    }}
                    className="hidden"
                  />

                  {resumeFile && (
                    <div className="text-sm ">
                      Selected:{" "}
                      <span className="font-medium">{resumeFile.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  className="bg-blue-600 pl-8 pr-8 pt-6 pb-6 "
                  type="submit"
                >
                  Submit
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
