// UI for Электрик Pro. Needs LESSONS from lessons.js.
const PAYWALL=false; // true = intermediate and advanced levels need payment
const UI={
ru:{brand:'Электрик Pro',tag:'От новичка до мастера · 13 уроков со схемами',prog:'Ваш прогресс',of:(d,t)=>`${d} из ${t} уроков`,
 lv:['Начальный','Средний','Продвинутый'],free:'Бесплатно',pro:'Pro',lockedHint:'Пройдите предыдущий урок',locked:'Закрыто',done:'Пройдено',
 tabs:['Уроки','Калькулятор'],all:'‹ Все уроки',lvl:(lv,n,m)=>`${lv} уровень · урок ${n} · ~${m} мин`,
 leg:{L:'Фаза L (коричневый)',N:'Ноль N (синий)',PE:'Земля PE (жёлто-зелёный)',T:'Перемычки',K:'Фаза L2 (чёрный)',G:'Фаза L3 (серый)'},
 warnB:'Опасно для жизни.',warn:'Работайте только при отключённом автомате. Проверьте отсутствие напряжения на каждом проводе.',
 stepsT:'Пошагово',tipT:'Важно',start:n=>`Пройти тест · ${n} вопроса`,openCalc:'Открыть калькулятор',toL:'‹ К уроку',qt:'Тест',qsub:(k,n)=>`Ответьте верно на ${k} из ${n}, чтобы открыть следующий урок`,
 qn:(i,n)=>`Вопрос ${i} из ${n}`,ok:s=>`Верно: ${s}`,right:'Верно.',wrong:'Неверно.',next:'Дальше',res:'Результат',
 passT:'Урок пройден!',failT:'Почти получилось',passNext:t=>`Открыт следующий урок: «${t}».`,passLast:'Вы прошли все уроки этого уровня.',fail:(k,n)=>`Нужно ${k} правильных ответа из ${n}. Перечитайте урок и попробуйте ещё раз.`,retry:'Пройти тест ещё раз',home:'К списку уроков',nextL:'Следующий урок',
 calcT:'Калькулятор',calcSub:'Ток, автомат и сечение медного кабеля',pw:'Мощность приборов, Вт',net:'Сеть',ph1:'1 фаза, 220 В',ph3:'3 фазы, 380 В',len:'Длина линии, м',
 cur:'Ток',brk:'Автомат',cab:'Кабель (медь)',calcNote:'Для 3 фаз расчёт при cos φ = 0,9. Длинная линия (больше 30 м) — кабель на размер больше.',tooBig:'Больше 63 А: нужен расчёт проектировщика.',
 reset:'Сбросить прогресс',paid:'Доступно в версии Pro'},
uz:{brand:'Elektrik Pro',tag:'Yangi boshlovchidan ustagacha · sxemali 13 ta dars',prog:'Sizning natijangiz',of:(d,t)=>`${t} tadan ${d} ta dars`,
 lv:['Boshlang\'ich','O\'rta','Yuqori'],free:'Bepul',pro:'Pro',lockedHint:'Oldingi darsni o\'ting',locked:'Yopiq',done:'O\'tildi',
 tabs:['Darslar','Kalkulyator'],all:'‹ Barcha darslar',lvl:(lv,n,m)=>`${lv} daraja · ${n}-dars · ~${m} daq`,
 leg:{L:'Faza L (jigarrang)',N:'Nol N (ko\'k)',PE:'Yerga ulash PE (sariq-yashil)',T:'Peremichkalar',K:'Faza L2 (qora)',G:'Faza L3 (kulrang)'},
 warnB:'Hayot uchun xavfli.',warn:'Faqat avtomat o\'chirilganda ishlang. Har bir simda kuchlanish yo\'qligini tekshiring.',
 stepsT:'Bosqichma-bosqich',tipT:'Muhim',start:n=>`Testdan o\'tish · ${n} ta savol`,openCalc:'Kalkulyatorni ochish',toL:'‹ Darsga qaytish',qt:'Test',qsub:(k,n)=>`Keyingi darsni ochish uchun ${n} tadan ${k} tasiga to\'g\'ri javob bering`,
 qn:(i,n)=>`Savol ${i} / ${n}`,ok:s=>`To\'g\'ri: ${s}`,right:'To\'g\'ri.',wrong:'Noto\'g\'ri.',next:'Keyingisi',res:'Natija',
 passT:'Dars o\'tildi!',failT:'Sal qoldi',passNext:t=>`Keyingi dars ochildi: «${t}».`,passLast:'Siz bu darajadagi barcha darslarni o\'tdingiz.',fail:(k,n)=>`${n} tadan ${k} ta to\'g\'ri javob kerak. Darsni qayta o\'qing va yana urinib ko\'ring.`,retry:'Testni qayta topshirish',home:'Darslar ro\'yxatiga',nextL:'Keyingi dars',
 calcT:'Kalkulyator',calcSub:'Tok, avtomat va mis kabel kesimi',pw:'Asboblar quvvati, Vt',net:'Tarmoq',ph1:'1 faza, 220 V',ph3:'3 faza, 380 V',len:'Liniya uzunligi, m',
 cur:'Tok',brk:'Avtomat',cab:'Kabel (mis)',calcNote:'3 faza uchun cos φ = 0,9 bilan hisoblangan. Uzun liniya (30 m dan ortiq) — bir o\'lcham katta kabel.',tooBig:'63 A dan ortiq: loyihachi hisobi kerak.',
 reset:'Natijani tozalash',paid:'Pro versiyada mavjud'}};

