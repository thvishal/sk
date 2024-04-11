import currencyFormat, {
    checkDisabledBtn,
    createAccordian,
    createList,
    createListCurrency,
    createSalaryTemplate,
    createSuggestedCountryList,
    createTaxList,
    filterList,
    updateMeta,
    commaSeprateVal
} from "https://cdn.jsdelivr.net/gh/thvishal/sk/helper_v3.js"

//main cal helper--> https://dl.dropboxusercontent.com/scl/fi/7sbtw4irygekky5i8fxwh/helper-main.js?rlkey=lp3l9oc5711winnhx4n9gqykm&dl=0
let currencyList = [
    { label: "USD", value: "USD" },
    { label: "GBP", value: "GBP" },
    { label: "EUR", value: "EUR" },
];




const url = "https://global-knowledge-base.skuad.io/api/cost-calculator/getActiveCountryList?enabled=true";

const fetchCountryData = async (url) => {
    let response = await fetch(url);
    const newVar = await response.json();
    const filteredArray = newVar.data.filter((filteredItem) => filteredItem.label && filteredItem.enabled)

    return filteredArray
};

const countryList = await fetchCountryData(url);
const countryListWithCurrency = countryList


createList(currencyList, "currency-list");
createListCurrency(currencyList, "currency-input");


const baseUrl = "https://cost-calculator.skuad.io/cost-calculator/cost"


const endpoint = baseUrl + "?countryCode=:countryCode&currencyCode=:currencyCode&salary=:salary&client=website"
const countryDownArrow = document.getElementById('show-calc-country')
const form = document.getElementById("form");
const countryInput = document.getElementById("country-input");
countryInput.value = 'Loading...';
countryInput.setAttribute('desabled', '')

const currencyInput = document.getElementById("currency-input");
const currencyListEl = document.getElementById("currency-list");
const countryListEl = document.getElementById("country-list");
const grossSalaryInput = document.getElementById("gross-salary-input");
const downloadPDFElement = document.getElementById('resp-download-pdf')
const getCountryForError = document.querySelector('.error-msg-heading')
// const empAcc = document.getElementById("emp-accordian-container");
// const empAccord = document.getElementById("accordian-emp-container");


const currencyCurSelect = (text) => {
    const selectedCountry = countryListWithCurrency.find((country) => country.label === text)

    if (!selectedCountry) return;
    const filterdCurrencyList = currencyList.filter((currency, index) => currency.value !== selectedCountry.currValue && index < 3)
    currencyList = filterdCurrencyList
    currencyList.push({ label: selectedCountry.currValue, value: selectedCountry.currValue })
    createListCurrency(currencyList, 'currency-input');

}

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

        countryInput.value = 'India';
        currencyList.push({ label: 'INR', value: 'INR' });
        currencyCurSelect('India')
    }
    )
    .catch()

const toggleMonthYear = document.getElementById('toggle-year-month');
const yearlyRadio = document.getElementById("calc-yearly");

const toggleClass = (key) => {
    const activeEls = document.querySelectorAll(".active");
    activeEls.forEach((el) => el.classList.remove("active"));
    const el = document.getElementById(key);
    if (el) { el.classList.add("active"); }

    if (key === 'monthly') {
        toggleMonthYear.checked = true
    } else {
        yearlyRadio.checked = true
    }
};


let comData = null;



