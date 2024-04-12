export const currencyLocalMap = {
    INR: "en-IN",
    USD: "en-US",
    IDR: "id-ID"
};

const currencyFormat = ({
    amount,
    currency,
    fixedBy = 2,
    locale = navigator.language,
}) => {
    let formattedCurrency = "-";
    try {
        if (amount || amount === 0) {
            amount = Number(amount).toFixed(fixedBy);
            const splittedValue = String(amount).split(".");
            formattedCurrency = `${currency ? currency + " " : ""}${Intl.NumberFormat(
                currencyLocalMap[currency] || locale
            ).format(splittedValue[0])}.${splittedValue[1]}`;
        }
    } catch (e) { }
    return formattedCurrency;
};


export const commaSeprateVal = (value) => {
    var tempNumber = value.toString().replace(/,/gi, "");
    var val = tempNumber.replace(/^0+|[^\d.]/g, '');
    var commaSeparatedNumber = val.split(/(?=(?:\d{3})+$)/).join(",");
    return commaSeparatedNumber
}

export default currencyFormat;
export const toggleList = () => { };

export const createList = (list = [], id = "country-list") => {
    // console.log('list')
    const element = document.getElementById(id);
    element.innerHTML = null;
    var frag = document.createDocumentFragment();
    for (let j = 0; j < list.length; j++) {
        const option = document.createElement("li");
        const item = list[j];
        option.dataset.value = item.value;
        option.innerText = item.label;
        option.classList.add("list-items");
        frag.appendChild(option);
    }
    element.appendChild(frag);
};

export const createListCurrency = (list = [], id = "currency-input") => {
    // console.log(list,'list curr')
    const element = document.getElementById(id);
    element.innerHTML = null;
    // var frag = document.createDocumentFragment();

    for (let j = 0; j < list.length; j++) {
        const option = document.createElement("option");
        const item = list[j];
        option.value = item.value;
        option.innerText = item.label;
        option.classList.add("list-items");
        element.appendChild(option);

    }

};

export const filterList = (list = [], text = "", id) => {

    let filteredList = list.filter((item) =>

        item.label.toLowerCase().includes(text?.toLowerCase())

    );
    if (!filteredList.length) {
        filteredList = [{ label: 'Country is not found', disabled: true }]
    }
    createList(filteredList, id);
};

export const createTaxList = (data = [], currCode = "") => {
    const innerFrag = document.createElement('div');
    innerFrag.classList.add("inner-breakup")
    const frag = document.createElement("div");
    frag.classList = "breakups-main cont-breakup hidden";

    const ulClass = `d-flex-new justify-content-space-between mt-2 acc-item-container`;
    for (let index = 0; index < data.length; index++) {
        const dataItem = data[index];
        const ul = document.createElement("ul");
        ul.classList = ulClass;
        const firstLI = document.createElement("li");
        firstLI.innerHTML = dataItem.label;
        const secondLI = document.createElement("li");
        if (secondLI === null) continue;
        const newTexValue = new Intl.NumberFormat().format(dataItem.value || 0)
        //Math.abs(Number(parseFloat(dataItem.value || 0).toFixed(2)))
        secondLI.innerHTML = `${currCode} ${newTexValue}`;
        secondLI.classList.add("ml-auto")
        ul.appendChild(firstLI);

        ul.appendChild(secondLI);
        innerFrag.appendChild(ul);

    }
    frag.appendChild(innerFrag)
    return frag;
};

export const checkDisabledBtn = () => {
    const countryValue = document.getElementById('country-input').value
    const currencyValue = document.getElementById('currency-input').value
    const grossSalaryValue = document.getElementById('gross-salary-input').value
    const calculateBtn = document.getElementById('calculate-salary')

    if (countryValue && currencyValue && grossSalaryValue) {
        calculateBtn.removeAttribute('disabled')
        calculateBtn.classList.add('calculate-active');

    }
    else {
        calculateBtn.setAttribute('disabled', true)
    }

}

