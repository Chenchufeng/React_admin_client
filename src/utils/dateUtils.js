/**
 * 
 * @param {格式化日期} time 
 */
export function formateDate(time){
    if(!time) return '';
    let date = new Date(time);
        return date.getFullYear() + '-' + date.getMonth() +'-'+date.getDate()
        +' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
}