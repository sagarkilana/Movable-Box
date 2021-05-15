import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MovableBox';
  boxes=[]
  info:string=''
  postioinvalueArray: any[];
  selectedBox:any;
  lastBoxId=0;
  isKeyboardOn: boolean=true;
  constructor(){
    
  }
  // @HostListener('window:keypress', ['$event'])
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(this.isKeyboardOn){
      if(this.selectedBox && this.selectedBox.id){
        console.log(event,this.selectedBox.id) ;
    
          for(var i=0;i<this.boxes.length;i++){
            if(this.boxes[i].id==this.selectedBox.id){
              if(event.key=='w' || event.key=='ArrowUp'){
                var top=this.boxes[i].top-10;
                if(top>101){
                  this.boxes[i].top+= -10;
                }else{
                  this.boxes[i].top= 101;
                }
              }
              if(event.key=='s'|| event.key=='ArrowDown'){
                var bottom=this.boxes[i].top+10;
                if(bottom<249){
                  this.boxes[i].top+= 10;
                }else{
                  this.boxes[i].top= 249;
                }
              }
              if(event.key=='a' || event.key=='ArrowLeft'){
                var left=this.boxes[i].left-10;
                if(left>21){
                  this.boxes[i].left-= 10;
                }else{
                  this.boxes[i].left= 21;
                } 
              }
              if(event.key=='d' || event.key=='ArrowRight'){
                var right=this.boxes[i].left+10;
                if(right<569){
                  this.boxes[i].left+= 10;
                }else{
                  this.boxes[i].left= 568;
                } 
              }
              if( event.key=='Delete'){
             
                this.boxes.splice(i,1)
                this.selectedBox= this.boxes[i-1]
                if(this.selectedBox) {
                  this.info=this.selectedBox.name+': x: '+this.selectedBox.left+' y: '+this.selectedBox.top
                }else{
                  this.info='Please select the box to move the box'
                }
              }else{
                this.selectedBox= this.boxes[i]
                this.info=this.selectedBox.name+': x: '+this.selectedBox.left+' y: '+this.selectedBox.top
              }
              
            }
          }
        }else{
          this.info='Please select the box to move the box'
        }
    }else{
      this.info='Please turn on Keyboard input to move the box'
    }
  
    
    
  }
  
  ngOnInit(){
    this.info='Please add box'
  }

  addBox(){
    var thisTemp=this;
    var uniqueId=this.lastBoxId+1;
    var box={
      // left:(this.boxes.length)*100+30,
      left:21,
      top:101,
      id:uniqueId,
      name:'Box '+uniqueId

    }
    this.info=box.name+': x: '+box.left+' y: '+box.top
    this.boxes.push(box)
    this.lastBoxId=uniqueId;
  }
  selectBox(box){
    if(box) {
      this.selectedBox=box
      this.info=box.name+': x: '+box.left+' y: '+box.top
    }
  }
  toggleKeyboard(){
    console.log('ss')
    this.isKeyboardOn=!this.isKeyboardOn
    if(!this.isKeyboardOn){
      this.info='Please turn on Keyboard input to move the box'
    }else if(this.selectedBox){
      this.info=this.selectedBox.name+': x: '+this.selectedBox.left+' y: '+this.selectedBox.top
    }else{
      this.info='Please select the box to move the box'

    }
   
  }
//   getSignatureBlockPositions(boxId) {
//     var containerHeight = $("#fence").height();
//     var containerWidth = $("#fence").width();
//     var positions = [];
//     var box = document.getElementById(boxId);
//     consol
//     if (box) {
//       var elementCurrentLeft = parseInt(box.style.left.replace("px", ""));
//       var elementCurrentTop = parseInt(box.style.top.replace("px", ""));
// console.log('elementCurrentTop',elementCurrentTop)
// console.log('elementCurrentLeft',elementCurrentLeft)
//       if (elementCurrentTop > containerHeight) {
        
