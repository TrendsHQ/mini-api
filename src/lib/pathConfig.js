class PathConfig {
   constructor(handler, context, logger, routes){
   	 this.cntrlr = handler;
   	 this.routes = this.defaultConfig();
   	 this._context = context;
   	 this.logger = logger;
   	 this.addRoutes(routes);

   }
   addRoutes(routes){
   	routes.map(itr => this.routes.push(itr))
   	this.routes.map(itr => {
   		this.logger(`${new Date()}: Route Injection: ${itr.method.toUpperCase()}${itr.route}`);
   		let args = [itr.route];
   		itr.handler.map(fun => {
   			args.push(this.cntrlr['auth'] || this._context._SERVICES._INSTANCES_['AUTH']._authenticate);
   			args.push(this.cntrlr[fun])
   		});
   		this._context[itr.method].apply(this._context, args);
   	});
   }
   extendRouteConfig(rConfig, controller = this.cntrlr.debug){
    rConfig.handler = controller;
   	this.routes.push(rConfig);
   }
   defaultConfig(){
   	return [
		{
			route: '/',
			method: 'get',
			handler: ['heartbeat']
		}
	]
   }
}

export default PathConfig;