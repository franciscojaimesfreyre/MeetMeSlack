'use strict';

const agent = require('superagent');

const jitsiUrl = 'https://meet.jit.si/';

/**
 * Returns new room link
 */
function getNewRoomLink() {
    return jitsiUrl+genRandomString(15);
}


/**
 * Generates random string
 */
function genRandomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

/**
 * Sends provided payload to Slack
 * @param payload - JSON response.
 * @param responseUrl - respond to the channel that made the request.
 */
function postSlackResponse(payload, responseUrl) {
    return agent.post(responseUrl).send(JSON.stringify(payload));
}

module.exports = {getNewRoomLink, postSlackResponse};
