export const libutils = {
	scrollToBottom(chat)
	{
    	if(!this.chatPreloading) return;
		  if(!this.current_feed) return;
	  	this.current_feed.parentNode.scrollTop = this.current_feed.scrollHeight
	},
  emailToName(email)
  {
    if(!email) return ""
    try {
      var name = email.replace(/[^\w\s]/gi, '').toString().toLowerCase();
      return name
    }
    catch(err)
    {
      console.log(err)
      return email
    }
  },
  appendFile(file, callback, sizes){
      return new Promise((res, rej) => {
          var external        = document.createElement(file.tag);
          var keys            = Object.keys(file)
          for (var i = keys.length - 1; i >= 0; i--) 
          {
              if(keys[i] == 'tag') continue;
              external[keys[i]] = file[keys[i]];
          };
          this.script_tag = external;
          external.onload = () => {
          	res(external)
          	document.head.removeChild(external)
          	if(callback) callback()
          }
      	if(sizes) {
	        var poll = setInterval(()=> {
  			    if (external.naturalWidth) {
  			        clearInterval(poll);
  			        if(sizes) return sizes()
  			    }
    			}, 10);
      	}
        document.head.appendChild(external);
      })
  },
  formatDate(date) {
    var monthNames = [
      "Января", "Февраля", "Марта",
      "Апреля", "Мая", "Июня", "Июля",
      "Августа", "Сентября", "Октября",
      "Ноября", "Декабря"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hour = date.getHours()
    if(hour.toString().length == 1) hour = "0"+hour.toString()
    var min = date.getMinutes()
    if(min.toString().length == 1) min = "0"+min.toString()

    return `${hour}:${min} `+ day + ' ' + monthNames[monthIndex] + ' ' + year;
  },
  formatMinimalDate(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hour = date.getHours()
    if(hour.toString().length == 1) hour = "0"+hour.toString()
    var min = date.getMinutes()
    if(min.toString().length == 1) min = "0"+min.toString()
    return day + '.' + (monthIndex+1) + '.' + year;
  }

}

export const ajaxReq = libutils.ajaxReq

export const formatDate = libutils.formatDate

export const formatMinimalDate = libutils.formatMinimalDate