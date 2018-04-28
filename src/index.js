import express from 'express';
import debug from 'debug';
import Handler from './lib/handler';
import Config from './lib/pathConfig';

class Server {
	constructor(Context = express(), Port = 3000, debugMode = false, logger = debug('zlogjs:mini-api'), Handlers = {}, routes = []){
	  this._context =  Context;
	  this._context.logger = logger;
	  this._started = false;
	  this._port = Port;
	  this.logger = logger;
	  this.debugMode = debugMode;
	  // const SM = new ServiceManager(this._context)
	  this.pathManager = new Config(
	  	new Handler(this._context, Handlers), 
	  	this._context,
	  	logger,
	  	routes
	  );
	  this.Start();
	}
	Start(){
	   const self = this;
	   self._context.listen(self._port, () => {
	   	self._started = true;
	   	self.Status()
	   });
	}
    Status(){
	 if(!this._started) {
	  	this.log('Server is not running yet');
	 } else {
	    this.log(`http://${require('os').networkInterfaces()['enp2s0'][0].address}:${this._port}`);
	 }
	}
	log(msg = 'null'){
	  if(this.debugMode) {
         this.logger(`${new Date()}: ${msg}`);
	  }
	}
}
export default Server;
