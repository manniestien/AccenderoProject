var Sequence = require('../models/sequence');

var maxUserId;
var sequenceId = null;

function SequenceGen() {

  Sequence.findOne()
    .exec(function (err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      // sequenceId = sequence._id;
      // maxUserId = sequence.maxUserId;
    });
}

SequenceGen.prototype.nextId = function (collectionType) {

  var updateObject = {};
  var nextId;
    switch (collectionType){
      case "users":
      maxUserId++;
      updateObject = {maxUserId: maxUserId};
      nextId = maxUserId;
      break;
      default:
      return -1;
    }



  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function (err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGen();
