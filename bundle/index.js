function _assert_this_initialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return self}function _class_call_check(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _create_class(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}function _get_prototype_of(o){_get_prototype_of=Object.setPrototypeOf?Object.getPrototypeOf:function getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)};return _get_prototype_of(o)}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function")}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_set_prototype_of(subClass,superClass)}function _possible_constructor_return(self,call){if(call&&(_type_of(call)==="object"||typeof call==="function")){return call}return _assert_this_initialized(self)}function _set_prototype_of(o,p){_set_prototype_of=Object.setPrototypeOf||function setPrototypeOf(o,p){o.__proto__=p;return o};return _set_prototype_of(o,p)}function _type_of(obj){"@swc/helpers - typeof";return obj&&typeof Symbol!=="undefined"&&obj.constructor===Symbol?"symbol":typeof obj}function _is_native_reflect_construct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(e){return false}}function _create_super(Derived){var hasNativeReflectConstruct=_is_native_reflect_construct();return function _createSuperInternal(){var Super=_get_prototype_of(Derived),result;if(hasNativeReflectConstruct){var NewTarget=_get_prototype_of(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else{result=Super.apply(this,arguments)}return _possible_constructor_return(this,result)}}var g=Object.defineProperty;var S=function(h,a,c){return a in h?g(h,a,{enumerable:!0,configurable:!0,writable:!0,value:c}):h[a]=c};var o=function(h,a){return g(h,"name",{value:a,configurable:!0})};var i=function(h,a,c){return S(h,(typeof a==="undefined"?"undefined":_type_of(a))!="symbol"?a+"":a,c)};System.register(["./core.js"],function(h,a){"use strict";var c,d;return{setters:[function(p){c=p.P,d=p.C}],execute:o(function(){var l=function(){function l(e,t){var _this=this;_class_call_check(this,l);i(this,"options");i(this,"performance");i(this,"isRunning",!1);i(this,"checkTimer");i(this,"fpsHistory");i(this,"actualFPS",0);i(this,"start",o(function(){_this.isRunning||(_this.isRunning=!0,_this.checkTimer=_this.options.CheckInterval,_this.fpsHistory=[])},"start"));i(this,"stop",o(function(){_this.isRunning&&(_this.isRunning=!1,_this.options.OnlyUpdateWhenSwitchScene&&_this.checkFps())},"stop"));i(this,"postStep",o(function(e){_this.isRunning&&(_this.checkTimer-=e,!(_this.checkTimer>0)&&(_this.checkTimer+=_this.options.CheckInterval,_this.fpsHistory.push(_this.actualFPS),_this.options.OnlyUpdateWhenSwitchScene||_this.fpsHistory.length>=5&&_this.checkFps()))},"postStep"));this.options=t,this.performance=e}_create_class(l,[{key:"checkFps",value:function checkFps(){if(this.fpsHistory.length===0)return;var e=!1;this.options.AutoUpgradeQuality&&this.isHighFps()&&(e=this.performance.upgradeGraphicsQuality()),this.isLowFps()&&(e=this.performance.downgradeGraphicsQuality()),e&&(this.fpsHistory=[])}},{key:"getFpsMedian",value:function getFpsMedian(){return this.getMedian(this.fpsHistory)}},{key:"getMedian",value:function getMedian(e){if(e.length===0)return NaN;var t=e.sort(function(r,n){return r-n}),s=Math.floor(t.length/2);return t.length%2===0?(t[s-1]+t[s])/2:t[s]}},{key:"isLowFps",value:function isLowFps(){return this.getFpsMedian()<this.options.FpsThreshold}},{key:"isHighFps",value:function isHighFps(){return this.getFpsMedian()>this.options.FpsThreshold*1.2}}]);return l}();o(l,"FpsTracker");var p=l;var f=function(_c_Plugins_BasePlugin){_inherits(f,_c_Plugins_BasePlugin);var _super=_create_super(f);function f(){_class_call_check(this,f);var _this;_this=_super.call.apply(_super,[this].concat(Array.prototype.slice.call(arguments)));i(_assert_this_initialized(_this),"enabled",!1);i(_assert_this_initialized(_this),"quality");i(_assert_this_initialized(_this),"fpsTracker");i(_assert_this_initialized(_this),"pixelRatio");i(_assert_this_initialized(_this),"trackingSceneNames",[]);i(_assert_this_initialized(_this),"trackingScene",o(function(t){if(_this.trackingSceneNames.indexOf(t)<0){console.warn("\uD83D\uDEAB Adaptive performance: ".concat(t," is not configured"));return}_this.stopFPSTracker(),_this.startFPSTracker(),console.info("\uD83D\uDCC8 Adaptive performance: tracking ".concat(t))},"trackingScene"));i(_assert_this_initialized(_this),"startFPSTracker",o(function(){_this.fpsTracker.start()},"startFPSTracker"));i(_assert_this_initialized(_this),"stopFPSTracker",o(function(){_this.fpsTracker.stop()},"stopFPSTracker"));return _this}_create_class(f,[{key:"configure",value:function configure(t){var s=t.Enabled,r=t.Quality,n=t.Options,y=t.TrackingSceneNames;this.enabled=s,this.quality=r,this.pixelRatio=window.devicePixelRatio,this.trackingSceneNames=y,this.createFPSTracker(n)}},{key:"getCurrentQuality",value:function getCurrentQuality(){return this.pixelRatio}},{key:"downgradeGraphicsQuality",value:function downgradeGraphicsQuality(){var _this_quality=this.quality,t=_this_quality.Min,s=_this_quality.AdjustStep,r=this.pixelRatio;if(r<=t)return!1;var n=+(r-s).toFixed(2);return n<t?!1:(this.pixelRatio=n,this.resizeGameWorld(this.pixelRatio),console.warn("\uD83D\uDCAB Graphics quality was downgraded! (".concat(r," -> ").concat(n,")")),!0)}},{key:"upgradeGraphicsQuality",value:function upgradeGraphicsQuality(){var _this_quality=this.quality,t=_this_quality.Max,s=_this_quality.AdjustStep,r=this.pixelRatio;if(r>=t)return!1;var n=+(r+s).toFixed(2);return n>t?!1:(this.pixelRatio=n,this.resizeGameWorld(this.pixelRatio),console.warn("\uD83D\uDE80 Graphics quality was upgraded! (".concat(r," -> ").concat(n,")")),!0)}},{key:"createFPSTracker",value:function createFPSTracker(t){this.fpsTracker=new p(this,t)}},{key:"event",get:function get(){return this.game.event}},{key:"resizeGameWorld",value:function resizeGameWorld(t){var s={forcePixelRatio:t};this.event.emit(d.REQUEST_RESIZE_GAME,s)}},{key:"updatePostStepDeltaTime",value:function updatePostStepDeltaTime(t){this.fpsTracker.postStep(t)}},{key:"updateActualFPS",value:function updateActualFPS(t){this.fpsTracker.actualFPS=t}}]);return f}(c.Plugins.BasePlugin);o(f,"AdaptivePerformancePlugin");var u=f;var k=h("default",u)},"execute")}});