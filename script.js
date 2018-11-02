// Code goes here
$(function() {

  $('#code').on('keyup', function() {
    debounce(function(){
      $("#formattedCode").html($(this).val())
      $("#formattedCode").removeClass()
      runHightlight();

    },1000)

  });

  var quill = enableQuill();
  quill.on('text-change', function(delta, oldDelta, source) {

    debounce(function(){
      $("#formattedCode").removeClass()
      $("#formattedCode").html(js_beautify(quill.getText()))
      runHightlight();

    },500)()
    
  });

})

var inDebounce

const debounce = (func, delay) => {
  return function() {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
}
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
function enableQuill(){
  return new Quill('#editor-container', {
    modules: {
    
    },
    placeholder: 'Paste code here',
    theme: 'snow'  // or 'bubble'
  });
}



function CopyHTMLToClipboard() {    
  if (document.body.createControlRange) {
      var htmlContent = document.getElementById('pre');
      var controlRange;

      var range = document.body.createTextRange();
      range.moveToElementText(htmlContent);

      //Uncomment the next line if you don't want the text in the div to be selected
      range.select();

      controlRange = document.body.createControlRange();
      controlRange.addElement(htmlContent);

      //This line will copy the formatted text to the clipboard
      controlRange.execCommand('Copy');         

      alert('Your HTML has been copied\n\r\n\rGo to Word and press Ctrl+V');
  }
}    