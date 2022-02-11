const axios = require('axios');

const isSpan = async (content, spamLinkDomains, redirectionDepth) => {
    let url, html, answer;

    for (let i = 0; i < redirectionDepth; i++) {
        url = content.match(
            /(?:(?:(https?|ftp|telnet):\/\/|[\s\t\r\n\[\]\`\<\>\"\'])((?:[\w$\-_\.+!*\'\(\),]|%[0-9a-f][0-9a-f])*\:(?:[\w$\-_\.+!*\'\(\),;\?&=]|%[0-9a-f][0-9a-f])+\@)?(?:((?:(?:[a-z0-9\-가-힣]+\.)+[a-z0-9\-]{2,})|(?:[\d]{1,3}\.){3}[\d]{1,3})|localhost)(?:\:([0-9]+))?((?:\/(?:[\w$\-_\.+!*\'\(\),;:@&=ㄱ-ㅎㅏ-ㅣ가-힣]|%[0-9a-f][0-9a-f])+)*)(?:\/([^\s\/\?\.:<>|#]*(?:\.[^\s\/\?:<>|#]+)*))?(\/?[\?;](?:[a-z0-9\-]+(?:=[^\s:&<>]*)?\&)*[a-z0-9\-]+(?:=[^\s:&<>]*)?)?(#[\w\-]+)?)/g
        )[0];
        html = await axios.get(url).then(function (response) {
            return response.data;
        });
        content = html;
        answer = html.includes(spamLinkDomains);
    }

    return answer;
};

module.exports = {
    spamCheck: async (req, res) => {
        if (req.method === 'POST') req.query = req.body;

        const payload = req.query;
        const content = payload.content;
        const spamLinkDomains = payload.spamLinkDomains;
        const redirectionDepth = payload.redirectionDepth;
        const result = await isSpan(content, spamLinkDomains, redirectionDepth);

        res.send({ result });
    },
};
