// Lesson content. Each text is {ru, uz}. Quiz: a = index of the right option.
const W={L:'var(--wL)',N:'var(--wN)',PE:'url(#pe)',K:'var(--wK)',G:'var(--wG)',T:'var(--wT)'};
const DEFS='<defs><pattern id="pe" width="12" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="var(--wPE1)"/><rect x="6" width="6" height="6" fill="var(--wPE2)"/></pattern><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--muted)"/></marker></defs>';
const svg=(body,aria,h=250)=>`<svg viewBox="0 0 360 ${h}" role="img" aria-label="${aria}">${DEFS}${body}</svg>`;
const tx=(x,y,s,o={})=>`<text x="${x}" y="${y}" text-anchor="${o.a||'middle'}" font-size="${o.s||11}" font-weight="${o.w||400}" fill="${o.c||'var(--fg)'}">${s}</text>`;
const wire=(d,c,w=5)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const box=(x,y,w,h,f='var(--surface)')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${f}" stroke="var(--fg)" stroke-width="1.5"/>`;
const lamp=(x,y,on=true)=>`<circle cx="${x}" cy="${y}" r="14" fill="${on?'var(--glow)':'var(--surface)'}" stroke="var(--fg)" stroke-width="2"/><path d="M${x-10} ${y-10}L${x+10} ${y+10}M${x+10} ${y-10}L${x-10} ${y+10}" stroke="var(--fg)" stroke-width="1.5"/>`;
const breaker=(x,y,lab)=>`${box(x,y,36,48)}<rect x="${x+12}" y="${y+10}" width="12" height="20" rx="2" fill="var(--accent)"/>${lab?tx(x+18,y+62,lab):''}`;
const panel=(lab)=>`<rect x="10" y="20" width="96" height="210" rx="10" fill="var(--bg)" stroke="var(--line)" stroke-width="2"/>${tx(58,40,lab,{w:700,c:'var(--muted)'})}`;
const nbus=(y,lab)=>`<rect x="22" y="${y}" width="72" height="10" rx="3" fill="var(--wN)"/>${tx(58,y+24,lab)}`;
const flow=(x,y,w,h,l1,l2)=>`${box(x,y,w,h)}${tx(x+w/2,y+(l2?h/2-2:h/2+4),l1,{w:600,s:10})}${l2?tx(x+w/2,y+h/2+11,l2,{s:10,c:'var(--muted)'}):''}`;
const arrow=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="var(--muted)" stroke-width="1.5" marker-end="url(#ar)"/>`;

const LESSONS=[
/* ---------- BEGINNER ---------- */
{id:'b1',lv:0,min:5,
 t:{ru:'Безопасность',uz:'Xavfsizlik'},s:{ru:'Как не получить удар током',uz:'Tok urishidan qanday saqlanish'},
 svg:l=>svg(
  wire('M20 50H340',W.L)+wire('M20 200H340',W.N)+
  tx(30,40,l=='ru'?'Фаза L':'Faza L',{a:'start',w:700,c:'var(--wL)',s:13})+tx(30,222,l=='ru'?'Ноль N':'Nol N',{a:'start',w:700,c:'var(--wN)',s:13})+
  `<rect x="115" y="52" width="10" height="30" fill="var(--muted)"/><rect x="109" y="80" width="22" height="60" rx="6" fill="var(--surface)" stroke="var(--fg)" stroke-width="1.5"/><circle cx="120" cy="100" r="7" fill="var(--glow)" stroke="var(--fg)"/><circle cx="120" cy="146" r="7" fill="var(--fg)"/>`+
  tx(120,172,l=='ru'?'Лампочка горит':'Lampochka yonadi',{w:700})+tx(120,187,l=='ru'?'это фаза':'bu faza',{c:'var(--muted)'})+
  `<rect x="255" y="168" width="10" height="30" fill="var(--muted)"/><rect x="249" y="108" width="22" height="60" rx="6" fill="var(--surface)" stroke="var(--fg)" stroke-width="1.5"/><circle cx="260" cy="148" r="7" fill="var(--surface)" stroke="var(--fg)"/><circle cx="260" cy="102" r="7" fill="var(--fg)"/>`+
  tx(260,74,l=='ru'?'Не горит':'Yonmaydi',{w:700})+tx(260,89,l=='ru'?'это ноль':'bu nol',{c:'var(--muted)'}),
  l=='ru'?'Проверка проводов индикаторной отвёрткой: на фазе лампочка горит, на ноле нет':'Indikator otvyortka bilan tekshirish: fazada lampochka yonadi, nolda yonmaydi'),
 steps:{ru:['Перед любой работой отключите автомат нужной линии. Если не знаете какой, отключите вводной автомат.','Повесьте на щиток записку «Не включать, работают люди» или заклейте автомат скотчем.','Проверьте индикаторной отвёрткой <b>каждый</b> провод. Сначала проверьте саму отвёртку на рабочей розетке.','Работайте одной рукой, стойте на сухом полу, используйте инструмент с изолированными ручками (до 1000 В).','Никогда не работайте под напряжением «по-быстрому». Ток 0,1 А через сердце смертелен.'],
       uz:['Har qanday ishdan oldin kerakli liniya avtomatini o\'chiring. Qaysi ekanini bilmasangiz, kirish avtomatini o\'chiring.','Shitga «Yoqmang, odamlar ishlayapti» degan yozuv osing yoki avtomatni skotch bilan yopishtiring.','Indikator otvyortka bilan <b>har bir</b> simni tekshiring. Avval otvyortkaning o\'zini ishlaydigan rozetkada tekshiring.','Bir qo\'l bilan ishlang, quruq polda turing, dastasi izolyatsiyalangan asbobdan foydalaning (1000 V gacha).','Hech qachon kuchlanish ostida «tezda» ishlamang. Yurakdan o\'tgan 0,1 A tok o\'limga olib keladi.']},
 tip:{ru:'Выключатель на стене отключает только фазу лампы, и то если его правильно подключили. Для работы всегда отключайте автомат в щитке.',uz:'Devordagi o\'chirgich faqat lampaning fazasini uzadi, u ham to\'g\'ri ulangan bo\'lsa. Ish uchun doim shitdagi avtomatni o\'chiring.'},
 quiz:[
  {a:1,ru:{q:'Чем проверить, что напряжения нет?',o:['Пальцем, быстро','Индикаторной отвёрткой или тестером','Достаточно выключить свет'],e:'Только прибором: индикатором или мультиметром. И на каждом проводе.'},uz:{q:'Kuchlanish yo\'qligini nima bilan tekshirish kerak?',o:['Barmoq bilan, tezda','Indikator otvyortka yoki tester bilan','Chiroqni o\'chirish yetarli'],e:'Faqat asbob bilan: indikator yoki multimetr. Va har bir simda.'}},
  {a:0,ru:{q:'Индикатор загорелся на проводе. Это…',o:['Фаза','Ноль','Заземление'],e:'Индикатор светится на фазе. На ноле и заземлении он не горит.'},uz:{q:'Indikator simda yondi. Bu…',o:['Faza','Nol','Yerga ulash'],e:'Indikator fazada yonadi. Nol va yerga ulashda yonmaydi.'}},
  {a:2,ru:{q:'Что сделать, чтобы никто не включил автомат во время работы?',o:['Ничего, все и так знают','Работать быстрее','Повесить табличку или заклеить автомат'],e:'Табличка «Не включать» спасает жизни. Лучше ещё и заклеить автомат.'},uz:{q:'Ish vaqtida avtomatni hech kim yoqmasligi uchun nima qilish kerak?',o:['Hech narsa, hamma biladi','Tezroq ishlash','Yozuv osish yoki avtomatni yopishtirish'],e:'«Yoqmang» yozuvi hayotni saqlaydi. Avtomatni yopishtirib qo\'ygan ham ma\'qul.'}},
  {a:1,ru:{q:'Какой инструмент нужен электрику?',o:['Любой из гаража','С изолированными ручками до 1000 В','Металлический без ручек'],e:'Инструмент с изоляцией до 1000 В защищает, если вы ошиблись с линией.'},uz:{q:'Elektrikka qanday asbob kerak?',o:['Garajdagi istalgani','Dastasi 1000 V gacha izolyatsiyalangan','Dastasiz metall asbob'],e:'1000 V gacha izolyatsiyali asbob liniyada xato qilsangiz ham himoya qiladi.'}}]},

{id:'b2',lv:0,min:5,
 t:{ru:'Инструменты',uz:'Asboblar'},s:{ru:'Индикатор, мультиметр, клещи',uz:'Indikator, multimetr, ombir'},
 table:{head:{ru:['Инструмент','Зачем нужен'],uz:['Asbob','Nima uchun kerak']},rows:{
  ru:[['Индикаторная отвёртка','Найти фазу, проверить, что напряжения нет'],['Мультиметр','Измерить напряжение (V), сопротивление (Ω), прозвонить провод'],['Стриппер','Аккуратно снять изоляцию, не повредив жилу'],['Бокорезы','Откусить провод нужной длины'],['Пассатижи','Скрутить, согнуть, держать'],['Отвёртки PH2 и плоская','Затянуть клеммы розеток, автоматов'],['Перфоратор и коронка 68 мм','Сделать отверстие под подрозетник']],
  uz:[['Indikator otvyortka','Fazani topish, kuchlanish yo\'qligini tekshirish'],['Multimetr','Kuchlanish (V), qarshilik (Ω) o\'lchash, simni tekshirish'],['Stripper','Tomirga zarar yetkazmay izolyatsiyani tozalash'],['Kusachka (bokorez)','Simni kerakli uzunlikda kesish'],['Passatij (ombir)','Burash, egish, ushlab turish'],['PH2 va yassi otvyortka','Rozetka, avtomat klemmalarini qotirish'],['Perforator va 68 mm koronka','Podrozetnik uchun teshik ochish']]}},
 steps:{ru:['Мультиметр для 220 В ставьте на режим <b>V~ 750</b> (переменное напряжение).','Щупы: чёрный в гнездо COM, красный в гнездо V.','В розетке между фазой и нолём должно быть 220–230 В. Между нолём и землёй около 0 В.','Прозвонка (значок динамика): отключите питание, коснитесь щупами концов провода. Писк означает, что провод целый.'],
       uz:['220 V uchun multimetrni <b>V~ 750</b> rejimiga qo\'ying (o\'zgaruvchan kuchlanish).','Shchuplar: qorasi COM uyasiga, qizili V uyasiga.','Rozetkada faza va nol orasida 220–230 V bo\'lishi kerak. Nol va yer orasida 0 V atrofida.','Prozvonka (dinamik belgisi): tokni o\'chiring, shchuplarni sim uchlariga tekkizing. Chiyillash sim butunligini bildiradi.']},
 tip:{ru:'Дешёвая индикаторная отвёртка иногда «врёт». Перед работой проверьте её на розетке, где точно есть напряжение.',uz:'Arzon indikator otvyortka ba\'zan «aldaydi». Ishdan oldin uni kuchlanish aniq bor rozetkada tekshiring.'},
 quiz:[
  {a:2,ru:{q:'Какой режим мультиметра для проверки розетки?',o:['Ω (сопротивление)','A (ток)','V~ (переменное напряжение)'],e:'В розетке переменное напряжение, режим V~ с пределом 750 В.'},uz:{q:'Rozetkani tekshirish uchun multimetrning qaysi rejimi?',o:['Ω (qarshilik)','A (tok)','V~ (o\'zgaruvchan kuchlanish)'],e:'Rozetkada o\'zgaruvchan kuchlanish, 750 V chegarali V~ rejimi.'}},
  {a:0,ru:{q:'Сколько вольт между фазой и нолём в квартире?',o:['220–230 В','12 В','380 В'],e:'В обычной квартире 220–230 В. 380 В бывает между двумя фазами.'},uz:{q:'Xonadonda faza va nol orasida necha volt?',o:['220–230 V','12 V','380 V'],e:'Oddiy xonadonda 220–230 V. 380 V ikki faza orasida bo\'ladi.'}},
  {a:1,ru:{q:'Прозвонку провода делают…',o:['Под напряжением','При отключённом питании','Только на улице'],e:'Прозвонка только без напряжения, иначе сгорит прибор.'},uz:{q:'Simni prozvonka qilish…',o:['Kuchlanish ostida','Tok o\'chirilganda','Faqat ko\'chada'],e:'Prozvonka faqat kuchlanishsiz, aks holda asbob kuyadi.'}},
  {a:1,ru:{q:'Чем лучше снимать изоляцию?',o:['Ножом по кругу','Стриппером','Зубами'],e:'Стриппер не режет медь. Надрезанная жила потом ломается и греется.'},uz:{q:'Izolyatsiyani nima bilan tozalagan yaxshi?',o:['Pichoq bilan aylantirib','Stripper bilan','Tish bilan'],e:'Stripper misni kesmaydi. Kesilgan tomir keyin sinadi va qiziydi.'}}]},

{id:'b3',lv:0,min:7,
 t:{ru:'Подключение розетки',uz:'Rozetkani ulash'},s:{ru:'Фаза, ноль и заземление',uz:'Faza, nol va yerga ulash'},
 svg:l=>svg(panel(l=='ru'?'ЩИТОК':'SHIT')+breaker(40,56,l=='ru'?'Автомат 16 А':'Avtomat 16 A')+nbus(150,l=='ru'?'Шина N':'N shinasi')+`<rect x="22" y="190" width="72" height="10" rx="3" fill="url(#pe)"/>`+tx(58,214,l=='ru'?'Шина PE':'PE shinasi')+
  wire('M76 80H180V100H244',W.L)+wire('M94 155H190V150H244',W.N)+wire('M94 195H210V200H290V176',W.PE)+
  tx(150,74,'L',{w:700,s:13,c:'var(--wL)'})+tx(150,148,'N',{w:700,s:13,c:'var(--wN)'})+tx(140,188,'PE',{w:700,s:13})+
  `<circle cx="290" cy="125" r="62" fill="var(--surface)" stroke="var(--fg)" stroke-width="2"/><circle cx="290" cy="125" r="46" fill="none" stroke="var(--line)" stroke-width="2"/><rect x="284" y="75" width="12" height="14" rx="2" fill="url(#pe)" stroke="var(--fg)"/><rect x="284" y="161" width="12" height="14" rx="2" fill="url(#pe)" stroke="var(--fg)"/><circle cx="270" cy="125" r="7" fill="var(--bg)" stroke="var(--fg)" stroke-width="1.5"/><circle cx="310" cy="125" r="7" fill="var(--bg)" stroke="var(--fg)" stroke-width="1.5"/><circle cx="250" cy="100" r="6" fill="var(--wL)"/><circle cx="250" cy="150" r="6" fill="var(--wN)"/><path d="M250 100 L270 120 M250 150 L270 130" stroke="var(--fg)" stroke-width="1.5"/>`+
  tx(290,242,l=='ru'?'РОЗЕТКА (вид сзади)':'ROZETKA (orqa tomoni)',{w:700,s:12,c:'var(--muted)'}),
  l=='ru'?'Схема подключения розетки: от автомата в щитке три провода — фаза, ноль и заземление — к клеммам розетки':'Rozetkani ulash sxemasi: shitdagi avtomatdan rozetka klemmalariga uchta sim'),
 legend:['L','N','PE'],
 steps:{ru:['Отключите автомат этой линии в щитке и проверьте индикаторной отвёрткой, что на проводах нет напряжения.','Зачистите концы проводов на <b>8–10 мм</b>. Медная жила не должна быть надрезана.','<b>Фазу L</b> (коричневый) и <b>ноль N</b> (синий) подключите к двум боковым клеммам. В бытовой розетке их порядок не важен.','<b>Землю PE</b> (жёлто-зелёный) подключите к центральной клемме, она соединена с металлическими «усами» розетки.','Затяните винты и подёргайте каждый провод. Уложите провода в подрозетник, закрепите розетку, включите автомат и проверьте тестером: должно быть 220–230 В.'],
       uz:['Shitda shu liniya avtomatini o\'chiring va indikator otvyortka bilan simlarda kuchlanish yo\'qligini tekshiring.','Sim uchlarini <b>8–10 mm</b> tozalang. Mis tomir kesilmagan bo\'lishi kerak.','<b>Faza L</b> (jigarrang) va <b>nol N</b> (ko\'k) simlarini ikki yon klemmaga ulang. Maishiy rozetkada ularning tartibi muhim emas.','<b>Yerga ulash PE</b> (sariq-yashil) simini o\'rtadagi klemmaga ulang, u rozetkaning metall «mo\'ylov»lariga ulangan.','Vintlarni qotiring va har bir simni tortib ko\'ring. Simlarni podrozetnikka joylang, rozetkani mahkamlang, avtomatni yoqing va tester bilan tekshiring: 220–230 V bo\'lishi kerak.']},
 tip:{ru:'В старых домах часто всего два провода, без земли. Тогда центральную клемму оставляют свободной. Перемычку между нолём и землёй делать нельзя.',uz:'Eski uylarda ko\'pincha faqat ikkita sim bo\'ladi, yerga ulash yo\'q. Bunda o\'rtadagi klemma bo\'sh qoladi. Nol va yerga ulash orasiga peremichka qo\'yish mumkin emas.'},
 quiz:[
  {a:1,ru:{q:'Что нужно сделать в самом начале?',o:['Снять старую розетку','Отключить автомат и проверить, что напряжения нет','Зачистить провода'],e:'Сначала всегда отключаем автомат и проверяем индикатором.'},uz:{q:'Eng avval nima qilish kerak?',o:['Eski rozetkani yechish','Avtomatni o\'chirish va kuchlanish yo\'qligini tekshirish','Simlarni tozalash'],e:'Avval doim avtomatni o\'chiramiz va indikator bilan tekshiramiz.'}},
  {a:2,ru:{q:'Какого цвета провод заземления (PE)?',o:['Синий','Коричневый','Жёлто-зелёный'],e:'Заземление всегда жёлто-зелёное. Синий — ноль, коричневый — фаза.'},uz:{q:'Yerga ulash simi (PE) qanday rangda?',o:['Ko\'k','Jigarrang','Sariq-yashil'],e:'Yerga ulash simi doim sariq-yashil. Ko\'k — nol, jigarrang — faza.'}},
  {a:1,ru:{q:'На сколько зачищать изоляцию для винтовой клеммы?',o:['2–3 мм','8–10 мм','25–30 мм'],e:'8–10 мм: меньше — плохой контакт, больше — голая жила торчит из клеммы.'},uz:{q:'Vintli klemma uchun izolyatsiya qancha tozalanadi?',o:['2–3 mm','8–10 mm','25–30 mm'],e:'8–10 mm: kamroq bo\'lsa kontakt yomon, ko\'proq bo\'lsa yalang\'och tomir chiqib turadi.'}},
  {a:1,ru:{q:'Куда подключают жёлто-зелёный провод?',o:['К любой боковой клемме','К центральной клемме заземления','Никуда, его изолируют'],e:'PE идёт на центральную клемму, соединённую с «усами» розетки.'},uz:{q:'Sariq-yashil sim qayerga ulanadi?',o:['Istalgan yon klemmaga','O\'rtadagi yerga ulash klemmasiga','Hech qayerga, u izolyatsiyalanadi'],e:'PE rozetka «mo\'ylov»lari bilan bog\'langan o\'rta klemmaga ulanadi.'}}]},

{id:'b4',lv:0,min:6,
 t:{ru:'Одноклавишный выключатель',uz:'Bir klavishli o\'chirgich'},s:{ru:'Разрывает фазу, а не ноль',uz:'Nol emas, faza uziladi'},
 svg:l=>svg(panel(l=='ru'?'ЩИТОК':'SHIT')+breaker(40,56,l=='ru'?'Автомат 10 А':'Avtomat 10 A')+nbus(170,l=='ru'?'Шина N':'N shinasi')+
  wire('M76 80H160',W.L)+`<circle cx="160" cy="80" r="5" fill="var(--fg)"/><circle cx="204" cy="80" r="5" fill="var(--fg)"/><path d="M160 80L200 62" stroke="var(--fg)" stroke-width="3" stroke-linecap="round"/>`+
  wire('M204 80H300V106',W.L)+wire('M94 175H300V134',W.N)+lamp(300,120,false)+
  tx(182,108,l=='ru'?'Выключатель':'O\'chirgich',{w:600})+tx(280,124,l=='ru'?'Лампа':'Lampa',{a:'end',s:10,c:'var(--muted)'})+
  tx(130,72,'L',{w:700,s:13,c:'var(--wL)'})+tx(250,72,'L′',{w:700,s:13,c:'var(--wL)'})+tx(200,168,'N',{w:700,s:13,c:'var(--wN)'})+
  tx(200,226,l=='ru'?'Ноль идёт к лампе напрямую':'Nol lampaga to\'g\'ridan-to\'g\'ri boradi',{c:'var(--muted)'}),
  l=='ru'?'Схема выключателя: фаза идёт через выключатель к лампе, ноль идёт к лампе напрямую':'O\'chirgich sxemasi: faza o\'chirgich orqali lampaga, nol to\'g\'ridan-to\'g\'ri'),
 legend:['L','N'],
 steps:{ru:['Отключите автомат освещения и проверьте отсутствие напряжения.','В распредкоробке найдите фазу (L) от щитка и ноль (N).','Фазу подключите к выключателю. Второй провод от выключателя (L′) ведите к лампе.','Ноль от щитка соедините с нулевым проводом лампы напрямую, через клемму Wago.','Включите автомат. При выключенной клавише на патроне лампы индикатор гореть не должен.'],
       uz:['Yoritish avtomatini o\'chiring va kuchlanish yo\'qligini tekshiring.','Taqsimlash qutisida shitdan kelgan faza (L) va nolni (N) toping.','Fazani o\'chirgichga ulang. O\'chirgichdan chiqqan ikkinchi simni (L′) lampaga olib boring.','Shitdan kelgan nolni lampaning nol simi bilan to\'g\'ridan-to\'g\'ri, Wago klemmasi orqali ulang.','Avtomatni yoqing. Klavisha o\'chiq bo\'lganda lampa patronida indikator yonmasligi kerak.']},
 tip:{ru:'Если выключатель разрывает ноль, лампа гаснет, но на патроне остаётся фаза. Менять лампу в таком патроне опасно.',uz:'Agar o\'chirgich nolni uzsa, lampa o\'chadi, lekin patronda faza qoladi. Bunday patronda lampani almashtirish xavfli.'},
 quiz:[
  {a:0,ru:{q:'Какой провод должен разрывать выключатель?',o:['Фазу L','Ноль N','Заземление PE'],e:'Выключатель всегда ставят в разрыв фазы.'},uz:{q:'O\'chirgich qaysi simni uzishi kerak?',o:['Faza L','Nol N','Yerga ulash PE'],e:'O\'chirgich doim faza uzilishiga qo\'yiladi.'}},
  {a:2,ru:{q:'Как ноль приходит к лампе?',o:['Через выключатель','Через автомат 10 А отдельно','Напрямую из распредкоробки'],e:'Ноль идёт к лампе напрямую, без выключателя.'},uz:{q:'Nol lampaga qanday keladi?',o:['O\'chirgich orqali','Alohida 10 A avtomat orqali','Taqsimlash qutisidan to\'g\'ridan-to\'g\'ri'],e:'Nol lampaga o\'chirgichsiz to\'g\'ridan-to\'g\'ri boradi.'}},
  {a:1,ru:{q:'Лампа выключена, а индикатор на патроне горит. Почему?',o:['Так и должно быть','Выключатель разрывает ноль, а не фазу','Сгорела лампа'],e:'Это ошибка подключения: перепутали фазу и ноль на выключателе.'},uz:{q:'Lampa o\'chiq, lekin patronda indikator yonyapti. Nega?',o:['Shunday bo\'lishi kerak','O\'chirgich fazani emas, nolni uzyapti','Lampa kuygan'],e:'Bu ulash xatosi: o\'chirgichda faza va nol almashib ketgan.'}},
  {a:0,ru:{q:'Какой автомат обычно ставят на освещение?',o:['10 А','32 А','63 А'],e:'На свет с кабелем 1,5 мм² ставят автомат 10 А.'},uz:{q:'Yoritishga odatda qanday avtomat qo\'yiladi?',o:['10 A','32 A','63 A'],e:'1,5 mm² kabelli yoritishga 10 A avtomat qo\'yiladi.'}}]},

{id:'b5',lv:0,min:6,
 t:{ru:'Подключение люстры',uz:'Qandilni ulash'},s:{ru:'Двухклавишный выключатель, две группы ламп',uz:'Ikki klavishli o\'chirgich, ikki guruh lampa'},
 svg:l=>svg(panel(l=='ru'?'ЩИТОК':'SHIT')+breaker(40,56,l=='ru'?'Автомат 10 А':'Avtomat 10 A')+nbus(190,'N')+
  wire('M76 80H150',W.L)+box(150,52,52,64)+tx(176,132,l=='ru'?'2-клавишный':'2 klavishli',{s:10,w:600})+
  `<circle cx="160" cy="80" r="4" fill="var(--fg)"/><path d="M160 80L194 66M160 80L194 98" stroke="var(--fg)" stroke-width="2"/>`+
  wire('M202 66H320V126',W.L)+wire('M202 98H260V126',W.L)+wire('M94 195H320V154',W.N)+wire('M260 195V154',W.N)+
  lamp(260,140)+lamp(320,140)+tx(260,214,l=='ru'?'Группа 1':'1-guruh',{s:10})+tx(320,214,l=='ru'?'Группа 2':'2-guruh',{s:10})+
  tx(240,92,'L1',{w:700,c:'var(--wL)'})+tx(290,60,'L2',{w:700,c:'var(--wL)'})+tx(180,188,'N',{w:700,c:'var(--wN)'}),
  l=='ru'?'Двухклавишный выключатель: фаза приходит на общую клемму, две клавиши подают фазу на две группы ламп, ноль общий':'Ikki klavishli o\'chirgich: faza umumiy klemmaga, ikki klavisha ikki guruh lampaga faza beradi, nol umumiy'),
 legend:['L','N'],
 steps:{ru:['Отключите автомат и проверьте отсутствие напряжения.','У люстры обычно 3 провода: две фазы групп (L1, L2) и общий ноль (N). Плюс PE на корпус, если есть.','Фазу из щитка подключите на <b>общую</b> клемму выключателя (обычно отмечена L или стрелкой).','Два выхода выключателя соедините с L1 и L2 люстры.','Ноль люстры соедините с нолём из щитка. Проверьте каждую клавишу.'],
       uz:['Avtomatni o\'chiring va kuchlanish yo\'qligini tekshiring.','Qandilda odatda 3 ta sim bor: guruhlarning ikki fazasi (L1, L2) va umumiy nol (N). Agar bo\'lsa, korpusga PE.','Shitdan kelgan fazani o\'chirgichning <b>umumiy</b> klemmasiga ulang (odatda L yoki strelka bilan belgilangan).','O\'chirgichning ikki chiqishini qandilning L1 va L2 simlariga ulang.','Qandil nolini shitdan kelgan nolga ulang. Har bir klavishani tekshiring.']},
 tip:{ru:'Если у люстры провода одного цвета, найдите общий ноль прозвонкой: он соединён со всеми патронами.',uz:'Agar qandil simlari bir xil rangda bo\'lsa, umumiy nolni prozvonka bilan toping: u barcha patronlarga ulangan.'},
 quiz:[
  {a:1,ru:{q:'Куда подключают фазу на двухклавишном выключателе?',o:['На любой выход','На общую клемму','Не подключают'],e:'Фаза приходит на общую клемму, а выходы идут к группам ламп.'},uz:{q:'Ikki klavishli o\'chirgichda faza qayerga ulanadi?',o:['Istalgan chiqishga','Umumiy klemmaga','Ulanmaydi'],e:'Faza umumiy klemmaga keladi, chiqishlar lampa guruhlariga boradi.'}},
  {a:0,ru:{q:'Сколько проводов обычно у люстры на две группы (без PE)?',o:['3','2','5'],e:'L1, L2 и общий ноль N.'},uz:{q:'Ikki guruhli qandilda odatda nechta sim bor (PE siz)?',o:['3','2','5'],e:'L1, L2 va umumiy nol N.'}},
  {a:2,ru:{q:'Ноль для обеих групп…',o:['Разный, через клавиши','Не нужен','Общий'],e:'Ноль общий для всех ламп и идёт напрямую.'},uz:{q:'Ikkala guruh uchun nol…',o:['Har xil, klavishalar orqali','Kerak emas','Umumiy'],e:'Nol barcha lampalar uchun umumiy va to\'g\'ridan-to\'g\'ri boradi.'}},
  {a:1,ru:{q:'Как найти общий ноль, если провода одного цвета?',o:['На глаз','Прозвонкой мультиметром','Подать 220 В и смотреть'],e:'Прозвонка без напряжения: общий провод звонится со всеми патронами.'},uz:{q:'Simlar bir xil rangda bo\'lsa, umumiy nolni qanday topish mumkin?',o:['Ko\'z bilan','Multimetr bilan prozvonka qilib','220 V berib ko\'rish'],e:'Kuchlanishsiz prozvonka: umumiy sim barcha patronlar bilan ulanadi.'}}]},

/* ---------- INTERMEDIATE ---------- */
{id:'m1',lv:1,min:8,
 t:{ru:'Проходной выключатель',uz:'O\'tish o\'chirgichi'},s:{ru:'Свет из двух мест',uz:'Chiroqni ikki joydan boshqarish'},
 svg:l=>svg(panel(l=='ru'?'ЩИТОК':'SHIT')+breaker(40,56,'10 А')+nbus(200,'N')+
  wire('M76 80H120V110H150',W.L)+
  `<circle cx="150" cy="110" r="5" fill="var(--fg)"/><circle cx="190" cy="85" r="5" fill="var(--fg)"/><circle cx="190" cy="135" r="5" fill="var(--fg)"/><path d="M150 110L187 88" stroke="var(--fg)" stroke-width="3" stroke-linecap="round"/>`+
  wire('M190 85H250',W.T,4)+wire('M190 135H250',W.T,4)+
  `<circle cx="250" cy="85" r="5" fill="var(--fg)"/><circle cx="250" cy="135" r="5" fill="var(--fg)"/><circle cx="290" cy="110" r="5" fill="var(--fg)"/><path d="M290 110L253 132" stroke="var(--fg)" stroke-width="3" stroke-linecap="round"/>`+
  wire('M290 110H330V156',W.L)+lamp(330,170,false)+wire('M94 205H330V184',W.N)+
  tx(170,160,l=='ru'?'Выкл. 1':'O\'chirgich 1',{s:10,w:600})+tx(270,160,l=='ru'?'Выкл. 2':'O\'chirgich 2',{s:10,w:600})+tx(220,76,l=='ru'?'2 перемычки':'2 ta o\'tkazgich',{s:10,c:'var(--muted)'}),
  l=='ru'?'Проходные выключатели: фаза на общий контакт первого, две перемычки между выключателями, с общего контакта второго фаза идёт к лампе':'O\'tish o\'chirgichlari: faza birinchisining umumiy kontaktiga, ular orasida ikki sim, ikkinchisining umumiy kontaktidan faza lampaga'),
 legend:['L','T','N'],
 steps:{ru:['Нужны два <b>проходных</b> выключателя. У каждого 3 клеммы: общая (L) и две выходные.','Фазу из щитка подключите на общую клемму выключателя 1.','Выходные клеммы выключателя 1 соедините с выходными клеммами выключателя 2 двумя проводами (перемычками). Нужен кабель 3×1,5.','С общей клеммы выключателя 2 ведите провод к лампе.','Ноль к лампе идёт напрямую. Проверьте: каждый выключатель должен включать и выключать свет.'],
       uz:['Ikkita <b>o\'tish</b> o\'chirgichi kerak. Har birida 3 ta klemma: umumiy (L) va ikkita chiqish.','Shitdan kelgan fazani 1-o\'chirgichning umumiy klemmasiga ulang.','1-o\'chirgichning chiqish klemmalarini 2-o\'chirgichning chiqish klemmalari bilan ikki sim (peremichka) orqali ulang. 3×1,5 kabel kerak.','2-o\'chirgichning umumiy klemmasidan lampaga sim torting.','Nol lampaga to\'g\'ridan-to\'g\'ri boradi. Tekshiring: har bir o\'chirgich chiroqni yoqib-o\'chirishi kerak.']},
 tip:{ru:'Для трёх и более мест между двумя проходными ставят перекрёстные выключатели (у них 4 клеммы).',uz:'Uch va undan ortiq joy uchun ikki o\'tish o\'chirgichi orasiga kesishuvchi (perekryostniy) o\'chirgich qo\'yiladi (4 ta klemmali).'},
 quiz:[
  {a:2,ru:{q:'Сколько клемм у проходного выключателя?',o:['2','4','3'],e:'Общая и две выходные.'},uz:{q:'O\'tish o\'chirgichida nechta klemma bor?',o:['2','4','3'],e:'Umumiy va ikkita chiqish.'}},
  {a:0,ru:{q:'Сколько проводов между двумя проходными выключателями?',o:['2','1','4'],e:'Две перемычки соединяют выходные клеммы.'},uz:{q:'Ikki o\'tish o\'chirgichi orasida nechta sim bor?',o:['2','1','4'],e:'Ikki peremichka chiqish klemmalarini ulaydi.'}},
  {a:1,ru:{q:'Куда приходит фаза из щитка?',o:['На выходную клемму','На общую клемму выключателя 1','Сразу на лампу'],e:'Фаза на общую клемму первого, а с общей клеммы второго к лампе.'},uz:{q:'Shitdan faza qayerga keladi?',o:['Chiqish klemmasiga','1-o\'chirgichning umumiy klemmasiga','To\'g\'ri lampaga'],e:'Faza birinchisining umumiy klemmasiga, ikkinchisining umumiy klemmasidan lampaga.'}},
  {a:1,ru:{q:'Нужно управлять светом из трёх мест. Что добавить?',o:['Ещё один проходной','Перекрёстный выключатель','Обычный выключатель'],e:'Перекрёстный ставят между двумя проходными.'},uz:{q:'Chiroqni uch joydan boshqarish kerak. Nima qo\'shish kerak?',o:['Yana bitta o\'tish o\'chirgichi','Kesishuvchi o\'chirgich','Oddiy o\'chirgich'],e:'Kesishuvchi o\'chirgich ikki o\'tish o\'chirgichi orasiga qo\'yiladi.'}}]},

{id:'m2',lv:1,min:8,
 t:{ru:'Автоматы и УЗО',uz:'Avtomatlar va UZO'},s:{ru:'Что выбрать и зачем',uz:'Nimani tanlash va nima uchun'},
 svg:l=>svg(
  wire('M20 50H70',W.L)+wire('M20 74H100',W.N)+tx(26,42,'L',{a:'start',w:700,c:'var(--wL)'})+tx(26,92,'N',{a:'start',w:700,c:'var(--wN)'})+
  box(60,34,64,62)+`<circle cx="112" cy="46" r="5" fill="var(--accent)"/>`+tx(92,72,l=='ru'?'УЗО':'UZO',{w:700,s:12})+tx(132,58,l=='ru'?'40 А · 30 мА':'40 A · 30 mA',{a:'start',s:10})+
  wire('M76 96V124H306V136',W.L,4)+wire('M196 124V136',W.L,4)+wire('M251 124V136',W.L,4)+wire('M141 124V136',W.L,4)+
  breaker(124,136,'')+breaker(178,136,'')+breaker(233,136,'')+breaker(288,136,'')+
  tx(142,198,'10 А',{w:700})+tx(196,198,'16 А',{w:700})+tx(251,198,'16 А',{w:700})+tx(306,198,'25 А',{w:700})+
  tx(142,211,l=='ru'?'свет':'yorug\'',{s:9,c:'var(--muted)'})+tx(196,211,l=='ru'?'розетки':'rozetka',{s:9,c:'var(--muted)'})+tx(251,211,l=='ru'?'кондиц.':'konditsioner',{s:9,c:'var(--muted)'})+tx(306,211,l=='ru'?'бойлер':'boyler',{s:9,c:'var(--muted)'})+
  wire('M108 96V232H340',W.N,4)+tx(30,236,l=='ru'?'Шина N':'N shinasi',{a:'start',s:10,c:'var(--wN)',w:700}),
  l=='ru'?'УЗО на вводе, после него фаза идёт на гребёнку автоматов групп, ноль на шину N':'Kirishda UZO, undan keyin faza guruh avtomatlariga, nol N shinasiga'),
 legend:['L','N'],
 table:{head:{ru:['Устройство','От чего защищает'],uz:['Qurilma','Nimadan himoya qiladi']},rows:{
  ru:[['Автомат','Перегрузка и короткое замыкание. Защищает <b>провод</b>'],['УЗО','Утечка тока через человека. Защищает <b>людей</b>'],['Дифавтомат','Автомат и УЗО в одном корпусе'],['Реле напряжения','Скачки напряжения в сети. Защищает технику']],
  uz:[['Avtomat','Ortiqcha yuklama va qisqa tutashuv. <b>Simni</b> himoya qiladi'],['UZO','Odam orqali tok sizishi. <b>Odamlarni</b> himoya qiladi'],['Difavtomat','Avtomat va UZO bitta korpusda'],['Kuchlanish relesi','Tarmoqdagi kuchlanish sakrashlari. Texnikani himoya qiladi']]}},
 steps:{ru:['Автомат выбирают по сечению кабеля: 1,5 мм² → 10 А, 2,5 мм² → 16 А, 4 мм² → 25 А, 6 мм² → 32 А.','Для квартиры берите автоматы с характеристикой <b>C</b> (на корпусе C16, C10).','УЗО для людей берут на ток утечки <b>30 мА</b>. Для ванной можно 10 мА.','Номинал УЗО должен быть не меньше вводного автомата (автомат 32 А → УЗО 40 А).','Раз в месяц нажимайте кнопку «Тест» на УЗО: оно должно отключиться.'],
       uz:['Avtomat kabel kesimiga qarab tanlanadi: 1,5 mm² → 10 A, 2,5 mm² → 16 A, 4 mm² → 25 A, 6 mm² → 32 A.','Xonadon uchun <b>C</b> xarakteristikali avtomatlar oling (korpusda C16, C10).','Odamlar uchun UZO <b>30 mA</b> sizish tokiga olinadi. Vannaxona uchun 10 mA bo\'lishi mumkin.','UZO nominali kirish avtomatidan kam bo\'lmasligi kerak (32 A avtomat → 40 A UZO).','Oyda bir marta UZOdagi «Test» tugmasini bosing: u o\'chishi kerak.']},
 tip:{ru:'Нельзя ставить автомат больше, чем выдерживает провод. Автомат 25 А на кабеле 1,5 мм² не спасёт от пожара.',uz:'Sim ko\'tara oladiganidan katta avtomat qo\'yish mumkin emas. 1,5 mm² kabelga 25 A avtomat yong\'indan saqlamaydi.'},
 quiz:[
  {a:1,ru:{q:'Что защищает автомат?',o:['Человека от удара током','Провод от перегрева и КЗ','Технику от скачков'],e:'Автомат защищает проводку. Человека защищает УЗО.'},uz:{q:'Avtomat nimani himoya qiladi?',o:['Odamni tok urishidan','Simni qizib ketish va QTdan','Texnikani sakrashlardan'],e:'Avtomat simlarni himoya qiladi. Odamni UZO himoya qiladi.'}},
  {a:0,ru:{q:'Какой ток утечки у УЗО для защиты людей?',o:['30 мА','300 мА','3 А'],e:'30 мА: такой ток утечки отключает УЗО до опасного момента.'},uz:{q:'Odamlarni himoya qilish uchun UZO sizish toki qancha?',o:['30 mA','300 mA','3 A'],e:'30 mA: UZO xavfli holatdan oldin o\'chadi.'}},
  {a:2,ru:{q:'Кабель 2,5 мм² для розеток. Какой автомат?',o:['32 А','25 А','16 А'],e:'2,5 мм² → 16 А.'},uz:{q:'Rozetkalar uchun 2,5 mm² kabel. Qanday avtomat?',o:['32 A','25 A','16 A'],e:'2,5 mm² → 16 A.'}},
  {a:1,ru:{q:'Как проверить УЗО?',o:['Коснуться фазы рукой','Нажать кнопку «Тест»','Никак'],e:'Кнопка «Тест» создаёт искусственную утечку, и УЗО должно сработать.'},uz:{q:'UZOni qanday tekshirish mumkin?',o:['Fazaga qo\'l tekkizib','«Test» tugmasini bosib','Hech qanday'],e:'«Test» tugmasi sun\'iy sizish hosil qiladi va UZO o\'chishi kerak.'}}]},

{id:'m3',lv:1,min:9,
 t:{ru:'Щиток квартиры',uz:'Xonadon elektr shiti'},s:{ru:'Схема групп',uz:'Guruhlar sxemasi'},
 svg:l=>svg(
  flow(8,24,72,44,l=='ru'?'Ввод':'Kirish','220 В')+arrow(80,46,92,46)+
  flow(94,24,80,44,l=='ru'?'Вводной':'Kirish','2P 40 А')+arrow(174,46,186,46)+
  flow(188,24,72,44,l=='ru'?'Счётчик':'Hisoblagich','')+arrow(260,46,272,46)+
  flow(274,24,78,44,l=='ru'?'УЗО':'UZO','40 А 30 мА')+
  wire('M313 68V100H44V118',W.L,3)+wire('M128 100V118',W.L,3)+wire('M212 100V118',W.L,3)+wire('M313 100V118',W.L,3)+
  flow(8,120,72,48,l=='ru'?'Свет':'Yorug\'lik','C10 · 1,5')+flow(92,120,72,48,l=='ru'?'Розетки':'Rozetkalar','C16 · 2,5')+flow(176,120,72,48,l=='ru'?'Кондиц.':'Konditsioner','C16 · 2,5')+flow(270,120,82,48,l=='ru'?'Плита':'Plita','C32 · 6')+
  `<rect x="20" y="196" width="150" height="10" rx="3" fill="var(--wN)"/><rect x="190" y="196" width="150" height="10" rx="3" fill="url(#pe)"/>`+tx(95,224,l=='ru'?'Шина N (ноль)':'N shinasi (nol)')+tx(265,224,l=='ru'?'Шина PE (земля)':'PE shinasi (yer)'),
  l=='ru'?'Щиток квартиры: ввод, вводной автомат, счётчик, УЗО и автоматы групп свет, розетки, кондиционер, плита':'Xonadon shiti: kirish, kirish avtomati, hisoblagich, UZO va guruh avtomatlari'),
 steps:{ru:['Порядок: ввод → вводной автомат → счётчик → УЗО → автоматы групп.','Делите квартиру на группы: свет, розетки комнат, розетки кухни, кондиционер, мощные приборы (плита, бойлер) отдельно.','Ноль каждой группы ставьте на шину N, заземление на шину PE. Ноль и землю в щитке квартиры не соединяют.','Подпишите каждый автомат: «Свет зал», «Розетки кухня».','Оставьте 2–3 свободных места в щитке на будущее.'],
       uz:['Tartib: kirish → kirish avtomati → hisoblagich → UZO → guruh avtomatlari.','Xonadonni guruhlarga bo\'ling: yorug\'lik, xona rozetkalari, oshxona rozetkalari, konditsioner, quvvatli asboblar (plita, boyler) alohida.','Har bir guruhning nolini N shinasiga, yerga ulashni PE shinasiga qo\'ying. Xonadon shitida nol va yer ulanmaydi.','Har bir avtomatni yozib qo\'ying: «Zal yorug\'i», «Oshxona rozetkasi».','Kelajak uchun shitda 2–3 ta bo\'sh joy qoldiring.']},
 tip:{ru:'Кондиционер и электроплиту всегда ставят на отдельную линию со своим автоматом.',uz:'Konditsioner va elektr plita doim alohida liniyaga, o\'z avtomati bilan qo\'yiladi.'},
 quiz:[
  {a:0,ru:{q:'Что стоит первым после ввода?',o:['Вводной автомат','УЗО','Автомат на свет'],e:'Вводной автомат отключает всю квартиру сразу.'},uz:{q:'Kirishdan keyin birinchi nima turadi?',o:['Kirish avtomati','UZO','Yorug\'lik avtomati'],e:'Kirish avtomati butun xonadonni birdan o\'chiradi.'}},
  {a:2,ru:{q:'Какую технику ставят на отдельную линию?',o:['Лампы','Зарядку телефона','Плиту и кондиционер'],e:'Мощные приборы всегда на своей линии.'},uz:{q:'Qaysi texnika alohida liniyaga qo\'yiladi?',o:['Lampalar','Telefon zaryadkasi','Plita va konditsioner'],e:'Quvvatli asboblar doim o\'z liniyasida.'}},
  {a:1,ru:{q:'Можно ли соединять шины N и PE в щитке квартиры?',o:['Да, всегда','Нет','Только летом'],e:'В квартире N и PE идут раздельно, иначе УЗО будет срабатывать.'},uz:{q:'Xonadon shitida N va PE shinalarini ulash mumkinmi?',o:['Ha, doim','Yo\'q','Faqat yozda'],e:'Xonadonda N va PE alohida, aks holda UZO o\'chib qoladi.'}},
  {a:0,ru:{q:'Автомат и кабель для плиты?',o:['C32 и 6 мм²','C10 и 1,5 мм²','C16 и 1,5 мм²'],e:'Плита до 7 кВт: кабель 6 мм², автомат 32 А.'},uz:{q:'Plita uchun avtomat va kabel?',o:['C32 va 6 mm²','C10 va 1,5 mm²','C16 va 1,5 mm²'],e:'7 kVt gacha plita: 6 mm² kabel, 32 A avtomat.'}}]},

{id:'m4',lv:1,min:6,
 t:{ru:'Сечение кабеля',uz:'Kabel kesimi'},s:{ru:'Расчёт по мощности',uz:'Quvvat bo\'yicha hisoblash'},
 table:{head:{ru:['Медь, мм²','Автомат','Мощность до'],uz:['Mis, mm²','Avtomat','Quvvat']},rows:{
  ru:[['1,5','10 А','2,2 кВт'],['2,5','16 А','3,5 кВт'],['4','25 А','5,5 кВт'],['6','32 А','7 кВт'],['10','50 А','11 кВт'],['16','63 А','14 кВт']],
  uz:[['1,5','10 A','2,2 kVt'],['2,5','16 A','3,5 kVt'],['4','25 A','5,5 kVt'],['6','32 A','7 kVt'],['10','50 A','11 kVt'],['16','63 A','14 kVt']]}},
 calc:true,
 steps:{ru:['Сложите мощность всех приборов на линии (в ваттах). Мощность написана на наклейке прибора.','Ток считают так: <b>I = P ÷ 220</b>. Например, 3000 Вт ÷ 220 = 13,6 А.','Подберите автомат ближе всего к току, но не меньше: 13,6 А → 16 А.','По таблице подберите кабель под автомат: 16 А → 2,5 мм².','Используйте только медь (ВВГнг, NYM). Алюминий для квартиры не подходит.'],
       uz:['Liniyadagi barcha asboblar quvvatini qo\'shing (vattda). Quvvat asbob yorlig\'ida yozilgan.','Tok shunday hisoblanadi: <b>I = P ÷ 220</b>. Masalan, 3000 Vt ÷ 220 = 13,6 A.','Tokka eng yaqin, lekin kam bo\'lmagan avtomatni tanlang: 13,6 A → 16 A.','Jadvaldan avtomatga mos kabelni tanlang: 16 A → 2,5 mm².','Faqat mis kabel ishlating (VVGng, NYM). Alyuminiy xonadon uchun mos emas.']},
 tip:{ru:'Если линия длиннее 30 метров, берите кабель на один размер больше: на длинном проводе теряется напряжение.',uz:'Liniya 30 metrdan uzun bo\'lsa, bir o\'lcham katta kabel oling: uzun simda kuchlanish yo\'qoladi.'},
 quiz:[
  {a:1,ru:{q:'Чайник 2200 Вт. Какой ток?',o:['22 А','10 А','2,2 А'],e:'2200 ÷ 220 = 10 А.'},uz:{q:'Choynak 2200 Vt. Tok qancha?',o:['22 A','10 A','2,2 A'],e:'2200 ÷ 220 = 10 A.'}},
  {a:0,ru:{q:'Ток линии 20 А. Какой кабель?',o:['4 мм² с автоматом 25 А','1,5 мм²','2,5 мм² с автоматом 32 А'],e:'20 А → автомат 25 А → кабель 4 мм².'},uz:{q:'Liniya toki 20 A. Qanday kabel?',o:['4 mm², 25 A avtomat bilan','1,5 mm²','2,5 mm², 32 A avtomat bilan'],e:'20 A → 25 A avtomat → 4 mm² kabel.'}},
  {a:2,ru:{q:'Какой металл кабеля для квартиры?',o:['Алюминий','Сталь','Медь'],e:'Медь надёжнее и меньше греется.'},uz:{q:'Xonadon uchun kabel qaysi metalldan?',o:['Alyuminiy','Po\'lat','Mis'],e:'Mis ishonchliroq va kamroq qiziydi.'}},
  {a:1,ru:{q:'Линия 40 метров. Что сделать?',o:['Ничего','Взять кабель на размер больше','Поставить автомат больше'],e:'На длинной линии падает напряжение, поэтому кабель берут толще.'},uz:{q:'Liniya 40 metr. Nima qilish kerak?',o:['Hech narsa','Bir o\'lcham katta kabel olish','Kattaroq avtomat qo\'yish'],e:'Uzun liniyada kuchlanish tushadi, shuning uchun kabel yo\'g\'onroq olinadi.'}}]},

/* ---------- ADVANCED ---------- */
{id:'a1',lv:2,min:8,
 t:{ru:'Трёхфазная сеть',uz:'Uch fazali tarmoq'},s:{ru:'380 В: фазы L1, L2, L3',uz:'380 V: L1, L2, L3 fazalar'},
 svg:l=>svg(`<rect x="10" y="30" width="90" height="180" rx="10" fill="var(--bg)" stroke="var(--line)" stroke-width="2"/>`+tx(55,50,l=='ru'?'Трансформатор':'Transformator',{s:9,w:700,c:'var(--muted)'})+
  `<path d="M55 125V85M55 125L30 150M55 125L80 150" stroke="var(--fg)" stroke-width="2.5"/><circle cx="55" cy="125" r="4" fill="var(--fg)"/>`+
  wire('M100 60H340',W.L)+wire('M100 100H340',W.K)+wire('M100 140H340',W.G)+wire('M100 180H340',W.N)+wire('M55 129V180H100',W.N,3)+
  tx(118,54,'L1',{w:700,c:'var(--wL)'})+tx(118,94,'L2',{w:700})+tx(118,134,'L3',{w:700})+tx(118,174,'N',{w:700,c:'var(--wN)'})+
  `<path d="M230 62V98" stroke="var(--accent)" stroke-width="2.5"/><path d="M300 62V178" stroke="var(--accent)" stroke-width="2.5"/>`+
  `<rect x="200" y="70" width="60" height="20" rx="4" fill="var(--surface)" stroke="var(--accent)"/>`+tx(230,84,'380 В',{w:700})+
  `<rect x="270" y="150" width="60" height="20" rx="4" fill="var(--surface)" stroke="var(--accent)"/>`+tx(300,164,'220 В',{w:700})+
  tx(200,228,l=='ru'?'Между фазами 380 В, между фазой и нолём 220 В':'Fazalar orasida 380 V, faza va nol orasida 220 V',{c:'var(--muted)'}),
  l=='ru'?'Трёхфазная сеть: три фазы и ноль. Между фазами 380 В, между фазой и нолём 220 В':'Uch fazali tarmoq: uch faza va nol. Fazalar orasida 380 V, faza va nol orasida 220 V'),
 legend:['L','K','G','N'],
 steps:{ru:['В трёхфазной сети три фазы (L1, L2, L3), ноль N и заземление PE. Кабель 5-жильный.','Цвета по стандарту: L1 коричневый, L2 чёрный, L3 серый. В старых домах: жёлтый, зелёный, красный.','Между любыми двумя фазами <b>380 В</b>, между фазой и нолём <b>220 В</b>.','Трёхфазный ввод нужен для частного дома с мощными приборами, мастерских, станков.','Квартирные потребители распределяйте по фазам равномерно, чтобы одна фаза не была перегружена.'],
       uz:['Uch fazali tarmoqda uch faza (L1, L2, L3), nol N va yerga ulash PE bor. Kabel 5 tomirli.','Standart ranglar: L1 jigarrang, L2 qora, L3 kulrang. Eski uylarda: sariq, yashil, qizil.','Istalgan ikki faza orasida <b>380 V</b>, faza va nol orasida <b>220 V</b>.','Uch fazali kirish quvvatli asboblari bor xususiy uy, ustaxona, stanoklar uchun kerak.','Maishiy iste\'molchilarni fazalarga teng taqsimlang, bitta faza ortiqcha yuklanmasin.']},
 tip:{ru:'Если оборвался ноль в трёхфазной сети, в розетках может оказаться до 380 В. Сгорит техника. Защита: реле напряжения на каждую фазу.',uz:'Uch fazali tarmoqda nol uzilsa, rozetkalarda 380 V gacha kuchlanish bo\'lishi mumkin. Texnika kuyadi. Himoya: har bir fazaga kuchlanish relesi.'},
 quiz:[
  {a:2,ru:{q:'Напряжение между двумя фазами?',o:['220 В','110 В','380 В'],e:'Линейное напряжение 380 В.'},uz:{q:'Ikki faza orasidagi kuchlanish?',o:['220 V','110 V','380 V'],e:'Liniya kuchlanishi 380 V.'}},
  {a:0,ru:{q:'Сколько жил в кабеле для трёхфазной сети с землёй?',o:['5','3','4'],e:'L1, L2, L3, N и PE.'},uz:{q:'Yerga ulashli uch fazali tarmoq kabelida nechta tomir bor?',o:['5','3','4'],e:'L1, L2, L3, N va PE.'}},
  {a:1,ru:{q:'Чем опасен обрыв ноля в трёхфазной сети?',o:['Ничем','В розетках может стать до 380 В','Свет станет ярче на 1%'],e:'Перекос фаз сжигает технику. Ставьте реле напряжения.'},uz:{q:'Uch fazali tarmoqda nol uzilishi nimasi bilan xavfli?',o:['Hech narsa','Rozetkalarda 380 V gacha bo\'lishi mumkin','Chiroq 1% yorqinroq bo\'ladi'],e:'Fazalar qiyshayishi texnikani kuydiradi. Kuchlanish relesi qo\'ying.'}},
  {a:1,ru:{q:'Как распределять нагрузку по фазам?',o:['Всё на L1','Равномерно','Только на L3'],e:'Равномерная нагрузка снижает перекос фаз.'},uz:{q:'Yuklamani fazalarga qanday taqsimlash kerak?',o:['Hammasini L1 ga','Teng','Faqat L3 ga'],e:'Teng yuklama fazalar qiyshayishini kamaytiradi.'}}]},

{id:'a2',lv:2,min:9,
 t:{ru:'Двигатель: звезда и треугольник',uz:'Dvigatel: yulduz va uchburchak'},s:{ru:'Подключение в клеммной коробке',uz:'Klemma qutisida ulash'},
 svg:l=>{const term=(ox,star)=>{let s=`<rect x="${ox}" y="40" width="160" height="130" rx="10" fill="var(--bg)" stroke="var(--line)" stroke-width="2"/>`;
  const xs=[ox+35,ox+80,ox+125],top=['W2','U2','V2'],bot=['U1','V1','W1'];
  if(star)s+=`<path d="M${xs[0]} 80H${xs[2]}" stroke="var(--accent)" stroke-width="7" stroke-linecap="round"/>`;
  else xs.forEach(x=>s+=`<path d="M${x} 80V130" stroke="var(--accent)" stroke-width="7" stroke-linecap="round"/>`);
  xs.forEach((x,i)=>{s+=`<circle cx="${x}" cy="80" r="11" fill="var(--surface)" stroke="var(--fg)" stroke-width="2"/>${tx(x,62,top[i],{s:10,w:700})}<circle cx="${x}" cy="130" r="11" fill="var(--surface)" stroke="var(--fg)" stroke-width="2"/>${tx(x+14,152,bot[i],{a:'start',s:10,w:700})}`});
  s+=wire(`M${xs[0]} 141V200`,W.L,4)+wire(`M${xs[1]} 141V200`,W.K,4)+wire(`M${xs[2]} 141V200`,W.G,4)+tx(xs[0],214,'L1',{s:10,w:700})+tx(xs[1],214,'L2',{s:10,w:700})+tx(xs[2],214,'L3',{s:10,w:700});
  return s};
  return svg(term(10,true)+term(190,false)+tx(90,28,l=='ru'?'ЗВЕЗДА  Y':'YULDUZ  Y',{w:700,s:12})+tx(270,28,l=='ru'?'ТРЕУГОЛЬНИК  Δ':'UCHBURCHAK  Δ',{w:700,s:12})+tx(180,240,l=='ru'?'Жёлтые полосы — перемычки':'Sariq chiziqlar — peremichkalar',{c:'var(--muted)'}),
  l=='ru'?'Клеммная коробка двигателя: в звезде перемычка соединяет W2, U2, V2; в треугольнике три вертикальные перемычки':'Dvigatel klemma qutisi: yulduzda peremichka W2, U2, V2 ni ulaydi; uchburchakda uchta vertikal peremichka')},
 legend:['L','K','G'],
 steps:{ru:['Посмотрите на табличку двигателя: там написано, например, <b>Δ/Y 220/380 В</b>.','Если сеть 380 В, а на табличке 220/380 В, соединяйте <b>звездой</b>: одна перемычка на верхние клеммы W2–U2–V2.','Если на табличке 380/660 В, в сети 380 В соединяйте <b>треугольником</b>: три вертикальные перемычки.','Фазы L1, L2, L3 подключите к нижним клеммам U1, V1, W1. Корпус двигателя заземлите.','Двигатель крутится не в ту сторону? Поменяйте местами любые две фазы.'],
       uz:['Dvigatel jadvalchasiga qarang: unda, masalan, <b>Δ/Y 220/380 V</b> deb yozilgan.','Tarmoq 380 V, jadvalchada 220/380 V bo\'lsa, <b>yulduz</b> qilib ulang: yuqori klemmalarga W2–U2–V2 bitta peremichka.','Jadvalchada 380/660 V bo\'lsa, 380 V tarmoqda <b>uchburchak</b> qilib ulang: uchta vertikal peremichka.','L1, L2, L3 fazalarni pastki U1, V1, W1 klemmalariga ulang. Dvigatel korpusini yerga ulang.','Dvigatel teskari aylanyaptimi? Istalgan ikki fazaning o\'rnini almashtiring.']},
 tip:{ru:'Двигатель на 220/380 В, соединённый треугольником в сети 380 В, сгорит за минуты.',uz:'220/380 V dvigatel 380 V tarmoqda uchburchak qilib ulansa, bir necha daqiqada kuyadi.'},
 quiz:[
  {a:0,ru:{q:'Табличка 220/380 В, сеть 380 В. Схема?',o:['Звезда','Треугольник','Любая'],e:'Большее напряжение на табличке соответствует звезде.'},uz:{q:'Jadvalcha 220/380 V, tarmoq 380 V. Sxema?',o:['Yulduz','Uchburchak','Istalgan'],e:'Jadvalchadagi katta kuchlanish yulduzga mos keladi.'}},
  {a:2,ru:{q:'Как изменить направление вращения?',o:['Перевернуть двигатель','Убрать перемычку','Поменять местами две фазы'],e:'Любые две фазы меняют местами.'},uz:{q:'Aylanish yo\'nalishini qanday o\'zgartirish mumkin?',o:['Dvigatelni ag\'darish','Peremichkani olib tashlash','Ikki fazaning o\'rnini almashtirish'],e:'Istalgan ikki faza o\'rnini almashtiriladi.'}},
  {a:1,ru:{q:'Сколько перемычек в треугольнике?',o:['1','3','6'],e:'Три вертикальные перемычки.'},uz:{q:'Uchburchakda nechta peremichka?',o:['1','3','6'],e:'Uchta vertikal peremichka.'}},
  {a:1,ru:{q:'К каким клеммам подключают фазы?',o:['W2, U2, V2','U1, V1, W1','К корпусу'],e:'Питание всегда на начала обмоток U1, V1, W1.'},uz:{q:'Fazalar qaysi klemmalarga ulanadi?',o:['W2, U2, V2','U1, V1, W1','Korpusga'],e:'Ta\'minot doim chulg\'am boshlari U1, V1, W1 ga.'}}]},

{id:'a3',lv:2,min:10,
 t:{ru:'Магнитный пускатель',uz:'Magnit puskatel'},s:{ru:'Схема «Пуск–Стоп»',uz:'«Pusk–Stop» sxemasi'},
 svg:l=>svg(wire('M24 30V210',W.L,4)+wire('M336 30V210',W.N,4)+tx(24,22,'L',{w:700,c:'var(--wL)'})+tx(336,22,'N',{w:700,c:'var(--wN)'})+
  wire('M24 100H64',W.L,3)+box(64,82,58,36)+tx(93,104,l=='ru'?'СТОП':'STOP',{w:700,s:10})+tx(93,132,'NC',{s:9,c:'var(--muted)'})+
  wire('M122 100H144',W.L,3)+box(144,82,58,36)+tx(173,104,l=='ru'?'ПУСК':'PUSK',{w:700,s:10})+tx(173,74,'NO',{s:9,c:'var(--muted)'})+
  wire('M202 100H230',W.L,3)+`<rect x="230" y="80" width="50" height="40" rx="4" fill="var(--accent)" stroke="var(--fg)" stroke-width="1.5"/>`+tx(255,98,'KM',{w:700,s:12,c:'var(--accent-ink)'})+tx(255,111,'A1–A2',{s:9,c:'var(--accent-ink)'})+
  wire('M280 100H296',W.N,3)+box(296,84,28,32)+tx(310,104,'KK',{s:9,w:700})+wire('M324 100H336',W.N,3)+
  wire('M133 100V170H144',W.L,3)+box(144,152,58,36)+tx(173,174,'KM 13-14',{w:700,s:10})+wire('M202 170H216V100',W.L,3)+
  tx(173,206,l=='ru'?'самоподхват':'o\'zini ushlab turish',{s:10,c:'var(--muted)'})+tx(310,136,l=='ru'?'тепловое':'issiqlik',{s:9,c:'var(--muted)'})+tx(310,147,l=='ru'?'реле':'relesi',{s:9,c:'var(--muted)'})+
  tx(180,236,l=='ru'?'Цепь управления пускателем на 220 В':'220 V puskatel boshqaruv zanjiri',{c:'var(--muted)'}),
  l=='ru'?'Схема пуск-стоп: фаза через кнопку стоп и кнопку пуск на катушку пускателя, параллельно кнопке пуск блок-контакт 13-14':'Pusk-stop sxemasi: faza stop va pusk tugmalari orqali puskatel g\'altagiga, pusk tugmasiga parallel 13-14 blok-kontakt'),
 steps:{ru:['Кнопка <b>СТОП</b> нормально замкнутая (NC), кнопка <b>ПУСК</b> нормально разомкнутая (NO).','Фаза идёт: СТОП → ПУСК → катушка пускателя A1, с A2 через тепловое реле (95–96) на ноль.','Блок-контакт пускателя <b>13–14</b> ставят параллельно кнопке ПУСК. Это самоподхват: двигатель работает после отпускания кнопки.','Силовые контакты пускателя (1-2, 3-4, 5-6) подают три фазы на двигатель через тепловое реле.','Катушка бывает на 220 В или 380 В. Смотрите надпись на пускателе.'],
       uz:['<b>STOP</b> tugmasi odatda yopiq (NC), <b>PUSK</b> tugmasi odatda ochiq (NO).','Faza yo\'li: STOP → PUSK → puskatel g\'altagi A1, A2 dan issiqlik relesi (95–96) orqali nolga.','Puskatelning <b>13–14</b> blok-kontakti PUSK tugmasiga parallel qo\'yiladi. Bu o\'zini ushlab turish: tugma qo\'yib yuborilgandan keyin ham dvigatel ishlaydi.','Puskatelning kuch kontaktlari (1-2, 3-4, 5-6) issiqlik relesi orqali dvigatelga uch faza beradi.','G\'altak 220 V yoki 380 V bo\'ladi. Puskateldagi yozuvga qarang.']},
 tip:{ru:'Без самоподхвата двигатель будет работать только пока держишь кнопку ПУСК.',uz:'O\'zini ushlab turishsiz dvigatel faqat PUSK tugmasini bosib turganda ishlaydi.'},
 quiz:[
  {a:1,ru:{q:'Кнопка СТОП в обычном состоянии…',o:['Разомкнута (NO)','Замкнута (NC)','Не подключена'],e:'СТОП нормально замкнутая: нажатие разрывает цепь.'},uz:{q:'STOP tugmasi odatiy holatda…',o:['Ochiq (NO)','Yopiq (NC)','Ulanmagan'],e:'STOP odatda yopiq: bosilganda zanjir uziladi.'}},
  {a:0,ru:{q:'Зачем контакт 13–14 параллельно ПУСК?',o:['Чтобы двигатель работал после отпускания кнопки','Для красоты','Для заземления'],e:'Это самоподхват.'},uz:{q:'13–14 kontakt nega PUSK ga parallel?',o:['Tugma qo\'yib yuborilganda ham dvigatel ishlashi uchun','Chiroyli bo\'lishi uchun','Yerga ulash uchun'],e:'Bu o\'zini ushlab turish.'}},
  {a:2,ru:{q:'Что защищает двигатель от перегрузки?',o:['Кнопка СТОП','Катушка','Тепловое реле'],e:'Тепловое реле размыкает 95–96 при перегреве.'},uz:{q:'Dvigatelni ortiqcha yuklamadan nima himoya qiladi?',o:['STOP tugmasi','G\'altak','Issiqlik relesi'],e:'Issiqlik relesi qizib ketganda 95–96 ni uzadi.'}},
  {a:1,ru:{q:'Куда подключают катушку?',o:['1 и 2','A1 и A2','13 и 14'],e:'Выводы катушки всегда A1 и A2.'},uz:{q:'G\'altak qayerga ulanadi?',o:['1 va 2','A1 va A2','13 va 14'],e:'G\'altak chiqishlari doim A1 va A2.'}}]},

{id:'a4',lv:2,min:10,
 t:{ru:'Щит частного дома',uz:'Xususiy uy shiti'},s:{ru:'Ввод, счётчик, заземление',uz:'Kirish, hisoblagich, yerga ulash'},
 svg:l=>svg(
  flow(8,24,78,44,l=='ru'?'Ввод СИП':'SIP kirish','4×16')+arrow(86,46,96,46)+
  flow(98,24,78,44,l=='ru'?'Вводной':'Kirish','3P 40 А')+arrow(176,46,186,46)+
  flow(188,24,74,44,l=='ru'?'Счётчик':'Hisoblagich','3 фазы')+arrow(262,46,272,46)+
  flow(274,24,78,44,l=='ru'?'Реле напр.':'Kuch. relesi','3 шт.')+
  arrow(313,68,313,90)+flow(250,92,102,44,l=='ru'?'УЗО 100 мА':'UZO 100 mA',l=='ru'?'противопожарное':'yong\'inga qarshi')+
  arrow(300,136,300,156)+flow(206,158,146,44,l=='ru'?'Группы с УЗО 30 мА':'30 mA UZOli guruhlar',l=='ru'?'дом, кухня, баня, гараж':'uy, oshxona, hammom, garaj')+
  `<path d="M30 150H130M80 150V100" stroke="var(--fg)" stroke-width="2"/>`+[40,80,120].map(x=>`<path d="M${x} 150V210" stroke="url(#pe)" stroke-width="6"/>`).join('')+
  `<path d="M24 214H136M40 222H120M56 230H104" stroke="var(--muted)" stroke-width="2"/>`+tx(80,92,l=='ru'?'Контур заземления':'Yerga ulash konturi',{s:10,w:700})+tx(170,190,l=='ru'?'3 штыря':'3 ta qoziq',{s:10,c:'var(--muted)'})+tx(170,203,l=='ru'?'по 2–3 м':'2–3 m dan',{s:10,c:'var(--muted)'}),
  l=='ru'?'Щит частного дома: ввод СИП, вводной автомат, счётчик, реле напряжения, противопожарное УЗО, группы, контур заземления из трёх штырей':'Xususiy uy shiti: SIP kirish, kirish avtomati, hisoblagich, kuchlanish relesi, UZO, guruhlar, uch qoziqli yerga ulash konturi',245),
 steps:{ru:['Ввод от опоры делают кабелем <b>СИП</b>: для 3 фаз 4×16 мм², для 1 фазы 2×16 мм².','Порядок в щите: вводной автомат → счётчик → реле напряжения → противопожарное УЗО 100–300 мА → группы.','Делайте контур заземления: 3 стальных штыря по 2–3 м, забитых треугольником на расстоянии 2–3 м, соединённых полосой.','Сопротивление заземления должно быть не больше <b>30 Ом</b>, лучше до 10 Ом. Меряют специальным прибором.','Баню, гараж, насос, уличное освещение выводите отдельными группами со своим УЗО 30 мА.'],
       uz:['Ustundan kirish <b>SIP</b> kabeli bilan qilinadi: 3 faza uchun 4×16 mm², 1 faza uchun 2×16 mm².','Shitdagi tartib: kirish avtomati → hisoblagich → kuchlanish relesi → yong\'inga qarshi UZO 100–300 mA → guruhlar.','Yerga ulash konturi qiling: 2–3 m li 3 ta po\'lat qoziq, uchburchak shaklida 2–3 m oraliqda qoqilgan va polosa bilan ulangan.','Yerga ulash qarshiligi <b>30 Om</b> dan oshmasligi kerak, yaxshisi 10 Om gacha. Maxsus asbob bilan o\'lchanadi.','Hammom, garaj, nasos, ko\'cha yoritgichini o\'z 30 mA UZOsi bilan alohida guruhlarga chiqaring.']},
 tip:{ru:'В частном доме ноль и землю разделяют на вводе (система TN-C-S). После точки разделения их нельзя соединять обратно.',uz:'Xususiy uyda nol va yer kirishda ajratiladi (TN-C-S tizimi). Ajratish nuqtasidan keyin ularni qayta ulash mumkin emas.'},
 quiz:[
  {a:0,ru:{q:'Каким кабелем делают ввод от опоры?',o:['СИП','ПВС','Телефонным'],e:'СИП самонесущий, он выдерживает натяжение и погоду.'},uz:{q:'Ustundan kirish qaysi kabel bilan qilinadi?',o:['SIP','PVS','Telefon kabeli'],e:'SIP o\'zini ko\'taruvchi, tortilish va ob-havoga chidaydi.'}},
  {a:2,ru:{q:'Сколько штырей в обычном контуре заземления?',o:['1','10','3'],e:'Три штыря треугольником.'},uz:{q:'Oddiy yerga ulash konturida nechta qoziq bor?',o:['1','10','3'],e:'Uchburchak shaklida uchta qoziq.'}},
  {a:1,ru:{q:'Зачем УЗО на 100–300 мА на вводе?',o:['Для защиты людей','От пожара из-за утечки','Для счётчика'],e:'Противопожарное УЗО ловит утечки в старой проводке.'},uz:{q:'Kirishda 100–300 mA UZO nima uchun?',o:['Odamlarni himoya qilish uchun','Sizish tufayli yong\'indan','Hisoblagich uchun'],e:'Yong\'inga qarshi UZO eski simlardagi sizishlarni ushlaydi.'}},
  {a:1,ru:{q:'Каким должно быть сопротивление заземления?',o:['Больше 100 Ом','Не больше 30 Ом','Не важно'],e:'Чем меньше, тем лучше. Норма до 30 Ом.'},uz:{q:'Yerga ulash qarshiligi qanday bo\'lishi kerak?',o:['100 Om dan ko\'p','30 Om dan oshmasligi','Muhim emas'],e:'Qancha kam bo\'lsa, shuncha yaxshi. Me\'yor 30 Om gacha.'}}]}
];
