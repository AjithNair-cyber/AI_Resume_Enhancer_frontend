"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";
import Loader from "@/components/Loader";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();

  const initialValues: LoginFormValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      //   .min(6, "Must be at least 6 characters")
      .required("Required"),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (res?.error) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Login successful!");
      // Redirect to upload page after successful login
      setTimeout(() => {
        router.push("/upload");
      }, 500); // Redirect after login
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="bg-white dark:bg-slate-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
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

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {isSubmitting && <Loader />}
                {!isSubmitting && "Login"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
