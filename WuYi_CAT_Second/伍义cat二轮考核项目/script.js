/*主页开始*/

// 登陆注册框
// 获取按钮和表单
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const closeBtn = document.getElementById("close-btn");
const authContainer = document.querySelector("#auth-container");
//用户下拉框
const oLogomonkey = document.getElementById("logomonkey");
const oYonghuxialakuang = document.querySelector(".yonghuxialakuang");

// 切换表单显示
loginBtn.addEventListener("click", () => {
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
    loginBtn.classList.add("active");
    registerBtn.classList.remove("active");
});

registerBtn.addEventListener("click", () => {
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
    registerBtn.classList.add("active");
    loginBtn.classList.remove("active");
});

// 关闭登录注册框
closeBtn.addEventListener("click", () => {
    authContainer.style.display = "none";
});

// 登录逻辑
// 设置一个变量flag,当flag=1时为登录状态，当flag=0时为未登录状态
let flag = 0;
var token;
document.getElementById("login-submit").addEventListener("click", () => {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const data = JSON.stringify({
        username: username,
        password: password
    });

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            const response = JSON.parse(this.responseText);
            if (response.code === 200) {

                var datatoken = this.responseText;
                // 转化为js对象
                datatoken = JSON.parse(datatoken);
                token = datatoken.data;
                console.log(token);

                alert("登录成功！");
                flag = 1;
                // console.log(flag);
                authContainer.style.display = "none";

                // 此时为登录状态，改变头像样式
                var img = document.createElement('img');
                img.src = "./images/logomonkey.jpg!1";
                oLogomonkey.innerHTML = "";
                oLogomonkey.appendChild(img);

                oLogomonkey.addEventListener("mouseenter", () => {
                    oYonghuxialakuang.style.display = "block";
                })
                oLogomonkey.addEventListener("mouseleave", () => {
                    oYonghuxialakuang.style.display = "none";
                })
                oYonghuxialakuang.addEventListener("mouseenter", () => {
                    oYonghuxialakuang.style.display = "block";
                })
                oYonghuxialakuang.addEventListener("mouseleave", () => {
                    oYonghuxialakuang.style.display = "none";
                })

                // 登陆后渲染自己的文章
                var myBlogslist = document.getElementById("my-blogslist");
                var xhrmyblogs = new XMLHttpRequest();
                xhrmyblogs.open('GET', 'http://119.29.229.71:8585/cat/article/me?pageSize=10&page=1');
                xhrmyblogs.setRequestHeader("token", token);
                xhrmyblogs.send();
                xhrmyblogs.onreadystatechange = function () {
                    //判断(服务端返回了所有的结果)
                    if (xhrmyblogs.readyState === 4) {
                        //判断响应状态码 200 404 403 401 500
                        //2xx都表示成功
                        if (xhrmyblogs.status >= 200 && xhrmyblogs.status < 300) {
                            console.log(xhrmyblogs.responseText);
                            var datamyblogs = xhrmyblogs.responseText;
                            // 转化为js对象
                            datamyblogs = JSON.parse(datamyblogs);
                            // var datamyblogsdata = datamyblogs.data
                            var recordsmyblogs = datamyblogs.data.records;
                            var htmlmyblogs = '';
                            for (let i = 0; i < recordsmyblogs.length; i++) {
                                var resultmyblogs = recordsmyblogs[i];
                                htmlmyblogs += "<div class='my-blogslistitem'>";
                                htmlmyblogs += "<span class='my-blogslistitemimg'></span> <div class='my-blogslistitemtitle'>" + resultmyblogs.title + "</div> <div class='my-blogslistitemsummary'>" + resultmyblogs.summary + "</div> <span class='yueduzanshoucang'>阅读" + resultmyblogs.viewed + "</span> <span class='yueduzanshoucang'>赞" + resultmyblogs.liked + "</span> <span class='yueduzanshoucang'>收藏" + resultmyblogs.collected + "</span>";
                                htmlmyblogs += "</div>";
                            }
                            myBlogslist.innerHTML = htmlmyblogs;
                        }
                    }
                }

            } else {
                alert("登录失败：" + response.msg);
            }
        }
    });

    xhr.open("POST", "http://119.29.229.71:8585/cat/user/login");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
});

// 注册逻辑
document.getElementById("register-submit").addEventListener("click", () => {
    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("register-confirm-password").value;

    if (password !== confirmPassword) {
        alert("两次输入的密码不一致！");
        return;
    }

    const data = JSON.stringify({
        username: username,
        password: password,
        email: email
    });

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            const response = JSON.parse(this.responseText);
            if (response.code === 200) {
                alert("注册成功！");
                // 切换到登录表单
                loginBtn.click();
            } else {
                alert("注册失败：" + response.msg);
            }
        }
    });

    xhr.open("POST", "http://119.29.229.71:8585/cat/user/register");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
});

// 检查是否勾选协议
document.querySelectorAll("button[type='button']").forEach(button => {
    button.addEventListener("click", (event) => {
        const agreementCheckbox = document.getElementById("agreement-checkbox");
        if (!agreementCheckbox.checked) {
            alert("请先同意《服务条款》和《隐私协议》！");
            event.preventDefault();
        }
    });
});

// 登陆注册框

// 退出登录
const oTuichudenglu1 = document.getElementById("tuichudenglu1");
const oTuichudenglu2 = document.getElementById("tuichudenglu2");
const oTuichudenglu3 = document.getElementById("tuichudenglu3");

oTuichudenglu1.addEventListener("click", () => {
    var xhrtuichudenglu = new XMLHttpRequest();
    xhrtuichudenglu.withCredentials = true;

    xhrtuichudenglu.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            flag = 0;
            oLogomonkey.innerHTML = "";
            oLogomonkey.innerHTML = "登录";

            oYonghuxialakuang.style.display = "none";
            oLogomonkey.addEventListener("mouseenter", () => {
                oYonghuxialakuang.style.display = "none";
            })
            oLogomonkey.addEventListener("mouseleave", () => {
                oYonghuxialakuang.style.display = "none";
            })
            oYonghuxialakuang.addEventListener("mouseenter", () => {
                oYonghuxialakuang.style.display = "none";
            })
            oYonghuxialakuang.addEventListener("mouseleave", () => {
                oYonghuxialakuang.style.display = "none";
            })
        }
    });

    xhrtuichudenglu.open("POST", "http://119.29.229.71:8585/cat/user/logout");
    xhrtuichudenglu.setRequestHeader("token", token);

    xhrtuichudenglu.send();
})
oTuichudenglu2.addEventListener("click", () => {
    var xhrtuichudenglu = new XMLHttpRequest();
    xhrtuichudenglu.withCredentials = true;

    xhrtuichudenglu.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            flag = 0;
            oLogomonkey.innerHTML = "";
            oLogomonkey.innerHTML = "登录";
            oMainweb.style.display = "block";
            oWriteweb.style.display = "none";
            oYonghuxialakuang.style.display = "none";
            oLogomonkey.addEventListener("mouseenter", () => {
                oYonghuxialakuang.style.display = "none";
            })
            oLogomonkey.addEventListener("mouseleave", () => {
                oYonghuxialakuang.style.display = "none";
            })
            oYonghuxialakuang.addEventListener("mouseenter", () => {
                oYonghuxialakuang.style.display = "none";
            })
            oYonghuxialakuang.addEventListener("mouseleave", () => {
                oYonghuxialakuang.style.display = "none";
            })
        }
    });

    xhrtuichudenglu.open("POST", "http://119.29.229.71:8585/cat/user/logout");
    xhrtuichudenglu.setRequestHeader("token", token);

    xhrtuichudenglu.send();
})
oTuichudenglu3.addEventListener("click", () => {
    var xhrtuichudenglu = new XMLHttpRequest();
    xhrtuichudenglu.withCredentials = true;

    xhrtuichudenglu.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            flag = 0;
            oLogomonkey.innerHTML = "";
            oLogomonkey.innerHTML = "登录";
            oMainweb.style.display = "block";
            oUserweb.style.display = "none";
            oYonghuxialakuang.style.display = "none";
            oLogomonkey.addEventListener("mouseenter", () => {
                oYonghuxialakuang.style.display = "none";
            })
            oLogomonkey.addEventListener("mouseleave", () => {
                oYonghuxialakuang.style.display = "none";
            })
            oYonghuxialakuang.addEventListener("mouseenter", () => {
                oYonghuxialakuang.style.display = "none";
            })
            oYonghuxialakuang.addEventListener("mouseleave", () => {
                oYonghuxialakuang.style.display = "none";
            })
        }
    });

    xhrtuichudenglu.open("POST", "http://119.29.229.71:8585/cat/user/logout");
    xhrtuichudenglu.setRequestHeader("token", token);

    xhrtuichudenglu.send();
})
// 退出登录

