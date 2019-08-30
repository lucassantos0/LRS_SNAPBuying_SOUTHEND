(function(){function LogErrors(event,feature){this.event=event||window.event;this.feature=feature||'';}
LogErrors.prototype.logToEndpoint=function(){var xhr=new XMLHttpRequest();var errorData=JSON.stringify({feature:this.feature,message:'Error Message: "'+this.event.message+'"'
+'\nLine Number: '+this.event.lineno
+'\nURL: '+this.event.target.location.href
+'\nFile: '+this.event.filename,});var params='error='+encodeURIComponent(errorData);xhr.onreadystatechange=function(){if(xhr.readyState===4&&xhr.status===200){console.log('The JavaScript errors have successfully been reported.');}}
xhr.open('POST','https://public-api.wordpress.com/rest/v1.1/js-error',true);xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');xhr.send(params);};var handleInitialError=function(event){if(event.message&&0===event.message.toLowerCase().indexOf('script error')&&!event.filename){return;}
var errors=new LogErrors(event,'h4_js_errors');errors.logToEndpoint();window.removeEventListener('error',handleInitialError);};window.addEventListener('error',handleInitialError);})();