export const updateMeta = (meta) => {
    // console.log(meta,'mmm')
    const ul = document.createElement('ul')

    for (let i = 0; i < meta.length; i++) {
        const li = document.createElement('li');
        li.innerText = meta[i];
        ul.appendChild(li);
        li.classList.add('calculator-dsc');

    }
    const desContainer = document.getElementById('dsc-container');
    desContainer.innerHTML = "";
    desContainer.appendChild(ul);
}

const errorElement = document.getElementById('err-msg');

export const createSuggestedCountryList = (suglist) => {

    const sugUlList = document.getElementById('suggestedCountries')

    suglist.forEach(element => {
        const li = document.createElement('li');
        const countryLink = document.createElement('a')
        const sugCountryName = element.label
        const sugCountryCode = element.value
        countryLink.innerText = sugCountryName
        countryLink.setAttribute("data-code", sugCountryCode)
        li.appendChild(countryLink)
        sugUlList.appendChild(li)

    });
}

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}




const toolTipEle = `<div class="tool-tip">

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="16px" height="16px" fill-rule="nonzero"><g fill="#667085" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M25,2c-12.6907,0 -23,10.3093 -23,23c0,12.69071 10.3093,23 23,23c12.69071,0 23,-10.30929 23,-23c0,-12.6907 -10.30929,-23 -23,-23zM25,4c11.60982,0 21,9.39018 21,21c0,11.60982 -9.39018,21 -21,21c-11.60982,0 -21,-9.39018 -21,-21c0,-11.60982 9.39018,-21 21,-21zM25,11c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3zM21,21v2h1h1v13h-1h-1v2h1h1h4h1h1v-2h-1h-1v-15h-1h-4z"></path></g></g></svg>
<span class="tooltiptext">__tooltiptext__</span>
</div>`


const arrowImage = `https://uploads-ssl.webflow.com/61cda68a44d858d793b97e11/6436b07536f3aab95d48a418_Arrow.svg`

const getParentsElement = (target, className) => {
    if (target.classList.contains(className)) return target;
    return getParentsElement(target.parentElement, className);

}
//  const toggleArrow = document.getElementById('toggle-arrow');

function toggleBreakUpHeight(growDiv) {
    if (growDiv.clientHeight > 20) {
        growDiv.style.height = 0;
    } else {
        const innerBreakup = growDiv.querySelector('.inner-breakup')
        growDiv.style.height = innerBreakup.clientHeight + 32 + "px";
    }
    console.log('toggle')
}

const toggleBreakups = (e) => {
    const mainAccordianElement = getParentsElement(e.target, "accordian-main");
    const breakUpMain = mainAccordianElement.nextSibling;
    breakUpMain.classList.toggle("hidden");
    const arrowImage = mainAccordianElement.children[0].lastChild
    arrowImage.classList.toggle('rotate-180');

    toggleBreakUpHeight(breakUpMain)
}


// export const createAccordian = (data) => {

//     const fragment = document.createElement("div")
//     fragment.classList.add("accordian-section");

//     data.forEach(item => {
//         const accordianMain = document.createElement("div")
//         const accordianHeader = document.createElement("div")
//         accordianHeader.classList = "accordian-main d-flex-new" // don't remove 'accordian-main' class
//         accordianHeader.style.width = "100%"

//         accordianHeader.style.justifyContent = "space-between"
//         const accordianLeftSide = document.createElement("div");
//         accordianLeftSide.classList = "d-flex-align-center"

//         const accordianRightSide = document.createElement("div");
//         accordianRightSide.classList = "d-flex-new"

//         const accordianHeading = document.createElement("p");
//         accordianHeading.innerText = item.label;
//         accordianLeftSide.appendChild(accordianHeading)

//         if (item.tooltip) {
//             const toolTipMain = document.createElement("div");
//             toolTipMain.innerHTML = toolTipEle.replace("__tooltiptext__", item.tooltip);
//             accordianLeftSide.appendChild(toolTipMain)
//         }

//         if (item.subCategories.length) {
//             const downArrow = document.createElement('img');
//             downArrow.src = arrowImage;
//             accordianLeftSide.appendChild(downArrow)
//             accordianHeader.addEventListener("click", toggleBreakups)
//         }

