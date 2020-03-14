(function($){
   $.fn.innerText = function(msg) {
         if (msg) {
            if (document.body.innerText) {
               for (var i in this) {
                  this[i].innerText = msg;
               }
            } else {
               for (var i in this) {
                  this[i].innerHTML.replace(/&lt;br&gt;/gi,"n").replace(/(&lt;([^&gt;]+)&gt;)/gi, "");
               }
            }
            return this;
         } else {
            if (document.body.innerText) {
               return this[0].innerText;
            } else {
               return this[0].innerHTML.replace(/&lt;br&gt;/gi,"n").replace(/(&lt;([^&gt;]+)&gt;)/gi, "");
            }
         }
   };
})(jQuery);

if ($("#html").length) {
  // add the button
  var $input = $('<a href="#" class="btn btn-main-teal run_code spinner " id="validate-html"><i class="icon-check icon-white"></i><span class="run-button-text">Validate HTML</span></a>');
  $input.insertBefore($("a#stop"));
  $("a#validate-html").click(function() {

    // emulate form post
    var formData = new FormData();
    formData.append('out', 'json');
    formData.append('content', $("div.ace_content").innerText().replace(/\u00a0/g," "));

    // make ajax call
    $.ajax({
        url: "https://html5.validator.nu/",
        data: formData,
        dataType: "json",
        type: "POST",
        processData: false,
        contentType: false,
        success: function(data) {
	 $("ol.error-container").empty();
	 if (data.messages.length == 0) {
		$("div.error-box").hide();
	 } else {
		$("div.error-box").show();
	 }
	  data.messages.forEach (function (message) {
	    $("ol.error-container").append("<li>" + 
		message.type + 
		" at  line " + 
		message.lastLine + 
		": " +
		message.message +
		"</li>"); 
	  });
        },
        error: function() {
           console.warn(arguments);
        }
    });
  })
}
