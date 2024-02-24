let dragTarget = null;
let dragType = null;
let scriptBlocks = [];

function dragStart(event) {
  if (!matches(event.target, ".block")) return;
  if (matches(event.target, ".menu .block")) {
    dragType = "menu";
  } else {
    dragType = "script";
  }
  event.target.classList.add("dragging");
  dragTarget = event.target;
  scriptBlocks = [].slice.call(
    document.querySelectorAll(".script .block:not(.dragging)"),
  );
  // For dragging to take place in Firefox, we have to set this, even if
  // we don't use it
  event.dataTransfer.setData("text/html", event.target.outerHTML);
  if (matches(event.target, ".menu .block")) {
    event.dataTransfer.effectAllowed = "copy";
  } else {
    event.dataTransfer.effectAllowed = "move";
  }
}

// Depending on where the drag starts and ends, drop will have different effects:
// • If dragging from script to menu, delete dragTarget (remove block from script).
// • If dragging from script to script, move dragTarget (move an existing script block).
// • If dragging from menu to script, copy dragTarget (create a new script block).
// • If dragging from menu to menu, do nothing.

function dragOver(evt) {
  if (!matches(evt.target, ".menu, .menu *, .script, .script *, .content")) {
    return;
  }
  // Necessary. Allows us to drop.
  if (evt.preventDefault) {
    evt.preventDefault();
  }
  if (dragType === "menu") {
    // See the section on the DataTransfer object.
    evt.dataTransfer.dropEffect = "copy";
  } else {
    evt.dataTransfer.dropEffect = "move";
  }
  return false;
}

function drop(evt) {
  if (!matches(evt.target, ".menu, .menu *, .script, .script *")) return;
  var dropTarget = closest(
    evt.target,
    ".script .container, .script .block, .menu, .script",
  );
  var dropType = "script";
  if (matches(dropTarget, ".menu")) {
    dropType = "menu";
  }
  // stops the browser from redirecting.
  if (evt.stopPropagation) {
    evt.stopPropagation();
  }
  if (dragType === "script" && dropType === "menu") {
    trigger("blockRemoved", dragTarget.parentElement, dragTarget);
    dragTarget.parentElement.removeChild(dragTarget);
  } else if (dragType === "script" && dropType === "script") {
    if (matches(dropTarget, ".block")) {
      dropTarget.parentElement.insertBefore(dragTarget, dropTarget.nextSibling);
    } else {
      dropTarget.insertBefore(dragTarget, dropTarget.firstChildElement);
    }
    trigger("blockMoved", dropTarget, dragTarget);
  } else if (dragType === "menu" && dropType === "script") {
    var newNode = dragTarget.cloneNode(true);
    newNode.classList.remove("dragging");
    if (matches(dropTarget, ".block")) {
      dropTarget.parentElement.insertBefore(newNode, dropTarget.nextSibling);
    } else {
      dropTarget.insertBefore(newNode, dropTarget.firstChildElement);
    }
    trigger("blockAdded", dropTarget, newNode);
  }
}

function _findAndRemoveClass(klass) {
  var elem = document.querySelector("." + klass);
  if (elem) {
    elem.classList.remove(klass);
  }
}

function dragEnd(event) {
  _findAndRemoveClass("dragging");
  _findAndRemoveClass("over");
  _findAndRemoveClass("next");
}
