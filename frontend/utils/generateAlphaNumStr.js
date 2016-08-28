export default function generateAlphaNumStr(length) {
    const rndNum = () => Math.floor(Math.random() * 36);
    let resStr = "";
    for (var i = 0; i < length; i++) {
        resStr += rndNum().toString(36)
    };
    return resStr;
};