jQuery.cookie=function(key,value,options){if(arguments.length>1&&(value===null||typeof value!=="object")){options=jQuery.extend({},options);if(value===null){options.expires=-1;}
if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setDate(t.getDate()+days);}
return(document.cookie=[encodeURIComponent(key),'=',options.raw?String(value):encodeURIComponent(String(value)),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''));}
options=value||{};var result,decode=options.raw?function(s){return s;}:decodeURIComponent;return(result=new RegExp('(?:^|; )'+encodeURIComponent(key)+'=([^;]*)').exec(document.cookie))?decode(result[1]):null;};;;(function($){var versionParts=$.ui.version.split('.');var majorVersion=parseInt(versionParts[0]);var minorVersion=parseInt(versionParts[1]);if((majorVersion>1)||(majorVersion===1&&minorVersion>=13)){return;}
var fnOriginalPosition=$.fn.position;$.fn.extend({'position':function(options){if(typeof options==='undefined'){return fnOriginalPosition.call(this);}
var target=typeof options.of==="string"?$(document).find(options.of):$(options.of);options.of=(target[0]===undefined)?null:target;return fnOriginalPosition.call(this,options);}});})(jQuery);;;