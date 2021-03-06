var selectedbooks=new Array();
var parallelbooks=new Array();
var console=console||{}; //make console not break on ie
//console.log=console.log||function(){};//turn this on for dev
//console.log=function(){}; //turn off log before prod build

var eventType = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent) ) ? 'touchend' : 'click';

$('#books').on(eventType, function(e) {
searchBible();
});
/*
$('#dictionaries').on(eventType, function(e) {
	console.log("doing search dic");
	searchDictionary();
});
*/

function ctx(){
	return "/"+window.location.pathname.split('/')[1]+"/";
}
function dailydevotion(book){
$.ajax({
  type: "POST",
  url: ctx()+"devotion",
  data: { devotion: book}
})
  .done(function( msg ) {
   updateForm(msg);
  });
}
function updateChaptersperbible(bible){

$.ajax({
  type: "POST",
  url: ctx()+"getChaps",
  data: { bible: bible}
})
  .done(function( msg ) {
	//console.log("data from updateChatpersperbible");
	//console.log(msg);
   updateChaptersbybook(bible,msg);
  });
}
function addBooks(selected){
        var len=selectedbooks.length;
	console.log("selected :"+selected);
	console.log("existing selected books:"+selectedbooks);
        if (len<3&&selected.length>0){
        var index=selectedbooks.indexOf(selected);
        if (index==-1){
                selectedbooks.push(selected);
        }
        }
	console.log("After Add selected books:"+selectedbooks);
}
function removeBooks(selected){
        var index=selectedbooks.indexOf(selected);
        if (index!=-1){
                selectedbooks.splice(index,1);
        }
}
function flipBooks(selected){
        var mainbook=getBook();
	if (mainbook==selected){
	console.log("main book equals selected. ignore parallel add");
	}else{
	console.log("current parallel book:"+parallelbooks);
	console.log("selected:"+selected);
        var index=parallelbooks.indexOf(selected);
        if (index==-1){
        	var len=parallelbooks.length;
		if(len<4) parallelbooks.push(selected);
            }else{
  		parallelbooks.splice(index, 1);
		}
	}
	console.log("flip after add selected:"+parallelbooks);
}
function flip_parallel(){
	console.log("-----flip_parallel------");
        flipBooks(getParallel());
        locate();
        }
function pick_parallel(){
	console.log("flip_parallel");
        addBooks(getParallel());
        locate();
        }
function unpick_parallel(){
        removeBooks(getParallel());
     locate();
        }
function getBooks(){
        var mainbook=getBook();
  	var parallel=  parallelbooks;
  	var commentary=  $('#commentaries').val();
	var bk=mainbook;
	console.log("main:"+mainbook+" parallel:"+parallel +" commentar:"+commentary);
	if(parallel.length>=1)bk=bk+","+parallel;
	if(commentary.length>1)bk=bk+","+commentary;
	console.log("book...:"+bk);
	return bk
}
function getDictionary()
{
  return $("#dictionaries").val();
}
function getCommentary()
{
  return $("#commentaries").val();
}
function getParallel()
{
	console.log("paral:"+ $("#parallels").val());
  return $("#parallels").val();
}

function searchBible(){
    var bible=$('#books').val()  ;
    var key=$('#keyword').val();
    if (key){
$.ajax({
  type: "POST",
  url: ctx()+"searchBible",
  data: { bible: bible, key: key }
})
  .done(function( msg ) {
    updateForm(msg);
  });

    }else{
        locate()               ;
    }
}

function displayBible(reference){
 var bible="ChiUns";
//console.log(reference);
$.ajax({
  type: "POST",
  url: ctx()+"display",
  data: { bible: bible, key: reference,start:0,limit:500}
})
  .done(function( msg ) {
	//console.log(msg);
    updateAuxForm(msg);
  });
}