const store={get(k,d){try{const v=localStorage.getItem('ep_'+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem('ep_'+k,JSON.stringify(v))}catch(e){}}};
let lang=store.get('lang','ru');
let done=new Set(store.get('done',[]));
let S={screen:'home',tab:0,id:null,qi:0,score:0,picked:null,calc:{p:3000,ph:1,len:15}};
const $=s=>document.querySelector(s);
const app=$('#app');
const U=()=>UI[lang];
const tr=o=>o&&(o[lang]??o.ru);
const tg=window.Telegram&&window.Telegram.WebApp;if(tg){try{tg.ready();tg.expand()}catch(e){}}

const byLv=lv=>LESSONS.filter(x=>x.lv===lv);
const isPaid=x=>PAYWALL&&x.lv>0;
function isOpen(x){if(isPaid(x))return false;const list=byLv(x.lv);const i=list.indexOf(x);return i===0||done.has(list[i-1].id)}
const need=n=>Math.ceil(n*0.75);

const bolt='<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="var(--accent-ink)"/></svg>';
const lockI=()=>`<svg class="ic" width="18" height="18" viewBox="0 0 24 24" aria-label="${U().locked}"><rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
const langSw=()=>`<div class="lang" role="group" aria-label="Til / Язык"><button type="button" data-l="ru" aria-pressed="${lang==='ru'}">RU</button><button type="button" data-l="uz" aria-pressed="${lang==='uz'}">UZ</button></div>`;
const swatch={L:'var(--wL)',N:'var(--wN)',PE:'repeating-linear-gradient(90deg,var(--wPE1) 0 6px,var(--wPE2) 6px 12px)',T:'var(--wT)',K:'var(--wK)',G:'var(--wG)'};

function header(inner){return `<header class="bar">${inner}</header>`}
function tabs(){const L=U();return `<nav class="tabs" role="tablist">${L.tabs.map((t,i)=>`<button type="button" role="tab" aria-selected="${S.tab===i}" data-tab="${i}">${t}</button>`).join('')}</nav>`}

function home(){
  const L=U();const total=LESSONS.length;const d=LESSONS.filter(x=>done.has(x.id)).length;
  let h=header(`<div class="row"><div class="brand"><div class="logo">${bolt}</div><div><h1>${L.brand}</h1><p>${L.tag}</p></div></div>${langSw()}</div>`)+tabs();
  if(S.tab===1){app.innerHTML=h+`<main class="wrap">${calcBlock()}</main>`;bindCalc();return}
  h+=`<main class="wrap"><div class="progress"><div class="t"><span>${L.prog}</span><b>${L.of(d,total)}</b></div><div class="meter"><i style="width:${d/total*100}%"></i></div></div>`;
  [0,1,2].forEach(lv=>{
    const chip=lv===0||!PAYWALL?'':`<span class="chip pro">${L.pro}</span>`;
    h+=`<section class="level"><h2>${L.lv[lv]} ${lv===0&&PAYWALL?`<span class="chip free">${L.free}</span>`:chip}</h2><div class="list">`;
    byLv(lv).forEach((x,i)=>{
      const open=isOpen(x),isDone=done.has(x.id);
      const cls=isDone?'done open':open?'open':'locked';
      const right=isDone?`<span class="go" aria-label="${L.done}">✓</span>`:open?'<span class="go">›</span>':lockI();
      const sub=!open&&!isDone?(isPaid(x)?L.paid:tr(x.s)):tr(x.s);
      h+=open||isDone?`<button class="item ${cls}" type="button" data-id="${x.id}">`:`<div class="item ${cls}">`;
      h+=`<span class="n">${i+1}</span><span class="tx"><b>${tr(x.t)}</b><span>${sub}</span></span>${right}${open||isDone?'</button>':'</div>'}`;
    });
    h+='</div></section>';
  });
  h+=`<button class="link" id="reset" type="button">${L.reset}</button></main>`;
  app.innerHTML=h;
  document.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>{S.id=b.dataset.id;go('lesson')});
  const r=$('#reset');r.onclick=()=>{if(r.dataset.c){done=new Set();store.set('done',[]);render()}else{r.dataset.c=1;r.textContent=lang==='ru'?'Нажмите ещё раз, чтобы сбросить':'Tozalash uchun yana bosing'}};
}

function lesson(){
  const L=U();const x=LESSONS.find(y=>y.id===S.id);const list=byLv(x.lv);const n=list.indexOf(x)+1;
  let h=header(`<div class="row"><button class="back" id="back" type="button">${L.all}</button>${langSw()}</div><h1 class="ttl">${tr(x.t)}</h1><p>${L.lvl(L.lv[x.lv],n,x.min)}</p>`)+'<main class="wrap">';
  if(x.svg){h+=`<div class="card diagram"><div class="sv">${x.svg(lang)}</div>`;
    if(x.legend)h+=`<div class="legend">${x.legend.map(k=>`<span><i class="sw" style="background:${swatch[k]}"></i>${L.leg[k]}</span>`).join('')}</div>`;h+='</div>'}
  if(x.lv!==0||x.id!=='b2')h+=`<div class="warn"><span aria-hidden="true">⚠</span><div><b>${L.warnB}</b> ${L.warn}</div></div>`;
  if(x.table){h+=`<div class="card tbl"><table><thead><tr>${tr(x.table.head).map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${tr(x.table.rows).map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
  h+=`<div class="card stack"><h3>${L.stepsT}</h3><ol class="steps">${tr(x.steps).map(s=>`<li><span>${s}</span></li>`).join('')}</ol><p class="tip"><b>${L.tipT}:</b> ${tr(x.tip)}</p></div>`;
  if(x.calc)h+=`<button class="btn ghost" id="calc" type="button">${L.openCalc}</button>`;
  h+=`<button class="btn" id="start" type="button">${L.start(x.quiz.length)}</button></main>`;
  app.innerHTML=h;
  $('#back').onclick=()=>go('home');
  $('#start').onclick=()=>{S.qi=0;S.score=0;S.picked=null;go('quiz')};
  const c=$('#calc');if(c)c.onclick=()=>{S.tab=1;go('home')};
}

function quiz(){
  const L=U();const x=LESSONS.find(y=>y.id===S.id);const QZ=x.quiz;const item=QZ[S.qi];const Q=tr(item);const p=S.picked;
  const opts=Q.o.map((o,i)=>{let c='opt';if(p!==null){if(i===item.a)c+=' right';else if(i===p)c+=' wrong'}return `<button class="${c}" data-i="${i}" type="button" ${p!==null?'disabled':''}>${o}</button>`}).join('');
  app.innerHTML=header(`<div class="row"><button class="back" id="back" type="button">${L.toL}</button>${langSw()}</div><h1 class="ttl">${L.qt}: ${tr(x.t)}</h1><p>${L.qsub(need(QZ.length),QZ.length)}</p>`)+`<main class="wrap">
   <div class="progress"><div class="q-top"><span>${L.qn(S.qi+1,QZ.length)}</span><span>${L.ok(S.score)}</span></div><div class="meter"><i style="width:${(S.qi+(p!==null?1:0))/QZ.length*100}%"></i></div></div>
   <p class="q">${Q.q}</p><div class="opts">${opts}</div>
   ${p!==null?`<p class="expl">${p===item.a?`<b class="okc">${L.right}</b> `:`<b class="badc">${L.wrong}</b> `}${Q.e}</p><button class="btn" id="next" type="button">${S.qi<QZ.length-1?L.next:L.res}</button>`:''}
  </main>`;
  $('#back').onclick=()=>go('lesson');
  document.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{S.picked=+b.dataset.i;if(S.picked===item.a)S.score++;render()});
  const n=$('#next');if(n)n.onclick=()=>{if(S.qi<QZ.length-1){S.qi++;S.picked=null;go('quiz')}else{const pass=S.score>=need(QZ.length);if(pass){done.add(x.id);store.set('done',[...done])}go('result')}};
}

function result(){
  const L=U();const x=LESSONS.find(y=>y.id===S.id);const n=x.quiz.length;const pass=S.score>=need(n);
  const list=byLv(x.lv);const nx=list[list.indexOf(x)+1];
  app.innerHTML=header(`<div class="row"><div><h1>${L.res}</h1><p>${tr(x.t)}</p></div>${langSw()}</div>`)+`<main class="wrap"><div class="card result">
   <div class="score">${S.score} / ${n}</div><h3>${pass?L.passT:L.failT}</h3>
   <p class="expl">${pass?(nx?L.passNext(tr(nx.t)):L.passLast):L.fail(need(n),n)}</p></div>
   ${pass&&nx?`<button class="btn" id="nextL" type="button">${L.nextL}</button>`:''}
   ${pass?'':`<button class="btn" id="retry" type="button">${L.retry}</button>`}
   <button class="btn ghost" id="home" type="button">${L.home}</button></main>`;
  $('#home').onclick=()=>go('home');
  const r=$('#retry');if(r)r.onclick=()=>{S.qi=0;S.score=0;S.picked=null;go('quiz')};
  const nl=$('#nextL');if(nl)nl.onclick=()=>{S.id=nx.id;go('lesson')};
}

/* calculator */
const BRK=[6,10,16,20,25,32,40,50,63];
const CAB={6:'1,5',10:'1,5',16:'2,5',20:'4',25:'4',32:'6',40:'10',50:'10',63:'16'};
function calcVals(){const c=S.calc;const P=+c.p||0;const I=c.ph===3?P/(Math.sqrt(3)*380*0.9):P/220;
  const b=BRK.find(v=>v>=I);let cab=b?CAB[b]:null;
  if(cab&&+c.len>30){const sizes=['1,5','2,5','4','6','10','16','25'];cab=sizes[Math.min(sizes.indexOf(cab)+1,sizes.length-1)]}
  return {I,b,cab}}
function calcBlock(){const L=U();const c=S.calc;
  return `<div class="card stack"><div><h3>${L.calcT}</h3><p class="expl">${L.calcSub}</p></div>
  <label class="fld" for="cp">${L.pw}<input id="cp" type="number" inputmode="numeric" min="0" step="100" value="${c.p}"></label>
  <div class="fld"><span>${L.net}</span><div class="seg" role="group"><button type="button" data-ph="1" aria-pressed="${c.ph===1}">${L.ph1}</button><button type="button" data-ph="3" aria-pressed="${c.ph===3}">${L.ph3}</button></div></div>
  <label class="fld" for="cl">${L.len}<input id="cl" type="number" inputmode="numeric" min="0" step="1" value="${c.len}"></label>
  <div class="out" id="out"></div><p class="expl">${L.calcNote}</p></div>`}
function paintCalc(){const L=U();const v=calcVals();const o=$('#out');if(!o)return;
  o.innerHTML=`<div><span>${L.cur}</span><b>${v.I.toFixed(1).replace('.',',')} ${lang==='ru'?'А':'A'}</b></div>`+(v.b?`<div><span>${L.brk}</span><b>C${v.b}</b></div><div><span>${L.cab}</span><b>${v.cab} ${lang==='ru'?'мм²':'mm²'}</b></div>`:`<div class="wide"><b class="badc">${L.tooBig}</b></div>`)}
function bindCalc(){
  $('#cp').oninput=e=>{S.calc.p=e.target.value;paintCalc()};
  $('#cl').oninput=e=>{S.calc.len=e.target.value;paintCalc()};
  document.querySelectorAll('[data-ph]').forEach(b=>b.onclick=()=>{S.calc.ph=+b.dataset.ph;document.querySelectorAll('[data-ph]').forEach(x=>x.setAttribute('aria-pressed',x===b));paintCalc()});
  paintCalc()}

function bindCommon(){
  document.querySelectorAll('.lang button').forEach(b=>b.onclick=()=>{lang=b.dataset.l;store.set('lang',lang);document.documentElement.lang=lang;render()});
  document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{S.tab=+b.dataset.tab;render()});
}
function render(){({home,lesson,quiz,result})[S.screen]();bindCommon()}
function go(s){S.screen=s;render();window.scrollTo(0,0)}
document.documentElement.lang=lang;
go('home');
