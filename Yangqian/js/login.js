var register = document.getElementById("register");
var login = document.getElementById('login');
var logout = document.getElementById('logout');
var root = document.getElementById('root');
axios.defaults.baseURL = 'http://47.97.204.234:3000'
axios.defaults.withCredentials = true

//登录
register.onclick = function() {
    var accoutInfos = {
        username: username.value,
        password: password.value
    }
    localStorage.setItem("account", JSON.stringify(accoutInfos));

    if (username.value == null || username.value == "") {
        alert("账号不能为空")
        return;
    }
    if (password.value == null || password.value == "") {
        alert("密码不能为空")
        return;
    }

    axios.post('/user/login', {
            username: username.value,
            password: password.value
        })
        .then(res => {
            this.result = res;
            data = this.result.data
                // console.log(data.result)
            if (data.result == 'success') {
                console.log(data.message);
                login.style.display = "none";
                root.style.display = "block";
                location.reload([true])
            } else {
                alert(data.message);

            }
        })


}

var instanceP = JSON.parse(localStorage.getItem("account"))
console.log(instanceP)
var popoverwrapper = document.getElementById("Popover17-content")

//退出登录
logout.onclick = function() {
    axios.post('/user/logout', {
            username: instanceP.username,
            password: instanceP.password
        })
        .then(res => {
            this.result = res;
            data = this.result.data
                // console.log(data.result)
            if (data.result == 'success') {
                console.log(data.message);
                login.style.display = "block";
                root.style.display = "none";
                popoverwrapper.style.display = "none";
            } else {
                alert(data.message);

            }
        })


}


axios.get('/user/state', {
    params: {}
}).then(res => {
    this.result = res;
    data = this.result.data
    localStorage.setItem("userId", JSON.stringify(data.userId));
    if (data.result == 'success') {
        console.log(data.message);
        login.style.display = "none";
        root.style.display = "block";
    } else {
        login.style.display = "block";
        root.style.display = "none";
    }
})
var userId = JSON.parse(localStorage.getItem("userId"))
    // console.log(userId)
    // console.log(data.result)