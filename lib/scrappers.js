//══════[ 2023 PooP-MD ]══════\\

///======= Creditos =======///
//•// Scrapper desenvolvida por Joao(Bruxo)
//•// Número para contato: wa.me/5599935009504

///======= Modules =======///
const ytdl = require('ytdl-core');
const axios = require('axios');
const cheerio = require('cheerio');
const vm = require('vm');
const fetch = require('node-fetch');
const yt = require("ytdl-core");
const yts = require("yt-search");
const cookie = require("cookie");
const FormData = require("form-data");
const request = require('request');
///======= API TextPro =======///
async function getBuffer(url, options){
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		console.log(err)
	}
}

function wallpaper(title, page = '1') {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=${page}&q=${title}`)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('div.grid-item').each(function (a, b) {
                hasil.push({
                    title: $(b).find('div.info > a > h3').text(),
                    type: $(b).find('div.info > a:nth-child(2)').text(),
                    source: 'https://www.besthdwallpaper.com/'+$(b).find('div > a:nth-child(3)').attr('href'),
                    image: [$(b).find('picture > img').attr('data-src') || $(b).find('picture > img').attr('src'), $(b).find('picture > source:nth-child(1)').attr('srcset'), $(b).find('picture > source:nth-child(2)').attr('srcset')]
                })
            })
            resolve(hasil)
        })
    })
}

async function tiktok(URL) {
  let response = await axios("https://lovetik.com/api/ajax/search", {
    method: "POST",
    data: new URLSearchParams(Object.entries({ URL })),
  });
  
  const clean = (data) => {
  let regex = /(<([^>]+)>)/gi;
  data = data.replace(/(<br?\s?\/>)/gi, " \n");
  return data.replace(regex, "");};

async function shortener(url) {
  return url;}
  result = {};
  result.creator = "YNTKTS";
  result.title = clean(response.data.desc);
  result.author = clean(response.data.author);
  result.nowm = await shortener(
    (response.data.links[0].a || "").replace("https", "http")
  );
  result.watermark = await shortener(
    (response.data.links[1].a || "").replace("https", "http")
  );
  result.audio = await shortener(
    (response.data.links[2].a || "").replace("https", "http")
  );
  result.thumbnail = await shortener(response.data.cover);
  return result;
}

const kwai = async (url) => {
const response = await axios.get(url)
const $ = cheerio.load(response.data)
const hasil = []
const author = $('.name').text().replace('\n            ','').replace('\n        ','')
const legenda = $('p').text().replace('\n        ','').replace('\n    ','')
const video = $('#video-ele').attr('src')
hasil.push({author, legenda, video})
return hasil
}

async function Mp3v1(query) {
    return new Promise((resolve, reject) => {
        try {
            const search = yts(query)
            .then((data) => {
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
                    }
                }
                const id = yt.getVideoID(url[0])
                const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
                .then((data) => {
                    let pormat = data.formats
                    let audio = []
                    let video = []
                    for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].mimeType == 'audio/webm; codecs=\"opus\"') {
                        let aud = pormat[i]
                        audio.push(aud.url)
                    }
                    }
                    const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
                    const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
                    const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
                    const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
                    const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
                    const result = {
                    título: title,
                    thumb: thumb,
                    canal: channel,
                    publicado: published,
                    visualizações: views,
                    link: audio[0]
                    }
                    return(result)
                })
                return(yutub)
            })
            resolve(search)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

async function Mp4v1(url) {
  return new Promise((resolve, reject) => {
    try {
      const id = yt.getVideoID(url)
      const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
      .then((data) => {
        let pormat = data.formats
        let video = []
        for (let i = 0; i < pormat.length; i++) {
          if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
            let vid = pormat[i]
            video.push(vid.url)
          }
        }
        const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
        const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
        const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
        const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
        const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
        
        const result = {
          título: title,
          thumb: thumb,
          canal: channel,
          publicado: published,
          visualizações: views,
          link: video[0]
        }
        return(result)
      })
      resolve(yutub)
    } catch (error) {
        reject(error);
      }
      console.log(error)
  })
}

async function ytSearch(query) {
    return new Promise((resolve, reject) => {
        try {
            const cari = yts(query)
            .then((data) => {
                res = data.all
                return res
            })
            resolve(cari)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

function pinterest(query){
	return new Promise(async(resolve,reject) => {
		 axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + query, {
			headers: {
			"cookie" : "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
		}
			}).then(({ data }) => {
		const $ = cheerio.load(data)
		const result = [];
		const hasil = [];
   		 $('div > a').get().map(b => {
        const link = $(b).find('img').attr('src')
            result.push(link)
		});
   		result.forEach(v => {
		 if(v == undefined) return
		 hasil.push(v.replace(/236/g,'736'))
			})
			hasil.shift();
		resolve(hasil)
		})
	})
}

function xvideos(query) {
return new Promise((resolve, reject) => {
  axios.get(`https://xvideosporno.blog.br/?s=${query}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("div.postbox").each((_, say) => {
    var titulo = $(say).find("a").attr('title');
    var link = $(say).find("a").attr('href');
    var img = $(say).find("img").attr('src');
    var duração = $(say).find("time.duration-top").text().trim();
    var qualidade = $(say).find("b.hd-top").text().trim();
    var resultado = {
      titulo: titulo,
      img: img,
      duração: duração,
      qualidade: qualidade,
      link: link
    }
    postagem.push(resultado)
  })
  resolve(postagem)
  }).catch(reject)
  });
}

