const pdfFormDefaultSeccess=document.getElementById("download-pdf-form-success");async function downloadPDF(){let e=document.querySelector(".when-get-error");document.getElementById("download-pdf-form-success").style.display="none";let t=document.getElementById("resp-download-pdf"),d=document.querySelector(".when-pdf-downloading"),a=document.querySelector(".when-pdf-downloaded"),l=t.dataset.country,o=t.dataset.salary,n=t.dataset.currency,s=t.dataset.province,r=t.dataset.isexpat;"true"===r?r=!0:"false"===r&&(r=!1);let i=t.dataset.countryName;try{let p=new Headers;p.append("Content-Type","application/json");let m={countryCode:l,currencyCode:n,salary:o,client:"website"};s?m.provinceCode=s:delete m.provinceCode,!0===r||!1===r?m.isExpat=r:delete m.isExpat;let y=JSON.stringify({salaryInput:[m]}),c=await fetch("https://cost-calculator.skuad.io/cost-calculator/pdf",{method:"POST",headers:p,body:y,credentials:"omit"});e.style.display="none",d.style.display="block";let f=await c.blob(),u=window.URL.createObjectURL(new Blob([f])),w=document.createElement("a");w.classList.add("download-pdf-link"),w.href=u,w.download=`cost-to-hire-talent-in-${i}.pdf`,document.body.appendChild(w),w.click(),d.style.display="none",a.style.display="block",document.body.removeChild(w),window.URL.revokeObjectURL(u)}catch(b){e.style.display="block",d.style.display="none",a.style.display="none"}}const exitPopupNew=document.getElementById("exitPopup-pdf");let newformValidatedPdf=!0;async function checkEmailValidity(e){try{let t=await fetch("https://forms.hsforms.com/emailcheck/v1/json-ext?portalId=8552073&includeFreemailSuggestions=false",{method:"POST",body:e}),d=await t.json(),a=document.getElementById("dwpdf-email-error");d.emailFree?(a.style.display="block",a.innerText="Please enter your company/business email address.",newformValidatedPdf=!1):(a.style.display="none",newformValidatedPdf=!0)}catch(l){newformValidatedPdf=!1}return newformValidatedPdf}const downloadpdfBtn=document.getElementById("resp-download-pdf-more"),new_submitHubspotFormPdf=(e,t,d,a)=>{document.getElementById("download_pdf_submit_btn").value="Please wait...";let l={submittedAt:new Date().getTime(),fields:[],context:{hutk:getCookie("hubspotutk"),pageUri:window.location.href,pageName:document.title}},o=0;for(let n in e)e.hasOwnProperty(n)&&(l.fields[o]={objectTypeId:"0-1",name:n,value:e[n]},o++);fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${t}/${d}`,{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify(l)}).then(e=>e.json()).then(e=>{if(document.getElementById("download_pdf_submit_btn").value="Submit",e.inlineMessage){downloadPDF(),document.querySelector(".when-pdf-downloading").style.display="block";let t=document.querySelector(".e-mail-submit-wrapper");t.style.display="none"}else"error"===e.status&&"BLOCKED_EMAIL"===e.errors[0].errorType?(document.getElementById("dwpdf-email-error").style.display="block",document.getElementById("dwpdf-email-error").innerText="Please enter your company/business email address."):"error"===e.status&&"INVALID_EMAIL"===e.errors[0].errorType&&(document.getElementById("dwpdf-email-error").style.display="block",document.getElementById("dwpdf-email-error").innerText="Please enter your valid email address.")}).catch(e=>{document.getElementById("download_pdf_submit_btn").value="Submit"})},newhubspotOnSubmitPdf=e=>{e.preventDefault(),document.getElementById("download-pdf-form-success").style.display="none";let t=new FormData(e.target),d=Object.fromEntries(t.entries());checkEmailValidity(d.email).then(()=>{newformValidatedPdf&&new_submitHubspotFormPdf(d,"8552073","5d5b2e68-ea4f-4334-aa2a-55ebec04b2fd")}),pdfFormDefaultSeccess.classList.add("default-pdf-form-success"),document.getElementById("download-pdf-form").style.display="flex",document.getElementById("download-pdf-form-error").style.display="none"};document.getElementById("download-pdf-form").addEventListener("submit",newhubspotOnSubmitPdf),document.getElementById("download-pdf-form").addEventListener("change",e=>{document.getElementById(e.target.name+"-error")&&(document.getElementById(e.target.name+"-error").style.display="none"),"email"===e.target.name&&(newformValidatedPdf=!0)});
