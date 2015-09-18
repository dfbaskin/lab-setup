
(function() {

    window.addEventListener("load", onLoaded, false);

    function onLoaded() {

        window.removeEventListener("load", onLoaded, false);

        var request = new XMLHttpRequest();
        request.open('GET', '/my-lab-keys', true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);
                var elem;
                elem = document.getElementById('key1');
                elem.value = data.azure.key1;
                elem = document.getElementById('key2');
                elem.value = data.azure.key2;
            } else {
                alert('Could not read lab keys!');
            }
        };

        request.onerror = function() {
            alert('Error reading lab keys!');
        };

        request.send();
    }

}());
