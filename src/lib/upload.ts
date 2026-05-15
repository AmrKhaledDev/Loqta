import axios from "axios";
// ==================================================================
export const upload = async (
  imageFile: File,
): Promise<{ url: string } | { error: string }> => {
  try {
    if (!imageFile || !(imageFile instanceof File))
      return { error: "برجاء رفع صورة " };
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("pathname", "Loqta-products-images");
    const res = await axios.post("/api/uploader", formData);
    return res.data;
  } catch (error) {
    return { error: "حدث خطأ أثناء رفع الصور" };
  }
};
