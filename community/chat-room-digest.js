(function () {
  const board = document.querySelector("[data-digest-board]");
  const status = document.querySelector("[data-digest-status]");
  if (!board) return;
  const roomStatus = document.querySelector("[data-digest-room-status]");
  const empty = document.createElement("p");
  empty.className = "board-empty";
  empty.textContent = "No current community summary has passed the receipts check. You can still visit the discussion rooms below.";
  board.replaceChildren(empty);
  if (roomStatus) roomStatus.replaceChildren();
  if (status) status.textContent = "No current digest is published. The discussion rooms remain available.";
})();
