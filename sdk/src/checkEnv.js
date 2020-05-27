
let wxMiniProgram = false;

const info = [
    {
        key: 'Environment',
        value: 'production',
        keyBgColor: '#606060',
        valueBgColor: '#1299ec'
    },
    {
        key: 'version',
        value: '3.1.2',
        keyBgColor: '#606060',
        valueBgColor: '#1299ec'
    },
    {
        key: 'updateTime',
        value: '2020.5.14',
        keyBgColor: '#606060',
        valueBgColor: '#1299ec'
    },
    {
        key: 'platform',
        value: wxMiniProgram ? 'miniProgram' : 'browser',
        keyBgColor: '#606060',
        valueBgColor: '#1299ec'
    },
]

function logInfo(info) {
    for (let i = 0, len = info.length; i < len; i++) {
        console.log(
            "%c ".concat(info[i].key, " %c ").concat(info[i].value, " "),
            "padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: ".concat(info[i].keyBgColor, ";"), "padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: ".concat(info[i].valueBgColor, ";")
        )
    }
}

logInfo(info)

export default wxMiniProgram

