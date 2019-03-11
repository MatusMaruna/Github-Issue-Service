/* Connect to socket on server */
var socket = io.connect('https://cscloud452.lnu.se/')

/* On socket 'issue' event create a notification using template*/
socket.on('issue', function(data){
     var li = document.createElement('li')
     li.id = data.action
     var template = document.querySelector('template').content.cloneNode(true);
     var img = template.querySelector('.image').querySelector('img')
     img.src = data.issue.user.avatar_url
     img.width = 100
     img.height = 100
     template.querySelector('.user').innerText = data.issue.user.login
     switch(data.action){
         case 'created': 
         template.querySelector('.action').querySelector('p').innerText = 'Posted a new comment in ' + data.issue.title.substr(0, 9)
         let num = parseInt(data.issue.comments)+1
         document.getElementById(data.comment.issue_url).querySelector('.comments').innerText = '# Comments: ' + num.toString()
         document.getElementById(data.comment.issue_url).querySelector('.updated').innerText = 'Updated at ' +  data.issue.updated_at
         break
         case 'closed':
         template.querySelector('.action').querySelector('p').innerText = 'Closed the issue ' + data.issue.title.substr(0, 9)
         document.getElementById(data.issue.url).style.display = 'none'
         break
         case 'reopened':
         template.querySelector('.action').querySelector('p').innerText = 'Reopened the issue ' + data.issue.title.substr(0, 9)
         document.getElementById(data.issue.url).style.display = ''
         break
         case 'deleted':
         template.querySelector('.action').querySelector('p').innerText = 'Deleted the issue ' + data.issue.title.substr(0, 9)
         document.getElementById(data.issue.url).style.display = 'none'
         break
         /* adds an element to 'All issues' */
         case 'opened':
         template.querySelector('.action').querySelector('p').innerText = 'Opened the issue ' + data.issue.title.substr(0, 9)
         let list = document.getElementById('issue-list')
         let li = document.createElement('li')
         li.id = data.issue.url
         let h2 = document.createElement('h2')
         h2.id = 'title'
         h2.innerText = data.issue.title
         li.append(h2)
         let comments = document.createElement('p')
         comments.className = 'comments'
         let number = parseInt(data.issue.comments)+1
         comments.innerText = '# Comments: ' + number.toString()
         li.append(comments)
         let a = document.createElement('a')
         a.href = data.issue.html_url
         a.innerText = 'Link to Issue'
         li.append(a)
         let updated = document.createElement('p')
         updated.className = 'updated'
         updated.innerText = 'Updated at ' + data.issue.updated_at
         li.append(updated)
         list.append(li)
         break
         default:
         template.querySelector('.action').querySelector('p').innerText = data.action + ' ' + data.issue.title.substr(0, 9)
         break

     }
     li.append(template)
     document.getElementById('notifications').getElementsByTagName('ul')[0].appendChild(li)

})