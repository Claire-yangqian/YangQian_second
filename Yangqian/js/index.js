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

}

//回到顶部
var timer = null;
document.querySelector(".back").onclick = function() {
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn() {
        var oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
            document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
            timer = requestAnimationFrame(fn);
        } else {
            cancelAnimationFrame(timer);
        }
    });
}

//右上用户弹窗
var popover = document.getElementById("Popover17-toggle")
var popoverwrapper = document.getElementById("Popover17-content")
popover.onclick = function() {
    if (popoverwrapper.style.display == "block") {
        popoverwrapper.style.display = "none";
    } else {
        popoverwrapper.style.display = "block";
    }
}

console.log(userId)

axios.defaults.baseURL = 'http://47.97.204.234:3000'

//跳转到我的主页
var index = document.getElementById("index")
var myInfo = document.getElementById("myInfo")
document.getElementById("my").onclick = function() {
    index.style.display = "none";
    myInfo.style.display = "block"
    popoverwrapper.style.display = "none";
}

//回到主页
document.getElementById("back").onclick = function() {
    index.style.display = "block";
    myInfo.style.display = "none"
    popoverwrapper.style.display = "none";
}


//文章
axios.get('/article/getArticles', {
    params: {
        userId: userId,
        start: "0",
        stop: "18"
    }
}).then(res => {
    this.result = res;
    data = this.result.data
    console.log(data.articles)
    localStorage.setItem("articles", JSON.stringify(data.articles));
})
var articles = JSON.parse(localStorage.getItem("articles"))

//copy文章
function copyArticle() {
    var articleCard = document.querySelector(".TopstoryItem")
    var cln = articleCard.cloneNode(true);
    document.querySelector(".Topstory-noMarginCard").appendChild(cln)
}
for (var i = 1; i < articles.length; i++) {
    copyArticle()
}

var n = 0;

// console.log(articles[0].liked)
//文章

