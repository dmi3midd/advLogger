# extLogger
A good solution for logging. Supports logging to Telegram and files, and console outputs.


## Get started
```
npm i extlogger
```  
```js
const Logger = require('extLogger');
const logger = new Logger(options);
```
Options must contain:   
```isConsole``` - setting this to ```true``` enables console output for logs;  

```pathToLogs``` - path to logs file where you would like to log;  

```token``` - the token of the Telegram bot that will send you logs;  

```chatId``` - the id of the chat where logs will be delivered;  


```js
const options = {
  isConsole: true,
  pathToLogs: 'C:/user/dir1/dir2/logs.txt',
  token: 'your token',
  chatId: 0000000000
}
```


## Usage
General log method has 2 args: ```messsage``` and ```payload```(by default - ```undefined```)  
```js
logger.start("log message", {data: 1});
// The event() function takes an event argument
logger.event("log message", "some event", {data: 2});
```
Output for in the file:  

```[time] [level] [?prefix] [message] [?payload] [event]```  

You can set prefix for logs(by default - ```undefined```):
```js
logger.setPrefix('prefix');
logger.setPrefix(undefined); // To reset prefix
```
You can set the levels that are available for use(by default, all levels are enabled):
```js
logger.setLevel(level, isEnabled);
// Example
logger.info("info msg", false);
```
You can disable or enable logger:
```js
logger.disable(); 
logger.enable();
```


## API
```start()```  
```end()```  
```success()```  
```failure()```  
```info()```  
```warn()```  
```error()```  
```debug()```  
```event()```  
```setPrefix()```  
```setLevel()```  
```enable()```  
```disable()```   


## LICENSE
MIT