//         var exactTopPos = elementCurrentTop % (containerHeight + 10);
//         positions.push({ 'id': box.id,  'x1': elementCurrentLeft, 'y1': exactTopPos });
//       }
//       else {
//         positions.push({ 'id': box.id, 'x1': elementCurrentLeft, 'y1': elementCurrentTop });
//       }
//     }
//     return positions;
//   }
//   setDragAndPositionSiger(signerBoxId) {
//     var dropSignBox = document.getElementById(signerBoxId);
//       // console.log("signer", this.unstoredSigner, signerBoxId);
//       var containerHeight = $("#fence").height();
//       var containerWidth = $("#fence").width();
//       console.log('containerWidth',containerWidth)
//       console.log('containerHeight',containerHeight)
//       var thisTemp = this
//       var bottomMarginGap = 5;
//       var currentX;
//       var currentY;
//       var initialX;
//       var initialY;
//       var xOffset = 0;
//       var yOffset = 0;
//       var elementCurrentLeft = parseInt(dropSignBox.style.left.replace("px", ""));
//       var elementCurrentTop = parseInt(dropSignBox.style.top.replace("px", ""));
//       var elementCurrentWidth = parseInt(dropSignBox.style.width.replace("px", ""));
//       var elementCurrentHeight = parseInt(dropSignBox.style.height.replace("px", ""));

//       var actualWidth = elementCurrentWidth;
//       var actualHeight = elementCurrentHeight;

//       elementCurrentWidth = elementCurrentLeft + elementCurrentWidth;
//       elementCurrentHeight = elementCurrentTop + elementCurrentHeight;
//       // var tempWidth = containerWidth - 10;

//       if (elementCurrentLeft < 0) {
//         // this.deleteBlock = true;
//         // this.borderSign = true;
//         // dropSignBox.style.left = 10 + 'px'
//         xOffset = currentX = elementCurrentLeft;

//       }

//       if (elementCurrentTop < 0) {
//         // this.deleteBlock = true;
//         // this.borderSign = true;
//         // dropSignBox.style.top = 10 + 'px'
//         xOffset = currentX = elementCurrentLeft;

//       }
//       if (elementCurrentWidth > containerWidth) {
//         // this.deleteBlock = true;
//         // this.borderSign = true;
//         xOffset = currentX = (containerWidth - actualWidth);

//       }
//       var wrapperHeight = $("#doc_container").height();
//       var totalPages = document.getElementsByClassName('page').length;

//       for (var i = 0; i < totalPages; i++) {
//         var border = (i > 0) ? ((i + 1) * containerHeight) + ((i + 1) * 10) : containerHeight;


//         var lowPoint = border - bottomMarginGap;
//         var hightPoint = (i == 0) ? border + bottomMarginGap + 10 : border + bottomMarginGap;
//         if (lowPoint <= elementCurrentTop && hightPoint >= elementCurrentTop) {
//           // this.deleteBlock = true;
//           // this.borderSign = true;
//           yOffset = currentY = hightPoint;

//         }
//         else if (lowPoint <= elementCurrentHeight && hightPoint >= elementCurrentHeight) {
//           // this.deleteBlock = true;
//           // this.borderSign = true;
//           yOffset = currentY = (lowPoint - actualHeight);

//         } else if (hightPoint > elementCurrentTop && lowPoint < elementCurrentHeight) {
//           // this.deleteBlock = true;
//           // this.borderSign = true;
//           yOffset = currentY = hightPoint;

//         }
//       }

//       if (currentX <= 0) {
//         // this.deleteBlock = true;
//         // this.borderSign = true;
//         initialX = xOffset = currentX = 0;
//       }
//       if (currentY <= 0) {
//         // this.deleteBlock = true;
//         // this.borderSign = true;
//         initialY = yOffset = currentY = 0;
//       }

//       if (elementCurrentHeight >= wrapperHeight) {
//         // this.deleteBlock = true;
//         // this.borderSign = true;
//         initialY = yOffset = currentY = wrapperHeight - (actualHeight + bottomMarginGap);

//       }

//       var dropsignBoxRight = 110 + parseInt(dropSignBox.style.left);
//       var dropsignBoxBottom = 50 + parseInt(dropSignBox.style.top);
//       var dataId = dropSignBox.getAttribute("data-block-id")
//       var arrayData = [];
//       var signatureblocks = document.querySelectorAll("[data-type='signer-block']");
//       for (let index = 0; index < signatureblocks.length; index++) {
//         var eachSignatureBlockMovesignerId = $(signatureblocks[index]).closest('[data-type="signer-block"]').attr('data-block-id');
//         var eachSignatureBlockMovecurrentSignerId = $(signatureblocks[index]).closest('[data-type="signer-block"]').attr('id');