for (let i = 0; i < articles.length; i++) {
    var title = document.querySelectorAll(".ContentItem-title a")
    var avatar = document.querySelectorAll(".AuthorInfo-avatar")
    var authorName = document.querySelectorAll(".AuthorInfo-content a")
    var introduction = document.querySelectorAll(".AuthorInfo-badgeText")
    var likeNum = document.querySelectorAll(".Voters")
    var Richcontent = document.querySelectorAll(".CopyrightRichText-richText")
    var richcontent = document.createTextNode(articles[i].content)
    var issueTime = document.querySelectorAll(".ContentItem-time")
    var like = document.querySelectorAll(".like")
    var vote = document.querySelectorAll(".VoteButton--up")
    var comment = document.querySelectorAll(".comment")
    var hidden = document.querySelectorAll(".ContentItem-meta")
    var hidden1 = document.querySelectorAll(".css-h5al4j")
    var content = document.querySelectorAll(".RichContent-inner")
    var close = document.querySelectorAll(".ContentItem-rightButton")
    var open = document.querySelectorAll(".ContentItem-more")
    var dislike = document.querySelectorAll(".VoteButton--down")
    var commentbtn = document.querySelectorAll(".commentBtn")
    var commentscontainer = document.querySelectorAll(".Comments-container")
    var show_height = 53; //定义原始显示高度
    title[i].innerHTML = articles[i].title
    avatar[i].src = articles[i].avatar
    authorName[i].innerHTML = articles[i].nickname
    introduction[i].innerHTML = articles[i].introduction
    likeNum[i].innerText = articles[i].likeNum + " 人赞同了该回答"
    Richcontent[i].appendChild(richcontent)
    issueTime[i].innerText = "编辑于 " + articles[i].issueTime
    like[i].innerHTML = "赞同 " + articles[i].likeNum
    comment[i].innerHTML = articles[i].commentNum + " 条评论"

    var comment2 = document.querySelectorAll(".CommentTopbar-title")
    comment2[i].innerHTML = articles[i].commentNum + "条评论"

    open[i].onclick = function() {
        console.log(i)
        content[i].style.height = 'auto';
        open[i].style.display = 'none';
        close[i].style.display = 'block';
        hidden[i].style.display = "block";
        hidden1[i].style.display = "block";
    }
    close[i].onclick = function() {
        content[i].style.height = show_height + 'px';
        close[i].style.display = "none";
        open[i].style.display = 'block';
        hidden[i].style.display = "none";
        hidden1[i].style.display = "none";
    }

    commentbtn[i].onclick = function() {
        if (commentscontainer[i].style.display == "none") {
            commentscontainer[i].style.display = "block";
        } else {
            commentscontainer[i].style.display = "none";
        }
    }

    if (articles[i].liked) {
        vote[i].style.background = "#0084ff";
        vote[i].style.color = "#fff";
        like[i].innerHTML = "已赞同 " + articles[0].likeNum

    } else {}

    vote[i].onclick = function() {
        if (articles[i].liked == false) {
            vote[i].style.background = "#0084ff";
            vote[i].style.color = "#fff";
            axios.post('/article/likeArticle', {
                    "userId": userId,
                    "articleId": articles[i].articleId,
                    "like": true
                })
                .then(res => {
                    data = res.data
                    console.log(data)
                    articles[i].liked = true;
                    articles[i].likeNum++;
                    like[i].innerHTML = "已赞同 " + articles[i].likeNum
                    likeNum[i].innerText = articles[i].likeNum + " 人赞同了该回答"
                })
        } else {
            vote[i].style.background = "rgba(0, 132, 255, .1)";
            vote[i].style.color = "#0084ff";
            axios.post('/article/likeArticle', {
                    "userId": userId,
                    "articleId": articles[i].articleId,
                    "like": false
                })
                .then(res => {
                    data = res.data
                    console.log(data)
                    articles[i].liked = false;
                    articles[i].likeNum--;
                    like[i].innerHTML = "赞同 " + articles[i].likeNum
                    likeNum[i].innerText = articles[i].likeNum + " 人赞同了该回答"
                })
        }

    }
    if (articles[i].disliked) {
        dislike[i].style.background = "#0084ff";
        dislike[i].style.color = "#fff";
    } else {}

    dislike[i].onclick = function() {
        if (articles[i].disliked == false) {
            dislike[i].style.background = "#0084ff";
            dislike[i].style.color = "#fff";
            axios.post('/article/dislikeArticle', {
                    "userId": userId,
                    "articleId": articles[i].articleId,
                    "dislike": true
                })
                .then(res => {
                    data = res.data
                    console.log(data)
                    articles[i].disliked = true;
                })
        } else {
            dislike[i].style.background = "rgba(0, 132, 255, .1)";
            dislike[i].style.color = "#0084ff";
            axios.post('/article/dislikeArticle', {
                    "userId": userId,
                    "articleId": articles[i].articleId,
                    "dislike": false
                })
                .then(res => {
                    data = res.data
                    console.log(data)
                    articles[i].disliked = false;
                })
        }

    }


    if (articles[i].commentNum > 0) {


        axios.get('/article/getComments', {
            params: {
                userId: userId,
                articleId: articles[i].articleId
            }
        }).then(res => {
            this.result = res;
            data = this.result.data
                // console.log(data)
                // console.log(data.comments)
            comments = data.comments
                //copy评论
            var t = 0;
            if (i == 0) {
                t = 0;
            } else {
                for (a = 0; a < i; a++)
                    t += articles[a].commentNum
            }

            function copyNestCommentrootComment() {
                var NestCommentrootComment = document.querySelectorAll(".NestComment")
                    // console.log(NestCommentrootComment[i])
                var cln = NestCommentrootComment[i].cloneNode(true);
                var CommentListV2 = document.querySelectorAll(".CommentListV2")
                CommentListV2[i].appendChild(cln)
            }
            for (var j = 1; j < comments.length; j++) {
                copyNestCommentrootComment()
            }
            // console.log(comments.length)
            for (let j = 0; j < comments.length; j++) {
                // console.log("i " + i)
                // console.log("t " + t)
                // console.log("j " + j)
                // console.log("commens j " + j + comments[j].nickname)
                var commentAvatar = document.querySelectorAll(".NestComment--rootComment .UserLink-avatar")
                    // console.log(commentAvatar[1])
                    // console.log(comments[j].avatar)
                    // console.log(t + j)
                commentAvatar[t + j].src = comments[j].avatar

                var commentNickname = document.querySelectorAll(".NestComment--rootComment .commentNickname")
                commentNickname[t + j].innerHTML = comments[j].nickname

                var commentContent = document.querySelectorAll(".NestComment--rootComment .CommentRichText p")
                var reg = /<(\/){0,1}h[^<>]*>/;
                var reg2 = /<(\/){0,1}div[^<>]*>/;
                var reg3 = /<(\/){0,1}p[^<>]*>/;
                newContent = comments[j].content.replace(reg, "");
                newContent = newContent.replace(reg2, "");
                newContent = newContent.replace(reg3, "");
                newContent = newContent.replace(reg3, "");
                commentContent[t + j].innerHTML = newContent
                    //comments[j].content

                var commentTime = document.querySelectorAll(".NestComment--rootComment .CommentItemV2-time")
                commentTime[t + j].innerHTML = comments[j].time

                var commentLikeBtn = document.querySelectorAll(".NestComment--rootComment .CommentItemV2-likeBtn")
                var commentLike = document.querySelectorAll(".commentLike")
                commentLike[t + j].innerHTML = comments[j].likeNum

                var commentDislike = document.querySelectorAll(".NestComment--rootComment .commentDislike")
                var commentDislikeBtn = document.querySelectorAll(".NestComment--rootComment .commentDislikeBtn")

                // console.log(comments[j])
                var b = comments[0]
                var c = comments[1]
                var d = comments[2]
                var e = comments[3]
                var f = comments[4]
                var g = comments[5]
                var h = comments[6]
                var l = comments[7]
                var m = comments[8]
                var n = comments[9]
                var o = comments[10]
                var p = comments[11]
                var q = comments[12]
                var r = comments[13]
                var s = comments[14]
                var u = comments[15]
                var v = comments[16]
                var w = comments[17]
                var x = comments[18]
                var y = comments[19]
                var z = comments[20]

                // //删除评论
                // axios.delete('/article/deleteComment', {
                //     data: {
                //         userId: userId,
                //         commentId: comments[0].commentId
                //     }
                // }).then(res => {
                //     this.result = res;
                //     data = this.result.data
                //     console.log(data)
                //         // localStorage.setItem("comment", JSON.stringify(data.comments));
                // })

                //评论赞
                commentLikeBtn[j + t].onclick = function() {
                    switch (j) {
                        case 0:
                            if (b.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": b.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        b.liked = true;
                                        b.likeNum++;
                                        commentLike[j + t].innerHTML = b.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": b.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        b.liked = false;
                                        b.likeNum--;
                                        commentLike[j + t].innerHTML = b.likeNum
                                    })
                            }
                            break
                        case 1:
                            if (c.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": c.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        c.liked = true;
                                        c.likeNum++;
                                        commentLike[j + t].innerHTML = c.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": c.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        c.liked = false;
                                        c.likeNum--;
                                        commentLike[j + t].innerHTML = c.likeNum
                                    })
                            }
                            break
                        case 2:
                            if (d.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": d.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        d.liked = true;
                                        d.likeNum++;
                                        commentLike[j + t].innerHTML = d.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": d.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        d.liked = false;
                                        d.likeNum--;
                                        commentLike[j + t].innerHTML = d.likeNum
                                    })
                            }
                            break
                        case 3:
                            if (e.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": e.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        e.liked = true;
                                        e.likeNum++;
                                        commentLike[j + t].innerHTML = e.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": e.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        e.liked = false;
                                        e.likeNum--;
                                        commentLike[j + t].innerHTML = e.likeNum
                                    })
                            }
                            break
                        case 4:
                            if (f.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": f.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        f.liked = true;
                                        f.likeNum++;
                                        commentLike[j + t].innerHTML = f.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": f.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        f.liked = false;
                                        f.likeNum--;
                                        commentLike[j + t].innerHTML = f.likeNum
                                    })
                            }
                            break
                        case 5:
                            if (g.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": g.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        g.liked = true;
                                        g.likeNum++;
                                        commentLike[j + t].innerHTML = g.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": g.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        g.liked = false;
                                        g.likeNum--;
                                        commentLike[j + t].innerHTML = g.likeNum
                                    })
                            }
                            break
                        case 6:
                            if (h.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": h.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        h.liked = true;
                                        h.likeNum++;
                                        commentLike[j + t].innerHTML = h.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": h.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        h.liked = false;
                                        h.likeNum--;
                                        commentLike[j + t].innerHTML = h.likeNum
                                    })
                            }
                            break
                        case 7:
                            if (l.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": l.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        l.liked = true;
                                        l.likeNum++;
                                        commentLike[j + t].innerHTML = l.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": l.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        l.liked = false;
                                        l.likeNum--;
                                        commentLike[j + t].innerHTML = l.likeNum
                                    })
                            }
                            break
                        case 8:
                            if (m.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": m.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        m.liked = true;
                                        m.likeNum++;
                                        commentLike[j + t].innerHTML = m.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": m.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        m.liked = false;
                                        m.likeNum--;
                                        commentLike[j + t].innerHTML = m.likeNum
                                    })
                            }
                            break
                        case 9:
                            if (n.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": n.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        n.liked = true;
                                        n.likeNum++;
                                        commentLike[j + t].innerHTML = n.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": n.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        n.liked = false;
                                        n.likeNum--;
                                        commentLike[j + t].innerHTML = n.likeNum
                                    })
                            }
                            break
                        case 10:
                            if (o.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": o.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        o.liked = true;
                                        o.likeNum++;
                                        commentLike[j + t].innerHTML = o.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": o.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        o.liked = false;
                                        o.likeNum--;
                                        commentLike[j + t].innerHTML = o.likeNum
                                    })
                            }
                            break
                        case 11:
                            if (p.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": p.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        p.liked = true;
                                        p.likeNum++;
                                        commentLike[j + t].innerHTML = p.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": p.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        p.liked = false;
                                        p.likeNum--;
                                        commentLike[j + t].innerHTML = p.likeNum
                                    })
                            }
                            break
                        case 12:
                            if (q.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": q.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        q.liked = true;
                                        q.likeNum++;
                                        commentLike[j + t].innerHTML = q.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": q.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        q.liked = false;
                                        q.likeNum--;
                                        commentLike[j + t].innerHTML = q.likeNum
                                    })
                            }
                            break
                        case 13:
                            if (r.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": r.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        r.liked = true;
                                        r.likeNum++;
                                        commentLike[j + t].innerHTML = r.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": r.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        r.liked = false;
                                        r.likeNum--;
                                        commentLike[j + t].innerHTML = r.likeNum
                                    })
                            }
                            break
                        case 14:
                            if (s.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": s.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        s.liked = true;
                                        s.likeNum++;
                                        commentLike[j + t].innerHTML = s.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": s.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        s.liked = false;
                                        s.likeNum--;
                                        commentLike[j + t].innerHTML = s.likeNum
                                    })
                            }
                            break
                        case 15:
                            if (u.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": u.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        u.liked = true;
                                        u.likeNum++;
                                        commentLike[j + t].innerHTML = u.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": u.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        u.liked = false;
                                        u.likeNum--;
                                        commentLike[j + t].innerHTML = u.likeNum
                                    })
                            }
                            break
                        case 16:
                            if (v.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": v.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        v.liked = true;
                                        v.likeNum++;
                                        commentLike[j + t].innerHTML = v.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": v.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        v.liked = false;
                                        v.likeNum--;
                                        commentLike[j + t].innerHTML = v.likeNum
                                    })
                            }
                            break
                        case 17:
                            if (w.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": w.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        w.liked = true;
                                        w.likeNum++;
                                        commentLike[j + t].innerHTML = w.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": w.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        w.liked = false;
                                        w.likeNum--;
                                        commentLike[j + t].innerHTML = w.likeNum
                                    })
                            }
                            break
                        case 18:
                            if (x.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": x.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        x.liked = true;
                                        x.likeNum++;
                                        commentLike[j + t].innerHTML = x.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": x.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        x.liked = false;
                                        x.likeNum--;
                                        commentLike[j + t].innerHTML = x.likeNum
                                    })
                            }
                            break
                        case 19:
                            if (y.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": y.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        y.liked = true;
                                        y.likeNum++;
                                        commentLike[j + t].innerHTML = y.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": y.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        y.liked = false;
                                        y.likeNum--;
                                        commentLike[j + t].innerHTML = y.likeNum
                                    })
                            }
                            break
                        case 20:
                            if (z.liked == false) {
                                commentLikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": z.commentId,
                                        "like": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        z.liked = true;
                                        z.likeNum++;
                                        commentLike[j + t].innerHTML = z.likeNum
                                    })
                            } else {
                                commentLikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/likeComment', {
                                        "userId": userId,
                                        "commentId": z.commentId,
                                        "like": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        z.liked = false;
                                        z.likeNum--;
                                        commentLike[j + t].innerHTML = z.likeNum
                                    })
                            }
                            break
                    }


                }


                //评论踩
                commentDislikeBtn[j + t].onclick = function() {
                    switch (j) {
                        case 0:
                            if (b.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": b.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        b.disliked = true;
                                        b.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": b.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        b.disliked = false;
                                        b.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 1:
                            if (c.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": c.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        c.disliked = true;
                                        c.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": c.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        c.disliked = false;
                                        c.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 2:
                            if (d.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": d.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        d.disliked = true;
                                        d.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": d.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        d.disliked = false;
                                        d.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 3:
                            if (e.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": e.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        e.disliked = true;
                                        e.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": e.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        e.disliked = false;
                                        e.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 4:
                            if (f.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": f.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        f.disliked = true;
                                        f.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": f.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        f.disliked = false;
                                        f.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 5:
                            if (g.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": g.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        g.disliked = true;
                                        g.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": g.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        g.disliked = false;
                                        g.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 6:
                            if (h.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": h.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        h.disliked = true;
                                        h.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": h.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        h.disliked = false;
                                        h.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 7:
                            if (l.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": l.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        l.disliked = true;
                                        l.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": l.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        l.disliked = false;
                                        l.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 8:
                            if (m.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": m.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        m.disliked = true;
                                        m.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": m.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        m.disliked = false;
                                        m.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 9:
                            if (n.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": n.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        n.disliked = true;
                                        n.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": n.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        n.disliked = false;
                                        n.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 10:
                            if (o.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": o.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        o.disliked = true;
                                        o.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": o.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        o.disliked = false;
                                        o.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 11:
                            if (p.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": p.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        p.disliked = true;
                                        p.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": p.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        p.disliked = false;
                                        p.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 12:
                            if (q.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": q.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        q.disliked = true;
                                        q.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": q.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        q.disliked = false;
                                        q.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 13:
                            if (r.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": r.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        r.disliked = true;
                                        r.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": r.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        r.disliked = false;
                                        r.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 14:
                            if (s.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": s.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        s.disliked = true;
                                        s.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": s.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        s.disliked = false;
                                        s.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 15:
                            if (u.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": u.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        u.disliked = true;
                                        u.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": u.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        u.disliked = false;
                                        u.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 16:
                            if (v.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": v.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        v.disliked = true;
                                        v.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": v.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        v.disliked = false;
                                        v.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 17:
                            if (w.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": w.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        w.disliked = true;
                                        w.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": w.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        w.disliked = false;
                                        w.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 18:
                            if (x.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": x.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        x.disliked = true;
                                        x.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": x.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        x.disliked = false;
                                        x.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 19:
                            if (y.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": y.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        y.disliked = true;
                                        y.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": y.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        y.disliked = false;
                                        y.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                        case 20:
                            if (z.disliked == false) {
                                commentDislikeBtn[j + t].style.color = "#0084ff";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": z.commentId,
                                        "dislike": true
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        z.disliked = true;
                                        z.dislikeNum++;
                                        commentDislike[j + t].innerHTML = "取消踩"
                                    })
                            } else {
                                commentDislikeBtn[j + t].style.color = "#8590a6";
                                axios.post('/article/dislikeComment', {
                                        "userId": userId,
                                        "commentId": z.commentId,
                                        "dislike": false
                                    })
                                    .then(res => {
                                        data = res.data
                                        console.log(data)
                                        z.disliked = false;
                                        z.dislikeNum--;
                                        commentDislike[j + t].innerHTML = "踩"
                                    })
                            }
                            break
                    }


                }

            }

        })




    } else {
        // console.log("i " + i)
        var Commentscontainer = document.querySelectorAll(".NestComment")
            // console.log(Commentscontainer[i])
            // console.log(i - n)
            // console.log(Commentscontainer[i])
        Commentscontainer[i - n].parentNode.removeChild(Commentscontainer[i - n])
        n++;
    }
}


//发表评论
var commentBtn = document.querySelectorAll(".CommentEditorV2-singleButton")

for (let i = 0; i < articles.length; i++) {
    commentBtn[i].onclick = function() {
        var commentEdit = document.querySelectorAll(".commentEdit")
        localStorage.setItem("commentEdit", JSON.stringify(commentEdit[i].innerText));
        var commentSend = JSON.parse(localStorage.getItem("commentEdit"))
        axios.post('/article/comment', {
                "userId": userId,
                "articleId": articles[i].articleId,
                "content": commentSend
            })
            .then(res => {
                this.result = res;
                data = this.result.data
                console.log(data)
                if (data.result == 'success') {
                    location.reload([true])
                } else {
                    alert(data.message);

                }
            })
    }
}

//好友
axios.get('/user/friendList', {
    params: {
        userId: userId
    }
}).then(res => {
    this.result = res;
    data = this.result.data
    friends = data.friends
    localStorage.setItem("friends", JSON.stringify(friends));
})


var friends = JSON.parse(localStorage.getItem("friends"))
console.log(friends)

document.querySelector(".PushNotifications-count").innerHTML = friends.length

function Friends() {
    var friendsItem = document.querySelector(".friends-item")
    var cln = friendsItem.cloneNode(true);
    document.querySelector(".friends-list").appendChild(cln)
}
for (var i = 1; i < friends.length; i++) {
    Friends()
}
for (let i = 0; i < friends.length; i++) {
    var friendsAvatar = document.querySelectorAll(".friendsAvatar")
    friendsAvatar[i].src = friends[i].avatar

    var friendsName = document.querySelectorAll(".friendsName")
    friendsName[i].innerHTML = friends[i].nickname

    var friendsIntro = document.querySelectorAll(".friends-itemContent")
    friendsIntro[i].innerHTML = friends[i].introduction
}

var PushNotifications = document.querySelector(".PushNotifications-icon")
var popoverwrapper1 = document.querySelector(".Popover-content-enter-done")
PushNotifications.onclick = function() {
    if (popoverwrapper1.style.display == "block") {
        popoverwrapper1.style.display = "none";
    } else {
        popoverwrapper1.style.display = "block";
    }
}

//新消息
var Messagestab = document.querySelector(".Messages-icon")
var Messageswrapper = document.querySelector(".message")
Messagestab.onclick = function() {
    if (Messageswrapper.style.display == "block") {
        Messageswrapper.style.display = "none";
    } else {
        Messageswrapper.style.display = "block";
    }
}

axios.get('/chat/getMessage', {
    params: {
        userId: userId
    }
}).then(res => {
    this.result = res;
    data = this.result.data
    messages = data.newMessages

    if (messages != undefined) {
        document.querySelector(".Messages-count").innerHTML = messages.length

        // function Messages() {
        //     var messagesItem = document.querySelector(".Messages-item")
        //     var cln = messagesItem.cloneNode(true);
        //     document.querySelector(".Messages-list").appendChild(cln)
        // }
        for (var i = 1; i < messages.length; i++) {
            Messages()
        }
        for (let i = 0; i < messages.length; i++) {
            console.log(messages[i])
            axios.get('/user/getInfo', {
                params: {
                    userId: messages[i].senderId
                }
            }).then(res => {
                this.result = res;
                data = this.result.data.info
                console.log(data)
                var messagesAvatar = document.querySelectorAll(".messagesAvatar")
                console.log(data.avatar)
                messagesAvatar[i].src = data.avatar

                var MessagesuserName = document.querySelectorAll(".Messages-userName")
                MessagesuserName[i].innerHTML = data.nickname

                var MessagesItemContent = document.querySelectorAll(".Messages-itemContent")
                MessagesItemContent[i].innerHTML = messages[i].content
            })

        }

    } else {
        document.querySelector(".Messages-count").innerHTML = ' ';
        document.querySelector(".Messages-item").style.display = "none"
        document.querySelector(".tips").style.display = "block"
    }
})


// 发送新消息
// axios.post('/chat/sendMessage', {
//     userId: userId,
//     friendId: "5e96e5c46dc8847e998b8605",
//     content: "😊"
// })




// // 删除评论

// axios.delete('/article/deleteComment', {
//     data: {
//         userId: userId,
//         commentId: comments[2].commentId
//     }
// }).then(res => {
//     this.result = res;
//     data = this.result.data
//     console.log(data)
//         // localStorage.setItem("comment", JSON.stringify(data.comments));
// })



// //回复
// console.log(comments[0].replied)
// axios.get('/article/getReplies', {
//     params: {
//         userId: userId,
//         commentId: comments[0].commentId
//     }
// }).then(res => {
//     this.result = res;
//     data = this.result.data
//         // console.log(data)
//     localStorage.setItem("replies", JSON.stringify(data.replies));
// })
// var replies = JSON.parse(localStorage.getItem("replies"))
// console.log(replies)

// var repliedAvatar = document.querySelectorAll(".repliedAvatar")
// repliedAvatar[0].src = replies[0].avatar

// var repliedNickname = document.querySelectorAll(".repliedName")
// repliedNickname[0].innerHTML = replies[0].nickname

// var repliedContent = document.querySelectorAll(".NestComment--child .RichText")
// repliedContent[0].innerHTML = replies[0].content

// var repliedTime = document.querySelectorAll(".NestComment--child .CommentItemV2-time")
// repliedTime[0].innerHTML = replies[0].time

// var repliedLike = document.querySelectorAll(".repliedLike")
// repliedLike[0].innerHTML = replies[0].likeNum

// var repliedLikeBtn = document.querySelectorAll(".NestComment--child .repliedLikeBtn")
// var repliedLike = document.querySelectorAll(".repliedLike")
// repliedLike[0].innerHTML = replies[0].likeNum

// if (replies[0].liked) {
//     repliedLikeBtn[0].style.color = "#0084ff";
//     repliedLike[0].innerHTML = replies[0].likeNum
// } else {}

// repliedLikeBtn[0].onclick = function() {
//     if (replies[0].liked == false) {
//         repliedLikeBtn[0].style.color = "#0084ff";
//         axios.post('/article/likeReply', {
//                 "userId": userId,
//                 "replyId": replies[0].replyId,
//                 "like": true
//             })
//             .then(res => {
//                 data = res.data
//                 console.log(data)
//                 replies[0].liked = true;
//                 replies[0].likeNum++;
//                 repliedLike[0].innerHTML = replies[0].likeNum
//             })
//     } else {
//         repliedLikeBtn[0].style.color = "#8590a6";
//         axios.post('/article/likeReply', {
//                 "userId": userId,
//                 "replyId": replies[0].replyId,
//                 "like": false
//             })
//             .then(res => {
//                 data = res.data
//                 console.log(data)
//                 replies[0].liked = false;
//                 replies[0].likeNum--;
//                 repliedLike[0].innerHTML = replies[0].likeNum
//             })
//     }

// }

// var repliedDislike = document.querySelectorAll(".NestComment--child  .repliedDislike")
// var repliedDislikeBtn = document.querySelectorAll(".NestComment--child  .repliedDislikeBtn")
// if (replies[0].disliked) {
//     repliedDislikeBtn[0].style.color = "#0084ff";
//     repliedDislike[0].innerHTML = "取消踩"
// } else {}
// repliedDislikeBtn[0].onclick = function() {
//     if (replies[0].disliked == false) {
//         repliedDislikeBtn[0].style.color = "#0084ff";
//         axios.post('/article/dislikeReply', {
//                 "userId": userId,
//                 "replyId": replies[0].replyId,
//                 "dislike": true
//             })
//             .then(res => {
//                 data = res.data
//                 console.log(data)
//                 replies[0].disliked = true;
//                 replies[0].dislikeNum++;
//                 repliedDislike[0].innerHTML = "取消踩"
//             })
//     } else {
//         repliedDislikeBtn[0].style.color = "#8590a6";
//         axios.post('/article/dislikeReply', {
//                 "userId": userId,
//                 "replyId": replies[0].replyId,
//                 "dislike": false
//             })
//             .then(res => {
//                 data = res.data
//                 console.log(data)
//                 replies[0].disliked = false;
//                 replies[0].dislikeNum--;
//                 repliedDislike[0].innerHTML = "踩"
//             })
//     }

// }

// //copy回复
// // console.log(replies.length)
// function copyNestCommentchild() {
//     var NestCommentchild = document.querySelector(".NestComment--child")
//     var cln = NestCommentchild.cloneNode(true);
//     document.querySelector(".NestComment").appendChild(cln)
// }
// if (comments[0].replied) {
//     for (var i = 1; i < replies.length; i++) {}
// }