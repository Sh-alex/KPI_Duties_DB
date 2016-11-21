export default function replaceApostrophe(str) {
    if(!(typeof str == "string"))
        return str;
    return str.toString().replace(/\"|’|\`|‘|’|“|”|„|“|«|»/gi, "\'")
}