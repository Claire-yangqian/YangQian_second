window.onload = function() {
    //顶部滑动
    var header = document.getElementsByTagName("header");
    window.onscroll = function() {
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        if (t > 0) {
            header[0].className = "Sticky AppHeader is-hidden is-fixed";
            header[0].style = "width: 1519.2px; top: 0px; left: 0px";
        } else {
            header[0].className = "Sticky AppHeader";
            header[0].style = "";
        }
    };

    var btn = document.getElementById("hello");
    btn.onclick = function() {
        //发生ajax
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://47.97.204.234:3000/user/friendList');
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 400) {
                console.log(xhr.responseText);
            }
        }
        xhr.send();
    }
}