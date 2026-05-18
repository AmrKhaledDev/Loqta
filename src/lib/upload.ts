import axios from "axios";
// ==================================================================
export const upload = async (
  imageFile: File | FileList,
): Promise<{ url: string } | { error: string }> => {
  try {
    const file = imageFile instanceof FileList ? imageFile.item(0) : imageFile;
    if (!file || !(file instanceof File)) return { error: "برجاء رفع صورة " };
    const formData = new FormData();
    formData.append("file", file);
    formData.append("pathname", "Loqta-products-images");
    const res = await axios.post("/api/uploader", formData);
    return res.data;
  } catch (error) {
    return { error: "حدث خطأ أثناء رفع الصور" };
  }
};