function locate(){
  var bible=getBooks();
   console.log("books to retrive:"+bible);
  var reference=$('#reference').val();

console.log("locate ref:"+reference);
console.log("localte bible:"+bible);
console.log("locate ref:"+reference);
$.ajax({
  type: "POST",
  url: ctx()+"/display",
  data: { bible: bible, key: reference,start:verseStart,limit:verseLimit}
})
  .done(function( msg ) {
	//console.log(msg);
    updateForm(msg);
  });
}
  function setInfo(msg){
  $('#info').html(msg);
  }
  function updateAuxForm(e){
	//console.log(e);
      if(e.data){
      $('#auxform').html(e.data);
      $('#auxform_modal').modal('show');
   //showLayer('closeaux') ;
      }
}
  function updateForm(result){
      if(result.data){

      $('#liveform').html(result.data);
      }
      if(result.verses){

      $('#reference').val(result.verses);
      }
      if( result.total){

        $('#total').val(result.total);
        $('#total').html(result.total);
      }
  }
 function openwin(e){
    $('#pptSelect').val("");
	var ptf="/static/ppt/"+e.data;
          setInfo("<a href=\""+ptf+"\">Download PowerPoint Here</a>") ;
          popup(ptf, "PowerPoint") ;

  }

function popup(mylink, windowname)
{
if (!window.focus)return true;
var href;
if (typeof(mylink) == 'string')
   href=mylink;
else
   href=mylink.href;
window.open(href, windowname, ',type=fullWindow,fullscreen,scrollbars=yes');
return false;
}

 function updateReference(e){
      var fom=$('#reference');
      fom.html(e.responseText);
  }
var verseStart=0           ;
var verseLimit=10           ;
function prev()
{
        verseStart=verseStart-verseLimit;
        if (verseStart<0){
                verseStart=0;
        }
    return page( verseStart)  ;

}
function nextstep()
{

    var total=$('#total').val();
        if (verseStart<0){
            verseStart=0   ;
        }
        verseStart=verseStart+verseLimit;
        if (verseStart>total){
                verseStart=0;
        }
//console.log("nextstep:"+verseStart);
  return   page( verseStart)  ;

}
function page(startv){
var book=getBooks();
  var ref  = $('#reference').val();
//console.log("page:"+book+" "+ref);
  if (book && ref)
  {
    getOsis(book, ref, startv,verseLimit);
      return true;
  }
    return false;
}
function getOsis(bible,ref,start,limit){
//console.log("in getOSIS :"+bible);
//console.log(ref);
$.ajax({
  type: "POST",
  url: ctx()+"getOsis",
  data: { bible: bible, reference: ref,start:start,limit:limit}
})
  .done(function( msg ) {
    updateForm(msg);
  });
}
function getBook()
{
  var bk=$('#books').val();
        if(!bk){
        bk='ChiUns';
        setBook(bk);
        }
	//console.log("getBook:"+bk);
        return bk;
}
function setBook(data){
    $('#books').val(data);
    return false;
}
 function setPassage(data){
 $('#reference').val(data);
     locate();
     return false;
 }
 function handlePassage(data){
 $('#reference').val(data);
     locate();
     return false;
 }
function updateChapters(data)
{
//console.log("data:"+data);
  var bk=$('#chapters');
       var dd=data;
   
  $('#chapters').options=[];
  $('#chapters').options[0] = new Option("All Chapters",0);
 var chps=""
    var book=$('#bibles').val();
for (i = 0; i < dd.nchaps; i++) {
  var newOption = document.createElement("OPTION");
  newOption.text=1+i;
  newOption.value=1+i;
  $('#chapters').options[i] = new Option(newOption.text,newOption.value);
  chps=chps+ "<button onclick='readChap(&quot;"+book +" "+(1+i) +"&quot;);'>"+(1+i)+"</button>";

}
 $('#chapters').length = dd.nchaps+1;
 $('chaps').html(chps);
}

function updateChaptersbybookx(bible,data)
{
  var bk=$('#chapters');
       var dd=data;
  $('#chapters').options =[];
  $('#chapters').options[0] = new Option("All Chapters",0);
 var chps=""
    var book=bible;
for (i = 0; i < data.nchaps; i++) {
  var newOption = document.createElement("OPTION");
  newOption.text=1+i;
  newOption.value=1+i;
  $('#chapters').options[i] = new Option(newOption.text,newOption.value);
  chps=chps+ "<button onclick='return readChap(&quot;"+book +" "+(1+i) +"&quot;);'>"+(1+i)+"</button>" ;
}
 $('#chapters').length = data.nchaps+1;
//console.log("chps:"+chps);
 $('#chaps').html(chps);
}

