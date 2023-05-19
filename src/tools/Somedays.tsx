const Holidays = [
    '2023/1/1', // 元日(1/1)
    '2023/1/2', // 振替休日
    '2023/1/9', // 成人の日(1月第2月曜日)
    '2023/2/11', // 建国記念の日(2/11)
    '2023/2/23', // 天皇誕生日(2/23)
    '2023/3/21', // 春分の日(春分の日)
    '2023/4/29', // 昭和の日(4/29)
    '2023/5/3', // 憲法記念日(5/3)
    '2023/5/4', // みどりの日(5/4)
    '2023/5/5', // こどもの日(5/5)
    '2023/7/17', // 海の日(7月第3月曜日)
    '2023/8/11', // 山の日(8/11)
    '2023/9/18', // 敬老の日(9月第3月曜日)
    '2023/9/23', // 秋分の日(秋分の日)
    '2023/10/9', // スポーツの日(10月第2月曜日)
    '2023/11/3', // 文化の日(11/3)
    '2023/11/23', // 勤労感謝の日(11/23)
]

export const isHoliday = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const onlydate = date.getDate();
    let str = year + '/' + month + '/' + onlydate;
    if(Holidays.includes(str) || date.getDay() === 0 || date.getDay() === 6){
        return true
    } else {
        return false
    }
}

export const days = ["日", "月", "火", "水", "木", "金", "土"]

export const yyyyMMdd = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
})