//         const totalCurrency = document.createElement("p");
//         totalCurrency.classList.add("total-currency");
//         totalCurrency.innerText = item.currency || "USD";

//         const totalTax = document.createElement("p");
//         totalCurrency.classList.add("total-tax");
//         // totalTax.innerText = Math.abs(Number(parseFloat(item.value || 0).toFixed(2)));

//         totalTax.innerText = new Intl.NumberFormat().format(item.value)
//         accordianRightSide.appendChild(totalCurrency);
//         accordianRightSide.appendChild(totalTax);

//         accordianHeader.appendChild(accordianLeftSide);
//         accordianHeader.appendChild(accordianRightSide);

//         const breakupsEles = createTaxList(item.subCategories, item.currency)

//         accordianMain.appendChild(accordianHeader)

//         if (breakupsEles) {
//             accordianMain.appendChild(breakupsEles)
//         }

//         fragment.appendChild(accordianMain)
//     })

//     return fragment;
// }

export const createAccordian = (data) => {
    const fragment = document.createElement("div")
    fragment.classList.add("accordian-section");
    console.log(data, 'acc')
    const skuadFeeDiscount = data.find(item => item.key === "skuadFeeDiscount")
    const filteredData = data.filter(item => item.key !== "skuadFeeDiscount")


    filteredData.forEach(item => {
        const accordianMain = document.createElement("div")
        const accordianHeader = document.createElement("div")
        accordianHeader.classList = "accordian-main d-flex-new" // don't remove 'accordian-main' class
        accordianHeader.style.width = "100%"

        accordianHeader.style.justifyContent = "space-between"
        const accordianLeftSide = document.createElement("div");

        accordianLeftSide.classList = "d-flex-align-center"
        const accordianRightSide = document.createElement("div");
        accordianRightSide.classList = "d-flex-new"

        const accordianHeading = document.createElement("p");
        accordianHeading.classList.add('skuad-fee')
        accordianHeading.innerText = item.label;
        accordianLeftSide.appendChild(accordianHeading)

        const skuadFeeWrapper = document.createElement("div");
        skuadFeeWrapper.classList.add('new-heading-wrapper')
        skuadFeeWrapper.appendChild(accordianHeading)
        accordianLeftSide.appendChild(skuadFeeWrapper)

        if (item.key === "skuadFee" && skuadFeeDiscount) {

            const discountFeeLabel = document.createElement("div");
            discountFeeLabel.classList.add('skuad-offer-label')
            discountFeeLabel.innerText = '✨ Exclusive offer ✨';
            accordianLeftSide.classList.add('dis-offer-active')
            accordianLeftSide.appendChild(discountFeeLabel)
        }

        if (item.tooltip) {
            const toolTipMain = document.createElement("div");
            toolTipMain.classList.add('tooltip-container')
            toolTipMain.innerHTML = toolTipEle.replace("__tooltiptext__", item.tooltip);
            skuadFeeWrapper.appendChild(toolTipMain)
        }

        if (item.subCategories.length) {
            const downArrow = document.createElement('img');
            downArrow.src = arrowImage;
            accordianLeftSide.appendChild(downArrow)
            accordianHeader.addEventListener("click", toggleBreakups)
        }
        const rightSideAccAmt = document.createElement("div");
        rightSideAccAmt.classList.add('right-inner-container')
        const totalCurrency = document.createElement("p");
        totalCurrency.classList.add("total-currency");
        totalCurrency.innerText = item.currency || "USD";
        const totalTax = document.createElement("p");
        totalTax.classList.add('right-side-value')
        totalCurrency.classList.add("total-tax");
        totalTax.innerText = new Intl.NumberFormat().format(item.value)

        if (item.key === "skuadFee" && skuadFeeDiscount) {
            accordianRightSide.classList.add('offer-active')
            rightSideAccAmt.appendChild(totalCurrency);
            rightSideAccAmt.appendChild(totalTax);
            accordianRightSide.appendChild(rightSideAccAmt);
        } else {
            accordianRightSide.appendChild(totalCurrency);
            accordianRightSide.appendChild(totalTax);
        }

        if (item.key === "skuadFee" && skuadFeeDiscount) {
            const totalOldSkuadFee = item.value + skuadFeeDiscount.value
            const skuadFeeValueWrapper = document.createElement("div");
            skuadFeeValueWrapper.classList.add('skuad-dis-fee')
            const skuadFeeValue = document.createElement("p");
            const skuadFeeCurrency = document.createElement("p");
            skuadFeeValue.classList.add('old-skuad-fee')
            skuadFeeCurrency.innerText = item.currency || "USD";
            skuadFeeValue.innerText = new Intl.NumberFormat().format(totalOldSkuadFee)

            skuadFeeValueWrapper.appendChild(skuadFeeCurrency);
            skuadFeeValueWrapper.appendChild(skuadFeeValue);
            accordianRightSide.appendChild(skuadFeeValueWrapper);
        }

        accordianHeader.appendChild(accordianLeftSide);
        accordianHeader.appendChild(accordianRightSide);

        const breakupsEles = createTaxList(item.subCategories, item.currency)

        accordianMain.appendChild(accordianHeader)
        // accordianMain.classList.add('skuad-fee-container')
        // console.log(accordianMain,'accordianMain')

        if (breakupsEles) {
            accordianMain.appendChild(breakupsEles)
        }

        fragment.appendChild(accordianMain)
    })

    return fragment;
}


