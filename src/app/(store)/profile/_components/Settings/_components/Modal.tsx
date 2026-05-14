"use client";
import FloatingIconButton from "@/components/FloatingIconButton/FloatingIconButton";
import SettingsFormField from "./SettingsFormField";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { ChangePasswordSchema } from "@/lib/Zod_Schemas/Auth_Schemas/ChangePassword.schema";
import { ChangePasswordAction } from "@/lib/Server_Actions/Auth_Actions/ChangePassword.action";
import { toast } from "react-toastify";
import { Repeat2 } from "lucide-react";
// ======================================================
interface Errors {
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
}
function Modal({ setModal }: { setModal: Dispatch<SetStateAction<boolean>> }) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrros] = useState<Errors>({});
  const router = useRouter();
  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setErrros({});
    const validation = ChangePasswordSchema.safeParse({
      password,
      newPassword,
      confirmPassword,
    });
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrros({
        password: fieldErrors.password?.[0],
        newPassword: fieldErrors.newPassword?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });
      return;
    }
    setLoading(true);
    const result = await ChangePasswordAction({
      password,
      newPassword,
      confirmPassword,
    });
    setLoading(false);
    if (!result.success)
      return toast.error(result.message, { className: "toast-font" });
    setModal(false);
    toast.success(result.message, { className: "toast-font" });
    router.refresh();
  };
  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur z-60 flex items-center justify-center">
      <div className="ring ring-gray-50/30 boxChangePassword bg-white/10 rounded-2xl md:w-120 sm:w-[60%] w-[80%] p-4">
        <div onSubmit={handleChangePassword} className="flex flex-col gap-3">
          <SettingsFormField
            type="password"
            id="password"
            placeholder="أكتب كلمة السر الحالية"
            label="كلمة السر الحالية"
            value={password}
            onChange={setPassword}
            disbaled={loading}
            error={errors.password}
          />
          <SettingsFormField
            type="password"
            id="newPassword"
            placeholder="أكتب كلمة السر الجديدة"
            label="كلمة السر الجديدة"
            value={newPassword}
            onChange={setNewPassword}
            disbaled={loading}
            error={errors.newPassword}
          />
          <SettingsFormField
            type="password"
            id="confirmPassword"
            placeholder="تأكيد كلمة السر"
            label="تأكيد كلمة السر"
            value={confirmPassword}
            onChange={setConfirmPassword}
            disbaled={loading}
            error={errors.confirmPassword}
          />
          <FloatingIconButton
            bgColor="bg-indigo-500"
            label="تغيير كلمة السر"
            textColor="text-indigo-500"
            Icon={Repeat2}
            loading={loading}
            loadingText="جاري تغيير كلمة السر . . ."
            handle={handleChangePassword}
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
