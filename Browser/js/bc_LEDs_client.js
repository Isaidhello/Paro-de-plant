$(document).ready(function()
{
    var socket = io('http://localhost:8000');

    $('form').on('click', 'input[type="checkbox"]', function()
    {
        if($(this).prop('checked') == true)
        {
            color = $(this).val();
            socket.emit('toggleLed', color + '-on');
            $('input:checkbox[id="' + color + '"]').next().next().addClass(color);
        }
        else
        {
            socket.emit('toggleLed', color + '-off');
            $('input:checkbox[id="' + color + '"]').next().next().removeClass(color);
        }
    });  
});