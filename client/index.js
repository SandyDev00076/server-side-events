const EVENTS_URL = 'http://localhost:4600/events';

const eventSource = new EventSource(EVENTS_URL);

const textEle = document.querySelector('.the-ultimate-string');

eventSource.addEventListener('receiveWord', (e) => {
    textEle.innerHTML += ` ${e.data}`;
});

eventSource.addEventListener('stop', () => {
    eventSource.close();
})