// 文章分类目录开始
// 获取所有菜单项
const menuItems = document.querySelectorAll('.topmenu span');
const oTopmenuitem1 = document.getElementById("topmenuitem1");
const oTopmenuitem2 = document.getElementById("topmenuitem2");
const oTopmenuitem3 = document.getElementById("topmenuitem3");
const oTopmenuitem4 = document.getElementById("topmenuitem4");
const oTopmenuitem5 = document.getElementById("topmenuitem5");
const oTopmenuitem6 = document.getElementById("topmenuitem6");
const oTopmenuitem7 = document.getElementById("topmenuitem7");

// 获取初始文章列表
var startSelectedBlogslist = document.getElementById("selected-blogslist");
var xhrstartSelectedblogs = new XMLHttpRequest();
xhrstartSelectedblogs.open('GET', 'http://119.29.229.71:8585/cat/article/all?pageSize=10&page=1');
xhrstartSelectedblogs.send();
xhrstartSelectedblogs.onreadystatechange = function () {
    //判断(服务端返回了所有的结果)
    if (xhrstartSelectedblogs.readyState === 4) {
        //判断响应状态码 200 404 403 401 500
        //2xx都表示成功
        if (xhrstartSelectedblogs.status >= 200 && xhrstartSelectedblogs.status < 300) {
            var datastartSelectedblogs = xhrstartSelectedblogs.responseText;
            // 转化为js对象
            datastartSelectedblogs = JSON.parse(datastartSelectedblogs);
            var recordsstartSelectedblogs = datastartSelectedblogs.data.records;
            var htmlstartSelectedblogs = '';
            for (let i = 0; i < recordsstartSelectedblogs.length; i++) {
                var resultstartSelectedblogs = recordsstartSelectedblogs[i];
                htmlstartSelectedblogs += "<div class='selected-blogslistitem'>";
                htmlstartSelectedblogs += "<span class='selected-blogslistitemimg'></span> <span>C.A.T</span> <div class='selected-blogslistitemtitle'>" + resultstartSelectedblogs.title + "</div> <div class='selected-blogslistitemcontent'>" + resultstartSelectedblogs.content + "</div><div class='selected-blogslistitemsummary'>" + resultstartSelectedblogs.summary + "</div> <span class='selected-blogslistitemcreatetime'>" + resultstartSelectedblogs.createTime + "</span> <span class='yueduzanshoucang'>阅读" + resultstartSelectedblogs.viewed + "</span> <span class='yueduzanshoucang'>赞" + resultstartSelectedblogs.liked + "</span> <span class='yueduzanshoucang'>收藏" + resultstartSelectedblogs.collected + "</span>";
                htmlstartSelectedblogs += "</div>";
            }
            startSelectedBlogslist.innerHTML = htmlstartSelectedblogs;


            // 点击跳转至文章详情页面
            const blogto = document.querySelector(".selected-blogslistitem");
            blogto.addEventListener("click", () => {
                oMainweb.style.display = "none";
                oBlogweb.style.display = "block";
            })
        }
    }
}

