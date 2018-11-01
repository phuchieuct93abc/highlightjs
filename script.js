// Code goes here
$(function() {

  $('#code').on('keyup', function() {
    $("#formattedCode").html($(this).val())
    runHightlight();
  });
  enableTabTextArea();

  $("#language").on("change",function(){
    $("#formattedCode").removeClass();
    $("#formattedCode").addClass($(this).val())
    runHightlight();

  })


  $("#language").val($("#language option:first").val());


})
function runHightlight(){
  setTimeout(function(){
    hljs.highlightBlock($("#formattedCode")[0]);

  },1000)
}
function copyToClipboard(str) {
  var el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
function enableTabTextArea(){
  $("textarea").keydown(function(e) {
    if(e.keyCode === 9) { // tab was pressed
        // get caret position/selection
        var start = this.selectionStart;
            end = this.selectionEnd;
  
        var $this = $(this);
  
        // set textarea value to: text before caret + tab + text after caret
        $this.val($this.val().substring(0, start)
                    + "\t"
                    + $this.val().substring(end));
  
        // put caret at right position again
        this.selectionStart = this.selectionEnd = start + 1;
  
        // prevent the focus lose
        return false;
    }
  });
}


