import { createList as e, createListCurrency as t, createSalaryTemplate as l, filterList as a, updateMeta as n, commaSeprateVal as r } from "https://cdn.jsdelivr.net/gh/thvishal/sk/employee-calculator-helper.js"; let currencyList = [{ label: "USD", value: "USD" }, { label: "GBP", value: "GBP" }, { label: "EUR", value: "EUR" },], url = "https://cost-calculator.skuad.io/cost-calculator/active-country-list?enabled=true", fetchCountryData = async e => { let t = await fetch(e), l = await t.json(), a = l.data.filter(e => e.label && e.enabled); return a }, countryList = await fetchCountryData("https://cost-calculator.skuad.io/cost-calculator/active-country-list?enabled=true"), countryListWithCurrency = countryList; e(currencyList, "currency-list"), t(currencyList, "currency-input"); let baseUrl = "https://cost-calculator.skuad.io/cost-calculator/cost", countryDownArrow = document.getElementById("show-calc-country"), form = document.getElementById("calc-form-new"), countryInput = document.getElementById("country-input-new"), currencyInput = document.getElementById("currency-input"), currencyListEl = document.getElementById("currency-list"), countryListEl = document.getElementById("country-list"), grossSalaryInput = document.getElementById("calc-amount-input"), downloadPDFElement = document.getElementById("resp-download-pdf"), getCountryForError = document.querySelector(".error-msg-heading"), provinceInput = document.getElementById("state-input"), provinceListEle = document.getElementById("province-list"), isExpatYes = document.getElementById("yes-2"); isExpatYes.setAttribute("checked", "true"); let gaID = document.getElementById("ga_id"); gaID.setAttribute("name", "ga_id"); let downloadpdfbtn = document.getElementById("resp-download-pdf"); downloadpdfbtn.addEventListener("click", e => { let t = JSON.parse(localStorage.getItem("pdfFormSubmitted") || !1); if (t) { downloadPDF(); return } localStorage.setItem("isPDF", !0), showExitPopup() }); let currencyCurSelect = (e, l) => { let a = countryListWithCurrency.find(t => t.label === e); if (!a) return; let n = currencyList.filter((e, t) => e.value !== a.currValue && t < 3), r = currencyList.find(e => e.value === a.currValue); if (r && !l) { t(currencyList = currencyList.slice(0, 3), "currency-input"); return } (currencyList = n).push({ label: a.currValue, value: a.currValue }), t(currencyList, "currency-input") }; fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=c23115da6cf642e59b96f32b9d512a4c", { crossDomain: !0, headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }, method: "GET" }).then(e => e.json()).then(e => { countryInput.value = "", currencyList.push({ label: "", value: "" }) }).catch().finally(() => { countryInput.removeAttribute("disabled"), countryInput.setAttribute("placeholder", "Country") }); let toggleMonthYear = document.getElementById("switchMonthly"), yearlyRadio = document.getElementById("switchYearly"), comData = null, salaryData = (e = "monthly") => { let t = comData[e]; if (!t) return; let a = comData.categories, n = a.map(t => { let l = t.subCategories.filter(t => t.localAmounts[`${e}Value`] && t.visibility).map(t => ({ ...t, value: t.localAmounts[`${e}Value`] })); return { ...t, value: t.localAmounts[`${e}Value`], subCategories: l, categoryKey: t.key, currency: comData.currency } }), r = n.filter(e => e.visibility && e.value), o = r.filter(e => e.categoryKey.includes("employer") || "skuadFee" === e.categoryKey || "skuadFeeDiscount" === e.categoryKey), c = r.filter(e => e.categoryKey.includes("employee")), i = r.find(e => "grossSalary" === e.categoryKey), s = [{ label: "Amount you pay", data: o, grossSalaryTitle: `Gross ${"yearly" === e ? "annual" : "monthly"} pay`, totalEmploymentCost: comData.totalEmploymentCost.localAmounts[`${e}Value`], currency: comData.currency, grossSalary: i.localAmounts[`${e}Value`], durationHeading: `Total ${"yearly" === e ? "annual" : "monthly"} cost of employment` }, { label: "Amount employee gets", data: c, grossSalaryTitle: `Gross ${"yearly" === e ? "annual" : "monthly"} pay`, totalEmploymentCost: comData.totalEmployeeSalary.localAmounts[`${e}Value`], currency: comData.currency, grossSalary: i.localAmounts[`${e}Value`], durationHeading: `Net ${"yearly" === e ? "annual" : "monthly"} salary` },]; l(s) }; function showModalHandler() { document.getElementById("show-calculator-modal").style.display = "block" } grossSalaryInput.addEventListener("keyup", e => { grossSalaryInput.value = r(grossSalaryInput.value) }); let _handleSubmit = async e => { e.preventDefault(); let t = JSON.parse(localStorage.getItem("isCalculated") || "false"), l = JSON.parse(localStorage.getItem("pdfFormSubmitted") || "false"); if (localStorage.setItem("isPDF", !1), t && !l) { showExitPopup(); return } let a = countryList.find(e => e.label === countryInput.value); if (!a) return; let r = currencyList.find(e => e.label === currencyInput.value), o = { countryCode: a.value, salary: grossSalaryInput.value.replaceAll(",", ""), currencyCode: r.value }, c = !1; a.isExpatApplicable ? (console.log("countryCd.isExpatApplicable", a.isExpatApplicable, c), c = !!a.isExpatApplicable && !!document.getElementById("no").checked) : c = !1; let i = `https://cost-calculator.skuad.io/cost-calculator/cost?client=website&countryCode=${o.countryCode}&currencyCode=${o.currencyCode}&salary=${o.salary}&isExpat=${c}`, s = document.getElementById("selected-province"); s.innerText = ""; let u = {}; if (a.provinceList.length) { s.style.display = "block", s.innerText = `(${provinceInput.value})`; let d = a.provinceList; i = `${i}&provinceCode=${(u = d.find(e => e.province.trim() == provinceInput.value) || {}).provinceCode}` } countryInput && (document.getElementById("calculate-salary").value = "Calculating..."), a.isExpatApplicable && a.provinceList.length && (i = `${i}&isExpat=${a.isExpatApplicable}&provinceCode=${u.provinceCode}`), downloadPDFElement.setAttribute("data-country", a.value), downloadPDFElement.setAttribute("data-salary", grossSalaryInput.value.replaceAll(",", "")), downloadPDFElement.setAttribute("data-currency", r.value), u.provinceCode ? downloadPDFElement.setAttribute("data-province", u.provinceCode) : downloadPDFElement.removeAttribute("data-province"), downloadPDFElement.setAttribute("data-isexpat", !!c), downloadPDFElement.setAttribute("data-country-name", a.label); let y = await fetch(i); y.json().then(e => { if (console.info(e, "res"), e.success) { localStorage.setItem("isCalculated", !0), comData = e.data; let t = countryList.find(e => e.label === comData.country).valueISO2.toLowerCase(); document.getElementById("current-country-flag").setAttribute("src", `https://hatscripts.github.io/circle-flags/flags/${t}.svg`), getInitialInputDetails(comData.country, comData.currencyCode, grossSalaryInput.value || 1e4, provinceInput.value || "NA", comData.isExpat), getCountryForError.innerText = `Want a detailed breakdown for cost of employment in ${a.label}`, downloadPDFElement.style.display = "flex", document.getElementById("err-msg").style.display = "none", document.getElementById("calc-selected-country").innerHTML = `${a.label}`, comData.currency = r.value, document.documentElement.style.scrollBehavior = "smooth", salaryData(), showModalHandler(), document.getElementById("calc-res-wrapper").style.display = "block", document.getElementById("zero-state").style.display = "none"; n([...comData.meta || [], ...comData.additionalNotes || []]); let l = document.createElement("a"); l.setAttribute("href", "#redirec-calculator-modal"), l.click(), document.getElementById("err-msg").style.display = "none", document.querySelector(".e-mail-submit-wrapper").style.display = "block" } else console.info("kkkk"), document.getElementById("zero-state").style.display = "none", document.getElementById("calc-res-wrapper").style.display = "block", document.getElementById("dsc-container").style.display = "none", document.getElementById("err-msg").style.display = "block", document.getElementById("show-calculator-modal").style.display = "none", getCountryForError.innerText = `Want a detailed breakdown for cost of employment in ${countryInput.value}`; console.info("4"), document.getElementById("err-msg").style.display = "block", document.getElementById("calculate-salary").removeAttribute("disabled"), document.getElementById("calculate-salary").value = "Calculate", console.info("5"), document.getElementById("calc-selected-country").innerText = `${a.label}` }).catch(e => { console.info(e, "rrr"), document.getElementById("calculate-salary").removeAttribute("disabled"), document.getElementById("calculate-salary").value = "Calculate" }) }; form.onsubmit = _handleSubmit, toggleMonthYear.addEventListener("change", e => { e.target.checked && salaryData("monthly") }), yearlyRadio.addEventListener("change", e => { e.target.checked && salaryData("yearly") }); let toggleCountryList = e => { if (e) { e.stopPropagation(), e.target.value && (e.target.value = ""); countryListEl.classList.toggle("list-modal"), currencyListEl.classList.add("list-modal"), provinceListEle.classList.add("list-modal"), a(countryList, "", "country-list") } else countryListEl.classList.remove("list-modal") }, toggleProvinceList = e => { if (e) { e.stopPropagation(), e.target.value && (e.target.value = ""); provinceListEle.classList.toggle("list-modal"), countryListEl.classList.add("list-modal"), currencyListEl.classList.add("list-modal"), a(getProvince, "", "province-list") } else provinceListEle.classList.remove("list-modal") }; countryDownArrow.addEventListener("click", toggleCountryList), countryInput.addEventListener("click", toggleCountryList), provinceInput.addEventListener("click", toggleProvinceList), countryInput.addEventListener("blur", e => { let t = e.target.value, l = countryList.find(e => e.label.toLowerCase() === t.toLowerCase()); l || (countryInput.value = "") }); let provinceListElOnClick = e => { e.preventDefault(), "Item not found" !== e.target.innerText && "UL" !== e.target.nodeName && (provinceInput.value = e.target.innerText) }, getProvince = []; function provinceAndIsExpatHandler(t) { let l = countryList.find(e => e.label === t); getProvince = l.provinceList.map(e => ({ label: e.province, value: e.provinceCode })), "Canada" === l.label ? (provinceInput.setAttribute("placeholder", "Province"), document.getElementById("province-state").innerText = "Province") : (provinceInput.setAttribute("placeholder", "State"), document.getElementById("province-state").innerText = "State"), getProvince.sort((e, t) => { let l = e.label.toUpperCase(), a = t.label.toUpperCase(); return l < a ? -1 : l > a ? 1 : 0 }), getProvince.length ? (document.getElementById("show-calc-province").style.display = "block", provinceInput.setAttribute("required", ""), e(getProvince.sort(), "province-list")) : (document.getElementById("show-calc-province").style.display = "none", provinceInput.removeAttribute("required")), document.getElementById("is-expact-country").innerText = l.label, l.isExpatApplicable ? document.getElementById("is-expact").style.display = "flex" : document.getElementById("is-expact").style.display = "none" } let countryListElOnClick = e => { e.preventDefault(), "Item not found" !== e.target.innerText && "UL" !== e.target.nodeName && (provinceInput.value = "", countryInput.value = e.target.innerText, currencyCurSelect(e.target.innerText), t(currencyList, "currency-input"), provinceAndIsExpatHandler(e.target.innerText)) }; countryListEl.addEventListener("click", countryListElOnClick), provinceListEle.addEventListener("click", provinceListElOnClick), countryInput.addEventListener("input", e => { let t = e.target.value; a(countryList, t, "country-list"), toggleCountryList() }), provinceInput.addEventListener("input", e => { let t = e.target.value; a(getProvince, t, "province-list"), toggleProvinceList() }); let toggleCurrencyList = e => { e.stopPropagation(); let t = e.target.value || ""; currencyListEl.classList.toggle("list-modal"), countryListEl.classList.add("list-modal"), a(currencyList, t, "currency-list") }; function getInitialInputDetails(e, t, l, a, n) { let r = !1, o = document.getElementById("ga_id"), c = new FormData; c.append("country", e), c.append("currency", t), c.append("salary", l), c.append("province", a), c.append("isExpat", n), c.append("ga_id", o.value), fetch("https://script.google.com/macros/s/AKfycbzgF8aidOHLXmqtZhlqYgWOwbd2h14bSFU5GmvceliYzFGnsLtuhMQItBMm1ohtcs2n/exec", { method: "POST", body: c }).then(e => { if (e.ok) r = !0; else throw Error("Network response was not ok.") }).catch(e => console.log("Error!", e.message)) } document.body.addEventListener("click", () => { let e = document.querySelectorAll(".list-cotainer"); e.forEach(e => e.classList.add("list-modal")) }), countryInput.addEventListener("keydown", e => { let l = e.key, a = countryListEl.querySelector(".active"); if ("ArrowDown" === l) { let n = countryListEl.firstChild; if ("Item not found" === n.innerText) return; if (a) { let r = a.nextSibling; a.classList.remove("active"), r.classList.add("active") } else n.classList.add("active"); a.scrollIntoView({ block: "center" }) } else if ("ArrowUp" === l) { let o = countryListEl.lastChild; if (a) { let c = a.previousSibling; a.classList.remove("active"), c.classList.add("active") } else o.classList.add("active"); a.scrollIntoView({ block: "center" }) } else "Enter" === l && (e.preventDefault(), provinceAndIsExpatHandler(a.innerText), countryInput.value = a.innerText, countryListEl.classList.add("list-modal"), currencyCurSelect(a.innerText), console.info(a.innerText, "activeEl.innerText"), t(currencyList, "currency-input")) }), provinceInput.addEventListener("keydown", e => { let t = e.key, l = provinceListEle.querySelector(".active"); if ("ArrowDown" === t) { let a = provinceListEle.firstChild; if ("Item not found" === a.innerText) return; if (l) { let n = l.nextSibling; l.classList.remove("active"), n.classList.add("active") } else a.classList.add("active"); l.scrollIntoView({ block: "center" }) } else if ("ArrowUp" === t) { let r = provinceListEle.lastChild; if (l) { let o = l.previousSibling; l.classList.remove("active"), o.classList.add("active") } else r.classList.add("active"); l.scrollIntoView({ block: "center" }) } else "Enter" === t && (e.preventDefault(), provinceInput.value = l.innerText, provinceListEle.classList.add("list-modal")) }), document.querySelector(".calc-again").addEventListener("click", () => { document.documentElement.style.scrollBehavior = "inherit" });