// 遍历每个菜单项，添加点击事件监听器
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        if (flag === 1) {
            // 清除所有菜单项的选中样式
            menuItems.forEach(menu => {
                menu.style.color = 'black'; // 字体颜色变黑
                menu.style.backgroundColor = '#f2f2f2'; // 背景颜色变白
            });
            // 设置当前点击的菜单项样式
            item.style.color = 'white'; // 字体颜色变白
            item.style.backgroundColor = 'black'; // 背景颜色变黑
        } else {
            alert("登录后可查看其他类型文章");
            authContainer.style.display = "block";
        }
        const computedColor1 = window.getComputedStyle(oTopmenuitem1).color;
        const computedColor2 = window.getComputedStyle(oTopmenuitem2).color;
        const computedColor3 = window.getComputedStyle(oTopmenuitem3).color;
        const computedColor4 = window.getComputedStyle(oTopmenuitem4).color;
        const computedColor5 = window.getComputedStyle(oTopmenuitem5).color;
        const computedColor6 = window.getComputedStyle(oTopmenuitem6).color;
        const computedColor7 = window.getComputedStyle(oTopmenuitem7).color;

        //精选博客以及文章分类获取数据
        // 全部
        if (computedColor1 === "rgb(255, 255, 255)") {
            var SelectedBlogslist = document.getElementById("selected-blogslist");
            var xhrSelectedblogs = new XMLHttpRequest();
            xhrSelectedblogs.open('GET', 'http://119.29.229.71:8585/cat/article/all?pageSize=10&page=1');
            xhrSelectedblogs.send();
            xhrSelectedblogs.onreadystatechange = function () {
                //判断(服务端返回了所有的结果)
                if (xhrSelectedblogs.readyState === 4) {
                    //判断响应状态码 200 404 403 401 500
                    //2xx都表示成功
                    if (xhrSelectedblogs.status >= 200 && xhrSelectedblogs.status < 300) {
                        var dataSelectedblogs = xhrSelectedblogs.responseText;
                        // 转化为js对象
                        dataSelectedblogs = JSON.parse(dataSelectedblogs);
                        var recordsSelectedblogs = dataSelectedblogs.data.records;
                        var htmlSelectedblogs = '';
                        for (let i = 0; i < recordsSelectedblogs.length; i++) {
                            var resultSelectedblogs = recordsSelectedblogs[i];
                            htmlSelectedblogs += "<div class='selected-blogslistitem'>";
                            htmlSelectedblogs += "<span class='selected-blogslistitemimg'></span> <span>C.A.T</span> <div class='selected-blogslistitemtitle'>" + resultSelectedblogs.title + "</div> <div class='selected-blogslistitemcontent'>" + resultSelectedblogs.content + "</div><div class='selected-blogslistitemsummary'>" + resultSelectedblogs.summary + "</div> <span class='selected-blogslistitemcreatetime'>" + resultSelectedblogs.createTime + "</span> <span class='yueduzanshoucang'>阅读" + resultSelectedblogs.viewed + "</span> <span class='yueduzanshoucang'>赞" + resultSelectedblogs.liked + "</span> <span class='yueduzanshoucang'>收藏" + resultSelectedblogs.collected + "</span>";
                            htmlSelectedblogs += "</div>";
                        }
                        SelectedBlogslist.innerHTML = htmlSelectedblogs;

                        // 点击跳转至文章详情页面
                        const blogto = document.querySelector(".selected-blogslistitem");
                        blogto.addEventListener("click", () => {
                            oMainweb.style.display = "none";
                            oBlogweb.style.display = "block";
                        })
                    }
                }
            }
        }

        //前端
        if (computedColor2 === "rgb(255, 255, 255)") {
            // console.log("token");
            var SelectedBlogslist = document.getElementById("selected-blogslist");
            var xhrSelectedblogs = new XMLHttpRequest();
            xhrSelectedblogs.open('GET', 'http://119.29.229.71:8585/cat/article/type?pageSize=10&page=1&type=前端');
            xhrSelectedblogs.setRequestHeader("token", token);
            xhrSelectedblogs.send();
            xhrSelectedblogs.onreadystatechange = function () {
                //判断(服务端返回了所有的结果)
                if (xhrSelectedblogs.readyState === 4) {
                    //判断响应状态码 200 404 403 401 500
                    //2xx都表示成功
                    if (xhrSelectedblogs.status >= 200 && xhrSelectedblogs.status < 300) {
                        // console.log(xhrSelectedblogs.responseText);
                        var dataSelectedblogs = xhrSelectedblogs.responseText;
                        // 转化为js对象
                        dataSelectedblogs = JSON.parse(dataSelectedblogs);
                        var recordsSelectedblogs = dataSelectedblogs.data.records;
                        var htmlSelectedblogs = '';
                        for (let i = 0; i < recordsSelectedblogs.length; i++) {
                            var resultSelectedblogs = recordsSelectedblogs[i];
                            htmlSelectedblogs += "<div class='selected-blogslistitem'>";
                            htmlSelectedblogs += "<span class='selected-blogslistitemimg'></span> <span>C.A.T</span> <div class='selected-blogslistitemtitle'>" + resultSelectedblogs.title + "</div> <div class='selected-blogslistitemcontent'>" + resultSelectedblogs.content + "</div><div class='selected-blogslistitemsummary'>" + resultSelectedblogs.summary + "</div> <span class='selected-blogslistitemcreatetime'>" + resultSelectedblogs.createTime + "</span> <span class='yueduzanshoucang'>阅读" + resultSelectedblogs.viewed + "</span> <span class='yueduzanshoucang'>赞" + resultSelectedblogs.liked + "</span> <span class='yueduzanshoucang'>收藏" + resultSelectedblogs.collected + "</span>";
                            htmlSelectedblogs += "</div>";
                        }
                        SelectedBlogslist.innerHTML = "";
                        SelectedBlogslist.innerHTML = htmlSelectedblogs;
                    }
                }
            }
        }


        // 后端
        if (computedColor3 === "rgb(255, 255, 255)") {
            // console.log("token");
            var SelectedBlogslist = document.getElementById("selected-blogslist");
            var xhrSelectedblogs = new XMLHttpRequest();
            xhrSelectedblogs.open('GET', 'http://119.29.229.71:8585/cat/article/type?pageSize=10&page=1&type=后端');
            xhrSelectedblogs.setRequestHeader("token", token);
            xhrSelectedblogs.send();
            xhrSelectedblogs.onreadystatechange = function () {
                //判断(服务端返回了所有的结果)
                if (xhrSelectedblogs.readyState === 4) {
                    //判断响应状态码 200 404 403 401 500
                    //2xx都表示成功
                    if (xhrSelectedblogs.status >= 200 && xhrSelectedblogs.status < 300) {
                        // console.log(xhrSelectedblogs.responseText);
                        var dataSelectedblogs = xhrSelectedblogs.responseText;
                        // 转化为js对象
                        dataSelectedblogs = JSON.parse(dataSelectedblogs);
                        var recordsSelectedblogs = dataSelectedblogs.data.records;
                        var htmlSelectedblogs = '';
                        for (let i = 0; i < recordsSelectedblogs.length; i++) {
                            var resultSelectedblogs = recordsSelectedblogs[i];
                            htmlSelectedblogs += "<div class='selected-blogslistitem'>";
                            htmlSelectedblogs += "<span class='selected-blogslistitemimg'></span> <span>C.A.T</span> <div class='selected-blogslistitemtitle'>" + resultSelectedblogs.title + "</div> <div class='selected-blogslistitemcontent'>" + resultSelectedblogs.content + "</div><div class='selected-blogslistitemsummary'>" + resultSelectedblogs.summary + "</div> <span class='selected-blogslistitemcreatetime'>" + resultSelectedblogs.createTime + "</span> <span class='yueduzanshoucang'>阅读" + resultSelectedblogs.viewed + "</span> <span class='yueduzanshoucang'>赞" + resultSelectedblogs.liked + "</span> <span class='yueduzanshoucang'>收藏" + resultSelectedblogs.collected + "</span>";
                            htmlSelectedblogs += "</div>";
                        }
                        SelectedBlogslist.innerHTML = htmlSelectedblogs;
                    }
                }
            }
        }

        // 移动开发
        if (computedColor4 === "rgb(255, 255, 255)") {
            // console.log("token");
            var SelectedBlogslist = document.getElementById("selected-blogslist");
            var xhrSelectedblogs = new XMLHttpRequest();
            xhrSelectedblogs.open('GET', 'http://119.29.229.71:8585/cat/article/type?pageSize=10&page=1&type=移动开发');
            xhrSelectedblogs.setRequestHeader("token", token);
            xhrSelectedblogs.send();
            xhrSelectedblogs.onreadystatechange = function () {
                //判断(服务端返回了所有的结果)
                if (xhrSelectedblogs.readyState === 4) {
                    //判断响应状态码 200 404 403 401 500
                    //2xx都表示成功
                    if (xhrSelectedblogs.status >= 200 && xhrSelectedblogs.status < 300) {
                        // console.log(xhrSelectedblogs.responseText);
                        var dataSelectedblogs = xhrSelectedblogs.responseText;
                        // 转化为js对象
                        dataSelectedblogs = JSON.parse(dataSelectedblogs);
                        var recordsSelectedblogs = dataSelectedblogs.data.records;
                        var htmlSelectedblogs = '';
                        for (let i = 0; i < recordsSelectedblogs.length; i++) {
                            var resultSelectedblogs = recordsSelectedblogs[i];
                            htmlSelectedblogs += "<div class='selected-blogslistitem'>";
                            htmlSelectedblogs += "<span class='selected-blogslistitemimg'></span> <span>C.A.T</span> <div class='selected-blogslistitemtitle'>" + resultSelectedblogs.title + "</div> <div class='selected-blogslistitemcontent'>" + resultSelectedblogs.content + "</div><div class='selected-blogslistitemsummary'>" + resultSelectedblogs.summary + "</div> <span class='selected-blogslistitemcreatetime'>" + resultSelectedblogs.createTime + "</span> <span class='yueduzanshoucang'>阅读" + resultSelectedblogs.viewed + "</span> <span class='yueduzanshoucang'>赞" + resultSelectedblogs.liked + "</span> <span class='yueduzanshoucang'>收藏" + resultSelectedblogs.collected + "</span>";
                            htmlSelectedblogs += "</div>";
                        }
                        SelectedBlogslist.innerHTML = htmlSelectedblogs;
                    }
                }
            }
        }

        // 编程语言
        if (computedColor5 === "rgb(255, 255, 255)") {
            // console.log("token");
            var SelectedBlogslist = document.getElementById("selected-blogslist");
            var xhrSelectedblogs = new XMLHttpRequest();
            xhrSelectedblogs.open('GET', 'http://119.29.229.71:8585/cat/article/type?pageSize=10&page=1&type=编程语言');
            xhrSelectedblogs.setRequestHeader("token", token);
            xhrSelectedblogs.send();
            xhrSelectedblogs.onreadystatechange = function () {
                //判断(服务端返回了所有的结果)
                if (xhrSelectedblogs.readyState === 4) {
                    //判断响应状态码 200 404 403 401 500
                    //2xx都表示成功
                    if (xhrSelectedblogs.status >= 200 && xhrSelectedblogs.status < 300) {
                        // console.log(xhrSelectedblogs.responseText);
                        var dataSelectedblogs = xhrSelectedblogs.responseText;
                        // 转化为js对象
                        dataSelectedblogs = JSON.parse(dataSelectedblogs);
                        var recordsSelectedblogs = dataSelectedblogs.data.records;
                        var htmlSelectedblogs = '';
                        for (let i = 0; i < recordsSelectedblogs.length; i++) {
                            var resultSelectedblogs = recordsSelectedblogs[i];
                            htmlSelectedblogs += "<div class='selected-blogslistitem'>";
                            htmlSelectedblogs += "<span class='selected-blogslistitemimg'></span> <span>C.A.T</span> <div class='selected-blogslistitemtitle'>" + resultSelectedblogs.title + "</div> <div class='selected-blogslistitemcontent'>" + resultSelectedblogs.content + "</div><div class='selected-blogslistitemsummary'>" + resultSelectedblogs.summary + "</div> <span class='selected-blogslistitemcreatetime'>" + resultSelectedblogs.createTime + "</span> <span class='yueduzanshoucang'>阅读" + resultSelectedblogs.viewed + "</span> <span class='yueduzanshoucang'>赞" + resultSelectedblogs.liked + "</span> <span class='yueduzanshoucang'>收藏" + resultSelectedblogs.collected + "</span>";
                            htmlSelectedblogs += "</div>";
                        }
                        SelectedBlogslist.innerHTML = htmlSelectedblogs;
                    }
                }
            }
        }

        // Java
        if (computedColor6 === "rgb(255, 255, 255)") {
            // console.log("token");
            var SelectedBlogslist = document.getElementById("selected-blogslist");
            var xhrSelectedblogs = new XMLHttpRequest();
            xhrSelectedblogs.open('GET', 'http://119.29.229.71:8585/cat/article/type?pageSize=10&page=1&type=Java');
            xhrSelectedblogs.setRequestHeader("token", token);
            xhrSelectedblogs.send();
            xhrSelectedblogs.onreadystatechange = function () {
                //判断(服务端返回了所有的结果)
                if (xhrSelectedblogs.readyState === 4) {
                    //判断响应状态码 200 404 403 401 500
                    //2xx都表示成功
                    if (xhrSelectedblogs.status >= 200 && xhrSelectedblogs.status < 300) {
                        // console.log(xhrSelectedblogs.responseText);
                        var dataSelectedblogs = xhrSelectedblogs.responseText;
                        // 转化为js对象
                        dataSelectedblogs = JSON.parse(dataSelectedblogs);
                        var recordsSelectedblogs = dataSelectedblogs.data.records;
                        var htmlSelectedblogs = '';
                        for (let i = 0; i < recordsSelectedblogs.length; i++) {
                            var resultSelectedblogs = recordsSelectedblogs[i];
                            htmlSelectedblogs += "<div class='selected-blogslistitem'>";
                            htmlSelectedblogs += "<span class='selected-blogslistitemimg'></span> <span>C.A.T</span> <div class='selected-blogslistitemtitle'>" + resultSelectedblogs.title + "</div> <div class='selected-blogslistitemcontent'>" + resultSelectedblogs.content + "</div><div class='selected-blogslistitemsummary'>" + resultSelectedblogs.summary + "</div> <span class='selected-blogslistitemcreatetime'>" + resultSelectedblogs.createTime + "</span> <span class='yueduzanshoucang'>阅读" + resultSelectedblogs.viewed + "</span> <span class='yueduzanshoucang'>赞" + resultSelectedblogs.liked + "</span> <span class='yueduzanshoucang'>收藏" + resultSelectedblogs.collected + "</span>";
                            htmlSelectedblogs += "</div>";
                        }
                        SelectedBlogslist.innerHTML = htmlSelectedblogs;
                    }
                }
            }
        }

        // Python
        if (computedColor7 === "rgb(255, 255, 255)") {
            // console.log("token");
            var SelectedBlogslist = document.getElementById("selected-blogslist");
            var xhrSelectedblogs = new XMLHttpRequest();
            xhrSelectedblogs.open('GET', 'http://119.29.229.71:8585/cat/article/type?pageSize=10&page=1&type=Python');
            xhrSelectedblogs.setRequestHeader("token", token);
            xhrSelectedblogs.send();
            xhrSelectedblogs.onreadystatechange = function () {
                //判断(服务端返回了所有的结果)
                if (xhrSelectedblogs.readyState === 4) {
                    //判断响应状态码 200 404 403 401 500
                    //2xx都表示成功
                    if (xhrSelectedblogs.status >= 200 && xhrSelectedblogs.status < 300) {
                        // console.log(xhrSelectedblogs.responseText);
                        var dataSelectedblogs = xhrSelectedblogs.responseText;
                        // 转化为js对象
                        dataSelectedblogs = JSON.parse(dataSelectedblogs);
                        var recordsSelectedblogs = dataSelectedblogs.data.records;
                        var htmlSelectedblogs = '';
                        for (let i = 0; i < recordsSelectedblogs.length; i++) {
                            var resultSelectedblogs = recordsSelectedblogs[i];
                            htmlSelectedblogs += "<div class='selected-blogslistitem'>";
                            htmlSelectedblogs += "<span class='selected-blogslistitemimg'></span> <span>C.A.T</span> <div class='selected-blogslistitemtitle'>" + resultSelectedblogs.title + "</div> <div class='selected-blogslistitemcontent'>" + resultSelectedblogs.content + "</div><div class='selected-blogslistitemsummary'>" + resultSelectedblogs.summary + "</div> <span class='selected-blogslistitemcreatetime'>" + resultSelectedblogs.createTime + "</span> <span class='yueduzanshoucang'>阅读" + resultSelectedblogs.viewed + "</span> <span class='yueduzanshoucang'>赞" + resultSelectedblogs.liked + "</span> <span class='yueduzanshoucang'>收藏" + resultSelectedblogs.collected + "</span>";
                            htmlSelectedblogs += "</div>";
                        }
                        SelectedBlogslist.innerHTML = htmlSelectedblogs;
                    }
                }
            }
        }

    });
});

