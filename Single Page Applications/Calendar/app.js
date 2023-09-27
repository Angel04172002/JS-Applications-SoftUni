const monthsCalendarElements = document.querySelectorAll('.monthCalendar');
const daysCalendarElements = document.querySelectorAll('.daysCalendar');
const months = document.querySelector('.monthsList');

hideDaysAndMonths();

const monthsDictionary = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'Jul': 7,
    'Aug': 8,
    'Sept': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12
};

const yearsSection = document.getElementById('years');
yearsSection.addEventListener('click', displayMonths);
months.addEventListener('click', displayDays);


function displayMonths(e) {

    if (e.target.tagName !== 'TD') {
        return;
    };

    const yearId = `year-${e.target.textContent.trim()}`;
    const currentMonths = document.getElementById(yearId);

    const captionElement = getChildElement(currentMonths, 'CAPTION')
    captionElement.addEventListener('click', showAllYears);

    currentMonths.style.display = 'block';
    e.currentTarget.style.display = 'none';
}

function displayDays(e) {

    if (e.target.tagName !== 'TD' || !e.target.classList.contains('day')) {
        return;
    };

    const section = getParentElement(e.target, 'SECTION');
    const year = section.id.slice(-4);
    const month = e.target.textContent.trim();

    const daysId = `month-${year}-${monthsDictionary[month]}`;
    const daysSection = document.getElementById(daysId);


    const captionElement = getChildElement(daysSection, 'CAPTION')
    captionElement.addEventListener('click', showAllMonths);

    daysSection.style.display = 'block';
    section.style.display = 'none';
}


function showAllYears(e) {
    yearsSection.style.display = 'block';
    const section = getParentElement(e.currentTarget, 'SECTION');
    section.style.display = 'none';
    e.currentTarget.removeEventListener('click', showAllYears);
}


function showAllMonths(e) {

    const section = getParentElement(e.target, 'SECTION');
    const year = section.id.slice(6, 10);
    const monthId = `year-${year}`;
    const currentMonths = months.querySelector(`#${monthId}`);

    currentMonths.style.display = 'block';
    section.style.display = 'none';
    e.currentTarget.removeEventListener('click', showAllMonths);
}


function hideDaysAndMonths() {

    for (let month of monthsCalendarElements) {
        month.style.display = 'none';
    };

    for (let day of daysCalendarElements) {
        day.style.display = 'none';
    };

}


function getParentElement(element, parentName) {

    while (element.tagName !== parentName) {
        element = element.parentNode;
    }

    return element;
}


function getChildElement(element, childName) {

    while (element.tagName !== childName) {
        element = element.firstElementChild;
    }

    return element;
}
