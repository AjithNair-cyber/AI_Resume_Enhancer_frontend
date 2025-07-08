"use client";
import ResumeTemplate from "@/components/ResumeTemplate";
import { uploadResume } from "@/functions/apiFunctions";
import { PDFViewer } from "@react-pdf/renderer";
import { Button } from "flowbite-react";
import React, { useState } from "react";

const UploadPage = () => {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [resume, setResume] = useState<File | null>(null);
  const [enhancedResume, setEnhancedResume] = useState<ResumeData | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobDescription(e.target.value);
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!resume) {
      alert("Please select a resume file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("job", jobDescription);
    formData.append("resume", resume);

    setEnhancedResume(null);
    try {
      const response = await uploadResume(formData);
      setEnhancedResume(response);
      setError(null);
    } catch (error) {
      setError("Failed to upload resume. Please try again.");
      console.log(error);
      setEnhancedResume(null);
    }
    setLoading(false);
  };
  return (
    <div className="">
      <h1>Upload Page</h1>
      <center>
        <form onSubmit={handleSubmit}>
          <div className="m-2 flex flex-row gap-2 items-center">
            <p>Job Title:</p>

            <input
              id="job"
              type="text"
              className="border-1 border-black-200 rounded-md"
              value={jobDescription}
              onChange={handleJobChange}
              required
            />
          </div>
          <div className="m-2 flex flex-row gap-2 items-center">
            <p>Upload Resume:</p>
            <input
              id="resume"
              type="file"
              height={100}
              accept=".pdf"
              className="border-1 border-black-200 rounded-md"
              onChange={handleResumeChange}
              required
            />
          </div>
          <Button className="bg-blue-600 pl-8 pr-8 pt-6 pb-6" type="submit">
            Upload
          </Button>
          {loading && <p className="text-green-500">Uploading...</p>}
          <div>
            {!loading && !error && enhancedResume && (
              <PDFViewer className="w-full h-[80vh]">
                <ResumeTemplate {...enhancedResume} />
              </PDFViewer>
            )}
          </div>
          <div>
            {!loading && error && <p className="text-red-500">{error}</p>}
          </div>
        </form>
      </center>
    </div>
  );
};

export default UploadPage;
