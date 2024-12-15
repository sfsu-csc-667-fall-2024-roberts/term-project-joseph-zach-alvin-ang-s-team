const tiles = document.getElementsByClassName("tile");
const tile_slots = document.getElementsByClassName("tile-spot");
const tilesArr = Array.from(tiles);
const slotsArr = Array.from(tile_slots);

let tileSelected = false;
var tileObj;

var click_count_tile = 0;
var click_count_slot = 0;

tilesArr.forEach((clickTile) => {
  console.log("add tile listener");
  clickTile.addEventListener("mousedown", (e) => {
    click_count_tile++;
    console.log("clicked tile: " + click_count_tile);

    tileSelected = true;
    tileObj = e;
  });
});

slotsArr.forEach((clickSlot) => {
  console.log("add slot listener");
  clickSlot.addEventListener("mousedown", (e) => {
    console.log("clicked tile_spot: " + clickSlot.dataset.coord);
    console.log("clicked tile_spot: " + clickSlot.dataset.hasTile);

    if (tileSelected) {
      tileSelected = false;

      console.log("attempt placing at: " + clickSlot.dataset.coord);
      console.log("tile to be placed: " + tileObj.src);
    }
  });
});