//         if (eachSignatureBlockMovesignerId != undefined && eachSignatureBlockMovecurrentSignerId != signerBoxId) {
//           if (signatureblocks[index].hasAttribute('style')) {
//             var signatureParams = {
//               top: '',
//               bottom: '',
//               left: '',
//               right: '',
//             };
//             var leftvalue = document.getElementById(signatureblocks[index].id).style.left;
//             var topvalue = document.getElementById(signatureblocks[index].id).style.top;
//             var initialWidth = document.getElementById(signatureblocks[index].id).style.width;
//             var initialHeight = document.getElementById(signatureblocks[index].id).style.height;
//             var rightValue = parseInt(leftvalue.replace("px", " ")) + 110;
//             var bottomValue = parseInt(topvalue.replace("px", " ")) + 50;
//             arrayData.push(signatureParams)
//             signatureParams.left = leftvalue.replace("px", "");
//             signatureParams.top = topvalue.replace("px", "");
//             signatureParams.right = rightValue.toString()
//             signatureParams.bottom = bottomValue.toString();
//           }

//         }



//       }
//       // for (var i = 0; i < arrayData.length; i++) {

//       //   if ((dropsignBoxRight > parseInt(arrayData[i].left)) && (parseInt(dropSignBox.style.left) < parseInt(arrayData[i].right)) && (parseInt(dropSignBox.style.top) < parseInt(arrayData[i].bottom)) && (dropsignBoxBottom > parseInt(arrayData[i].top)
//       //   )) {
//       //     // && (parseInt(dropSignBox.style.top) < parseInt(arrayData[i].bottom)) && (dropsignBoxBottom > parseInt(arrayData[i].top)
//       //     // console.log("collieds sorry");
//       //     // && (parseInt(dropSignBox.style.top) < parseInt(arrayData[i].bottom)) && (dropsignBoxBottom > parseInt(arrayData[i].top))
//       //     this.deleteBlock = true;
//       //     this.borderSign = false;

//       //   }
//       //   else {
//       //     // console.log("else");

//       //   }
//       // }

//       // setTimeout(() => {
//       //   if (!this.deleteBlock) {

//       //     swal({
//       //       title: 'Are You Sure?',
//       //       text: "Do you want to set this position?",
//       //       type: 'question',
//       //       showCancelButton: true,
//       //       allowOutsideClick: false,
//       //       confirmButtonText: 'Yes',
//       //       cancelButtonText: 'No',
//       //       reverseButtons: true,
//       //       confirmButtonClass: 'btn btn-success pointer br-25',
//       //       cancelButtonClass: 'btn btn-outline-success pointer mr10 br-25',
//       //       buttonsStyling: false
//       //     }).then(() => {
//       //       thisTemp.hideSignatureBox = false
//       //       thisTemp.insertSignBoxPosition(signerBoxId);

//       //     }, function (dismiss) {
//       //       thisTemp.hideSignatureBox = true
//       //       document.getElementById(signerBoxId) ? document.getElementById(signerBoxId).remove() : ''
//       //       thisTemp.signatureDragStart();
//       //       signerBoxId = ''
//       //     })
//       //   } else {
//       //     var message = this.borderSign ? 'Signer block cannot be placed on the page border' : 'You cannot place one signature block over another signature block.'
//       //     swal({
//       //       title: 'Warning',
//       //       text: message,
//       //       type: 'warning',
//       //       allowOutsideClick: false,
//       //       confirmButtonText: 'Okay',
//       //       reverseButtons: true,
//       //       confirmButtonClass: 'btn btn-success pointer br-25',
//       //       buttonsStyling: false
//       //     }).then(() => {
//       //       thisTemp.hideSignatureBox = true
//       //       document.getElementById(signerBoxId) ? document.getElementById(signerBoxId).remove() : ''
//       //       thisTemp.signatureDragStart();
//       //       thisTemp.deleteBlock = false
//       //       signerBoxId = ''
//       //     }, function (dismiss) {
//       //     });

