import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
// =====================================================================
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const pathname = formData.get("pathname") as string;

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "صيغة رفع الصورة غير صحيحة أو الملف غير موجود" },
        { status: 400 },
      );
    }
    if (!pathname || typeof pathname !== "string" || pathname.trim() === "") {
      return NextResponse.json(
        { error: "برجاء تحديد مسار صحيح لحفظ الصور" },
        { status: 400 },
      );
    }

    const fileBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = `data:${file.type};base64,${base64Data}`;

    const uploadToCloud = await cloudinary.uploader.upload(fileUri, {
      folder: pathname.trim(),
      resource_type: "auto",
    });

    return NextResponse.json({
      success: true,
      url: uploadToCloud.secure_url,
    });
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);
    return NextResponse.json({ error: "فشل رفع الصورة" }, { status: 500 });
  }
}
