export function CheckImage(url, callback, timeout) {
    timeout = timeout || 5000;
    var timedOut = false, timer;
    var img = new Image();
    img.onerror = img.onabort = function() {
        if (!timedOut) {
            clearTimeout(timer);
            eval(callback)(url, "error");
        }
    };
    img.onload = function() {
        if (!timedOut) {
            clearTimeout(timer);
            eval(callback)(url, "success");
        }
    };
    img.src = url;
    timer = setTimeout(function() {
        timedOut = true;
        eval(callback)(url, "timeout");
    }, timeout); 
}

function record(url, result) {
    return url
}   