function pornhubserch(query) {
return new Promise((resolve, reject) => {
  axios.get(`https://pt.pornhub.com/video/search?search=${query}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("li.pcVideoListItem.js-pop.videoblock.videoBox").each((_, say) => {
    var titulo = $(say).find("a").attr('title');
    var link = $(say).find("a").attr('href');
    var img = $(say).find("img").attr('data-thumb_url');
    var duração = $(say).find("var.duration").text().trim();
    var qualidade = $(say).find("span.hd-thumbnail").text().trim();
    var autor = $(say).find("div.usernameWrap").text().trim();    
    var visualizações = $(say).find("span.views").text().trim();    
    var data_upload = $(say).find("var.added").text().trim();        
    var hype = $(say).find("div.value").text().trim();    
    var link2 = `https://pt.pornhub.com${link}`
    var resultado = {
      titulo: titulo,
      img: img,
      duração: duração,
      qualidade: qualidade,
      autor: autor,
      visualizações: visualizações,
      data_upload: data_upload,
      hype: hype,
      link: link2
    }
    postagem.push(resultado)
  })
  resolve(postagem)
  }).catch(reject)
  });
}

function parseFileSize(size) {
    return parseFloat(size) * (/GB/i.test(size)
        ? 1000000
        : /MB/i.test(size)
            ? 1000
            : /KB/i.test(size)
                ? 1
                : /bytes?/i.test(size)
                    ? 0.001
                    : /B/i.test(size)
                        ? 0.1
                        : 0);
}

