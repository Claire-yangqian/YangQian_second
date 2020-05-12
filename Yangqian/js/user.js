axios.defaults.baseURL = 'http://47.97.204.234:3000'

//获取用户信息
axios.get('/user/getInfo', {
    params: {
        userId: userId
    }
}).then(res => {
    this.result = res;
    data = this.result.data
        // console.log(data)
    localStorage.setItem("userInfo", JSON.stringify(data.info));
})

var avatar = parent.document.getElementsByClassName("myAvatar")
    // console.log(avatar)
var userInfo = JSON.parse(localStorage.getItem("userInfo"))


//昵称
var nickname = document.getElementsByClassName("FullnameField-name")
nickname[0].innerHTML = userInfo.nickname

//信息
var field = document.getElementsByClassName("Field-text")
field[0].innerHTML = userInfo.gender
field[1].innerHTML = userInfo.introduction
field[2].innerHTML = userInfo.trade
field[3].innerHTML = userInfo.resume

// 修改昵称
var fullName = document.querySelector(".FullnameField-editable")
var fullNameInput = document.querySelector(".FullnameField")
var fullNameBtn = document.querySelector(".FullnameField-editable button")
var cancelBtn = document.querySelectorAll(".Button--grey")
var saveBtn = document.querySelectorAll(".ProfileHeader-content .Button--primary")
    // console.log(saveBtn[0])
fullNameBtn.onclick = function() {
    fullName.style.display = "none";
    fullNameInput.style.display = "block"
}
cancelBtn[0].onclick = function() {
        fullName.style.display = "block";
        fullNameInput.style.display = "none"
    }
    // console.log(document.querySelector(".FullnameField input").value)


// var nickName = document.querySelector(".FullnameField input").value
// console.log(nickName)
saveBtn[0].onclick = function() {
    var nickname = document.querySelector(".FullnameField input").value
    axios.post('/user/alterInfo', {
            userId: userId,
            direction: 0,
            content: nickname
        })
        .then(res => {
            this.result = res;
            data = this.result.data
            console.log(data)
            if (data.result == 'success') {
                fullName.style.display = "block";
                fullNameInput.style.display = "none"
                nickname[0].innerHTML = userInfo.nickname
            } else {
                alert(data.message);
            }
        })

}

//修改性别
var genderInfo = document.querySelector(".genderInfo")
var genderEdit = document.querySelector(".genderEdit")
var modifyBtn = document.querySelectorAll(".ProfileEdit-fields .Field-modify")

modifyBtn[0].onclick = function() {
    genderInfo.style.display = "none";
    genderEdit.style.display = "block";
}
cancelBtn[1].onclick = function() {
    genderInfo.style.display = "block";
    genderEdit.style.display = "none";
}


saveBtn[1].onclick = function() {
    var gender = document.querySelectorAll(".genderEdit input");
    for (var i = 0; i < gender.length; i++) {
        if (gender[i].checked) {
            gender = gender[i].value
        }
    }
    // console.log(gender)

    axios.post('/user/alterInfo', {
            userId: userId,
            direction: 1,
            content: gender
        })
        .then(res => {
            this.result = res;
            data = this.result.data
            console.log(data)
            if (data.result == 'success') {
                genderInfo.style.display = "block";
                genderEdit.style.display = "none"
                field[0].innerHTML = userInfo.gender
            } else {
                alert(data.message);
            }
        })

}


//修改一句话介绍
var introInfo = document.querySelector(".introInfo")
var introEdit = document.querySelector(".introEdit")

modifyBtn[1].onclick = function() {
    introInfo.style.display = "none";
    introEdit.style.display = "block";
}
cancelBtn[2].onclick = function() {
    introInfo.style.display = "block";
    introEdit.style.display = "none";
}


saveBtn[2].onclick = function() {
    var intro = document.querySelector(".introEdit input").value;

    // console.log(gender)

    axios.post('/user/alterInfo', {
            userId: userId,
            direction: 2,
            content: intro
        })
        .then(res => {
            this.result = res;
            data = this.result.data
            console.log(data)
            if (data.result == 'success') {
                introInfo.style.display = "block";
                introEdit.style.display = "none"
                field[1].innerHTML = userInfo.introduction
            } else {
                alert(data.message);
            }
        })

}

//修改行业信息
var jobInfo = document.querySelector(".jobInfo")
var jobEdit = document.querySelector(".jobEdit")

modifyBtn[2].onclick = function() {
    jobInfo.style.display = "none";
    jobEdit.style.display = "block";
}
cancelBtn[3].onclick = function() {
    jobInfo.style.display = "block";
    jobEdit.style.display = "none";
}


saveBtn[3].onclick = function() {
    var job = document.querySelector(".jobEdit input").value;

    // console.log(gender)

    axios.post('/user/alterInfo', {
            userId: userId,
            direction: 3,
            content: job
        })
        .then(res => {
            this.result = res;
            data = this.result.data
            console.log(data)
            if (data.result == 'success') {
                jobInfo.style.display = "block";
                jobEdit.style.display = "none"
                field[2].innerHTML = userInfo.trade
            } else {
                alert(data.message);
            }
        })

}

//修改个人简介
var DescriptionInfo = document.querySelector(".DescriptionInfo")
var DescriptionEdit = document.querySelector(".DescriptionEdit")

modifyBtn[3].onclick = function() {
    DescriptionInfo.style.display = "none";
    DescriptionEdit.style.display = "block";
}
cancelBtn[4].onclick = function() {
    DescriptionInfo.style.display = "block";
    DescriptionEdit.style.display = "none";
}


saveBtn[4].onclick = function() {
    var desctiption = document.querySelector(".DescriptionEdit textarea").value;
    console.log(desctiption)
        // console.log(gender)

    axios.post('/user/alterInfo', {
            userId: userId,
            direction: 4,
            content: desctiption
        })
        .then(res => {
            this.result = res;
            data = this.result.data
            console.log(data)
            if (data.result == 'success') {
                DescriptionInfo.style.display = "block";
                DescriptionEdit.style.display = "none"
                field[3].innerHTML = userInfo.resume
            } else {
                alert(data.message);
            }
        })

}
document.querySelector(".TextArea").onclick = function() {
    document.querySelector(".TextArea").style.background = "none"
}

//修改头像

var avatarModify = document.querySelector(".UploadPicture-input")

document.querySelector(".UploadPicture-input").onchange = function() {
    var picture = avatarModify.files[0];
    console.log(picture);
    var data = new FormData(); //创建一个form对象
    data.append('file', picture); //append 向form表单添加数据

    //添加请求头 通过form添加的图片和文件的格式必须是multipart/form-data
    let config = {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    };

    axios.defaults.withCredentials = true
    console.log(data)
    console.log(data.get('file'))
    axios.post("/user/alterAvatar", data, config)
        .then(function(res) {
            console.log(res);
            // sessionStorage.setItem('headImg', this.imageSave); //将图片保存，并能够在其他地方加载显示

        })

    .catch(function(error) {

        console.log(error);

    })
}

//头像
avatar[0].src = userInfo.avatar
avatar[1].src = userInfo.avatar