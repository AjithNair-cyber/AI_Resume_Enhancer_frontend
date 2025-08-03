import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "flowbite-react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useState } from "react";
import ResumeTemplate from "./ResumeTemplate";
import Link from "next/link";
import * as Yup from "yup";

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
  console.log("ENHANCED RESUME ", resume);
  const initialValues: ResumeData = resume || initialResumeData;
  const [step, setSteps] = useState<number>(1);
  const [downloadResume, setDownloadResume] = useState<ResumeData | null>(null);
  const [stepError, setStepError] = useState<string>("");

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    job_role: Yup.string().required("Job role is required"),
    mobile: Yup.string().matches(
      /^\+?[0-9]{10,15}$/,
      "Enter a valid mobile number"
    ),
    email: Yup.string().email("Invalid email").required("Email is required"),
    linkedin: Yup.string().url("Enter a valid LinkedIn URL"),
    github: Yup.string().url("Enter a valid GitHub URL"),
    professional_summary: Yup.string()
      .min(30, "Summary should be at least 30 characters")
      .required("Professional summary is required"),
    experience: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().required("Title is required"),
          company: Yup.string().required("Company is required"),
          start_date: Yup.string().required("Start date is required"),
          end_date: Yup.string().required("End date is required"),
          description: Yup.array().of(
            Yup.string().required("Description point is required")
          ),
        })
      )
      .min(1, "At least one skill is required"),

    projects: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().required("Project title is required"),
          tech_stack: Yup.string(),
          description: Yup.array().of(
            Yup.string().required("Project description point is required")
          ),
        })
      )
      .min(1, "At least one project is required"),

    key_skills: Yup.array()
      .of(Yup.string().required("Skill cannot be empty"))
      .min(1, "At least one skill is required"),

    education: Yup.array()
      .of(
        Yup.object().shape({
          institution: Yup.string().required("Institution is required"),
          degree: Yup.string().required("Degree is required"),
          start_date: Yup.string().required("Start date is required"),
          end_date: Yup.string().required("End date is required"),
          cgpa: Yup.string(),
          percentage: Yup.string(),
        })
      )
      .min(1, "At least one education is required"),

    certifications: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Certification title is required"),
        organization: Yup.string().required("Organization is required"),
        start_date: Yup.string().required("Start date is required"),
        end_date: Yup.string().required("End date is required"),
      })
    ),

    hobbies: Yup.array().of(Yup.string().required("Hobby cannot be empty")),
    languages: Yup.array().of(
      Yup.string().required("Language cannot be empty")
    ),
  });

  const stepFieldMap = {
    1: [
      "name",
      "job_role",
      "mobile",
      "email",
      "linkedin",
      "github",
      "professional_summary",
    ],
    2: ["experience"],
    3: ["projects"],
    4: ["key_skills", "education"],
    5: ["certifications", "hobbies", "languages"],
  };

  return (
    <div>
      {initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount={true}
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={(values, actions) => {
            console.log({ values });
            setDownloadResume({ ...values });
            actions.setSubmitting(false);
          }}
          enableReinitialize={true}
        >
          {({ values, validateForm, errors }) => (
            <Form className="w-7/8 mx-auto my-6 p-12 bg-white dark:bg-slate-800 rounded shadow ">
              <h1 className="text-2xl font-bold mb-4">Resume Builder</h1>
              {!downloadResume && step == 1 ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-xl font-medium">Full Name*</p>
                    <Field
                      name="name"
                      placeholder="Name"
                      className="w-full border p-2 rounded"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xl font-medium">Job Role*</p>
                    <Field
                      name="job_role"
                      placeholder="Job Role"
                      className="w-full border p-2 rounded"
                    />
                    {errors.job_role && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.job_role}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-xl font-medium">Email*</p>
                    <Field
                      name="email"
                      placeholder="Email"
                      className="w-full border p-2 rounded"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-xl font-medium">Mobile Number</p>
                    <span className="text-sm">(without country code)</span>
                    <Field
                      name="mobile"
                      placeholder="Mobile"
                      className="w-full border p-2 rounded"
                    />
                    {errors.mobile && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.mobile}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-xl font-medium">Linkedin Profile</p>
                    <Field
                      name="linkedin"
                      placeholder="LinkedIn"
                      className="w-full border p-2 rounded"
                    />
                    {errors.linkedin && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.linkedin}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-xl font-medium">Github Account</p>
                    <Field
                      name="github"
                      placeholder="GitHub"
                      className="w-full border p-2 rounded"
                    />
                    {errors.github && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.github}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-xl font-medium">Professional Summary*</p>
                    <Field
                      as="textarea"
                      name="professional_summary"
                      placeholder="Professional Summary"
                      className="w-full border p-2 rounded"
                      rows={5}
                    />
                    {errors.professional_summary && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.professional_summary}
                      </p>
                    )}
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
                                <p className=" font-medium mb-2">Job Role*</p>
                                <Field
                                  name={`experience[${index}].title`}
                                  placeholder="Job Role"
                                  className="w-full border p-2 rounded"
                                />
                                <ErrorMessage
                                  name={`experience[${index}].title`}
                                  component="div"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>
                              <div className="w-full">
                                <p className=" font-medium mb-2">Company*</p>
                                <Field
                                  name={`experience[${index}].company`}
                                  placeholder="Company"
                                  className="w-full border p-2 rounded"
                                />
                                <ErrorMessage
                                  name={`experience[${index}].company`}
                                  component="div"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>
                            </div>
                            <div className="flex flex-row w-full justify-around gap-2">
                              <div className="w-full">
                                <p className=" font-medium mb-2">Start Date*</p>
                                <Field
                                  name={`experience[${index}].start_date`}
                                  placeholder="Start Date"
                                  className="w-full border p-2 rounded"
                                />
                                <ErrorMessage
                                  name={`experience[${index}].start_date`}
                                  component="div"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>

                              <div className="w-full">
                                <p className=" font-medium mb-2">End Date*</p>
                                <Field
                                  name={`experience[${index}].end_date`}
                                  placeholder="End Date"
                                  className="w-full border p-2 rounded"
                                />
                                <ErrorMessage
                                  name={`experience[${index}].end_date`}
                                  component="div"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>
                            </div>
                            <p className=" font-medium ">Description</p>
                            <FieldArray
                              name={`experience[${index}].description`}
                            >
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
                                        placeholder="Add a description or remove the row by clicking on the cross on the right"
                                      />
                                      <ErrorMessage
                                        name={`experience[${index}].description[${dIndex}]`}
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
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
                        {errors.experience &&
                          !Array.isArray(errors.experience) && (
                            <p className="text-red-500 text-sm mt-1">
                              At atleast one experience is required
                            </p>
                          )}
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
                                <p className=" font-medium mb-2">Title*</p>
                                <Field
                                  name={`projects[${index}].title`}
                                  placeholder="Title"
                                  className="w-full border p-2 rounded"
                                />
                                <ErrorMessage
                                  name={`projects[${index}].title]`}
                                  component="div"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>
                            </div>
                            <div className="flex flex-row w-full justify-around gap-2">
                              <div className="w-full">
                                <p className=" font-medium mb-2">Tech Stack</p>
                                <Field
                                  name={`projects[${index}].tech_stack`}
                                  placeholder="Tech Stack"
                                  className="w-full border p-2 rounded"
                                />
                                <ErrorMessage
                                  name={`projects[${index}].tech_stack]`}
                                  component="div"
                                  className="text-red-500 text-sm mt-1"
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
                                        placeholder="Add a description or delete the row by clicking on the right cross button"
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
                            push({
                              title: "",
                              description: [""],
                              tech_stack: "",
                            })
                          }
                          className="text-blue-500"
                        >
                          + Add Projects
                        </button>
                      </div>
                    )}
                  </FieldArray>
                  {errors.projects && !Array.isArray(errors.projects) && (
                    <p className="text-red-500 text-sm mt-1">
                      At atleast one project is required
                    </p>
                  )}
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
                          {errors.key_skills && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.key_skills}
                            </p>
                          )}
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
                          {values.education.map((_, index) => (
                            <div
                              key={index}
                              className="border p-4 rounded space-y-2 mb-4 shadow-md"
                            >
                              <div className="flex flex-row w-full justify-around gap-2">
                                <div className="w-full">
                                  <p className=" font-medium mb-2">Degree*</p>
                                  <Field
                                    name={`education[${index}].degree`}
                                    placeholder="Title"
                                    className="w-full border p-2 rounded"
                                  />
                                  <ErrorMessage
                                    name={`education[${index}].degree`}
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                  />
                                </div>
                                <div className="w-full">
                                  <p className=" font-medium mb-2">
                                    Institution*
                                  </p>
                                  <Field
                                    name={`education[${index}].institution`}
                                    placeholder="Instituion"
                                    className="w-full border p-2 rounded"
                                  />
                                  <ErrorMessage
                                    name={`education[${index}].institution`}
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-row w-full justify-around gap-2">
                                <div className="w-full">
                                  <p className=" font-medium mb-2">
                                    Start Date*
                                  </p>
                                  <Field
                                    name={`education[${index}].start_date`}
                                    placeholder="Start Date"
                                    className="w-full border p-2 rounded"
                                  />
                                  <ErrorMessage
                                    name={`education[${index}].start_date`}
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                  />
                                </div>

                                <div className="w-full">
                                  <p className=" font-medium mb-2">End Date*</p>
                                  <Field
                                    name={`education[${index}].end_date`}
                                    placeholder="End Date"
                                    className="w-full border p-2 rounded"
                                  />
                                  <ErrorMessage
                                    name={`education[${index}].end_date`}
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                  />
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-500"
                              >
                                Remove Education
                              </button>
                            </div>
                          ))}
                          {errors.education && (
                            <p className="text-red-500 text-sm mt-1">
                              At atleast one education is required
                            </p>
                          )}
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
                          {values.certifications.map((_, index) => (
                            <div
                              key={index}
                              className="border p-4 rounded space-y-2 mb-4 shadow-md"
                            >
                              <div className="flex flex-row w-full justify-around gap-2">
                                <div className="w-full">
                                  <p className=" font-medium mb-2">Title*</p>
                                  <Field
                                    name={`certifications[${index}].title`}
                                    placeholder="Title"
                                    className="w-full border p-2 rounded"
                                  />
                                </div>
                                <div className="w-full">
                                  <p className=" font-medium mb-2">
                                    Organization*
                                  </p>
                                  <Field
                                    name={`certifications[${index}].organization`}
                                    placeholder="Organization"
                                    className="w-full border p-2 rounded"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-row w-full justify-around gap-2">
                                <div className="w-full">
                                  <p className=" font-medium mb-2">
                                    Start Date*
                                  </p>
                                  <Field
                                    name={`certifications[${index}].start_date`}
                                    placeholder="Start Date"
                                    className="w-full border p-2 rounded"
                                  />
                                </div>

                                <div className="w-full">
                                  <p className=" font-medium mb-2">End Date*</p>
                                  <Field
                                    name={`certifications[${index}].end_date`}
                                    placeholder="End Date"
                                    className="w-full border p-2 rounded"
                                  />
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-500"
                              >
                                Remove Certification
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              push({
                                title: "",
                                start_date: "",
                                end_date: "",
                                organization: "",
                              })
                            }
                            className="text-blue-500 mb-4"
                          >
                            + Add Certification
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
                                <ErrorMessage
                                  name={`hobbies[${index}]`}
                                  component="div"
                                  className="text-red-500 text-sm mt-1"
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
                              + Add Hobbies
                            </button>
                          </div>
                        </div>
                      )}
                    </FieldArray>
                    <FieldArray name="languages">
                      {({ push, remove }) => (
                        <div>
                          <label className="text-xl font-medium">
                            Languages
                          </label>
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
                                <ErrorMessage
                                  name={`languages[${index}]`}
                                  component="div"
                                  className="text-red-500 text-sm mt-1"
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
                              + Add Language
                            </button>
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>
              ) : null}
              {!downloadResume && (
                <div className="flex flex-col justify-center items-center gap-4">
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
                        onClick={async () => {
                          const allErrors = await validateForm();
                          const fieldsToCheck: string[] =
                            stepFieldMap[step as keyof typeof stepFieldMap];
                          const stepHasError = fieldsToCheck.some((field) =>
                            Object.keys(allErrors).some((errKey) =>
                              errKey.startsWith(field)
                            )
                          );

                          if (stepHasError) {
                            console.log(allErrors);
                            setStepError(
                              "Please fill all the mandatory fields marked with * in this step before continuing."
                            );
                            return;
                          } else {
                            setStepError("");
                          }
                        }}
                      >
                        Submit
                      </Button>
                    )}
                    <Button
                      className="bg-blue-600 pl-8 pr-8 pt-6 pb-6 "
                      onClick={async () => {
                        const allErrors = await validateForm();
                        const fieldsToCheck: string[] =
                          stepFieldMap[step as keyof typeof stepFieldMap];
                        const stepHasError = fieldsToCheck.some((field) =>
                          Object.keys(allErrors).some((errKey) =>
                            errKey.startsWith(field)
                          )
                        );

                        if (stepHasError) {
                          console.log(allErrors);
                          setStepError(
                            "Please fill all the mandatory fields marked with * in this step before continuing."
                          );
                          return;
                        } else {
                          setStepError("");
                        }

                        setSteps((prev) => prev + 1);
                      }}
                      disabled={step > 4}
                    >
                      Next
                    </Button>
                  </div>

                  {stepError && (
                    <p className="font-medium text-red-600 justify-center">
                      {stepError}
                    </p>
                  )}
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
                  <Link href="/" className="text-blue-600 underline">
                    Go Back
                  </Link>
                </div>
              )}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ResumeUploadForm;
