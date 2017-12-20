/*
On startup, connect to the fim-backend.
*/
var port = browser.runtime.connectNative("fim_backend");

/*
Listen for messages from the app.
*/
port.onMessage.addListener(responseCallback);

function responseCallback(response) {
  console.log("Received: " + response);

  if(response.indexOf("switch-tab") === 0){
    // parse out the number and switch
    browser.tabs.update(Number(response.split(' ')[1]), {
      active: true
    });
  }

  if(response.indexOf("search") === 0){
    // if no arguments
    if (response === "search ") return;
    let url = "http://www.duckduckgo.com/?q=" + response.split(' ')[1]
    browser.tabs.create({url: url})
  }

  if(response.indexOf("history") === 0){
    // if no arguments
    if (response === "history ") return;
    browser.tabs.create({url: response.split(' ')[1]})
  }
}

/*
On a click on the browser action, send the app a message.
*/
browser.browserAction.onClicked.addListener(() => {
  console.log("Sending:  ping");
  port.postMessage("ping");
});

function onError(error) {
  console.log(`Error: ${error}`);
}

/*
 * Switch Tab function.
 */
const switchTab = () => {
  browser.tabs.query({currentWindow: true}).then((tabs) => {
    let msgString = "switch-tab\n";
    for(let tab of tabs){
      if (!tab.active) {
	msgString += tab.id;
	msgString += " | "
	msgString += tab.title;
	msgString += " | "
	msgString += tab.url;
	msgString += "\n"
      }
    }
    console.log("Prepared message to backend: ", msgString)
    port.postMessage(msgString);
  });
}

const search = () => {
  let msgString = "search";
  port.postMessage(msgString);
}

const history = () => {
  let msgString = "history";
  port.postMessage(msgString);
}

/*
 * Key bindings
 */
browser.commands.onCommand.addListener((command) => {
  console.log("onCommand event received for message: ", command);

  switch(command) {
    case 'switch-tab':
      switchTab()
      break;
    case 'search':
      search();
      break;
    case 'history':
      history();
      break;
  }
});