// 文章分类目录结束

//伸缩效果开始
const oMenubutton = document.querySelector(".menulogo");
const oLeftmenuItems = document.querySelectorAll(".leftmenu li");
const oLeftmenu = document.querySelector(".leftmenu-container");
const oTopmenu = document.querySelector(".topmenu");
const oNewscontainer1 = document.querySelector(".news-container");
const oNewscontainer2 = document.querySelector(".news-container2");
const oBlogs = document.querySelector(".selected-blogs");

oMenubutton.addEventListener("click", () => {
    if (oLeftmenu.style.width === "80px") {
        oLeftmenu.style.width = "250px";
        oTopmenu.style.margin = "60px 0 0 230px";
        oNewscontainer1.style.transform = "translateX(265px) translateY(120px)";
        oNewscontainer1.style.width = "56%";
        oNewscontainer2.style.transform = "translateX(265px) translateY(140px)";
        oNewscontainer2.style.width = "56%";
        oBlogs.style.transform = "translateX(265px) translateY(170px)";
        oBlogs.style.width = "56%";
        // 遍历所有菜单项设置样式
        oLeftmenuItems.forEach(item => {
            item.style.fontSize = "16px";
            item.style.display = "flex";
            item.style.marginLeft = "28px";
            item.style.width = "220px";
        });
    } else {
        oLeftmenu.style.width = "80px";
        oTopmenu.style.margin = "60px 0 0 70px";
        oNewscontainer1.style.transform = "translateX(103px) translateY(120px)";
        oNewscontainer1.style.width = "66%";
        oNewscontainer2.style.transform = "translateX(103px) translateY(140px)";
        oNewscontainer2.style.width = "66%";
        oBlogs.style.transform = "translateX(103px) translateY(170px)";
        oBlogs.style.width = "66%";
        // 遍历所有菜单项设置样式
        oLeftmenuItems.forEach(item => {
            item.style.fontSize = "12px";
            item.style.display = "block";
            item.style.marginLeft = "10px";
            item.style.width = "60px";
        });
    }

});

//伸缩效果结束
/*主页结束*/

/* 写文章页面开始 */
const oYonghuxialakuangTouxiang = document.querySelector(".yonghuxialakuang-touxiang div");
const oWriteyonghuxialakuangTouxiang = document.querySelector(".writeyonghuxialakuang-touxiang div");
const oWodezhuye1 = document.getElementById("wodezhuye1");
const oWodezhuye2 = document.getElementById("wodezhuye2");
const oUserweb = document.querySelector(".userweb");
const oCSDN2 = document.querySelector(".userlogo");
const oRightchuangzuo = document.getElementById("rightchuangzuo");
const oWriteweb = document.getElementsByClassName("writeweb")[0];
const oMainweb = document.getElementsByClassName("mainweb")[0];
const oBlogweb = document.getElementsByClassName("blogweb")[0];
const oWriteLogomonkey = document.getElementById("writelogomonkey")
const oWriteYonghuxialakuang = document.querySelector(".writeyonghuxialakuang")
const oCSDN1 = document.querySelector(".writeheaderleft img");

oRightchuangzuo.addEventListener("click", () => {
    if (flag === 1) {
        oWriteweb.style.display = "block";
        oMainweb.style.display = "none";
    } else {
        alert("请先登录解锁该功能");
        authContainer.style.display = "block";
    }

})
oCSDN1.addEventListener("click", () => {
    oMainweb.style.display = "block";
    oWriteweb.style.display = "none";
})
oWriteLogomonkey.addEventListener("click", () => {
    oWriteweb.style.display = "none";
    oUserweb.style.display = "block";
})
oWodezhuye2.addEventListener("click", () => {
    oWriteweb.style.display = "none";
    oUserweb.style.display = "block";
})
oWriteyonghuxialakuangTouxiang.addEventListener("click", () => {
    oWriteweb.style.display = "none";
    oUserweb.style.display = "block";
})
//用户下拉框

oWriteLogomonkey.addEventListener("mouseenter", () => {
    oWriteYonghuxialakuang.style.display = "block";
})
oWriteLogomonkey.addEventListener("mouseleave", () => {
    oWriteYonghuxialakuang.style.display = "none";
})
oWriteYonghuxialakuang.addEventListener("mouseenter", () => {
    oWriteYonghuxialakuang.style.display = "block";
})
oWriteYonghuxialakuang.addEventListener("mouseleave", () => {
    oWriteYonghuxialakuang.style.display = "none";
})

// 发布文章
// 获取页面元素
const writeFabuboke = document.getElementById("fabuboke"); // 发布按钮
const writeTitle = document.getElementById("writetitle"); // 文章标题
const writeContent = document.getElementById("writecontent"); // 文章正文
const writeZhaiyao = document.getElementById("writezhaiyao"); // 文章摘要

