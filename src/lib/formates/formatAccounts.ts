export const formatAccounts = (totalAudiences: number) => {
  if (totalAudiences === 1) return `حساب واحد`;
  if (totalAudiences === 2) return `حسابان`;
  if (totalAudiences >= 3 && totalAudiences <= 10) return `${totalAudiences} حسابات`;
  return `${totalAudiences} حساب`;
};
