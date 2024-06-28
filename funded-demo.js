let debug=!1;debug||(console.log=function(){});let IPcountryCode="",formValidated=!0;function dynamicSort(e){var t=1;return"-"===e[0]&&(t=-1,e=e.substr(1)),function(o,n){return -1===t?n[e].localeCompare(o[e]):o[e].localeCompare(n[e])}}document.querySelectorAll('input[type="tel"]').forEach((e,t)=>{e.addEventListener("input",function(){e.value=e.value.replace(/[^0-9]/g,"")})});const emailElement=document.getElementById("email");async function checkEmailValidity(e){try{let t=await fetch("https://forms.hsforms.com/emailcheck/v1/json-ext?portalId=8552073&includeFreemailSuggestions=false",{method:"POST",body:e}),o=await t.json(),n=document.getElementById("email-error");o.emailFree?(n.style.display="block",n.innerText="Please enter your company/business email address.",formValidated=!1):(n.style.display="none",formValidated=!0)}catch(r){console.error("Error checking email:",r),formValidated=!1}return formValidated}localStorage.getItem("resEmail")&&emailElement&&(emailElement.value=localStorage.getItem("resEmail")),emailElement.addEventListener("focusout",e=>{checkEmailValidity(e.target.value)});const number_of_remote_hires=document.getElementById("number_of_remote_hires");if(number_of_remote_hires){let e=new Option("Number of hires","");e.setAttribute("selected","true"),e.setAttribute("disabled","true"),number_of_remote_hires.options[0]=e}const howCanHelpSelect=document.getElementById("how_can_we_help_you_new-input");if(howCanHelpSelect){let t=new Option("How can we help you?","");t.setAttribute("selected","true"),t.setAttribute("disabled","true"),howCanHelpSelect.options[0]=t}const companySize=document.getElementById("company_size");if(companySize){let o=new Option("Company size","");o.setAttribute("selected","true"),o.setAttribute("disabled","true"),companySize.options[0]=o}let dcountries=[],countryCodeSelect=document.getElementById("phone-code-dropdown"),countryName=document.getElementById("countries_you_want_to_enroll");const setCountryCodeOptions=e=>{let t=new Option("Select Country Code",""),o=document.querySelector(".country-loading");countryCodeSelect.options[0]=t,t.setAttribute("selected","true"),t.setAttribute("disabled","true");for(let n=0;n<e.length;n++){let r=`${e[n].label} (${e[n].dial_code})`;countryCodeSelect.options[countryCodeSelect.options.length]=new Option(r,e[n].dial_code)}countryCodeSelect.value="+1",e&&o&&(o.style.display="none")},fetchCountryList=async()=>{try{let e=await fetch("https://storage.googleapis.com/skuad-public-assets/country-list.json"),t=await e.json();dcountries=t.countryList,countryCodeSelect&&setCountryCodeOptions(t.countryList),console.log(dcountries,"countries");let o=t.countryList;o.sort(dynamicSort("label"));let n={label:"Others",dial_code:"",value:"Others"};o.push(n),console.log(o),countryName&&(countryName.innerHTML=o.map(e=>`<option value="${e.label}">${e.label}</option>`).join(""),console.log("<!--------jdjdjd>"),"function"==typeof countryName.loadOptions&&countryName.loadOptions())}catch(r){console.error("Error fetching country list:",r)}};fetchCountryList();const fetchIpInfo=async()=>{try{let e=await fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=c23115da6cf642e59b96f32b9d512a4c"),t=await e.json();t?.country&&(IPcountryCode=t.country.iso_code,countryCodeSelect.value="+"+t.country.phone_code)}catch(o){console.error("Error fetching IP info:",o)}};fetchIpInfo();const _submitHubspotForm=(e,t,o,n,r)=>{let l=document.getElementById("request_demo_submit-btn");l.value="Please wait...",l.disabled=!0,delete e["phone-code"],delete e.ld_field,"Other"==$("#how_can_we_help_you_new-input").val()&&delete e.how_can_we_help_you_new,"undefined"!=typeof growsumo&&growsumo&&growsumo&&growsumo.data&&growsumo.data.partner_key&&(e.partnerstack_partner_key=growsumo.data.partner_key);let a={submittedAt:new Date().getTime(),fields:[],context:{hutk:getCookie("hubspotutk"),pageUri:window.location.href,pageName:document.title}},i=0;for(let s in e)e.hasOwnProperty(s)&&(a.fields[i]={objectTypeId:"0-1",name:s,value:e[s]},i++);"undefined"!=typeof growsumo&&growsumo&&partnerStackSignUp(),console.log(a.fields,"dataJson");let d=a.fields.findIndex(e=>"countries_you_want_to_enroll"==e.name);console.log(d,d),-1!==d&&(a.fields[d].value=$("#countries_you_want_to_enroll").val().toString()),console.log(a.fields,"dataJson"),fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${o}/${n}`,{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify(a)}).then(e=>e.json()).then(o=>{l.value="Submit",o.inlineMessage?(localStorage.setItem("skuadSignupFormData",JSON.stringify({...e,countryCode:t})),localStorage.setItem("isFormSubmitted",!0),"function"!=typeof klentyFormSubmit&&(window.location.href="/book-a-meeting")):"error"===o.status&&"BLOCKED_EMAIL"===o.errors[0].errorType?(document.getElementById("email-error").style.display="block",document.getElementById("email-error").innerText="Please enter your company/business email address."):"error"===o.status&&"INVALID_EMAIL"===o.errors[0].errorType?(document.getElementById("email-error").style.display="block",document.getElementById("email-error").innerText="Please enter your valid email address."):"error"===o.status&&"NUMBER_OUT_OF_RANGE"===o.errors[0].errorType&&(document.getElementById("phone-error").style.display="block",document.getElementById("phone-error").innerText="Please enter valid phone number")}).catch(e=>{l.value="Submit",l.disabled=!1})},hubspotOnSubmit=e=>{e.preventDefault();let t=new FormData(e.target),o=Object.fromEntries(t.entries()),n=IPcountryCode||dcountries.find(e=>e.dial_code===o["phone-code"])?.value;o.phone=o["phone-code"]+o.phone,checkEmailValidity(o.email).then(()=>{formValidated&&(_submitHubspotForm(o,n,"8552073","2b4e05d0-d685-4929-b37c-f961d7db9de5"),"function"==typeof klentyFormSubmit&&klentyFormSubmit("request-demo-api-form"))}),document.getElementById("request-demo-api-form").style.display="block",document.getElementById("hubspot-form-success").style.display="none",document.getElementById("hubspot-form-error").style.display="none"};document.getElementById("request-demo-api-form").addEventListener("submit",hubspotOnSubmit),document.getElementById("request-demo-api-form").addEventListener("change",e=>{document.getElementById(e.target.name+"-error")&&(document.getElementById(e.target.name+"-error").style.display="none"),"email"===e.target.name&&(formValidated=!0)});