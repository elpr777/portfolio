/* Meftah Properties — demo data (fictional companies, compounds and prices). */
window.D = (() => {
  const A = [ // areas: id, names, price per m² (EGP), 12-month change %, trend, map x/y, image
    { id: 'newcairo', ar: 'القاهرة الجديدة', en: 'New Cairo', ppsm: 62000, chg: 11.4, tr: [49, 51, 52, 54, 55, 57, 58, 59, 60, 61, 62, 62], x: 74, y: 52, img: 'hero' },
    { id: 'capital', ar: 'العاصمة الإدارية', en: 'New Capital', ppsm: 48500, chg: 14.2, tr: [36, 38, 39, 41, 42, 43, 44, 45, 46, 47, 48, 48.5], x: 90, y: 40, img: 'capital' },
    { id: 'zayed', ar: 'الشيخ زايد', en: 'Sheikh Zayed', ppsm: 57000, chg: 9.6, tr: [48, 49, 50, 51, 52, 53, 54, 55, 55, 56, 57, 57], x: 22, y: 46, img: 'zayed' },
    { id: 'october', ar: '6 أكتوبر', en: '6th October', ppsm: 36500, chg: 8.1, tr: [31, 32, 32, 33, 34, 34, 35, 35, 36, 36, 36, 36.5], x: 12, y: 68, img: 'zayed' },
    { id: 'maadi', ar: 'المعادي', en: 'Maadi', ppsm: 54000, chg: 6.3, tr: [49, 49, 50, 50, 51, 51, 52, 52, 53, 53, 54, 54], x: 52, y: 72, img: 'living' },
    { id: 'northcoast', ar: 'الساحل الشمالي', en: 'North Coast', ppsm: 78000, chg: 12.8, tr: [60, 62, 64, 66, 68, 70, 72, 74, 75, 76, 77, 78], x: 34, y: 9, img: 'coast' },
    { id: 'sokhna', ar: 'العين السخنة', en: 'Ain Sokhna', ppsm: 41000, chg: 10.7, tr: [32, 33, 34, 35, 36, 37, 38, 39, 40, 40, 41, 41], x: 88, y: 90, img: 'sokhna' }
  ];
  const DEV = [
    { id: 'nakhla', ar: 'نخلة للتطوير العقاري', en: 'Nakhla Developments', f: 2004, ab: ['شركة تطوير متخصصة في المجتمعات المتكاملة الراقية بشرق وغرب القاهرة، بتسليم منتظم وصيانة مدمجة.', 'A developer of integrated premium communities in east and west Cairo, with a steady delivery record and built-in facility management.'] },
    { id: 'ofoq', ar: 'أفق مصر', en: 'Ofoq Misr', f: 2011, ab: ['تركّز على الأبراج السكنية والتجارية في العاصمة الإدارية بتصميمات معمارية معاصرة.', 'Focused on residential and commercial towers in the New Capital with contemporary architecture.'] },
    { id: 'wadi', ar: 'الوادي العقارية', en: 'Al Wadi Properties', f: 1998, ab: ['من أقدم الشركات في الساحل الشمالي والسخنة، مشروعات شاليهات وفيلات على البحر.', 'One of the longest-standing developers on the North Coast and Sokhna, building beachfront chalets and villas.'] },
    { id: 'sama', ar: 'سما أربان', en: 'Sama Urban', f: 2015, ab: ['مشروعات مدن مصغّرة في الشيخ زايد وأكتوبر مع مساحات خضراء تتجاوز نصف المساحة.', 'Mini-city projects in Sheikh Zayed and October with green space above half of the land area.'] }
  ];
  const P = [
    { id: 'riviera', ar: 'ريفييرا جاردنز', en: 'Riviera Gardens', a: 'newcairo', d: 'nakhla', img: 'hero', from: 9800000, down: 5, yrs: 8, dl: 'Q4 2028', land: 210, green: 62, units: 1450, types: ['villa', 'townhouse', 'apartment'], am: ['lagoon', 'clubhouse', 'kids', 'gym', 'security', 'retail'] },
    { id: 'opal', ar: 'أوبال تاورز', en: 'Opal Towers', a: 'capital', d: 'ofoq', img: 'capital', from: 3400000, down: 10, yrs: 9, dl: 'Q2 2029', land: 38, green: 35, units: 920, types: ['apartment', 'office'], am: ['gym', 'pool', 'security', 'retail', 'parking'] },
    { id: 'zahraa', ar: 'خليج الزهراء', en: 'Zahraa Bay', a: 'northcoast', d: 'wadi', img: 'coast', from: 5900000, down: 10, yrs: 8, dl: 'Q3 2027', land: 320, green: 48, units: 2100, types: ['chalet', 'villa'], am: ['beach', 'pool', 'clubhouse', 'kids', 'security', 'retail'] },
    { id: 'westline', ar: 'ويستلاين ريزيدنس', en: 'Westline Residence', a: 'zayed', d: 'sama', img: 'zayed', from: 6200000, down: 5, yrs: 8, dl: 'Q1 2028', land: 150, green: 55, units: 780, types: ['townhouse', 'villa', 'apartment'], am: ['clubhouse', 'kids', 'gym', 'security', 'park'] },
    { id: 'pearl', ar: 'لؤلؤة السخنة', en: 'Sokhna Pearl', a: 'sokhna', d: 'wadi', img: 'sokhna', from: 2900000, down: 10, yrs: 10, dl: 'Q4 2027', land: 95, green: 30, units: 1180, types: ['chalet', 'apartment'], am: ['beach', 'pool', 'gym', 'security', 'retail'] }
  ];
  const AGENTS = [
    { id: 'a1', ar: 'منى الشريف', en: 'Mona El-Sherif', role: ['مستشارة مبيعات — القاهرة الجديدة', 'Sales consultant — New Cairo'], img: 'agent1', ph: '01000000001', lic: 'RA-20418', deals: 214 },
    { id: 'a2', ar: 'كريم عبد الحميد', en: 'Karim Abdel-Hamid', role: ['مستشار مبيعات — الشيخ زايد والعاصمة', 'Sales consultant — Zayed & Capital'], img: 'agent2', ph: '01000000002', lic: 'RA-19377', deals: 188 }
  ];
  // l: id, purpose, type, area, project, price (sale total or monthly rent), m2, beds, baths, finishing, status, delivery, down %, yrs, floor, am[], agent, days(listed ago), ti [ar,en]
  const L = [
    ['l1', 's', 'villa', 'newcairo', 'riviera', 18900000, 340, 5, 5, 'full', 'off', 'Q4 2028', 5, 8, 0, ['garden', 'pool', 'parking', 'security', 'smart'], 'a1', 2, ['فيلا مستقلة بحديقة خاصة على اللاجون', 'Standalone villa with private garden on the lagoon']],
    ['l2', 's', 'townhouse', 'newcairo', 'riviera', 12400000, 245, 4, 4, 'semi', 'off', 'Q4 2028', 5, 8, 0, ['garden', 'parking', 'security'], 'a1', 5, ['تاون هاوس زاوية في ريفييرا جاردنز', 'Corner townhouse in Riviera Gardens']],
    ['l3', 's', 'apartment', 'capital', 'opal', 4150000, 118, 2, 2, 'core', 'off', 'Q2 2029', 10, 9, 14, ['gym', 'parking', 'security', 'balcony'], 'a2', 1, ['شقة بإطلالة على الحديقة المركزية', 'Apartment overlooking the central park']],
    ['l4', 's', 'apartment', 'capital', 'opal', 5900000, 165, 3, 3, 'semi', 'off', 'Q2 2029', 10, 9, 22, ['gym', 'parking', 'security', 'balcony', 'smart'], 'a2', 3, ['شقة ثلاث غرف بدور مرتفع', 'Three-bedroom apartment on a high floor']],
    ['l5', 's', 'chalet', 'northcoast', 'zahraa', 7300000, 105, 2, 2, 'full', 'off', 'Q3 2027', 10, 8, 1, ['beach', 'pool', 'security', 'balcony'], 'a1', 4, ['شاليه بحديقة وإطلالة بحرية جزئية', 'Garden chalet with partial sea view']],
    ['l6', 's', 'villa', 'northcoast', 'zahraa', 26500000, 330, 4, 5, 'full', 'ready', 'جاهز', 100, 0, 0, ['beach', 'pool', 'garden', 'parking', 'security'], 'a1', 9, ['فيلا جاهزة للمعاينة على الشاطئ مباشرة', 'Ready beachfront villa available to view']],
    ['l7', 's', 'townhouse', 'zayed', 'westline', 9800000, 210, 3, 3, 'semi', 'off', 'Q1 2028', 5, 8, 0, ['garden', 'parking', 'security', 'smart'], 'a2', 6, ['تاون هاوس بتراس علوي', 'Townhouse with a roof terrace']],
    ['l8', 's', 'apartment', 'zayed', 'westline', 5450000, 130, 2, 2, 'full', 'off', 'Q1 2028', 10, 8, 3, ['gym', 'parking', 'security', 'balcony'], 'a2', 8, ['شقة كاملة التشطيب بجوار النادي', 'Fully finished apartment next to the clubhouse']],
    ['l9', 's', 'chalet', 'sokhna', 'pearl', 3150000, 85, 2, 1, 'semi', 'off', 'Q4 2027', 10, 10, 2, ['beach', 'pool', 'security'], 'a2', 7, ['شاليه بإطلالة على الجبل والبحر', 'Chalet with mountain and sea views']],
    ['l10', 's', 'apartment', 'maadi', '', 7600000, 142, 3, 2, 'full', 'ready', 'جاهز', 100, 0, 5, ['parking', 'security', 'balcony', 'elevator'], 'a1', 11, ['شقة جاهزة بشارع هادئ في المعادي', 'Ready apartment on a quiet Maadi street']],
    ['l11', 's', 'duplex', 'october', '', 4200000, 190, 3, 3, 'semi', 'ready', 'جاهز', 100, 0, 6, ['garden', 'parking', 'security'], 'a2', 14, ['دوبلكس بحديقة خاصة قرب المحور', 'Duplex with private garden near the axis']],
    ['l12', 's', 'office', 'capital', 'opal', 6800000, 95, 0, 1, 'core', 'off', 'Q2 2029', 10, 9, 8, ['parking', 'security', 'elevator'], 'a2', 12, ['مكتب إداري بواجهة زجاجية', 'Office unit with a glass facade']],
    ['l13', 'r', 'apartment', 'newcairo', '', 42000, 150, 3, 2, 'full', 'ready', 'جاهز', 0, 0, 4, ['parking', 'security', 'gym', 'balcony'], 'a1', 1, ['شقة مفروشة للإيجار بالتجمع الخامس', 'Furnished apartment for rent in the Fifth Settlement']],
    ['l14', 'r', 'villa', 'zayed', '', 120000, 360, 5, 5, 'full', 'ready', 'جاهز', 0, 0, 0, ['garden', 'pool', 'parking', 'security'], 'a2', 3, ['فيلا للإيجار داخل كمبوند مسوّر', 'Villa for rent inside a gated compound']],
    ['l15', 'r', 'apartment', 'maadi', '', 28000, 120, 2, 2, 'full', 'ready', 'جاهز', 0, 0, 3, ['security', 'elevator', 'balcony'], 'a1', 6, ['شقة للإيجار بإطلالة على الشارع الرئيسي', 'Apartment for rent on the main street']],
    ['l16', 'r', 'office', 'capital', '', 65000, 110, 0, 1, 'full', 'ready', 'جاهز', 0, 0, 10, ['parking', 'security', 'elevator'], 'a2', 4, ['مكتب مجهّز بالكامل للإيجار', 'Fully fitted office for rent']]
  ].map(r => ({ id: r[0], pu: r[1], ty: r[2], a: r[3], p: r[4], price: r[5], m2: r[6], bd: r[7], ba: r[8], fin: r[9], st: r[10], dl: r[11], down: r[12], yrs: r[13], fl: r[14], am: r[15], ag: r[16], days: r[17], ti: r[18] }));
  return { A, DEV, P, L, AGENTS };
})();
