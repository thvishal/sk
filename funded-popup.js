function popupEmailCheck(e){return fetch(" https://forms.hsforms.com/emailcheck/v1/json-ext?portalId=8552073&includeFreemailSuggestions=false",{method:"POST",body:e}).then(e=>e.json()).then(e=>{e.emailFree?(document.getElementById("hmemail-error").style.display="block",document.getElementById("hmemail-error").innerText="Please enter your company/business email address.",pformValidated=!1):(document.getElementById("hmemail-error").style.display="none",pformValidated=!0)})}document.getElementById("hmemail").addEventListener("focusout",e=>{popupEmailCheck(e.target.value)});let pcountries=[],pcountryCodeSelect=document.getElementById("hmphone-code-dropdown");fetch("https://storage.googleapis.com/skuad-public-assets/country-list.json",{crossDomain:!0,headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},method:"GET"}).then(e=>e.json()).then(e=>{if(pcountries=e.countryList,pcountryCodeSelect){let t=new Option("Select Country Code","");pcountryCodeSelect.options[0]=t,t.setAttribute("selected","true"),t.setAttribute("disabled","true");for(let o=0;o<e.countryList.length;o++){let n=`${e.countryList[o].label} (${e.countryList[o].dial_code})`;pcountryCodeSelect.options[pcountryCodeSelect.options.length]=new Option(n,e.countryList[o].dial_code)}pcountryCodeSelect.value="+1"}}),fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=c23115da6cf642e59b96f32b9d512a4c",{crossDomain:!0,headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},method:"GET"}).then(e=>e.json()).then(e=>{e?.country&&(pIPcountryCode=e.country.iso_code,pcountryCodeSelect.value="+"+e.country.phone_code)}).catch();const _psubmitHubspotForm=(e,t,o,n,r)=>{document.getElementById("hmrequest_demo_submit-btn").value="Please wait...",delete e["phone-code"];let s={submittedAt:new Date().getTime(),fields:[],context:{hutk:getCookie("hubspotutk"),pageUri:window.location.href,pageName:document.title}},i=0;for(let l in e)e.hasOwnProperty(l)&&(s.fields[i]={objectTypeId:"0-1",name:l,value:e[l]},i++);fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${o}/${n}`,{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify(s)}).then(e=>e.json()).then(o=>{-1!==window.location.href.indexOf("employer-of-record")?document.getElementById("hmrequest_demo_submit-btn").value="Talk to our expert":document.getElementById("hmrequest_demo_submit-btn").value="Get started",o.inlineMessage?(localStorage.setItem("skuadSignupFormData",JSON.stringify({...e,countryCode:t})),hideExitPopup(),localStorage.setItem("isFormSubmitted",!0),$("#salary-insights-form")[0].reset(),"function"!=typeof klentyFormSubmit&&(window.location.href="/book-a-meeting")):"error"===o.status&&"BLOCKED_EMAIL"===o.errors[0].errorType?(document.getElementById("hmemail-error").style.display="block",document.getElementById("hmemail-error").innerText="Please enter your company/business email address."):"error"===o.status&&"INVALID_EMAIL"===o.errors[0].errorType?(document.getElementById("hmemail-error").style.display="block",document.getElementById("hmemail-error").innerText="Please enter your valid email address."):"error"===o.status&&"NUMBER_OUT_OF_RANGE"===o.errors[0].errorType&&(document.getElementById("hmphone-error").style.display="block",document.getElementById("hmphone-error").innerText="Please enter valid phone number")}).catch(e=>{-1!==window.location.href.indexOf("employer-of-record")?document.getElementById("hmrequest_demo_submit-btn").value="Talk to our expert":document.getElementById("hmrequest_demo_submit-btn").value="Get started"})},phubspotOnSubmit=e=>{e.preventDefault();let t=new FormData(e.target),o=Object.fromEntries(t.entries()),n=pIPcountryCode||pcountries.find(e=>e.dial_code===o["phone-code"])?.value;o.phone=o["phone-code"]+o.phone,popupEmailCheck(o.email).then(()=>{pformValidated&&(_psubmitHubspotForm(o,n,"8552073","a680339a-1301-4d43-8333-430243e8768b"),"function"==typeof klentyFormSubmit&&klentyFormSubmit("salary-insights-form"))}),document.getElementById("salary-insights-form").style.display="block",document.getElementById("hmhubspot-form-success").style.display="none",document.getElementById("hmhubspot-form-error").style.display="none"};document.getElementById("salary-insights-form").addEventListener("submit",phubspotOnSubmit),document.getElementById("salary-insights-form").addEventListener("change",e=>{document.getElementById(e.target.name+"-error")&&(document.getElementById(e.target.name+"-error").style.display="none"),"email"===e.target.name&&(pformValidated=!0)});var exitPopup=document.getElementById("exitPopup");function hideExitPopup(){exitPopup.classList.remove("visible")}document.getElementById("cross-pattern").addEventListener("click",function(e){hideExitPopup()}),document.addEventListener("keydown",function(e){"Escape"===e.key&&hideExitPopup()});