import { ChromeMessage, Sender } from "../types";

const messagesFromReactAppListener = (message: ChromeMessage, sender: { id: string; }, response: (arg0: string) => void) => {
    console.log('[content.js]. Message received', {
        message,
        sender,
    })

    if (
        sender.id === chrome.runtime.id &&
        message.from === Sender.React &&
        message.message === 'Hello from React') {
        response('Hello from content.js');
    }

    if (
        sender.id === chrome.runtime.id &&
        message.from === Sender.React &&
        message.message === "delete logo") {

        const logo = document.getElementById('hplogo');
        logo && logo.parentElement && logo.parentElement.removeChild(logo)
    }
}


/**
 * Fired when a message is sent from either an extension process or a content script.
 */
// @ts-ignore
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);