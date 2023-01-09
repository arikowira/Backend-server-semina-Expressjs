const fs = require('fs');
const { createCanvas } = require('canvas');

const getRandomColor = () => {
  var letters = '01ABCDEF';
  var color = '#2';
  for (var i = 0; i < 5; i++) {
    color += letters[Math.floor(Math.random() * 8)];
  }
  return color;
};

const getInitials = (name) => {
  let initials;
  const nameSplit = name.split(' ');
  const nameLength = nameSplit.length;
  if (nameLength > 1) {
    initials = nameSplit[0].substring(0, 1) + nameSplit[1].substring(0, 1);
  } else if (nameLength === 1) {
    initials = nameSplit[0].substring(0, 1);
  } else return;

  return initials.toUpperCase();
};

const createImageFromInitials = (
  fileName,
  size,
  name,
  color = getRandomColor()
) => {
  if (name == null) return;
  name = getInitials(name);

  const canvas = createCanvas(size, size);
  const context = canvas.getContext('2d');

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, size, size);

  context.fillStyle = color;
  context.fillRect(0, 0, size, size);

  context.fillStyle = 'white';
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.font = `${size / 2}px arial`;
  context.fillText(name, size / 2, size / 2);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`public/uploads/avatar/${fileName}.png`, buffer);
};

module.exports = {
  createImageFromInitials,
};
