import{checkDisabledBtn as e,createList as t,createListCurrency as l,createSalaryTemplate as a,filterList as n,updateMeta as r,commaSeprateVal as c}from"https://cdn.jsdelivr.net/gh/thvishal/sk/employee-calculator-helper.js";let currencyList=[{label:"USD",value:"USD"},{label:"GBP",value:"GBP"},{label:"EUR",value:"EUR"},],url="https://cost-calculator.skuad.io/cost-calculator/active-country-list?enabled=true",fetchCountryData=async e=>{let t=await fetch(e),l=await t.json(),a=l.data.filter(e=>e.label&&e.enabled);return a},countryList=await fetchCountryData("https://cost-calculator.skuad.io/cost-calculator/active-country-list?enabled=true"),countryListWithCurrency=countryList;t(currencyList,"currency-list"),l(currencyList,"currency-input");let baseUrl="https://cost-calculator.skuad.io/cost-calculator/cost",countryDownArrow=document.getElementById("show-calc-country"),form=document.getElementById("calc-form-new"),countryInput=document.getElementById("country-input-new"),currencyInput=document.getElementById("currency-input"),currencyListEl=document.getElementById("currency-list"),countryListEl=document.getElementById("country-list"),grossSalaryInput=document.getElementById("calc-amount-input"),downloadPDFElement=document.getElementById("resp-download-pdf"),getCountryForError=document.querySelector(".error-msg-heading"),provinceInput=document.getElementById("state-input"),provinceListEle=document.getElementById("province-list"),isExpatYes=document.getElementById("yes-2");isExpatYes.setAttribute("checked","true");let gaID=document.getElementById("ga_id");gaID.setAttribute("name","ga_id");let downloadpdfbtn=document.getElementById("resp-download-pdf");downloadpdfbtn.addEventListener("click",e=>{let t=JSON.parse(localStorage.getItem("pdfFormSubmitted")||!1);if(t){downloadPDF();return}localStorage.setItem("isPDF",!0),showExitPopup()});let currencyCurSelect=(e,t)=>{let a=countryListWithCurrency.find(t=>t.label===e);if(!a)return;let n=currencyList.filter((e,t)=>e.value!==a.currValue&&t<3),r=currencyList.find(e=>e.value===a.currValue);if(r&&!t){l(currencyList=currencyList.slice(0,3),"currency-input");return}(currencyList=n).push({label:a.currValue,value:a.currValue}),l(currencyList,"currency-input")};fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=c23115da6cf642e59b96f32b9d512a4c",{crossDomain:!0,headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},method:"GET"}).then(e=>e.json()).then(e=>{countryInput.value="",currencyList.push({label:"",value:""})}).catch().finally(()=>{countryInput.removeAttribute("disabled"),countryInput.setAttribute("placeholder","Country")});let toggleMonthYear=document.getElementById("switchMonthly"),yearlyRadio=document.getElementById("switchYearly"),comData=null,salaryData=(e="monthly")=>{let t=comData[e];if(!t)return;let l=comData.categories,n=l.map(t=>{let l=t.subCategories.filter(t=>t.localAmounts[`${e}Value`]&&t.visibility).map(t=>({...t,value:t.localAmounts[`${e}Value`]}));return{...t,value:t.localAmounts[`${e}Value`],subCategories:l,categoryKey:t.key,currency:comData.currency}}),r=n.filter(e=>e.visibility&&e.value),c=r.filter(e=>e.categoryKey.includes("employer")||"skuadFee"===e.categoryKey||"skuadFeeDiscount"===e.categoryKey),o=r.filter(e=>e.categoryKey.includes("employee")),i=r.find(e=>"grossSalary"===e.categoryKey),s=[{label:"Amount you pay",data:c,grossSalaryTitle:`Gross ${"yearly"===e?"annual":"monthly"} pay`,totalEmploymentCost:comData.totalEmploymentCost.localAmounts[`${e}Value`],currency:comData.currency,grossSalary:i.localAmounts[`${e}Value`],durationHeading:`Total ${"yearly"===e?"annual":"monthly"} cost of employment`},{label:"Amount employee gets",data:o,grossSalaryTitle:`Gross ${"yearly"===e?"annual":"monthly"} pay`,totalEmploymentCost:comData.totalEmployeeSalary.localAmounts[`${e}Value`],currency:comData.currency,grossSalary:i.localAmounts[`${e}Value`],durationHeading:`Net ${"yearly"===e?"annual":"monthly"} salary`},];a(s)};function showModalHandler(){document.getElementById("show-calculator-modal").style.display="block"}grossSalaryInput.addEventListener("keyup",t=>{grossSalaryInput.value=c(grossSalaryInput.value),e()});let _handleSubmit=async e=>{e.preventDefault();let t=JSON.parse(localStorage.getItem("isCalculated")||"false"),l=JSON.parse(localStorage.getItem("pdfFormSubmitted")||"false");if(localStorage.setItem("isPDF",!1),t&&!l){showExitPopup();return}let a=countryList.find(e=>e.label===countryInput.value);if(!a)return;let n=currencyList.find(e=>e.label===currencyInput.value),c={countryCode:a.value,salary:grossSalaryInput.value.replaceAll(",",""),currencyCode:n.value},o=!0,i=`https://cost-calculator.skuad.io/cost-calculator/cost?client=website&countryCode=${c.countryCode}&currencyCode=${c.currencyCode}&salary=${c.salary}&isExpat=${o=!a.isExpatApplicable||!!a.isExpatApplicable&&!!document.getElementById("no").checked}`,s=document.getElementById("selected-province");s.innerText="";let u={};if(a.provinceList.length){s.style.display="block",s.innerText=`(${provinceInput.value})`;let d=a.provinceList;i=`${i}&provinceCode=${(u=d.find(e=>e.province.trim()==provinceInput.value)||{}).provinceCode}`}countryInput&&(document.getElementById("calculate-salary").value="Calculating..."),a.isExpatApplicable&&a.provinceList.length&&(i=`${i}&isExpat=${a.isExpatApplicable}&provinceCode=${u.provinceCode}`),downloadPDFElement.setAttribute("data-country",a.value),downloadPDFElement.setAttribute("data-salary",grossSalaryInput.value.replaceAll(",","")),downloadPDFElement.setAttribute("data-currency",n.value),u.provinceCode?downloadPDFElement.setAttribute("data-province",u.provinceCode):downloadPDFElement.removeAttribute("data-province"),downloadPDFElement.setAttribute("data-isexpat",!!o),downloadPDFElement.setAttribute("data-country-name",a.label);let y=await fetch(i);y.json().then(e=>{if(e.success){localStorage.setItem("isCalculated",!0),comData=e.data;let t=countryList.find(e=>e.label===comData.country).valueISO2.toLowerCase();document.getElementById("current-country-flag").setAttribute("src",`https://hatscripts.github.io/circle-flags/flags/${t}.svg`),getInitialInputDetails(comData.country,comData.currencyCode,grossSalaryInput.value||1e4,provinceInput.value||"NA",comData.isExpat),getCountryForError.innerText=`Want a detailed breakdown for cost of employment in ${a.label}`,downloadPDFElement.style.display="flex",document.getElementById("err-msg").style.display="none",document.getElementById("calc-selected-country").innerHTML=`${a.label}`,comData.currency=n.value,document.documentElement.style.scrollBehavior="smooth",salaryData(),showModalHandler(),document.getElementById("calc-res-wrapper").style.display="block",document.getElementById("zero-state").style.display="none";r([...comData.meta||[],...comData.additionalNotes||[]]);let l=document.createElement("a");l.setAttribute("href","#redirec-calculator-modal"),l.click(),document.getElementById("err-msg").style.display="none",document.querySelector(".e-mail-submit-wrapper").style.display="block"}else document.getElementById("err-msg").style.display="block",document.getElementById("show-calculator-modal").style.display="none",getCountryForError.innerText=`Want a detailed breakdown for cost of employment in ${countryInput.value}`;document.getElementById("calculate-salary").removeAttribute("disabled"),document.getElementById("calculate-salary").value="Calculate",document.getElementById("country-input-new").value,document.getElementById("calc-selected-country").innerText=`${a.label}`}).catch(e=>{document.getElementById("calculate-salary").removeAttribute("disabled"),document.getElementById("calculate-salary").value="Calculate"})};form.onsubmit=_handleSubmit,toggleMonthYear.addEventListener("change",e=>{e.target.checked&&salaryData("monthly")}),yearlyRadio.addEventListener("change",e=>{e.target.checked&&salaryData("yearly")});let toggleCountryList=e=>{if(e){e.stopPropagation(),e.target.value&&(e.target.value="");countryListEl.classList.toggle("list-modal"),currencyListEl.classList.add("list-modal"),provinceListEle.classList.add("list-modal"),n(countryList,"","country-list")}else countryListEl.classList.remove("list-modal")},toggleProvinceList=t=>{if(t){t.stopPropagation(),t.target.value&&(t.target.value="");provinceListEle.classList.toggle("list-modal"),countryListEl.classList.add("list-modal"),currencyListEl.classList.add("list-modal"),n(getProvince,"","province-list"),e()}else provinceListEle.classList.remove("list-modal")};countryDownArrow.addEventListener("click",toggleCountryList),countryInput.addEventListener("click",toggleCountryList),provinceInput.addEventListener("click",toggleProvinceList),countryInput.addEventListener("blur",e=>{let t=e.target.value,l=countryList.find(e=>e.label.toLowerCase()===t.toLowerCase());l||(countryInput.value="")});let provinceListElOnClick=t=>{t.preventDefault(),"Item not found"!==t.target.innerText&&"UL"!==t.target.nodeName&&(provinceInput.value=t.target.innerText,e())},getProvince=[];function provinceAndIsExpatHandler(e){let l=countryList.find(t=>t.label===e);getProvince=l.provinceList.map(e=>({label:e.province,value:e.provinceCode})),"Canada"===l.label?(provinceInput.setAttribute("placeholder","Province"),document.getElementById("province-state").innerText="Province"):(provinceInput.setAttribute("placeholder","State"),document.getElementById("province-state").innerText="State"),getProvince.sort((e,t)=>{let l=e.label.toUpperCase(),a=t.label.toUpperCase();return l<a?-1:l>a?1:0}),getProvince.length?(document.getElementById("show-calc-province").style.display="block",provinceInput.setAttribute("required",""),t(getProvince.sort(),"province-list")):(document.getElementById("show-calc-province").style.display="none",provinceInput.removeAttribute("required")),document.getElementById("is-expact-country").innerText=l.label,l.isExpatApplicable?document.getElementById("is-expact").style.display="flex":document.getElementById("is-expact").style.display="none"}let countryListElOnClick=t=>{t.preventDefault(),"Item not found"!==t.target.innerText&&"UL"!==t.target.nodeName&&(provinceInput.value="",countryInput.value=t.target.innerText,currencyCurSelect(t.target.innerText),l(currencyList,"currency-input"),provinceAndIsExpatHandler(t.target.innerText),e())};countryListEl.addEventListener("click",countryListElOnClick),provinceListEle.addEventListener("click",provinceListElOnClick),countryInput.addEventListener("input",e=>{let t=e.target.value;n(countryList,t,"country-list"),toggleCountryList()}),provinceInput.addEventListener("input",e=>{let t=e.target.value;n(getProvince,t,"province-list"),toggleProvinceList()});let toggleCurrencyList=t=>{t.stopPropagation();let l=t.target.value||"";currencyListEl.classList.toggle("list-modal"),countryListEl.classList.add("list-modal"),n(currencyList,l,"currency-list"),e()};function getInitialInputDetails(e,t,l,a,n){let r=!1,c=document.getElementById("ga_id"),o=new FormData;o.append("country",e),o.append("currency",t),o.append("salary",l),o.append("province",a),o.append("isExpat",n),o.append("ga_id",c.value),fetch("https://script.google.com/macros/s/AKfycbzgF8aidOHLXmqtZhlqYgWOwbd2h14bSFU5GmvceliYzFGnsLtuhMQItBMm1ohtcs2n/exec",{method:"POST",body:o}).then(e=>{if(e.ok)r=!0;else throw Error("Network response was not ok.")}).catch(e=>console.log("Error!",e.message))}document.body.addEventListener("click",()=>{let e=document.querySelectorAll(".list-cotainer");e.forEach(e=>e.classList.add("list-modal"))}),countryInput.addEventListener("keydown",e=>{let t=e.key,a=countryListEl.querySelector(".active");if("ArrowDown"===t){let n=countryListEl.firstChild;if("Item not found"===n.innerText)return;if(a){let r=a.nextSibling;a.classList.remove("active"),r.classList.add("active")}else n.classList.add("active");a.scrollIntoView({block:"center"})}else if("ArrowUp"===t){let c=countryListEl.lastChild;if(a){let o=a.previousSibling;a.classList.remove("active"),o.classList.add("active")}else c.classList.add("active");a.scrollIntoView({block:"center"})}else"Enter"===t&&(e.preventDefault(),provinceAndIsExpatHandler(a.innerText),countryInput.value=a.innerText,countryListEl.classList.add("list-modal"),currencyCurSelect(a.innerText),console.info(a.innerText,"activeEl.innerText"),l(currencyList,"currency-input"))}),provinceInput.addEventListener("keydown",e=>{let t=e.key,l=provinceListEle.querySelector(".active");if("ArrowDown"===t){let a=provinceListEle.firstChild;if("Item not found"===a.innerText)return;if(l){let n=l.nextSibling;l.classList.remove("active"),n.classList.add("active")}else a.classList.add("active");l.scrollIntoView({block:"center"})}else if("ArrowUp"===t){let r=provinceListEle.lastChild;if(l){let c=l.previousSibling;l.classList.remove("active"),c.classList.add("active")}else r.classList.add("active");l.scrollIntoView({block:"center"})}else"Enter"===t&&(e.preventDefault(),provinceInput.value=l.innerText,provinceListEle.classList.add("list-modal"))}),document.querySelector(".calc-again").addEventListener("click",()=>{document.documentElement.style.scrollBehavior="inherit"});