// 为发布按钮添加点击事件
writeFabuboke.addEventListener("click", () => {
    // 获取文章标题
    const writetitle = writeTitle.value.trim();
    if (!writetitle) {
        alert("请输入文章标题！");
        return;
    }

    // 获取文章正文
    const writecontent = writeContent.value.trim();
    if (!writecontent) {
        alert("请输入文章正文！");
        return;
    }

    // 获取文章摘要
    const summary = writeZhaiyao.value.trim();
    if (!summary) {
        alert("请输入文章摘要！");
        return;
    }

    // 构造请求数据
    const data = JSON.stringify({
        // title: writetitle,
        // content: writecontent,
        // summary: summary
        "title": writetitle,
        "type": "测试",
        "img": [
            "无"
        ],
        "content": writecontent,
        "summary": summary
    });

    // 创建 XMLHttpRequest 对象
    const writexhr = new XMLHttpRequest();
    writexhr.withCredentials = true;

    // 监听请求状态变化
    writexhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            const response = JSON.parse(this.responseText);
            if (response.code === 200) {
                alert("文章发布成功！");

                // 再次渲染自己的文章
                var myBlogslist = document.getElementById("my-blogslist");
                var xhrmyblogs = new XMLHttpRequest();
                xhrmyblogs.open('GET', 'http://119.29.229.71:8585/cat/article/me?pageSize=10&page=1');
                xhrmyblogs.setRequestHeader("token", token);
                xhrmyblogs.send();
                xhrmyblogs.onreadystatechange = function () {
                    //判断(服务端返回了所有的结果)
                    if (xhrmyblogs.readyState === 4) {
                        //判断响应状态码 200 404 403 401 500
                        //2xx都表示成功
                        if (xhrmyblogs.status >= 200 && xhrmyblogs.status < 300) {
                            console.log(xhrmyblogs.responseText);
                            var datamyblogs = xhrmyblogs.responseText;
                            // 转化为js对象
                            datamyblogs = JSON.parse(datamyblogs);
                            // var datamyblogsdata = datamyblogs.data
                            var recordsmyblogs = datamyblogs.data.records;
                            var htmlmyblogs = '';
                            for (let i = 0; i < recordsmyblogs.length; i++) {
                                var resultmyblogs = recordsmyblogs[i];
                                htmlmyblogs += "<div class='my-blogslistitem'>";
                                htmlmyblogs += "<span class='my-blogslistitemimg'></span> <div class='my-blogslistitemtitle'>" + resultmyblogs.title + "</div> <div class='my-blogslistitemsummary'>" + resultmyblogs.summary + "</div> <span class='yueduzanshoucang'>阅读" + resultmyblogs.viewed + "</span> <span class='yueduzanshoucang'>赞" + resultmyblogs.liked + "</span> <span class='yueduzanshoucang'>收藏" + resultmyblogs.collected + "</span>";
                                htmlmyblogs += "</div>";
                            }
                            myBlogslist.innerHTML = htmlmyblogs;
                        }
                    }
                }
            } else {
                alert("文章发布失败：" + response.msg);
            }
        }
    });

    // 发送 POST 请求
    writexhr.open("POST", "http://119.29.229.71:8585/cat/article/post");
    writexhr.setRequestHeader("token", token);
    writexhr.setRequestHeader("Content-Type", "application/json");
    writexhr.send(data);
});
/* 写文章页面结束 */

/* 文章详情内容页面开始 */



/* 文章详情内容页面结束*/

/*用户个人主页开始 */
const oUserrightchuangzuo = document.getElementById("userrightchuangzuo");
const oUsergeneralInfoAvatar = document.querySelector(".usergeneral-info-avatar");
const oUserheadimg = document.querySelector(".userheadimg");
oCSDN2.addEventListener("click", () => {
    oUserweb.style.display = "none";
    oMainweb.style.display = "block";
})

oLogomonkey.addEventListener("click", () => {
    if (flag === 1) {
        oMainweb.style.display = "none";
        oUserweb.style.display = "block";
        var myBlogslist = document.getElementById("my-blogslist");
        var xhrmyblogs = new XMLHttpRequest();
        xhrmyblogs.open('GET', 'http://119.29.229.71:8585/cat/article/me?pageSize=10&page=1');
        xhrmyblogs.setRequestHeader("token", token);
        xhrmyblogs.send();
        xhrmyblogs.onreadystatechange = function () {
            //判断(服务端返回了所有的结果)
            if (xhrmyblogs.readyState === 4) {
                //判断响应状态码 200 404 403 401 500
                //2xx都表示成功
                if (xhrmyblogs.status >= 200 && xhrmyblogs.status < 300) {
                    console.log(xhrmyblogs.responseText);
                    var datamyblogs = xhrmyblogs.responseText;
                    // 转化为js对象
                    datamyblogs = JSON.parse(datamyblogs);
                    // var datamyblogsdata = datamyblogs.data
                    var recordsmyblogs = datamyblogs.data.records;
                    var htmlmyblogs = '';
                    for (let i = 0; i < recordsmyblogs.length; i++) {
                        var resultmyblogs = recordsmyblogs[i];
                        htmlmyblogs += "<div class='my-blogslistitem'>";
                        htmlmyblogs += "<span class='my-blogslistitemimg'></span> <div class='my-blogslistitemtitle'>" + resultmyblogs.title + "</div> <div class='my-blogslistitemsummary'>" + resultmyblogs.summary + "</div> <span class='yueduzanshoucang'>阅读" + resultmyblogs.viewed + "</span> <span class='yueduzanshoucang'>赞" + resultmyblogs.liked + "</span> <span class='yueduzanshoucang'>收藏" + resultmyblogs.collected + "</span>";
                        htmlmyblogs += "</div>";
                    }
                    myBlogslist.innerHTML = htmlmyblogs;
                }
            }
        }
    } else {
        alert("请先登录解锁该功能");
        authContainer.style.display = "block";
    }
})

oWodezhuye1.addEventListener("click", () => {
    oMainweb.style.display = "none";
    oUserweb.style.display = "block";
})

oYonghuxialakuangTouxiang.addEventListener("click", () => {
    oMainweb.style.display = "none";
    oUserweb.style.display = "block";
})
oUserrightchuangzuo.addEventListener("click", () => {
    oUserweb.style.display = "none";
    oWriteweb.style.display = "block";
})

const oUserLogomonkey = document.getElementById("userlogomonkey");
const oUserYonghuxialakuang = document.querySelector(".useryonghuxialakuang");
const oUserbianjiziliao = document.getElementById("userbianjiziliao");
const oUsercontent = document.querySelector(".usercontent");
const oWodezhuye3 = document.getElementById("wodezhuye3");
const oUseryonghuxialakuangTouxiangimg = document.querySelector(".useryonghuxialakuang-touxiangimg");
const oUseryueto = document.querySelector("#useryueto");
const oUserprofileediting = document.getElementById("userprofileediting");
const oUserprofileeditingitem1 = document.querySelector("#userprofileeditingitem1");
const oUserprofileeditingitem2 = document.querySelector("#userprofileeditingitem2");
const oUserprofileeditingRightcontent1 = document.querySelector(".userprofileediting-rightcontent1");
const oUserprofileeditingRightcontent2 = document.querySelector(".userprofileediting-rightcontent2");


oUserprofileeditingitem1.addEventListener("click", () => {
    oUserprofileeditingRightcontent1.style.display = "block";
    oUserprofileeditingRightcontent2.style.display = "none";
    oUserprofileeditingitem1.style.backgroundColor = "#f0f0f5";
    oUserprofileeditingitem2.style.backgroundColor = "white";
})
oUserprofileeditingitem2.addEventListener("click", () => {
    oUserprofileeditingRightcontent1.style.display = "none";
    oUserprofileeditingRightcontent2.style.display = "block";
    oUserprofileeditingitem1.style.backgroundColor = "white";
    oUserprofileeditingitem2.style.backgroundColor = "#f0f0f5";
})

oUserbianjiziliao.addEventListener("click", () => {
    oUsercontent.style.display = "none";
    oUserprofileediting.style.display = "block";
})
oUseryueto.addEventListener("click", () => {
    oUsercontent.style.display = "block";
    oUserprofileediting.style.display = "none";
})

oUserLogomonkey.addEventListener("click", () => {
    oUsercontent.style.display = "block";
})
oWodezhuye3.addEventListener("click", () => {
    oUsercontent.style.display = "block";
})
oUseryonghuxialakuangTouxiangimg.addEventListener("click", () => {
    oUsercontent.style.display = "block";
})

