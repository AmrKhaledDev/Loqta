"use server";
import { prisma } from "@/lib/prisma";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { revalidateTag } from "next/cache";
// ==================================
export const CategoryAction = async (
  type: "edit" | "create" | "delete",
  content?: string,
  categoryId?: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const userSession = await GetUserSession();
    if (!userSession)
      return {
        success: false,
        message: "برجاء تسجيل الدخول لإنشاء صنف جديد أو تعديله",
      };
    if (userSession.role !== "ADMIN")
      return {
        success: false,
        message: "ليس لديك صلاحية لتنفيذ هذا الإجراء",
      };
    if (type !== "delete" && (!content || content.trim().length < 2))
      return { success: false, message: "برجاء كتابة إسم صنف صالح" };

    const existingName = await prisma.category.findFirst({
      where: {
        name: content,
        ...(type === "edit" && categoryId && { NOT: { id: categoryId } }),
      },
      select: { id: true },
    });
    if (existingName)
      return {
        success: false,
        message: "إسم الصنف مستخدم بالفعل برجاء تغييره او حذف المشابه",
      };
    if (type === "create") {
      await prisma.category.create({
        data: {
          name: content!,
        },
      });
    }
    if (type === "delete" || type === "edit") {
      if (!categoryId)
        return { success: false, message: "حدث خطأالصنف غير موجود" };
      const existingCategory = await prisma.category.findUnique({
        where: {
          id: categoryId,
        },
        select: {
          id: true,
          name: true,
        },
      });
      if (!existingCategory)
        return { success: false, message: "هذا الصنف غير موجود " };
      else if (type === "edit") {
        await prisma.category.update({
          where: {
            id: existingCategory.id,
          },
          data: {
            name: content,
          },
        });
      } else if (type === "delete") {
        await prisma.category.delete({
          where: {
            id: categoryId,
          },
        });
      }
    }
    revalidateTag("categories", "");
    revalidateTag("categoriesDash", "");
    return {
      success: true,
      message: `
      ${
        type === "edit"
          ? "تم تعديل اسم الصنف بنجاح"
          : type === "create"
            ? "تم إنشاء صنف جديد"
            : "تم حذف هذا الصنف"
      }`,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "حدث خطأ غير متوقع",
    };
  }
};
