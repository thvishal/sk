 // Function to extract query parameters from URL
function getQueryParams(url) {
    const queryParams = {};
    const urlParams = new URLSearchParams(url);
    for (const [key, value] of urlParams) {
        // Decode URI component to handle special characters like '%2B'
        queryParams[key] = decodeURIComponent(value);
    }
    return queryParams;
}

// Check if there are query parameters in the URL
const queryParams = getQueryParams(window.location.search);
if (Object.keys(queryParams).length > 0) {
    // Update input values if query parameters exist
    if (queryParams.firstname || queryParams.email || queryParams.lastname || queryParams.phonenumber || queryParams.code) {
        // If any of these parameters exist, keep the elements hidden
        document.querySelector('.referal-banner-img').classList.add('hide');
        document.querySelector('.upper-form-wrapper').classList.add('hide');
    }

    // Update input values based on query parameters
    if (queryParams.firstname) {
        document.getElementById('referee_name').value = queryParams.firstname;
    }
    if (queryParams.email) {
        document.getElementById('referee_email_id').value = queryParams.email;
    }
    if (queryParams.lastname) {
        document.getElementById('referee_last_name').value = queryParams.lastname;
    }
    if (queryParams.phonenumber) {
        document.getElementById('referee_phone_number').value = queryParams.phonenumber;
    }
    if (queryParams.code) {
        // Convert code value to string format
        document.getElementById('country_code').value = String(queryParams.code);
    }
} else {
    // Remove hide class from referal-banner-img and upper-form-wrapper if no query parameters
    document.querySelector('.referal-banner-img').classList.remove('hide');
    document.querySelector('.upper-form-wrapper').classList.remove('hide');
}


