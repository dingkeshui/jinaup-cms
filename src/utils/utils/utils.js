/**
*传入时间戳，转换为年月日，时分秒
*第一个参数为时间戳
*第二个参数为true表示只返回年月日，不传默认年月日时分秒
*第三个参数为日期的链接的方式
*/
function getTime(str, year, type) {
	let time = new Date(str)
	let y = time.getFullYear()
	let m = time.getMonth()+1
	let d = time.getDate()
	let h = time.getHours()
	let mm = time.getMinutes()
	let s = time.getSeconds()
	let typestr = '-'
	if(type||type == ''){
		typestr = type
	}
	if (year == 'day') {
		return y+typestr+(m<10?'0'+m:m)+typestr+(d<10?'0'+d:d)
	} else {
		return y+typestr+(m<10?'0'+m:m)+typestr+(d<10?'0'+d:d)+' '+(h<10?'0'+h:h)+':'+(mm<10?'0'+mm:mm)+':'+(s<10?'0'+s:s)
	}
}

/**
*获取文件大小
*/
function getFileSize (fileByte) {
	let fileSizeByte = fileByte;
    let fileSizeMsg = "";
    if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
    else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
    else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + "MB";
    else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1GB";
    else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    else fileSizeMsg = "文件超过1TB";
    return fileSizeMsg;
}

const untils = {
	getTime,
	getFileSize
}

export default untils