const salaryData = (key = "monthly") => {

    const resData = comData[key];
    toggleClass(key);
    if (!resData) return;

    const categoryMeta = comData.categories;

    const accordians = categoryMeta.map(category => {
        // const categoryValue = resData[category.key]
        // const categoryBreakup = resData[category.key + 'Breakup'] || []


        const subCategories = category.subCategories.filter(item => item.localAmounts[`${key}Value`] && item.visibility).map(item => ({
            ...item, value: item.localAmounts[`${key}Value`]
        }))

        return ({
            ...category,
            value: category.localAmounts[`${key}Value`],
            // breakup: category.subCategories,
            subCategories: subCategories,
            categoryKey: category.key,
            currency: comData.currency,
        })
    })


    const visibleAccordian = accordians.filter(accordian => accordian.visibility && accordian.value)

    const employerData = visibleAccordian.filter(item => item.categoryKey.includes("employer") || item.categoryKey === "skuadFee" || item.categoryKey === 'skuadFeeDiscount');
    const employeeData = visibleAccordian.filter(item => item.categoryKey.includes("employee"))

    const grossSalary = visibleAccordian.find(item => item.categoryKey === "grossSalary")

    const dd = [
        {
            label: "Total Cost of Employment",
            data: employerData,
            grossSalaryTitle: `Gross ${key} pay`,
            totalEmploymentCost: comData.totalEmploymentCost.localAmounts[`${key}Value`],
            currency: comData.currency,
            grossSalary: grossSalary.localAmounts[`${key}Value`],
            durationHeading: `Total ${key} cost of employment`,
        },
        {
            label: "Employee Net Salary",
            data: employeeData,
            grossSalaryTitle: `Gross ${key} pay`,
            totalEmploymentCost: comData.totalEmployeeSalary.localAmounts[`${key}Value`],
            currency: comData.currency,
            grossSalary: grossSalary.localAmounts[`${key}Value`],
            durationHeading: `Net ${key} salary`,
        },


    ]

    createSalaryTemplate(dd);

};

function showModalHandler() {
    document.getElementById("show-calculator-modal").style.display = "block";
}



grossSalaryInput.addEventListener('keyup', (e) => {

    grossSalaryInput.value = commaSeprateVal(grossSalaryInput.value)
    checkDisabledBtn();
})



const _handleSubmit = async (e) => {

    e.preventDefault();

    if (countryInput) document.getElementById("calculate-salary").innerText = "Calculating...";
    document.getElementById("calculate-salary").setAttribute("disabled", "");

    const countryCd = countryList.find(
        (country) => country.label === countryInput.value
    );

    if (!countryCd) return;

    const currencyCd = currencyList.find(
        (curr) => curr.label === currencyInput.value
    );

    downloadPDFElement.setAttribute('data-country', countryCd.value)
    downloadPDFElement.setAttribute('data-salary', grossSalaryInput.value.replaceAll(',', ''))
    downloadPDFElement.setAttribute('data-currency', currencyCd.value)
    downloadPDFElement.setAttribute('data-country-name', countryCd.label)

    const data = await fetch(
        endpoint
            .replace(":countryCode", countryCd.value)
            .replace(":salary", grossSalaryInput.value.replaceAll(',', ''))
            .replace(":currencyCode", currencyCd.value)
    );

    data
        .json()
        .then((res) => {
            if (res.success) {
                comData = res.data;
                document.getElementById("calc-selected-country").innerText = comData.country;
                comData.currency = currencyCd.value
                downloadPDFElement.style.display = 'flex';
                provideCountryToFormHeader(countryCd.label)
                salaryData();
                showModalHandler();
                updateMeta(comData.meta);
                document.getElementById("err-msg").style.display = "none";
                //document.getElementById("err-msg").innerHTML = null;
                form.scrollIntoView({ top: 0, behavior: 'smooth' });
                document.querySelector('.when-get-error').style.display = 'none'
                document.querySelector('.when-pdf-downloading').style.display = 'none'
                document.querySelector('.when-pdf-downloaded').style.display = 'none'
                document.querySelector('.e-mail-submit-wrapper').style.display = 'block';

            } else {
                getCountryForError.innerText = `Want a detailed breakdown for cost of employment in ${countryInput.value}`
                document.getElementById("err-msg").style.display = "block";
                document.getElementById("show-calculator-modal").style.display = "none";

            }
            document.getElementById("calculate-salary").removeAttribute("disabled");
            document.getElementById("calculate-salary").innerText = "Calculate";

            const countryValue = document.getElementById("country-input").value;
            document.getElementById("calc-selected-country").innerText = countryValue;
            console.info(data.country, 'ccc')

        })

        .catch((err) => {
            document.getElementById("calculate-salary").removeAttribute("disabled");
            document.getElementById("calculate-salary").innerText = "Calculate";

        });

};


