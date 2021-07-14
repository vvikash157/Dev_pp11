
let topLeftCell=document.querySelector(".top-left-cell");
let topRow=document.querySelector(".top-row");
let leftCol=document.querySelector(".left-col");
let address=document.querySelector("#address");
let formulaInput=document.querySelector("#formula");
let allCells=document.querySelectorAll(".cell");
let lastSelectedCell;






cellsContainer.addEventListener("scroll",function(e) {
    let topOffset=e.target.scrollTop;
    let leftOffset=e.target.scrollLeft;

    topRow.style.top=topOffset + "px";
    topLeftCell.style.top=topOffset + "px";
    topLeftCell.style.left=leftOffset + "px";
    leftCol.style.left=leftOffset + "px";

});
formulaInput.addEventListener("blur",function(e) {
    let formula=e.target.value;
    if(formula){
        let cellObject=getCellObjectFromElement(lastSelectedCell);

            if(cellObject.formula!=formula){
                deleteFormula(cellObject);
            }
        let calculatedValue=solveFormula(formula,cellObject);
        lastSelectedCell.textContent=calculatedValue;
        cellObject.value=calculatedValue;
        cellObject.formula=formula;

       updateChildrens(cellObject.childrens);
    }
});

// let allCells=document.querySelectorAll(".cell");
 
for(let i=0;i<allCells.length;i++){

    allCells[i].addEventListener("click",function(e) {
        let cellObject=getCellObjectFromElement(e.target);
        address.value=cellObject.name;
        formulaInput.value=cellObject.formula;




    });






    allCells[i].addEventListener("blur",function(e) {
        lastSelectedCell=e.target;
        let cellValueFromUI=e.target.textContent;
        if(cellValueFromUI){
            let cellObject=getCellObjectFromElement(e.target);
            if(cellObject.formula && cellValueFromUI!=cellObject.value){
                deleteFormula(cellObject);
                formulaInput.value="";
            }

            cellObject.value=cellValueFromUI;
            updateChildrens(cellObject.childrens);
            let rowId=e.target.getAttribute("rowId");
             let colId=e.target.getAttribute("colId");
             if(!cellObject.visited){
                 visitedCells.push({rowId,colId});
                 cellObject.visited=true;
             }
        }
        
        
    });
}

function deleteFormula(cellObject) {
    cellObject.formula="";
    for(let i=0;i<cellObject.parents.length;i++){
        let parentName=cellObject.parents[i];
        let parentCellObject=getCellObjectFromName(parentName);
        let updateChildrens=parentCellObject.childrens.filter(function(childName) {
           if(childName==cellObject.name){
               return false;
           } 
           return true;
        });
        parentCellObject.childrens=updateChildrens;
    }
    cellObject.parents=[];
}

function solveFormula(formula,selfCellObject) {
    let formulaComps=formula.split(" ");
    for(let i=0;i<formulaComps.length;i++){
        let fComp=formulaComps[i];
        if((fComp[0]>="A" && fComp[0]<="z")||(fComp[0]>="a" && fComp<="z")){
            let parentCellObject=getCellObjectFromName(fComp);
            let value=parentCellObject.value;
            if(selfCellObject){

                parentCellObject.childrens.push(selfCellObject.name);
                selfCellObject.parents.push(parentCellObject.name);
            }
            formula=formula.replace(fComp,value);
        }
    }
    let calculatedValue=eval(formula);
    return calculatedValue;

}
function getCellObjectFromElement(element) {
    let rowId=e.target.getAttribute("rowId");
    let colId=e.target.getAttribute("colId");
    return db[rowId][colId];  
}
function getCellObjectFromName(name) {
    let colId=name.charCodeAt(0)-65;
    let rowId=Number(name.substring(1))-1;
    return db[rowId][colId];
}

function updateChildrens(childrens) {
    for(let i=0;i<childrens.length;i++){
        let child=childrens[i];
        let childCellObject=getCellObjectFromName(child);
        let updateValueOfChild=solveFormula(childCellObject.formula);
        childCellObject.value=updateValueOfChild;
        let colId=child.charCodeAt(0)-65;
        let rowId=Number(child.substring(1))-1;
        document.querySelector(`div[rowId="${rowId}"][colId="${colId}"]`).textContent=updateValueOfChild;
        updateChildrens(childCellObject.childrens);
    }
}



