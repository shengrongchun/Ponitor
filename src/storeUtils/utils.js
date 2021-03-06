/**
 * url parser tool
 */
'use strict'
const util = require('lao-utils');
const URL = require('url');



function urlParser(url) {
    return new Promise((resolve, reject) => {

        if (!url) {
            reject({
                status: 404,
                error: '请输入商品URL！'
            });
        } else {
            const params = URL.parse(url,true).query;
            let obj={};
            if (util.contains(url, 'tmall') || util.contains(url, 'taobao')) {
            	obj.target='alibaba';
                obj.itemId = params.id;
            } else if (util.contains(url, 'jd.com')) {
            	obj.target='jd';
                obj.itemId = url;
            } else if (util.contains(url, 'apple.com')) {
                if(!util.contains(url, '/id')){
                    return reject({
                        status:402,
                        error:'请填写完整正确的App地址'
                    });
                }
            	obj.target='apple';
                obj.itemId = url;
            }else{
                 return reject({
                        status:402,
                        error:'请填写正确的商品地址'
                    });
            }
            resolve(obj);
        }
    });
}

module.exports = { urlParser };

//test
/*const url = 'https://detail.tmall.com/item.htm?id=42323050374';
urlParser(url).then((result)=>{
	console.log(result);
}).catch(err=>console.log(err));*/