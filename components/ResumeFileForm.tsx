import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "flowbite-react";
import { Formik, Form, Field, FieldArray } from "formik";
import { useState } from "react";
import ResumeTemplate from "./ResumeTemplate";
import Link from "next/link";

const initialResumeData: ResumeData = {
  name: "",
  job_role: "",
  mobile: "",
  email: "",
  linkedin: "",
  github: "",
  professional_summary: "",
  key_skills: [""],
  experience: [
    { title: "", company: "", start_date: "", end_date: "", description: [""] },
  ],
  projects: [{ title: "", description: [""], tech_stack: "" }],
  education: [
    {
      institution: "",
      degree: "",
      start_date: "",
      end_date: "",
      cgpa: "",
      percentage: "",
    },
  ],
  certifications: [
    { title: "", start_date: "", end_date: "", organization: "" },
  ],
  hobbies: [""],
  languages: [""],
};

const ResumeUploadForm = (resume: ResumeData | null) => {
  const initialValues: ResumeData = resume || initialResumeData;
  const [step, setSteps] = useState<number>(1);
  const [downloadResume, setDownloadResume] = useState<ResumeData | null>(null);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log({ values });
        setDownloadResume({ ...values });
        actions.setSubmitting(false);
      }}
      enableReinitialize={true}
    >
      {({ values }) => (
        <Form className="w-7/8 mx-auto p-12 bg-white dark:bg-slate-800 rounded shadow ">
          <h1 className="text-2xl font-bold mb-4">Resume Builder</h1>
          {!downloadResume && step == 1 ? (
            <div className="space-y-4">
              <div>
                <p className="text-xl font-medium">Name</p>
                <Field
                  name="name"
                  placeholder="Name"
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <p className="text-xl font-medium">Job Role</p>
                <Field
                  name="job_role"
                  placeholder="Job Role"
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <p className="text-xl font-medium">Mobile Number</p>
                <Field
                  name="mobile"
                  placeholder="Mobile"
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <p className="text-xl font-medium">Email</p>
                <Field
                  name="email"
                  placeholder="Email"
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <p className="text-xl font-medium">Linkedin Profile</p>
                <Field
                  name="linkedin"
                  placeholder="LinkedIn"
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <p className="text-xl font-medium">Github Account</p>
                <Field
                  name="github"
                  placeholder="GitHub"
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <p className="text-xl font-medium">Professional Summary</p>
                <Field
                  as="textarea"
                  name="professional_summary"
                  placeholder="Professional Summary"
                  className="w-full border p-2 rounded"
                  rows={5}
                />
              </div>
            </div>
          ) : null}
          {!downloadResume && step == 2 ? (
            <div className="space-y-4">
              <FieldArray name="experience">
                {({ push, remove }) => (
                  <div>
                    <label className="text-xl pb-4 font-medium">
                      Experience
                    </label>
                    {values.experience.map((exp, index) => (
                      <div
                        key={index}
                        className="border p-4 rounded space-y-2 mb-4 shadow-md"
                      >
                        <div className="flex flex-row w-full justify-around gap-2">
                          <div className="w-full">
                            <p className=" font-medium mb-2">Job Role</p>
                            <Field
                              name={`experience[${index}].title`}
                              placeholder="Title"
                              className="w-full border p-2 rounded"
                            />
                          </div>
                          <div className="w-full">
                            <p className=" font-medium mb-2">Company</p>
                            <Field
                              name={`experience[${index}].company`}
                              placeholder="Company"
                              className="w-full border p-2 rounded"
                            />
                          </div>
                        </div>
                        <div className="flex flex-row w-full justify-around gap-2">
                          <div className="w-full">
                            <p className=" font-medium mb-2">Start Date</p>
                            <Field
                              name={`experience[${index}].start_date`}
                              placeholder="Dates"
                              className="w-full border p-2 rounded"
                            />
                          </div>

                          <div className="w-full">
                            <p className=" font-medium mb-2">End Date</p>
                            <Field
                              name={`experience[${index}].end_date`}
                              placeholder="Dates"
                              className="w-full border p-2 rounded"
                            />
                          </div>
                        </div>
                        <p className=" font-medium ">Description</p>
                        <FieldArray name={`experience[${index}].description`}>
                          {({ push, remove }) => (
                            <div>
                              {exp.description.map((_, dIndex) => (
                                <div
                                  key={dIndex}
                                  className="flex items-center gap-2"
                                >
                                  <Field
                                    name={`experience[${index}].description[${dIndex}]`}
                                    className="w-full border p-2 rounded mt-2"
                                    placeholder="Description"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(dIndex)}
                                    className="text-red-500 hover:cursor-pointer rounded-4xl text-lg"
                                  >
                                    x
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => push("")}
                                className="text-blue-500"
                              >
                                + Add Point
                              </button>
                            </div>
                          )}
                        </FieldArray>

                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500"
                        >
                          Remove Experience
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          title: "",
                          company: "",
                          start_date: "",
                          end_date: "",
                          description: [""],
                        })
                      }
                      className="text-blue-500"
                    >
                      + Add Experience
                    </button>
                  </div>
                )}
              </FieldArray>
              {/* Repeat same for projects, education, certifications, hobbies, languages */}
            </div>
          ) : null}
          {!downloadResume && step == 3 ? (
            <div>
              <FieldArray name="projects">
                {({ push, remove }) => (
                  <div>
                    <label className="text-xl font-medium">Projects</label>
                    {values.projects.map((project, index) => (
                      <div
                        key={index}
                        className="border p-4 rounded space-y-2 mb-4 shadow-md"
                      >
                        <div className="flex flex-row w-full justify-around gap-2">
                          <div className="w-full">
                            <p className=" font-medium mb-2">Title</p>
                            <Field
                              name={`projects[${index}].title`}
                              placeholder="Title"
                              className="w-full border p-2 rounded"
                            />
                          </div>
                        </div>
                        <div className="flex flex-row w-full justify-around gap-2">
                          <div className="w-full">
                            <p className=" font-medium mb-2">Tech Stack</p>
                            <Field
                              name={`projects[${index}].tech_stack`}
                              placeholder="Title"
                              className="w-full border p-2 rounded"
                            />
                          </div>
                        </div>
                        <p className=" font-medium ">Description</p>
                        <FieldArray name={`projects[${index}].description`}>
                          {({ push, remove }) => (
                            <div>
                              {project.description.map((_, dIndex) => (
                                <div
                                  key={dIndex}
                                  className="flex items-center gap-2"
                                >
                                  <Field
                                    name={`projects[${index}].description[${dIndex}]`}
                                    className="w-full border p-2 rounded mt-2"
                                    placeholder="Description"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(dIndex)}
                                    className="text-red-500 hover:cursor-pointer rounded-4xl text-lg"
                                  >
                                    x
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => push("")}
                                className="text-blue-500"
                              >
                                + Add Point
                              </button>
                            </div>
                          )}
                        </FieldArray>

                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500"
                        >
                          Remove Project
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        push({ title: "", description: [""], tech_stack: "" })
                      }
                      className="text-blue-500"
                    >
                      + Add Projects
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
          ) : null}
          {!downloadResume && step == 4 ? (
            <div>
              <FieldArray name="key_skills">
                {({ push, remove }) => (
                  <div>
                    <label className="block font-medium">Key Skills</label>
                    <div className="grid grid-cols-2">
                      {values.key_skills.map((_, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 mb-2"
                        >
                          <Field
                            name={`key_skills[${index}]`}
                            className="border p-2 rounded w-full"
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:cursor-pointer rounded-4xl text-lg mr-4"
                          >
                            x
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push("")}
                        className="text-blue-500 mb-4"
                      >
                        + Add Skill
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
              <div className="space-y-4">
                <FieldArray name="education">
                  {({ push, remove }) => (
                    <div>
                      <label className="text-xl pb-4 font-medium">
                        Education
                      </label>
                      {values.education.map((ed, index) => (
                        <div
                          key={index}
                          className="border p-4 rounded space-y-2 mb-4 shadow-md"
                        >
                          <div className="flex flex-row w-full justify-around gap-2">
                            <div className="w-full">
                              <p className=" font-medium mb-2">Degree</p>
                              <Field
                                name={`education[${index}].degree`}
                                placeholder="Title"
                                className="w-full border p-2 rounded"
                              />
                            </div>
                            <div className="w-full">
                              <p className=" font-medium mb-2">Institution</p>
                              <Field
                                name={`education[${index}].institution`}
                                placeholder="Company"
                                className="w-full border p-2 rounded"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-full justify-around gap-2">
                            <div className="w-full">
                              <p className=" font-medium mb-2">Start Date</p>
                              <Field
                                name={`education[${index}].start_date`}
                                placeholder="Dates"
                                className="w-full border p-2 rounded"
                              />
                            </div>

                            <div className="w-full">
                              <p className=" font-medium mb-2">End Date</p>
                              <Field
                                name={`education[${index}].end_date`}
                                placeholder="Dates"
                                className="w-full border p-2 rounded"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            institution: "",
                            degree: "",
                            start_date: "",
                            end_date: "",
                            cgpa: "",
                            percentage: "",
                          })
                        }
                        className="text-blue-500"
                      >
                        + Add Education
                      </button>
                    </div>
                  )}
                </FieldArray>
                {/* Repeat same for projects, education, certifications, hobbies, languages */}
              </div>
            </div>
          ) : null}
          {!downloadResume && step == 5 ? (
            <div>
              <div className="space-y-4">
                <FieldArray name="certifications">
                  {({ push, remove }) => (
                    <div>
                      <label className="text-xl pb-4 font-medium">
                        Certifications
                      </label>
                      {values.certifications.map((cert, index) => (
                        <div
                          key={index}
                          className="border p-4 rounded space-y-2 mb-4 shadow-md"
                        >
                          <div className="flex flex-row w-full justify-around gap-2">
                            <div className="w-full">
                              <p className=" font-medium mb-2">Title</p>
                              <Field
                                name={`certifications[${index}].title`}
                                placeholder="Title"
                                className="w-full border p-2 rounded"
                              />
                            </div>
                            <div className="w-full">
                              <p className=" font-medium mb-2">Organization</p>
                              <Field
                                name={`certifications[${index}].organization`}
                                placeholder="Company"
                                className="w-full border p-2 rounded"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-full justify-around gap-2">
                            <div className="w-full">
                              <p className=" font-medium mb-2">Start Date</p>
                              <Field
                                name={`certifications[${index}].start_date`}
                                placeholder="Start Date"
                                className="w-full border p-2 rounded"
                              />
                            </div>

                            <div className="w-full">
                              <p className=" font-medium mb-2">End Date</p>
                              <Field
                                name={`certifications[${index}].end_date`}
                                placeholder="End Date"
                                className="w-full border p-2 rounded"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            institution: "",
                            degree: "",
                            start_date: "",
                            end_date: "",
                            cgpa: "",
                            percentage: "",
                          })
                        }
                        className="text-blue-500 mb-4"
                      >
                        + Add Education
                      </button>
                    </div>
                  )}
                </FieldArray>
                {/* Repeat same for projects, education, certifications, hobbies, languages */}
              </div>
              <div className="space-y-4">
                <FieldArray name="hobbies">
                  {({ push, remove }) => (
                    <div>
                      <label className="text-xl font-medium">Hobbies</label>
                      <div className="grid grid-cols-2">
                        {values.hobbies.map((_, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 mb-2"
                          >
                            <Field
                              name={`hobbies[${index}]`}
                              className="border p-2 rounded w-full"
                            />
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 hover:cursor-pointer rounded-4xl text-lg mr-4"
                            >
                              x
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push("")}
                          className="text-blue-500"
                        >
                          + Add Skill
                        </button>
                      </div>
                    </div>
                  )}
                </FieldArray>
                <FieldArray name="languages">
                  {({ push, remove }) => (
                    <div>
                      <label className="text-xl font-medium">Languages</label>
                      <div className="grid grid-cols-2">
                        {values.languages.map((_, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 mb-2"
                          >
                            <Field
                              name={`languages[${index}]`}
                              className="border p-2 rounded w-full"
                            />
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 hover:cursor-pointer rounded-4xl text-lg mr-4"
                            >
                              x
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push("")}
                          className="text-blue-500"
                        >
                          + Add Skill
                        </button>
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>
            </div>
          ) : null}
          {!downloadResume && (
            <div className="flex flex-row w-full justify-center items-center gap-12 mt-6">
              <Button
                className="bg-blue-600 pl-8 pr-8 pt-6 pb-6 "
                onClick={() => setSteps((prev) => prev - 1)}
                disabled={step <= 1}
              >
                Previous
              </Button>
              {step == 5 && (
                <Button
                  className="bg-blue-600 pl-8 pr-8 pt-6 pb-6 "
                  type="submit"
                >
                  Submit
                </Button>
              )}
              <Button
                className="bg-blue-600 pl-8 pr-8 pt-6 pb-6 "
                onClick={() => setSteps((prev) => prev + 1)}
                disabled={step > 4}
              >
                Next
              </Button>
            </div>
          )}
          {downloadResume && (
            <div className="flex flex-col  w-full justify-center items-center gap-12 mt-6">
              <PDFDownloadLink
                document={<ResumeTemplate {...downloadResume} />}
                fileName={`Resume ${initialValues.name}`}
              >
                <Button>Download your generated Resume</Button>
              </PDFDownloadLink>
              <Link href="/">Go Back</Link>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ResumeUploadForm;
