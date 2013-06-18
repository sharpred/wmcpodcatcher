$.syncbutton.addEventListener('click', function() {
    alert('you clicked the sync button');
});
function outputState(){
    var sync = $.basicSwitch.value;
    Ti.API.info('Switch value: ' + sync);
    if (!sync) {
    
    alert('downloading will be slower if streaming is disabled');
    
    }
}