function updateChaptersbybook(bible,data)
{
  var book=bible;
 var chps=""
  //$('#chapters').html("");
$('#chapters').options=[];
var lst = $('#chapters')[0]; 
lst.options.length=0;
lst.options=[];
lst.options[0] = new Option('章Chapter','1' );
for (i = 0; i < data.nchaps; i++) {
    lst.options[lst.options.length] = new Option(i+1, i+1);
    chps=chps+ "<button ontouchend='return readChap(&quot;"+book+" " +(1+i) +"&quot;);' onclick='return readChap(&quot;"+book+" " +(1+i) +"&quot;);'>"+(1+i)+"</button>" ;
}; 
  $('#chapters').val(lst);
 $('#chaps').html(chps);
}
function setChaps(bible){
	//console.log("in setChapts");
	//console.log(bible);
$('#chaps').html("");
$('#reference').html("");
if (bible){ $.ajax({
  type: "POST",
  url: ctx()+"getChaps",
  data: { bible: bible}
})
  .done(function( msg ) {
	//console.log(msg);
   updateChaptersbybook(bible,msg)
  });

     updateReference(bible+" 1");
}
           return false;
}

function readChap(ref){
    $('#reference').val(ref);
   // getOsis($('#books').val(),ref,0,500) ;
    locate();
    return false;
}
function updateReference(data){
//console.log("updateRef "+data);
//console.log(data);
 $('#reference').val(data)    ;
    locate()       ;            ;
}
function searchDictionary(){
    var dic=$('#dictionaries').val()        ;
    var key=$('#keyword').val()              ;
if(key!=null) $.ajax({
  type: "POST",
  url: ctx()+"searchDictionary",
  data: { dic: dic,key:key}
})
  .done(function( msg ) {
	//console.log(msg);
   updateDict(msg);
  });

}
function searchDictionaryp(){
    var dic=$('dictionariesp')        ;
    var key=$('#keyp').val()              ;
$.ajax({
  type: "POST",
  url: ctx()+"searchDictionary",
  data: { dic: bible, key: key}
})
  .done(function( msg ) {
    updateDictp(msg);
  });

}
function tweet(){
    
$.ajax({
  type: "POST",
  url: ctx()+"ontwitter",
  data: { dic: bible, key: key}
})
  .done(function( msg ) {
    twitter(msg);
  });
  //  Tweek.begin();
}
function updateDict(data){
	if(data.data) showBox(data.data);
}
function updateDictp(data){
	showBox(data.data);
}
function twitter(data){
	showBox(data.data);
}
   function getPassage(){
   return $('#reference').val();
   }
function flip_commentary()
{
  var dict=  $('#commentaries').val();
  var ref  = getPassage();
  if (dict&& ref)
  {
	locate();
  }
}
function pick_commentary()
{
  var dict=  $('#commentaries').val();
  var ref  = getPassage();
  if (dict&& ref)
  {
        addBooks(dict);
	locate();
      
  //  return false;
  }
 // return false;
}
function unpick_commentary()
{
  var dict= $('#commentaries').val();
  var ref  = getPassage();
  if (dict&& ref)
  {
        removeBooks(dict);
	locate();
  //  return false;
  }
  //return false;
}
  function showword(bible){
$.ajax({
  type: "POST",
  url: ctx()+"daily",
  data: { bible: bible }
})
  .done(function( msg ) {
    updateForm(msg);
  });
  setBook(bible);
  }
  function showword3yr(bible){
$.ajax({
  type: "POST",
  url: ctx()+"daily3yr",
  data: { bible: bible }
})
  .done(function( msg ) {
    updateForm(msg);
  });
  setBook(bible);
  }
 function doSearch(){
     var key="";
     var range=$('#range').val();
     if (range=='Custom'){
        var custrange=$('#customrange').val();
        if (custrange){
          key="["+custrange+"]";
        }
     }else{
       var b=1+range.indexOf('\(');
       var e=range.indexOf('\)');
        if (b>1){
        key="["+range.substring(b,e)+"]";
        }
       var phrase=$('#phrase').val();
     if(phrase){
     key+=" \""+phrase+"\"";
     }
     }
       var inwords=$('#inwords').val();
     if(inwords){
      key+=" +"+inwords;
     }
       var exwords=$('#exwords').val();
       if(exwords){
      key+=" -"+exwords;
     }
       var seems=$('#seems').val();
     if(seems){
       key+=" "+seems+"~ ";
     }
       var starts=$('#starts').val();
       if(starts){
       key+=" "+starts+"* ";
     }
        
       $('#keyword').val(key);
	searchBible();
   }

