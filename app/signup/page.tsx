"use client";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signUp } from "@/functions/apiFunctions";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import { Button } from "flowbite-react";

const SignupPage = () => {
  const router = useRouter();
  const initialValues: SignupFormValues = { name: "", email: "", password: "" };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Must be at least 2 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
  });

  const handleSubmit = async (values: SignupFormValues) => {
    try {
      // Send values to your backend here
      await signUp(values);
      toast.success("Signup successful!");
      // Redirect to signin page after successful signup
      setTimeout(() => {
        router.push("/signin");
      }, 500);
    } catch (err) {
      if (typeof err === "object" && err !== null && "response" in err) {
        // @ts-expect-error: err.response may exist if this is an Axios error
        // setError(err.response?.data?.data);
        toast.error(err.response?.data?.data);
      } else {
        toast.error("Signup failed");
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white dark:bg-slate-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Name */}
              <div>
                <label>Name</label>
                <Field
                  name="name"
                  type="text"
                  className="w-full border rounded px-3 py-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label>Email</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full border rounded px-3 py-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label>Password</label>
                <Field
                  name="password"
                  type="password"
                  className="w-full border rounded px-3 py-2"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {isSubmitting && <Loader />}
                {!isSubmitting && "Sign Up"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupPage;
