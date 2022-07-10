// update tab indicator when user starts to fill forms

const tabsIndexListElement = document.getElementById('tabs-list')
const inputFieldsElements = document.querySelectorAll('#personal-information input')

function addIndicatorActiveClass() {
    tabsIndexListElement.firstElementChild.firstElementChild.classList.add('active')
}

for(const input of inputFieldsElements) {
    input.addEventListener('click', addIndicatorActiveClass)
}


