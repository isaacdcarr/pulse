function hide_show(id) {
    var x = document.getElementById(id);
    if (x.style.display == 'none') {
        x.style.display = 'inline';
    } else {
        x.style.display = 'none';
    }
}
