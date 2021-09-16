const outputs = [];



const k = 3;



function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
  
  return ;
}


function knn(data, point){
  return _.chain(data)
  .map(row => [distance(row[0],point), row[3]])
  .sortBy(row => row[0])
  .slice(0,k)
  .countBy(row => row[1])
  .toPairs()
  .sortBy(row => row[1])
  .last()
  .first()
  .parseInt()
  .value()
}

function runAnalysis() {
  const testSetSize = 10;
  const [testSet, trainigSet] = splitDataset(outputs,10);

  let numberCorrect = 0
  for(let i = 0;i< testSet.length;i++){
    const bucket = knn(trainigSet, testSet[i][0]);
    if(bucket === testSet[i][3]){
      numberCorrect++;
    }
    
  }

  const accuracy = _.chain(testSet)
                    .filter(testPoint => knn(trainigSet, testPoint[0]) === testPoint[3])
                    .size()
                    .divide(testSetSize)
                    .value();
  
  console.log(accuracy);

}



function distance(a,b){
  return Math.abs(a - b);
}



function splitDataset(data, testCount){
  const suffled = _.shuffle(data);

  const testSet = _.slice(suffled, 0, testCount);
  const trainigSet = _.slice(suffled, testCount);
  return [testSet, trainigSet];
}