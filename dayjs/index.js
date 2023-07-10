const dayjs = require('dayjs');

dayjs.locale('ja', { weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'] });

const now = dayjs(new Date());
const today = now.format('YYYY-MM-DD');
const dayOfWeek = now.format('ddd');
console.log(`${today} ${dayOfWeek}`)
