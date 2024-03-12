let eventHistory = []; 
window.colorEvent = function(targetDate, color) {
    const dateParts = targetDate.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);
    const dayCell = document.querySelector(`.calendar-days div[data-year="${year}"][data-month="${month}"][data-day="${day}"]`);
    if (dayCell) {
       dayCell.style.backgroundColor = color;
    }
     eventHistory.push({ targetDate, color });
 }
window.refreshColors = function() { 
    eventHistory.forEach(({ targetDate, color }) => {
        window.colorEvent(targetDate, color);
    });
}
