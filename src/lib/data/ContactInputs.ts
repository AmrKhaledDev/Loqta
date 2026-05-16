export const contactInputs = ()=>{
    return ([
    {
      id: "fullName",
      label: "إسمك ثلاثي",
      placeholder: "أكتب إسمك ثلاثي",
      type: "text",
      typeField: "input",
    },
    {
      id: "email",
      label: "بريدك الإلكتروني",
      placeholder: "أكتب بريدك الإلكتروني",
      type: "email",
      typeField: "input",
    },
    {
      id: "phone",
      label: "رقم الهاتف",
      placeholder: "أكتب رقم هاتفك",
      type: "number",
      typeField: "input",
    },
    {
      id: "phone2",
      label: "رقم هاتف آخر ( إختياري )",
      placeholder: "أكتب رقم هاتف أخرى ",
      type: "number",
      typeField: "input",
    },
    {
      id: "message",
      label: "رسالتك :",
      placeholder: "أكتب رسالتك / شكوتك وسنرد عليك في أسرع وقت",
      type: "text",
      typeField: "textarea",
    },
  ])
}