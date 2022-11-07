currentDay = document.querySelector('#currentDay')
currentDay.innerText = moment().format('MMM DD h:mm A')

function getParentRow(ele) {
    counter = 0
    while (!ele.className.includes('row')) {
        ele = ele.parentElement
        counter++
        if (counter >= 1000) {
            break;
        }
    }
    return ele
}

function getHour(ele) {
    parentRow = getParentRow(ele)
    var hourStr = parentRow.querySelector('.hour').innerText
    return moment(hourStr, 'HH A') 
}

function relativeToNow(time) {
    if (time.isBefore(moment(), 'hour')) { return 'past'}
    if (time.isSame(moment(), 'hour')) { return 'present'}
    if (time.isAfter(moment(), 'hour')) { return 'future'}
}

function getSaved() {
    var saved = localStorage.getItem('saved')
    if (saved) { saved = JSON.parse(saved) }
    else { saved = {} }
    return saved
}

function setSaved(index, str) {
    var saved = getSaved()
    saved[index] = str
    saved = JSON.stringify(saved)
    localStorage.setItem('saved', saved)
}

function save() {
    var hourStr = getHour(event.target)._i
    var text = getParentRow(event.target).querySelector('textarea').value
    setSaved(hourStr, text)
}


var textAreaArr = document.querySelectorAll('textarea')
try {
    for (let i = 0; i < textAreaArr.length; i++) {
        var textArea = textAreaArr[i]
        var hour = getHour(textArea)
        var relativeTime = relativeToNow(hour)
        textArea.className = relativeTime
    
        var saved = getSaved()
        if (saved[hour._i]) {
            textArea.value = saved[hour._i]
        }
    }
} catch(e) {
    if(e.name == "NS_ERROR_FILE_CORRUPTED") {
        alert("Sorry, it looks like your browser storage has been corrupted. Please clear your storage by going to Tools -> Clear Recent History -> Cookies and set time range to 'Everything'. This will remove the corrupted browser storage across all sites.");
    }
}