form.onsubmit = _handleSubmit;



toggleMonthYear.addEventListener('change', (e) => {
    if (e.target.checked) {
        salaryData('monthly')
    }
})



yearlyRadio.addEventListener('change', (e) => {
    if (e.target.checked) {
        salaryData('yearly')
    }
    // const selectedDuration = e.target.checked ? "yearly" : "monthly";
    // salaryData(selectedDuration)

})


/**country start here  */
const toggleCountryList = (e) => {

    if (e) {
        e.stopPropagation();
        if (e.target.value) {
            e.target.value = ''
        }
        const text = "";
        countryListEl.classList.toggle("list-modal");
        currencyListEl.classList.add("list-modal");
        filterList(countryList, text, "country-list");
        checkDisabledBtn();
    } else {
        countryListEl.classList.remove("list-modal");
    }


};

countryDownArrow.addEventListener('click', toggleCountryList)
countryInput.addEventListener("click", toggleCountryList);

countryInput.addEventListener("blur", (e) => {

    const text = e.target.value;
    const isEqual = countryList.find(
        (item) => item.label.toLowerCase() === text.toLowerCase()
    );
    if (!isEqual) countryInput.value = "";
});


const countryListElOnClick = (e) => {
    e.preventDefault();
    if ('Country is not found' === e.target.innerText) return;
    if (e.target.nodeName === "UL") return;
    countryInput.value = e.target.innerText;
    currencyCurSelect(e.target.innerText);
    toggleCountryList(e);
    createListCurrency(currencyList, 'currency-input');
  
};


countryListEl.addEventListener("click", countryListElOnClick);

countryInput.addEventListener("input", (e) => {

    const text = e.target.value;
    filterList(countryList, text, "country-list");
    toggleCountryList()
});

/**country end here */

/**currency start here  */

const toggleCurrencyList = (e) => {
    e.stopPropagation();
    const text = e.target.value || "";
    currencyListEl.classList.toggle("list-modal");
    countryListEl.classList.add("list-modal");
    filterList(currencyList, text, "currency-list");

    checkDisabledBtn()
};


/**currency end here */

document.body.addEventListener("click", () => {
    const els = document.querySelectorAll(".list-cotainer");
    els.forEach((el) => el.classList.add("list-modal"));
});

/* aroowdown and up key country select key  */
countryInput.addEventListener("keydown", (e) => {
    const keyName = e.key;
    const activeEl = countryListEl.querySelector(".active");


    if (keyName === "ArrowDown") {
        const firstChildEle = countryListEl.firstChild;
        if (firstChildEle.innerText === 'Country is not found') return;
        if (!activeEl) {
            firstChildEle.classList.add("active");
        } else {
            const nextEl = activeEl.nextSibling;
            activeEl.classList.remove("active");
            nextEl.classList.add("active");
        }

        activeEl.scrollIntoView({
            block: "center",
        });
    } else if (keyName === "ArrowUp") {
        const lastChildEle = countryListEl.lastChild;
        if (!activeEl) {
            lastChildEle.classList.add("active");
        } else {
            const nextEl = activeEl.previousSibling;
            activeEl.classList.remove("active");
            nextEl.classList.add("active");
        }
        activeEl.scrollIntoView({
            block: "center",
        });
    } else if (keyName === "Enter") {
        e.preventDefault();

        countryInput.value = activeEl.innerText;
        countryListEl.classList.add("list-modal");
    }

});

function provideCountryToFormHeader(countryName) {
    document.getElementById('your-country').innerText = countryName

}
