export class logger{
    logToConsole(msg, base){
        console.log('------------------Console Log(Message)----------------------');
        console.log(`${new Date().toLocaleString()}:${base}: ${msg}`);
        console.log('---------------------------------------------------');
    }

    logError(err, base){
        console.log('------------------Console Log(Error)----------------------');
        console.log(`${new Date().toLocaleString()}:${base}: ${err}`);
        console.log('---------------------------------------------------');
    }
}