//       //   }
//       // }, 300);


    
//   }

  // dragSignatureBlock(imageId) {
  //   var dragItem = document.getElementById(imageId);
  //   var elementCurrentWidth = parseInt($("#" + imageId).width());
  //   var elementCurrentHeight = parseInt($("#" + imageId).height());
  //   var currentPage = 0;
  //   dragItem.setAttribute("data-parent", currentPage.toString());
  //   var container = document.getElementsByClassName("page");
  //   var containerHeight = $("#page_div_0").height();
  //   var containerWidth = $("#page_div_0").width();
  //   var active = false;
  //   var currentX;
  //   var currentY;
  //   var initialX;
  //   var initialY;
  //   var xOffset = 0;
  //   var yOffset = 0;
  //   var thisTemp = this;
  //   var bottomMarginGap = 5;

  //   var wrapper = document.getElementById("doc_container");
  //    document.getElementsByClassName("dynamicsignature-container")[0].addEventListener("mousemove", function (e) {
  //     if (thisTemp.isDragStarted)
  //       dragEnd(e);
  //   }, false);
  //   document.getElementsByClassName("dynamicsignature-container")[0].addEventListener("mouseup", function (e) {
  //     if (thisTemp.isDragStarted)
  //       dragEnd(e);
  //   }, false);
  //   document.getElementsByClassName("dynamicsignature-container")[0].addEventListener("touchend", function (e) {
  //     if (thisTemp.isDragStarted)
  //       dragEnd(e);
  //   }, false);
  //   document.getElementsByClassName("outer-doc-container")[0].addEventListener("mousemove", function (e) {
  //     if (thisTemp.isDragStarted)
  //       dragEnd(e);
  //   }, false);
  //   document.getElementsByClassName("outer-doc-container")[0].addEventListener("mouseup", function (e) {
  //     if (thisTemp.isDragStarted)
  //       dragEnd(e);
  //   }, false);
  //   document.getElementsByClassName("outer-doc-container")[0].addEventListener("touchend", function (e) {
  //     if (thisTemp.isDragStarted)
  //       dragEnd(e);
  //   }, false);

  //   document.getElementsByClassName("x_panel view-left-block")[0].addEventListener("mousemove", function (e) {
  //     if (thisTemp.isDragStarted)
  //       dragEnd(e);
  //   }, false);

  //   document.getElementsByClassName("x_panel view-left-block")[0].addEventListener("mouseup", function (e) {
  //     if (thisTemp.isDragStarted)
  //       dragEnd(e);
  //   }, false);
  //   document.getElementsByClassName("x_panel view-right-block")[0].addEventListener("mouseup", function (e) {
  //     if (thisTemp.isDragStarted)
  //       dragEnd(e);
  //   }, false);
  //   document.getElementsByClassName("animated fadeIn")[0].addEventListener("mouseup", function (e) {
  //     if (thisTemp.isDragStarted)
  //       dragEnd(e);
  //   }, false);
  //   document.getElementsByClassName("animated fadeIn")[0].addEventListener("mousemove", function (e) {
  //     if (thisTemp.isDragStarted)
  //       dragEnd(e);
  //   }, false);

  //   var signatureBlock = document.getElementById(imageId);

  //   if (thisTemp.documentStatus === 'Draft') {

  //     wrapper.addEventListener("touchstart", dragStart, false);
  //     wrapper.addEventListener("touchend", dragEnd, false);
  //     wrapper.addEventListener("touchmove", drag, false);
  //     wrapper.addEventListener("mousedown", dragStart, false);
  //     document.getElementById(dragItem.id).addEventListener('mousedown', e => {
  //       thisTemp.InitialLeftValue = dragItem.style.left.replace("px", "");
  //       thisTemp.InitialTopValue = dragItem.style.top.replace("px", "");
  //       // console.log("calling", thisTemp.InitialLeftValue, thisTemp.InitialTopValue);

  //     });

  //     wrapper.addEventListener("mouseup", dragEnd, false);
  //     wrapper.addEventListener("mousemove", drag, false);
  //     signatureBlock.addEventListener("click", click, false);
  //   } else {
  //     wrapper.removeEventListener("touchstart", dragStart, false);
  //     wrapper.removeEventListener("touchend", dragEnd, false);
  //     wrapper.removeEventListener("touchmove", drag, false);
  //     wrapper.removeEventListener("mousedown", dragStart, false);
  //     wrapper.removeEventListener("mouseup", dragEnd, false);
  //     wrapper.removeEventListener("mousemove", drag, false);
  //     signatureBlock.removeEventListener("click", click, false);
  //   }

  //   function dragStart(e) {
  //     thisTemp.isDragStarted = true;
  //     if (dragItem) {
  //       xOffset = parseInt(dragItem.style.left.replace("px", ""));
  //       yOffset = parseInt(dragItem.style.top.replace("px", ""));
  //       if (e.type === "touchstart") {
  //         initialX = e.touches[0].clientX - xOffset;
  //         initialY = e.touches[0].clientY - yOffset;
  //       } else {
  //         initialX = e.clientX - xOffset;
  //         initialY = e.clientY - yOffset;
  //       }
  //       var target = e.target.closest('#' + imageId);
  //       target = (target && target != null && target != undefined) ? target : e.target.classList.contains('preview_signer');
  //         active = true;
  //       e.stopPropagation();
  //     }
  //   }

  //   async function dragEnd(e) {
  //     if (dragItem) {
  //       thisTemp.isDragStarted = false;
  //       var signerid = $(e.target).closest('[data-block-id]').attr('data-block-id');
  //       thisTemp.signerId = signerid;
  //       var elementCurrentLeft = parseInt(dragItem.style.left.replace("px", ""));
  //       var elementCurrentTop = parseInt(dragItem.style.top.replace("px", ""));
  //       var elementCurrentWidth = parseInt(dragItem.style.width.replace("px", ""));
  //       var elementCurrentHeight = parseInt(dragItem.style.height.replace("px", ""));

  //       var actualWidth = elementCurrentWidth;
  //       var actualHeight = elementCurrentHeight;

  //       elementCurrentWidth = elementCurrentLeft + elementCurrentWidth;
  //       elementCurrentHeight = elementCurrentTop + elementCurrentHeight;

  //       var tempWidth = containerWidth - 10;

  //       if (elementCurrentWidth > tempWidth) {
  //         xOffset = currentX = (tempWidth - actualWidth);
  //         setTranslate(currentX, currentY, dragItem, thisTemp.postioinvalueArray);
  //       }

  //       if (elementCurrentLeft <= 0) {
  //         // this.deleteBlock = true;
  //         // dropSignBox.style.left = 10 + 'px'
  //         xOffset = currentX = elementCurrentLeft + 10;
  //         setTranslate(currentX, currentY, dragItem, thisTemp.postioinvalueArray);


  //       }

  //       if (elementCurrentTop <= 0) {
  //         // this.deleteBlock = true;
  //         // dropSignBox.style.left = 10 + 'px'
  //         yOffset = currentY = elementCurrentTop + 10;
  //         setTranslate(currentX, currentY, dragItem, thisTemp.postioinvalueArray);
  //       }

  //       var wrapperHeight = $("#doc_container").height();
  //       var totalPages = document.getElementsByClassName('page').length;

  //       for (var i = 0; i < totalPages; i++) {
  //         var border = (i > 0) ? ((i + 1) * containerHeight) + ((i + 1) * 10) : containerHeight;
  //         var lowPoint = border - bottomMarginGap;
  //         var hightPoint = (i == 0) ? border + bottomMarginGap + 10 : border + bottomMarginGap;
  //         if (lowPoint <= elementCurrentTop && hightPoint >= elementCurrentTop) {
  //           yOffset = currentY = hightPoint;
  //           setTranslate(currentX, currentY, dragItem, thisTemp.postioinvalueArray);
  //         }
  //         else if (lowPoint <= elementCurrentHeight && hightPoint >= elementCurrentHeight) {
  //           yOffset = currentY = (lowPoint - actualHeight);
  //           setTranslate(currentX, currentY, dragItem, thisTemp.postioinvalueArray);
  //         } else if (hightPoint > elementCurrentTop && lowPoint < elementCurrentHeight) {
  //           yOffset = currentY = hightPoint;
  //           setTranslate(currentX, currentY, dragItem, thisTemp.postioinvalueArray);
  //         }
  //       }

  //       if (currentX <= 0) {
  //         initialX = xOffset = currentX = 0;
  //         setTranslate(currentX, currentY, dragItem, thisTemp.postioinvalueArray);
  //       }
  //       if (currentY <= 0) {
  //         initialY = yOffset = currentY = 0;
  //         setTranslate(currentX, currentY, dragItem, thisTemp.postioinvalueArray);
  //       }
  //       if (elementCurrentHeight >= wrapperHeight) {
  //         initialY = yOffset = currentY = wrapperHeight - (actualHeight + bottomMarginGap);
  //         setTranslate(currentX, currentY, dragItem, thisTemp.postioinvalueArray);
  //       }
  //       initialX = currentX;
  //       initialY = currentY;
  //       active = false;
  //       var draggedElemId = $(e.target).closest('.preview_signer').attr('id');
  //       // var draggedElemId = $(e.target).closest('.preview_signer').attr('data-block-id');

  //         if (draggedElemId) {
  //           this.currentSignerId = $('#' + draggedElemId).closest('[data-block-id]').attr('data-block-id')
  //         }
  //         // if (thisTemp.documentStatus && thisTemp.documentStatus == 'Draft') {
  //         //   thisTemp.checkOverlapBorder = false;
  //         //   await thisTemp.insertSignBoxPosition(draggedElemId ? draggedElemId : imageId)
  //         // }
       
  //       e.stopPropagation();
  //     }
  //   }

  //   function drag(e) {
  //     if (active) {

  //       thisTemp.postioinvalueArray = [];

  //       var signerid = $(e.target).closest('[data-block-id]').attr('data-block-id');
  //       thisTemp.currentSignerId = signerid;

  //       // console.log("signerid-------drag-", signerid);

  //       var signatureblocks = document.querySelectorAll("[data-type='signer-block']");

  //       var dragItem = document.getElementById(imageId);
  //       if (dragItem) {

  //         e.preventDefault();
  //         if (e.type === "touchmove") {
  //           currentX = e.touches[0].clientX - initialX;
  //           currentY = e.touches[0].clientY - initialY;
  //         } else {
  //           currentX = e.clientX - initialX;
  //           currentY = e.clientY - initialY;
  //         }
  //         if (dragItem && thisTemp.currentSignerId && thisTemp.currentSignerId == dragItem.getAttribute("data-block-id")) {
  //           for (var i = 0; i < signatureblocks.length; i++) {
  //             var eachSignatureBlockMovesignerId = $(signatureblocks[i]).closest('[data-type="signer-block"]').attr('data-block-id');
  //             if (eachSignatureBlockMovesignerId != dragItem.getAttribute("data-block-id") && eachSignatureBlockMovesignerId != undefined) {
  //               // console.log("ppppppppppppppppp");
  //               if (signatureblocks[i].hasAttribute('style')) {
  //                 var signatureParams = {
  //                   top: '',
  //                   bottom: '',
  //                   left: '',
  //                   right: '',
  //                 };
  //                 var leftvalue = document.getElementById(signatureblocks[i].id).style.left;
  //                 var topvalue = document.getElementById(signatureblocks[i].id).style.top;
  //                 var initialWidth = document.getElementById(signatureblocks[i].id).style.width;
  //                 var initialHeight = document.getElementById(signatureblocks[i].id).style.height;
  //                 var changedleft = parseInt(leftvalue.replace("px", "")) + parseInt(initialWidth.replace("px", ""));
  //                 var changedTop = parseInt(topvalue.replace("px", "")) + parseInt(initialHeight.replace("px", ""));
  //                 signatureParams.left = leftvalue.replace("px", "");
  //                 signatureParams.top = topvalue.replace("px", "");
  //                 signatureParams.right = changedleft.toString()
  //                 signatureParams.bottom = changedTop.toString();
  //                 thisTemp.postioinvalueArray.push(signatureParams);
  //               }
  //             } else {
  //               // console.log("drging array", thisTemp.documentId);
  //             }

  //           }

  //         }
  //         var elementCurrentLeft = parseInt(dragItem.style.left.replace("px", ""));
  //         var elementCurrentTop = parseInt(dragItem.style.top.replace("px", ""));

  //         var elementCurrentWidth = parseInt(dragItem.style.width.replace("px", ""));
  //         var elementCurrentHeight = parseInt(dragItem.style.height.replace("px", ""));

  //         var actualWidth = elementCurrentWidth;
  //         var actualHeight = elementCurrentHeight;

  //         elementCurrentWidth = elementCurrentLeft + elementCurrentWidth;
  //         elementCurrentHeight = elementCurrentTop + elementCurrentHeight;

  //         var tempWidth = containerWidth - 5;

  //         if (currentX > 0 && currentY > 0 && elementCurrentWidth < tempWidth) {
  //           xOffset = currentX;
  //           yOffset = currentY;
  //           setTranslate(currentX, currentY, dragItem, thisTemp.postioinvalueArray);
  //         }

  //         if (elementCurrentWidth > tempWidth) {
  //           xOffset = currentX = (tempWidth - actualWidth);
  //         }
  //       }

  //     }
  //     e.stopPropagation();
  //   }


  //   function click(event) {
  //     var signerid = $(event.target).closest('[data-block-id]').attr('data-block-id');
  //     thisTemp.currentSignerId = signerid;
  //     if ((<HTMLElement>event.target).classList.contains('close-sign-block')) {
  //       var sign = $(event.target).closest('[data-block-id]').attr('data-block-id');
  //       var signData = _.where(thisTemp.signersList, { "unique_id": sign.toString() })
  //       thisTemp.deleteSigner(signData[0])
  //       // thisTemp.deleteSignerData(signData[0])
  //     }
  //   }



  //   let setTranslate = (xPos, yPos, el, postionArray) => {
  //     // function body

  //     if (el.hasAttribute("style")) {
  //       if (el.style.hasOwnProperty('left')) {
  //         el.style.left = xPos + "px";
  //       }
  //       else {
  //         $('#' + el.id).css("left", xPos + 'px');
  //       }
  //       if (el.style.hasOwnProperty('top')) {
  //         el.style.top = yPos + "px";
  //       }
  //       else {
  //         $('#' + el.id).css("top", yPos + 'px');
  //       }
  //     }
  //     else {
  //       el.setAttribute("style", "");
  //       if (el.style.hasOwnProperty('left')) {
  //         el.style.left = xPos + "px";
  //       }
  //       else {
  //         $('#' + el.id).css("left", xPos + 'px');
  //       }
  //       if (el.style.hasOwnProperty('top')) {
  //         el.style.top = yPos + "px";
  //       }
  //       else {
  //         $('#' + el.id).css("top", yPos + 'px');
  //       }
  //     }
  //     var translateTop = parseInt(el.style.top.replace("px", ""));
  //     var translateLeft = parseInt(el.style.left.replace("px", ""));;
  //     var translateRight = translateLeft + 110;
  //     var translateBottom = translateTop + 50;
  //     var containerHeight = $("#page_div_0").height();
  //     var containerWidth = $("#page_div_0").width();


  //     if (postionArray.length > 0) {
  //       for (var i = 0; i < postionArray.length; i++) {
  //         if ((translateRight > parseInt(postionArray[i].left)) && (translateLeft < parseInt(postionArray[i].right)) && (translateTop < parseInt(postionArray[i].bottom)) && (translateBottom > parseInt(postionArray[i].top))) {
  //           var thisTemp1 = this;
  //           thisTemp.setPreviousPositionVlues(el);
  //           thisTemp.overlapped = true;
  //           swal({
  //             title: 'Warning',
  //             text: 'Two signatures blocks cannot be overlapped.',// 'Signer blocks cannot be placed over each other',
  //             type: 'warning',
  //             allowOutsideClick: false,
  //             confirmButtonText: 'Okay',
  //             reverseButtons: true,
  //             confirmButtonClass: 'btn btn-success pointer br-25',
  //             buttonsStyling: false
  //           }).then(() => {
  //             active = false;
  //             thisTemp.isDragStarted = false;
  //             // console.log("active",active,"thisTemp.isDragStarted",thisTemp.isDragStarted);

  //           }, function (dismiss) {

  //           });
  //         }
  //         else {
  //           // $('#' + el.id).children().css("border", 1 + "px dashed #75c144");

  //         }


  //       }
  //     }

  //   }
  // }

}
