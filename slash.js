const {getNewRoomLink, postSlackResponse} = require('./integrations');
const {getAction, getUserId, shuffleCallbackId} = require('./slackUtils');

async function handleInitialRequest(req) {
    const roomLink = getNewRoomLink();

    const body = req.body || req;
    const botPayload = {
        channel: body.channel_id,
        text: getUserId(body) + 'Select a room link to *Send*',
        mrkdwn: true,
        attachments: [
            {
                text: roomLink,
                attachment_type: 'default',
                callback_id: shuffleCallbackId,
                actions: [getAction('Send', 'primary', roomLink), getAction('Reshuffle'), getAction('Cancel', 'danger')]
            }
        ]
    };

    return postSlackResponse(botPayload, body.response_url);
}

function handleSendRequest(payload) {
    const roomLink = payload.actions[0].value;
    const botPayload = {
        response_type: 'in_channel',
        channel: payload.channel_id,
        replace_original: false,
        delete_original: true,
        text: getUserId(payload) + 'using /meetme',
        attachments: [
            {
                text: roomLink,
            }
        ]
    };
    return postSlackResponse(botPayload, payload.response_url);
}

function handleCancelRequest(payload) {
    return postSlackResponse({delete_original: true}, payload.response_url);
}

async function handleShuffleActionRequest(payload) {
    const action = payload.actions[0];
    if (action.name === 'send') {
        await handleSendRequest(payload);
    } else if (action.name === 'reshuffle') {
        await handleInitialRequest(payload);
    } else if (action.name === 'cancel') {
        await handleCancelRequest(payload);
    }
}

module.exports = async function(req, res) {
    try {
        if (req && req.body && req.body.payload) {
            const payload = JSON.parse(req.body.payload);
            await handleShuffleActionRequest(payload);
        } else {
            await handleInitialRequest(req);
        }
    } catch (err) {
        console.error(err.stack);
        await postSlackResponse(
            {
                response_type: 'ephemeral',
                text: 'Sorry, that didnt work. Please try again.',
                channel: req.body.channel_id
            },
            req.body.response_url
        );
    }
    return res.status(200).end();
};
