(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function c(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(e){if(e.ep)return;e.ep=!0;const n=c(e);fetch(e.href,n)}})();function S(r,o,c){for(var t=r.toString(),e=t.length-1,n=0,a=t.indexOf(".")!=-1&&typeof c<"u"?1:0,u=a?c:typeof o<"u"?o:" ";e>=0;)t.charAt(e)=="."?(n=0,e--,u=typeof o<"u"?o:" "):n%3==0&&n!=0&&t.charAt(e)!="."&&(t=t.slice(0,e+1)+u+t.slice(e+1),n=0),n++,e--;return t}var b=S;const y=document.getElementById("restartBtn"),k=document.getElementById("firstCountryImg"),R=document.getElementById("secondCountryImg"),N=document.getElementById("countryOneName"),M=document.getElementById("countryTwoName"),E=document.getElementById("countryOneValue"),T=document.querySelectorAll(".questionText"),f=document.getElementById("moreBtn"),p=document.getElementById("lessBtn"),v=document.getElementById("currentScoreText"),B=document.getElementById("currentScoreValue"),V=document.getElementById("maxScoreValue"),I=document.getElementById("currentScoreContainer"),w=()=>{y.style.display=y.style.display=="none"?"block":"none"},q=()=>{let r=0,o=0,c="population",t=[],e=[],n=[],a,u;const g=async()=>{f.addEventListener("click",i.playRound),p.addEventListener("click",i.playRound),t=await m(),e=await m(),n=await m(),h()},h=()=>{k.src=`${t.flag}`,R.src=`${e.flag}`,N.innerText=t.name,M.innerText=e.name,C()},x=async()=>{t=e,e=n,h(),n=await m()},C=()=>{const l=["area","population"];let d=Math.round(Math.random()*(l.length-1));c=l[d],c=="population"&&(E.innerText=b(t.population),T.forEach(s=>s.innerText="habitants")),c=="area"&&(E.innerText=`${t.area} km2`,T.forEach(s=>s.innerText="territory"))},L=l=>{const d=l.target.innerText;let s;c=="population"&&(a=t.population,u=e.population),c=="area"&&(a=t.area,u=e.area),d=="More"&&(s=u>=a),d=="Less"&&(s=u<=a),s&&(x(),O()),s||(o=r>o?r:o,f.addEventListener("click",i.playRound),p.removeEventListener("click",i.playRound),v.innerText="Game Over, Final Score: ",I.style.color="red",w())},O=()=>{r++,B.innerText=r};return{getCountries:g,restartGame:()=>{V.innerText=o,r=0,B.innerText=r,v.innerText="Current score: ",I.style.color="blue",g(),w()},changeFlags:x,playRound:L}},i=q();document.addEventListener("DOMContentLoaded",i.getCountries);f.addEventListener("click",i.playRound);p.addEventListener("click",i.playRound);async function A(){const r=[];return await(await(await fetch("https://restcountries.com/v3.1/all")).json()).forEach(t=>{const e={name:t.name.common,population:t.population,area:t.area,flag:t.flags.svg,alpha3Code:t.cca3};r.push(e)}),r}async function m(){const r=await A(),o=r.length-1,c=Math.ceil(Math.random()*o);return r[c]}y.addEventListener("click",i.restartGame);
