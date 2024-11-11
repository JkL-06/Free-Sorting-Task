class Naodao {
    __preUrl = 'https://www.naodao.com/api';
    __token = '';
    __id = '';
    __location = '';
    __itemId = '';
    __beginDate = '';
    getData = () => { return ""; };

    constructor() {
        this.init();
    }
    static getQueryString(params) {
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
    init() {
        var _this = this;

        var __localStorage = window.localStorage.getItem('__insula_l__');
        var __data = __localStorage ? JSON.parse(__localStorage) : {};
        _this.__beginDate = __data.user && __data.user.beginDate;
        _this.__token = Naodao.getQueryString('__token');
        _this.__id = Naodao.getQueryString('__id');
        _this.__itemId = Naodao.getQueryString('__itemId');
        _this.__location = window.location.href;

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
        }).then(response => response.json());
    }
    async save() {
        let result;
        if (this.__token === 'preview' || this.__location.includes('file://')) {
            result = this.offlineSave(this.getData());
        } else {
            result = await this.onlineSave(this.getData());
        }
        if(!result) {
            this.parent_post_message(this.__token, this.__id, !1, 500, "实验作答失败，请刷新重新作答！");
        } else {
            this.parent_post_message(this.__token, this.__id, !0, 200, "实验作答完成，感谢你的耐心等待，继续下一步？");
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
    async onlineSave(str, id = this.__id, token = this.__token) {
        return fetch(this.__preUrl + '/user/jsPsych/results', {
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
            if(data.code == 200) {
                return true;
            } else {
                return false;
            }
          });
    }

    parent_post_message(recordId, nodeId, isCompleted, code, message) {
        window.parent.postMessage({ recordId, nodeId, isCompleted, code, message });
    }
}
export default Naodao;