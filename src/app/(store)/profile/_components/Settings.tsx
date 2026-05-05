"use client";

import { FormEvent, useState } from "react";
import { User } from "@prisma/client";
import SelectCity from "@/components/SelectCity/SelectCity";
import { EditUserProfileAction } from "@/lib/Server_Actions/Edit/EditUserProfile.action";
import { useRouter } from "next/navigation";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import FormField from "@/components/FormField/FormField";
// ===================================================================================
function Settings({ userSession }: { userSession: User }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(userSession.name || "");
  const [phone, setPhone] = useState(userSession.phone || "");
  const [address, setAddress] = useState(userSession.address || "");
  const [city, setCity] = useState(userSession.city || "");
  const router = useRouter();
  const handleEditProfile = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await EditUserProfileAction({
      name,
      address,
      city,
      phone,
      userId: userSession.id,
    });
    setLoading(false);
    if (!result.success) return setError(result.message);
    router.refresh();
  };
  return (
    <form
      onSubmit={handleEditProfile}
      className="flex flex-col gap-2 text-white w-125"
    >
      {error && <AlertMessage type="error" message={error} />}
      <FormField
        type="text"
        placeholder="الاسم"
        value={name}
        onChange={setName}
        disabled={loading}
      />
      <FormField
        type="email"
        placeholder="البريد الالكتروني"
        value={userSession.email}
        onChange={setName}
        disabled={true}
      />
      <div className="text-white flex items-center gap-5 py-3">
        <h2>كلمة السر : ********</h2>
        <button disabled={loading} className="text-white disabled:text-gray-600 mytransition not-disabled:hover:bg-white/15 ring ring-gray-50/20 bg-white/5 py-2 px-6 text-xs not-disabled:cursor-pointer rounded-md">
          تغيير كلمة السر
        </button>
      </div>
      <FormField
        type="number"
        placeholder="رقم الهاتف"
        value={Number(phone)}
        onChange={setPhone}
        disabled={loading}
      />
      <FormField
        type="text"
        placeholder="العنوان"
        value={address}
        onChange={setAddress}
        disabled={loading}
      />
      <SelectCity city={city} setCity={setCity} disabled={loading} />
      <button
        disabled={loading}
        className="text-white bg-cyan-600 disabled:bg-gray-200 disabled:text-gray-400 py-2 rounded-md not-disabled:cursor-pointer mt-5 mytransition hover:bg-cyan-700 shadow"
      >
        {loading ? "جاري الحفظ . . . " : " حفظ"}
      </button>
    </form>
  );
}

export default Settings;
