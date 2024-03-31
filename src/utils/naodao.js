class Naodao {
    getQueryString(params) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == params) {
                return pair[1];
            }
        }
        return '';
    }
    constructor(...opts) {
        this.__preUrl = 'https://www.naodao.com/api';
        this.__token = '';
        this.__id = '';
        this.__location = '';
        this.__itemId = '';
        this.__beginDate = '';
        this.init();
        this.getData = () => { return ""; };
    }
    init() {
        var _this = this;

        var __localStorage = window.localStorage.getItem('__insula_l__');
        var __data = __localStorage ? JSON.parse(__localStorage) : {};
        _this.__beginDate = __data.user && __data.user.beginDate;
        _this.__token = _this.getQueryString('__token');
        _this.__id = _this.getQueryString('__id');
        _this.__itemId = _this.getQueryString('__itemId');
        _this.__location = window.location.href;
        _this.monitor();
        fetch(_this.__preUrl + '/user/canvasNode/insertRecord', {
            method: "POST",
            headers: {
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                nodeId: _this.__id,
                recordId: _this.__token,
                itemId: _this.__itemId,
                beginDate: _this.__beginDate ? _this.__beginDate : ''
            })
        }).then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    if (data.data) {
                        _this.monitor();
                    } else {
                        _this.monitor("stop");
                        // window.location.href="https://www.naodao.com/404"
                    }
                }
            });
    }
    monitor(action = "start") {
        switch (action) {
            case "stop":
                window.removeEventListener('beforeunload', this.beforeunload);
                window.removeEventListener('unload', this.unload);
                break;
            default:
                Object.keys(localStorage).forEach(v => {
                    if (/tmpD\d{11}/.exec(v)) {
                        let data = JSON.parse(localStorage.getItem(v));
                        this.onlineSave(data["data"], 0, data["__id"], data.__token);
                        let bool = this.offlineSave(data["data"], data.__id);
                        if (bool) localStorage.removeItem(v);
                    }
                });
                window.addEventListener('beforeunload', this.beforeunload);
                window.addEventListener('unload', this.unload);
                break;
        }
    }
    save() {
        let str = this.getData;
        if (this.__token === 'preview' || this.__location.includes('file://')) {
            this.offlineSave(str());
        } else {
            this.onlineSave(str(), 1);
        }
    }
    offlineSave(str, id = this.__id) {
        try {
            const blobToSave = new Blob([str], {
                type: "text/plain",
            });
            let blobURL = "";
            if (typeof window.webkitURL !== "undefined") {
                blobURL = window.webkitURL.createObjectURL(blobToSave);
            }
            else {
                blobURL = window.URL.createObjectURL(blobToSave);
            }
            const link = document.createElement("a");
            link.id = "jspsych-download-as-text-link";
            link.style.display = "none";
            link.download = `${id}.csv`;
            link.href = blobURL;
            link.click();
            return true;
        } catch {
            return false;
        }
    }
    onlineSave(str, state = 0, id = this.__id, token = this.__token) {
        fetch(this.__preUrl + '/user/jsPsych/results', {
            method: "POST",
            headers: {
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                experimentId: id,
                token: token,
                key: id,
                value: str,
                state: 1
            })
        }).then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    this.monitor("stop");
                    document.querySelector("body").innerHTML = `<p class='jspsych-content'>${"上传成功，本页面可以关闭啦~"}</p>`;
                    setTimeout(function () {
                        window.close();
                    }, 5000);
                } else {
                    document.querySelector("body").innerHTML = `<p class='jspsych-content'>${"上传失败，不知道为什么哦~"}</p>`;
                }
            });
    }
    beforeunload(event) {
        event.preventDefault();
        event.returnValue = '';
    }
    unload() {
        getData = this.getData;
        localStorage.setItem("tmpD" + new Date().getTime().toString(), JSON.stringify(
            Object.assign({}, {
                __beginDate: this.__beginDate,
                __token: this.__token,
                __id: this.__id,
                __itemId: this.__itemId,
                __location: this.__location,
                state: 0
            }, {
                data: getData()
            })
        ));
    }
}
export default Naodao;