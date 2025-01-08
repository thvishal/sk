import{checkDisabledBtn as e,createList as t,createListCurrency as l,createSalaryTemplate as a,filterList as r,updateMeta as n,commaSeprateVal as o}from"https://cdn.jsdelivr.net/gh/thvishal/sk/hm-cal-helper.js";let currencyList=[{label:"USD",value:"USD"},{label:"GBP",value:"GBP"},{label:"EUR",value:"EUR"},],url="https://cost-calculator.skuad.io/cost-calculator/active-country-list?enabled=true",fetchCountryData=async e=>{let t=await fetch(e),l=await t.json(),a=l.data.filter(e=>e.label&&e.enabled);return a},countryList=await fetchCountryData("https://cost-calculator.skuad.io/cost-calculator/active-country-list?enabled=true"),countryListWithCurrency=countryList;t(currencyList,"currency-list"),l(currencyList,"currency-input");let baseUrl="https://cost-calculator.skuad.io/cost-calculator/cost",endpoint=baseUrl+"?client=website&countryCode=:countryCode&currencyCode=:currencyCode&salary=:salary&isExpat=:isExpat&provinceCode=:provinceCode",countryDownArrow=document.getElementById("show-calc-country"),form=document.getElementById("form"),countryInput=document.getElementById("country-input");countryInput.value="Loading...",countryInput.setAttribute("desabled","");let currencyInput=document.getElementById("currency-input"),currencyListEl=document.getElementById("currency-list"),countryListEl=document.getElementById("country-list"),grossSalaryInput=document.getElementById("gross-salary-input"),downloadPDFElement=document.getElementById("resp-download-pdf"),getCountryForError=document.querySelector(".error-msg-heading"),provinceInput=document.getElementById("province-input"),provinceListEle=document.getElementById("province-list"),dscContainer=document.getElementById("dsc-container"),currencyCurSelect=(e,t)=>{let a=countryListWithCurrency.find(t=>t.label===e);if(!a)return;let r=currencyList.filter((e,t)=>e.value!==a.currValue&&t<3),n=currencyList.find(e=>e.value===a.currValue);if(n&&!t){l(currencyList=currencyList.slice(0,3),"currency-input");return}(currencyList=r).push({label:a.currValue,value:a.currValue}),l(currencyList,"currency-input")};fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=c23115da6cf642e59b96f32b9d512a4c",{crossDomain:!0,headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},method:"GET"}).then(e=>e.json()).then(e=>{countryInput.value="",currencyList.push({label:"",value:""})}).catch().finally(()=>{countryInput.value="",countryInput.removeAttribute("desabled")});let toggleMonthYear=document.getElementById("toggle-year-month"),yearlyRadio=document.getElementById("calc-yearly"),toggleClass=e=>{let t=document.querySelectorAll(".active");t.forEach(e=>e.classList.remove("active"));let l=document.getElementById(e);l&&l.classList.add("active"),"monthly"===e?toggleMonthYear.checked=!0:yearlyRadio.checked=!0},comData=null,salaryData=(e="monthly")=>{let t=comData[e];if(toggleClass(e),!t)return;let l=comData.categories,r=l.map(t=>{let l=t.subCategories.filter(t=>t.localAmounts[`${e}Value`]&&t.visibility).map(t=>({...t,value:t.localAmounts[`${e}Value`]}));return{...t,value:t.localAmounts[`${e}Value`],subCategories:l,categoryKey:t.key,currency:comData.currency}}),n=r.filter(e=>e.visibility&&e.value),o=n.filter(e=>e.categoryKey.includes("employer")||"skuadFee"===e.categoryKey||"skuadFeeDiscount"===e.categoryKey),c=n.filter(e=>e.categoryKey.includes("employee")),i=n.find(e=>"grossSalary"===e.categoryKey),s=[{label:"Amount you pay",data:o,grossSalaryTitle:`Gross ${"yearly"===e?"annual":"monthly"} pay`,totalEmploymentCost:comData.totalEmploymentCost.localAmounts[`${e}Value`],currency:comData.currency,grossSalary:i.localAmounts[`${e}Value`],durationHeading:`Total ${"yearly"===e?"annual":"monthly"} cost of employment`},{label:"Amount employee gets",data:c,grossSalaryTitle:`Gross ${"yearly"===e?"annual":"monthly"} pay`,totalEmploymentCost:comData.totalEmployeeSalary.localAmounts[`${e}Value`],currency:comData.currency,grossSalary:i.localAmounts[`${e}Value`],durationHeading:`Net ${"yearly"===e?"annual":"monthly"} salary`},];a(s)};function showModalHandler(){document.getElementById("show-calculator-modal").style.display="block"}grossSalaryInput.addEventListener("keyup",t=>{grossSalaryInput.value=o(grossSalaryInput.value),e()});let _handleSubmit=async e=>{e.preventDefault(),countryInput&&(document.getElementById("calculate-salary").innerText="Calculating..."),document.getElementById("calculate-salary").setAttribute("disabled","");let t=countryList.find(e=>e.label===countryInput.value);if(!t)return;let l=currencyList.find(e=>e.label===currencyInput.value),a={countryCode:t.value,salary:grossSalaryInput.value.replaceAll(",",""),currencyCode:l.value},r=!1;t.isExpatApplicable?(r=!!t.isExpatApplicable&&!!document.getElementById("is-expact-no").checked,console.info("checked")):(r=!1,console.info("unchecked"));let o=baseUrl+`?client=website&countryCode=${a.countryCode}&currencyCode=${a.currencyCode}&salary=${a.salary}`,c=document.getElementById("selected-province");c.innerText="";let i={};if(t.provinceList.length){c.innerText=`(${provinceInput.value})`;let s=t.provinceList;i=s.find(e=>e.province.trim()==provinceInput.value)||{}}o=t.isExpatApplicable&&t.provinceList.length?`${o}&isExpat=${r}&provinceCode=${i.provinceCode}`:t.isExpatApplicable?`${o}&isExpat=${r}`:t.provinceList.length?`${o}&provinceCode=${i.provinceCode}`:baseUrl+`?client=website&countryCode=${a.countryCode}&currencyCode=${a.currencyCode}&salary=${a.salary}`,downloadPDFElement.setAttribute("data-country",t.value),downloadPDFElement.setAttribute("data-salary",grossSalaryInput.value.replaceAll(",","")),downloadPDFElement.setAttribute("data-currency",l.value),i.provinceCode?downloadPDFElement.setAttribute("data-province",i.provinceCode):downloadPDFElement.removeAttribute("data-province"),t.isExpatApplicable?downloadPDFElement.setAttribute("data-isexpat",!!r):downloadPDFElement.removeAttribute("data-isexpat"),downloadPDFElement.setAttribute("data-country-name",t.label);let u=await fetch(o);u.json().then(e=>{if(e.success){comData=e.data,dscContainer.classList.remove("more-list"),dscContainer.innerHTML="",getCountryForError.innerText=`Want a detailed breakdown for cost of employment in ${t.label}`,downloadPDFElement.style.display="flex",document.getElementById("err-msg").style.display="none",document.getElementById("calc-selected-country").innerHTML=`- ${t.label}`,comData.currency=l.value,salaryData(),showModalHandler();let a=[...comData.meta||[],...comData.additionalNotes||[]];console.log(a,"metaDsc"),n(a||[]);let r=document.querySelector(".grey-pattern-new"),o=document.querySelector(".left-form-container"),c=document.querySelector(".home-calc-container");r.style.display="block",o.classList.add("adjust-grid"),c.classList.add("adjust-grid-container");let i=document.querySelector(".link-block");i.scrollIntoView({behavior:"smooth"}),document.getElementById("calc-home-img").style.display="none",document.querySelector(".when-get-error").style.display="none",document.querySelector(".when-pdf-downloading").style.display="none",document.querySelector(".when-pdf-downloaded").style.display="none",document.querySelector(".e-mail-submit-wrapper").style.display="block"}else document.getElementById("err-msg").style.display="block",document.getElementById("show-calculator-modal").style.display="none",getCountryForError.innerText=`Want a detailed breakdown for cost of employment in ${countryInput.value}`;document.getElementById("calculate-salary").removeAttribute("disabled"),document.getElementById("calculate-salary").innerText="Calculate",document.getElementById("country-input").value,document.getElementById("calc-selected-country").innerText=`- ${t.label}`}).catch(e=>{document.getElementById("calculate-salary").removeAttribute("disabled"),document.getElementById("calculate-salary").innerText="Calculate"})};form.onsubmit=_handleSubmit,toggleMonthYear.addEventListener("change",e=>{e.target.checked&&salaryData("monthly")}),yearlyRadio.addEventListener("change",e=>{e.target.checked&&salaryData("yearly")});let toggleCountryList=t=>{if(t){t.stopPropagation(),t.target.value&&(t.target.value="");countryListEl.classList.toggle("list-modal"),currencyListEl.classList.add("list-modal"),provinceListEle.classList.add("list-modal"),r(countryList,"","country-list"),e()}else countryListEl.classList.remove("list-modal")},toggleProvinceList=t=>{if(t){t.stopPropagation(),t.target.value&&(t.target.value="");provinceListEle.classList.toggle("list-modal"),countryListEl.classList.add("list-modal"),currencyListEl.classList.add("list-modal"),r(getProvince,"","province-list"),e()}else provinceListEle.classList.remove("list-modal")};countryDownArrow.addEventListener("click",toggleCountryList),countryInput.addEventListener("click",toggleCountryList),provinceInput.addEventListener("click",toggleProvinceList),countryInput.addEventListener("blur",e=>{let t=e.target.value,l=countryList.find(e=>e.label.toLowerCase()===t.toLowerCase());l||(countryInput.value="")});let provinceListElOnClick=t=>{t.preventDefault(),"Item not found"!==t.target.innerText&&"UL"!==t.target.nodeName&&(provinceInput.value=t.target.innerText,e())},getProvince=[],countryListElOnClick=a=>{if(a.preventDefault(),console.log(countryList,"kk"),"Item not found"===a.target.innerText||"UL"===a.target.nodeName)return;provinceInput.value="",countryInput.value=a.target.innerText,currencyCurSelect(a.target.innerText),toggleCountryList(a),l(currencyList,"currency-input");let r=countryList.find(e=>e.label===a.target.innerText);getProvince=r.provinceList.map(e=>({label:e.province,value:e.provinceCode})),"Canada"===r.label?provinceInput.setAttribute("placeholder","Province"):provinceInput.setAttribute("placeholder","State"),getProvince.sort((e,t)=>{let l=e.label.toUpperCase(),a=t.label.toUpperCase();return l<a?-1:l>a?1:0}),getProvince.length?(document.getElementById("show-calc-province").style.display="block",t(getProvince.sort(),"province-list")):document.getElementById("show-calc-province").style.display="none",document.getElementById("is-expact-country").innerText=r.label,r.isExpatApplicable?(document.getElementById("is-expact-yes").checked=!0,document.getElementById("is-expact").style.display="flex"):document.getElementById("is-expact").style.display="none",e()};countryListEl.addEventListener("click",countryListElOnClick),provinceListEle.addEventListener("click",provinceListElOnClick),countryInput.addEventListener("input",e=>{let t=e.target.value;r(countryList,t,"country-list"),toggleCountryList()}),provinceInput.addEventListener("input",e=>{let t=e.target.value;r(getProvince,t,"province-list"),toggleProvinceList()});let toggleCurrencyList=t=>{t.stopPropagation();let l=t.target.value||"";currencyListEl.classList.toggle("list-modal"),countryListEl.classList.add("list-modal"),r(currencyList,l,"currency-list"),e()};function provideCountryToFormHeader(e){console.log(e,"lll"),document.getElementById("your-country").innerText=e,console.log(e,"lll3")}document.body.addEventListener("click",()=>{let e=document.querySelectorAll(".list-cotainer");e.forEach(e=>e.classList.add("list-modal"))}),countryInput.addEventListener("keydown",e=>{let l=e.key,a=countryListEl.querySelector(".active");if("ArrowDown"===l){let r=countryListEl.firstChild;if("Item not found"===r.innerText)return;if(a){let n=a.nextSibling;a.classList.remove("active"),n.classList.add("active")}else r.classList.add("active");a.scrollIntoView({block:"center"})}else if("ArrowUp"===l){let o=countryListEl.lastChild;if(a){let c=a.previousSibling;a.classList.remove("active"),c.classList.add("active")}else o.classList.add("active");a.scrollIntoView({block:"center"})}else if("Enter"===l){e.preventDefault();let i=countryList.find(e=>e.label===a.innerText);getProvince=i.provinceList.map(e=>({label:e.province,value:e.provinceCode})),"Canada"===i.label?provinceInput.setAttribute("placeholder","Province"):provinceInput.setAttribute("placeholder","State"),getProvince.sort((e,t)=>{let l=e.label.toUpperCase(),a=t.label.toUpperCase();return l<a?-1:l>a?1:0}),i.provinceList.length?(document.getElementById("show-calc-province").style.display="block",t(getProvince.sort(),"province-list")):document.getElementById("show-calc-province").style.display="none",countryInput.value=a.innerText,countryListEl.classList.add("list-modal")}}),provinceInput.addEventListener("keydown",e=>{let t=e.key,l=provinceListEle.querySelector(".active");if("ArrowDown"===t){let a=provinceListEle.firstChild;if("Item not found"===a.innerText)return;if(l){let r=l.nextSibling;l.classList.remove("active"),r.classList.add("active")}else a.classList.add("active");l.scrollIntoView({block:"center"})}else if("ArrowUp"===t){let n=provinceListEle.lastChild;if(l){let o=l.previousSibling;l.classList.remove("active"),o.classList.add("active")}else n.classList.add("active");l.scrollIntoView({block:"center"})}else"Enter"===t&&(e.preventDefault(),provinceInput.value=l.innerText,provinceListEle.classList.add("list-modal"))}),document.getElementById("read-more-container").addEventListener("click",()=>{dscContainer.classList.add("more-list")});
