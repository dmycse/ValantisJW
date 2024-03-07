function removeItemDublicates(arr) {
  return (
    arr.filter((elem, index) => (
      arr.findIndex(item => (item.id === elem.id)) === index)
    )
  );
}

function getIdDublicates(arr, num) {
  let duplicates = [];
  let count = {};
  
  arr.forEach(item => {
    count[item] = (count[item] || 0) + 1;
    if (count[item] === num && !duplicates.includes(item)) {
      duplicates.push(item);
    }
  });
  // console.log('count...', count);
  // console.log('duplicates...', duplicates);
  return duplicates;
}

export { removeItemDublicates, getIdDublicates };

