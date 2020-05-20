var fs = require('fs');
var shell = require("shelljs");
var _ = process.argv.splice(2);
var tag = getTag()
var newname = 'webimSDK'+tag
shell.exec('parcel build ./index.js --no-source-maps --out-file webimSDK.js --global WebIM')

var oldPath = './dist/webimSDK.js'
var newPath = './dist/'+newname+'.js'
fs.rename(oldPath, newPath, function(err) {
    if (!err) {
        console.log(newPath)
    } 
})
// fs.rename(oldPath, newPath, callback) 

var cbDataPackage = getPackageJson()

var distDataPackage = getPackageJson(true)

function getPackageJson(isdist) {
	var _packageJson = fs.readFileSync('./package.json')
	var _distPackageJson = fs.readFileSync('./dist/package.json')
	var packageJson = isdist ? _distPackageJson : _packageJson
	return JSON.parse(packageJson)
}

function _getPackageVersion() {
	return cbDataPackage.version
}

function writePackageJson(cbDataPackage, wholeVersion) {
	cbDataPackage.version = wholeVersion
	cbDataPackage.main = 'webimSDK'+wholeVersion
	fs.writeFile('./package.json', JSON.stringify(cbDataPackage, "", "\t"), function(err) {
		if (err) console.error(err);
		console.log('修改package.json文件完毕，version修改为：', cbDataPackage.version)
	});
}

function writeDistPackageJson(cbDataPackage, wholeVersion) {
	cbDataPackage.version = wholeVersion
	cbDataPackage.main = 'webimSDK'+wholeVersion
	fs.writeFile('./dist/package.json', JSON.stringify(distDataPackage, "", "\t"), function(err) {
		if (err) {
			return console.error(err)
		}
		console.log('修改dist package.json文件完毕，version修改为：', cbDataPackage.version)
		if (_[0] === '-p') {
			publish()
		}
	});
}

function getTag() {
	shell.exec('cd ../../')
	var tag = shell.exec('git describe --tags')
	return tag.replace(/(^\s*)|(\s*$)/g, "").split('-')[0]
}

writePackageJson(cbDataPackage, getTag())
writeDistPackageJson(distDataPackage, getTag())

function publish() {
	shell.exec('cd ./dist&&npm publish --registry http://registry.npmjs.org');
	//shell.exec('npm publish');
	console.log('发布完成')
}