oUserLogomonkey.addEventListener("mouseenter", () => {
    oUserYonghuxialakuang.style.display = "block";
})
oUserLogomonkey.addEventListener("mouseleave", () => {
    oUserYonghuxialakuang.style.display = "none";
})
oUserYonghuxialakuang.addEventListener("mouseenter", () => {
    oUserYonghuxialakuang.style.display = "block";
})
oUserYonghuxialakuang.addEventListener("mouseleave", () => {
    oUserYonghuxialakuang.style.display = "none";
})

//实现信息与密码修改

// 获取修改信息与密码按钮
const oUserchangeinformation = document.querySelector(".userchangeinformation");
const usermodal = document.getElementById("info-usermodal");
const closeModal = document.getElementById("close-usermodal");
const submitInfo = document.getElementById("submit-info");

// 点击修改信息按钮，显示模态框
oUserchangeinformation.addEventListener("click", () => {
    usermodal.style.display = "flex";
});

// 点击关闭按钮，隐藏模态框
closeModal.addEventListener("click", () => {
    usermodal.style.display = "none";
});

// 提交修改信息
submitInfo.addEventListener("click", () => {
    const userchangename = document.getElementById("usermodal-username").value.trim();
    const avatar = document.getElementById("usermodal-avatar").value.trim();
    const intro = document.getElementById("usermodal-intro").value.trim();

    // 检查输入是否为空
    if (!userchangename || !avatar || !intro) {
        alert("请填写完整信息！");
        return;
    }

    // 构造请求数据
    const datauserchange = JSON.stringify({
        username: userchangename,
        avatar: avatar,
        intro: intro
    });
    // 创建 XMLHttpRequest 对象
    const xhruserchange = new XMLHttpRequest();
    xhruserchange.withCredentials = true;

    xhruserchange.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            const response = JSON.parse(this.responseText);
            if (response.code === 200) {
                alert("用户信息修改成功！");
                usermodal.style.display = "none"; // 修改成功后关闭模态框

                //再次获取用户信息
                // 创建 XMLHttpRequest 对象
                var xhrgetuserinformation = new XMLHttpRequest();
                xhrgetuserinformation.withCredentials = true;

                // 监听请求状态变化
                xhrgetuserinformation.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        console.log(this.responseText);
                        const response = JSON.parse(this.responseText);

                        if (response.code === 200) {
                            const data = response.data;

                            // 渲染数据到表单
                            document.getElementById("userbasic-information-username").value = data.username || "";
                            document.getElementById("userbasic-information-user-id").value = data.id || "";
                            document.getElementById("userbasic-information-intro").value = data.intro || "";
                            // 其他字段可以根据需要填充

                            // 头像渲染
                            var imgUsergeneralInfoAvatar = document.createElement('img');
                            imgUsergeneralInfoAvatar.src = data.avatar || "./images/logomonkey.jpg!1";
                            var Userheadimg = document.createElement('img');
                            Userheadimg.src = data.avatar || "./images/logomonkey.jpg!1";
                            oUsergeneralInfoAvatar.innerHTML = "";
                            oUsergeneralInfoAvatar.appendChild(imgUsergeneralInfoAvatar);
                            oUserheadimg.innerHTML = "";
                            oUserheadimg.appendChild(Userheadimg);
                        } else {
                            // alert("获取用户信息失败：" + response.msg);
                        }
                    }
                });

                // 发送 GET 请求
                xhrgetuserinformation.open("GET", "http://119.29.229.71:8585/cat/user/me");
                xhrgetuserinformation.setRequestHeader("token", token);
                xhrgetuserinformation.send();
            } else {
                alert("修改失败：" + response.msg);
            }
        }
    });

    // 发送请求
    xhruserchange.open("POST", "http://119.29.229.71:8585/cat/user/modify/userInfo");
    xhruserchange.setRequestHeader("token", token);
    xhruserchange.setRequestHeader("Content-Type", "application/json");
    xhruserchange.send(datauserchange);
});

// 获取修改密码按钮和修改密码模态框
const oUserchangemimainformation = document.querySelector(".userchangemimainformation");
const passwordModalmima = document.querySelector("#password-usermodalmima");
const closePasswordModalmima = document.querySelector("#close-password-modalmima");
const submitPasswordmima = document.querySelector("#submit-passwordmima");

// 点击修改密码按钮，显示模态框
oUserchangemimainformation.addEventListener("click", () => {
    passwordModalmima.style.display = "block";
});

// 点击关闭按钮，隐藏模态框
closePasswordModalmima.addEventListener("click", () => {
    passwordModalmima.style.display = "none";
});

// 提交修改密码
submitPasswordmima.addEventListener("click", () => {
    const passwordmima = document.getElementById("usermodalmima-password").value.trim();

    // 检查输入是否为空
    if (!passwordmima) {
        alert("请输入密码！");
        return;
    }

    // 构造请求数据
    const datamima = JSON.stringify({
        password: passwordmima
    });

    // 创建 XMLHttpRequest 对象
    const xhrmima = new XMLHttpRequest();
    xhrmima.withCredentials = true;

    xhrmima.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            const responsemima = JSON.parse(this.responseText);
            if (responsemima.code === 200) {
                alert("密码修改成功！");
                passwordModalmima.style.display = "none"; // 修改成功后关闭模态框
            } else {
                alert("修改失败：" + responsemima.msg);
            }
        }
    });

    // 发送请求
    xhrmima.open("POST", "http://119.29.229.71:8585/cat/user/modify/password");
    xhrmima.setRequestHeader("token", token);
    xhrmima.setRequestHeader("Content-Type", "application/json");
    xhrmima.send(datamima);
});

//获取用户信息
// 创建 XMLHttpRequest 对象
var xhrgetuserinformation = new XMLHttpRequest();
xhrgetuserinformation.withCredentials = true;

// 监听请求状态变化
xhrgetuserinformation.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        console.log(this.responseText);
        const response = JSON.parse(this.responseText);

        if (response.code === 200) {
            const data = response.data;

            // 渲染数据到表单
            document.getElementById("userbasic-information-username").value = data.username || "";
            document.getElementById("userbasic-information-user-id").value = data.id || "";
            document.getElementById("userbasic-information-intro").value = data.intro || "";

            // 头像渲染
            var imgUsergeneralInfoAvatar = document.createElement('img');
            imgUsergeneralInfoAvatar.src = data.avatar || "./images/logomonkey.jpg!1";
            var Userheadimg = document.createElement('img');
            Userheadimg.src = data.avatar || "./images/logomonkey.jpg!1";
            oUsergeneralInfoAvatar.innerHTML = "";
            oUsergeneralInfoAvatar.appendChild(imgUsergeneralInfoAvatar);
            oUserheadimg.innerHTML = "";
            oUserheadimg.appendChild(Userheadimg);

        } else {
            // alert("获取用户信息失败：" + response.msg);
        }
    }
});

// 发送 GET 请求
xhrgetuserinformation.open("GET", "http://119.29.229.71:8585/cat/user/me");
xhrgetuserinformation.setRequestHeader("token", token);
xhrgetuserinformation.send();

oUserprofileeditingitem1.addEventListener("click", () => {
    oUserprofileeditingRightcontent1.style.display = "block";
    oUserprofileeditingRightcontent2.style.display = "none";
    oUserprofileeditingitem1.style.backgroundColor = "#f0f0f5";
    oUserprofileeditingitem2.style.backgroundColor = "white";
})
oUserprofileeditingitem2.addEventListener("click", () => {
    oUserprofileeditingRightcontent1.style.display = "none";
    oUserprofileeditingRightcontent2.style.display = "block";
    oUserprofileeditingitem1.style.backgroundColor = "white";
    oUserprofileeditingitem2.style.backgroundColor = "#f0f0f5";
})


