

function popupEmailCheck(email) {
    return fetch(
        ` https://forms.hsforms.com/emailcheck/v1/json-ext?portalId=8552073&includeFreemailSuggestions=false`,
        {
            method: "POST",
            body: email
        }
    )
        .then((res) => res.json())
        .then((data) => {
            if (data.emailFree) {
                document.getElementById("hmemail-error").style.display = "block";
                document.getElementById("hmemail-error").innerText =
                    "Please enter your company/business email address.";
                pformValidated = false;
            } else {
                document.getElementById("hmemail-error").style.display = "none";
                pformValidated = true;
            }
        });
}

document.getElementById("hmemail").addEventListener("focusout", (event) => {
    popupEmailCheck(event.target.value);
});


let pcountries = [];
let pcountryCodeSelect = document.getElementById("hmphone-code-dropdown");


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
        pcountries = res.countryList;
        if (pcountryCodeSelect) {
            let option1 = new Option("Select Country Code", "");
            pcountryCodeSelect.options[0] = option1;
            option1.setAttribute("selected", "true");
            option1.setAttribute("disabled", "true");

            for (let j = 0; j < res.countryList.length; j++) {
                let x = `${res.countryList[j].label} (${res.countryList[j].dial_code})`;
                // console.log(pcountryCodeSelect.options.length);
                pcountryCodeSelect.options[pcountryCodeSelect.options.length] = new Option(x, res.countryList[j].dial_code);
            }
            pcountryCodeSelect.value = "+1";
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
        if (result?.country) {
            pIPcountryCode = result.country.iso_code;
            pcountryCodeSelect.value = "+" + result.country.phone_code;
        }
    })
    .catch();

const _psubmitHubspotForm = (formData, countryCode, portalId, formId, callback) => {
    document.getElementById("hmrequest_demo_submit-btn").value = "Please wait...";
    delete formData["phone-code"];


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
            if (window.location.href.indexOf("employer-of-record") !== -1) {
                document.getElementById("hmrequest_demo_submit-btn").value = "Talk to our expert";
            } else {
                document.getElementById("hmrequest_demo_submit-btn").value = "Get started";
            }
            //document.getElementById("request_demo_submit-btn").value="Submit";
            if (data.inlineMessage) {
                localStorage.setItem("skuadSignupFormData", JSON.stringify({ ...formData, countryCode }));
                hideExitPopup();
                localStorage.setItem('isDemoFormSubmitted', true);
                $('#salary-insights-form')[0].reset();
                if (typeof klentyFormSubmit !== 'function') {
                    window.location.href = "/book-a-meeting";
                }

                //$('#request-demo-api-form')[0].reset();
            }
            else if (data.status === 'error' && data.errors[0].errorType === "BLOCKED_EMAIL") {
                document.getElementById("hmemail-error").style.display = "block";
                document.getElementById("hmemail-error").innerText = "Please enter your company/business email address.";
            }
            else if (data.status === 'error' && data.errors[0].errorType === "INVALID_EMAIL") {
                document.getElementById("hmemail-error").style.display = "block";
                document.getElementById("hmemail-error").innerText = "Please enter your valid email address.";
            }
            else if (data.status === 'error' && data.errors[0].errorType === "NUMBER_OUT_OF_RANGE") {
                document.getElementById("hmphone-error").style.display = "block";
                document.getElementById("hmphone-error").innerText = "Please enter valid phone number";
            }
        })
        .catch((error) => {
            if (window.location.href.indexOf("employer-of-record") !== -1) {
                document.getElementById("hmrequest_demo_submit-btn").value = "Talk to our expert";
            } else {
                document.getElementById("hmrequest_demo_submit-btn").value = "Get started";
            }

        });
}

const phubspotOnSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let formData = Object.fromEntries(data.entries());
    const countryCode = pIPcountryCode || pcountries.find(
        (country) => country.dial_code === formData["phone-code"]
    )?.value;
    formData.phone = formData["phone-code"] + formData.phone;
    popupEmailCheck(formData.email)
        .then(() => {
            if (pformValidated) {
                _psubmitHubspotForm(formData, countryCode, "8552073", "a680339a-1301-4d43-8333-430243e8768b");
                if (typeof klentyFormSubmit == 'function') {
                    klentyFormSubmit("salary-insights-form");
                }
            }
        })
    document.getElementById("salary-insights-form").style.display = "block";
    document.getElementById("hmhubspot-form-success").style.display = "none";
    document.getElementById("hmhubspot-form-error").style.display = "none";
}

document.getElementById("salary-insights-form").addEventListener("submit", phubspotOnSubmit);
document.getElementById("salary-insights-form").addEventListener("change", (e) => {
    if (document.getElementById(e.target.name + "-error")) {
        document.getElementById(e.target.name + "-error").style.display = "none";
    }
    if (e.target.name === 'email') {
        pformValidated = true;
    }
});

var exitPopup = document.getElementById('exitPopup');

function hideExitPopup() {
    exitPopup.classList.remove('visible');
}

document.getElementById('cross-pattern').addEventListener('click', function (event) {
    hideExitPopup();
})

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        hideExitPopup();
    }
});
