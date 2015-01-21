//Create the chat
(function () {
  window.Chat = {
    socket : null,
    initialize : function(socketURL) {
      this.socket = io.connect(socketURL);
      //when button is clicked
      $('#send').click(function() {
        Chat.send();
      });
      $('#message').keyup(function(evt) {
        if ((evt.keyCode || evt.which) == 13) {
          Chat.send();
          return false;
        }
      });
      //get new messages
      this.socket.on('new', this.add);
    },

    //When new message coming
    add : function(data) {
      var currentdate = new Date(); 
      var datetime = "[" + (currentdate.getMonth()+1) + "/"
                + currentdate.getDate()  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "]";
      var name = data.name || 'anonymous';
      var msg = $('<div class="msg"></div>')
        .append('<span class="name">' + name + '</span>: ')
        .append('<span class="text">' + ' ' + datetime + '</span>')
        .append('<span class="text">' + ' ' + data.msg + '</span>');

      $('#messages')
        .append(msg)
        .animate({scrollTop: $('#messages').prop('scrollHeight')}, 0);
    },

    send : function() {
      this.socket.emit('msg', {
        name: $('#name').val(),
        msg: $('#message').val()
      });

      $('#message').val('');

      return false;
    }
  };
}());