//渲染自己的文章
var myBlogslist = document.getElementById("my-blogslist");
var xhrmyblogs = new XMLHttpRequest();
xhrmyblogs.open('GET', 'http://119.29.229.71:8585/cat/article/me?pageSize=10&page=1');
xhrmyblogs.setRequestHeader("token", token);
xhrmyblogs.send();
xhrmyblogs.onreadystatechange = function () {
    //判断(服务端返回了所有的结果)
    if (xhrmyblogs.readyState === 4) {
        //判断响应状态码 200 404 403 401 500
        //2xx都表示成功
        if (xhrmyblogs.status >= 200 && xhrmyblogs.status < 300) {
            console.log(xhrmyblogs.responseText);
            var datamyblogs = xhrmyblogs.responseText;
            // 转化为js对象
            datamyblogs = JSON.parse(datamyblogs);
            // var datamyblogsdata = datamyblogs.data
            var recordsmyblogs = datamyblogs.data.records;
            var htmlmyblogs = '';
            for (let i = 0; i < recordsmyblogs.length; i++) {
                var resultmyblogs = recordsmyblogs[i];
                htmlmyblogs += "<div class='my-blogslistitem'>";
                htmlmyblogs += "<span class='my-blogslistitemimg'></span> <div class='my-blogslistitemtitle'>" + resultmyblogs.title + "</div> <div class='my-blogslistitemsummary'>" + resultmyblogs.summary + "</div> <span class='yueduzanshoucang'>阅读" + resultmyblogs.viewed + "</span> <span class='yueduzanshoucang'>赞" + resultmyblogs.liked + "</span> <span class='yueduzanshoucang'>收藏" + resultmyblogs.collected + "</span>";
                htmlmyblogs += "</div>";
            }
            myBlogslist.innerHTML = htmlmyblogs;
        }
    }
}
/*用户个人主页结束 */


// 搜索页面开始
const oSearchlogo = document.querySelector(".searchlogo");
const oSearchlogomonkey = document.querySelector("#searchlogomonkey");
const oSearchrightchuangzuo = document.querySelector("#searchrightchuangzuo");
oSearchlogo.addEventListener("click", () => {
    oSearchweb.style.display = "none";
    oMainweb.style.display = "block";
})
oSearchlogomonkey.addEventListener("click", () => {
    oSearchweb.style.display = "none";
    oUserweb.style.display = "block";
})
oSearchrightchuangzuo.addEventListener("click", () => {
    oSearchweb.style.display = "none";
    oWriteweb.style.display = "block";
})


const oSearchweb = document.querySelector(".searchweb");
// 获取输入框和按钮
const searchInput = document.querySelector(".searchheader-input input"); // 搜索输入框
const searchButton = document.querySelector(".searchheader-input button"); // 搜索按钮
const searchBlogsContainer = document.querySelector(".searchblogs"); // 渲染搜索结果的容器
// 主页搜索
const mainsousuoinput = document.querySelector("#mainsousuoinput");
const mainwebsousuobutton = document.querySelector("#mainwebsousuo");
//用户页面搜索
const usersousuoinput = document.querySelector("#usersousuoinput");
const userwebsousuobutton = document.querySelector("#userwebsousuo");

// 为按钮添加点击事件
userwebsousuobutton.addEventListener("click", () => {
    oUserweb.style.display = "none";
    oSearchweb.style.display = "block";
    // 获取输入框中的搜索关键字
    const searchkey = usersousuoinput.value.trim();
    if (!searchkey) {
        alert("请输入搜索关键字！");
        return;
    }

    // 构造请求 URL
    const searchurl = `http://119.29.229.71:8585/cat/article/search?key=${encodeURIComponent(searchkey)}&pageSize=10&page=1`;

    // 创建 XMLHttpRequest 对象
    const searchxhr = new XMLHttpRequest();
    searchxhr.withCredentials = true;

    // 监听请求状态变化
    searchxhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            const response = JSON.parse(this.responseText);
            if (response.code === 200) {
                const records = response.data.records;
                renderSearchResults(records); // 渲染搜索结果
            } else {
                alert("搜索失败：" + response.msg);
            }
        }
    });

    // 发送 GET 请求
    searchxhr.open("GET", searchurl);
    searchxhr.send();
});

// 渲染搜索结果
function renderSearchResults(records) {
    // 清空之前的搜索结果
    searchBlogsContainer.innerHTML = "";

    // 遍历搜索结果并渲染到页面
    records.forEach(record => {
        const blogItem = document.createElement("div");
        blogItem.className = "searchblog-item";
        blogItem.innerHTML = `
                    <h3>${record.title}</h3>
                    <p>${record.summary}</p>
                    <span>作者：${record.userInfo.username || "未知"}</span>
                    <span>发布时间：${new Date(record.createTime).toLocaleString()}</span>
                    <hr>
                `;
        searchBlogsContainer.appendChild(blogItem);

        // 点击跳转至文章详情页面
        const blogto2 = document.querySelector(".searchblog-item");
        blogto2.addEventListener("click", () => {
            oSearchweb.style.display = "none";
            oBlogweb.style.display = "block";

            // 发送请求渲染文章
            // 获取文章详情页的 DOM 元素
            const blogTitle = document.querySelector(".blogtitle"); // 标题
            const blogType = document.querySelector(".blogtype"); // 标签
            const blogTime = document.querySelector(".blogtime"); // 时间
            const blogSummary = document.querySelector(".blogsummary p"); // 摘要
            const blogMainText = document.querySelector(".blogmaintext p"); // 正文
            const blogViewed = document.querySelector(".blogviewed"); // 阅读量
            const blogLiked = document.querySelector(".blogliked"); // 点赞
            const blogDisliked = document.querySelector(".blogdisliked"); // 踩

            // 请求文章详情数据
            function fetchArticleDetails(articleId) {
                // 构造请求 URL
                const url = `http://119.29.229.71:8585/cat/article/detail?id=${articleId}`;

                // 创建 XMLHttpRequest 对象
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;

                // 监听请求状态变化
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        if (this.status >= 200 && this.status < 300) {
                            const response = JSON.parse(this.responseText);
                            if (response.code === 200) {
                                const articleData = response.data;

                                // 渲染文章详情到页面
                                renderArticleDetails(articleData);
                            } else {
                                alert("获取文章详情失败：" + response.msg);
                            }
                        } else {
                            console.error("请求失败，状态码：" + this.status);
                        }
                    }
                });

                // 发送 GET 请求
                xhr.open("GET", url);
                xhr.send();
            }

            // 渲染文章详情到页面
            function renderArticleDetails(articleData) {
                blogTitle.textContent = articleData.title || "无标题"; // 渲染标题
                blogType.textContent = `分类：${articleData.type || "无标签"}`; // 渲染标签
                blogTime.textContent = `创建时间：${new Date(articleData.createTime).toLocaleString()} | 更新时间：${new Date(articleData.updateTime).toLocaleString()}`; // 渲染时间
                blogSummary.textContent = articleData.summary || "无摘要"; // 渲染摘要
                blogMainText.textContent = articleData.content || "无内容"; // 渲染正文
                blogViewed.textContent = articleData.viewed || 0; // 渲染阅读量
                blogLiked.textContent = articleData.liked || 0; // 渲染点赞数
                blogDisliked.textContent = articleData.disliked || 0; // 渲染踩数
            }

            // 调用函数获取文章详情（示例：id=97）
            fetchArticleDetails(97);
        })
    });
}


mainwebsousuobutton.addEventListener("click", () => {
    if (flag === 1) {
        oSearchweb.style.display = "block";
        oMainweb.style.display = "none";
        // 获取输入框中的搜索关键字
        const searchkey = mainsousuoinput.value.trim();
        if (!searchkey) {
            alert("请输入搜索关键字！");
            return;
        }

        // 构造请求 URL
        const searchurl = `http://119.29.229.71:8585/cat/article/search?key=${encodeURIComponent(searchkey)}&pageSize=10&page=1`;

        // 创建 XMLHttpRequest 对象
        const searchxhr = new XMLHttpRequest();
        searchxhr.withCredentials = true;

        // 监听请求状态变化
        searchxhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.responseText);
                if (response.code === 200) {
                    const records = response.data.records;
                    renderSearchResults(records); // 渲染搜索结果
                } else {
                    alert("搜索失败：" + response.msg);
                }
            }
        });

        // 发送 GET 请求
        searchxhr.open("GET", searchurl);
        searchxhr.send();
    } else {
        alert("登录后可搜索文章");
        authContainer.style.display = "block";
    }
})

// 为按钮添加点击事件
searchButton.addEventListener("click", () => {
    // 获取输入框中的搜索关键字
    const searchkey = searchInput.value.trim();
    if (!searchkey) {
        alert("请输入搜索关键字！");
        return;
    }

    // 构造请求 URL
    const searchurl = `http://119.29.229.71:8585/cat/article/search?key=${encodeURIComponent(searchkey)}&pageSize=10&page=1`;

    // 创建 XMLHttpRequest 对象
    const searchxhr = new XMLHttpRequest();
    searchxhr.withCredentials = true;

    // 监听请求状态变化
    searchxhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            const response = JSON.parse(this.responseText);
            if (response.code === 200) {
                const records = response.data.records;
                renderSearchResults(records); // 渲染搜索结果
            } else {
                alert("搜索失败：" + response.msg);
            }
        }
    });

    // 发送 GET 请求
    searchxhr.open("GET", searchurl);
    searchxhr.send();
});