export const createSalaryTemplate = (data) => {
    const frag = document.createDocumentFragment();

    data.forEach(item => {

        const grossValue = item.data.filter(item => item.visibility)

        const sectionDiv = document.createElement("div")
        sectionDiv.classList.add("salary-contribution");

        const heading = document.createElement("h2");
        heading.innerText = item.label;

        const durationSalaryDiv = document.createElement("div");
        durationSalaryDiv.classList.add("cost-label-align");

        const durationTitle = document.createElement("p");
        durationTitle.classList.add("duration-title");
        durationTitle.innerText = item.grossSalaryTitle;

        durationSalaryDiv.appendChild(durationTitle);

        const durationRight = document.createElement("div");
        durationRight.classList.add('d-flex-new')

        const currenyType = document.createElement("p");
        currenyType.classList.add("currency-type");
        currenyType.innerText = item.currency || "USD";

        const durationSalary = document.createElement("p");
        durationSalary.classList.add("duration-salary");
        // durationSalary.innerText = Math.abs(Number(parseFloat(item.grossSalary || 0).toFixed(2)) || 0);
        durationSalary.innerText = new Intl.NumberFormat().format(item.grossSalary)
        durationRight.appendChild(currenyType)
        durationRight.appendChild(durationSalary)

        durationSalaryDiv.appendChild(durationRight)

        sectionDiv.appendChild(heading);
        sectionDiv.appendChild(durationSalaryDiv);

        const accordians = createAccordian(item.data);

        sectionDiv.appendChild(accordians);

        const employmentCost = document.createElement("div");
        employmentCost.classList.add("employment-cost");

        const employmentCostLabel = document.createElement("p")
        employmentCostLabel.classList.add("employment-cost-label");
        employmentCostLabel.innerText = item.durationHeading;
        employmentCost.appendChild(employmentCostLabel);

        const employmentRight = document.createElement("div");
        employmentRight.classList.add("d-flex-new")

        const employmentCurrenyType = document.createElement("p");
        employmentCurrenyType.classList.add("currency-type");
        employmentCurrenyType.innerText = item.currency || "USD";

        const employmentCostSalary = document.createElement("p");
        employmentCostSalary.classList.add("duration-salary");
        // employmentCostSalary.innerText = Math.abs(Number(parseFloat(item.totalEmploymentCost || 0).toFixed(2)) || 0);
        employmentCostSalary.innerText = new Intl.NumberFormat().format(item.totalEmploymentCost)
        employmentRight.appendChild(employmentCurrenyType)
        employmentRight.appendChild(employmentCostSalary)

        employmentCost.appendChild(employmentRight);

        sectionDiv.appendChild(employmentCost)

        frag.appendChild(sectionDiv);
    })

    const mainDiv = document.getElementById("calculation-wrapper");
    mainDiv.innerHTML = '';
    mainDiv.appendChild(frag);
}
