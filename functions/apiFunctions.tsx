import getAxiosClient from "@/config/axios-instance";

const axiosInstance = getAxiosClient();

export const getHello = async (): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.get("/hello");
    return response.data;
  } catch (error) {
    console.error("Error fetching hello:", error);
    throw error;
  }
};

export const uploadResume = async (formdata: FormData): Promise<ResumeData> => {
  const response = await axiosInstance.post("/upload", formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data?.data;
};

export const signUp = async (values: SignupFormValues): Promise<void> => {
  const response = await axiosInstance.post("/signup", values);
  return response.data;
};

export const saveResume = async (resume: ResumeData): Promise<void> => {
  const response = await axiosInstance.post("/save", resume);
  return response.data;
};
