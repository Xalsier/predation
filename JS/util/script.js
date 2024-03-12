const months = [
    "１月", "２月", "３月", "４月",
    "５月", "６月", "７月", "８月",
    "９月", "１０月", "１１月", "１２月",
];
const monthAndYearDisplay = document.getElementById("monthAndYear");
const daysContainer = document.querySelector(".calendar-days");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");
const fullWidthChars = "０１２３４５６７８９";

function toFullWidth(num) {
    return num.toString().replace(/[0-9]/g, (digit) => fullWidthChars[digit]);
}

let currentDate = new Date();

function renderCalendar() {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth(); 
    const todayYear = today.getFullYear(); 
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    monthAndYearDisplay.textContent = `${months[currentMonth]} ${toFullWidth(currentYear)}`;

    // Optimization: Use DocumentFragment
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < firstDayOfMonth; i++) {
        const day = document.createElement("div");
        day.classList.add("empty", `empty-${i}`);
        fragment.appendChild(day);
    }

    for (let i = 1; i <= totalDaysInMonth; i++) {
        const day = document.createElement("div");
        day.textContent = toFullWidth(i);

        // Pre-calculate styling classes
        const dayClasses = ["day"]; 
        if (currentYear < todayYear || (currentYear === todayYear && currentMonth < todayMonth) || (currentYear === todayYear && currentMonth === todayMonth && i < todayDate)) {
            dayClasses.push("past");
        } else if (i === todayDate && currentMonth === todayMonth && currentYear === todayYear) {
            dayClasses.push("today");
        }
        day.className = dayClasses.join(" ");

        day.setAttribute('data-year', currentYear);
        day.setAttribute('data-month', currentMonth);
        day.setAttribute('data-day', i); 
        fragment.appendChild(day);
    }

    // Optimization: Append fragment at once
    daysContainer.innerHTML = ""; 
    daysContainer.appendChild(fragment); 
}

// Event delegation for click handling
daysContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('day')) {
        const year = event.target.getAttribute('data-year');
        const month = event.target.getAttribute('data-month');
        const day = event.target.getAttribute('data-day');

        // Handle day click here
        console.log(`Clicked on ${year}-${month}-${day}`); 
    }
});

prevBtn.addEventListener("click", function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
    window.refreshColors(); 
});

nextBtn.addEventListener("click", function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
    window.refreshColors(); 
});

renderCalendar(); 
