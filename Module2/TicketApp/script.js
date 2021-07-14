
let allFilters=document.querySelectorAll(".filter");
let ticketsContainer=document.querySelector(".ticket-container");

let openModal=document.querySelector(".open-modal");
let closeModal=document.querySelector(".close-modal");

let ticketModalOpen=false;
let isTextTyped=false;

for(let i=0;i<allFilters.length;i++)
{
    allFilters[i].addEventListener("click",selectFilter);
}
openModal.addEventListener("click",openTicketModal);
closeModal.addEventListener("click",closeTicketModal);

function selectFilter(e) {
  let filterSelected=e.target.classList[1];
  if(ticketsContainer.classList.length > 1){
      ticketsContainer.classList.remove(ticketsContainer.classList[1]);
  } 
  ticketsContainer.classList.add(filterSelected); 
}

function openTicketModal(e) {
  if(ticketModalOpen){
  return;}

  let ticketModal=document.createElement("div");
  ticketModal.classList.add("ticket-modal");
  ticketModal.innerHTML=`<div class="ticket-text" contentEditable="true" spellcheck="false">Enter Your Text !</div>
  <div class="ticket-filters">
            <div class="ticket-filter red selected-filter"></div>
            <div class="ticket-filter blue"></div>
            <div class="ticket-filter green"></div>
            <div class="ticket-filter yellow"></div>
            <div class="ticket-filter black"></div>
        </div>`;
        document.querySelector("body").append(ticketModal);
        ticketModalOpen=true;
        isTextTyped=false;

        let ticketTextDiv=ticketModal.querySelector(".ticket-text");
        ticketTextDiv.addEventListener("keypress",handleKeyPress);

        let ticketFilters=ticketModal.querySelectorAll(".ticket-filter");
        for(let i=0;i<ticketFilters.length;i++){
          ticketFilters[i].addEventListener("click",function (e) {
           if(e.target.classList.contains("selected-filter")){
           return;}
           document.querySelector(".selected-filter").classList.remove("selected-filter");
           e.target.classList.add("selected-filter");
          });
        } 

}

function closeTicketModal(e) {
  if(ticketModalOpen){
    document.querySelector(".ticket-modal").remove();
    ticketModalOpen=false;
    isTextTyped=false;
  }
}
function handleKeyPress(e) {
  
  // console.log(e);
  if (e.target.key=="Enter" && isTextType &&e.target.textContent)
  {
    let filterSelected=document.querySelector(".selected-filter").classList[1];
    let ticketId=uuid();
    let ticketInfoObject={
      ticketId: ticketId,
      ticketValue: e.target.textContent,
      ticketFilter: filterSelected
    };
    appendTicket(ticketInfoObject);
    closeModal.click();
    // saveTicketToDB(ticketInfoObject);
  }
  if(!isTextTyped){
    isTextTyped=true;
    e.target.textContent="";
    
  }
}

appendTicket()
{   let{ticketFilter,ticketValue,ticketId}=ticketInfoObject
    let ticketDiv = document.createElement("div");
    ticketDiv.classList.add("ticket");
    ticketDiv.innerHTML = `<div class="ticket-header">${ticketFilter}</div>
    <div class="ticket-content">
        <div class="ticket-info">
            <div class="ticket-id">${ticketId}</div>
            <div class="ticket-delete">
                <i class="fas fa-trash"></i>
            </div>
        </div>
        <div class="ticket-value">${ticketValue}</div>
    </div>`;

    ticketsContainer.append(ticketDiv);
}

