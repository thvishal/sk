/**
 * ============================================================================
 * FORM LOGIC (FINAL OPTIMIZED - NON BLOCKING + SEO SAFE)
 * ============================================================================
 */

let debug = true;
if (!debug) console.log = function () { };

let countries = [];

/* ============================================================================
 * 1. UTILS
 * ========================================================================== */

function dynamicSort(key) {
    let order = 1;
    if (key[0] === "-") {
        order = -1;
        key = key.substr(1);
    }
    return (a, b) =>
        order === -1
            ? b[key].localeCompare(a[key])
            : a[key].localeCompare(b[key]);
}

/* ============================================================================
 * 2. DOM CACHE
 * ========================================================================== */

const emailElement = document.getElementById("email");
const countryCodeSelect = document.getElementById("phone-code-dropdown");
const countryInput = document.querySelector('input[name="country"]');
const countryName = document.getElementById("countries_you_want_to_enroll");
const loader = document.querySelector(".country-loading");
const form = document.getElementById("request-demo-api-form");

/* ============================================================================
 * 3. PHONE INPUT SANITIZE
 * ========================================================================== */

document.querySelectorAll('input[type="tel"]').forEach((input) => {
    input.addEventListener("input", () => {
        input.value = input.value.replace(/[^0-9]/g, "");
    });
});

/* ============================================================================
 * 4. EMAIL VALIDATION
 * ========================================================================== */

function showEmailError(message) {
    const el = document.getElementById("email-error");
    if (!el) return false;

    if (message) {
        el.style.display = "block";
        el.innerText = message;
        return false;
    }
    el.style.display = "none";
    return true;
}

async function validateWithCodeJudge(email) {
    const res = await fetchWithTimeout(
        `https://work.codejudge.io/api/validate-email/?email=${encodeURIComponent(email)}&corp_email_only=True`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        }
    );

    const data = await res.json();

    return data.email_valid && data.corporate_email_valid
        ? showEmailError("")
        : showEmailError("Please enter a valid company email.");
}

async function validateWithHubSpot(email) {
    const res = await fetchWithTimeout(
        "https://forms.hsforms.com/emailcheck/v1/json-ext?portalId=8552073&includeFreemailSuggestions=false",
        {
            method: "POST",
            body: email,
        }
    );

    const data = await res.json();

    return data.emailFree
        ? showEmailError("Please enter a valid company email.")
        : showEmailError("");
}

async function checkEmailValidity(email) {
    try {
        return await validateWithCodeJudge(email);
    } catch {
        try {
            return await validateWithHubSpot(email);
        } catch {
            return showEmailError("Validation failed. Try again.");
        }
    }
}

/* ============================================================================
 * 5. SELECT DEFAULTS
 * ========================================================================== */

function setDefaultSelectOption(id, label) {
    const select = document.getElementById(id);
    if (!select) return;

    const option = new Option(label, "");
    option.disabled = true;
    option.selected = true;
    select.options[0] = option;
}

/* ============================================================================
 * 6. COUNTRY SETUP
 * ========================================================================== */

function setCountryCodeOptions(list) {
    countryCodeSelect.options.length = 0;

    const defaultOption = new Option("Select Country Code", "");
    defaultOption.disabled = true;
    defaultOption.selected = true;
    countryCodeSelect.add(defaultOption);

    list.forEach((c) => {
        const option = new Option(`${c.label} (${c.dial_code})`, c.dial_code);
        option.dataset.value = c.value;
        option.dataset.label = c.label;
        countryCodeSelect.add(option);
    });
}

function applyGeo(geo) {
    if (!geo || !countries.length) return false;

    const selected = countries.find(
        (c) => c.value?.toLowerCase() === geo.iso_code?.toLowerCase()
    );

    if (!selected) return false;

    countryCodeSelect.value = selected.dial_code;

    if (countryInput) {
        countryInput.value = selected.label;
    }

    return true;
}

countryCodeSelect.addEventListener("change", () => {
    const selected = countryCodeSelect.selectedOptions[0];
    if (countryInput) {
        countryInput.value = selected?.dataset.label || "";
    }
});

/* ============================================================================
 * 7. INIT (ðŸ”¥ FIXED)
 * ========================================================================== */

async function initForm() {
    try {
        // ðŸš€ PARALLEL (no chaining)
        const [countriesData, geo] = await Promise.all([
            window.getCountryList(),
            window.getGeoData()
        ]);

        countries = countriesData;
        setCountryCodeOptions(countries);

        const sorted = [...countries].sort(dynamicSort("label"));
        sorted.push({ label: "Others", value: "Others" });

        if (countryName) {
            countryName.innerHTML = sorted
                .map((c) => `<option value="${c.label}">${c.label}</option>`)
                .join("");

            if (typeof countryName.loadOptions === "function") {
                countryName.loadOptions();
            }
        }

        applyGeo(geo);

    } catch (err) {
        console.error("Init failed:", err);
    } finally {
        if (loader) loader.style.display = "none";
    }
}

/* ðŸš€ NON-BLOCKING INIT */
if (form) {
    setTimeout(initForm, 0);
}

/* ============================================================================
 * 8. INITIAL VALUES
 * ========================================================================== */

if (localStorage.getItem("resEmail") && emailElement) {
    emailElement.value = localStorage.getItem("resEmail");
}

emailElement?.addEventListener("blur", (e) => {
    checkEmailValidity(e.target.value);
});

setDefaultSelectOption("number_of_remote_hires", "Number of hires");
setDefaultSelectOption("how_can_we_help_you_new-input", "How can we help?");
setDefaultSelectOption("company_size", "Company size");

/* ============================================================================
 * 9. FORM SUBMIT
 * ========================================================================== */

function _submitHubspotForm(data, countryCode, portalId, formId) {
    const btn = document.getElementById("request_demo_submit-btn");

    btn.value = "Please wait...";
    btn.disabled = true;

    delete data["phone-code"];
    delete data.ld_field;

    const payload = {
        submittedAt: Date.now(),
        fields: Object.keys(data).map((key) => ({
            objectTypeId: "0-1",
            name: key,
            value: data[key],
        })),
        context: {
            hutk: getCookie("hubspotutk"),
            pageUri: window.location.href,
            pageName: document.title,
        },
    };

    fetchWithTimeout(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }
    )
        .then((r) => r.json())
        .then((res) => {
            btn.value = "Submit";
            btn.disabled = false;

            if (res.inlineMessage) {
                localStorage.setItem(
                    "skuadSignupFormData",
                    JSON.stringify({ ...data, countryCode })
                );

                if (typeof klentyFormSubmit === "function") {
                    klentyFormSubmit("request-demo-api-form");
                } else {
                    window.location.href = "/book-a-meeting";
                }
                return;
            }

            if (res.errors?.[0]?.errorType === "INVALID_EMAIL") {
                showEmailError("Invalid email.");
            }
        })
        .catch(() => {
            btn.value = "Submit";
            btn.disabled = false;
        });
}

form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    const selected = countryCodeSelect.selectedOptions[0];

    let country = selected?.dataset.value;

    if (!country) {
        const geo = await window.getGeoData();
        country = geo?.iso_code?.toUpperCase() || "";
    }

    data.phone = data["phone-code"] + data.phone;

    const valid = await checkEmailValidity(data.email);
    if (!valid) return;

    _submitHubspotForm(
        data,
        country,
        "8552073",
        "2b4e05d0-d685-4929-b37c-f961d7db9de5"
    );
});
