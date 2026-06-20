"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import SelectCity from "@/components/SelectCity/SelectCity";
import { EditUserProfileAction } from "@/lib/Server_Actions/Edit/EditUserProfile.action";
import { useRouter } from "next/navigation";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import FormField from "@/components/FormField/FormField";
import ChangePassword from "./_components/ChangePassword";
import { useForm } from "react-hook-form";
import ModalChangePassword from "./_components/ModalChangePassword";
// ===================================================================================
function Settings({ userSession }: { userSession: User }) {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      name: userSession.name,
      phone: userSession.phone || "",
      address: userSession.address || "",
      city: userSession.city || "",
    },
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const city = watch("city");
  const handleEditProfile = async (data: any) => {
    setLoading(true);
    const result = await EditUserProfileAction({
      ...data,
      userId: userSession.id,
    });
    setLoading(false);
    if (!result.success) return setError(result.message);
    router.refresh();
  };
  const [openChangePassword, setOpenChangePassword] = useState(false);
  return (
    <div className="text-white w-full">
      <form
        onSubmit={handleSubmit(handleEditProfile)}
        className="flex flex-col gap-2 w-full"
      >
        {error && <AlertMessage type="error" message={error} />}
        <FormField
          type="text"
          placeholder="الاسم"
          disabled={loading}
          register={register}
          id="name"
        />
        <h2
          className={`border select-none sm:text-[15px] text-sm bg-white/5 border-gray-50/10 text-gray-500 py-2 cursor-default px-4 rounded-md w-full`}
        >
          {userSession.email}
        </h2>
        <ChangePassword
          setOpenChangePassword={setOpenChangePassword}
          disabled={loading}
        />
        <FormField
          type="number"
          placeholder="رقم الهاتف"
          disabled={loading}
          register={register}
          id="phone"
        />
        <FormField
          type="text"
          placeholder="العنوان"
          disabled={loading}
          register={register}
          id="address"
        />
        <SelectCity value={city} setValue={setValue} disabled={loading} />
        <button
          disabled={loading}
          className="text-white bg-cyan-600 disabled:bg-gray-200 disabled:text-gray-400 py-2 rounded-md not-disabled:cursor-pointer mt-5 mytransition hover:bg-cyan-700 shadow"
        >
          {loading ? "جاري الحفظ . . . " : " حفظ"}
        </button>
      </form>
      {openChangePassword && <ModalChangePassword setOpenChangePassword={setOpenChangePassword}/>}
    </div>
  );
}

export default Settings;
