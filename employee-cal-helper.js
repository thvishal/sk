export const currencyLocalMap={INR:"en-IN",USD:"en-US",IDR:"id-ID"};let currencyFormat=({amount:e,currency:t,fixedBy:l=2,locale:a=navigator.language})=>{let n="-";try{if(e||0===e){e=Number(e).toFixed(l);let i=String(e).split(".");n=`${t?t+" ":""}${Intl.NumberFormat(currencyLocalMap[t]||a).format(i[0])}.${i[1]}`}}catch(r){}return n};export const commaSeprateVal=e=>{var t,l,a;return e.toString().replace(/,/gi,"").replace(/^0+|[^\d.]/g,"").split(/(?=(?:\d{3})+$)/).join(",")};export default currencyFormat;export const toggleList=()=>{};export const createList=(e=[],t="country-list")=>{let l=document.getElementById(t);l.innerHTML=null;var a=document.createDocumentFragment();for(let n=0;n<e.length;n++){let i=document.createElement("li"),r=e[n];i.dataset.value=r.value,i.innerText=r.label,i.classList.add("list-items"),a.appendChild(i)}l.appendChild(a)};export const createListCurrency=(e=[],t="currency-input")=>{let l=document.getElementById(t);l.innerHTML=null;for(let a=0;a<e.length;a++){let n=document.createElement("option"),i=e[a];n.value=i.value,n.innerText=i.label,n.classList.add("list-items"),l.appendChild(n)}};export const filterList=(e=[],t="",l)=>{let a=e.filter(e=>e.label.toLowerCase().includes(t?.toLowerCase()));a.length||(a=[{label:"Item not found",disabled:!0}]),createList(a,l)};export const createTaxList=(e=[],t="")=>{let l=document.createElement("div");l.classList.add("inner-breakup");let a=document.createElement("div");a.classList="breakups-main cont-breakup hidden";for(let n=0;n<e.length;n++){let i=e[n],r=document.createElement("ul");r.classList="d-flex-new justify-content-space-between acc-item-container";let d=document.createElement("li");d.innerHTML=i.label;let c=document.createElement("li");if(null===c)continue;let s=currencyFormat({amount:i.value,currency:t||"USD"});c.innerHTML=s,c.classList.add("ml-auto"),r.appendChild(d),r.appendChild(c),l.appendChild(r)}return a.appendChild(l),a};export const checkDisabledBtn=()=>{let e=document.getElementById("country-input-new").value,t=document.getElementById("currency-input").value,l=document.getElementById("gross-salary-input-new").value,a=document.getElementById("province-list"),n=document.getElementById("province-input-new").value,i=document.getElementById("calculate-salary"),r="block"===a.parentElement.style.display;e&&t&&l&&(!r||r&&n)?(i.removeAttribute("disabled"),i.classList.add("calculate-active")):i.setAttribute("disabled",!0)};export const updateMeta=e=>{let t=document.createElement("ul");e.forEach((e,l)=>{if(0==l){let a=document.createElement("li");a.classList.add("calculator-dsc"),a.innerHTML=`<span>Note:</span> ${e}`,t.appendChild(a)}else{let n=document.createElement("li");n.innerText=e.replace(/[\r\n]/gm,""),t.appendChild(n),n.classList.add("calculator-dsc")}});let l=document.getElementById("dsc-container");l.innerHTML="",l.appendChild(t)};export const createSuggestedCountryList=e=>{let t=document.getElementById("suggestedCountries");e.forEach(e=>{let l=document.createElement("li"),a=document.createElement("a"),n=e.label,i=e.value;a.innerText=n,a.setAttribute("data-code",i),l.appendChild(a),t.appendChild(l)})};let toolTipEle=`<div class="tool-tip">
<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.98846 8.8497C9.98846 8.57999 9.7698 8.36133 9.50009 8.36133C9.23038 8.36133 9.01172 8.57999 9.01172 8.8497V12.7567C9.01172 13.0264 9.23038 13.245 9.50009 13.245C9.7698 13.245 9.98846 13.0264 9.98846 12.7567V8.8497Z" fill="#454545"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 2.5C5.63401 2.5 2.5 5.63401 2.5 9.5C2.5 13.366 5.63401 16.5 9.5 16.5C13.366 16.5 16.5 13.366 16.5 9.5C16.5 5.63401 13.366 2.5 9.5 2.5ZM3.47674 9.5C3.47674 6.17345 6.17345 3.47674 9.5 3.47674C12.8265 3.47674 15.5233 6.17345 15.5233 9.5C15.5233 12.8265 12.8265 15.5233 9.5 15.5233C6.17345 15.5233 3.47674 12.8265 3.47674 9.5Z" fill="#454545"/>
<path d="M10.151 6.8953C10.151 7.25493 9.85943 7.54647 9.4998 7.54647C9.14016 7.54647 8.84863 7.25493 8.84863 6.8953C8.84863 6.53568 9.14016 6.24414 9.4998 6.24414C9.85943 6.24414 10.151 6.53568 10.151 6.8953Z" fill="#454545"/>
</svg>
<span class="tooltiptext">__tooltiptext__</span>
</div>`,arrowImage="https://uploads-ssl.webflow.com/663a4b85a1b7569ce537a239/667e5306779f52c64d758307_Vector%20(3).svg",getParentsElement=(e,t)=>e.classList.contains(t)?e:getParentsElement(e.parentElement,t);function toggleBreakUpHeight(e){if(e.clientHeight>20)e.style.height=0;else{let t=e.querySelector(".inner-breakup");e.style.height=t.clientHeight+16+"px"}}let toggleBreakups=e=>{let t=getParentsElement(e.target,"accordian-main"),l=t.nextSibling;l.classList.toggle("hidden");let a=t.children[0].lastChild;a.classList.toggle("rotate-180"),toggleBreakUpHeight(l)};export const createAccordian=e=>{let t=document.createElement("div");t.classList.add("accordian-section");let l=e.find(e=>"skuadFeeDiscount"===e.key),a=e.filter(e=>"skuadFeeDiscount"!==e.key);return a.forEach(e=>{let a=document.createElement("div"),n=document.createElement("div");n.classList="accordian-main d-flex-new",n.style.width="100%",n.style.justifyContent="space-between";let i=document.createElement("div");i.classList="d-flex-align-center";let r=document.createElement("div");r.classList="d-flex-new";let d=document.createElement("p");d.classList.add("skuad-fee"),d.innerText=e.label,i.appendChild(d);let c=document.createElement("div");if(c.classList.add("new-heading-wrapper"),c.appendChild(d),i.appendChild(c),"skuadFee"===e.key&&l){let s=document.createElement("div");s.classList.add("skuad-offer-label"),s.innerText="Exclusive offer",i.classList.add("dis-offer-active"),i.appendChild(s)}if(e.tooltip){let o=document.createElement("div");o.classList.add("tooltip-container"),o.innerHTML=toolTipEle.replace("__tooltiptext__",e.tooltip),c.appendChild(o)}if(e.subCategories.length){let p=document.createElement("img");p.src="https://uploads-ssl.webflow.com/663a4b85a1b7569ce537a239/667e5306779f52c64d758307_Vector%20(3).svg",i.appendChild(p),n.addEventListener("click",toggleBreakups)}let u=document.createElement("div");u.classList.add("right-inner-container");let m=document.createElement("p");if(m.classList.add("right-side-value"),m.innerText=currencyFormat({amount:e.value,currency:e.currency||"USD"}),"skuadFee"===e.key&&l?(r.classList.add("offer-active"),u.appendChild(m),r.appendChild(u)):r.appendChild(m),"skuadFee"===e.key&&l){let h=e.value+l.value,g=document.createElement("div");g.classList.add("skuad-dis-fee");let _=document.createElement("p");_.classList.add("old-skuad-fee"),_.innerText=currencyFormat({amount:h,currency:e.currency||"USD"}),g.appendChild(_),r.appendChild(g)}n.appendChild(i),n.appendChild(r);let C=createTaxList(e.subCategories,e.currency);a.appendChild(n),C&&a.appendChild(C),t.appendChild(a)}),t};export const createSalaryTemplate=e=>{let t=document.createDocumentFragment();e.forEach((e,l)=>{e.data.filter(e=>e.visibility);let a=document.createElement("div");a.classList.add("salary-contribution");let n=document.createElement("h2");n.innerText=e.label;let i=document.createElement("div");i.classList.add("cost-label-align");let r=document.createElement("p");r.classList.add("duration-title"),r.innerText=e.grossSalaryTitle,i.appendChild(r);let d=document.createElement("div");d.classList.add("d-flex-new");let c=document.createElement("p");c.classList.add("duration-salary"),c.innerText=currencyFormat({amount:e.grossSalary,currency:e.currency||"USD"}),d.appendChild(c),i.appendChild(d),a.appendChild(n),a.appendChild(i);let s=createAccordian(e.data);a.appendChild(s);let o=document.createElement("div");o.classList.add("employment-cost");let p=document.createElement("p");p.classList.add("employment-cost-label"),p.innerText=e.durationHeading,o.appendChild(p);let u=document.createElement("div");u.classList.add("d-flex-new");let m=document.createElement("p");m.classList.add("duration-salary"),m.innerText=currencyFormat({amount:e.totalEmploymentCost,currency:e.currency||"USD"}),u.appendChild(m),o.appendChild(u),e?.data?.length&&a.appendChild(o),t.appendChild(a)});let l=document.getElementById("calculation-wrapper");if(l.innerHTML="",l.appendChild(t),"/country-cost-calculator"===window.location.pathname||"/cost-calculator-sm"===window.location.pathname||"https://skuad-web.webflow.io/"===window.location.href){let a=document.querySelector("#calculation-wrapper");a.children[1].classList.add("second")}};
