
# MeetMeSlack
Slack integration with Jitsi Meet

## Key Features:
- Post a random room from [Jitsi meet](https://meet.jit.si/) to any given Slack channel in your workspace.
- Before posting to a slack channel, *only the person who invoked it* can:
    - Shuffle for another room link.
    - Cancel sending the room link to the channel.
    - Send the current room link to the channel for everyone to use it.

## Local development
Use ngrok (https://api.slack.com/tutorials/tunneling-with-ngrok) to test commands locally.

## Slash Commands
This works in all channels, within Slack Integration Choose Slash Command.

Create a new slash command.

- Clone the repo yourself and upload the Node.js app to your own private webserver and configure like it.

Once added, when you call `/meetme`, you will be presented with following options visible only to yourself:
- *Send*
- *Reshuffle*
- *Cancel*
