window.__errorQueue = []

function errorHandler(error) {
    if (!window.__errorQueue) return
    window.__errorQueue.push(error)
}

window.addEventListener('error', function (event) {
    errorHandler(event.error)
})
window.addEventListener('unhandledrejection', function (event) {
    errorHandler(event.reason)
})