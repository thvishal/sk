
import currencyFormat, {
    checkDisabledBtn,
    createList,
    createListCurrency,
    createSalaryTemplate,
    filterList,
    updateMeta,
    commaSeprateVal //https://dl.dropboxusercontent.com/scl/fi/epmuqvqdsne4n1nqzjous/download-pdf-home-calc-helper.js?rlkey=r459jli04xoohhb245pe0vis6&dl=0
} from "https://cdn.jsdelivr.net/gh/thvishal/sk/download-pdf-home-calc-helper.js"


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


let baseUrl = 'https://cost-calculator.skuad.io/cost-calculator/cost';


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
const dscContainer = document.getElementById('dsc-container');
const calculateBtn = document.getElementById("calculate-salary")
const downloadPDFElement = document.getElementById('resp-download-pdf')
const getCountryForError = document.querySelector('.error-msg-heading')


const currencyCurSelect = (text, isOnLoad) => {
    const selectedCountry = countryListWithCurrency.find((country) => country.label === text)
    if (!selectedCountry) return;

    const filterdCurrencyList = currencyList.filter((currency, index) => currency.value !== selectedCountry.currValue && index < 3)

    const findedCountryCodeObj = currencyList.find((currItem) => currItem.value === selectedCountry.currValue)
    if (findedCountryCodeObj && !isOnLoad) {
        currencyList = currencyList.slice(0, 3)
        createListCurrency(currencyList, 'currency-input');
        return
    }

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

        countryInput.value = '';
        currencyList.push({ label: '', value: '' });
        //currencyCurSelect('')

        // currencyCurSelect(result.country.name, true)

    }
    )
    .catch().finally(() => {
        countryInput.value = '';
        countryInput.removeAttribute('desabled')
    });

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

            data: employerData,
            grossSalaryTitle: `Gross ${key} pay`,
            totalEmploymentCost: comData.totalEmploymentCost.localAmounts[`${key}Value`],
            currency: comData.currency,
            grossSalary: grossSalary.localAmounts[`${key}Value`],
            durationHeading: `Total ${key} cost of employment`,

        },
        {

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
    checkDisabledBtn(calculateBtn);

})



const _handleSubmit = async (e) => {

    e.preventDefault();

    if (countryInput) calculateBtn.innerText = "Calculating...";
    calculateBtn.setAttribute("disabled", "");

    calculateBtn.classList.add('grey-bg-new')

    const countryCd = countryList.find(
        (country) => country.label === countryInput.value
    );

    if (!countryCd) return;

    const currencyCd = currencyList.find(
        (curr) => curr.label === currencyInput.value
    );

    // localStorage.setItem("countryCode", countryCd.value);
    // localStorage.setItem("salary", grossSalaryInput.value.replaceAll(',', ''));
    // localStorage.setItem("currencyCode", currencyCd.value);

    // await downloadPDF(countryCd.value, grossSalaryInput.value, currencyCd.value, countryCd.label)
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
                provideCountryToFormHeader(countryCd.label)
                dscContainer.classList.remove('more-list')
                document.getElementById("calc-home-img").style.display = "none";
                const greyPattern = document.querySelector('.grey-pattern-new')
                const calcSectionLeft = document.querySelector('.left-form-container')
                const calcSectionRight = document.querySelector('.home-calc-container')
                document.getElementById("calc-selected-country").innerText = countryCd.label;
                greyPattern.style.display = 'block'
                calcSectionLeft.classList.add('adjust-grid')
                calcSectionRight.classList.add('adjust-grid-container')
                comData = res.data;

                comData.currency = currencyCd.value
                document.getElementById("err-msg").style.display = "none";
                salaryData();
                showModalHandler();
                updateMeta(comData.meta);

                //document.getElementById("err-msg").innerHTML = null;

                form.scrollIntoView({ top: 0, behavior: 'smooth' });
                document.querySelector('.when-get-error').style.display = 'none'
                document.querySelector('.when-pdf-downloading').style.display = 'none'
                document.querySelector('.when-pdf-downloaded').style.display = 'none'
                document.querySelector('.e-mail-submit-wrapper').style.display = 'block';


            } else {
                document.getElementById("err-msg").style.display = "block";
                document.getElementById("dsc-container").style.display = "none";
                document.getElementById("read-more-container").style.display = "none";
                document.getElementById("show-calculator-modal").style.display = "none";
                document.getElementById("calc-home-img").style.display = "none";


            }
            document.getElementById("calculate-salary").removeAttribute("disabled");
            document.getElementById("calculate-salary").innerText = "Calculate";

            const countryValue = document.getElementById("country-input").value;
            document.getElementById("calc-selected-country").innerText = (countryValue == 'Netherlands' || countryValue == 'Philippines' || countryValue == 'United Arab Emirates' || countryValue == 'United Kingdom' || countryValue == 'United States of America') ? 'The ' + countryValue : countryValue;

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
        checkDisabledBtn(calculateBtn);
    } else {
        countryListEl.classList.remove("list-modal");
    }


};
const openCountryList = document.getElementById('reset-btn')
countryDownArrow.addEventListener('click', toggleCountryList)
countryInput.addEventListener("click", toggleCountryList);
openCountryList.addEventListener("click", toggleCountryList);
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
    getCountryForError.innerText = `Want a detailed breakdown for cost of employment in ${e.target.innerText}`

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

    checkDisabledBtn(calculateBtn)
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

document.getElementById('read-more-container').addEventListener('click', () => {
    dscContainer.classList.add('more-list')
    // displayAllData();
})



function provideCountryToFormHeader(countryName) {
    document.getElementById('your-country').innerText = countryName

}