// 渲染搜索结果
function renderSearchResults(records) {
    // 清空之前的搜索结果
    searchBlogsContainer.innerHTML = "";

    // 遍历搜索结果并渲染到页面
    records.forEach(record => {
        const blogItem = document.createElement("div");
        blogItem.className = "searchblog-item";
        blogItem.innerHTML = `
                    <h3>${record.title}</h3>
                    <p>${record.summary}</p>
                    <span>作者：${record.userInfo.username || "未知"}</span>
                    <span>发布时间：${new Date(record.createTime).toLocaleString()}</span>
                    <hr>
                `;
        searchBlogsContainer.appendChild(blogItem);

        // 点击跳转至文章详情页面
        const blogto2 = document.querySelector(".searchblog-item");
        blogto2.addEventListener("click", () => {
            oSearchweb.style.display = "none";
            oBlogweb.style.display = "block";
            // 发送请求渲染文章
            // 获取文章详情页的 DOM 元素
            const blogTitle = document.querySelector(".blogtitle"); // 标题
            const blogType = document.querySelector(".blogtype"); // 标签
            const blogTime = document.querySelector(".blogtime"); // 时间
            const blogSummary = document.querySelector(".blogsummary p"); // 摘要
            const blogMainText = document.querySelector(".blogmaintext p"); // 正文
            const blogViewed = document.querySelector(".blogviewed"); // 阅读量
            const blogLiked = document.querySelector(".blogliked"); // 点赞
            const blogDisliked = document.querySelector(".blogdisliked"); // 踩

            // 请求文章详情数据
            function fetchArticleDetails(articleId) {
                // 构造请求 URL
                const url = `http://119.29.229.71:8585/cat/article/detail?id=${articleId}`;

                // 创建 XMLHttpRequest 对象
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;

                // 监听请求状态变化
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        if (this.status >= 200 && this.status < 300) {
                            const response = JSON.parse(this.responseText);
                            if (response.code === 200) {
                                const articleData = response.data;

                                // 渲染文章详情到页面
                                renderArticleDetails(articleData);
                            } else {
                                alert("获取文章详情失败：" + response.msg);
                            }
                        } else {
                            console.error("请求失败，状态码：" + this.status);
                        }
                    }
                });

                // 发送 GET 请求
                xhr.open("GET", url);
                xhr.send();
            }

            // 渲染文章详情到页面
            function renderArticleDetails(articleData) {
                blogTitle.textContent = articleData.title || "无标题"; // 渲染标题
                blogType.textContent = `分类：${articleData.type || "无标签"}`; // 渲染标签
                blogTime.textContent = `创建时间：${new Date(articleData.createTime).toLocaleString()} | 更新时间：${new Date(articleData.updateTime).toLocaleString()}`; // 渲染时间
                blogSummary.textContent = articleData.summary || "无摘要"; // 渲染摘要
                blogMainText.textContent = articleData.content || "无内容"; // 渲染正文
                blogViewed.textContent = articleData.viewed || 0; // 渲染阅读量
                blogLiked.textContent = articleData.liked || 0; // 渲染点赞数
                blogDisliked.textContent = articleData.disliked || 0; // 渲染踩数
            }

            // 调用函数获取文章详情（示例：id=97）
            fetchArticleDetails(97);
        })
    });
}
// 搜索页面结束

//文章详情页开始
const obloglogo = document.querySelector(".bloglogo");
const obloglogomonkey = document.querySelector("#bloglogomonkey");
const oblogrightchuangzuo = document.querySelector("#blogrightchuangzuo");
const blogsousuoinput = document.querySelector("#blogsousuoinput");
const blogsousuo = document.querySelector("#blogsousuo");

obloglogo.addEventListener("click", () => {
    oBlogweb.style.display = "none";
    oMainweb.style.display = "block";
})
obloglogomonkey.addEventListener("click", () => {
    oBlogweb.style.display = "none";
    oUserweb.style.display = "block";
})
oblogrightchuangzuo.addEventListener("click", () => {
    oBlogweb.style.display = "none";
    oWriteweb.style.display = "block";
})

blogsousuo.addEventListener("click", () => {
    oBlogweb.style.display = "none";
    oSearchweb.style.display = "block";
    // 获取输入框中的搜索关键字
    const searchkey = blogsousuoinput.value.trim();
    if (!searchkey) {
        alert("请输入搜索关键字！");
        return;
    }

    // 构造请求 URL
    const searchurl = `http://119.29.229.71:8585/cat/article/search?key=${encodeURIComponent(searchkey)}&pageSize=10&page=1`;

    // 创建 XMLHttpRequest 对象
    const searchxhr = new XMLHttpRequest();
    searchxhr.withCredentials = true;

    // 监听请求状态变化
    searchxhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            const response = JSON.parse(this.responseText);
            if (response.code === 200) {
                const records = response.data.records;
                renderSearchResults(records); // 渲染搜索结果
            } else {
                alert("搜索失败：" + response.msg);
            }
        }
    });

    // 发送 GET 请求
    searchxhr.open("GET", searchurl);
    searchxhr.send();
});

// 渲染搜索结果
function renderSearchResults(records) {
    // 清空之前的搜索结果
    searchBlogsContainer.innerHTML = "";

    // 遍历搜索结果并渲染到页面
    records.forEach(record => {
        const blogItem = document.createElement("div");
        blogItem.className = "searchblog-item";
        blogItem.innerHTML = `
                    <h3>${record.title}</h3>
                    <p>${record.summary}</p>
                    <span>作者：${record.userInfo.username || "未知"}</span>
                    <span>发布时间：${new Date(record.createTime).toLocaleString()}</span>
                    <hr>
                `;
        searchBlogsContainer.appendChild(blogItem);

        // 点击跳转至文章详情页面
        const blogto2 = document.querySelector(".searchblog-item");
        blogto2.addEventListener("click", () => {
            oSearchweb.style.display = "none";
            oBlogweb.style.display = "block";

            // 发送请求渲染文章
            // 获取文章详情页的 DOM 元素
            const blogTitle = document.querySelector(".blogtitle"); // 标题
            const blogType = document.querySelector(".blogtype"); // 标签
            const blogTime = document.querySelector(".blogtime"); // 时间
            const blogSummary = document.querySelector(".blogsummary p"); // 摘要
            const blogMainText = document.querySelector(".blogmaintext p"); // 正文
            const blogViewed = document.querySelector(".blogviewed"); // 阅读量
            const blogLiked = document.querySelector(".blogliked"); // 点赞
            const blogDisliked = document.querySelector(".blogdisliked"); // 踩

            // 请求文章详情数据
            function fetchArticleDetails(articleId) {
                // 构造请求 URL
                const url = `http://119.29.229.71:8585/cat/article/detail?id=${articleId}`;

                // 创建 XMLHttpRequest 对象
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;

                // 监听请求状态变化
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        if (this.status >= 200 && this.status < 300) {
                            const response = JSON.parse(this.responseText);
                            if (response.code === 200) {
                                const articleData = response.data;

                                // 渲染文章详情到页面
                                renderArticleDetails(articleData);
                            } else {
                                alert("获取文章详情失败：" + response.msg);
                            }
                        } else {
                            console.error("请求失败，状态码：" + this.status);
                        }
                    }
                });

                // 发送 GET 请求
                xhr.open("GET", url);
                xhr.send();
            }

            // 渲染文章详情到页面
            function renderArticleDetails(articleData) {
                blogTitle.textContent = articleData.title || "无标题"; // 渲染标题
                blogType.textContent = `分类：${articleData.type || "无标签"}`; // 渲染标签
                blogTime.textContent = `创建时间：${new Date(articleData.createTime).toLocaleString()} | 更新时间：${new Date(articleData.updateTime).toLocaleString()}`; // 渲染时间
                blogSummary.textContent = articleData.summary || "无摘要"; // 渲染摘要
                blogMainText.textContent = articleData.content || "无内容"; // 渲染正文
                blogViewed.textContent = articleData.viewed || 0; // 渲染阅读量
                blogLiked.textContent = articleData.liked || 0; // 渲染点赞数
                blogDisliked.textContent = articleData.disliked || 0; // 渲染踩数
            }
            fetchArticleDetails(97);

        })
    });
}


//文章详情页结束