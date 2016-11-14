export default function trimSubstr(str="", l) {
    if(l >= str.length)
        return str;
    else
        return str.substr(0, l) + "…";
}