function showRefForm(){
    $(".after-susbmit-referral").css('display','none');
   $(".request-demo-form-wrapper-new").css('display','block');
   }
   
     function hideRefForm(){
   $(".request-demo-form-wrapper-new").css('display','none');
    $(".after-susbmit-referral").css('display','block');
   }
  
   let IPcountryCode = "";
   
   let formValidated = true;
   document.getElementById('show-ref-form-btn').addEventListener('click',showRefForm)
   document.getElementById("referee_email_id").addEventListener("focusout", () => {
   fetch(
     ` https://forms.hsforms.com/emailcheck/v1/json-ext?portalId=8552073&includeFreemailSuggestions=false`,
       {
         method: "POST",
         body: document.getElementById("referee_email_id").value
       }
     )
     .then((res) => res.json())
     .then((data) => {
     if (data.emailFree) {
         document.getElementById("ref-mail-error").style.display = "block";
         document.getElementById("ref-mail-error").innerText =
           "Please enter your company/business email address.";
         formValidated = false;
       } else {
         document.getElementById("ref-mail-error").style.display = "none";
         formValidated = true;
       }
       });
     });
   
   
   document.getElementById("email").addEventListener("focusout", () => {
   fetch(
     ` https://forms.hsforms.com/emailcheck/v1/json-ext?portalId=8552073&includeFreemailSuggestions=false`,
       {
         method: "POST",
         body: document.getElementById("email").value
       }
     )
     .then((res) => res.json())
     .then((data) => {
     if (data.emailFree) {
         document.getElementById("email-error").style.display = "block";
         document.getElementById("email-error").innerText =
           "Please enter your company/business email address.";
         formValidated = false;
       } else {
         document.getElementById("email-error").style.display = "none";
         formValidated = true;
       }
       });
     });
     
   let countries = [];
   let countryCodeSelect = document.getElementById("phone-code-dropdown");
   let refcountryCodeSelect = document.getElementById("ref-phone-code");
 
     fetch("https://storage.googleapis.com/skuad-public-assets/country-list.json", {
     crossDomain: true,
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
       "Access-Control-Allow-Origin": "*",
     },
     method: "GET",
   })
   .then(response => response.json())
   .then(res => {
     countries = res.countryList;
     if (countryCodeSelect) {
       var option1 = new Option("Select Country Code","");
       countryCodeSelect.options[0] = option1;
       option1.setAttribute("selected","true");	
       option1.setAttribute("disabled","true");
 
       for (let j = 0; j < res.countryList.length; j++) {
         let x = `${res.countryList[j].label} (${res.countryList[j].dial_code})`;
         countryCodeSelect.options[countryCodeSelect.options.length] = new Option(x, res.countryList[j].dial_code);
       }
       countryCodeSelect.value = "+1";
     }
     
     if (refcountryCodeSelect) {
       var option1 = new Option("Select Country Code","");
       refcountryCodeSelect.options[0] = option1;
       option1.setAttribute("selected","true");	
       option1.setAttribute("disabled","true");
 
       for (let j = 0; j < res.countryList.length; j++) {
         let x = `${res.countryList[j].label} (${res.countryList[j].dial_code})`;
         refcountryCodeSelect.options[refcountryCodeSelect.options.length] = new Option(x, res.countryList[j].dial_code);
       }
       refcountryCodeSelect.value = "+1";
     }
   });
   
   fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=c23115da6cf642e59b96f32b9d512a4c", {
     crossDomain: true,
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
       "Access-Control-Allow-Origin": "*",
     },
     method: "GET",
   })
   .then(response => response.json())
   .then(result => {
       if(result?.country) {
        console.log(result.country,'result.country');
         IPcountryCode = result.country.iso_code;
         countryCodeSelect.value = "+"+result.country.phone_code;
       if (queryParams.code) {
        refcountryCodeSelect.value = "+"+queryParams.code;
       }
       else{
        refcountryCodeSelect.value = "+"+result.country.phone_code;
       }
     }
   })
   .catch();
   
   const _submitHubspotForm = (formData, countryCode, portalId, formId, callback) => {
       document.getElementById("referral_submit-btn").value="Please wait...";
       
       delete formData["phone-code"];
       delete formData["ref-phone-code"];
       
       if (typeof growsumo !== 'undefined' && growsumo) {
       if (growsumo && growsumo.data && growsumo.data.partner_key) {
        formData.partnerstack_partner_key = growsumo.data.partner_key;
       }
       }
 
       let dataJson = { 
           submittedAt: new Date().getTime(), 
         fields: [], 
         context: {
             hutk: getCookie("hubspotutk"),
           pageUri: window.location.href,
           pageName: document.title,
         } 
       };
       let i = 0;
       for (const key in formData) {
         if (formData.hasOwnProperty(key)) {
           dataJson.fields[i] = {
             objectTypeId: "0-1",
             name: key,
             value: formData[key]
           };
           i++;
         }
       }
       
       if (typeof growsumo !== 'undefined' && growsumo) {
       partnerStackSignUp();
       }
       fetch(
       `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
       {
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json"
         },
       method: "POST",
         body: JSON.stringify(dataJson)
       })
       .then((res) => res.json())
       .then((data) => {
           document.getElementById("referral_submit-btn").value="Submit";
         if (data.inlineMessage) {
             localStorage.setItem("skuadSignupFormData", JSON.stringify({...formData, countryCode}));        
             //window.location.href = "/book-a-meeting";
             //$('.refer-form').css('display','none');
             hideRefForm()
             $('#referral-form')[0].reset();
           }
         else if (data.status === 'error' && data.errors[0].errorType === "BLOCKED_EMAIL") {
             document.getElementById("email-error").style.display = "block";
           document.getElementById("email-error").innerText="Please enter your company/business email address.";
         }
         else if (data.status === 'error' && data.errors[0].errorType === "INVALID_EMAIL") {
             document.getElementById("email-error").style.display = "block";
           document.getElementById("email-error").innerText="Please enter your valid email address.";
         }
         else if (data.status === 'error' && data.errors[0].errorType === "NUMBER_OUT_OF_RANGE") {
             document.getElementById("phone-error").style.display = "block";
           document.getElementById("phone-error").innerText="Please enter valid phone number";
         }
       })
       .catch((error) => {
         document.getElementById("referral_submit-btn").value="Submit";
       });
     }
 
   const hubspotOnSubmit = (e) => {
     e.preventDefault();
     const data = new FormData(e.target);
     let formData = Object.fromEntries(data.entries());
     const countryCode = IPcountryCode || countries.find(
       (country) => country.dial_code === formData["phone-code"]
     )?.value;
     
     formData.referee_phone_number = formData["ref-phone-code"] + formData.referee_phone_number;
     formData.phone = formData["phone-code"] + formData.phone;
     
     
     
     if (formValidated) {
       _submitHubspotForm(formData, countryCode, "8552073", "b21f90c5-deb8-4d7e-b90c-541ad1d94c39")
     }
        document.getElementById("referral-form").style.display="block";
     document.getElementById("referral-hubspot-form-success").style.display="none";
     document.getElementById("referral-hubspot-form-error").style.display="none";
   }
   
      document.getElementById("referral-form").addEventListener("submit", hubspotOnSubmit);
   document.getElementById("referral-form").addEventListener("change", (e) => {
       if (document.getElementById(e.target.name + "-error")) {
         document.getElementById(e.target.name + "-error").style.display = "none";
     }
     if (e.target.name === 'email') {
         formValidated = true;
     }
   });