function sendmail(){
    var name=$('#username').val()                    ;
    var email=$('#useremail').val()                   ;
    var comment=$('#usercomment').val()                ;
$.ajax({
  type: "POST",
  url: ctx()+"sendmail",
  data: { name: name,email:email,comment:comment}
})
  .done(function( msg ) {
    displaymailsendresponse(msg);
  });
       return false;
   }
function displaymailsendresponse(e){
       var result=e.responseText;

      var fom=$('emailstatus');
      fom.innerHTML=result;
}
function generatePPT(){
    var ppt=$('#pptSelect').val();
	console.log(' generate ppt:'+ppt);
	if (ppt=='single'){
		genppt();
	}else if (ppt=='parallel'){
		genpptparallel();
	}else{
		download();
	}
	}
function genppt(){
    setInfo("Please wait generating PowerPoint.....")  ;
    var bible=getBook();
    var reference=$('#reference').val();
$.ajax({
  type: "POST",
  url: ctx()+"ppt",
  data: { version: bible,key:reference}
})
  .done(function( msg ) {
    openwin(msg);
  });
}

function download(){
    var bible=getBook()+","+ parallelbooks;
    setInfo("Please wait generating PowerPoint.....<button>download</button>")  ;
	console.log(' download ppt:');
    var reference=$('#reference').val();
$.ajax({
  type: "POST",
  url: ctx()+"downloadFile",
  data: { version: bible,key:reference}
})
  .done(function( msg ) {
	console.log('got msg');
	console.log(msg);
    openwin(msg);
var url = URL.createObjectURL(msg);
        var $a = $('<a />', {
          'href': url,
          'download': 'gsword.pptx',
          'text': "click"
        }).hide().appendTo($('#info'))[0].click();
  })
  .success(function( msg ) {
	console.log('success got msg');
	console.log(msg);
var url = URL.createObjectURL(msg);
        var $a = $('<a />', {
          'href': url,
          'download': 'gsword.pptx',
          'text': "click"
        }).hide().appendTo($('#info'))[0].click();
  });
}
function genpptparallel(){
    var bible=getBook()+","+ parallelbooks;
    setInfo("Please wait generating parallel PowerPoint for ....."+bible)  ;
    var reference=$('#reference').val();
$.ajax({
  type: "POST",
  url: ctx()+"pptparallel",
  data: { version: bible,key:reference}
})
  .done(function( msg ) {
    openwin(msg);
  });
}
function showxref(){
    var bible=getBooks();
    var reference=$('#reference').val();

$.ajax({
  type: "POST",
  url: ctx()+"flipXRef",
  data: { version: bible,key:reference,start:verseStart,limit:verseLimit }
})
  .done(function( msg ) {
    updateForm(msg);
  });
}

function showheadings(){
    var bible=getBooks();
    var reference=$('#reference').val();

$.ajax({
  type: "POST",
  url: ctx()+"flipHeadings",
  data: { version: bible,key:reference,start:verseStart,limit:verseLimit }
})
  .done(function( msg ) {
    updateForm(msg);
  });
}

function showstrongs(){
    var bible=getBooks();
    var reference=$('#reference').val();
	//console.log("show strongs:"+bible+" ref:"+reference);
$.ajax({
  type: "POST",
  url: ctx()+"/flipStrongs",
  data: { version: bible,key:reference,start:verseStart,limit:verseLimit }
})
  .done(function( msg ) {
    updateForm(msg);
  });
}

