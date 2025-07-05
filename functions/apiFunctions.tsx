import axiosInstance from "../config/axios-instance";

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
  return response.data;
};