function mediafirev1(url) {
    return new Promise(async(resolve, reject) => {
		var a, b;
		if (!/https?:\/\/(www\.)?mediafire\.com/.test(url)) return resolve()
	   const data = await axios.get(url).catch(function (error) {})
	   if (!data) {
		resolve()
	   } else {
		const $ = cheerio.load(data.data);
		const Url = ($('#downloadButton').attr('href') || '').trim();
		const url2 = ($('#download_link > a.retry').attr('href') || '').trim();
		const $intro = $('div.dl-info > div.intro');
		const filename = $intro.find('div.filename').text().trim();
		const filetype = $intro.find('div.filetype > span').eq(0).text().trim();
		const ext = ((b = (a = /\(\.(.*?)\)/.exec($intro.find('div.filetype > span').eq(1).text())) === null || a === void 0 ? void 0 : a[1]) === null || b === void 0 ? void 0 : b.trim()) || 'bin';
		const $li = $('div.dl-info > ul.details > li');
		const aploud = $li.eq(1).find('span').text().trim();
		const filesizeH = $li.eq(0).find('span').text().trim();
		const filesize = (0, parseFileSize)(filesizeH);
		const result = {
			url: Url || url2,
			url2,
			filename,
			filetype,
			ext,
			upload_date: aploud,
			filesizeH,
			filesize
		};
		resolve(result)
	   }
	 
		})
}
const dafont = async (query) => {
  var base = `https://www.dafont.com`
  var res = await axios.get(`${base}/search.php?q=${query}`)
  var $ = cheerio.load(res.data)
  var hasil = []
  var total = $('div.dffont2').text().replace(` fonts on DaFont for ${query}`, '') 
  $('div').find('div.container > div > div.preview').each(function(a, b) {
  $('div').find('div.container > div > div.lv1left.dfbg').each(function(c, d) { 
  $('div').find('div.container > div > div.lv1right.dfbg').each(function(e, f) { 
  let link = `${base}/` + $(b).find('a').attr('href')
  let titulo = $(d).text() 
  let estilo = $(f).text() 
  hasil.push({ titulo, estilo, total, link }) 
  }) 
  }) 
  }) 
  return hasil
  }

  function styletext(teks) {
    return new Promise((resolve, reject) => {
        axios.get('http://qaz.wtf/u/convert.cgi?text='+teks)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('table > tbody > tr').each(function (a, b) {
                hasil.push({ name: $(b).find('td:nth-child(1) > h6 > a').text(), result: $(b).find('td:nth-child(2)').text().trim() })
            }),
            resolve(hasil)
        })
    })
}
function xnxxsearch(query) {
	return new Promise((resolve, reject) => {
		const baseurl = 'https://www.xnxx.com'
		fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {method: 'get'})
		.then(res => res.text())
		.then(res => {
			let $ = cheerio.load(res, {
				xmlMode: false
			});
			let title = [];
			let url = [];
			let desc = [];
			let resultado = [];

			$('div.mozaique').each(function(a, b) {
				$(b).find('div.thumb').each(function(c, d) {
					url.push(baseurl+$(d).find('a').attr('href'))
				})
			})
			$('div.mozaique').each(function(a, b) {
				$(b).find('div.thumb-under').each(function(c, d) {
					desc.push($(d).find('p.metadata').text())
					$(d).find('a').each(function(e,f) {
					    title.push($(f).attr('title'))
					})
				})
			})
			for (let i = 0; i < title.length; i++) {
				resultado.push({
					title: title[i],
					info: desc[i],
					link: url[i]
				})
			}
			resolve({
resultado: resultado
			})
		})
		.catch(err => reject({code: 503, status: false, result: err }))
	})
}

/**
 * TextPro Scraper
 * @function
 * @param {String} url - Your phootoxy url, example https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html.
 * @param {String[]} text - Text (required). example ["text", "text 2 if any"]
 */

async function textpro(url, text) {
  if (!/^https:\/\/textpro\.me\/.+\.html$/.test(url))
    throw new Error("Url Salah!!");
  const geturl = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": "GoogleBot",
    },
  });
  const caritoken = await geturl.text();
  let hasilcookie = geturl.headers
    .get("set-cookie")
    .split(",")
    .map((v) => cookie.parse(v))
    .reduce((a, c) => {
      return { ...a, ...c };
    }, {});
  hasilcookie = {
    __cfduid: hasilcookie.__cfduid,
    PHPSESSID: hasilcookie.PHPSESSID,
  };
  hasilcookie = Object.entries(hasilcookie)
    .map(([name, value]) => cookie.serialize(name, value))
    .join("; ");
  const $ = cheerio.load(caritoken);
  const token = $('input[name="token"]').attr("value");
  const form = new FormData();
  if (typeof text === "string") text = [text];
  for (let texts of text) form.append("text[]", texts);
  form.append("submit", "Go");
  form.append("token", token);
  form.append("build_server", "https://textpro.me");
  form.append("build_server_id", 1);
  const geturl2 = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "GoogleBot",
      Cookie: hasilcookie,
      ...form.getHeaders(),
    },
    body: form.getBuffer(),
  });
  const caritoken2 = await geturl2.text();
  const token2 = /<div.*?id="form_value".+>(.*?)<\/div>/.exec(caritoken2);
  if (!token2) throw new Error("Token Tidak Ditemukan!!");
  const prosesimage = await post(
    "https://textpro.me/effect/create-image",
    JSON.parse(token2[1]),
    hasilcookie
  );
  const hasil = await prosesimage.json();
  const hassil = `https://textpro.me${hasil.fullsize_image}`
  const result = await getBuffer(hassil)
  return result
}
















module.exports = { 
  xvideos,
  wallpaper,
  pornhubserch,
  tiktok,
  kwai,
  getBuffer,
  Mp3v1,
  Mp4v1,
  ytSearch,
  pinterest,
  dafont,
  styletext,
  mediafirev1,
  textpro,
  xnxxsearch
}

const fs = require('fs')
const chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.cyan(`ALTERAÇÕES SALVAS ${__filename}`))
delete require.cache[file]
require(file)})