/* below given are default functions for the handler */
/* You can dynamically pass the handler functions */
class Handler {
	constructor(context, handlers){
      this._context = context;
      /* Add Dynamic Handlers */
      this.addHandler(handlers)
	}
    heartbeat(req, res) {
	 return res.send({msg:`Hello Service is Availible at ${new Date()}`});
	}
	/* Dynamic Handlers Extension */
	addHandler(handlers = {}){
       Object.keys(handlers).map(itr => {
          this[itr] = handlers[itr];
       })
       return true;
	}
}

export default Handler;