function shownotes(){
    var bible=getBooks();
    var reference=$('#reference').val();

$.ajax({
  type: "POST",
  url: ctx()+"flipNotes",
  data: { version: bible,key:reference,start:verseStart,limit:verseLimit }
})
  .done(function( msg ) {
    updateForm(msg);
  });
}
function donothing(){
}
function showmorph(){
 var bible=getBooks();
    var reference=$('#reference').val();

$.ajax({
  type: "POST",
  url: ctx()+"/flipMorph",
  data: { version: bible,key:reference,start:verseStart,limit:verseLimit }
})
  .done(function( msg ) {
    updateForm(msg);
  });
}
function showverseline(){
var bible=getBooks();
    var reference=$('#reference').val();
            
$.ajax({
  type: "POST",
  url: ctx()+"/flipVline",
  data: { version: bible,key:reference,start:verseStart,limit:verseLimit }
})
  .done(function( msg ) {
    updateForm(msg);
  });
}
function doProtocol(protocol,lemma){
$.ajax({
  type: "POST",
  url: ctx()+"/handleProtocol",
  data: { protoc: protocol,key:lemma,start:verseStart,limit:verseLimit }
})
  .done(function( msg ) {
	//console.log("maf:");
	//console.log(msg);
    showProtocolData(msg);
  });
    return false;
}
function showProtocolData(e){
      showBox(e.result); 
    return false;
}
function showBox(e){
if(e!=null) {
$('#display_dict').html(""+e);
$('#display_dict_modal').modal('show');
}
return false;
}
function offBox(){
     $('#display_dict').html("");
}
function offAuxform(){
     $('#auxform').html("");
   hideLayer('closeaux') ;
}
function changeLocale(){
    
    location.reload("/v?lang=\'"+$('#lang').val()+"\'");
    return false;

}
 function custom(){
  var cust=$('#range').val();
     
     if (cust=='Custom'){
     showLayer('xcustomrange');
     }else{
         hideLayer('xcustomrange');
     }
     return false;
 }
   function showLayer(divName) {
        document.getElementById(divName).style.display = "";
        document.getElementById(divName).style.visibility = 'visible';
    }

    function hideLayer(divName) {
        document.getElementById(divName).style.display = "none";
        document.getElementById(divName).style.visibility = 'hidden';
    }
var helptxt;
var commentform;
function showhelp(){
    if (helptxt) $('liveform').innerHTML=helptxt;
    else $.ajax({
  	type: "POST",
  	url: ctx()+"/fetchHelp",
	})
  		.done(function( msg ) {
    			updateAuxForm(msg);
  		});
      }
function showcomment(){
      var fom=$('liveform');
    if (commentform) $('liveform').innerHTML=commentform;
    else $.ajax({
  	type: "POST",
  	url: ctx()+"/fetchCommentForm",
	})
  		.done(function( msg ) {
    			updateAuxForm(msg);
  		});
      }
	
function showadvsearch(){
    if (commentform) $('#liveform').html(commentform);
    else $.ajax({
  	type: "POST",
  	url: ctx()+"/advsearch",
	})
  		.done(function( msg ) {
		//console.log("showadvsearch:"+msg);
    			updateAuxForm(msg);
  		});
      }
	
function searchGen2(){
    var chap=$('#genbooksch2').val()  ;
$.ajax({
  type: "POST",
  url: ctx()+"/gentxtremote",
  data: { key: chap}
}).done(function( msg ) {
   updateFormgen(msg);
  });
}
function searchGen(){
    var chap=$('#genbooksch').val()  ;
$.ajax({
  type: "POST",
  url: ctx()+"/gentxtremote",
  data: { key: chap}
}).done(function( msg ) {
   updateFormgen(msg);
  });
}

  function updateFormgen(result){
      if(result.data){
      $('#genform').html(result.data);
      }
  }

function strong4tips(obj){

if(!$(obj).attr('data-original-title')){
	$(obj).attr('data-original-title', $(obj).val());
}
	 $(obj).tooltip('show',{
        placement: "bottom",
	html:true
    	});
}

function doStrongs(obj,protocol,lemma){
if(!$(obj).attr('data-original-title')){
$.ajax({
  type: "POST",
  url: ctx()+"/handleProtocol",
  data: { protoc: protocol,key:lemma,start:verseStart,limit:verseLimit }
})
  .done(function( msg ) {
	$(obj).attr('data-original-title', msg.result);
	 $(obj).tooltip('show',{
        placement: "bottom",
	html:true
    	});
  });
}
}
