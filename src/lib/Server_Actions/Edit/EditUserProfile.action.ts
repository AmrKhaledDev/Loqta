"use server";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
// =====================================
interface Data {
  name?: string;
  address?: string;
  city?: string;
  phone?: string;
  userId: string;
}
export const EditUserProfileAction = async (
  data: Data,
): Promise<{ success: boolean; message: string }> => {
  try {
    const { name, address, userId, phone, city } = data;
    if (!userId)
      return { success: false, message: "برجاء تسجيل الدخول لتعديل بياناتك" };
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: { id: true, name: true, address: true, city: true, phone: true },
    });
    if (!user) return { success: false, message: "فشل تعديل بياناتك" };
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name || user.name,
        address: address || user.address,
        city: city || user.city,
        phone: phone || user.phone,
      },
    });
    revalidateTag("users", "");
    revalidateTag("admins", "");
    return { success: true, message: "تم تعديل بياناتك بنجاح" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "حدث خطأ أثناء تعديل بياناتك حاول مرة أُخرى",
    };
  }
};
