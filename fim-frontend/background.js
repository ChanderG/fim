/*
On startup, connect to the fim-backend.
*/
var port = browser.runtime.connectNative("fim_backend");

/*
Listen for messages from the app.
*/
port.onMessage.addListener((response) => {
  console.log("Received: " + response);

  if(response.indexOf("switch-tab") === 0){
    // parse out the number and switch
    browser.tabs.update(Number(response.split(' ')[1]), {
      active: true
    });
  }
});

/*
On a click on the browser action, send the app a message.
*/
browser.browserAction.onClicked.addListener(() => {
  console.log("Sending:  ping");
  port.postMessage("ping");
});

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
    port.postMessage(msgString);
  });
}

/*
 * Key bindings
 */
browser.commands.onCommand.addListener((command) => {
  console.log("onCommand event received for message: ", command);

  switch(command) {
    case 'switch-tab':
      switchTab()
  }
});
