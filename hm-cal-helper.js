export const currencyLocalMap={INR:"en-IN",USD:"en-US",IDR:"id-ID"};let currencyFormat=({amount:e,currency:t,fixedBy:l=2,locale:a=navigator.language})=>{let n="-";try{if(e||0===e){e=Number(e).toFixed(l);let r=String(e).split(".");n=`${t?t+" ":""}${Intl.NumberFormat(currencyLocalMap[t]||a).format(r[0])}.${r[1]}`}}catch(i){}return n};export const commaSeprateVal=e=>{var t,l,a;return e.toString().replace(/,/gi,"").replace(/^0+|[^\d.]/g,"").split(/(?=(?:\d{3})+$)/).join(",")};export default currencyFormat;export const createList=(e=[],t="country-list")=>{let l=document.getElementById(t);l.innerHTML=null;var a=document.createDocumentFragment();for(let n=0;n<e.length;n++){let r=document.createElement("li"),i=e[n];r.dataset.value=i.value,r.innerText=i.label,r.classList.add("list-items"),a.appendChild(r)}l.appendChild(a)};export const createListCurrency=(e=[],t="currency-input")=>{let l=document.getElementById(t);l.innerHTML=null;for(let a=0;a<e.length;a++){let n=document.createElement("option"),r=e[a];n.value=r.value,n.innerText=r.label,n.classList.add("list-items"),l.appendChild(n)}};export const filterList=(e=[],t="",l)=>{let a=e.filter(e=>e.label.toLowerCase().includes(t?.toLowerCase()));a.length||(a=[{label:"Country is not found",disabled:!0}]),createList(a,l)};export const createTaxList=(e=[],t="")=>{let l=document.createElement("div");l.classList.add("inner-breakup");let a=document.createElement("div");a.classList="breakups-main cont-breakup hidden";for(let n=0;n<e.length;n++){let r=e[n],i=document.createElement("ul");i.classList="d-flex-new justify-content-space-between acc-item-container";let d=document.createElement("li");d.innerHTML=r.label;let s=document.createElement("li");if(null===s)continue;let c=currencyFormat({amount:r.value,currency:t||"USD"});s.innerHTML=c,s.classList.add("ml-auto"),i.appendChild(d),i.appendChild(s),l.appendChild(i)}return a.appendChild(l),a};export const checkDisabledBtn=()=>{let e=document.getElementById("country-input").value,t=document.getElementById("currency-input").value,l=document.getElementById("gross-salary-input").value,a=document.getElementById("province-list"),n=document.getElementById("province-input").value,r=document.getElementById("calculate-salary"),i="block"===a.parentElement.style.display;e&&t&&l&&(!i||i&&n)?(r.removeAttribute("disabled"),r.classList.add("calculate-active")):r.setAttribute("disabled",!0)};let isExpanded=!1,readMore=document.getElementById("read-more-container");function showMoreItems(e){let t=e.children;for(let l=2;l<t.length;l++)t[l].style.display=isExpanded?"none":"block";let a=readMore.querySelector("span"),n=readMore.querySelector("img");n.style.rotate=isExpanded?"360deg":"180deg",a.innerText=isExpanded?"Read more":"Read less",isExpanded=!isExpanded}export const updateMeta=e=>{readMore.classList.remove("read-more-hide"),console.log();let t=document.createElement("ul");for(let l=0;l<e.length;l++){let a=document.createElement("li");l>1&&(a.style.display="none"),a.innerText=e[l].replace(/[\r\n]/gm,""),t.appendChild(a),a.classList.add("calculator-dsc")}let n=document.getElementById("dsc-container");n.innerHTML="",n.appendChild(t);let r=e.length;r>2?(readMore.classList.add("d-more-list-btn"),readMore.addEventListener("click",()=>showMoreItems(t))):readMore.classList.remove("d-more-list-btn")};export const createSuggestedCountryList=e=>{let t=document.getElementById("suggestedCountries");e.forEach(e=>{let l=document.createElement("li"),a=document.createElement("a"),n=e.label,r=e.value;a.innerText=n,a.setAttribute("data-code",r),l.appendChild(a),t.appendChild(l)})};let toolTipEle=`<div class="tool-tip">

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="16px" height="16px" fill-rule="nonzero"><g fill="#667085" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M25,2c-12.6907,0 -23,10.3093 -23,23c0,12.69071 10.3093,23 23,23c12.69071,0 23,-10.30929 23,-23c0,-12.6907 -10.30929,-23 -23,-23zM25,4c11.60982,0 21,9.39018 21,21c0,11.60982 -9.39018,21 -21,21c-11.60982,0 -21,-9.39018 -21,-21c0,-11.60982 9.39018,-21 21,-21zM25,11c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3zM21,21v2h1h1v13h-1h-1v2h1h1h4h1h1v-2h-1h-1v-15h-1h-4z"></path></g></g></svg>
<span class="tooltiptext">__tooltiptext__</span>
</div>`,arrowImage="https://uploads-ssl.webflow.com/61cda68a44d858d793b97e11/6436b07536f3aab95d48a418_Arrow.svg",getParentsElement=(e,t)=>e.classList.contains(t)?e:getParentsElement(e.parentElement,t);function toggleBreakUpHeight(e){if(e.clientHeight>20)e.style.height=0;else{let t=e.querySelector(".inner-breakup");e.style.height=t.clientHeight+16+"px"}}let toggleBreakups=e=>{let t=getParentsElement(e.target,"accordian-main"),l=t.nextSibling;l.classList.toggle("hidden");let a=t.children[0].lastChild;a.classList.toggle("rotate-180"),toggleBreakUpHeight(l)};export const createAccordian=e=>{let t=document.createElement("div");t.classList.add("accordian-section");let l=e.find(e=>"skuadFeeDiscount"===e.key),a=e.filter(e=>"skuadFeeDiscount"!==e.key);return a.forEach(e=>{let a=document.createElement("div"),n=document.createElement("div");n.classList="accordian-main d-flex-new",n.style.width="100%",n.style.justifyContent="space-between";let r=document.createElement("div");r.classList="d-flex-align-center";let i=document.createElement("div");i.classList="d-flex-new";let d=document.createElement("p");d.classList.add("skuad-fee"),d.innerText=e.label,r.appendChild(d);let s=document.createElement("div");if(s.classList.add("new-heading-wrapper"),s.appendChild(d),r.appendChild(s),"skuadFee"===e.key&&l){let c=document.createElement("div");c.classList.add("skuad-offer-label"),c.innerText="✨ Exclusive offer ✨",r.classList.add("dis-offer-active"),r.appendChild(c)}if(e.tooltip){let o=document.createElement("div");o.classList.add("tooltip-container"),o.innerHTML=toolTipEle.replace("__tooltiptext__",e.tooltip),s.appendChild(o)}if(e.subCategories.length){let p=document.createElement("img");p.src="https://uploads-ssl.webflow.com/61cda68a44d858d793b97e11/6436b07536f3aab95d48a418_Arrow.svg",r.appendChild(p),n.addEventListener("click",toggleBreakups)}let u=document.createElement("div");u.classList.add("right-inner-container");let m=document.createElement("p");if(m.classList.add("right-side-value"),m.innerText=currencyFormat({amount:e.value,currency:e.currency||"USD"}),"skuadFee"===e.key&&l?(i.classList.add("offer-active"),u.appendChild(m),i.appendChild(u)):i.appendChild(m),"skuadFee"===e.key&&l){let h=e.value+l.value,g=document.createElement("div");g.classList.add("skuad-dis-fee");let _=document.createElement("p");_.classList.add("old-skuad-fee"),_.innerText=currencyFormat({amount:h,currency:e.currency||"USD"}),g.appendChild(_),i.appendChild(g)}n.appendChild(r),n.appendChild(i);let y=createTaxList(e.subCategories,e.currency);a.appendChild(n),y&&a.appendChild(y),t.appendChild(a)}),t};export const createSalaryTemplate=e=>{let t=document.createDocumentFragment();e.forEach(e=>{e.data.filter(e=>e.visibility);let l=document.createElement("div");l.classList.add("salary-contribution");let a=document.createElement("h2");a.innerText=e.label;let n=document.createElement("div");n.classList.add("cost-label-align");let r=document.createElement("p");r.classList.add("duration-title"),r.innerText=e.grossSalaryTitle,n.appendChild(r);let i=document.createElement("div");i.classList.add("d-flex-new");let d=document.createElement("p");d.classList.add("duration-salary"),d.innerText=currencyFormat({amount:e.grossSalary,currency:e.currency||"USD"}),i.appendChild(d),n.appendChild(i),l.appendChild(a),l.appendChild(n);let s=createAccordian(e.data);l.appendChild(s);let c=document.createElement("div");c.classList.add("employment-cost");let o=document.createElement("p");o.classList.add("employment-cost-label"),o.innerText=e.durationHeading,c.appendChild(o);let p=document.createElement("div");p.classList.add("d-flex-new");let u=document.createElement("p");u.classList.add("duration-salary"),u.innerText=currencyFormat({amount:e.totalEmploymentCost,currency:e.currency||"USD"}),p.appendChild(u),c.appendChild(p),console.log(e.data,u,p,"data"),e?.data?.length&&l.appendChild(c),t.appendChild(l)});let l=document.getElementById("calculation-wrapper");l.innerHTML="",l.appendChild(t);let a=document.querySelector("#calculation-wrapper");a.children[1].classList.add("second")};
