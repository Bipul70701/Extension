chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'insert') {
       insert_records(request.payload);
    } 
});


function insert_records(records) {
    myData = new User(records);
    myData.save();
}



