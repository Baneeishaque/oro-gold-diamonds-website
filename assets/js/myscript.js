var baseurl = "http://orogolddiamonds.in/";
var adminurl = "http://adm.orogolddiamonds.in/";



$(document).ready(function() {
   if (window.location.href.indexOf("products") > -1) {
      var category_val = 0;
      var category_val_name = "All"; 
       bindproducts(category_val,category_val_name);
    }
});




/**Binding product Details**/
 function bindproducts(category_val,category_val_name) {     
      
      url = baseurl + "products/getproducts";
      data = {category_val : category_val};
      $.ajax({
          type: "POST",
          data: data,
          url: url,
          dataType: 'json',
          success: function(result) {
              var html = '';
              html = html + '<div class="col-md-12 pro-head">';
              html = html + '<h3>'+category_val_name+'</h3></div>';
              if($.trim(result))
              {
              $.each(result, function(key, val) {

                 html = html + '<a href="single/viewproduct/'+val.product_id+'/'+val.product_name+'" class="col-md-4 col-sm-6 inline-block position-relative text-center padding--up-2 collection-thumbnail  collection-thumbnail-thick-220-grams" >';
                 html = html + '<div class="image-container margin-bottom--up-3">';
                 html = html + '<img  src="'+adminurl+'upload/'+val.product_img+'" alt="Oro Gold and Diamonds" title="Oro Gold and Diamonds" class="max-one-whole" />';
                 html = html + '</div>';
                 html = html + '<h2 class="title-secondary-wide margin-bottom--down-1">'+val.product_name+'</h2>';
                 html = html + '<div class="button-outline">View</div>';
                   html = html + '</a>';

                  

              });
              }else
              {
                html = html + '<div class="col-md-12 pro-head"><h3>No product available<h3></div>';
              }
              html = html + '</div>';
              
              $("#productcontent").html(html);
          }
      });

  }
/**End Binding product Details**/


/**Enquiry form submission**/
$('#enquiry_form').submit(function(e){
e.preventDefault(); 
      var txtname = $("#txtname").val();
      var contactnumber = $("#contactnumber").val();
      var txtemail= $("#txtemail").val();
      var message = $("#message").val();
      var success_txtname = 1;
      var success_contactnumber = 1;
      var success_txtemail = 1;
      var success_message = 1;
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if(txtname=='')
      {
        $("#txtname").css({
        "border": "1px solid red",
      });
      success_txtname=0;
      }
      else
      {
        $("#txtname").css({
        "border": "rgba(255, 255, 255, 0.47)",
        "border-bottom": "1px solid rgba(255, 255, 255, 0.47)",
      });
      success_txtname=1;
      }
      if(contactnumber=='')
      {
        $("#contactnumber").css({
        "border": "1px solid red",
      });
      success_contactnumber = 0;
      }
      else
      {
        if(contactnumber.length!=10)
        {
      $("#contactnumber").css({
          "border": "1px solid red",
        });
        success_contactnumber = 0;
        }
        else
        {
          $("#contactnumber").css({
          "border": "rgba(255, 255, 255, 0.47)",
          "border-bottom": "1px solid rgba(255, 255, 255, 0.47)",
        });
        success_contactnumber = 1;
    }
      }
      if(txtemail=='')
      {
        $("#txtemail").css({
        "border": "1px solid red",
      });
      success_txtemail=0;
      }
      else
      {
        if (reg.test(txtemail) == false) 
        {
          $("#txtemail").css({
          "border": "1px solid red",
        });
        success_txtemail=0;
        }else
        {
          $("#txtemail").css({
          "border": "rgba(255, 255, 255, 0.47)",
          "border-bottom": "1px solid rgba(255, 255, 255, 0.47)",
        });
        success_txtemail=1;
    }
      }
      if(message=='')
      {
        $("#message").css({
        "border": "1px solid red",
      });
      success_message = 0;
      }
      else
      {
        $("#message").css({
        "border": "rgba(255, 255, 255, 0.47)",
        "border-bottom": "1px solid rgba(255, 255, 255, 0.47)",
      });
      success_message=1;
      }
      if (success_txtname==1 && success_txtemail==1 && success_message==1 && success_contactnumber==1) {
     $.ajax({
         url: baseurl + 'contact/enquiry',
         type:"POST",
         data:new FormData(this),
         processData:false,
         contentType:false,
         cache:false,
         async:false,
         success: function(result){
        if (result !== 0) 
        {                 
        toastr.success('Enquiry has been send..!');
        $("#txtname").val('');
          $("#contactnumber").val('');
          $("#txtemail").val('');
          $("#message").val('');
        }
        else
      {
          toastr.error('Server Error');
      }
     }
     });
   }
});
/**End Enquiry form submission**/

function mobilevalidation(textbox, e) {

  var charCode = (e.which) ? e.which : e.keyCode;
  if (charCode == 46 || charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
  } else {
      return true;
  }
}