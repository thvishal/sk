let pdebug=!1,globalCookie="globalCookie";function setCookiee(e,t,o,n){let r=new Date;r.setTime(r.getTime()+864e5*o);let i="expires="+r.toUTCString();document.cookie=e+"="+t+";"+i+";path="+n}function getCookiee(e){let t=e+"=",o=document.cookie.split(";");for(let n=0;n<o.length;n++){let r=o[n];for(;" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return""}pdebug||(console.log=function(){}),document.querySelectorAll('input[type="tel"]').forEach((e,t)=>{e.addEventListener("input",function(){e.value=e.value.replace(/[^0-9]/g,"")})}),-1!==window.location.href.indexOf("employer-of-record")?document.getElementById("prequest_demo_submit-btn").value="Talk to our expert":document.getElementById("prequest_demo_submit-btn").value="Get started";let pIPcountryCode="",pformValidated=!0;function pemailCheck(e){return fetch(" https://forms.hsforms.com/emailcheck/v1/json-ext?portalId=8552073&includeFreemailSuggestions=false",{method:"POST",body:e}).then(e=>e.json()).then(e=>{e.emailFree?(document.getElementById("pemail-error").style.display="block",document.getElementById("pemail-error").innerText="Please enter your company/business email address.",pformValidated=!1):(document.getElementById("pemail-error").style.display="none",pformValidated=!0)})}document.getElementById("pemail").addEventListener("focusout",e=>{pemailCheck(e.target.value)});let phowCanHelpSelect=document.getElementById("phow_can_we_help_you_new-input");if(phowCanHelpSelect){let e=new Option("How can we help you?","");e.setAttribute("selected","true"),e.setAttribute("disabled","true"),phowCanHelpSelect.options[0]=e}let pcountries=[],pcountryCodeSelect=document.getElementById("pphone-code-dropdown");fetch("https://storage.googleapis.com/skuad-public-assets/country-list.json",{crossDomain:!0,headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},method:"GET"}).then(e=>e.json()).then(e=>{if(pcountries=e.countryList,pcountryCodeSelect){let t=new Option("Select Country Code","");pcountryCodeSelect.options[0]=t,t.setAttribute("selected","true"),t.setAttribute("disabled","true");for(let o=0;o<e.countryList.length;o++){let n=`${e.countryList[o].label} (${e.countryList[o].dial_code})`;console.log(pcountryCodeSelect.options.length),pcountryCodeSelect.options[pcountryCodeSelect.options.length]=new Option(n,e.countryList[o].dial_code)}pcountryCodeSelect.value="+1"}}),fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=c23115da6cf642e59b96f32b9d512a4c",{crossDomain:!0,headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},method:"GET"}).then(e=>e.json()).then(e=>{e?.country&&(pIPcountryCode=e.country.iso_code,pcountryCodeSelect.value="+"+e.country.phone_code)}).catch();const _psubmitHubspotForm=(e,t,o,n,r)=>{document.getElementById("prequest_demo_submit-btn").value="Please wait...",delete e["phone-code"],"Other"==$("#phow_can_we_help_you_new-input").val()&&delete e.how_can_we_help_you_new;let i={submittedAt:new Date().getTime(),fields:[],context:{hutk:getCookie("hubspotutk"),pageUri:window.location.href,pageName:document.title}},l=0;for(let s in e)e.hasOwnProperty(s)&&(i.fields[l]={objectTypeId:"0-1",name:s,value:e[s]},l++);fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${o}/${n}`,{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify(i)}).then(e=>e.json()).then(o=>{-1!==window.location.href.indexOf("employer-of-record")?document.getElementById("prequest_demo_submit-btn").value="Talk to our expert":document.getElementById("prequest_demo_submit-btn").value="Get started",o.inlineMessage?(localStorage.setItem("skuadSignupFormData",JSON.stringify({...e,countryCode:t})),hideExitPopup(),setCookiee(globalCookie,"true",1,"/"),"function"!=typeof klentyFormSubmit&&(window.location.href="/book-a-meeting")):"error"===o.status&&"BLOCKED_EMAIL"===o.errors[0].errorType?(document.getElementById("pemail-error").style.display="block",document.getElementById("pemail-error").innerText="Please enter your company/business email address."):"error"===o.status&&"INVALID_EMAIL"===o.errors[0].errorType?(document.getElementById("pemail-error").style.display="block",document.getElementById("pemail-error").innerText="Please enter your valid email address."):"error"===o.status&&"NUMBER_OUT_OF_RANGE"===o.errors[0].errorType&&(document.getElementById("pphone-error").style.display="block",document.getElementById("pphone-error").innerText="Please enter valid phone number")}).catch(e=>{-1!==window.location.href.indexOf("employer-of-record")?document.getElementById("prequest_demo_submit-btn").value="Talk to our expert":document.getElementById("prequest_demo_submit-btn").value="Get started"})},phubspotOnSubmit=e=>{e.preventDefault();let t=new FormData(e.target),o=Object.fromEntries(t.entries()),n=pIPcountryCode||pcountries.find(e=>e.dial_code===o["phone-code"])?.value;o.phone=o["phone-code"]+o.phone,pemailCheck(o.email).then(()=>{pformValidated&&(_psubmitHubspotForm(o,n,"8552073","66613d75-55ac-46f1-9774-d179459b5e51"),"function"==typeof klentyFormSubmit&&klentyFormSubmit("prequest-demo-api-form"))}),document.getElementById("prequest-demo-api-form").style.display="block",document.getElementById("phubspot-form-success").style.display="none",document.getElementById("phubspot-form-error").style.display="none"};document.getElementById("prequest-demo-api-form").addEventListener("submit",phubspotOnSubmit),document.getElementById("prequest-demo-api-form").addEventListener("change",e=>{document.getElementById(e.target.name+"-error")&&(document.getElementById(e.target.name+"-error").style.display="none"),"email"===e.target.name&&(pformValidated=!0)});var exitPopup=document.getElementById("exitPopup"),cookieName="eorPopupShown";function showExitPopup(){exitPopup.classList.add("visible")}function hideExitPopup(){let e=window.location.pathname;setCookiee(cookieName,"true",1,e=e.substring(0,e.lastIndexOf("/"))),exitPopup.classList.remove("visible")}document.addEventListener("mouseleave",function(e){!(e.clientY<=0)||getCookiee(globalCookie)||getCookiee(cookieName)||showExitPopup()}),document.getElementById("cross-pattern").addEventListener("click",function(e){hideExitPopup()});
