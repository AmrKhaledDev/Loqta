import FormResetPassword from "./_components/FormResetPassword";
// =====================================================
async function ResetPassword({
  params,
}: {
  params: Promise<{ verificationToken: string }>;
}) {
  const { verificationToken } = await params;
  return (
    <main className="min-h-[90vh] flex items-center justify-center">
      <FormResetPassword verificationToken={verificationToken} />
    </main>
  );
}

export default ResetPassword;
