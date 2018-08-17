/**
 * 精选数据
 * 
 */
const app = getApp();
const week = new Date().getDay();

const request = (callback)=>{
    wx.request({
        url: app.globalData.url + 'api/choiceness',
        data: {},
        header: {
            'content-type': 'application/json',
        },
        method:'POST',
        success: function(res) {
            if(typeof callback == "function"){
                callback(res.data)
            }
        }
    })
}
const test = {
	"signIn": [{
		gameId: 10000,
		"day": 1,
		"date": "",
		"isNeck": true,
		"award": 50,
		"moneyImg": "/onem.png"
	}, {
		gameId: 10000,
		"day": 2,
		"date": "",
		"isNeck": false,
		"award": 55,
		"moneyImg": "/twom.png"
	}, {
		gameId: 10000,
		"day": 3,
		"date": "",
		"isNeck": false,
		"award": 65,
		"moneyImg": "/threem.png"
	}, {
		gameId: 10000,
		"day": 4,
		"date": "",
		"isNeck": false,
		"award": 80,
		"moneyImg": "/fourm.png"
	}, {
		gameId: 10000,
		"day": 5,
		"date": "",
		"isNeck": false,
		"award": 100,
		"moneyImg": "/fivem.png"
	}, {
		gameId: 10000,
		"day": 6,
		"date": "",
		"isNeck": false,
		"award": 125,
		"moneyImg": "/sixm.png"
	}, {
		gameId: 10000,
		"day": 7,
		"date": "",
		"isNeck": false,
		"award": 200,
		"moneyImg": "/sevenm.png"
	}], 
"tasksInfo": [{
		gameId: 10000,
		"taskImg": "taskone.png",
		"taskIcon": "/taskiconone.png",
		"title": "签到达人",
		"taskMind": "完成今日签到！",
		"status": 1,
		"finish": 1,
		"target": 1
	}, {
		gameId: 10000,
		"taskImg": "tasktwo.png",
		"taskIcon": "/taskicontwo.png",
		"title": "游戏达人",
		"taskMind": "今日游玩5个游戏！",
		"status": 1,
		"finish": 1,
		"target": 5
	}]
}
module.exports = {
    week,
    request,
    test
}