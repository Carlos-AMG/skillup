setTimeout(function() {
    var elem = document.getElementById('alert');
    if(elem)
        return elem.parentNode.removeChild(elem);
}, 3000); 