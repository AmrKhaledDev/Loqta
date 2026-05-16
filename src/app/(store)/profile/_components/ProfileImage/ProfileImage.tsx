"use client";
import { User } from "@prisma/client";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import SaveImageButton from "./_components/SaveImageButton";
import DeleteImageButton from "./_components/DeleteImageButton";
// =============================================
function ProfileImage({ userSession }: { userSession: User }) {
  const [imagePrev, setImagePrev] = useState(userSession.image || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (imagePrev) URL.revokeObjectURL(imagePrev);
      const url = URL.createObjectURL(file);
      setImagePrev(url);
      setImageFile(file);
      e.target.value = "";
    }
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="md:size-40 size-30 relative rounded-full ">
        {imagePrev ? (
          <>
            <Image
              src={imagePrev}
              alt="profile image"
              fill
              className="object-cover rounded-full "
            />
            <DeleteImageButton
              imageFile={imageFile}
              setImageFile={setImageFile}
              setImagePrev={setImagePrev}
            />
            <span className="absolute inset-0 bg-black/20 z-30 rounded-full " />
          </>
        ) : (
          <label
            htmlFor="profile_image"
            className="ring cursor-pointer size-full rounded-full hover:bg-white/20 mytransition ring-gray-50/40 backdrop-blur-2xl bg-white/10 flex items-center justify-center text-white"
          >
            <CameraIcon className="md:size-7 size-5" />
          </label>
        )}
        <input
          onChange={handleChange}
          type="file"
          hidden
          className="hidden"
          id="profile_image"
        />
      </div>
      {imageFile && (
        <SaveImageButton imageFile={imageFile} setImageFile={setImageFile} />
      )}
    </div>
  );
}

export default ProfileImage;
