$("#doctor_signup_btn").prop('disabled', true);


$.post( api_url+"get_doctor_details.php", { func:"language_known"})
     .done(function(data){
        //alert(data);
        data = JSON.parse(data);
        var lang_html_str="";
        for(var key in data.data)
        {
        	lang_html_str +='<div class="form-check-inline">';
			lang_html_str +='<label class="form-check-label">';
			lang_html_str +='<input type="checkbox" class="form-check-input" name="lang[]" value="'+data.data[key]['id']+'" checked>'+ data.data[key]['title'];
			lang_html_str +='</label>';
			lang_html_str +='</div>';

           $("#lang_html").html(lang_html_str);
        }
        $("#doctor_signup_btn").prop('disabled', false);
    })

$("#doctor_signup_form").submit(function(e){
	e.preventDefault();
	$("#doctor_signup_btn").prop('disabled', true);
	$(".alert-warning").show();
	$(".alert-success").slideUp();
	$(".alert-danger").slideUp();

	if($('#lang_html :checkbox:checked').length > 0)
	{
		var formdata = new FormData($('#doctor_signup_form')[0]);

		$.ajax({
         url         : api_url+"get_doctor_details.php",
         data        : formdata,// ? formdata : $("#form_sample_1").serialize(),
         cache       : false,
         contentType : false,
         processData : false,
         enctype: 'multipart/form-data',
         type        : 'POST',
         success     : function(data, textStatus, jqXHR){
           console.log(data)
            data = JSON.parse(data);
           	if(data.success)
		    {
		    	$("#doctor_signup_form input").val("");

		    	//$("#form_without_otp").slideUp();
		    	//$("#form_otp").slideDown();
		    	$(".bottom").hide();
		    	//$("#generated_otp").val(data.code);
		    	$("#insert_doctor_id").val(data.insert_doctor_id);
		    	console.log(data.otp_generate_reply);
		    	//$("#otp_details").val(data.otp_generate_reply.Details);
		    	$(".alert-success").html("<strong>Success:</strong>"+ data.msg).slideDown();
				//$("#succ_login_redirect").show();
		    	setTimeout(function(){
				    $(".alert-danger").slideUp();
				    $(".alert-success").slideUp();
				    window.location.href="login-doctor26.html";
				}, 3000);
		    }
		    else
		    {
		    	$(".alert-danger").html("<strong>Error:</strong>"+ data.msg).slideDown();
		    	$("#user_login_password").val("");	    	
		    	$("#doctor_signup_btn").prop('disabled', false);
		    	setTimeout(function(){
				   $(".alert-danger").slideUp();
				}, 3000);
		    }
		    $(".alert-warning").hide();
         }
      });
	}
	else
	{
		$(".alert").hide();
		$(".alert-danger").html("<strong>Error:</strong> Please select known languages.").slideDown();
		$("#doctor_signup_btn").prop('disabled', false);
	}
}) 

$("#otp_validation_btn").click(function(){
	$("#otp_validation_btn").hide();
	insert_doctor_id = $("#insert_doctor_id").val();
	otp_details = $("#otp_details").val();
	$.post( api_url+"get_doctor_details.php", 
		{ 
			func:"validate_otp", 
			doctor_id:insert_doctor_id,
			otp_details:otp_details ,
			d_otp: $("#d_otp").val()
		})
     		.done(function(data){
        		console.log(data);
        		data = JSON.parse(data);
        		if(data.success)
		    	{
		    		$(".alert-success").html("<strong>Success:</strong> Verification Successful. Please Wait for the admin approval...</strong>").slideDown();
		    		$("#succ_login_redirect").show();		    		
		    		$("#form_otp").hide();
		    	}
		    	else
		    	{
		    		$(".alert-danger").html("<strong>Error: Please try again later.</strong>").slideDown();
					setTimeout(function(){
					    $(".alert-danger").slideUp();
					    $("#otp_validation_btn").show();
					}, 3000);
		    	}
    		})
})

/*$("#d_otp").keyup(function(){
	if($("#d_otp").val().length >= 4)
	{
		if($("#generated_otp").val() == $("#d_otp").val())
		{
			$(".alert-warning").html("<strong>Please Wait...: System is processing. </strong>").slideDown();
			$.post( api_url+"get_doctor_details.php", { func:"activate_doctor", doctor_id:$("#insert_doctor_id").val()})
     		.done(function(data){
        		//alert(data);
        		data = JSON.parse(data);
        		if(data.success)
		    	{
		    		$(".alert-success").html("<strong>Success: Registration Successful. Please Wait...</strong>").slideDown();
		    		setTimeout(function(){
					   window.location.href="login-doctor26.html";	
					}, 3000);		    		
		    	}
		    	else
		    	{
		    		$(".alert-danger").html("<strong>Error: Please try again later.</strong>").slideDown();
					setTimeout(function(){
					    $(".alert-danger").slideUp();
					}, 3000);
		    	}
    		})
			
		}
		else
		{
			$(".alert-danger").html("<strong>Error: Wrong OTP.</strong>").slideDown();
			setTimeout(function(){
			    $(".alert-danger").slideUp();
			}, 3000);
		}
	}
})*/

// $("#doctor_signup_form input").focus(function(){
// 	$(".bottom").hide();
// })

// $("#doctor_signup_form input").focusout(function(){
// 	$(".bottom").show();
// })