function renderChats(data) {
  let chat = ejs.render(
    `
 <% for(i=0;i<data.length;i++){ %>
 
 <li class="p-2 border-bottom" onclick="chatOpen({
 id:'<%= data[i].userID %>',
 name:'<%= data[i].name %>',
  image:'<%= data[i].image %>',
 })" >
 
   <a href="#!" class="d-flex justify-content-between">
    <div class="d-flex flex-row">
     <div>
   <img src="static/images/<%= data[i].image%>"
   alt="avatar" class="chat-avatar d-flex align-self-center me-3" width="60">
<span class="badge bg-success badge-dot"></span>
     </div>
         <div class="pt-1">
  <p class="fw-bold mb-0"><%= data[i].name%></p>
  <p class="small text-muted"><%= data[i].message%></p>
                            </div>
                          </div>
                          <div class="pt-1">
  <p class="small text-muted mb-1">Just now</p>
      <span class="badge bg-danger rounded-pill float-end"><%= data[i].unread %></span>
                          </div>
                        </a>
                      </li>
                      <% } %>
                   `,
    { data }
  );

  document.getElementById("chat-list-items").innerHTML = chat;
}

function chatOpen(user) {
  //load info to chat-box
  document.getElementById("chat-box").innerHTML = ejs.render(
    `          <div class="shadow-sm border-bottom bg-light p-2 d-flex justify-content-between chat-box-header w-100">
  <div class="p-1 bold  " onclick="chatClose()">
  <span class="chat-box-back-button  bi bi-chevron-left"></span>
  </div>  
  <div>
  <b class=""><%=user.name%></b> </div>
  <div class="p-1 chat-actions">
    <span class="bi bi-camera-video"></span> 
    <span class="bi bi-telephone"></span>  
    <span> <img src="static/images/<%=user.image%>" alt="avatar3" style="" class="chat-avatar1"></span> </div> 
  </div>
<br/><br/>
   <div id="chat-box-messages" class=" pt-3 pe-3" data-mdb-perfect-scrollbar="true" style="position: relative;  overflow: auto">




<% for(i=0;i<messages.length;i++){ if(messages[i].from==user.id){%>       
<div class="d-flex flex-row justify-content-start">
            <div>
 <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;"><%= messages[i].message%></p>
 <p class="small ms-3 mb-3 rounded-3 text-muted float-end"><%= messages[i].time%></p>
                    </div>
                  </div>
<%} if(messages[i].to==user.id){%>
 <div class="d-flex flex-row justify-content-end">
                    <div>
    <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"><%= messages[i].message %>
    </p>
    <p class="small me-3 mb-3 rounded-3 text-muted"><%= messages[i].time%></p>
                    </div>
                    
                  </div>
                  <%}
                  }%>



                </div>
<br/><br/>
                   <form id="toSend">  
          <div class="border-top shadow-sm chat-box-footer p-2 w-100 bg-white text-muted d-flex justify-content-start align-items-center pe-3 ">
                          

     <a class="ms-1 text-muted" href="#!"><i class="bi bi-paperclip"></i></a>
                  <a class="text-muted p-2" href="#!"><i class="bi bi-emoji-smile"></i></a>
<input type="hidden" name="type" >
                 <textarea name="message" type="text" class="form-control form-control-lg" id="exampleFormControlInput2"
                    placeholder="Type message" rows="1"> </textarea>

                  <a class="ms-3 text-muted" href="#!"onclick="send()"><i class="bi bi-send"></i></a>
                

                </div>
                                </form>
`,
    { messages, user }
  );
  let elm = document.querySelector("#chat-box");

  elm.scrollTop = elm.scrollHeight;
  if (isMobile) {
    document.getElementById("chat-list-items").style.display = "none";
    document.getElementById("chat-box").style.display = "block";
    // console.log(el.childNodes)
  }
}
function chatClose(el) {
  document.getElementById("chat-list").style.display = "block";
  document.getElementById("chat-box").style.display = "none";
}
