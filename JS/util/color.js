window.refreshColors = function() {
    const currentYear = currentDate.getFullYear().toString();
    const currentMonth = currentDate.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonthName = monthNames[currentMonth];

    if (eventJSON[currentYear] && eventJSON[currentYear][currentMonthName]) {
        Object.keys(eventJSON[currentYear][currentMonthName]).forEach(color => {
            eventJSON[currentYear][currentMonthName][color].forEach(day => {
                const dayCell = document.querySelector(`.calendar-days div[data-year="${currentYear}"][data-month="${currentMonth}"][data-day="${day}"]`);
                if (dayCell) {
                    dayCell.style.backgroundColor = color;
                }
            });
        });
    }
};

window.addEventListener('DOMContentLoaded', window.refreshColors);  // Ensure colors are applied when the document is loaded
